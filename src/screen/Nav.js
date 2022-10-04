import '../App';
import { useState, useEffect } from "react";
import axios from 'axios';
import React from 'react';
import { Card, Input } from 'antd';
import Logo from '../assets/logo.svg'

export default function Nav() {

  const { Search } = Input;
  const onSearch = (value) => console.log(value);

  return (
    <div>
    <div className="nav" style={{width: '100%',position: 'absolute', zIndex: 3, display: 'flex', justifyContent: 'space-between'}}>
    <img src={Logo} />
    <Search
      placeholder="input search text"
      onSearch={onSearch}
      style={{
        width: '50%',
      }}
    />
    </div>
    </div>
  );
}
