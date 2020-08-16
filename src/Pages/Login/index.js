import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'


import './style.css'

import image from './work3.png'

import Header from '../../Components/Header'
import api from '../../Services/api';

//pagina de login de usuario
function Login() {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    const history = useHistory()

    //removendo os dados do usuario que fez logout
    useEffect(() => {
        localStorage.removeItem('userInfo')
        localStorage.removeItem('userEmail')
        localStorage.removeItem('isAdmin')
        localStorage.removeItem('verificado')
        localStorage.removeItem('completo')
    }, [])

    //funcao responsavel por fazer o login do usuario
    async function handleLogin(e) {
        e.preventDefault()

        const data = {email, senha}

        try {
            const response = await api.post('login', data)
            
            //setando os dados do usuario recem logado no navegador para uso posterior
            localStorage.setItem('userInfo', JSON.stringify(response.data.token))
            localStorage.setItem('userEmail', JSON.stringify(response.data.email))
            localStorage.setItem('isAdmin', JSON.stringify(response.data.funcao))
            localStorage.setItem('verificado', JSON.stringify(response.data.verificado))
            localStorage.setItem('completo', JSON.stringify(response.data.completo))
            history.push('/edit')
        } catch (err) {
            alert('Erro no login')
        }
    }

    return (
        <div id="login-container">
            <Header action="Cadastrar-se" redirect="/register"/>

            <div className="content">
                <img src={image} alt=""/>

                <form onSubmit={handleLogin}>
                    <h1>Login</h1>

                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)}/>
                    </div>

                    <div>
                        <label htmlFor="senha">Senha</label>
                        <input type="password" value={senha} onChange={e => setSenha(e.target.value)}/>
                    </div>

                   
                        <button type="submit">Entrar</button>
                </form>
            </div>
        </div>
    )
}

export default Login