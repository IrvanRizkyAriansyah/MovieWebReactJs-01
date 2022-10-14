import React, { useState } from 'react'
import ButtonBorder from './ButtonBorder'
import { Form, Input, Modal } from 'antd';
import axios from 'axios';
import ButtonPrimary from './ButtonPrimary';
import '../App';


export default function Login() {
	const [open, setOpen] = useState(false);


  const onFinish = async (values) => {
  	try {
      const res = await axios.post("http://notflixtv.herokuapp.com/api/v1/users/login",values)
      localStorage.setItem("token",JSON.stringify(res.data.data.token))
      setOpen(false)
    } catch (error) {
      console.error(error)
    }
  };

  	const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };

	return (
		<div>
	      <ButtonBorder title="Login" click={showModal} />
	      <Modal
	        title="Login In to Your Account"
	        open={open}
	        onCancel={handleCancel}
	        footer={null}
	      >
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
        <Input className="round-input" placeholder="Email Address"/>
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

      <ButtonPrimary type="submit" title="Login" />
    </Form>
	      </Modal>
		</div>
	)
}
