import '../App';
import { useState, useEffect } from "react";
import axios from 'axios';
import React from 'react';
import { Card, Input } from 'antd';

export default function Nav() {

  const { Search } = Input;
  const onSearch = (value) => console.log(value);

  return (
    <div className="container">
    <Search
      placeholder="input search text"
      onSearch={onSearch}
      style={{
        width: 200,
      }}
    />
    </div>
  );
}
