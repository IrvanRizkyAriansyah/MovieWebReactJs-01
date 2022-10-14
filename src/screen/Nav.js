import '../App';
import React, {useState, useEffect} from 'react';
import { Input } from 'antd';
import Logo from '../assets/logo.svg';
import {useNavigate} from 'react-router-dom';
import Login from '../component/Login';
import Register from '../component/Register';
import axios from 'axios';

export default function Nav() {
  const [user, setUser] = useState([])
  const navigate = useNavigate()
  const { Search } = Input;
  const onSearch = (query) => navigate(`/search/${query}`);
  const token =  JSON.parse(localStorage.getItem('token'))
  
  const loadUser = async () => {
    try {
      await axios.get(`http://notflixtv.herokuapp.com/api/v1/users/activate`, {
      params: {
        token : `${token}`
      }
    }).then((res) => {
      setUser(res.data.data)
    })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    loadUser()
  }, [])

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
    {
      user && token !== null ? 
      <h3 style={{color: 'white', fontWeight: 'bold'}}>{user.first_name}</h3> 
      :
      <>
      <Login />
      <Register />
      </>
    }
    </div>
    </div>
    </div>
  );
}
