import '../App';
import { useState, useEffect } from "react";
import axios from 'axios';
import React from 'react';
import { Card } from 'antd';

export default function Credit(props) {
  const [cast, setCast] = useState([])
  const { Meta } = Card;

  const loadCredit = async () => {
    try {
      await axios.get(`${process.env.REACT_APP_BASE_URL}/movie/${props.id}/credits`, {
      params: {
        api_key: process.env.REACT_APP_TMBD_KEY
      }
      }).then((res) => {
        console.log(res.data.cast)
        setCast(res.data.cast)
      })
    } catch (error) {
      console.error(error)
    }
  }

  var filtered = cast.filter(function(e){
    return e.profile_path !== null 
  })

  useEffect(() => {
    loadCredit()
  }, [])

  return (
    <div className="container">
    {console.log("filter",filtered)}
    <h1 style={{paddingBottom : '2rem'}}>Cast and Crew Info</h1>
    <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 15rem)', gap: '2rem', justifyContent: 'center'}}>
    { cast &&
        cast.filter(function(e){
          return e.profile_path !== null 
        }).map((res, index) => {
          return(
            <Card
              hoverable key={res.cast_id}
              style={{ borderRadius: 10, width: 'auto', height: 'auto' }}
              cover={<img alt="example" src={`https://image.tmdb.org/t/p/w500${res.profile_path}`} style={{borderRadius: 10}}
              />}
            >
              <Meta title={res.name} />
            </Card>
          )
        })
      }
    </div>
    </div>
  );
}
