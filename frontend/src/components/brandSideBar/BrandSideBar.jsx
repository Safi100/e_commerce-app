import React, { useState } from 'react';
import './BrandSideBar.css'

const BrandSideBar = ({brands, brandSelected, setBrandSelected, setPage}) => {
    const handleCheckedBrands = (e) => {
        const Brand = e.target.value;
        const isChecked = e.target.checked
        if(isChecked){
            setBrandSelected([...brandSelected, Brand])
        }else{
            setBrandSelected(brandSelected.filter(item => item !== Brand));
        }
        setPage(1);
    }
    return (
        <div className='brandContainer'>
            <h2 className='fs-4'>Manufacturer</h2>
            {brands.map(brand => (
                (brand.products?.length > 0) ?
                <div key={brand._id}>
                <label className='d-flex cursor-pointer' htmlFor={brand._id} >
                    <label htmlFor={brand._id}>{brand.BrandName.toUpperCase()} </label>
                    <input value={brand._id} onChange={handleCheckedBrands} name='brandSelected[]' id={brand._id} type="checkbox" />
                </label>
            </div> : null
            ))}
        </div>
    );
}

export default BrandSideBar;
