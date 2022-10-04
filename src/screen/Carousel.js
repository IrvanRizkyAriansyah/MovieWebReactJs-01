import '../App';
import { useState, useEffect } from "react";
import axios from 'axios';
import React from 'react';
import { Carousel, Card } from 'antd';

export default function Poster() {
  const [trend, setTrend] = useState([])
  const { Meta } = Card;
  
  const loadTrend = async () => {
    try {
      const res = axios.get(`${process.env.REACT_APP_BASE_URL}/movie/popular`, {
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
  
  const contentStyle = {
  height: '100vh',
  color: '#fff',
  textAlign: 'left',
  paddingLeft: '4rem',
  paddingTop: '40vh',
  backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(https://image.tmdb.org/t/p/w500${trend.poster_path})`
  };

  return (
    <div>
      <Carousel autoplay>
      {
        trend.map((res, index) => {
          return(
            <div>
              <div style={{
                height: '100vh',
                color: '#fff',
                textAlign: 'left',
                paddingLeft: '6rem',
                paddingRight: '50%',
                paddingTop: '40vh',
                backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(https://image.tmdb.org/t/p/original${res.backdrop_path})`,
                backgroundSize: 'cover'
              }}>
              <h1 style={{fontWeight: 'bold', color: '#fff'}}>{res.title}</h1>
              <p>{res.overview}</p>
              </div>
            </div>
          )
        })
      }
      </Carousel>
    </div>
  );
}
