import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import Axios from 'axios'
import './login.css'
import Alert from '@mui/material/Alert';
import { AuthContext } from '../../context/AuthContext';

const Login = () => {
    const {loading, dispatch} = useContext(AuthContext)
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
      dispatch({type: "LOGIN_START"})
      Axios.post('http://localhost:8000/user/login', {...formData})
      .then(res => {
        if(res.status === 200){
          setError('')
          dispatch({type: "LOGIN_SUCCESS", payload: res.data})
          Navigate('/')
        }
      })
      .catch(err => {
        setError(err.response.data.error)
        dispatch({type: "LOGIN_FAILURE", payload: err.response.data})
      })
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
            {error &&  <div className='mt-4'><Alert severity="error">{error}!</Alert></div>}
            <div className='RegBtn_div'>
              <a href="/register">Don't have an account? Sign up</a>
              <button className='RegBtn' type='submit'>Login</button>
            </div>
          </form>
        </div>
    );
}

export default Login;
