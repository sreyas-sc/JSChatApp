import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3002'); // Update to your server URL

const Notification = ({ userId }) => {
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        socket.on('incomingCall', (data) => {
            const { fromUserId } = data;
            setNotification({ fromUserId });
        });

        socket.on('callTimeout', () => {
            setNotification(null);
        });

        return () => {
            socket.off('incomingCall');
            socket.off('callTimeout');
        };
    }, []);

    const handleAnswer = () => {
        socket.emit('answerCall', { toUserId: userId, fromUserId: notification.fromUserId });
        setNotification(null);
        // Redirect or update UI to show active call
    };

    const handleReject = () => {
        socket.emit('rejectCall', { toUserId: userId, fromUserId: notification.fromUserId });
        setNotification(null);
    };

    return (
        <div>
            {notification && (
                <div>
                    <p>Incoming call from user {notification.fromUserId}</p>
                    <button onClick={handleAnswer}>Answer</button>
                    <button onClick={handleReject}>Reject</button>
                </div>
            )}
        </div>
    );
};

export default Notification;
