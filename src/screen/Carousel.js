import '../App';
import { useState, useEffect } from "react";
import axios from 'axios';
import React from 'react';
import { Carousel, Card } from 'antd';
import ButtonTrailer from '../component/ButtonTrailer';

export default function Poster() {
  const [trend, setTrend] = useState([])
  
  const loadTrend = async () => {
    try {
      axios.get(`${process.env.REACT_APP_BASE_URL}/movie/popular`, {
      params: {
        api_key: process.env.REACT_APP_TMBD_KEY
      }
    }).then((res) => {
      let data = (res.data.results)
      if(data.length >= 3) { 
        data.splice(3);
        setTrend(data)
      }
    })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    loadTrend()
  }, [])

  return (
    <div>
      <Carousel autoplay>
      {
        trend.map((res, index) => {
          return(
            <div>
              <div style={{
                display: 'flex',
                height: '100vh',
                color: '#fff',
                textAlign: 'left',
                paddingLeft: '6rem',
                paddingRight: '50%',
                alignItems: 'center',
                backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5)), url(https://image.tmdb.org/t/p/original${res.backdrop_path})`,
                backgroundSize: 'cover'
              }}>
              <div>
              <h1 style={{fontWeight: 700, color: '#fff'}}>{res.title}</h1>
              <p>{res.overview}</p>
              <ButtonTrailer title={res.title} />
              </div>
              </div>
            </div>
          )
        })
      }
      </Carousel>
    </div>
  );
}
