'use client'
import React, { useEffect } from 'react';

const Chatbot = () => {
  useEffect(() => {
    // Setting up the embedded chatbot configuration
    window.embeddedChatbotConfig = {
      chatbotId: "3shSWCZ0uGKIu6PBk83zg",
      domain: "www.chatbase.co"
    };

    // Creating and appending the script element
    const script = document.createElement('script');
    script.src = "https://www.chatbase.co/embed.min.js";
    script.defer = true;
    script.setAttribute('chatbotId', '3shSWCZ0uGKIu6PBk83zg');
    script.setAttribute('domain', 'www.chatbase.co');
    document.body.appendChild(script);

    // Clean up the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null; // No JSX to render, as the chatbot is handled via the script
};

export default Chatbot;