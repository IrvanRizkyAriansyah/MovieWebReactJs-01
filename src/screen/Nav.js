import '../App';
import React from 'react';
import { Input } from 'antd';
import Logo from '../assets/logo.svg';
import {useNavigate} from 'react-router-dom';
import Login from '../component/Login';
import Register from '../component/Register';

export default function Nav() {
  const navigate = useNavigate()
  const { Search } = Input;
  const onSearch = (query) => navigate(`/search/${query}`);

  return (
    <div>
    <div className="nav" style={{width: '100%',position: 'absolute', zIndex: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
    <img src={Logo} alt="logo" onClick={() => navigate(`/`)} style={{cursor: "pointer"}}/>
    <Search
      placeholder="What do you want to watch?"
      onSearch={onSearch}
      style={{
        width: '50%',
        justifyContent: 'center'
      }}
    />
    
    <div style={{width: '20%', display: 'flex', justifyContent:'space-between'}}>
      <Login />
      <Register />
    </div>
    </div>
    </div>
  );
}
