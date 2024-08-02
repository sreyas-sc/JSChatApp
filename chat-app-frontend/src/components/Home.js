// //     // import React, { useEffect, useState } from 'react';
// //     // import axios from 'axios';
// //     // import { useNavigate } from 'react-router-dom';
// //     // import debounce from 'lodash/debounce';
// //     // import { ChatAlt2Icon } from '@heroicons/react/solid';
// //     // const Home = () => {
// //     //     const [userList, setUserList] = useState([]);
// //     //     const [error, setError] = useState('');
// //     //     const [searchTerm, setSearchTerm] = useState('');
// //     //     const navigate = useNavigate();
// //     //     const userId = localStorage.getItem('userId');

// //     //     useEffect(() => {
// //     //         const fetchUsers = async () => {
// //     //             if (!userId) return;

// //     //             try {
// //     //                 const response = await axios.get('http://localhost:3001/usersWhoMessaged', {
// //     //                     params: { userId }
// //     //                 });

// //     //                 console.log('Fetched users:', response.data);

// //     //                 if (response.data && Array.isArray(response.data)) {
// //     //                     setUserList(response.data);
// //     //                 } else {
// //     //                     console.error('Unexpected response format:', response.data);
// //     //                     setError('Unexpected response format');
// //     //                 }
// //     //             } catch (err) {
// //     //                 console.error('Error fetching users:', err);
// //     //                 setError('Error fetching users');
// //     //             }
// //     //         };

// //     //         fetchUsers();
// //     //     }, [userId]);

// //     //     const handleLogout = () => {
// //     //         localStorage.removeItem('userId');
// //     //         localStorage.removeItem('userEmail');
// //     //         navigate('/');
// //     //     };

// //     //     const debouncedSearch = debounce(async (term) => {
// //     //         if (term.trim()) {
// //     //             try {
// //     //                 const response = await axios.get('http://localhost:3001/users', {
// //     //                     params: { search: term, userId }
// //     //                 });
// //     //                 setUserList(response.data);
// //     //             } catch (err) {
// //     //                 console.error('Error searching users:', err);
// //     //                 setError('Failed to search users.');
// //     //             }
// //     //         } else {
// //     //             setUserList([]);
// //     //         }
// //     //     }, 300);

// //     //     useEffect(() => {
// //     //         debouncedSearch(searchTerm);
// //     //     }, [searchTerm]);

// //     //     const handleMessageUser = async (user) => {
// //     //         try {
// //     //             navigate(`/chat/${user.username}`);
// //     //             localStorage.setItem('touserId', user.id);
// //     //             localStorage.setItem('tousername', user.username);
// //     //             localStorage.setItem('touserEmail', user.email);

// //     //             console.log('Sender ID:', localStorage.getItem('userId'));
// //     //             console.log('Receiver ID:', localStorage.getItem('touserId'));
// //     //         } catch (err) {
// //     //             console.error('Error starting conversation:', err);
// //     //             setError('Failed to start conversation.');
// //     //         }
// //     //     };

// //     //     const formatDate = (dateString) => {
// //     //         const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
// //     //         return new Date(dateString).toLocaleDateString('en-US', options);
// //     //     };

// //     //     return (
// //     //         <div className="min-h-screen flex flex-col items-center bg-gradient-to-r from-slate-300 to-slate-500">
// //     //             {/* User Profile */}
// //     //             <div className="w-full px-4 flex justify-end mt-4">
// //     //                 <button
// //     //                     onClick={handleLogout}
// //     //                     className="group flex items-center justify-start w-11 h-11 bg-red-600 rounded-full cursor-pointer relative overflow-hidden transition-all duration-200 shadow-lg hover:w-32 hover:rounded-lg active:translate-x-1 active:translate-y-1"
// //     //                 >
// //     //                     <div className="flex items-center justify-center w-full transition-all duration-300 group-hover:justify-start group-hover:px-3">
// //     //                         <svg className="w-4 h-4" viewBox="0 0 512 512" fill="white">
// //     //                             <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
// //     //                         </svg>
// //     //                     </div>
// //     //                     <div className="absolute right-5 transform translate-x-full opacity-0 text-white text-lg font-semibold transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
// //     //                         Logout
// //     //                     </div>
// //     //                 </button>
// //     //             </div>

// //     //             <h1 className="text-3xl font-bold mb-4 pt-1 bg-gradient-to-r from-emerald-100 to-indigo-200 bg-clip-text text-transparent">GoFIBER</h1>

// //     //             <div className="relative flex items-center justify-center mt-4">
// //     //                 <div className="p-5 overflow-hidden w-[60px] h-[60px] hover:w-[270px] bg-[#7292ec] shadow-[2px_2px_20px_rgba(0,0,0,0.08)] rounded-full flex group items-center hover:duration-300 duration-300">
// //     //                     <div className="flex items-center justify-center fill-white">
// //     //                         <svg xmlns="http://www.w3.org/2000/svg" id="Isolation_Mode" data-name="Isolation Mode" viewBox="0 0 24 24" width="22" height="22">
// //     //                             <path d="M18.9,16.776A10.539,10.539,0,1,0,16.776,18.9l5.1,5.1L24,21.88ZM10.5,18A7.5,7.5,0,1,1,18,10.5,7.507,7.507,0,0,1,10.5,18Z"></path>
// //     //                         </svg>
// //     //                     </div>
// //     //                     <input
// //     //                         type="text"
// //     //                         className="outline-none text-[20px] bg-transparent w-full text-white font-normal px-4"
// //     //                         value={searchTerm}
// //     //                         onChange={(e) => setSearchTerm(e.target.value)}
// //     //                         placeholder="Search for a user"
// //     //                     />
// //     //                 </div>
// //     //             </div>

// //     //             {error && <p className="text-red-500 mb-4">{error}</p>}

// //     //             {userList.length > 0 ? (
// //     //                 <div className="w-full max-w-md mt-4">
// //     //                     {/* <h2 className="text-2xl font-bold mb-4">Users</h2> */}
// //     //                     <ul>
// //     //                         {userList.map((user) => (
// //     //                             <li key={user.id} className="bg-gray-100 p-4 mb-2 rounded shadow w-full max-w-xl">
// //     //                                 {/* <p className="font-semibold">{user.username}</p> */}
// //     //                                 <div className="flex justify-between items-center">
// //     //                                 <p className="font-semibold">{user.username}</p>
// //     //                                 <p>{user.lastMessage}</p>
// //     //                                 <span>{new Date(user.lastMessageDate).toLocaleString()}</span>
// //     //                                 {/* <span className="text-sm text-gray-500">{user.lastMessageDate ? formatDate(user.lastMessageDate) : 'No messages yet'}</span> */}
// //     //                             </div>
// //     //                                 {/* Remove lastMessageDate reference */}
// //     //                                 <button
// //     //                                     onClick={() => handleMessageUser(user)}
// //     //                                     className="mt-2 bg-green-500 text-white py-2 px-4 rounded"
// //     //                                 >
// //     //                                    <ChatAlt2Icon className="w-6 h-6" />
// //     //                                 </button>
// //     //                             </li>
// //     //                         ))}
// //     //                     </ul>
// //     //                 </div>
// //     //             ) : (
// //     //                 <p className="text-gray-500 mt-4">No users found who have messaged you.</p>
// //     //             )}
// //     //         </div>
// //     //     );
// //     // };

// //     // export default Home;

// //     import React, { useEffect, useState } from 'react';
// // import axios from 'axios';
// // import { useNavigate } from 'react-router-dom';
// // import debounce from 'lodash/debounce';
// // import { ChatAlt2Icon } from '@heroicons/react/solid';

// // const Home = () => {
// //     const [userList, setUserList] = useState([]);
// //     const [error, setError] = useState('');
// //     const [searchTerm, setSearchTerm] = useState('');
// //     const navigate = useNavigate();
// //     const userId = localStorage.getItem('userId');

// //     useEffect(() => {
// //         const fetchUsers = async () => {
// //             if (!userId) return;

// //             try {
// //                 const response = await axios.get('http://localhost:3001/usersWhoMessaged', {
// //                     params: { userId }
// //                 });

// //                 console.log('Fetched users:', response.data);

// //                 if (response.data && Array.isArray(response.data)) {
// //                     setUserList(response.data);
// //                 } else {
// //                     console.error('Unexpected response format:', response.data);
// //                     setError('Unexpected response format');
// //                 }
// //             } catch (err) {
// //                 console.error('Error fetching users:', err);
// //                 setError('Error fetching users');
// //             }
// //         };

// //         fetchUsers();
// //     }, [userId]);

// //     const handleLogout = () => {
// //         localStorage.removeItem('userId');
// //         localStorage.removeItem('userEmail');
// //         navigate('/');
// //     };

// //     const debouncedSearch = debounce(async (term) => {
// //         if (term.trim()) {
// //             try {
// //                 const response = await axios.get('http://localhost:3001/users', {
// //                     params: { search: term, userId }
// //                 });
// //                 setUserList(response.data);
// //             } catch (err) {
// //                 console.error('Error searching users:', err);
// //                 setError('Failed to search users.');
// //             }
// //         } else {
// //             // await fetchUsers();
// //             setUserList([]);
// //         }
// //     }, 300);

// //     useEffect(() => {
// //         debouncedSearch(searchTerm);
// //     }, [searchTerm]);

// //     const handleMessageUser = async (user) => {
// //         try {
// //             navigate(`/chat/${user.username}`);
// //             localStorage.setItem('touserId', user.id);
// //             localStorage.setItem('tousername', user.username);
// //             localStorage.setItem('touserEmail', user.email);

// //             console.log('Sender ID:', localStorage.getItem('userId'));
// //             console.log('Receiver ID:', localStorage.getItem('touserId'));
// //         } catch (err) {
// //             console.error('Error starting conversation:', err);
// //             setError('Failed to start conversation.');
// //         }
// //     };

// //     const formatDate = (dateString) => {
// //         const date = new Date(dateString);
// //         const today = new Date();

// //         const isSameDay = date.toDateString() === today.toDateString();

// //         const options = {
// //             year: 'numeric',
// //             month: 'short',
// //             day: 'numeric',
// //             hour: 'numeric',
// //             minute: 'numeric',
// //             second: 'numeric'
// //         };

// //         return isSameDay
// //             ? date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric' })
// //             : date.toLocaleDateString('en-US', options);
// //     };

// //     return (
// //         <div className="min-h-screen flex flex-col items-center bg-gradient-to-r from-slate-300 to-slate-500">
// //             {/* User Profile */}
// //             <div className="w-full px-4 flex justify-end mt-4">
// //                 <button
// //                     onClick={handleLogout}
// //                     className="group flex items-center justify-start w-11 h-11 bg-red-600 rounded-full cursor-pointer relative overflow-hidden transition-all duration-200 shadow-lg hover:w-32 hover:rounded-lg active:translate-x-1 active:translate-y-1"
// //                 >
// //                     <div className="flex items-center justify-center w-full transition-all duration-300 group-hover:justify-start group-hover:px-3">
// //                         <svg className="w-4 h-4" viewBox="0 0 512 512" fill="white">
// //                             <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
// //                         </svg>
// //                     </div>
// //                     <div className="absolute right-5 transform translate-x-full opacity-0 text-white text-lg font-semibold transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
// //                         Logout
// //                     </div>
// //                 </button>
// //             </div>

// //             <h1 className="text-3xl font-bold mb-4 pt-1 bg-gradient-to-r from-emerald-100 to-indigo-200 bg-clip-text text-transparent">GoFIBER</h1>

// //             <div className="relative flex items-center justify-center mt-4">
// //                 <div className="p-5 overflow-hidden w-[60px] h-[60px] hover:w-[270px] bg-[#7292ec] shadow-[2px_2px_20px_rgba(0,0,0,0.08)] rounded-full flex group items-center hover:duration-300 duration-300">
// //                     <div className="flex items-center justify-center fill-white">
// //                         <svg xmlns="http://www.w3.org/2000/svg" id="Isolation_Mode" data-name="Isolation Mode" viewBox="0 0 24 24" width="22" height="22">
// //                             <path d="M18.9,16.776A10.539,10.539,0,1,0,16.776,18.9l5.1,5.1L24,21.88ZM10.5,18A7.5,7.5,0,1,1,18,10.5,7.507,7.507,0,0,1,10.5,18Z"></path>
// //                         </svg>
// //                     </div>
// //                     <input
// //                         type="text"
// //                         className="outline-none text-[20px] bg-transparent w-full text-white font-normal px-4"
// //                         value={searchTerm}
// //                         onChange={(e) => setSearchTerm(e.target.value)}
// //                         placeholder="Search for a user"
// //                     />
// //                 </div>
// //             </div>

// //             {error && <p className="text-red-500 mb-4">{error}</p>}

// //             {userList.length > 0 ? (
// //                 <div className="w-full max-w-md mt-4">
// //                     {/* <h2 className="text-2xl font-bold mb-4">Users</h2> */}
// //                     <ul>
// //                         {userList.map((user) => (
// //                             <li key={user.id} className="bg-gray-100 p-4 mb-2 rounded shadow w-full max-w-xl">
// //                                 <div className="flex justify-between items-center">
// //                                     <p className="font-semibold">{user.username}</p>
// //                                     <p>{user.lastMessage}</p>
// //                                     <span>{formatDate(user.lastMessageDate)}</span>
// //                                 </div>
// //                                 <button
// //                                     onClick={() => handleMessageUser(user)}
// //                                     className="mt-2 bg-green-500 text-white py-2 px-4 rounded"
// //                                 >
// //                                     <ChatAlt2Icon className="w-6 h-6" />
// //                                 </button>
// //                             </li>
// //                         ))}
// //                     </ul>
// //                 </div>
// //             ) : (
// //                 <p className="text-gray-500 mt-4">No users found who have messaged you.</p>
// //             )}
// //         </div>
// //     );
// // };

// // export default Home;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import debounce from 'lodash/debounce';
// import { ChatAlt2Icon } from '@heroicons/react/solid';

// const Home = () => {
//     const [userList, setUserList] = useState([]);
//     const [error, setError] = useState('');
//     const [searchTerm, setSearchTerm] = useState('');
//     const navigate = useNavigate();
//     const userId = localStorage.getItem('userId');

//     const fetchUsers = async () => {
//         if (!userId) return;

//         try {
//             const response = await axios.get('http://localhost:3001/usersWhoMessaged', {
//                 params: { userId }
//             });

//             console.log('Fetched users:', response.data);

//             if (response.data && Array.isArray(response.data)) {
//                 setUserList(response.data);
//             } else {
//                 console.error('Unexpected response format:', response.data);
//                 setError('Unexpected response format');
//             }
//         } catch (err) {
//             console.error('Error fetching users:', err);
//             setError('Error fetching users');
//         }
//     };

//     useEffect(() => {
//         fetchUsers();
//     }, [userId]);

//     const handleLogout = () => {
//         localStorage.removeItem('userId');
//         localStorage.removeItem('userEmail');
//         navigate('/');
//     };

//     const debouncedSearch = debounce(async (term) => {
//         if (term.trim()) {
//             try {
//                 const response = await axios.get('http://localhost:3001/users', {
//                     params: { search: term, userId }
//                 });
//                 setUserList(response.data);
//             } catch (err) {
//                 console.error('Error searching users:', err);
//                 setError('Failed to search users.');
//             }
//         } else {
//             // If the search term is empty, fetch all users who have messaged the logged-in user
//             fetchUsers();
//         }
//     }, 300);

//     useEffect(() => {
//         debouncedSearch(searchTerm);
//     }, [searchTerm]);

//     const handleMessageUser = async (user) => {
//         try {
//             navigate(`/chat/${user.username}`);
//             localStorage.setItem('touserId', user.id);
//             localStorage.setItem('tousername', user.username);
//             localStorage.setItem('touserEmail', user.email);

//             console.log('Sender ID:', localStorage.getItem('userId'));
//             console.log('Receiver ID:', localStorage.getItem('touserId'));
//         } catch (err) {
//             console.error('Error starting conversation:', err);
//             setError('Failed to start conversation.');
//         }
//     };

//     const formatDate = (dateString) => {
//         const date = new Date(dateString);
//         const today = new Date();

//         const isSameDay = date.toDateString() === today.toDateString();

//         const options = {
//             year: 'numeric',
//             month: 'short',
//             day: 'numeric',
//             hour: 'numeric',
//             minute: 'numeric',
//             second: 'numeric'
//         };

//         return isSameDay
//             ? date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric' })
//             : date.toLocaleDateString('en-US', options);
//     };

//     return (
//         <div className="min-h-screen flex flex-col items-center bg-gradient-to-r from-slate-300 to-slate-500">
//             {/* User Profile */}
//             <div className="w-full px-4 flex justify-end mt-4">
//                 <button
//                     onClick={handleLogout}
//                     className="group flex items-center justify-start w-11 h-11 bg-red-600 rounded-full cursor-pointer relative overflow-hidden transition-all duration-200 shadow-lg hover:w-32 hover:rounded-lg active:translate-x-1 active:translate-y-1"
//                 >
//                     <div className="flex items-center justify-center w-full transition-all duration-300 group-hover:justify-start group-hover:px-3">
//                         <svg className="w-4 h-4" viewBox="0 0 512 512" fill="white">
//                             <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
//                         </svg>
//                     </div>
//                     <div className="absolute right-5 transform translate-x-full opacity-0 text-white text-lg font-semibold transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
//                         Logout
//                     </div>
//                 </button>
//             </div>

//             <h1 className="text-3xl font-bold mb-4 pt-1 bg-gradient-to-r from-emerald-100 to-indigo-200 bg-clip-text text-transparent">GoFIBER</h1>

//             <div className="relative flex items-center justify-center mt-4">
//                 <div className="p-5 overflow-hidden w-[60px] h-[60px] hover:w-[270px] bg-[#7292ec] shadow-[2px_2px_20px_rgba(0,0,0,0.08)] rounded-full flex group items-center hover:duration-300 duration-300">
//                     <div className="flex items-center justify-center fill-white">
//                         <svg xmlns="http://www.w3.org/2000/svg" id="Isolation_Mode" data-name="Isolation Mode" viewBox="0 0 24 24" width="22" height="22">
//                             <path d="M18.9,16.776A10.539,10.539,0,1,0,16.776,18.9l5.1,5.1L24,21.88ZM10.5,18A7.5,7.5,0,1,1,18,10.5,7.507,7.507,0,0,1,10.5,18Z"></path>
//                         </svg>
//                     </div>
//                     <input
//                         type="text"
//                         className="outline-none text-[20px] bg-transparent w-full text-white font-normal px-4"
//                         value={searchTerm}
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                         placeholder="Search for a user"
//                     />
//                 </div>
//             </div>

//             {error && <p className="text-red-500 mb-4">{error}</p>}

//             {userList.length > 0 ? (
//                 <div className="w-full max-w-md mt-4">
//                     {/* <h2 className="text-2xl font-bold mb-4">Users</h2> */}
//                     <ul>
//                         {userList.map((user) => (
//                             <li key={user.id} className="bg-gray-100 p-4 mb-2 rounded shadow w-full max-w-xl">
//                                 <div className="flex justify-between items-center">
//                                     <p className="font-semibold">{user.username}</p>
//                                     <p>{user.lastMessage}</p>
//                                     <span>{formatDate(user.lastMessageDate)}</span>
//                                 </div>
//                                 <button
//                                     onClick={() => handleMessageUser(user)}
//                                     className="mt-2 bg-green-500 text-white py-2 px-4 rounded"
//                                 >
//                                     <ChatAlt2Icon className="w-6 h-6" />
//                                 </button>
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             ) : (
//                 <p className="text-gray-500 mt-4">No users found who have messaged you.</p>
//             )}
//         </div>
//     );
// };

// export default Home;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import debounce from 'lodash/debounce';
import { ChatAlt2Icon } from '@heroicons/react/solid';

const Home = () => {
    const [userList, setUserList] = useState([]);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');

    const fetchUsers = async () => {
        if (!userId) return;

        try {
            const response = await axios.get('http://localhost:3001/usersWhoMessaged', {
                params: { userId }
            });

            console.log('Fetched users:', response.data);

            if (response.data && Array.isArray(response.data)) {
                setUserList(response.data);
            } else {
                console.error('Unexpected response format:', response.data);
                setError('Unexpected response format');
            }
        } catch (err) {
            console.error('Error fetching users:', err);
            setError('Error fetching users');
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [userId]);

    const handleLogout = () => {
        localStorage.removeItem('userId');
        localStorage.removeItem('userEmail');
        navigate('/');
    };

    const debouncedSearch = debounce(async (term) => {
        if (term.trim()) {
            try {
                const response = await axios.get('http://localhost:3001/users', {
                    params: { search: term, userId }
                });
                setUserList(response.data);
            } catch (err) {
                console.error('Error searching users:', err);
                setError('Failed to search users.');
            }
        } else {
            // When search term is cleared, re-fetch users who messaged
            fetchUsers();
        }
    }, 300);

    useEffect(() => {
        debouncedSearch(searchTerm);
    }, [searchTerm]);

    const handleMessageUser = async (user) => {
        try {
            navigate(`/chat/${user.username}`);
            localStorage.setItem('touserId', user.id);
            localStorage.setItem('tousername', user.username);
            localStorage.setItem('touserEmail', user.email);

            console.log('Sender ID:', localStorage.getItem('userId'));
            console.log('Receiver ID:', localStorage.getItem('touserId'));
        } catch (err) {
            console.error('Error starting conversation:', err);
            setError('Failed to start conversation.');
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        
        // Check if the date is invalid
        if (isNaN(date.getTime())) {
            return ''; // Return an empty string for invalid dates
        }
    
        const today = new Date();
        const isSameDay = date.toDateString() === today.toDateString();
    
        const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        };
    
        return isSameDay
            ? date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric' })
            : date.toLocaleDateString('en-US', options);
    };
    

    return (
        <div className="min-h-screen flex flex-col items-center bg-[#e8e8e8]">

            {/* User Profile */}
            <div className="relative w-full px-4 flex justify-end mt-4">
    <button
        onClick={handleLogout}
        className="group flex items-center justify-start w-11 h-11 bg-red-600 rounded-full cursor-pointer relative overflow-hidden transition-all duration-200 shadow-lg hover:w-32 hover:rounded-lg active:translate-x-1 active:translate-y-1"
    >
        <div className="flex items-center justify-center w-full transition-all duration-300 group-hover:justify-start group-hover:px-3">
            <svg className="w-4 h-4" viewBox="0 0 512 512" fill="white">
                <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
            </svg>
        </div>
        <div className="absolute right-5 transform translate-x-full opacity-0 text-white text-lg font-semibold transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
            Logout
        </div>
    </button>
        <button
            // onClick={handleAnotherAction}
            className="group flex items-center justify-start w-11 h-11 bg-blue-600 rounded-full cursor-pointer absolute top-full mt-2 overflow-hidden transition-all duration-200 shadow-lg hover:w-32 hover:rounded-lg active:translate-x-1 active:translate-y-1"
        >
            <div className="flex items-center justify-center w-full transition-all duration-300 group-hover:justify-start group-hover:px-3">
            <svg class="svg-icon" viewBox="0 0 20 20" width="26" height="29">
        <path d="M12.075,10.812c1.358-0.853,2.242-2.507,2.242-4.037c0-2.181-1.795-4.618-4.198-4.618S5.921,4.594,5.921,6.775c0,1.53,0.884,3.185,2.242,4.037c-3.222,0.865-5.6,3.807-5.6,7.298c0,0.23,0.189,0.42,0.42,0.42h14.273c0.23,0,0.42-0.189,0.42-0.42C17.676,14.619,15.297,11.677,12.075,10.812 M6.761,6.775c0-2.162,1.773-3.778,3.358-3.778s3.359,1.616,3.359,3.778c0,2.162-1.774,3.778-3.359,3.778S6.761,8.937,6.761,6.775 M3.415,17.69c0.218-3.51,3.142-6.297,6.704-6.297c3.562,0,6.486,2.787,6.705,6.297H3.415z"></path>
    </svg>

            </div>
            <div className="absolute right-5 transform translate-x-full opacity-0 text-white text-lg font-semibold transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
            {localStorage.getItem('username')}
            </div>
        </button>
</div>


            <h1 className="text-3xl font-bold mb-4 pt-1 bg-gradient-to-r from-emerald-500 to-indigo-200 bg-clip-text text-transparent">GoFIBER</h1>

            <div className="relative flex items-center justify-center mt-4">
                <div className="p-5 overflow-hidden w-[60px] h-[60px] hover:w-[270px] bg-[#7292ec] shadow-[2px_2px_20px_rgba(0,0,0,0.08)] rounded-full flex group items-center hover:duration-300 duration-300">
                    <div className="flex items-center justify-center fill-white">
                        <svg xmlns="http://www.w3.org/2000/svg" id="Isolation_Mode" data-name="Isolation Mode" viewBox="0 0 24 24" width="22" height="22">
                            <path d="M18.9,16.776A10.539,10.539,0,1,0,16.776,18.9l5.1,5.1L24,21.88ZM10.5,18A7.5,7.5,0,1,1,18,10.5,7.507,7.507,0,0,1,10.5,18Z"></path>
                        </svg>
                    </div>
                    <input
                        type="text"
                        className="outline-none text-[20px] bg-transparent w-full text-white font-normal px-4"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search for a user"
                    />
                </div>
            </div>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            {userList.length > 0 ? (
                <div className="w-full max-w-md mt-4">
                    <ul>
                        {userList.map((user) => (
                            <li key={user.id} className="bg-[#e8e8e8] cursor-pointer border border-[#e8e8e8] shadow-[6px_6px_12px_#c5c5c5,-6px_-6px_12px_#c5c5c5] p-4 rounded-lg mb-2">
                                <div className="flex justify-between items-center">
                                    <p className="font-semibold">{user.username}</p>
                                    <p>{user.lastMessage}</p>
                                    <span>{formatDate(user.lastMessageDate)}</span>
                                </div>
                                <button
                                    onClick={() => handleMessageUser(user)}
                                    className="mt-2 px-4 py-2 bg-[#003E6D] text-white rounded-md"
                                >
                                    <ChatAlt2Icon className="w-6 h-6" />
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p className="text-gray-500 mt-4">No users found.</p>
            )}
        </div>
    );
};

export default Home;
