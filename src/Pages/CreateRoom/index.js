import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import './style.css'

import Header from '../../Components/Header'
import Menu from '../../Components/Menu'
import api from '../../Services/api'


//pagina responsavel por criar uma nova sala de reunioes
function CreateRoom() {
    const [nome, setNome] = useState('')
    const [desc, setDesc] = useState('')

    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()

        if (!nome || !desc) {
            return alert('Preencha todos os campos obrigatórios!')
        }

        //dados que vao ser enviados ao backend para criar a sala
        const data = {nome, desc}

        //requisicao para a api 
        try {
            const response = await api.post('createRoom', data, {headers: {'auth-token': localStorage.getItem('userInfo')}})
            
            alert('Criação de sala realizada com sucesso!')
            history.push('/crudmeetingroom')
        } catch (err) {
            alert('Erro na criação de sala, tente novamente mais tarde.')
            history.push('/crudmeetingroom')
        }
    }

    return (
        <div id="cr-container">
            <Header action='Logout' redirect="/" />

            <div className="content">
                <Menu />

                <div id="form">
                    <form onSubmit={handleSubmit}>
                        <h1>Criar sala</h1>
                        <div className="input">
                            <label htmlFor="">Nome</label>
                            <input type="text" required placeholder="Digite o nome da sala..." value={nome} onChange={(e) => setNome(e.target.value)}/>
                        </div>

                        <div className="input">
                            <label htmlFor="">Descrição</label>
                            <textarea name="" id="" cols="30" rows="5" maxLength="200" placeholder="Máximo de 200 caracteres..." value={desc} onChange={(e) => setDesc(e.target.value)}></textarea>
                        </div> 

                        <button type="submit">Criar sala</button> 
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateRoom