import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

const ChatComponent = ({ data }) => {
    const [messages, setMessages] = useState([
        { id: 1, sender: 'bot', text: "INIT_SEQUENCE_COMPLETE. I am the Iron Kernel. Grid online. Upload a data packet (document) to commence processing." }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    // Initialize Gemini AI
    const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSend = async () => {
        if (!input.trim()) return;
        if (!data) {
            setMessages(prev => [...prev, { id: Date.now(), sender: 'user', text: input }]);
            setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'bot', text: "ERROR: NO DATA PACKET DETECTED. Upload required for analysis matrix." }]);
            setInput('');
            return;
        }

        const userMsg = { id: Date.now(), sender: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        try {
            // Context from the loaded document
            const docContext = `
            You are "Iron Kernel", a highly advanced, robotic AI system.
            Speak in short, technical, computer-like sentences. Use terms like "PROCESSING", "ACKNOWLEDGED", "DATA RETRIEVED", "KERNEL PANIC" (for confusion), and "EXECUTING".
            Do not use polite conversational filler like "Can I help you?". Be direct and efficient.
            
            The user has uploaded a document with the following content/structure:
            TITLE: ${data.template.split('\n')[0]}
            FULL CONTENT:
            ${data.template}
            
            VARIABLES TO EXTRACT:
            ${JSON.stringify(data.variables)}

            Please answer the user's question based on this contract context using your robotic persona.
            `;

            const chat = model.startChat({
                history: [
                    {
                        role: "user",
                        parts: [{ text: docContext }],
                    },
                    {
                        role: "model",
                        parts: [{ text: "SYSTEM_READY. DATA_LOADED. AWAITING_QUERY." }],
                    },
                ],
            });

            const result = await chat.sendMessage(input);
            const response = await result.response;
            const text = response.text();

            setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'bot', text: text }]);
        } catch (error) {
            console.error("Error calling Gemini API:", error);
            setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'bot', text: "I'm sorry, I encountered an error connecting to the AI service. Please check your network or API key." }]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="chat-container">
            <div className="chat-header">
                <h3>💬 AI Legal Assistant (Powered by Gemini)</h3>
                <span className="status-badge" style={{ borderColor: isTyping ? '#FFD700' : '#22FF88', color: isTyping ? '#FFD700' : '#22FF88' }}>
                    {isTyping ? 'THINKING...' : 'ONLINE'}
                </span>
            </div>

            <div className="messages-area">
                {messages.map((msg) => (
                    <div key={msg.id} className={`message-bubble ${msg.sender === 'user' ? 'user-msg' : 'bot-msg'}`}>
                        {msg.sender === 'bot' && <div className="bot-avatar">🤖</div>}
                        <div className="message-content">
                            {msg.text.split('\n').map((line, i) => (
                                <p key={i}>{line}</p>
                            ))}
                        </div>
                    </div>
                ))}
                {isTyping && (
                    <div className="message-bubble bot-msg">
                        <div className="bot-avatar">🤖</div>
                        <span className="typing-dot">.</span>
                        <span className="typing-dot">.</span>
                        <span className="typing-dot">.</span>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="input-area">
                <input
                    type="text"
                    placeholder="Ask about the document..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    disabled={isTyping}
                />
                <button onClick={handleSend} disabled={!input.trim() || isTyping}>SEND</button>
            </div>
        </div>
    );
};

export default ChatComponent;
