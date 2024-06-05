import React, { useEffect, useContext } from 'react';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import ThumbsUpDownOutlinedIcon from '@mui/icons-material/ThumbsUpDownOutlined';
import {CustomerContext} from '../../context/CustomerContext' 
import { AuthContext } from '../../context/AuthContext';
import PersonalDetails from './CustomerComponents/PersonalDetails';
import AddressDetails from './CustomerComponents/AddressDetails';
import Orders from './CustomerComponents/Orders';
import MyReviews from './CustomerComponents/MyReviews';
import './customerProfile.css'

const CustomerProfile = () => {
    const {currentUser} = useContext(AuthContext);
    const {customer, fetchCustomerData, editCustomerData, editAddress} = useContext(CustomerContext);
    const [selectedComponent, setSelectedComponent] = React.useState(1);
    const [customerData, setCustomerData] = React.useState({
        first_name: '',
        last_name: '',
        email: '',
        address: {
            city: "",
            phone_number: "",
            postal_code: "",
            recipient_name: "",
            street_address: ""
        }
    })
    useEffect(() => {
        if(currentUser){
            fetchCustomerData()
        }
    }, [currentUser])
    
    useEffect(()=> {
        if (customer) {
            setCustomerData({
                name: {
                    first_name: customer.first_name,
                    last_name: customer.last_name
                },
                email: customer.email,
                address: {
                    city: customer.address?.city,
                    phone_number: customer.address?.phone_number,
                    postal_code: customer.address?.postal_code,
                    recipient_name: customer.address?.recipient_name,
                    street_address: customer.address?.street_address
                }
            })
        }
        }, [customer])

    return (
        <div className='profileComponent'>
            <div className='wrapper customerProfile'>
            {!currentUser ? <h2 className='text-danger'>You must login first</h2> : 
            <>
                <h2 className='mb-5'>My Account</h2>
                <div className='row gap-5'>
                    <div className='col-2'>
                        <ul className='list'>
                            <li className={selectedComponent === 1 ? 'selected' : ''} onClick={()=> setSelectedComponent(1)}><span><AccountCircleOutlinedIcon /></span> My details</li>
                            <li className={selectedComponent === 2 ? 'selected' : ''} onClick={()=> setSelectedComponent(2)}><span><FmdGoodOutlinedIcon /></span> My address</li>
                            <li className={selectedComponent === 3 ? 'selected' : ''} onClick={()=> setSelectedComponent(3)}><span><ShoppingBagOutlinedIcon /></span> My orders</li>
                            <li className={selectedComponent === 4 ? 'selected' : ''} onClick={()=> setSelectedComponent(4)}><span><ThumbsUpDownOutlinedIcon /></span> My reviews</li>
                        </ul>
                    </div>
                    <div className='SelectedComponent col-9'>
                        {selectedComponent === 1 && <PersonalDetails customerData={customerData.name} editCustomerData={editCustomerData}/>}
                        {selectedComponent === 2 && <AddressDetails address={customerData.address} editAddress={editAddress} />}
                        {selectedComponent === 3 && <Orders />}
                        {selectedComponent === 4 && <MyReviews reviews={customer.reviews} />}
                    </div>
                </div>
            </>
            }
            </div>
        </div>
    );
}

export default CustomerProfile;
