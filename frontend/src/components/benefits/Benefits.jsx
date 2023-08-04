import React from 'react';
import './benefits.css'
import BenefitCard from './BenefitCard';
const Benefits = () => {
    return (
        <section className='benefits'>
            <div className="wrapper">
                <div className="benefits_container">
                    <BenefitCard
                    image={'https://img.icons8.com/external-wanicon-lineal-wanicon/64/external-free-delivery-online-marketing-wanicon-lineal-wanicon.png'} 
                    alt={'external-free-delivery'} 
                    title={'Free delivery'}
                    body={'On qualifying orders over USD $300'}
                    />
                    <BenefitCard image={'https://img.icons8.com/external-ddara-lineal-ddara/64/external-fast-delivery-delivery-services-ddara-lineal-ddara.png'}
                    alt={'external-fast-delivery'}
                    title={'Fast delivery'}
                    body={'Delivery from one to three days'}
                    />
                    <BenefitCard image={'https://img.icons8.com/external-ddara-lineal-ddara/64/external-fast-delivery-delivery-services-ddara-lineal-ddara.png'}
                    alt={'external-fast-delivery'}
                    title={'Fast delivery'}
                    body={'Delivery from one to three days'}
                    />
                </div>
            </div>
        </section>
    );
}

export default Benefits;
