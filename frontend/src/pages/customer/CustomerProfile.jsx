import React, { useEffect, useContext } from 'react';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import ThumbsUpDownOutlinedIcon from '@mui/icons-material/ThumbsUpDownOutlined';
import './customerProfile.css'
import {CustomerContext} from '../../context/CustomerContext' 
import PersonalDetails from './CustomerComponents/PersonalDetails';
import AddressDetails from './CustomerComponents/AddressDetails';
const CustomerProfile = () => {
    const customerContext = useContext(CustomerContext);
    const [selectedComponent, setSelectedComponent] = React.useState(1);
    return (
        <div className='profileComponent'>
        <div className='wrapper customerProfile'>
            <h2 className='mb-5'>My Account</h2>
            <div className='row gap-5'>
            <ul className='list col-2'>
                <li className={selectedComponent === 1 ? 'selected' : ''} onClick={()=> setSelectedComponent(1)}><span><AccountCircleOutlinedIcon /></span> My details</li>
                <li className={selectedComponent === 2 ? 'selected' : ''} onClick={()=> setSelectedComponent(2)}><span><FmdGoodOutlinedIcon /></span> My address</li>
                <li className={selectedComponent === 3 ? 'selected' : ''} onClick={()=> setSelectedComponent(3)}><span><ShoppingBagOutlinedIcon /></span> My orders</li>
                <li className={selectedComponent === 4 ? 'selected' : ''} onClick={()=> setSelectedComponent(4)}><span><ThumbsUpDownOutlinedIcon /></span> My reviews</li>
            </ul>
            <div className='SelectedComponent col-9'>
                {selectedComponent === 1 && <PersonalDetails customer={customerContext.customer} />}
                {selectedComponent === 2 && <AddressDetails address={customerContext.customer.address} editAddress={customerContext.editAddress} />}
                {selectedComponent === 3 && <div>3</div>}
                {selectedComponent === 4 && <div>4</div>}
            </div>
            </div>
        </div>
        </div>
    );
}

export default CustomerProfile;
