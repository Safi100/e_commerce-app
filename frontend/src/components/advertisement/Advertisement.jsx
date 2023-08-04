import React, { useEffect, useState } from 'react';
import Axios from 'axios'
const Advertisement = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        // Function to fetch data using Axios
        const fetchData = async () => {
          try {
            const response = await Axios.get('http://localhost:8000/advertisement');
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
            <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
                {data.length > 1 && 
                    <div className="carousel-indicators">
                        {data.map((adv, index) => (
                            <button key={index} type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide-to={index} className={`${index === 0 ? 'active' : ''} `} aria-current="true" aria-label={`Slide ${index + 1}`}></button>
                        ))}
                    </div>
                }
                <div className="carousel-inner">
                    {data.length > 0 && data.map((adv, index) => (
                        <a href={adv.link} className={`carousel-item ${(index === 0) ? 'active' : '' }`} key={adv._id}>
                            <img src={adv.image.url} loading='lazy' className="d-block w-100 carousel-image" />
                        </a>
                    ))}
                </div>
                {data.length > 1 && <>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </>}
            </div>
            }
        </>
    );
}

export default Advertisement;
