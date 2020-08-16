import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import './style.css'

import Header from '../../Components/Header'
import Menu from '../../Components/Menu'
import api from '../../Services/api';

import { isVerified } from '../../Services/auth'

//pagina responsavel pela edicao das informacoes de um usuario
function Edit() {
    const [nome, setNome] = useState('')
    const [cpf, setCpf] = useState('')
    const [endereco, setEndereco] = useState('')
    const [dataNasc, setDataNasc] = useState('')
    const [biografia, setBiografia] = useState('')
    const [email, setEmail] = useState('')

    //funcao que realiza a edicao de informacoes
    async function handleEdit(e) {
        e.preventDefault()

        if (!nome || !cpf || !endereco || !dataNasc) {
            return alert('Preencha todos os campos obrigatórios!')
        }

        const data = {
            nome,
            cpf,
            endereco,
            dataNasc,
            biografia,
            email
        }

        console.log(data)

        try {
            const response = await api.put('editUser', data, {headers: {'auth-token': localStorage.getItem('userInfo')}})
            localStorage.setItem('completo', JSON.stringify(response.data.completo))
            alert('Edição de informações realizada com sucesso!')
        } catch (err) {
            alert('Erro na edição de informações')
        }
    }

    return (
        <div id="edit-container">
            <Header action="Logout" redirect="/" logout={true}/>


            <div className="content">
            <Menu />

            {!isVerified() && (
                <div className="links">
                    <Link to="/resend">Reenviar email</Link>
                    <Link to="/verify/:token">Verificar email</Link>
                </div>
            )}

            {(isVerified()) && (
                <form onSubmit={handleEdit}>
                <h1>Editar informações</h1>
                
                <div className="input">
                    <label htmlFor="">Nome</label>
                    <input type="text" required placeholder="Digite seu nome..." value={nome} onChange={(e) => setNome(e.target.value)}/>
                </div>

                <div className="input-group">
                    <div className="input">
                        <label htmlFor="">Data de Nascimento</label>
                        <input type="text" required placeholder="DD/MM/AAAA" value={dataNasc} onChange={(e) => setDataNasc(e.target.value)}/>
                    </div>
                    
                    <div className="input">
                        <label htmlFor="">CPF</label>
                        <input type="text" placeholder="Digite seu CPF..." required value={cpf} onChange={(e) => setCpf(e.target.value)}/>
                    </div>
                </div>

                <div className="input">
                    <label htmlFor="">Endereço</label>
                    <input type="text" placeholder="Digite seu endereço..." required value={endereco} onChange={(e) => setEndereco(e.target.value)}/>
                </div>

                <div className="input">
                    <label htmlFor="">Biografia</label>
                    <textarea name="" id="" cols="30" rows="5" maxlength="200" placeholder="Máximo de 200 caracteres..." value={biografia} onChange={(e) => setBiografia(e.target.value)}></textarea>
                </div>  

                <div className="input">
                    <label htmlFor="">Email</label>
                    <input type="text" placeholder="Digite seu email..." value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>

                <button type="submit">Enviar alterações</button>             
            </form>
            )}


            </div>

        </div>
    )
}

export default Edit