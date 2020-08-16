import React, { useState, useEffect } from 'react'

import './style.css'

import Header from '../../Components/Header'
import Menu from '../../Components/Menu'

import api from '../../Services/api'

//pagina responsavel por realizar operacoes em reunioes
//caso voce seja um admin, todas as reunioes irao aparecer. caso contrario, apenas suas reunioes agendadas irao aparecer
function CRUDMeetings() {
    const [meetings, setMeetings] = useState()

    //funcao responsavel por cancelar uma reuniao quando chamada
    async function deleteMeeting(id) {
        const allMeetings = await api.delete(`deleteMeeting/${id}`, {headers: {'auth-token': localStorage.getItem('userInfo')}})
        setMeetings(allMeetings.data)
    }

    //setando as reunioes que deverao aparecer na tela
    useEffect(() => {
        const fetchData = async () => {
            if (localStorage.getItem('isAdmin') === "true") {
                let response = await api.get('indexAllMeetings', {headers: {'auth-token': localStorage.getItem('userInfo')}})
        
                setMeetings(response.data)
            } else {
                let response = await api.get('indexUserMeetings', {headers: {'auth-token': localStorage.getItem('userInfo')}})
                
                setMeetings(response.data)
            }        
       }

       fetchData()
    }, [])

    return (
        <div id="crudm-container">
            <Header action="Logout" redirect="/" />

            <h1>Minhas reuniões</h1>

            <div className="content">
                <Menu />

                <div className="meetings">
                   {meetings && meetings.map(meeting => (
                       <div className="meeting">
                           <h3>{meeting.nome}</h3>
                           <p>Criador: {meeting.criador}</p>
                           <p>Descrição: {meeting.desc}</p>
                           <p>Sala: {meeting.nomeSala}</p>
                           <p>Horário: {meeting.horario}</p>
                           <p>Participantes: {meeting.participantes}</p>

                            <button onClick={() => deleteMeeting(meeting._id)}>Cancelar reunião</button>
                       </div>
                   ))}
                </div>
            </div>
        </div>
    )
}

export default CRUDMeetings