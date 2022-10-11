import '../App';
import { useState, useEffect } from "react";
import axios from 'axios';
import React from 'react';
import { Card, Button } from 'antd';
import {useNavigate} from 'react-router-dom'
import { Swiper, SwiperSlide } from "swiper/react";
import {ArrowRightOutlined} from '@ant-design/icons'

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

// import required modules
import { FreeMode, Pagination } from "swiper";


export default function Trending() {
  const [trend, setTrend] = useState([])
  const navigate = useNavigate()
  
  const loadTrend = async () => {
    try {
      await axios.get(`${process.env.REACT_APP_BASE_URL}/movie/popular`, {
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
    <div style={{display:'flex', justifyContent: 'space-between', paddingBottom: '2rem'}}>
      <h2 style={{fontWeight: 600}}>Popular Movie</h2>
      <Button danger size='large' type='link' onClick={() => navigate(`/movie`)}
        style={{fontSize: '14pt', alignItems: 'center', display: 'flex'}}
      > See All Movie <ArrowRightOutlined /> </Button>
    </div>
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
              cover={<img src={`https://image.tmdb.org/t/p/w500${res.poster_path}`} alt="poster" style={{borderRadius: 10}}
              onClick={() => navigate(`/movie/${res.id}`)}/>}
            /> 
            </SwiperSlide>
          )
        })
      }
    </Swiper>
    </div>
  );
}
