import React, {useEffect, useState} from 'react';
import '../assets/css/Login.scss';
import { Form, Input, Button, notification, Result } from 'antd';
import { useMutation } from "@apollo/client";
import {LOGIN, SIGNUP} from "../queries/AuthMutations";
import { useHistory } from "react-router";

const LoginComponent = () => {
    const [login, { data }] = useMutation(LOGIN);
    const history = useHistory();
    const [ Signup, { data: signupData } ] = useMutation(SIGNUP);
    const [signup, toggleSignup] = useState(false);
    const [error, setError] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if(data && data.hasOwnProperty('Login')) {
            localStorage.setItem('token', data.Login.token);
            history.push('/home');
        }
        if(signupData?.Signup) {
            notification['success']({
                message: 'Sign up',
                description:
                    'You were signed up successfully',
            });
           window.location.href = '/';
        }
    });

    const layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 16,
        },
    };
    const tailLayout = {
        wrapperCol: {
            offset: 8,
            span: 16,
        },
    };
    return (
        error ? <Result status="403" title="403" subTitle={error} extra={<Button type="primary" onClick={() => {
            window.location.href = '/'
            }}>Back</Button>}/>:
            <div className="login-container">
                <span className="login-container-welcome"> Welcome to TV Maze.</span>
                <span className="login-container-login"> { signup ? 'Please signup to proceed': 'Please login to proceed'}</span>
                <Form
                    {...layout}
                    className="login-container-form"
                    name="basic"
                    initialValues={{
                        remember: true,
                    }}
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email',
                            },
                        ]}
                    >
                        <Input onChange={e => setEmail(e.target.value)} />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password onChange={e => setPassword(e.target.value)} />
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit" onClick={() => {
                            if(signup) {
                                return Signup({ variables: { email, password }}).catch(err => setError(err.message));
                            }
                            login({ variables: {
                                    email: email, password: password
                                }}).catch((err) => {
                                setError(err.message)
                            })
                        }}>
                            Submit
                        </Button>
                        <a href="#signup" className="login-container-signup" onClick={() => {
                            toggleSignup(true);
                        }}> Don't have an account? Sign Up</a>
                    </Form.Item>
                </Form>
            </div>
    )
}

export default LoginComponent;

