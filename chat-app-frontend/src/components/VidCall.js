// // export default VideoCall;
// import React, { useEffect, useRef, useState } from 'react';
// import Peer from 'peerjs';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

// const VideoCall = () => {
//   const [peerId, setPeerId] = useState('');
//   const [remotePeerIdValue, setRemotePeerIdValue] = useState('');
//   const [chatMessages, setChatMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState('');
//   const [isCalling, setIsCalling] = useState(false);
//   const [callInstance, setCallInstance] = useState(null);

//   const remoteVideoRef = useRef(null);
//   const currentUserVideoRef = useRef(null);
//   const peerInstance = useRef(null);

//   const navigate = useNavigate(); // Initialize useNavigate hook

//   useEffect(() => {
//     const peer = new Peer();

//     peer.on('open', (id) => {
//       setPeerId(id);
//     });

//     peer.on('call', (call) => {
//       navigator.mediaDevices.getUserMedia({ video: true, audio: true })
//         .then((mediaStream) => {
//           if (currentUserVideoRef.current) {
//             currentUserVideoRef.current.srcObject = mediaStream;
//             currentUserVideoRef.current.play().catch(console.error);
//           }

//           call.answer(mediaStream);
          
//           call.on('stream', (remoteStream) => {
//             if (remoteVideoRef.current) {
//               remoteVideoRef.current.srcObject = remoteStream;
//               remoteVideoRef.current.play().catch(console.error);
//             }
//           });

//           call.on('close', () => {
//             setIsCalling(false);
//             setCallInstance(null);
//           });

//           setIsCalling(true);
//           setCallInstance(call);
//         })
//         .catch(console.error);
//     });

//     peerInstance.current = peer;

//     return () => {
//       if (peerInstance.current) {
//         peerInstance.current.destroy();
//       }
//       const currentStream = currentUserVideoRef.current?.srcObject;
//       if (currentStream) {
//         const tracks = currentStream.getTracks();
//         tracks.forEach(track => track.stop());
//       }
//       const remoteStreamElement = remoteVideoRef.current?.srcObject;
//       if (remoteStreamElement) {
//         const tracks = remoteStreamElement.getTracks();
//         tracks.forEach(track => track.stop());
//       }
//     };
//   }, []);

//   const call = (remotePeerId) => {
//     navigator.mediaDevices.getUserMedia({ video: true, audio: true })
//       .then((mediaStream) => {
//         if (currentUserVideoRef.current) {
//           currentUserVideoRef.current.srcObject = mediaStream;
//           currentUserVideoRef.current.play().catch(console.error);
//         }

//         const call = peerInstance.current.call(remotePeerId, mediaStream);
//         setIsCalling(true);
//         setCallInstance(call);

//         call.on('stream', (remoteStream) => {
//           if (remoteVideoRef.current) {
//             remoteVideoRef.current.srcObject = remoteStream;
//             remoteVideoRef.current.play().catch(console.error);
//           }
//         });

//         call.on('close', () => {
//           setIsCalling(false);
//           setCallInstance(null);
//         });
//       })
//       .catch(console.error);
//   };

//   const endCall = () => {
//     if (callInstance) {
//       callInstance.close();
//       setIsCalling(false);
//       setCallInstance(null);
//     }
//   };

//   const copyToClipboard = () => {
//     navigator.clipboard.writeText(peerId).then(() => {
//       alert('Peer ID copied to clipboard');
//     });
//   };

//   const sendMessage = () => {
//     if (newMessage.trim()) {
//       setChatMessages([...chatMessages, { text: newMessage, sender: 'You' }]);
//       setNewMessage('');
//     }
//   };

//   return (
//     <div className="flex min-h-screen">
//       <div className="w-1/4 bg-gray-100 p-4">
//         <div className="bg-white shadow-lg rounded-lg p-4 mb-4">
//           <div className="text-lg font-medium mb-2">Chat</div>
//           <div className="overflow-y-auto h-64 mb-2 border border-gray-300 p-2 rounded-lg bg-gray-50">
//             {chatMessages.map((msg, index) => (
//               <div key={index} className={`mb-2 p-2 ${msg.sender === 'You' ? 'text-right' : 'text-left'}`}>
//                 <div className={`inline-block px-3 py-1 rounded-lg ${msg.sender === 'You' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>
//                   {msg.text}
//                 </div>
//               </div>
//             ))}
//           </div>
//           <div className="flex">
//             <input
//               type="text"
//               value={newMessage}
//               onChange={e => setNewMessage(e.target.value)}
//               placeholder="Type a message"
//               className="border border-gray-300 p-2 rounded-lg w-full"
//             />
//             <button
//               onClick={sendMessage}
//               className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
//             >
//               Send
//             </button>
//           </div>
//         </div>
//       </div>
//       <div className="flex-1 p-4">
//         <header className="w-full bg-green-200 text-white text-center p-4 flex items-center justify-between">          <button
//        onClick={() => navigate(-1)} // Use navigate hook to go back
//         type="button"
//         className="bg-white text-center w-48 rounded-2xl h-14 relative font-sans text-black text-xl font-semibold group mb-4"
//       >
//         <div
//           className="bg-green-400 rounded-xl h-12 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[184px] z-10 duration-500"
//         >
//           <svg
//             width="25px"
//             height="25px"
//             viewBox="0 0 1024 1024"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               fill="#000000"
//               d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
//             ></path>
//             <path
//               fill="#000000"
//               d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
//             ></path>
//           </svg>
//         </div>
//         <p className="translate-x-2">Go Back</p>
//       </button>
//           <h1 className="text-xl font-semibold">Video Call</h1>
//           <div></div> {/* Placeholder for header layout */}
//         </header>
        
//         <div className="w-full max-w-2xl mt-4">
//           <div className="bg-white shadow-lg rounded-lg p-4 mb-4 flex items-center justify-between">
//             <div className="text-center">
//               <div className="text-lg font-medium mb-2">Your ID</div>
//               <div className="flex items-center justify-center">
//                 <span className="bg-gray-200 p-2 rounded-lg">{peerId}</span>
//                 <button 
//                   className="ml-2 px-2 py-1 bg-blue-600 text-white rounded-lg"
//                   onClick={copyToClipboard}
//                 >
//                   Copy
//                 </button>
//               </div>
//             </div>
//           </div>
          
//           <div className="mb-4">
//             <input
//               type="text"
//               value={remotePeerIdValue}
//               onChange={e => setRemotePeerIdValue(e.target.value)}
//               placeholder="Enter remote peer ID"
//               className="border border-gray-300 p-2 rounded-lg w-full"
//             />
//             <button
//   onClick={() => isCalling ? endCall() : call(remotePeerIdValue)}
//   className={`mt-2 px-4 py-2 ${isCalling ? 'bg-red-500' : 'bg-green-500'} text-white rounded-lg w-full`}
// >
//   {isCalling ? `End Call with  ${localStorage.getItem('username')}` : 'Start Call'}
// </button>

//           </div>

//           <div className="flex gap-4">
//             <div className="w-1/2">
//               <video ref={currentUserVideoRef} autoPlay muted className="w-full h-64 bg-gray-200" />
//             </div>
//             <div className="w-1/2">
//               <video ref={remoteVideoRef} autoPlay className="w-full h-64 bg-gray-200" />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VideoCall;


import React, { useEffect, useRef, useState } from 'react';
import Peer from 'peerjs';
import { useNavigate } from 'react-router-dom';

const VideoCall = () => {
  const [peerId, setPeerId] = useState('');
  const [remotePeerIdValue, setRemotePeerIdValue] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isCalling, setIsCalling] = useState(false);
  const [callInstance, setCallInstance] = useState(null);

  const remoteVideoRef = useRef(null);
  const currentUserVideoRef = useRef(null);
  const peerInstance = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    const peer = new Peer();

    peer.on('open', (id) => {
      setPeerId(id);
    });

    peer.on('call', (call) => {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then((mediaStream) => {
          if (currentUserVideoRef.current) {
            currentUserVideoRef.current.srcObject = mediaStream;
            currentUserVideoRef.current.play().catch(console.error);
          }

          call.answer(mediaStream);
          
          call.on('stream', (remoteStream) => {
            if (remoteVideoRef.current) {
              remoteVideoRef.current.srcObject = remoteStream;
              remoteVideoRef.current.play().catch(console.error);
            }
          });

          call.on('close', () => {
            endCall();
          });

          setIsCalling(true);
          setCallInstance(call);
        })
        .catch(console.error);
    });

    peerInstance.current = peer;

    return () => {
      if (peerInstance.current) {
        peerInstance.current.destroy();
      }
      const currentStream = currentUserVideoRef.current?.srcObject;
      if (currentStream) {
        const tracks = currentStream.getTracks();
        tracks.forEach(track => track.stop());
      }
      const remoteStreamElement = remoteVideoRef.current?.srcObject;
      if (remoteStreamElement) {
        const tracks = remoteStreamElement.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  const call = (remotePeerId) => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((mediaStream) => {
        if (currentUserVideoRef.current) {
          currentUserVideoRef.current.srcObject = mediaStream;
          currentUserVideoRef.current.play().catch(console.error);
        }

        const call = peerInstance.current.call(remotePeerId, mediaStream);
        setIsCalling(true);
        setCallInstance(call);

        call.on('stream', (remoteStream) => {
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = remoteStream;
            remoteVideoRef.current.play().catch(console.error);
          }
        });

        call.on('close', () => {
          endCall();
        });
      })
      .catch(console.error);
  };

  const endCall = () => {
    if (callInstance) {
      callInstance.close();
      setIsCalling(false);
      setCallInstance(null);

      // Stop the local video tracks
      if (currentUserVideoRef.current) {
        const stream = currentUserVideoRef.current.srcObject;
        if (stream) {
          const tracks = stream.getTracks();
          tracks.forEach(track => track.stop());
        }
      }

      // Stop the remote video tracks
      if (remoteVideoRef.current) {
        const stream = remoteVideoRef.current.srcObject;
        if (stream) {
          const tracks = stream.getTracks();
          tracks.forEach(track => track.stop());
        }
      }

      // Clear the video sources
      if (currentUserVideoRef.current) {
        currentUserVideoRef.current.srcObject = null;
      }
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = null;
      }
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(peerId).then(() => {
      alert('Peer ID copied to clipboard');
    });
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      setChatMessages([...chatMessages, { text: newMessage, sender: 'You' }]);
      setNewMessage('');
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-1/4 bg-gray-100 p-4">
        <div className="bg-white shadow-lg rounded-lg p-4 mb-4">
          <div className="text-lg font-medium mb-2">Chat</div>
          <div className="overflow-y-auto h-64 mb-2 border border-gray-300 p-2 rounded-lg bg-gray-50">
            {chatMessages.map((msg, index) => (
              <div key={index} className={`mb-2 p-2 ${msg.sender === 'You' ? 'text-right' : 'text-left'}`}>
                <div className={`inline-block px-3 py-1 rounded-lg ${msg.sender === 'You' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          <div className="flex">
            <input
              type="text"
              value={newMessage}
              onChange={e => setNewMessage(e.target.value)}
              placeholder="Type a message"
              className="border border-gray-300 p-2 rounded-lg w-full"
            />
            <button
              onClick={sendMessage}
              className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Send
            </button>
          </div>
        </div>
      </div>
      <div className="flex-1 p-4">
        <header className="w-full bg-green-200 text-white text-center p-4 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
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
          <h1 className="text-xl font-semibold">Video Call</h1>
          <button
            onClick={endCall}
            className="bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            End Call
          </button>
        </header>
        <div className="flex flex-col items-center mt-4">
          <div className="flex mb-4">
            <div className="w-64 h-48 bg-gray-200 border border-gray-400 rounded-lg overflow-hidden">
              <video ref={currentUserVideoRef} autoPlay muted className="w-full h-full" />
            </div>
            <div className="w-64 h-48 bg-gray-200 border border-gray-400 rounded-lg overflow-hidden ml-4">
              <video ref={remoteVideoRef} autoPlay className="w-full h-full" />
            </div>
          </div>
          {!isCalling && (
            <div className="flex flex-col items-center">
              <input
                type="text"
                value={remotePeerIdValue}
                onChange={(e) => setRemotePeerIdValue(e.target.value)}
                placeholder="Enter remote peer ID"
                className="border border-gray-300 p-2 rounded-lg mb-4"
              />
              <button
                onClick={() => call(remotePeerIdValue)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                Call
              </button>
            </div>
          )}
          <button
            onClick={copyToClipboard}
            className="bg-green-500 text-white px-4 py-2 rounded-lg mt-4"
          >
            Copy Peer ID
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoCall;
