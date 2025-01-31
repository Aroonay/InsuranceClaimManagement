import React, {useState} from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";

import image1 from "../images/health-insurance.jpg";
import image2 from "../images/car-policy.jpg";

function HomePage(){
    const images=[
        image1,image2
    ];

    const [currentIndex, setCurrentIndex]=useState(0);

    const handleNext=()=>{
        setCurrentIndex((prevIndex)=>(prevIndex+1)%images.length);
    };

    const handlePrev=()=>{
        setCurrentIndex((prevIndex)=>(prevIndex-1+images.length)%images.length);
    };


    return(
        <div className="home-page">
            {/* Image Carousel */}

            <div className="carousel">
                <img src={images[currentIndex]} alt="Background" className="carousel-image"/>
                <button className="arrow left-arrow" onClick={handlePrev}>
                    <MdOutlineKeyboardArrowLeft />
                </button>
                <button className="arrow right-arrow" onClick={handleNext}>
                    <MdOutlineKeyboardArrowRight />
                </button>

                {/* View Policies Button */}
                <div className="button-container">
                    <a href="/policies" className="btn">View Policies</a>
                </div>
                
            </div>

            
    

        </div>
    )
}

export default HomePage;