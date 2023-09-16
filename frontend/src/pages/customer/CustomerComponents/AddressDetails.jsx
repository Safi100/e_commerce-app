import React, {useEffect, useState} from 'react';
import Alert from '@mui/material/Alert';

const AddressDetails = ({address, editAddress}) => {
    const [locked, setLocked] = useState(false)
    useEffect(()=> {
      if(address){
        setFormData({ ...address });
        setLocked(true)
      }
    }, [])
    const [formData, setFormData] = useState({
        recipient_name: '',
        street_address: '',
        city: '',
        postal_code: '',
        phone_number: '',
      });
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
      const handleSubmit = (e) => {
        if(locked) return
        e.preventDefault();
        editAddress({...formData})
        setLocked(true)
      };
          
      return (
        <div className="address-form-container">
          {!address && <Alert spacing={2} severity="warning">You don't have an address... Please update your address to proceed with ordering.</Alert>}
          {address && <Alert severity="warning">To avoid any issues, please ensure the accuracy of this address before order.</Alert>}
          <form className='mt-2' onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="recipient_name">Recipient Name:</label>
              <input
                disabled={locked}
                type="text"
                id="recipient_name"
                name="recipient_name"
                value={formData.recipient_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="street_address">Street Address:</label>
              <input
                disabled={locked}
                type="text"
                id="street_address"
                name="street_address"
                value={formData.street_address}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="city">City:</label>
              <input
                disabled={locked}
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="postal_code">Postal Code:</label>
              <input
                disabled={locked}
                type="text"
                id="postal_code"
                name="postal_code"
                value={formData.postal_code}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone_number">Phone Number:</label>
              <input
                disabled={locked}
                type="text"
                id="phone_number"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                required
              />
            </div>
            {!locked && <button type="submit">Update address</button>}
            {locked && <p className='mb-0 locked' onClick={()=> setLocked(false)}>Edit</p>}
          </form>
        </div>
      );
};

export default AddressDetails;
