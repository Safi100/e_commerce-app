import React from 'react';

const BenefitCard = ({title, body, image, alt}) => {
    return (
        <div className='benefit_card'>
            <div><img src={image} alt={alt} /></div>
            <div className='benefit_card_text'>
                <h3 className='mb-0'>{title}</h3>
                <p className='mb-0'>{body}</p>
            </div>
        </div>
    );
}

export default BenefitCard;
