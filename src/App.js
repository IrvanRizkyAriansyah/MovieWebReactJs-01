import './App.css';
import React from 'react';
import Poster from './screen/Carousel'
import Navbar from './screen/Nav'
import Trending from './screen/Trending'
import Genre from './component/GenreHome'

export default function App() {
  return (
    <>
      <Navbar />
      <Poster />
      <Trending />
      <Genre />
    </>
  );
}
