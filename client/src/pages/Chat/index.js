import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import api from '../../services/api';
import './styles.css';

import Infobar from '../../components/Infobar';
import Input from '../../components/Input';
import Messages from '../../components/Messages';

let socket;
const room = 'global_room';
export default function Chat({ location }) {
    // console.log('location', location);
    const [name, setName] = useState('');
    const [id,setId] = useState('');
    const [avatar,setAvatar] = useState('');
    const [roomId, setRoomId] = useState(0);
    const [participants, setParticipants] = useState([]);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [token, settoken] = useState('');
    const ENDPONT = 'http://localhost:3000/'

    useEffect(() => {
        const { name, avatar, id, token } = queryString.parse(location.search);
        socket = io(ENDPONT);
        setName(name);
        setId(id);
        setAvatar(avatar);
        settoken(token);
        console.log('id :',id);
        socket.emit('join', { name, room:'global_room' }, (error) => {
            if(error) {
                alert(error);
            }
        });
        const getMessages = async () => {
            const response = await api.get('http://localhost:3000/api/messages/');
            let roomMessages = [];
            response.data.map((doc) => {
                const newMessage =  {
                    user: doc.user.name,
                    text: doc.content,
                }
                roomMessages.push(newMessage)
            });
            setMessages([...messages, ...roomMessages]);
            console.log('messages',messages);
        }
        getMessages();
        return () => {
            socket.emit('disconnect', {name});
            socket.disconnect();
        }
    }, [ENDPONT, location.search]);
    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message]);
        });
    }, [messages])

    const sendMessage = (event) => {
        event.preventDefault();
        if(message){
            socket.emit('sendMessage', {text:message,user:name}, () => setMessage(''));
            console.log(message)
            const sendMessageToDatabase = async () => {
                const response = await api.post('http://localhost:3000/api/messages/', {
                    content: message,
                    user: id
                }, {
                    headers: {
                        authorization: token
                    }
                });
            }
            sendMessageToDatabase();
        }
    }

    return (
        <div className="outer-container">
            <div className="container">
                <Infobar room={room}/>

                <Messages messages={messages} name={name}/>

                <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
            </div>
        </div>
    )
}