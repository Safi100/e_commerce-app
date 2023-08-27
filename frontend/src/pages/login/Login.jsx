import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import Axios from 'axios'
import './login.css'

const Login = () => {
    const Navigate = useNavigate()
    const [formData, setFormData] = useState({
      email: '',
      password: '',
    })
    const [error, setError] = useState('')
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      const text = value.trimStart();
      setFormData((prevData) => ({
        ...prevData,
        [name]: text
      }))
    }

    const HandleLogin = (e) => {
      e.preventDefault()
      Axios.post('http://localhost:8000/user/login', {...formData})
      .then(res => {
        if(res.status === 200){
          setError('')
          Navigate('/login')
        }
      })
      .catch(err => setError(err.response.data.error))
    }
    return (
        <div className='Log_container'>
          <form onSubmit={HandleLogin}>
            <div className='grid'>
                <div className='input input_full'>
                  <label htmlFor="email">Email</label>
                  <input name='email' onChange={handleInputChange} value={formData.email} id='email' type="email" required/>
                </div>
                <div className='input'>
                  <label htmlFor="pass">Password</label>
                  <input name='password' onChange={handleInputChange} value={formData.password} id='pass' type="password" placeholder='At least 6 characters' required/>
                </div>
            </div>
            {error && <p className='error'>{error}</p>}
            <div className='RegBtn_div'>
              <a href="/register">Don't have an account? Sign up</a>
              <button className='RegBtn' type='submit'>Regsiter</button>
            </div>
          </form>
        </div>
    );
}

export default Login;
