import React from 'react';
import Advertisement from '../../components/advertisement/Advertisement';
import Features from '../../components/features/Features'
import Categories from '../../components/categories/Categories';
import Benefits from '../../components/benefits/Benefits';
import Sliderr from '../../components/Sliderr';



const Index = () => {
    return (
    <>
        <Advertisement />
        <Benefits />
        <Features type={'cohsen_for_you'} heading={'Chosen for you'}/>
        <Categories/>
        <Features type={'new_arrival'} heading={'New arrival'} />
    </>
    );
}

export default Index;
