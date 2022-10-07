import '../App';
import { useState, useEffect } from "react";
import axios from 'axios';
import React from 'react';
import { Card } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../component/Header';
import Navbar from './Nav';
import ListGenre from '../component/ListGenre'

export default function Search() {
  const [movie, setMovie] = useState([])
  const {genre} = useParams()
  const navigate = useNavigate()

  const loadMovie = async () => {
    try {
      await axios.get(`${process.env.REACT_APP_BASE_URL}/search/movie`, {
      params: {
        api_key: process.env.REACT_APP_TMBD_KEY,
        query: `${genre}`
      }
    }).then((res) => {
      console.log("datas =>", res.data)
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
    <Header query={'Genres "'+genre+'"'} />
    <div className="container">
    <h2 style={{paddingBottom: '2rem'}}>Browse by Category</h2>
    <ListGenre />
    <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 15rem)', gap: '2rem', justifyContent: 'center'}}>
      { movie &&
        movie.filter(function(e){
          return e.poster_path !== null 
        }).map((res, index) => {
          return(
            <Card
              hoverable key={res.id}
              style={{ borderRadius: 10, width: 'auto', height: 'auto' }}
              bodyStyle={{ padding: 0, objectFit: 'cover' }}
              cover={<img alt="example" src={`https://image.tmdb.org/t/p/w500${res.poster_path}`} alt={res.title} style={{borderRadius: 10}}
              />}
            onClick={() => navigate(`/movie/${res.id}`)}
            />
          )
        })
      }
    </div>
    </div>
    </>
  );
}
