import React, { useEffect , useState} from 'react';
import Axios from 'axios'
import Category from './CategoryCard';
import './categories.css'
const Categories = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        // Function to fetch data using Axios
        const fetchData = async () => {
          try {
            const response = await Axios.get('http://localhost:8000/category');
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
            <section className='categories'>
                {console.log(data)}
                <div className="wrapper">
                    <div className="categories_container">
                        {data.map(category => (
                            category.products.length > 0 && <Category category={category} key={category._id}/>
                            ))}
                    </div>
                </div>
            </section>
        }
        </>
    );
}

export default Categories;
