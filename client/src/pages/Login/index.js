import React, { useState } from 'react';
import api from '../../services/api';

import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';

import './styles.css'

export default function Login({ history }) {
    const login = async (data) => {
        console.log('sending');
        const response = await api.post('http://localhost:3000/api/users/auth/login',{data});
        console.log('response', response.data._doc);
        const token = response.data.token;
        console.log(token);
        history.push(`/chat?name=${response.data._doc.name}&avatar=${response.data._doc.avatar}&id=${response.data._doc._id}&token=${token}`)
    }

    const responseFacebook = (response) => {
        // console.log(response);
        const user = {
            name: response.name,
            email: response.email,
            avatar: response.picture.data.url
        }
        console.log(user);
        login(user);
        // take to backend, compile and let into the chat room
    }
  
    const responseGoogle = (response) => {
        const user = {
            name: response.profileObj.name,
            email: response.profileObj.email,
            avatar: response.profileObj.imageUrl,
        }
        console.log(user);
        login(user);
    }
    
    return (
        <div className="login-container">
            <FacebookLogin
                appId="" //APP ID NOT CREATED YET
                fields="name,email,picture"
                callback={responseFacebook}
            />
            <br />
            <br />
            <GoogleLogin
                clientId="" //CLIENTID NOT CREATED YET
                buttonText="LOGIN WITH GOOGLE"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
            />
        </div>
    )
}
