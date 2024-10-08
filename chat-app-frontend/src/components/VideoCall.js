// import React, { useEffect, useRef, useState } from 'react';
// import Peer from 'peerjs';

// const [peerId, setPeerId] = useState('');
// const [remotePeerIdValue, setRemotePeerIdValue] = useState('');
// const remoteVideoRef = useRef(null);
// const currentUserVideoRef = useRef(null);
// const peerInstance = useRef(null);

// const peer = new Peer();

// peer.on('open', (id) => {
//     setPeerId(id)
//   });

//   peer.on('call', (call) => {
//     var getUserMedia = navigator.getUserMedia 
//     || navigator.webkitGetUserMedia 
//    || navigator.mozGetUserMedia;

//     getUserMedia({ video: true, audio: true }, (mediaStream) => {
//       currentUserVideoRef.current.srcObject = mediaStream;
//       currentUserVideoRef.current.play();
//       call.answer(mediaStream)
//       call.on('stream', function(remoteStream) {
//         remoteVideoRef.current.srcObject = remoteStream
//         remoteVideoRef.current.play();
//       });
//     });
//   })

//   useEffect(() => {
//     const peer = new Peer();

//     peer.on('open', (id) => {
//       setPeerId(id)
//     });

//     peer.on('call', (call) => {
//       var getUserMedia = navigator.getUserMedia 
//       || navigator.webkitGetUserMedia 
//       || navigator.mozGetUserMedia;

//       getUserMedia({ video: true, audio: true }, (mediaStream) => {
//         currentUserVideoRef.current.srcObject = mediaStream;
//         currentUserVideoRef.current.play();
//         call.answer(mediaStream)
//         call.on('stream', function(remoteStream) {
//           remoteVideoRef.current.srcObject = remoteStream
//           remoteVideoRef.current.play();
//         });
//       });
//     })
//   peerInstance.current = peer;
//   }, [])

//   const call = (remotePeerId) => {
//     var getUserMedia = navigator.getUserMedia 
//     || navigator.webkitGetUserMedia 
//     || navigator.mozGetUserMedia;

//     getUserMedia({ video: true, audio: true }, (mediaStream) => {

//       currentUserVideoRef.current.srcObject = mediaStream;
//       currentUserVideoRef.current.play();

//       const call = peerInstance.current.call(remotePeerId, mediaStream)

//       call.on('stream', (remoteStream) => {
//         remoteVideoRef.current.srcObject = remoteStream
//         remoteVideoRef.current.play();
//       });
//     });
//   }

//   return (
//     <div className="App">
//       <h1>Current user id is {peerId}</h1>
//       <input type="text" value={remotePeerIdValue} onChange={e => setRemotePeerIdValue(e.target.value)} />
//       <button onClick={() => call(remotePeerIdValue)}>Call</button>
//       <div>
//         <video ref={currentUserVideoRef} />
//       </div>
//       <div>
//         <video ref={remoteVideoRef} />
//       </div>
//     </div>
//   );

// src/components/VideoCall.js

import React, { useEffect, useRef, useState } from 'react';
import Peer from 'peerjs';

const VideoCall = () => {
  const [peerId, setPeerId] = useState('');
  const [remotePeerIdValue, setRemotePeerIdValue] = useState('');
  const remoteVideoRef = useRef(null);
  const currentUserVideoRef = useRef(null);
  const peerInstance = useRef(null);

  useEffect(() => {
    const peer = new Peer();

    peer.on('open', (id) => {
      setPeerId(id);
    });

    peer.on('call', (call) => {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then((mediaStream) => {
          currentUserVideoRef.current.srcObject = mediaStream;
          currentUserVideoRef.current.play();
          call.answer(mediaStream);
          call.on('stream', (remoteStream) => {
            remoteVideoRef.current.srcObject = remoteStream;
            remoteVideoRef.current.play();
          });
        });
    });

    peerInstance.current = peer;

    return () => {
      peer.destroy();
    };
  }, []);

  const call = (remotePeerId) => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((mediaStream) => {
        currentUserVideoRef.current.srcObject = mediaStream;
        currentUserVideoRef.current.play();
        const call = peerInstance.current.call(remotePeerId, mediaStream);
        call.on('stream', (remoteStream) => {
          remoteVideoRef.current.srcObject = remoteStream;
          remoteVideoRef.current.play();
        });
      });
  };

  return (
    <div className="App">
      <h1>Current user id is {peerId}</h1>
      <input
        type="text"
        value={remotePeerIdValue}
        onChange={e => setRemotePeerIdValue(e.target.value)}
        placeholder="Enter remote peer ID"
      />
      <button onClick={() => call(remotePeerIdValue)}>Call</button>
      <div>
        <video ref={currentUserVideoRef} autoPlay muted />
      </div>
      <div>
        <video ref={remoteVideoRef} autoPlay />
      </div>
    </div>
  );
};

export default VideoCall;
