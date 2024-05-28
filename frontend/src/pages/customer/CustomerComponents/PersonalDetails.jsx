import React, { useEffect, useState } from 'react';

const CustomerDetails = ({customerData, editCustomerData}) => {
    const [locked, setLocked] = useState(false)
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        password: '',
        confirmPassword: ''
    })
    useEffect(()=> {
        if(customerData){
            setFormData({ 
                ...customerData,
                password: '', 
                confirmPassword: '' 
            });
            setLocked(true)
        }
    }, [customerData])
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const text = value.trimStart();
        setFormData((prevData) => ({
            ...prevData,
            [name]: text
        }))
    }
    const handleSubmit = (e) => {
        if(locked) return
        e.preventDefault();
        editCustomerData({first_name: formData.first_name, last_name: formData.last_name})
        setLocked(true)
    };
    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="first_name">First Name:</label>
                    <input 
                        disabled={locked} type="text" id="first_name" name="first_name"
                        value={formData.first_name || ''}  onChange={handleInputChange} 
                        required
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor="last_name">Last Name:</label>
                    <input 
                        disabled={locked} type="text" id="last_name" name="last_name"
                        value={formData.last_name || ''}  onChange={handleInputChange} 
                        required
                    />
                </div>
                {!locked && <button type="submit">Update profile data</button>}
                {locked && <p className='mb-0 locked' onClick={()=> setLocked(false)}>Edit</p>}
            </form>
        </div>
    );
}

export default CustomerDetails;
