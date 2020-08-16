import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'

import './style.css'

import Header from '../../Components/Header'

import api from '../../Services/api';

//pagina responsavel por fazer o cadastro de um usuario
function Register() {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [funcao, setFuncao] = useState('')

    const history = useHistory()

    //limpando os dados do ultimo usuario logado
    //caso um usuario logado volte para a tela de cadastro, ele desloga automaticamente
    useEffect(() => {
        localStorage.removeItem('userInfo')
        localStorage.removeItem('userEmail')
        localStorage.removeItem('isAdmin')
        localStorage.removeItem('verificado')
        localStorage.removeItem('completo')
    }, [])

    //funcao responsavel por mandar os dados de cadastro pro backend
    async function handleRegister(e) {
        e.preventDefault()

        if (!email || !senha || !funcao) return alert('Preencha os campos obrigatórios!')

        if (senha.length < 6) return alert('Senha precisa ter no mínimo 6 digitos!')

        const data = {
            email,
            senha,
            funcao
        }

        try {
            const response = await api.post('register', data)
            alert('Cadastro realizado com sucesso!')
            history.push('/resend')
        } catch (err) {
            alert('Erro ao fazer o cadastro.')
        }
        
    }

    return (
        <div id="cadastro-container">
            <Header action="Fazer Login" redirect="/"/>

            <form onSubmit={handleRegister}>
                <h1>Cadastro</h1>
                

                <div className="input">
                    <label htmlFor="">Email</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)}/>
                </div>

                <div className="input">
                    <label htmlFor="">Senha</label>
                    <input type="password" value={senha} onChange={e => setSenha(e.target.value)}/>
                </div>


                <h3>Função</h3>
                <div className="funcao">
                    <div className="radio-box">
                        <input type="radio" name="funcao" value={funcao} onChange={e => setFuncao("usuario")}/>
                        <label htmlFor="">Usuário</label>
                    </div>
                    <div className="radio-box">
                        <input type="radio" name="funcao" value={funcao} onChange={e => setFuncao("admin")}/>
                        <label htmlFor="">Administrador</label>
                    </div>
                </div>
    

                <button type="submit">Cadastrar</button>             
            </form>
        </div>
    )
}

export default Register