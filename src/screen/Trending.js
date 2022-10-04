import '../App';
import { useState, useEffect } from "react";
import axios from 'axios';
import React from 'react';
import { Card } from 'antd';
import {useNavigate} from 'react-router-dom'

export default function Trending() {
  const [trend, setTrend] = useState([])
  const { Meta } = Card;
  const navigate = useNavigate()
  
  const loadTrend = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/movie/popular`, {
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
    <h1 style={{paddingBottom : '2rem'}}>Popular Movie</h1>
    <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 15rem)', gap: '2rem', justifyContent: 'center'}}>
      { trend &&
        trend.map((res, index) => {
          return(
            <Card
              hoverable key={res.id}
              style={{ borderRadius: 10, width: 'auto', height: 'auto' }}
              cover={<img alt="example" src={`https://image.tmdb.org/t/p/w500${res.poster_path}`} style={{borderRadius: 10}}
              onClick={() => navigate(`/Movie/${res.id}`)}/>}
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
