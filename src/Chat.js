import React, { useEffect, useState, useRef } from 'react';

const Chat = () => {
    const ws = useRef(null); // Use useRef to persist WebSocket instance
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [username, setUsername] = useState('');
    const [isUsernameSet, setIsUsernameSet] = useState(false);

    useEffect(() => {
        // Initialize WebSocket connection only once
        ws.current = new WebSocket('ws://localhost:9080/ws-blog/chat');

        // Handle incoming messages
        ws.current.onmessage = (event) => {
            const newMessage = event.data;

            // Remove random prefix if present
            const displayMessage = newMessage.replace(/User\s[\w-]+:\s/, '');

            setMessages((prevMessages) => [...prevMessages, displayMessage]);
        };

        // Clean up WebSocket on component unmount
        return () => {
            if (ws.current) {
                ws.current.close();
            }
        };
    }, []);

    // Function to send a message with the specified username
    const sendMessage = () => {
        if (ws.current && ws.current.readyState === WebSocket.OPEN && input) {
            const messageToSend = `${username}: ${input}`; // Use specified username
            ws.current.send(messageToSend);
            setInput(''); // Clear the input field
        }
    };

    // Set the specified username
    const handleSetUsername = () => {
        if (username.trim()) {
            setIsUsernameSet(true);
        }
    };

    return (
        <div>
            <h1>WebSocket Chat</h1>

            {!isUsernameSet ? (
                // Username input screen
                <div>
                    <input 
                        type="text" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        placeholder="Enter your username"
                    />
                    <button onClick={handleSetUsername}>Start Chat</button>
                </div>
            ) : (
                // Chat interface
                <div>
                    <div style={{ border: '1px solid #ccc', height: '300px', overflowY: 'scroll', marginBottom: '10px' }}>
                        {messages.map((msg, index) => (
                            <div key={index}>{msg}</div>
                        ))}
                    </div>
                    <input 
                        type="text" 
                        value={input} 
                        onChange={(e) => setInput(e.target.value)} 
                        placeholder="Type a message..."
                    />
                    <button onClick={sendMessage}>Send</button>
                </div>
            )}
        </div>
    );
};

export default Chat;