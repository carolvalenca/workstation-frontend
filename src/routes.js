import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import React from 'react'

import { isAuthenticated, isAdmin, isCompleted } from './Services/auth'

import Login from './Pages/Login'
import Register from './Pages/Register'
import Edit from './Pages/Edit'
import ResendEmail from './Pages/ResendEmail'
import VerifyEmail from './Pages/VerifyEmail'
import Users from './Pages/Users'
import CRUDMeetingRoom from './Pages/CRUDMeetingRoom'
import CreateRoom from './Pages/CreateRoom'
import EditRoom from './Pages/EditRoom'
import MeetingRooms from './Pages/MeetingRooms'
import Meetings from './Pages/Meetings'
import CRUDMeetings from './Pages/CRUDMeetings'
import CreateMeeting from './Pages/CreateMeeting'

//COMPONENTES DE ROTA PERSONALIZADOS 

//usado na primeira rota que sera acessada por um usuario recem logado e sem email verificado
const FirstRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
)

//usado para restringir o acesso as rotas disponiveis apenas para usuarios logados, com email verificado e informaçoes completas
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      (isAuthenticated() && isCompleted()) ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
)

//usado para restringir o acesso as rotas disponiveis apenas para usuarios logados, email verificado e com perfil de admin
const AdminRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      (isAdmin() && isAuthenticated() && isCompleted()) ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/edit", state: { from: props.location } }} />
      )
    }
  />
)

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/resend" component={ResendEmail} />
                <Route path="/verify/:token" component={VerifyEmail} />
                <FirstRoute path="/edit" component={Edit} />
                <PrivateRoute path="/meetingrooms" component={MeetingRooms} />
                <PrivateRoute path="/meetings" component={Meetings} />
                <PrivateRoute path="/crudmeetings" component={CRUDMeetings} />
                <PrivateRoute path="/createmeeting/:id" component={CreateMeeting} />
                <AdminRoute path="/users" component={Users} />
                <AdminRoute path="/crudmeetingroom" component={CRUDMeetingRoom} />
                <AdminRoute path="/createroom" component={CreateRoom} />
                <AdminRoute path="/editroom/:id" component={EditRoom} />
            </Switch>
        </BrowserRouter>
    )
}