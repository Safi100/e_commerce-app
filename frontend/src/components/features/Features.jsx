import React, { useEffect, useState } from 'react';
import Axios from 'axios'
import Sliderr from '../Sliderr';

const Features = ({type, heading}) => {
    const [data, setData] = useState([])

    useEffect(() => {
        // Function to fetch data using Axios
        const fetchData = async () => {
          try {
            const response = await Axios.get(`http://localhost:8000/product/${type}`);
            setData(response.data)
          } catch (error) {
            console.log(error);
          }
        };
        // Call the function to fetch data
        fetchData();
      }, []);

    return (
        <>
        {data.length > 0 && 
            <section className='feature'>
                <div className="wrapper">
                  <h2 className='mb-4 text-center'>{heading}</h2>
                    <Sliderr data={data} />
                </div>
            </section>
        }
        </>
    );
}

export default Features;
