import { Navigate, Outlet } from 'react-router-dom';
import React from "react"



const PrivateRoutes=()=>{
    const token =localStorage.getItem('token')
    let verifyUser=false
    if (token) {
        verifyUser=true
    }
    return(
        verifyUser?<Outlet/>:<Navigate to={'/'}/>
    )
}
export default PrivateRoutes