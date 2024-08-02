import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useLocation } from 'react-router-dom';

const socket = io('http://localhost:3001'); // Adjust URL as needed

const CallPage = () => {
  const [callStatus, setCallStatus] = useState(null);
  const [caller, setCaller] = useState(null);
  const location = useLocation();
  const { userId } = location.state || {};

  useEffect(() => {
    socket.on('incomingCall', ({ fromUserId }) => {
      setCallStatus('incoming');
      setCaller(fromUserId);
    });

    socket.on('callAccepted', () => {
      setCallStatus('connected');
    });

    socket.on('callRejected', () => {
      setCallStatus('rejected');
    });

    socket.on('callEnded', () => {
      setCallStatus('ended');
      setCaller(null);
    });

    return () => {
      socket.off('incomingCall');
      socket.off('callAccepted');
      socket.off('callRejected');
      socket.off('callEnded');
    };
  }, []);

  const handleCall = (toUserId) => {
    socket.emit('call', { fromUserId: userId, toUserId });
    setCallStatus('calling');
  };

  const handleAcceptCall = () => {
    socket.emit('acceptCall', { fromUserId: caller });
  };

  const handleRejectCall = () => {
    socket.emit('rejectCall', { fromUserId: caller });
    setCaller(null);
  };

  const handleEndCall = () => {
    socket.emit('endCall');
    setCallStatus('ended');
    setCaller(null);
  };

  return (
    <div className="call-page">
      {callStatus === 'incoming' && (
        <div className="call-notification">
          <p>Incoming call from {caller}</p>
          <button onClick={handleAcceptCall}>Accept</button>
          <button onClick={handleRejectCall}>Reject</button>
        </div>
      )}
      {callStatus === 'calling' && (
        <div className="call-status">
          <p>Calling...</p>
        </div>
      )}
      {callStatus === 'connected' && (
        <div className="call-status">
          <p>Call connected</p>
          <button onClick={handleEndCall}>End Call</button>
        </div>
      )}
      {callStatus === 'rejected' && (
        <div className="call-status">
          <p>Call rejected</p>
        </div>
      )}
      {callStatus === 'ended' && (
        <div className="call-status">
          <p>Call ended</p>
        </div>
      )}
    </div>
  );
};

export default CallPage;
