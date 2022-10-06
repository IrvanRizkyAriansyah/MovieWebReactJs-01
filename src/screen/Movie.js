import '../App';
import { useState, useEffect } from "react";
import axios from 'axios';
import React from 'react';
import { Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import Header from '../component/Header';
import Navbar from './Nav'

export default function Movie() {
  const [movie, setMovie] = useState([])
  const { Meta } = Card;
  const navigate = useNavigate()
  
  const loadMovie = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/discover/movie`, {
      params: {
        api_key: process.env.REACT_APP_TMBD_KEY,
      }
    }).then((res) => {
      console.log("datas =>", res.data.results)
      setMovie(res.data.results)
    })
    } catch (error) {
      console.error(error)
    }
  }

  const nextPage = async (num) => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/discover/movie`, {
      params: {
        api_key: process.env.REACT_APP_TMBD_KEY,
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
    <>
    <Navbar />
    <Header query="" />
    <div className="container">
    <h2 style={{paddingBottom: '2rem'}}>All Movies</h2>
    <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 15rem)', gap: '2rem', justifyContent: 'center'}}>
      {
        movie.map((res, index) => {
          return(
            <Card
              hoverable key={res.id}
              style={{ borderRadius: 10, width: 'auto', height: 'auto' }}
              bodyStyle={{padding: 0}}
              cover={<img alt="example" src={`https://image.tmdb.org/t/p/w500${res.poster_path}`} style={{borderRadius: 10}}
              onClick={() => navigate(`/movie/${res.id}`)}/>}
            >
            </Card>
          )
        })
      }
    </div>
    </div>
    </>
  );
}