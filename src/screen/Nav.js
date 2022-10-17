import '../App';
import React, {useState, useEffect} from 'react';
import { Input, Col, Row } from 'antd';
import Logo from '../assets/logo.svg';
import {useNavigate} from 'react-router-dom';
import Login from '../component/Login';
import Register from '../component/Register';
import axios from 'axios';
import ButtonPrimary from '../component/ButtonPrimary';

export default function Nav() {
  const [user, setUser] = useState([])
  const navigate = useNavigate()
  const { Search } = Input;
  const onSearch = (query) => navigate(`/search/${query}`);
  const token =  JSON.parse(localStorage.getItem('token'))
  
  const loadUser = async() => {
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
  }, [user])

  return (
    <div className="nav" style={{width:'100%', position: 'absolute', zIndex: 3}}>
    <div style={{width: '25%'}}>
    <img src={Logo} alt="logo" onClick={() => navigate(`/`)} style={{cursor: "pointer"}}/>
    </div>
    <div style={{width: '50%'}}>
    <Search
      placeholder="What do you want to watch?"
      onSearch={onSearch}
      style={{
        borderRadius: '50%',
        justifyContent: 'center'
      }}
    />
    </div>
    
    <div style={{width: '25%', paddingLeft: '3rem'}}>
    {
      token !== null ? 
      <div style={{display: 'flex', justifyContent:'space-between'}}>
      <h3 style={{color: 'white', fontWeight: 'bold', marginBottom: 0, display: 'flex', alignItems: 'center'}}>{user.first_name}</h3> 
      <img src={user.image} style={{borderRadius: '50%',height: '2rem',marginTop: 5 }}/>
      <ButtonPrimary title="Logout" click={()=>localStorage.clear()} />
      </div>
      : 
      <div style={{display: 'flex', justifyContent:'space-between'}}>
      <Login />
      <Register />
      </div>
    }
    </div>
    </div>
  );
}
