import React, { createContext, useContext, useState, useEffect } from 'react';

const NexusContext = createContext();

export const useNexus = () => {
    return useContext(NexusContext);
};

export const NexusProvider = ({ children }) => {
    const [messages, setMessages] = useState([]);
    const [alerts, setAlerts] = useState([]);
    const [activeUsers, setActiveUsers] = useState([
        { id: 'doc-1', name: 'Dr. House', role: 'doctor', status: 'online' },
        { id: 'nurse-1', name: 'Nurse Joy', role: 'nurse', status: 'busy' },
    ]);

    // AI Message Router Simulator
    const routeMessage = (msg, senderRole) => {
        const timestamp = new Date().toISOString();
        const newMessage = { id: Date.now(), text: msg, sender: senderRole, timestamp, tags: [] };

        // Simple AI Tagging Logic
        if (msg.toLowerCase().includes('pain') || msg.toLowerCase().includes('hurt')) {
            newMessage.tags.push('#clinical');
            // Auto-trigger nurse alert
            addAlert('High Pain Reported: ' + senderRole);
        } else if (msg.toLowerCase().includes('bill') || msg.toLowerCase().includes('cost')) {
            newMessage.tags.push('#admin');
        } else {
            newMessage.tags.push('#general');
        }

        setMessages(prev => [...prev, newMessage]);
        return newMessage;
    };

    const addAlert = (text) => {
        const newAlert = { id: Date.now(), text, active: true };
        setAlerts(prev => [newAlert, ...prev]);

        // Auto-dismiss after 5s
        setTimeout(() => {
            setAlerts(prev => prev.filter(a => a.id !== newAlert.id));
        }, 5000);
    };

    const value = {
        messages,
        routeMessage,
        alerts,
        activeUsers
    };

    return (
        <NexusContext.Provider value={value}>
            {children}
        </NexusContext.Provider>
    );
};
