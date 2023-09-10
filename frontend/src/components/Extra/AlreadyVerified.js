import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAppContext } from '../../context/appContext'

const AlreadyVerified = ({children}) => {
    const {user} = useAppContext()
    if(!user){
        return <Navigate to='/login'/>
    }else if(user && user.role==='admin' && user.verified===true){
        return <Navigate to='/dashboard'/>
    }
    else if(user && user.role==='user' && user.verified===true){
        return <Navigate to='/'/>
    }
    return children
}

export default AlreadyVerified
