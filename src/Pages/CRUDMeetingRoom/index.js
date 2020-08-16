import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import './style.css'
import api from '../../Services/api'

import Header from '../../Components/Header'
import Menu from '../../Components/Menu'

//pagina responsavel por realizar as operacoes das salas de reuniao
//apenas um admin pode acessa-la
function CRUDMeetingRoom() {
    const [rooms, setRooms] = useState()

    //funcao que quando chamada faz a operacao de deletar uma determinada sala
    async function deleteRoom(id) {
        const newRooms = await api.delete(`deleteRoom/${id}`, {headers: {'auth-token': localStorage.getItem('userInfo')}})
        setRooms(newRooms.data)
    }

    //setando todas as salas para coloca-las na tela
    useEffect(() => {
        const fetchData = async () => {
            let response = await api.get('indexRooms', {headers: {'auth-token': localStorage.getItem('userInfo')}})
            setRooms(response.data)
       }

       fetchData()
    }, [])

    return (
        <div id="crudmr-container">
            <Header action="Logout" redirect="/" />
            
            <h1>CRUD Salas de Reunião</h1>

            <Link to="/createroom">
                <button className="new-room">Criar nova sala</button>
            </Link>

            <div className="content">
                <Menu />

                <div className="rooms">
                {rooms && rooms.map(room => (
                    <div key={room._id} className="room">
                        <h3>{room.nome}</h3>
                        <p>{room.desc}</p>
                        <strong>Horários ocupados:</strong>
                        <div>
                            {room.horariosOcupados && room.horariosOcupados.map(horario => (
                                <span>
                                    {`${horario} - `}
                                </span>
                            ))}
                        </div>
                        <div className="buttons">
                            <Link to={`/editroom/${room._id}`}>
                                <button className="button-e">Editar</button>
                            </Link>
                            <button className="button-d" onClick={() => deleteRoom(room._id)}>Deletar</button>
                        </div>
                    </div>
                ))}
                </div>
            </div>
        </div>
    )
}

export default CRUDMeetingRoom