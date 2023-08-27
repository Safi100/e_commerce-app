import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import Axios from 'axios'
import './register.css'

const Register = () => {
    const Navigate = useNavigate()
    const [formData, setFormData] = useState({
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      confirmPassword: ''
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

    const HandleRegister = (e) => {
      e.preventDefault()
      Axios.post('http://localhost:8000/user/register', {...formData})
      .then(res => {
        if(res.status === 200){
          setError('')
          Navigate('/login')
        }
      })
      .catch(err => setError(err.response.data.error))
    }
    return (
        <div className='reg_container'>
          <form onSubmit={HandleRegister}>
            <div className='grid'>
                <div className='input'>
                  <label htmlFor="fname">First Name</label>
                  <input name='first_name' onChange={handleInputChange} value={formData.first_name} id='fname' type="text" required/>
                </div>
                <div className='input'>
                  <label htmlFor="lname">Last Name</label>
                  <input name='last_name' onChange={handleInputChange} value={formData.last_name} id='lname' type="text" required/>
                </div>
                <div className='input input_full'>
                  <label htmlFor="email">Email</label>
                  <input name='email' onChange={handleInputChange} value={formData.email} id='email' type="email" required/>
                </div>
                <div className='input'>
                  <label htmlFor="pass">Password</label>
                  <input name='password' onChange={handleInputChange} value={formData.password} id='pass' type="password" placeholder='At least 6 characters' required/>
                </div>
                <div className='input'>
                  <label htmlFor="ConfirmPass">Re-enter password</label>
                  <input name='confirmPassword' onChange={handleInputChange} value={formData.confirmPassword} id='ConfirmPass' type="password" placeholder='Confirm your password' required/>
                </div>
            </div>
            {error && <p className='error'>{error}</p>}
            <div className='RegBtn_div'>
              <p><a href="/login">Have an account? Sign in</a></p>
              <button className='RegBtn' type='submit'>Regsiter</button>
            </div>
          </form>
        </div>
    );
}

export default Register;
