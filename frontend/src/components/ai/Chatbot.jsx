// frontend/src/components/ai/Chatbot.jsx
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './Chatbot.css';

const Chatbot = () => {
    const [messages, setMessages] = useState([
        {
            text: "Hello! I'm your MediTracker AI Assistant. How can I help you with your medications today? 💊",
            sender: 'ai',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const chatEndRef = useRef(null);

    // Auto-scroll to bottom
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const sendMessage = async () => {
        const message = input.trim();
        if (!message || loading) return;

        console.log('📤 Sending message:', message);
        
        // Add user message
        const userMessage = {
            text: message,
            sender: 'user',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setLoading(true);

        try {
            // Get token if exists
            const token = localStorage.getItem('token');
            
            console.log('📡 Making API call...');
            
            // TRY MULTIPLE ENDPOINTS in order
            const endpoints = [
                'http://localhost:3004/api/ai/chat',  // Direct backend
            'http://127.0.0.1:3004/api/ai/chat',  // Alternative
            '/api/ai/chat',                       // Proxy
            'http://localhost:3004/ai/chat',      // Different path
            'http://127.0.0.1:3004/ai/chat'       // Alternative path
            ];
            
            let response = null;
            let lastError = null;
            
            for (const endpoint of endpoints) {
                try {
                    console.log(`🔄 Trying endpoint: ${endpoint}`);
                    response = await axios.post(endpoint, {
                        query: message
                    }, {
                        headers: {
                            'Content-Type': 'application/json',
                            ...(token && { 'Authorization': `Bearer ${token}` })
                        },
                        timeout: 5000
                    });
                    console.log(`✅ Success with endpoint: ${endpoint}`);
                    break; // Success, exit loop
                } catch (err) {
                    lastError = err;
                    console.log(`❌ Failed with ${endpoint}:`, err.message);
                    continue; // Try next endpoint
                }
            }
            
            if (!response) {
                throw lastError || new Error('All endpoints failed');
            }

            console.log('✅ API Response:', response.data);
            
            // Handle response - check ALL possible response fields
            // let aiText = '';
            
            // if (response.data.reply) {
            //     aiText = response.data.reply;
            // } else if (response.data.response) {
            //     aiText = response.data.response;
            // } else if (response.data.message) {
            //     aiText = response.data.message;
            // } else if (response.data.text) {
            //     aiText = response.data.text;
            // } else if (typeof response.data === 'string') {
            //     aiText = response.data;
            // } else {
            //     // Fallback if no expected field
            //     console.warn('Unexpected response structure:', response.data);
            //     aiText = "I'm here to help with your medication questions! 💊";
            // }
            let aiText = '';

if (response.data.reply) {
    aiText = response.data.reply;
} else if (response.data.response) {
    const resp = response.data.response;
    if (typeof resp === 'string') {
        aiText = resp;
    } else if (typeof resp === 'object' && resp.response) {
        aiText = resp.response;
    } else {
        aiText = "I'm here to help with your medication questions! 💊";
    }
} else if (response.data.message) {
    aiText = response.data.message;
} else if (response.data.text) {
    aiText = response.data.text;
} else if (typeof response.data === 'string') {
    aiText = response.data;
} else {
    aiText = "I'm here to help with your medication questions! 💊";
}


            const aiMessage = {
                text: aiText,
                sender: 'ai',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            
            setMessages(prev => [...prev, aiMessage]);

        } catch (error) {
            console.error('❌ Chat error:', error);
            console.error('Error details:', error.response?.data || error.message);
            
            // Show specific error messages
            let errorText = "⚠️ I'm having trouble connecting. Please try again!";
            
            if (error.response?.status === 404) {
                errorText = "⚠️ AI service is currently unavailable. Please check if the backend is running on port 3004.";
            } else if (error.response?.status === 401) {
                errorText = "🔒 Please login to use the AI assistant.";
            } else if (error.code === 'ECONNREFUSED') {
                errorText = "🔌 Backend server not running. Please start the backend on port 3004.";
            } else if (error.message.includes('timeout')) {
                errorText = "⏱️ Request timeout. The AI is taking too long to respond.";
            }
            
            const errorMessage = {
                text: errorText,
                sender: 'ai',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <div className="chatbot-container">
            <div className="chatbot-header">
                <h3>💊 AI Assistant</h3>
                <small>Ask about medications, side effects, or schedules</small>
            </div>
            
            <div className="chat-messages">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.sender}`}>
                        <div className="message-content">
                            {msg.text}
                        </div>
                        <div className="message-time">{msg.time}</div>
                    </div>
                ))}
                {loading && (
                    <div className="message ai">
                        <div className="message-content typing">
                            <span className="typing-dots">
                                <span>.</span><span>.</span><span>.</span>
                            </span>
                        </div>
                    </div>
                )}
                <div ref={chatEndRef} />
            </div>
            
            <div className="chat-input-area">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your medication question..."
                    disabled={loading}
                />
                <button 
                    onClick={sendMessage}
                    disabled={loading || !input.trim()}
                    className="send-button"
                >
                    {loading ? (
                        <span className="loading-spinner">● ● ●</span>
                    ) : 'Send'}
                </button>
            </div>
            
            <div className="chatbot-footer">
                <small>💡 AI responses are informational. Always consult healthcare professionals.</small>
            </div>
        </div>
    );
};

export default Chatbot;