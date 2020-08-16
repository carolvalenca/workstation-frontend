import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import './style.css'

import Header from '../../Components/Header'
import Menu from '../../Components/Menu'
import api from '../../Services/api'

//pagina responsavel por editar as informacoes de uma sala 
function EditRoom(props) {
    const [id, setId] = useState()
    const [nome, setNome] = useState('')
    const [desc, setDesc] = useState('')

    const history = useHistory()

    //setando o id da sala a ser editada num state para operacoes posteriores
    useEffect(() => {
        setId(props.match.params.id)
    }, [])

    //funcao responsavel por realizar a edicao das infos da sala
    async function handleSubmit(e) {
        e.preventDefault()

        if (!nome || !desc) {
            return alert('Preencha todos os campos obrigatórios!')
        }

        const data = {nome, desc, id}

        try {
            await api.put('editRoom', data, {headers: {'auth-token': localStorage.getItem('userInfo')}})
        
            alert('Edição de sala realizada com sucesso!')
            history.push('/crudmeetingroom')
        } catch (err) {
            alert('Erro na edição de sala')
            history.push('/crudmeetingroom')
        }
    }

    return (
        <div id="er-container">
            <Header action='Logout' redirect="/" />

            <div className="content">
                <Menu />

                <div className="form-container">
                    <form onSubmit={handleSubmit}>
                        <h1>Editar sala</h1>
                        <div className="input">
                            <label htmlFor="">Nome</label>
                            <input type="text" required placeholder="Digite o nome da sala..." value={nome} onChange={(e) => setNome(e.target.value)}/>
                        </div>

                        <div className="input">
                            <label htmlFor="">Descrição</label>
                            <textarea required cols="30" rows="5" maxLength="200" placeholder="Máximo de 200 caracteres..." value={desc} onChange={(e) => setDesc(e.target.value)}></textarea>
                        </div> 

                        <button type="submit">Enviar alterações</button> 
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditRoom