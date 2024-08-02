

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import defaultAvatar from '../assets/user (1).png'; 
import CallPage from '../components/CallPage'
import { PhoneIcon, VideoCameraIcon } from '@heroicons/react/solid';
import 'webrtc-adapter';

// import AudioCall from './AudioCall'; // Import AudioCall component

const socket = io('http://localhost:3002'); 
// const socket = io('http://localhost:3001'); 

const ChatPage = () => {

    const [setReceiverId] = useState(null);
    const { receiverId } = useParams();
    const initiateCall = (id) => {
        setReceiverId(localStorage.getItem('toUserid'));
        console.log("calling: the user id"+localStorage.getItem('toUserid'))
      };

    const { receiverId: urlReceiverId } = useParams();
    const [messages, setMessages] = useState([]);
    const [messageText, setMessageText] = useState('');
    const [reactions, setReactions] = useState({});
    const [hoveredMessageId, setHoveredMessageId] = useState(null);
    const messageEndRef = useRef(null);
    const navigate = useNavigate();
    

    const userId = localStorage.getItem('userId');
    const storedToUserId = localStorage.getItem('touserId');
    // const storedToUserId = localStorage.getItem('touserId');
    const [localStream, setLocalStream] = useState(null);
    const [remoteStream, setRemoteStream] = useState(null);
    const [peerConnection, setPeerConnection] = useState(null);
    const [isCallActive, setIsCallActive] = useState(false); // New state for call status
    // const [isCallActive, setIsCallActive] = useState(false);
    const [incomingCall, setIncomingCall] = useState(null);
    const [notification, setNotification] = useState(null);
    const [showCallPopup, setShowCallPopup] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [showAudioCall, setShowAudioCall] = useState(false);



    const handleCallButtonClick = (receiverId) => {
        // Navigate to the CallPage with the receiverId as a query parameter
        navigate(`/calls?receiverId=${receiverId}`);
      };

      const handlevidCallButtonClick = (receiverId) => {
        // Navigate to the CallPage with the receiverId as a query parameter
        navigate(`/video-call?receiverId=${receiverId}`);
      };
 

    const handleCloseCallPage = () => {
        setShowCallPopup(false);
    };


    const formatTimestamp = (timestamp) => {
        const messageDate = new Date(timestamp);
        const today = new Date();
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
    
        if (
            messageDate.getFullYear() === today.getFullYear() &&
            messageDate.getMonth() === today.getMonth() &&
            messageDate.getDate() === today.getDate()
        ) {
            return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        } else {
            return messageDate.toLocaleDateString(undefined, options);
        }
    };

    useEffect(() => {
        if (!urlReceiverId) return;

        socket.on('connect', () => {
            console.log('Connected to socket server');
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from socket server');
        });

        socket.on('incomingCall', (data) => {
            const { offer, from } = data;
            console.log("a call is incomming")
            showNotification(`Incoming call from user: ${from}`);
            setIncomingCall({ offer, from });
            setNotification(`Incoming call from user ${from}`);
        });

        socket.on('callOffer', async (offer) => {
            if (peerConnection) {
                await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
                const answer = await peerConnection.createAnswer();
                await peerConnection.setLocalDescription(answer);
                socket.emit('callAnswer', { answer, to: urlReceiverId });
                setIsCallActive(true);
            }
        });

        socket.on('callAnswer', async (answer) => {
            if (peerConnection) {
                await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
            }
        });

        socket.on('iceCandidate', async (data) => {
            console.log('Received ICE candidate:', data.candidate);
            if (peerConnection) {
                try {
                    await peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate));
                    console.log('ICE candidate added successfully.');
                } catch (error) {
                    console.error('Error adding ICE candidate:', error);
                }
            } else {
                console.error('Peer connection is not established.');
            }
        });
        


        
        const fetchMessages = async () => {
            const receiverId = localStorage.getItem('userId');
            const senderId = localStorage.getItem('touserId');
            try {
                const response = await fetch(`http://localhost:3001/getMessages?fromUserId=${senderId}&toUserId=${receiverId}`);
                const result = await response.json();
                if (Array.isArray(result.messages)) {
                    const sortedMessages = result.messages.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
                    setMessages(sortedMessages);
                    fetchReactions(sortedMessages.map(msg => msg.id)); // Fetch reactions for these messages
                } else {
                    throw new Error('Unexpected response format');
                }
            } catch (error) {
                console.error('Failed to fetch messages:', error);
            }
        };


        const fetchReactions = async (messageIds) => {
            try {
                const response = await fetch('http://localhost:3001/getReactions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ messageIds }),
                });
                const result = await response.json();
                setReactions(result.reactions);
            } catch (error) {
                console.error('Failed to fetch reactions:', error);
            }
        };

        fetchMessages();

        socket.emit('joinRoom', receiverId);

        socket.on('message', (message) => {
            console.log('Received message:', message);
            setMessages((prevMessages) => [...prevMessages, message]);
            messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        });

        socket.on('messageDeleted', (messageId) => {
            setMessages((prevMessages) => prevMessages.filter((msg) => msg.id !== messageId));
        });

        socket.on('reaction', (reaction) => {
            setReactions((prevReactions) => {
                const updatedReactions = { ...prevReactions };
                if (!updatedReactions[reaction.messageId]) {
                    updatedReactions[reaction.messageId] = [];
                }
                updatedReactions[reaction.messageId] = updatedReactions[reaction.messageId].filter(
                    (r) => r.userId !== reaction.userId
                );
                updatedReactions[reaction.messageId].push(reaction);
                return updatedReactions;
            });
        });

                socket.on('callNotification', async (notification) => {
                    const { offer, from } = notification;
                    setIncomingCall({ offer, from });
                    setNotification(`Incoming call from user ${from}`);
                    if (Notification.permission === 'granted') {
                        new Notification('Incoming Call', {
                            body: `User ${from} is calling you`,
                            icon: defaultAvatar,
                        });
                    }
                });

            socket.on('callOffer', async (offer) => {
                if (peerConnection) {
                    await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
                    const answer = await peerConnection.createAnswer();
                    await peerConnection.setLocalDescription(answer);
                    socket.emit('callAnswer', { answer, to: receiverId });
                    setIsCallActive(true);
                }
            });

            // Handle incoming answer
            socket.on('callAnswer', async (answer) => {
                if (peerConnection) {
                    await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
                }
            });


        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('message');
            socket.off('messageDeleted');
            socket.off('reaction');
            socket.off('callNotification');
            socket.off('callOffer');
            socket.off('callAnswer');
            socket.off('iceCandidate');
            if (peerConnection) {
                peerConnection.close();
            }
            if (localStream) {
                localStream.getTracks().forEach(track => track.stop());
            }
        };
    }, [urlReceiverId, peerConnection, localStream]);
    
    const setupWebRTC = async () => {
        console.log('Setting up WebRTC...'); // Log to indicate function execution started
    
        try {
            const pc = new RTCPeerConnection();
            console.log('RTCPeerConnection created'); // Log after RTCPeerConnection is created
    
            pc.ontrack = (event) => {
                console.log('Remote track received:', event.streams[0]); // Log when remote track is received
                setRemoteStream(event.streams[0]); // Assuming setRemoteStream is defined to handle remote stream
            };
    
            pc.onicecandidate = (event) => {
                if (event.candidate) {
                    console.log('ICE candidate:', event.candidate); // Log when ICE candidate is available
                    socket.emit('iceCandidate', { candidate: event.candidate, to: urlReceiverId }); // Ensure urlReceiverId is defined
                }
            };
    
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
            console.log('Local media stream obtained'); // Log after local media stream is obtained
            setLocalStream(stream); // Assuming setLocalStream is defined to handle local stream
    
            stream.getTracks().forEach((track) => {
                console.log('Adding track to peer connection:', track); // Log each track being added
                try {
                    pc.addTrack(track, stream);
                    console.log('Track added successfully.');
                } catch (error) {
                    console.error('Error adding track:', error); // Log any errors adding track
                }
            });
    
            setPeerConnection(pc); // Assuming setPeerConnection is defined to handle the peer connection
            console.log('Peer connection set'); // Log after peer connection is set
    
        } catch (error) {
            console.error('Error setting up WebRTC:', error); // Log errors
        }
    };
    
    

    const handleSendMessage = async () => {
        if (messageText.trim()) {
            try {
                const response = await fetch('http://localhost:3001/sendMessage', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        senderId: userId,
                        receiverId: storedToUserId,
                        text: messageText,
                    }),
                });
                const result = await response.json();
                if (response.ok) {
                    // window.location.reload();
                } else {
                    console.error('SendMessage Error:', result.message);
                }
            } catch (error) {
                console.error('SendMessage Fetch Error:', error);
            }
        }
    };

    const handleDeleteMessage = async (messageId) => {
        try {
            const response = await fetch('http://localhost:3001/deleteMessage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ messageId }), // Ensure `messageId` is being sent
            });
    
            const result = await response.json();
            if (response.ok) {
                console.log('DeleteMessage success:', result);
                setMessages(prevMessages => prevMessages.filter(msg => msg.id !== messageId));
                
            } else {
                console.error('DeleteMessage Error:', result.message);
            }
        } catch (error) {
            console.error('DeleteMessage Fetch Error:', error);
        }
    };
    
    

    const handleAddReaction = async (messageId, reactionType) => {
        try {
            const response = await fetch('http://localhost:3001/addReaction', {  // Ensure this URL is correct
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ messageId, userId, reactionType }),
            });
    
            if (response.ok) {
                const result = await response.json();
                console.log('Reaction added successfully:', result);
                window.location.reload();

            } else {
                const errorText = await response.text();
                console.error('AddReaction Error:', errorText);
            }
        } catch (error) {
            console.error('AddReaction Fetch Error:', error);
        }
    };
    

    const isMessageDeletable = (createdAt) => {
        const messageTime = new Date(createdAt);
        const currentTime = new Date();
        const diffMinutes = (currentTime - messageTime) / (1000 * 60); // Difference in minutes
        return diffMinutes <= 2;
    };

    const handleBack = () => {
        navigate('/home');
    };

   
    const handleCallUser = (userId) => {
        setSelectedUserId(userId);
        setupWebRTC(); // Setup WebRTC before making a call
        socket.emit('initiateCall', { to: userId });
        setShowCallPopup(true);
    };
    

    // };
    const handleEndCall = () => {
        if (peerConnection) {
            peerConnection.close();
            setPeerConnection(null);
            setLocalStream(null);
            setRemoteStream(null);
        }
        setIsCallActive(false);
        socket.emit('endCall', { to: receiverId });
    };
    


    const handleAcceptCall = async () => {
        setShowCallPopup(false);
        await setupWebRTC();
        if (incomingCall) {
            await peerConnection.setRemoteDescription(new RTCSessionDescription(incomingCall.offer));
            const answer = await peerConnection.createAnswer();
            await peerConnection.setLocalDescription(answer);
            socket.emit('callAnswer', { answer, to: incomingCall.from });
            setIsCallActive(true);
        }
    };

    const handleRejectCall = () => {
        setShowCallPopup(false);
        socket.emit('callReject', { to: incomingCall.from });
        setIncomingCall(null);
    };


    const showNotification = (message) => {
        if (Notification.permission === 'granted') {
            new Notification(message);
        } else if (Notification.permission !== 'denied') {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    new Notification(message);
                }
            });
        }
    };
    
    
    
    // Call this function to test notifications
    showNotification('Test notification message');
    


    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-r from-slate-300 to-slate-500 p-4">
            <div className="flex items-center mb-4">
                <img
                    src={defaultAvatar}
                    alt="Avatar"
                    className="w-12 h-12 rounded-full mr-4 border-2 border-gray-300"
                />
                <h1 className="text-2xl font-bold">{localStorage.getItem('tousername')}</h1>
            </div>

            <button
                onClick={handleBack}
                type="button"
                className="bg-white text-center w-48 rounded-2xl h-14 relative font-sans text-black text-xl font-semibold group justify-end mt-(-4)"
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

            <div className="flex justify-end mb-4">
            <button onClick={() => handleCallButtonClick(receiverId)} className="bg-blue-500 text-white p-2 rounded">
                        <PhoneIcon className="w-6 h-6" />
                       
                    </button>
                {/* {showAudioCall && <AudioCall receiverId={receiverId} />} */}


                <button
                     onClick={() =>handlevidCallButtonClick(receiverId)}
                    className="bg-blue-500 text-white py-2 px-4 rounded"
                >
                    <VideoCameraIcon className="w-6 h-6" />
                </button>
                {showCallPopup && (
  <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-75 z-50">
    <div className="bg-white p-8 w-4/5 max-w-3xl rounded-lg shadow-lg">
      <CallPage
        receiverId={selectedUserId}
        onClose={handleCloseCallPage}
        isCallActive={isCallActive}
        onEndCall={handleEndCall}
      />
    </div>
  </div>
)}

{isCallActive && (
  <button 
    onClick={handleEndCall} 
    className="fixed bottom-4 right-4 p-4 bg-red-500 text-white rounded-full shadow-lg z-50"
  >
    End Call
  </button>
)}


            </div>

            {localStream && (
                <div className="fixed bottom-20 right-0 m-4 w-32 h-32 border border-gray-400 rounded-lg overflow-hidden">
                    <video
                        autoPlay
                        muted
                        ref={(video) => {
                            if (video) {
                                video.srcObject = localStream;
                            }
                        }}
                        className="w-full h-full object-cover"
                    />
                </div>
            )}

{remoteStream && (
                <div className="fixed bottom-0 right-40 m-4 w-64 h-64 border border-gray-400 rounded-lg overflow-hidden">
                    <video
                        autoPlay
                        ref={(video) => {
                            if (video) {
                                video.srcObject = remoteStream;
                            }
                        }}
                        className="w-full h-full object-cover"
                    />
                </div>
            )}


            <div className="flex flex-col flex-grow">
                <div className="w-full max-w-4xl mx-auto h-96 bg-black-100 p-4 overflow-y-auto custom-scrollbar">

                    <div className="flex flex-col gap-2">
                    {messages.length > 0 ? (
    messages.map((message) => (
        <div
            key={message.id}
            className={`p-4 rounded-md ${message.from_user_id === userId ? 'bg-blue-300 self-end' : 'bg-gray-300 self-start'} relative`}
            onMouseEnter={() => setHoveredMessageId(message.id)}
            onMouseLeave={() => setHoveredMessageId(null)}
        >
            <p>{message.content}</p>
            {message.reaction && (
                <div className="text-xs mt-3">
                    <span>{message.reaction}</span>
                </div>
            )}
            <div className="text-xs text-gray-500 mt-1">{formatTimestamp(message.created_at)}</div>
            
            {hoveredMessageId === message.id && (
                <div className="absolute bottom-10 right-0 flex space-x-1">
                    {['👍', '❤️', '😂'].map((reaction) => (
                        <button
                            key={reaction}
                            onClick={() => handleAddReaction(message.id, reaction)}
                            className="text-xl"
                        >
                            {reaction}
                        </button>
                    ))}
                </div>
            )}
            <div className="flex space-x-2">
                {reactions[message.id]?.map((reaction, index) => (
                    <span key={index} className="text-xs">{reaction.reactionType}</span>
                ))}
            </div>
            
            {message.from_user_id === userId && isMessageDeletable(message.created_at) && (
                <button
                    className={`delete-button ${hoveredMessageId === message.id ? 'visible' : 'hidden'} absolute top-0 right-2 text-red-500`}
                    onClick={() => {
                        handleDeleteMessage(message.id);
                        setMessages((prevMessages) =>
                            prevMessages.filter((msg) => msg.id !== message.id)
                        );
                    }}
                >
                    Delete
                </button>
            )}
        </div>
    ))
) : (
    <p>No messages yet.</p>
)}

                        <div ref={messageEndRef} />
                    </div>
                </div>

                <div className="flex mt-4">
                    <input
                        type="text"
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        placeholder="Type your message..."
                        className="w-full px-3 py-2 border rounded"
                    />
                    <button
                        onClick={() => {
                            handleSendMessage();
                            setMessages((prevMessages) => [
                                ...prevMessages,
                                {
                                    id: new Date().toISOString(), // Temporary ID, should be replaced by server ID
                                    content: messageText,
                                    from_user_id: userId,
                                    created_at: new Date().toISOString(),
                                },
                            ]);
                            
                        }}
                        className="flex items-center bg-blue-500 text-white gap-1 px-4 py-2 cursor-pointer font-semibold tracking-widest rounded-md hover:bg-blue-400 duration-300 hover:gap-2 hover:translate-x-3"
                    >
                        Send
                        <svg
                            className="w-5 h-5"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                                strokeLinejoin="round"
                                strokeLinecap="round"
                            ></path>
                        </svg>
                    </button>
                    {showCallPopup && (
                <CallPage
                    onAccept={handleAcceptCall}
                    onReject={handleRejectCall}
                    onClose={handleCloseCallPage}
                    receiverId={selectedUserId}
                />
            )}
            {isCallActive && (
                <div className="absolute bottom-0 right-0 p-4 bg-green-500 text-blue-400 flex items-center">
                    <button onClick={handleEndCall} className="bg-red-500 p-2 rounded">
                        End Call
                    </button>
                </div>
            )}
                </div>
            </div>
        </div>
    );
};

export default ChatPage;






// import React, { useState, useEffect, useRef } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { io } from 'socket.io-client';
// import defaultAvatar from '../assets/user (1).png'; 
// import CallPage from '../components/CallPage'
// import { PhoneIcon, VideoCameraIcon } from '@heroicons/react/solid';
// import 'webrtc-adapter';
// import AudioCall from './AudioCall'; // Import AudioCall component

// const socket = io('http://localhost:3002'); 
// // const socket = io('http://localhost:3001'); 

// const ChatPage = () => {

//     const [setReceiverId] = useState(null);
//     const { receiverId } = useParams();
//     const initiateCall = (id) => {
//         setReceiverId(localStorage.getItem('toUserid'));
//         console.log("calling: the user id"+localStorage.getItem('toUserid'))
//       };

//     const { receiverId: urlReceiverId } = useParams();
//     const [messages, setMessages] = useState([]);
//     const [messageText, setMessageText] = useState('');
//     const [reactions, setReactions] = useState({});
//     const [hoveredMessageId, setHoveredMessageId] = useState(null);
//     const messageEndRef = useRef(null);
//     const navigate = useNavigate();
    

//     const userId = localStorage.getItem('userId');
//     const storedToUserId = localStorage.getItem('touserId');
//     // const storedToUserId = localStorage.getItem('touserId');
//     const [localStream, setLocalStream] = useState(null);
//     const [remoteStream, setRemoteStream] = useState(null);
//     const [peerConnection, setPeerConnection] = useState(null);
//     const [isCallActive, setIsCallActive] = useState(false); // New state for call status
//     // const [isCallActive, setIsCallActive] = useState(false);
//     const [incomingCall, setIncomingCall] = useState(null);
//     const [notification, setNotification] = useState(null);
//     const [showCallPopup, setShowCallPopup] = useState(false);
//     const [selectedUserId, setSelectedUserId] = useState(null);
//     const [showAudioCall, setShowAudioCall] = useState(false);

 


//     const formatTimestamp = (timestamp) => {
//         const messageDate = new Date(timestamp);
//         const today = new Date();
//         const options = { year: 'numeric', month: 'short', day: 'numeric' };
    
//         if (
//             messageDate.getFullYear() === today.getFullYear() &&
//             messageDate.getMonth() === today.getMonth() &&
//             messageDate.getDate() === today.getDate()
//         ) {
//             return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//         } else {
//             return messageDate.toLocaleDateString(undefined, options);
//         }
//     };

        
//         const fetchMessages = async () => {
//             const receiverId = localStorage.getItem('userId');
//             const senderId = localStorage.getItem('touserId');
//             try {
//                 const response = await fetch(`http://localhost:3001/getMessages?fromUserId=${senderId}&toUserId=${receiverId}`);
//                 const result = await response.json();
//                 if (Array.isArray(result.messages)) {
//                     const sortedMessages = result.messages.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
//                     setMessages(sortedMessages);
//                     fetchReactions(sortedMessages.map(msg => msg.id)); // Fetch reactions for these messages
//                 } else {
//                     throw new Error('Unexpected response format');
//                 }
//             } catch (error) {
//                 console.error('Failed to fetch messages:', error);
//             }
//         };


//         const fetchReactions = async (messageIds) => {
//             try {
//                 const response = await fetch('http://localhost:3001/getReactions', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify({ messageIds }),
//                 });
//                 const result = await response.json();
//                 setReactions(result.reactions);
//             } catch (error) {
//                 console.error('Failed to fetch reactions:', error);
//             }
//         };

//         fetchMessages();

//         socket.emit('joinRoom', receiverId);

//         socket.on('message', (message) => {
//             console.log('Received message:', message);
//             setMessages((prevMessages) => [...prevMessages, message]);
//             messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//         });

//         socket.on('messageDeleted', (messageId) => {
//             setMessages((prevMessages) => prevMessages.filter((msg) => msg.id !== messageId));
//         });

//         socket.on('reaction', (reaction) => {
//             setReactions((prevReactions) => {
//                 const updatedReactions = { ...prevReactions };
//                 if (!updatedReactions[reaction.messageId]) {
//                     updatedReactions[reaction.messageId] = [];
//                 }
//                 updatedReactions[reaction.messageId] = updatedReactions[reaction.messageId].filter(
//                     (r) => r.userId !== reaction.userId
//                 );
//                 updatedReactions[reaction.messageId].push(reaction);
//                 return updatedReactions;
//             });
//         });


    

//     const handleSendMessage = async () => {
//         if (messageText.trim()) {
//             try {
//                 const response = await fetch('http://localhost:3001/sendMessage', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify({
//                         senderId: userId,
//                         receiverId: storedToUserId,
//                         text: messageText,
//                     }),
//                 });
//                 const result = await response.json();
//                 if (response.ok) {
//                     // window.location.reload();
//                 } else {
//                     console.error('SendMessage Error:', result.message);
//                 }
//             } catch (error) {
//                 console.error('SendMessage Fetch Error:', error);
//             }
//         }
//     };

//     const handleDeleteMessage = async (messageId) => {
//         try {
//             const response = await fetch('http://localhost:3001/deleteMessage', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ messageId }), // Ensure `messageId` is being sent
//             });
    
//             const result = await response.json();
//             if (response.ok) {
//                 console.log('DeleteMessage success:', result);
//                 setMessages(prevMessages => prevMessages.filter(msg => msg.id !== messageId));
                
//             } else {
//                 console.error('DeleteMessage Error:', result.message);
//             }
//         } catch (error) {
//             console.error('DeleteMessage Fetch Error:', error);
//         }
//     };
    
    

//     const handleAddReaction = async (messageId, reactionType) => {
//         try {
//             const response = await fetch('http://localhost:3001/addReaction', {  // Ensure this URL is correct
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ messageId, userId, reactionType }),
//             });
    
//             if (response.ok) {
//                 const result = await response.json();
//                 console.log('Reaction added successfully:', result);
//                 window.location.reload();

//             } else {
//                 const errorText = await response.text();
//                 console.error('AddReaction Error:', errorText);
//             }
//         } catch (error) {
//             console.error('AddReaction Fetch Error:', error);
//         }
//     };
    

//     const isMessageDeletable = (createdAt) => {
//         const messageTime = new Date(createdAt);
//         const currentTime = new Date();
//         const diffMinutes = (currentTime - messageTime) / (1000 * 60); // Difference in minutes
//         return diffMinutes <= 2;
//     };

//     const handleBack = () => {
//         navigate('/home');
//     };


//     return (
//         <div className="min-h-screen flex flex-col bg-gradient-to-r from-slate-300 to-slate-500 p-4">
//             <div className="flex items-center mb-4">
//                 <img
//                     src={defaultAvatar}
//                     alt="Avatar"
//                     className="w-12 h-12 rounded-full mr-4 border-2 border-gray-300"
//                 />
//                 <h1 className="text-2xl font-bold">{localStorage.getItem('tousername')}</h1>
//             </div>

//             <button
//                 onClick={handleBack}
//                 type="button"
//                 className="bg-white text-center w-48 rounded-2xl h-14 relative font-sans text-black text-xl font-semibold group justify-end mt-(-4)"
//             >
//                 <div
//                     className="bg-green-400 rounded-xl h-12 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[184px] z-10 duration-500"
//                 >
//                     <svg
//                         width="25px"
//                         height="25px"
//                         viewBox="0 0 1024 1024"
//                         xmlns="http://www.w3.org/2000/svg"
//                     >
//                         <path
//                             fill="#000000"
//                             d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
//                         ></path>
//                         <path
//                             fill="#000000"
//                             d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
//                         ></path>
//                     </svg>
//                 </div>
//                 <p className="translate-x-2">Go Back</p>
//             </button>

//             <div className="flex justify-end mb-4">
//             <button onClick={console.log("hi")} className="bg-blue-500 text-white p-2 rounded">
//                         <PhoneIcon className="w-6 h-6" />
                       
//                     </button>
//                 {/* {showAudioCall && <AudioCall receiverId={receiverId} />} */}


//                 <button
//                      onClick={() => initiateCall(localStorage.getItem('touserId'))}
//                     className="bg-blue-500 text-white py-2 px-4 rounded"
//                 >
//                     <VideoCameraIcon className="w-6 h-6" />
//                 </button>
//                 {showCallPopup && (
//   <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-75 z-50">
//     <div className="bg-white p-8 w-4/5 max-w-3xl rounded-lg shadow-lg">
//       <CallPage
//       />
//     </div>
//   </div>
// )}

// {isCallActive && (
//   <button 
//     className="fixed bottom-4 right-4 p-4 bg-red-500 text-white rounded-full shadow-lg z-50"
//   >
//     End Call
//   </button>
// )}


//             </div>

//             {localStream && (
//                 <div className="fixed bottom-20 right-0 m-4 w-32 h-32 border border-gray-400 rounded-lg overflow-hidden">
//                     <video
//                         autoPlay
//                         muted
//                         ref={(video) => {
//                             if (video) {
//                                 video.srcObject = localStream;
//                             }
//                         }}
//                         className="w-full h-full object-cover"
//                     />
//                 </div>
//             )}

// {remoteStream && (
//                 <div className="fixed bottom-0 right-40 m-4 w-64 h-64 border border-gray-400 rounded-lg overflow-hidden">
//                     <video
//                         autoPlay
//                         ref={(video) => {
//                             if (video) {
//                                 video.srcObject = remoteStream;
//                             }
//                         }}
//                         className="w-full h-full object-cover"
//                     />
//                 </div>
//             )}


//             <div className="flex flex-col flex-grow">
//                 <div className="w-full max-w-4xl mx-auto h-96 bg-black-100 p-4 overflow-y-auto custom-scrollbar">

//                     <div className="flex flex-col gap-2">
//                     {messages.length > 0 ? (
//     messages.map((message) => (
//         <div
//             key={message.id}
//             className={`p-4 rounded-md ${message.from_user_id === userId ? 'bg-blue-300 self-end' : 'bg-gray-300 self-start'} relative`}
//             onMouseEnter={() => setHoveredMessageId(message.id)}
//             onMouseLeave={() => setHoveredMessageId(null)}
//         >
//             <p>{message.content}</p>
//             {message.reaction && (
//                 <div className="text-xs mt-3">
//                     <span>{message.reaction}</span>
//                 </div>
//             )}
//             <div className="text-xs text-gray-500 mt-1">{formatTimestamp(message.created_at)}</div>
            
//             {hoveredMessageId === message.id && (
//                 <div className="absolute bottom-10 right-0 flex space-x-1">
//                     {['👍', '❤️', '😂'].map((reaction) => (
//                         <button
//                             key={reaction}
//                             onClick={() => handleAddReaction(message.id, reaction)}
//                             className="text-xl"
//                         >
//                             {reaction}
//                         </button>
//                     ))}
//                 </div>
//             )}
//             <div className="flex space-x-2">
//                 {reactions[message.id]?.map((reaction, index) => (
//                     <span key={index} className="text-xs">{reaction.reactionType}</span>
//                 ))}
//             </div>
            
//             {message.from_user_id === userId && isMessageDeletable(message.created_at) && (
//                 <button
//                     className={`delete-button ${hoveredMessageId === message.id ? 'visible' : 'hidden'} absolute top-0 right-2 text-red-500`}
//                     onClick={() => {
//                         handleDeleteMessage(message.id);
//                         setMessages((prevMessages) =>
//                             prevMessages.filter((msg) => msg.id !== message.id)
//                         );
//                     }}
//                 >
//                     Delete
//                 </button>
//             )}
//         </div>
//     ))
// ) : (
//     <p>No messages yet.</p>
// )}

//                         <div ref={messageEndRef} />
//                     </div>
//                 </div>

//                 <div className="flex mt-4">
//                     <input
//                         type="text"
//                         value={messageText}
//                         onChange={(e) => setMessageText(e.target.value)}
//                         placeholder="Type your message..."
//                         className="w-full px-3 py-2 border rounded"
//                     />
//                     <button
//                         onClick={() => {
//                             handleSendMessage();
//                             setMessages((prevMessages) => [
//                                 ...prevMessages,
//                                 {
//                                     id: new Date().toISOString(), // Temporary ID, should be replaced by server ID
//                                     content: messageText,
//                                     from_user_id: userId,
//                                     created_at: new Date().toISOString(),
//                                 },
//                             ]);
                            
//                         }}
//                         className="flex items-center bg-blue-500 text-white gap-1 px-4 py-2 cursor-pointer font-semibold tracking-widest rounded-md hover:bg-blue-400 duration-300 hover:gap-2 hover:translate-x-3"
//                     >
//                         Send
//                         <svg
//                             className="w-5 h-5"
//                             stroke="currentColor"
//                             strokeWidth="1.5"
//                             viewBox="0 0 24 24"
//                             fill="none"
//                             xmlns="http://www.w3.org/2000/svg"
//                         >
//                             <path
//                                 d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
//                                 strokeLinejoin="round"
//                                 strokeLinecap="round"
//                             ></path>
//                         </svg>
//                     </button>
//                     {showCallPopup && (
//                 <CallPage/>
//             )}
//             {isCallActive && (
//                 <div className="absolute bottom-0 right-0 p-4 bg-green-500 text-blue-400 flex items-center">
//                     <button className="bg-red-500 p-2 rounded">
//                         End Call
//                     </button>
//                 </div>
//             )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ChatPage;
