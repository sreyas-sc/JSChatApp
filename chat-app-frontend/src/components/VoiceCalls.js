
import React, { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';
import SimplePeer from 'simple-peer';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';





// Make sure this URL matches your backend configuration
const socket = io('http://localhost:3002', {
  transports: ['websocket'],
  withCredentials: true
});

const AudioCall = ({ receiverId }) => {
  const [stream, setStream] = useState(null);
  const [peer, setPeer] = useState(null);
  const [calling, setCalling] = useState(false);
  const localAudioRef = useRef(null);
  const remoteAudioRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const initMediaStream = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setStream(mediaStream);
        if (calling && localAudioRef.current) {
          localAudioRef.current.srcObject = mediaStream;
        }
      } catch (error) {
        console.error('Error accessing media devices:', error);
      }
    };

    initMediaStream();

    if ('Notification' in window) {
      Notification.requestPermission().then(permission => {
        if (permission !== 'granted') {
          console.log('Notification permission denied');
        }
      });
    }

    socket.on('offer', handleOffer);
    socket.on('answer', handleAnswer);
    socket.on('ice-candidate', handleIceCandidate);

    return () => {
      socket.off('offer', handleOffer);
      socket.off('answer', handleAnswer);
      socket.off('ice-candidate', handleIceCandidate);
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      if (peer) {
        peer.destroy();
      }
    };
  }, [stream, peer, calling]);

  const startCall = () => {
    const newPeer = new SimplePeer({
      initiator: true,
      trickle: false,
      stream: stream,
    });

    newPeer.on('signal', (data) => {
      socket.emit('offer', { offer: data, to: receiverId });
    });

    newPeer.on('stream', (remoteStream) => {
      if (remoteAudioRef.current) {
        remoteAudioRef.current.srcObject = remoteStream;
      }
    });

    newPeer.on('error', (err) => console.error('Peer error:', err));

    setPeer(newPeer);
    setCalling(true);
  };

  const handleOffer = (data) => {
    if (Notification.permission === 'granted') {
      new Notification('Incoming Call', {
        body: 'You have an incoming audio call from a user.',
        icon: '/path/to/icon.png'
      });
    }

    toast('Incoming call from user');

    const newPeer = new SimplePeer({
      initiator: false,
      trickle: false,
    });

    newPeer.on('signal', (signal) => {
      socket.emit('answer', { answer: signal, to: receiverId });
    });

    newPeer.on('stream', (remoteStream) => {
      if (remoteAudioRef.current) {
        remoteAudioRef.current.srcObject = remoteStream;
      }
    });

    newPeer.on('error', (err) => console.error('Peer error:', err));

    newPeer.signal(data.offer);
    setPeer(newPeer);
    setCalling(true);
  };

  const handleAnswer = (data) => {
    if (peer) {
      peer.signal(data.answer);
    } else {
      console.error('Peer connection is not initialized.');
    }
  };

  const handleIceCandidate = (data) => {
    if (peer) {
      peer.signal(data.candidate);
    } else {
      console.error('Peer connection is not initialized.');
    }
  };

  const handleBack = () => {
    navigate('/home');
};

  const endCall = () => {
    if (peer) {
      peer.destroy();
      setPeer(null);
    }
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    if (localAudioRef.current) {
      localAudioRef.current.srcObject = null; // Clear local audio
    }
    if (remoteAudioRef.current) {
      remoteAudioRef.current.srcObject = null; // Clear remote audio
    }
    setCalling(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <button
      onClick={handleBack}
        type="button"
        className="bg-white text-center w-48 rounded-2xl h-14 relative font-sans text-black text-xl font-semibold group mb-4"
      >
        <div
          className="bg-green-400 rounded-xl h-12 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[184px] z-10 duration-500"
        >
          <svg
            width="25px"
            height="25px"
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#000000"
              d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
            ></path>
            <path
              fill="#000000"
              d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
            ></path>
          </svg>
        </div>
        <p className="translate-x-2">Go Back</p>
      </button>

      <h1 className="text-2xl mb-4">Audio Call</h1>
      <div className="mb-4">
        <audio ref={localAudioRef} autoPlay muted={calling} />
        <audio ref={remoteAudioRef} autoPlay />
      </div>
      {calling ? (
        <button onClick={endCall} className="bg-red-500 text-white p-2 rounded mb-4">
          End Call
        </button>
      ) : (
        <button onClick={startCall} className="bg-blue-500 text-white p-2 rounded mb-4">
          Start Call
        </button>
      )}
      <div className="flex flex-row gap-2">
        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]" />
        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]" />
        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]" />
      </div>
    </div>
  );
};

export default AudioCall;
