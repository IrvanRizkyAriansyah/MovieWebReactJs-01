import '../App';
import { useState, useEffect } from "react";
import axios from 'axios';
import React from 'react';
import {useParams} from 'react-router-dom';
import { Card } from 'antd';
import Credit from './Credit'
import Navbar from './Nav'

export default function Detail() {
  const [detail, setDetail] = useState([])
  const [credit, setCredit] = useState([])
  const {id} = useParams()
  const { Meta } = Card

  const loadDetail = async () => {
    try {
      await axios.get(`${process.env.REACT_APP_BASE_URL}/movie/${id}`, {
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
    <>
    <Navbar />
    <div style={{
        height: '100vh',
        width: 'auto',
        color: '#fff',
        textAlign: 'left',
        justifyContent: 'center',
        paddingLeft: '6rem',
        paddingRight: '50%',
        paddingTop: '6rem',
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(https://image.tmdb.org/t/p/original${detail.backdrop_path})`,
        backgroundSize: 'cover'
      }}>
    <h1 style={{fontWeight: 'bold', color: '#fff'}}>{detail.original_title}</h1>
    <p>{detail.overview}</p>
    </div>
    <Credit id={id}/>
    </>
  );
}
