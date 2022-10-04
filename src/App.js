import './App.css';
import { useState, useEffect } from "react";
import axios from 'axios';
import React from 'react';
import { Card } from 'antd';
import Poster from './screen/Carousel'
import Movie from './screen/Movie'
import Navbar from './screen/Nav'
import Trending from './screen/Trending'

export default function App() {
  return (
    <div>
      <Navbar />
      <Poster />
      <Trending />
      <Movie />
    </div>
  );
}
