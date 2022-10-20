import React, { useState } from 'react'
import ButtonBorder from './ButtonBorder'
import { Form, Input, Modal } from 'antd';
import axios from 'axios';
import ButtonPrimary from './ButtonPrimary';
import '../App';
import { MailOutlined } from '@ant-design/icons';
import { GoogleLogin } from '@react-oauth/google';

export default function Login() {
	const [isModalOpen, setIsModalOpen] = useState(false);
  
  const showModal = () => {
    setIsModalOpen(true);
  };
  
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = async (values) => {
  	try {
        const res = await axios.post("https://notflixtv.herokuapp.com/api/v1/users/login",values)
        localStorage.setItem("token",JSON.stringify(res.data.data.token))
        localStorage.setItem("user",JSON.stringify(res.data.data))
        setIsModalOpen(false);
        window.location.reload(1);
    } catch (error) {
        console.error(error)
    }
  };

	return (
		<div>
      <ButtonBorder title="Login" click={showModal} />
	    <Modal title="Login In to Your Account" open={isModalOpen} onCancel={handleCancel} footer={null}>
        <Form
          name="normal_login"
          className="login-form"
          onFinish={onFinish}
        >
        <Form.Item
            name="email"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}
          >
            <Input suffix={<MailOutlined />} className="round-input" placeholder="Email Address"/>
        </Form.Item>
        
        <Form.Item
          name="password"
          rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
            ]}
          >
            <Input.Password
              className="round-input"
              type="password"
              placeholder="Password"
            />
          </Form.Item>
    
          <div style={{width: '62%', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <ButtonPrimary type="submit" title="Login"/>
          <GoogleLogin
              shape={'pill'}
              onSuccess={credentialResponse => {
              console.log(credentialResponse);
              localStorage.setItem("token", JSON.stringify(credentialResponse.credential));
              localStorage.setItem("user", JSON.stringify({first_name: 'Google User', image: ''}));
              setIsModalOpen(false);
              window.location.reload(1);
            }}
            onError={() => {
              console.log('Login Failed');
            }}
          />
          </div>
        </Form>
	    </Modal>
		</div>
	)
}
