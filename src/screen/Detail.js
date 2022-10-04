import '../App';
import { useState, useEffect } from "react";
import axios from 'axios';
import React from 'react';
import {useParams} from 'react-router-dom'

export default function Detail() {
  const [detail, setDetail] = useState([])
  const genre=[""]
  const {id} = useParams()

  const loadDetail = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/movie/${id}`, {
      params: {
        api_key: process.env.REACT_APP_TMBD_KEY
      }
    }).then((res) => {
      console.log(res.data)
      setDetail(res.data)
    })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    loadDetail()
  }, [])

  return (
    <div style={{
        height: '100vh',
        width: 'auto',
        color: '#fff',
        textAlign: 'left',
        justifyContent: 'center',
        paddingLeft: '6rem',
        paddingRight: '50%',
        paddingTop: '2rem',
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(https://image.tmdb.org/t/p/original${detail.backdrop_path})`,
        backgroundSize: 'cover'
      }}>
    <h1 style={{fontWeight: 'bold', color: '#fff'}}>{detail.original_title}</h1>
    <h3>{detail.genres{0.name}}</h3>
    <p>{detail.overview}</p>
    </div>
  );
}
