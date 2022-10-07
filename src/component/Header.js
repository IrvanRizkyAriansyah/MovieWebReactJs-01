import React from 'react'
import Teater from '../assets/teater.jpg'

export default function Header(props) {
	return (
		<div style={{
            display: 'flex',
            height: '50vh',
            color: '#fff',
            textAlign: 'left',
            paddingLeft: '6rem',
            alignItems: 'center',
            backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5)), url(${Teater})`,
            backgroundSize: 'cover'
        }}>
        <h1 style={{color:'#fff'}}>{props.query}</h1>
		</div>
	)
}