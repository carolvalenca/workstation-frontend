import React, { useState, useEffect } from 'react'

import './style.css'

import Header from '../../Components/Header'
import Menu from '../../Components/Menu'
import api from '../../Services/api'

//pagina responsavel por mostrar na tela todas as reunioes disponiveis para participacao
function Meetings() {
    const [meetings, setMeetings] = useState()
    const [userEmail, setUserEmail] = useState()

    //funcao que verifica se o user logado ja participa de alguma reuniao
    function have(array, elem) {
        for (let x=0; x < array.length; x++) {
           if (JSON.stringify(array[x]) == elem) return true
        } return false
    }

    //funcao responsavel por tornar o user logado participante de uma reuniao
    async function participate(id, participate) {
        if (meetings) {
            let allMeetings = await api.put('participate', {id, participate}, {headers: {'auth-token': localStorage.getItem('userInfo')}})
            setMeetings(allMeetings.data)
        }
    }

    //setando as reunioes disponiveis para participar
    //apenas as reunioes de outros usuarios serao dispostas na tela, as do user logado nao
    useEffect(() => {
        const fetchData = async () => {
            let response = await api.get('indexOtherMeetings', {headers: {'auth-token': localStorage.getItem('userInfo')}})

            setMeetings(response.data)
            setUserEmail(localStorage.getItem('userEmail'))
       }

       fetchData()
    }, [])

    return (
        <div id="m-container">
            <Header action="Logout" redirect="/" />

            <h1>Reuniões</h1>

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

                           {!have(meeting.participantes, userEmail) && (
                                <button className="p-button" onClick={() => participate(meeting._id, true)}>Participar da reunião</button>
                           )}
                           {(have(meeting.participantes, userEmail)) && (
                               <button className="np-button" onClick={() => participate(meeting._id, false)}>Sair da reunião</button>
                           )}
                       </div>
                   ))}
                </div>
            </div>
        </div>
    )
}

export default Meetings