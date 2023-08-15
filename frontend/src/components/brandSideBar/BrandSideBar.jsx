import React, { useState } from 'react';
import './BrandSideBar.css'

const BrandSideBar = ({brands, brandSelected, setBrandSelected, products}) => {
    const handleCheckedBrands = (e) => {
        const Brand = e.target.value;
        const isChecked = e.target.checked
        if(isChecked){
            setBrandSelected([...brandSelected, Brand])
        }else{
            setBrandSelected(brandSelected.filter(item => item !== Brand));
        }
    }
    return (
        <div className='brandContainer'>
            <h2 className='fs-4'>Manufacturer</h2>
            {brands.map(brand => (
                (brand.products.length > 0) ?
                <div key={brand._id}>
                <label className='d-flex cursor-pointer' htmlFor={brand._id} >
                    <label htmlFor={brand._id}>{brand.BrandName.toUpperCase()} ({products.filter(product => product.brand === brand._id).length})</label>
                    <input value={brand._id} onChange={handleCheckedBrands} name='brandSelected[]' id={brand._id} type="checkbox" />
                </label>
            </div> : ''
            ))}
        </div>
    );
}

export default BrandSideBar;
