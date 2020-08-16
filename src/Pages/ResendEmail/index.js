import React, { useState } from 'react'

import './style.css'

import Header from '../../Components/Header'

import api from '../../Services/api';


//pagina responsavel por reenviar o email de confirmacao para um usuario
function ResendEmail() {
    const [email, setEmail] = useState('')
    
    //funcao responsavel por mandar os dados de reenvio pro backend
    async function handleSubmit(e) {
        e.preventDefault()

        try {
            const response = await api.post('resendEmail', {email})
            alert('Email reenviado com sucesso!')
        } catch (err) {
            alert('Falha no reenvio do email.')
        }
    }

    return (
        <div id="resend-container">
            <Header action="Fazer Login" redirect="/"/>
            <h1>Cadastro realizado!</h1>

            <h3>Cheque sua caixa de entrada para realizar a verificação do email.</h3>

            <form onSubmit={handleSubmit}>
                <p>Deseja reenviar o email de autenticação?</p>
                <input type="email" placeholder="Digite o email..." value={email} onChange={(e) => setEmail(e.target.value)}/>
                <button type="submit">Reenviar email</button>
            </form>
        </div>
    )
}

export default ResendEmail