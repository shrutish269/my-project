import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5001');

const Chat = () => {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [chatLog, setChatLog] = useState([]);

  useEffect(() => {
    socket.on('receive_message', data => {
      setChatLog(prev => [...prev, data]);
    });

    return () => socket.off('receive_message');
  }, []);

  const sendMessage = () => {
    if (username && message) {
      socket.emit('send_message', {
        user: username,
        text: message,
        time: new Date().toLocaleTimeString()
      });
      setMessage('');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Real-Time Chat</h2>

      <input
        type="text"
        placeholder="Your name"
        value={username}
        onChange={e => setUsername(e.target.value)}
        style={styles.input}
      />

      <div style={styles.chatBox}>
        {chatLog.map((msg, index) => (
          <div key={index} style={styles.message}>
            <strong>{msg.user}</strong> [{msg.time}]: {msg.text}
          </div>
        ))}
      </div>

      <input
        type="text"
        placeholder="Type your message..."
        value={message}
        onChange={e => setMessage(e.target.value)}
        style={styles.input}
      />

      <button onClick={sendMessage} style={styles.button}>Send</button>
    </div>
  );
};

const styles = {
  container: {
    width: '400px',
    margin: '50px auto',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center'
  },
  title: {
    marginBottom: '20px'
  },
  input: {
    width: '80%',
    padding: '10px',
    margin: '10px 0',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc'
  },
  chatBox: {
    backgroundColor: '#f9f9f9',
    padding: '10px',
    borderRadius: '5px',
    height: '250px',
    overflowY: 'auto',
    textAlign: 'left',
    marginBottom: '10px',
    border: '1px solid #ddd'
  },
  message: {
    marginBottom: '8px'
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};

export default Chat;