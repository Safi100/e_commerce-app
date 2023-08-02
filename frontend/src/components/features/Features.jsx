import React, { useEffect, useState } from 'react';
import Axios from 'axios'
import Carousel from 'react-elastic-carousel';
import FeatureCard from '../../components/features/FeatureCard'

const Features = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        // Function to fetch data using Axios
        const fetchData = async () => {
          try {
            const response = await Axios.get('http://localhost:8000/product/feature');
            console.log(response.data);
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
            <div className='feature'>
                <div className="wrapper">
                    <h2 className='mb-4 text-center'>Chosen for you</h2>
                        <div className="feature_container">
                          {data.map(feature => <FeatureCard feature={feature} />)}
                        </div>
                </div>
            </div>
        }
        </>
    );
}

export default Features;
