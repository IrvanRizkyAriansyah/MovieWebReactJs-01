import '../App';
import React, {useState, useEffect} from 'react';
import { Input } from 'antd';
import Logo from '../assets/logo.svg';
import {useNavigate} from 'react-router-dom';
import Login from '../component/Login';
import Register from '../component/Register';
import ButtonPrimary from '../component/ButtonPrimary';

export default function Nav() {
  // const [user, setUser] = useState([])
  const [userGoogle, setUserGoogle] = useState([])
  const navigate = useNavigate()
  const { Search } = Input;
  const onSearch = (query) => navigate(`/search/${query}`);
  const token =  JSON.parse(localStorage.getItem('token'));
  const profile = JSON.parse(localStorage.getItem('user'));
  
  console.log(profile)
  const loadUser = () => {
    try {
      setUserGoogle(profile)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    loadUser()
  }, [])

  return (
    <div className="nav" style={{width:'100%', position: 'absolute', zIndex: 3, alignItems: 'center'}}>
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
      profile !== null && token !== null ? 
      <div style={{display: 'flex', justifyContent:'space-between', alignItems: 'center'}}>
      <h3 style={{color: 'white', fontWeight: 'bold', marginBottom: 0, display: 'flex', alignItems: 'center'}}>{userGoogle.givenName}</h3> 
      <img src={userGoogle.imageUrl} alt="" style={{borderRadius: '50%',height: '2.5rem',marginTop: 5 }}/>
      <ButtonPrimary title="Logout" click={()=>window.location.reload(localStorage.clear())} />
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
