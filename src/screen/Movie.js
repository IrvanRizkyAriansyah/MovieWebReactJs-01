import '../App';
import { useState, useEffect } from "react";
import axios from 'axios';
import React from 'react';
import { Card } from 'antd';

export default function Movie() {
  const [movie, setMovie] = useState([])
  const { Meta } = Card;
  
  const loadMovie = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/discover/movie`, {
      params: {
        api_key: process.env.REACT_APP_TMBD_KEY
      }
    }).then((res) => {
      console.log("datas =>", res.data.results)
      setMovie(res.data.results)
    })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    loadMovie()
  }, [])

  return (
    <div className="container">
    <h1 style={{paddingBottom : '2rem'}}>All Movie</h1>
    <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 15rem)', gap: '2rem', justifyContent: 'center'}}>
      {
        movie.map((res, index) => {
          return(
            <Card
              hoverable key={res.id}
              style={{ borderRadius: 10, width: 'auto', height: 'auto' }}
              cover={<img alt="example" src={`https://image.tmdb.org/t/p/w500${res.poster_path}`} style={{borderRadius: 10}}
              />}
            >
              <Meta title={res.title} />
            </Card>
          )
        })
      }
    </div>
    </div>
  );
}
