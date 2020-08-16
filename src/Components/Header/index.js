import React from 'react'
import { Link, useHistory } from 'react-router-dom'

import './style.css'

import logo from './logo-incodde.png'

function Header({ action, redirect, logout }) {
    // function removeToken() {
    //     if (logout) localStorage.removeItem('userInfo')
    // }

    return (
        <div id="header-container">
            <img src={logo} alt="Logo"/>

            {/* <div className="links">
                <a href="">Editar usuário</a>
                <a href="">Workstation</a>
                <a href="">Reuniões</a>
                <a href="">sei la</a>
                <a href="">sei la</a>
                <a href="">sei la</a>
            </div> */}

            <Link to={redirect}>
                <button>
                    {action}
                </button>
            </Link>
        </div>
    )
}

export default Header 