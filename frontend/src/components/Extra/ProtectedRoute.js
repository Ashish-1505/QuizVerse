import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAppContext } from '../../context/appContext'

const ProtectedRoute = ({children,allowedRoles}) => {
    const {user} = useAppContext()
    if(!user){
        return <Navigate to='/login'/>
    }
    if (!allowedRoles.includes(user.role)) {
        // Redirect to an unauthorized page or show an error message
        return <Navigate to="/unauthorizedaccess" />;
    }
    return children
}

export default ProtectedRoute
