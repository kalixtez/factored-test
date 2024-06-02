import { useState } from 'react'
import { Button, TextField } from '@mui/material';
import { loginButtonStyle, loginTextFieldStyle } from './styles/LoginStyles';

import './styles/login.css'
import { useNavigate } from 'react-router';

function Login() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  async function authenticate(uname, password) {

    const data = { 'username': uname, 'password': password }
    const body = JSON.stringify(data)

    const req = {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    }

    try {
      const res = await fetch('http://localhost:8000/', req)
      const res_data = await res.json()
      if(res_data.auth === true)
      {
        const skills = res_data.skills.split(', '); // Convert the skills that I receive from the DB to array.
        navigate("/profile", {state: {name: res_data.name, skills: skills}})
      }
    }

    catch (e) {
      console.error(e)
    }
  }

  return (
    <div className='login-all-container'>
      <div className='login-container'>
        <div className='login-element-container'>
          <h2> Log in</h2>
          <TextField sx={loginTextFieldStyle} label='Username' onChange={(e) => { setUsername(e.target.value) }}> Username </TextField>
          <TextField sx={loginTextFieldStyle} label='Password' type='password' onChange={(e) => { setPassword(e.target.value) }}> Password </TextField>
          <div className='login-button' >
            <Button onClick={() => authenticate(username, password)} sx={{ ...loginButtonStyle }}> Access </Button> </div>
        </div>
      </div>
    </div>
  )
}

export default Login