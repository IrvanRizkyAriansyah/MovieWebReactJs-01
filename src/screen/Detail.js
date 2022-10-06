import '../App';
import { useState, useEffect } from "react";
import axios from 'axios';
import React from 'react';
import {useParams} from 'react-router-dom';
import { Card, Button } from 'antd';
import Credit from './Credit';
import Navbar from './Nav';
import ButtonTrailer from '../component/ButtonTrailer';
import {StarOutlined} from '@ant-design/icons'


export default function Detail() {
  const [detail, setDetail] = useState([])
  const [genre, setGenre] = useState([])
  const [rating, setRating] = useState(null)
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
        setGenre(res.data.genres)
        setRating(res.data.vote_average.toFixed(1))
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
        display: 'flex',
        height: '100vh',
        width: 'auto',
        color: '#fff',
        textAlign: 'left',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: '6rem',
        paddingRight: '50%',
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(https://image.tmdb.org/t/p/original${detail.backdrop_path})`,
        backgroundSize: 'cover'
      }}>
    <div>
    <h1 style={{fontWeight: 'bold', color: '#fff'}}>{detail.original_title}</h1>
    <div style={{display: 'flex'}}>
    {genre.map((res, index) =>{
        return (
          <p>{res.name}&emsp;</p>
        )}
      )}
    </div>
    <p>{detail.overview}</p>
    <h5 style={{display: 'flex', alignItems: 'center', fontWeight: 'bold', color: '#fff', marginBottom: '1rem'}}>
    <StarOutlined style={{color: "yellow", marginRight: '0.5rem'}}/>{rating} / 10 </h5>
    <ButtonTrailer title={detail.title} />
    </div>
    </div>
    <Credit id={id}/>
    </>
  );
}
