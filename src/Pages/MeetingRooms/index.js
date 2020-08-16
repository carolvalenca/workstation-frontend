import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import './style.css'

import Header from '../../Components/Header'
import Menu from '../../Components/Menu'
import api from '../../Services/api'

//pagina responsavel por mostrar todas as salas existentes para os usuarios
function MeetingRooms() {
    const [rooms, setRooms] = useState()

    //setando as salas disponiveis num state
    useEffect(() => {
        const fetchData = async () => {
            let response = await api.get('indexRooms', {headers: {'auth-token': localStorage.getItem('userInfo')}})

            setRooms(response.data)
       }

       fetchData()
    }, [])

    return (
        <div id="mr-container">
            <Header action="Logout" redirect="/" />

            <h1>Salas de Reunião</h1>

            <div className="content">
                <Menu />

                <div className="rooms">
                    {rooms && rooms.map(room => (
                        <div key={room._id} className="room">
                            <h3>{room.nome}</h3>
                            <p>Descrição: {room.desc}</p>
                            {(room.horariosDisp.length > 0) && (
                                <div>
                                    <strong>HORÁRIOS DISPONÍVEIS:</strong>
                                    <div>
                                        {room.horariosDisp.map(horario => (
                                            <span>
                                                {`${horario} - `}
                                            </span>
                                        ))}
                                    </div>
                                    <Link to={`/createmeeting/${room._id}`}>
                                        <button>Agendar reunião nesta sala</button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MeetingRooms