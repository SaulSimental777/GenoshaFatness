import React, { useState } from 'react';
import './VirtualInstructorComponent.css';
import customFetch from '../../Utils/customFetch';
import { IoIosSend } from "react-icons/io";
import { PiBarbellLight } from 'react-icons/pi';

const VirtualInstructorComponent = () => {
    const [messageSend, setMessageSend] = useState('');
    const [messages, setMessages] = useState([]); 

    const sendMessage = async () => {
        if (!messageSend.trim()) return; 

        const userMessage = { message: messageSend, sender: 'user' };
        setMessages((prevMessages) => [...prevMessages, userMessage]);

        try {
            const response = await customFetch.post('/virtualInstructor/virtualInstructorChat', { message: messageSend });

            const assistantMessage = { message: response.data.message, sender: 'assistant' };
            setMessages((prevMessages) => [...prevMessages, assistantMessage]);
        } catch (error) {
            console.log(error);
        }

        setMessageSend('');
    };


    return (
        <div className="virtual-instructor-container">
            <div className="chat-icon">
                <div className="icon">
                     <PiBarbellLight size={75} color='white'/>
                </div>
            </div>
            <div className="chat-container">
                <div className="messages-container">
                    <div className="messages">
                        {messages.map((msg, index) => (
                            <div key={index} className={msg.sender === 'user' ? 'user-message' : 'assistant-message'}>
                                <p>{msg.sender === 'user' ? '' : ''}</p> {msg.message}
                            </div>
                        ))}
                    </div>
                </div>
            <hr />
            <div className="response-container">
                <input
                    type="text"
                    value={messageSend}
                    onChange={(e) => setMessageSend(e.target.value)}
                    placeholder="Pregunta acerca de ejercicios, rutinas, nutricion..."
                />
                <div className="send-icon">
                    <button type='submit'  onClick={sendMessage}>
                        <IoIosSend size={20} color='white'/>
                    </button>
                </div>
            </div>
            </div>

        </div>
    );
};

export default VirtualInstructorComponent;