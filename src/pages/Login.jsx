import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const sendPostRequest = async() => {
        try {
            const res = await axios.post('http://localhost:5000/user/login', {email, password})
            console.log(res.data)
        } catch(err) {
            console.log(err)
        }
    }

    const handleClick = (e) => {
        e.preventDefault()
        sendPostRequest()
    }

  return (
    <div>
    <Link to={'/'}>Home</Link>

        <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
            <h1>Login</h1>
            <label>Email</label>
            <input value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <label>Password</label>
            <input value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <button onClick={handleClick}>Login</button>
        </div>
    </div>
  )
}

export default Login