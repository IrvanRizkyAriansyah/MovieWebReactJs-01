import React, { useState } from 'react'
import ButtonBorder from './ButtonBorder'
import { Form, Input, Modal } from 'antd';
import axios from 'axios';
import ButtonPrimary from './ButtonPrimary';
import '../App';
import { MailOutlined } from '@ant-design/icons';

export default function Login() {
	const [isModalOpen, setIsModalOpen] = useState(false);
  
  const showModal = () => {
    setIsModalOpen(true);
  };

  const onFinish = async (values) => {
  	try {
      const res = await axios.post("https://notflixtv.herokuapp.com/api/v1/users/login",values)
      localStorage.setItem("token",JSON.stringify(res.data.data.token))
      console.log(res.data.data.token)
      setIsModalOpen(false);
      window.location.reload(1);
    } catch (error) {
        console.error(error)
    }
  };

	return (
		<div>
      <ButtonBorder title="Login" click={showModal} />
	    <Modal title="Login In to Your Account" open={isModalOpen} footer={null}>
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
    
          <ButtonPrimary type="submit" title="Login"/>
        </Form>
	    </Modal>
		</div>
	)
}
