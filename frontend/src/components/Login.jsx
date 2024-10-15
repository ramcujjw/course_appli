import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, TextField } from '@mui/material'
import axios from 'axios'

const Login = () => {
    const [user, setUser] = useState({
        username:'',
        password:''
    })
    const navigate = useNavigate()
    let updateUser=(e)=>{
        setUser({...user,[e.target.name]:e.target.value})
}
let sendData=()=>{
//      if ((user.username=="admin" )&&(user.password=="1234")) {
//         localStorage.setItem("username","admin"); //method to store value in variable
//         navigate('/home');

//     }
//      else alert("Invalid credentials")
axios.post('http://localhost:3000/user/login',user).then((res)=>{
    console.log(res)
})

}



  return (
    <>
    <div>Login</div>
    <br />
    <TextField required id="outlined-required" label="Username" name="username" value={user.username} onChange={updateUser} />
    <br />
    <br />
    <TextField required id="outlined-required" label="Password" name="password" value={user.password} onChange={updateUser} />
    <br />
    <br />
    <Button variant="contained" onClick={sendData}> Submit</Button> 
    </>

  )
}

export default Login