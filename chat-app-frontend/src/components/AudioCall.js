// import React, { useState, useRef, useEffect } from 'react';
// import io from 'socket.io-client';
// import SimplePeer from 'simple-peer';

// const socket = io('http://localhost:3000'); // Replace with your server URL

// const AudioCall = ({ receiverId }) => {
//   const [stream, setStream] = useState(null);
//   const [peer, setPeer] = useState(null);
//   const [calling, setCalling] = useState(false);
//   const localAudioRef = useRef(null);
//   const remoteAudioRef = useRef(null);

//   useEffect(() => {
//     // Request user media
//     navigator.mediaDevices.getUserMedia({ audio: true })
//       .then(mediaStream => {
//         setStream(mediaStream);
//         if (localAudioRef.current) {
//           localAudioRef.current.srcObject = mediaStream;
//         }
//       })
//       .catch(error => {
//         console.error('Error accessing media devices.', error);
//       });

//     socket.on('offer', handleOffer);
//     socket.on('answer', handleAnswer);
//     socket.on('ice-candidate', handleIceCandidate);

//     return () => {
//       socket.off('offer', handleOffer);
//       socket.off('answer', handleAnswer);
//       socket.off('ice-candidate', handleIceCandidate);
//     };
//   }, []);

//   const startCall = () => {
//     const newPeer = new SimplePeer({
//       initiator: true,
//       trickle: false,
//       stream: stream,
//     });

//     newPeer.on('signal', (data) => {
//       socket.emit('offer', { offer: data, to: receiverId });
//     });

//     newPeer.on('stream', (remoteStream) => {
//       if (remoteAudioRef.current) {
//         remoteAudioRef.current.srcObject = remoteStream;
//       }
//     });

//     newPeer.on('error', (err) => console.error('Peer error:', err));

//     setPeer(newPeer);
//     setCalling(true);
//   };

//   const handleOffer = (data) => {
//     const newPeer = new SimplePeer({
//       initiator: false,
//       trickle: false,
//     });

//     newPeer.on('signal', (signal) => {
//       socket.emit('answer', { answer: signal, to: receiverId });
//     });

//     newPeer.on('stream', (remoteStream) => {
//       if (remoteAudioRef.current) {
//         remoteAudioRef.current.srcObject = remoteStream;
//       }
//     });

//     newPeer.on('error', (err) => console.error('Peer error:', err));

//     newPeer.signal(data.offer);
//     setPeer(newPeer);
//     setCalling(true);
//   };

//   const handleAnswer = (data) => {
//     if (peer) {
//       peer.signal(data.answer);
//     } else {
//       console.error('Peer connection is not initialized.');
//     }
//   };

//   const handleIceCandidate = (data) => {
//     if (peer) {
//       peer.signal(data.candidate);
//     } else {
//       console.error('Peer connection is not initialized.');
//     }
//   };

//   return (
//     <div>
//       <h2>Audio Call</h2>
//       <audio ref={localAudioRef} autoPlay muted />
//       <audio ref={remoteAudioRef} autoPlay />
//       <button onClick={startCall} disabled={calling}>Start Call</button>
//     </div>
//   );
// };

// export default AudioCall;
