import React from 'react';
import { useParams } from 'react-router-dom'
import Axios from 'axios'

const ResetPassword = () => {
    const {UserID, token} = useParams()
    const [formData, setFormData] = React.useState({
        password: '',
        confirmPassword: ''
    });
    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const text = value.trimStart();
        setFormData((prevData) => ({
            ...prevData,
            [name]: text
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);
        Axios.post(`http://localhost:8000/user/reset-password/${UserID}/${token}`, {...formData})
        .then(res => {
            setSuccess(res.data.message);
            setFormData({
                password: '',
                confirmPassword: ''
            })
        })
        .catch(err => {
            setError(err.response.data.error);
            console.log(err.response.data.error);
        })
    }
    return (
        <div className='bg_container'>
            <form method='POST' onSubmit={handleSubmit}>
                <div className='input'>
                    <label htmlFor="password">Password</label>
                    <input name='password' value={formData.password} onChange={handleInputChange}  id='password' type="text" required/>
                </div>
                <div className='input'>
                    <label htmlFor="ConfirmPassword">Confirm password</label>
                    <input name='confirmPassword' value={formData.confirmPassword} onChange={handleInputChange}  id='ConfirmPassword' type="text" required/>
                </div>
                <a href="/login">Back to login</a>
                {error && <p className='text-danger'>{error}</p>}
                {success && <p className='text-success mb-0 mt-2'>{success}</p>}
                <button className='Btn'>Reset Password</button>
            </form>
        </div>
    );
}

export default ResetPassword;
