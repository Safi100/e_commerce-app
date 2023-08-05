import  Axios  from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const Products = () => {
    const {category} = useParams()
    const [page, setPage] = useState(1)
    const [pageCount, setPageCount] = useState(0)
    const [data, setData] = useState([])

    const handleChange = (e, value) => {
        setPage(value);
      };

    useEffect(() => {
        // Function to fetch data using Axios
        const fetchData = async () => {
        try {
            const response = await Axios.get(`http://localhost:8000/product/${category}?page=${page}`)
            setData(response.data.products)
            setPageCount(response.data.PageCount)
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
        };
        // Call the function to fetch data
        fetchData();
    }, [page])

    return (
        <div>
            <Stack spacing={2}>
                <a>Page: {page}</a>
                {pageCount > 0 && <Pagination count={pageCount} page={page} onChange={handleChange} color='secondary' />}
                
            </Stack>
        </div>
    );
}

export default Products;
