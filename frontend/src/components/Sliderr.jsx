import React from 'react';

import 'slick-carousel/slick/slick.css'
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import FeatureCard from './features/FeatureCard';
  
const Sliderr = ({data}) => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    // slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    lazyLoad: true,
    autoplay: true,
    speed: 700,
    autoplaySpeed: 5000,
    cssEase: "linear",

    responsive: [
      {
        breakpoint: 3500,
        settings: {
          slidesToShow: (data.length < 4) ? data.length : 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: (data.length < 3) ? data.length : 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 750,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: (data.length < 2) ? data.length : 2,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: (data.length < 1) ? data.length : 1,
          slidesToScroll: 1
        }
      }
    ]
  };
    return (
        <Slider {...settings}>
          {data.length > 0 && data.map(product => (
            <div className='d-flex justify-content-center' key={product._id}>
              <FeatureCard feature={product} key={product._id}/>
            </div>
          ))}
        </Slider>   
    );
}

export default Sliderr;
