import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import './style.css'

import api from '../../Services/api'

import Header from '../../Components/Header'

//pagina responsavel por verificar o email do usuario
function VerifyEmail(props) {
    const [token, setToken] = useState("")

    const history = useHistory()

    //funcao que envia o token de verificacao pro backend para que o email seja confirmado
    async function request() {
        try {
            const response = await api.put('verify', {token})
            alert('Email verificado com sucesso!')
        } catch (err) {
            alert('Falha na verificação do email.')
        }
    }

    function handleSubmit() {
        request()
        history.push('/')
    }


    return (
        <div id="verify-container">
            <Header action="Fazer Login" redirect="/" />

            <h1>Verificação de email</h1>
            <h3>Insira o token que você recebeu no seu email no campo abaixo para verifica-lo</h3>
            <input type="text" placeholder="seu token aqui" value={token} onChange={(e) => setToken(e.target.value)}/>
            <button className="verificar" onClick={handleSubmit}>Verificar</button>
        </div>
    )
}

export default VerifyEmail