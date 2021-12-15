import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Form, Input, Button } from 'antd';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import WithWorkService from '../hoc/with-work-service';

const Register = ({ WorkService }) => {


    const [error] = useAuthState(auth)


    const onRegister = (values) => {
        WorkService.registerWithEmailAndPassword(values.name, values.email, values.password)
    }

    const onRegisterFailed = () => {
        alert(error)
    }

    return (
        <Form
            name="login"
            labelCol={{ span: 4, offset: 4 }}
            wrapperCol={{ span: 8 }}
            initialValues={{ remember: true }}
            onFinish={onRegister}
            onFinishFailed={onRegisterFailed}
            autoComplete="off"
            className='register-form'
        >

            <Form.Item
                label="name"
                name="name"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="email"
                name="email"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
                <Button type="primary" htmlType="submit">
                    Register
                </Button>
            </Form.Item>

        </Form>


    )
}


export default WithWorkService()(Register)