import React, { useState, useEffect } from 'react'

import './style.css'

import Header from '../../Components/Header'
import Menu from '../../Components/Menu'

import api from '../../Services/api'

//pagina responsavel por dispor todos os usuarios na tela
//disponivel apenas para admins
function Users() {
    const [users, setUsers] = useState()

    //funcao responsavel por fazer um usuario ser promovido a admin ou ter o cargo retirado
    async function promote(id, promote) {
        if (users) {
            let newUsers = await api.put('promoteUser', {id, promote}, {headers: {'auth-token': localStorage.getItem('userInfo')}})
            setUsers(newUsers.data)
        }
    }

    //setando os usuarios disponiveis num state para dispor na tela
    //apenas outros usuarios aparecerao, o user logado nao ira aparecer nessa tela
    useEffect(() => {
       const fetchData = async () => {
            let response = await api.get('indexUsers', {headers: {'auth-token': localStorage.getItem('userInfo')}})

            setUsers(response.data)
       }

       fetchData()
    }, [])


    return (
        <div id="users-container">
            <Header action="Logout" redirect="/" logout={true}/>

            <h1>Usuários</h1>

            <div className="content">
                <Menu />

                <div className="usuarios">
                    {users && users.map(user => (
                            <div key={user._id} className="card-usuario">
                                <h3>{user.nome}</h3>
                                <p>Função: {user.funcao}</p>
                                <p>Email: {user.email}</p>
                                <p>Data de nascimento: {user.dataNasc}</p>
                                <p>Endereço: {user.endereco}</p>
                                <p>Biografia: {user.biografia}</p>
                                {(user.funcao === "usuario") && (
                                    <button className="promote" onClick={() => promote(user._id, true)}>Promover a administrador</button>
                                )}
                                {(user.funcao === "admin") && (
                                    <button className="remove" onClick={() => promote(user._id, false)}>Remover cargo de administrador</button>
                                )}
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Users