import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoutes = ({
    callback,
    redirectTo,
    children
}:{
    callback:boolean,
    redirectTo:string,
    children:JSX.Element
}):JSX.Element => {
    return (
        callback?<Navigate to={redirectTo} /> : children
    )
}

export default ProtectedRoutes