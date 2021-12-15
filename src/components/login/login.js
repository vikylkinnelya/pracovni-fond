import React from "react";
import { Link } from "react-router-dom";
import { Form, Input, Button } from 'antd';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import WithWorkService from '../hoc/with-work-service';
import './styles.css'

const Login = ({ WorkService }) => {

    const { signInWithEmailAndPassword, signInWithGoogle } = WorkService
    const [ error] = useAuthState(auth)
    
    const onFinish = (values) => {
        signInWithEmailAndPassword(values.username, values.password)
    }
    const onFinishFailed = () => {
        alert(error)
    }


    return (
        <Form
            name="login"
            labelCol={{ span: 4, offset: 4 }}
            wrapperCol={{ span: 8 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            className='login-form'
        >
            <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
                <Button type="primary" htmlType="submit">
                    Login
                </Button>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
                <Button type="primary" onClick={() => signInWithGoogle()}>
                    Login with Google
                </Button>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
                <Link to='/reset'> Forgot password</Link>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
                Dont have an account?
                <Link to='register'> Register</Link>
            </Form.Item>
        </Form>
    )
}


export default WithWorkService()(Login)