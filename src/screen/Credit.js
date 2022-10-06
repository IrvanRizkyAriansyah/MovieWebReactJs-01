import '../App';
import { useState, useEffect } from "react";
import axios from 'axios';
import React from 'react';
import { Card } from 'antd';
import { Swiper, SwiperSlide } from "swiper/react";
import {ArrowRightOutlined} from '@ant-design/icons'

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

// import required modules
import { FreeMode, Pagination } from "swiper";

export default function Credit(props) {
  const [cast, setCast] = useState([])
  const [crew, setCrew] = useState([])
  const { Meta } = Card;

  const loadCast = async () => {
    try {
      await axios.get(`${process.env.REACT_APP_BASE_URL}/movie/${props.id}/credits`, {
      params: {
        api_key: process.env.REACT_APP_TMBD_KEY
      }
      }).then((res) => {
        console.log(res.data.cast)
        setCast(res.data.cast.slice(0,5))
      })
    } catch (error) {
      console.error(error)
    }
  }

  const loadCrew = async () => {
    try {
      await axios.get(`${process.env.REACT_APP_BASE_URL}/movie/${props.id}/credits`, {
      params: {
        api_key: process.env.REACT_APP_TMBD_KEY
      }
      }).then((res) => {
        console.log('credit',res.data)
        setCrew(res.data.crew.slice(0,10))
      })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    loadCast()
    loadCrew()
  }, [])

  return (
    <div className="container">
    <h2 style={{paddingBottom : '2rem'}}>Cast and Crew Info</h2>
    <Swiper
        slidesPerView={4}
        spaceBetween={30}
        freeMode={true}
        modules={[FreeMode, Pagination]}
        className="mySwiper"
      >
      { cast &&
        cast.filter(function(e){
          return e.profile_path !== null 
        }).map((res, index) => {
          return(
            <SwiperSlide> 
            <Card
              hoverable key={res.id}
              style={{ borderRadius: 10, width: 'auto', height: 'auto', margin: '0.5rem'}}
              bodyStyle ={{padding: '1rem'}}
              cover={<img src={`https://image.tmdb.org/t/p/w500${res.profile_path}`} style={{borderRadius: 10}} />}
            >
              <Meta title={res.name} description={res.character} />
            </Card>
            </SwiperSlide>
          )
        }) 
      }
      { crew &&
        crew.filter(function(e){
          return e.profile_path !== null 
        }).map((res, index) => {
          return(
            <SwiperSlide> 
            <Card
              hoverable key={res.id}
              style={{ borderRadius: 10, width: 'auto', height: 'auto', margin: '0.5rem'}}
              bodyStyle ={{padding: '1rem'}}
              cover={<img src={`https://image.tmdb.org/t/p/w500${res.profile_path}`} style={{borderRadius: 10}} />}
            >
              <Meta title={res.name} description={res.job} />
            </Card>
            </SwiperSlide>
          )
        })
      }
    </Swiper>
    </div>
  );
}
