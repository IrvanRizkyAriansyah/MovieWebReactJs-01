import React, { useState } from 'react'
import { Modal, 
  Button,
  Form,
  Input,
  } from 'antd';
import ButtonPrimary from './ButtonPrimary';
import axios from 'axios';
import { MailOutlined, UserOutlined } from '@ant-design/icons';

export default function Login() {
	const [open, setOpen] = useState(false);

  const [form] = Form.useForm();

  const onFinish = async (values) => {
    console.log(values)
  	try {
	    const res = await axios.post("http://notflixtv.herokuapp.com/api/v1/users",values);
	    localStorage.setItem("token",JSON.stringify(res.data.data.token))
	    setOpen(false)
  	} catch(error) {
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
	      <ButtonPrimary title="Register" click={showModal} />
	      <Modal
	        title="Create Account"
	        open={open}
	        onCancel={handleCancel}
	        footer={null}
	      >
	    	<Form
      form={form}
      name="register"
      onFinish={onFinish}
      scrollToFirstError
      >
    	<Form.Item
        name="first_name"
        rules={[
          {
            required: true,
            message: 'Please input your first name!',
            whitespace: true,
          },
        ]}
      >
      <Input className="round-input" suffix={<UserOutlined />} placeholder="First Name"/>
      </Form.Item>

      <Form.Item
        name="last_name"
        rules={[
          {
            required: true,
            message: 'Please input your last name!',
            whitespace: true,
          },
        ]}
      >
      <Input className="round-input" suffix={<UserOutlined />} placeholder="Last Name"/>
      </Form.Item>

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
        <Input className="round-input" suffix={<MailOutlined />} placeholder="Email Address"/>
      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password className="round-input" placeholder="Password"/>
      </Form.Item>

      <Form.Item
        name="password_confirmation"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }

              return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password className="round-input" placeholder="Password Confirmation"/>
      </Form.Item>

      <ButtonPrimary type="submit" title="Register Now" />
      </Form>
	      </Modal>
		</div>
	)
}
