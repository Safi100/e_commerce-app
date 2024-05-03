import React from 'react';
import './forget_pass.css';
import Axios from 'axios'

const ForgetPass = () => {
    const [email, setEmail] = React.useState('');
    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState('');

    const handleEmailChange = (e) => {
        const text = e.target.value.trimStart();
        setEmail(text);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);
        Axios.post('http://localhost:8000/user/send-reset-mail', {email})
        .then(res => {
            setSuccess(true);
            setEmail('');
        })
        .catch(err => setError(err.response.data.error))
    }

    return (
        <div className='bg_container'>
            <form method='POST' onSubmit={handleSubmit}>
                <div className='input'>
                    <label htmlFor="email">Email</label>
                    <input name='email' value={email} onChange={handleEmailChange}  id='email' type="email" required/>
                </div>
                <a href="/login">Back to login</a>
                {error && <p className='text-danger'>{error}</p>}
                {success && <p className='text-success mb-0 mt-2'>Email sent successfully (check spam folder).</p>}
                <button className='Btn'>Request code</button>
            </form>
        </div>
    );
}

export default ForgetPass;