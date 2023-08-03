import React from 'react';
import './deal.css'
const Deal = ({deal_percent}) => {
    return (
        <div className='deal'>
            {`${deal_percent}% off`}
        </div>
    );
}

export default Deal;
