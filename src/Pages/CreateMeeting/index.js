import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'


import './style.css'

import Header from '../../Components/Header'
import Menu from '../../Components/Menu'
import api from '../../Services/api'

//Página responsável por criar reuniões
function CreateMeeting(props) {
    const [room, setRoom] = useState()
    const [nome, setNome] = useState()
    const [desc, setDesc] = useState()
    const [horario, setHorario] = useState()

    const history = useHistory()

    //Funcao para criar a reunião em questao
    async function createMeeting(e) {
        e.preventDefault()

        if (!nome || !desc || !horario) {
            return alert('Preencha todos os campos obrigatórios!')
        }

        //dados para mandar na requisicao
        const data = {nome, desc, sala: {idSala: props.match.params.id, horario}}

        //try catch para fazer a requisicao na api pela rota de criacao de reunioes
        try {
            const response = await api.post('createMeeting', data, {headers: {'auth-token': localStorage.getItem('userInfo')}})
            
            alert('Reunião criada com sucesso!')
            history.push('/meetings')
        } catch (err) {
            alert('Erro na criação da reunião')
            history.push('/meetings')
        }
    }

    //seta a sala em que queremos fazer a reuniao afim de pegar os horarios da mesma
    useEffect(() => {
        const fetchData = async () => {
            let response = await api.get(`indexOneRoom/${props.match.params.id}`, {headers: {'auth-token': localStorage.getItem('userInfo')}})
            setRoom(response.data)
       }

       fetchData()
    }, [])

    return (
        <div id="cm-container">
            <Header action='Logout' redirect="/" />

            <div className="content">
                <Menu />

                <div className="cr-form">
                    <form onSubmit={createMeeting}>
                        <h1>Criar Reunião</h1>
                        <div className="input">
                            <label htmlFor="">Nome</label>
                            <input type="text" required placeholder="Digite o nome da reunião..." value={nome} onChange={e => setNome(e.target.value)}/>
                        </div>

                        <div className="input">
                            <label htmlFor="">Descrição</label>
                            <textarea required cols="30" rows="5" maxLength="200" placeholder="Máximo de 200 caracteres..." value={desc} onChange={e => setDesc(e.target.value)}></textarea>
                        </div> 

                        <div>
                            <strong>Horários disponíveis:</strong>
                            {room && room.map(onlyRoom => (
                                <div className="horarios">
                                    {onlyRoom.horariosDisp.map(horario => (
                                        <span>{`${horario} - `}</span>
                                    ))}
                                </div>
                            ))}
                        </div>

                        <div className="input">
                            <label htmlFor="">Digite o horário que você deseja agendar a reunião</label>
                            <input type="text" required placeholder="Ex: seg9h" value={horario} onChange={e => setHorario(e.target.value)}/>
                        </div>

                        <button type="submit">Criar Reunião</button> 
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateMeeting