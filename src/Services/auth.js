
//servicos de verificacao de dados para tornar viavel o acesso a determinadas rotas

export const isAuthenticated = () =>  {
    if (localStorage.getItem('userInfo')) {
        return true
    } else {
        return false
    }
}

export const isAdmin = () => {
    if (localStorage.getItem('isAdmin') === "true") {
        return true
    } else {
        return false 
    }
}

export const isVerified = () => {
    if (localStorage.getItem('verificado') === 'true') {
        return true
    } else {
        return false
    }
}

export const isCompleted = () => {
    if (localStorage.getItem('completo') === 'true') {
        return true
    } else {
        return false
    }
}

