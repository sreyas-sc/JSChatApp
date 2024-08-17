
// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Login from './components/Login';  // Check the file name and path
// import Register from './components/Register';  // Check the file name and path
// import Home from './components/Home';
// import ChatPage from './components/Chatpage';




import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';  // Ensure correct file paths
import Register from './components/Register';  // Ensure correct file paths
import Home from './components/Home';// Ensure correct file path and name
// import ChatPage from './components/ChatPage';
import ChatPage from './components/Chatpage';
// import VideoCall from './VideoCall';
// import VideoCall from './components/Videocall';
// import VideoCallComponent from './components/VideoCallComponent'; // Adjust path if necessary
// import useSocket from './hooks/useSocket'; // Import the CallPage component
import CallPage from './components/CallPage';
// import AudioCall from './components/AudioCall';
import AudioCall from './components/VoiceCalls'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import VideoCall from './components/VideoCall';
import VideoCall from './components/VidCall';



function App() {
  // useSocket();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/chat/:receiverId" element={<ChatPage />} />
        {/* <Route path="/audio-call" element={<AudioCall />} /> */}
        <Route path="/calls" element={<AudioCall />} /> Route for CallPage
        <Route path="/video-call" element={<VideoCall />} />

      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
