import React from 'react';
import '../App.css'
import { useState, useEffect } from "react";
import axios from 'axios';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

// import required modules
import { FreeMode, Pagination } from "swiper";


export default function ListGenre() {
	const [genre, setGenre] = useState([])
	const navigate = useNavigate()
	  
	const loadMovie = async () => {
	try {
    await axios.get(`${process.env.REACT_APP_BASE_URL}/genre/movie/list`, {
    params: {
      api_key: process.env.REACT_APP_TMBD_KEY,
    }
    }).then((res) => {
      setGenre(res.data.genres)
    })
    } catch (error) {
      console.error(error)
    }
  	}

  	useEffect(() => {
    loadMovie()
  	}, [genre])

	return (
		<div style={{paddingBottom: '2rem'}}>
		<Swiper
        slidesPerView={6}
        spaceBetween={30}
        freeMode={true}
        modules={[FreeMode, Pagination]}
        className="mySwiper"
      	>
		{ genre.map((res, index) => {
          return(
          	<SwiperSlide> 
            <Button danger shape="round" size={'large'} ghost={true} style = {{width: '9rem'}}
            onClick={() => navigate(`/genre/${res.name}`)}
			> {res.name} </Button> 
			</SwiperSlide>
          )}
      	)}      
    	</Swiper>    
		</div>
	)
}