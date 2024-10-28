import React, { useEffect, useState, useRef } from 'react';
import './Chat.css';

const Chat = () => {
    const ws = useRef(null);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [username, setUsername] = useState('');
    const [isUsernameSet, setIsUsernameSet] = useState(false);

    // List of colors to assign to users
    const colors = [
        '#4CAF50', '#FF5722', '#3F51B5', '#FF9800', '#9C27B0', '#00BCD4', '#E91E63', '#8BC34A', '#795548', '#607D8B'
    ];
    
    // Function to assign a color based on username
    const getColorForUser = (user) => {
        const hash = [...user].reduce((acc, char) => acc + char.charCodeAt(0), 0);
        return colors[hash % colors.length];
    };

    useEffect(() => {
        ws.current = new WebSocket('ws://localhost:9080/ws-blog/chat');
    
        ws.current.onmessage = (event) => {
            let newMessage = event.data;
    
            // Use a regular expression to keep only the username and message content
            newMessage = newMessage.replace(/^User\s[\w-]+:\s/, ''); // Remove prefix like 'User nC0gdDFUXg4WNiHGCtFulOM: '
    
            const senderName = newMessage.split(':')[0].trim();
            const messageText = newMessage.split(':').slice(1).join(':').trim();
    
            // Check if the message is from the current user
            const fromCurrentUser = senderName === username;
    
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: messageText, senderName, fromCurrentUser },
            ]);
        };
    
        return () => {
            if (ws.current) {
                ws.current.close();
            }
        };
    }, [username]);
    

    const sendMessage = () => {
        if (ws.current && ws.current.readyState === WebSocket.OPEN && input) {
            const messageToSend = `${username}: ${input}`;
            ws.current.send(messageToSend);
            setInput('');
        }
    };

    const handleSetUsername = () => {
        if (username.trim()) {
            setIsUsernameSet(true);
        }
    };

    return (
        <div className="chat-container">
            <h1>WebSocket Chat</h1>

            {!isUsernameSet ? (
                <div className="username-input">
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your username"
                    />
                    <button onClick={handleSetUsername}>Start Chat</button>
                </div>
            ) : (
                <div>
                    <div className="chat-box">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`message ${msg.fromCurrentUser ? 'from-current-user' : 'from-other-user'}`}
                                style={{ backgroundColor: getColorForUser(msg.senderName) }}
                            >
                                <strong>{msg.senderName}:</strong> {msg.text}
                            </div>
                        ))}
                    </div>
                    <div className="message-input-container">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type a message..."
                        />
                        <button onClick={sendMessage}>Send</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chat;
