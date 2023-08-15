import  Axios  from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Product from './Product'
import './product.css'
import BrandSideBar from '../../components/brandSideBar/BrandSideBar';
const Products = () => {
    const {category} = useParams()
    const [page, setPage] = useState(1)
    const [pageCount, setPageCount] = useState(0)
    const [brands, setBrands] = useState([])
    const [data, setData] = useState([])
    const [brandSelected, setBrandSelected] = useState([])

    const handleChange = (e, value) => {
        setPage(value);
      };

    useEffect(() => {
        // Function to fetch data using Axios
        const fetchData = async () => {
        try {
            const response = await Axios.get(`http://localhost:8000/product/${category}?brand=${brandSelected}& page=${page}`)
            setData(response.data.products)
            setPageCount(response.data.PageCount)
            setBrands(response.data.brands)
        } catch (error) {
            console.log(error);
        }
        };
        // Call the function to fetch data
        fetchData();
    }, [page, brandSelected])

    return (
        <div className='d-flex'>
        <div className='product wrapper' >
            <div className='product_container'>
                {
                    data.map(product => (
                        <Product product={product} key={product._id} />
                        )
                        )}
            </div>
            <div className='d-flex justify-content-center mt-5'>
            <Stack spacing={2}>
                {pageCount > 0 && <Pagination count={pageCount} page={page} onChange={handleChange} color='primary' />}
            </Stack>
            </div>
        </div>
        <BrandSideBar products={data} brands={brands} brandSelected={brandSelected} setBrandSelected={setBrandSelected}/>
        </div>
    );
}

export default Products;
