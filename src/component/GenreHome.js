import React from 'react'
import { useState, useEffect } from "react";
import axios from 'axios';
import ListGenre from './ListGenre';
import { Card, Button } from 'antd';
import {useNavigate} from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import {ArrowRightOutlined} from '@ant-design/icons';

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

// import required modules
import { FreeMode, Pagination } from "swiper";

export default function Genres() {

	const [trend, setTrend] = useState([])
  	const navigate = useNavigate()
  
  	const loadTrend = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/movie/popular`, {
      params: {
        api_key: process.env.REACT_APP_TMBD_KEY
      }
    }).then((res) => {
      console.log("datas =>", res.data.results)
      setTrend(res.data.results)
    })
    } catch (error) {
      console.error(error)
    }
  	}
    

  	useEffect(() => {
    	loadTrend()
  	}, [])

	return (
		<div className="container">
		<h2 style={{fontWeight: 600, paddingBottom: '2rem'}}>Browse by Category</h2>
		<ListGenre />
			<Swiper
        slidesPerView={4}
        spaceBetween={30}
        freeMode={true}
        modules={[FreeMode, Pagination]}
        className="mySwiper"
      >
      { trend &&
        trend.map((res, index) => {
          return(
            <SwiperSlide> 
            <Card
              hoverable key={res.id}
              style={{ borderRadius: 10, width: 'auto', height: 'auto', margin: '0.5rem'}}
              bodyStyle ={{padding: 0}}
              cover={<img src={`https://image.tmdb.org/t/p/w500${res.poster_path}`} style={{borderRadius: 10}}
              onClick={() => navigate(`/movie/${res.id}`)}/>}
            /> 
            </SwiperSlide>
          )
        })
      }
    </Swiper>
		</div>
	)
}