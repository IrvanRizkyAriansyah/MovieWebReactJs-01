import '../App';
import { useState, useEffect } from "react";
import axios from 'axios';
import React from 'react';
import { Card, Input } from 'antd';
import Logo from '../assets/logo.svg';
import {useNavigate} from 'react-router-dom';
import ButtonPrimary from '../component/ButtonPrimary';
import ButtonBorder from '../component/ButtonBorder'

export default function Nav() {
  const navigate = useNavigate()
  const { Search } = Input;
  const onSearch = (query) => navigate(`/search/${query}`);

  return (
    <div>
    <div className="nav" style={{width: '100%',position: 'absolute', zIndex: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
    <img src={Logo} onClick={() => navigate(`/`)} style={{cursor: "pointer"}}/>
    <Search
      placeholder="What do you want to watch?"
      onSearch={onSearch}
      style={{
        width: '50%'
      }}
    />
    <div style={{width: '20%', display: 'flex', justifyContent:'space-between'}}>
      <ButtonBorder title="Login" />
      <ButtonPrimary title="Register" />
    </div>
    </div>
    </div>
  );
}
