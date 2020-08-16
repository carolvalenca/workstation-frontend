import React from 'react'
import { Link } from 'react-router-dom'

import './style.css'

function Menu(){
    return (
        <div id="menu-container">
            <div className="links">
                <Link to="/edit">Editar informações</Link>
                <Link to="/meetings">Reuniões</Link>
                <Link to="/meetingrooms">Salas de Reunião</Link>
                <Link to="/crudmeetings">CRUD de Reuniões</Link>
                <Link to="/users">CRUD de Usuários</Link>
                <Link to="/crudmeetingroom">CRUD de Salas de Reunião</Link>
            </div>
        </div>
    )
}

export default Menu