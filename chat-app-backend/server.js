





// // // const express = require('express');
// // // const http = require('http');
// // // const socketIo = require('socket.io');
// // // const cors = require('cors');

// // // const { createClient } = require('@supabase/supabase-js');

// // // const bcrypt = require('bcryptjs');

// // // const { ExpressPeerServer } = require('peer');
// // // const WebSocket = require('ws');
// // // const wss = new WebSocket.Server({ port: 8080 }); // Port for WebSocket server
// // // // const io = require('socket.io')(server);


// // // const supabase = createClient(
// // //     'https://baxtkicfvocgdlcimfvp.supabase.co',
// // //     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJheHRraWNmdm9jZ2RsY2ltZnZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE4NTE0NTksImV4cCI6MjAzNzQyNzQ1OX0.n1IuPPw-cMOCB_7S4bZbzy3736ouz8QLJWlhfodMTig' // Ensure this key is correct
// // // );

// // // const app = express();
// // // const server = http.createServer(app);
// // // // const io = socketIo(server);
// // // // const io = socketIo(server, {
// // // //     cors: {
// // // //       origin: "http://localhost:3002", // Replace with your client URL
// // // //       methods: ["GET", "POST"],
// // // //       allowedHeaders: ["my-custom-header"],
// // // //       credentials: true
// // // //     }
// // // //   });

// // // const io = require('socket.io')(server);


// // // const PORT = process.env.PORT || 3000; // Define PORT here



// // // // app.use(cors());

// // // app.use(cors({
// // //     origin: "http://localhost:3002", // Replace with your client URL
// // //     methods: ["GET", "POST"],
// // //     credentials: true
// // //   }));


// // // //   io.on('connection', (socket) => {
// // // //     console.log('New client connected');
// // // //     // Add your socket event handlers here
// // // //   });

// // // io.on('connection', (socket) => {
// // //     socket.on('acceptCall', ({ to }) => {
// // //       console.log(`Call accepted by ${socket.id}`);
// // //       io.to(to).emit('callAccepted', { from: socket.id });
// // //     });
  
// // //     socket.on('rejectCall', ({ to }) => {
// // //       console.log(`Call rejected by ${socket.id}`);
// // //       io.to(to).emit('callRejected', { from: socket.id });
// // //     });
// // //   });

// // // app.use(express.json());
// // // app.use(express.static('public'));



// // // //audio call
// // // io.on('connection', (socket) => {
// // //     console.log('New client connected');
  
// // //     socket.on('offer', (data) => {
// // //       socket.to(data.to).emit('offer', data.offer);
// // //     });
  
// // //     socket.on('answer', (data) => {
// // //       socket.to(data.to).emit('answer', data.answer);
// // //     });
  
// // //     socket.on('ice-candidate', (data) => {
// // //       socket.to(data.to).emit('ice-candidate', data.candidate);
// // //     });
  
// // //     socket.on('disconnect', () => {
// // //       console.log('Client disconnected');
// // //     });
// // //   });


// // // // Basic route to check server status
// // // app.get('/', (req, res) => {
// // //     res.send('Server is running!');
// // // });

// // // // Basic route to check server status
// // // app.get('/', (req, res) => {
// // //     res.send('Server is running!');
// // // });


// // // // User Registration
// // // app.post('/register', async (req, res) => {
// // //     const { email, password, username } = req.body;
// // //     console.log(`Received registration request: email=${email}, username=${username}`);

// // //     try {
// // //         // Check if the user already exists
// // //         const { data: existingUser, error: checkError } = await supabase
// // //             .from('users')
// // //             .select('*')
// // //             .or(`email.eq.${email},username.eq.${username}`);

// // //         if (checkError) {
// // //             console.error('Error checking existing user:', checkError);
// // //             throw checkError;
// // //         }

// // //         console.log('Existing user check result:', existingUser);

// // //         if (existingUser.length > 0) {
// // //             console.log('User already exists:', existingUser);
// // //             return res.status(400).json({ message: 'User already exists' });
// // //         }

// // //         // Hash the password
// // //         console.log('Hashing password');
// // //         const password_hash = await bcrypt.hash(password, 10);
// // //         console.log('Password hash:', password_hash);

// // //         // Insert the new user into the database
// // //         console.log('Inserting new user');
// // //         const { data, error } = await supabase
// // //             .from('users')
// // //             .insert([{ username, email, password_hash }]);

// // //         if (error) {
// // //             console.error('Error inserting user:', error);
// // //             throw error;
// // //         }

// // //         console.log('User registered successfully:', data);
// // //         res.json({ message: 'User registered successfully!' });
// // //     } catch (error) {
// // //         console.error('Register Error:', error.message, error); // Log error details
// // //         res.status(400).json({ message: error.message });
// // //     }
// // // });


// // // // User Login
// // // app.post('/login', async (req, res) => {
// // //     const { email, password } = req.body;
// // //     try {
// // //         const { data: users, error } = await supabase
// // //             .from('users')
// // //             .select('*')
// // //             .eq('email', email);

// // //         if (error) throw error;

// // //         if (users.length === 0) {
// // //             return res.status(400).json({ message: 'User not found' });
// // //         }

// // //         const user = users[0];
// // //         const passwordMatch = await bcrypt.compare(password, user.password_hash);

// // //         if (!passwordMatch) {
// // //             return res.status(400).json({ message: 'Invalid password' });
// // //         }

// // //         res.json({ message: 'Login successful!', user: { id: user.id, username: user.username, email: user.email } });
// // //     } catch (error) {
// // //         console.error('Login Error:', error.message); // Log error details
// // //         res.status(400).json({ message: error.message });
// // //     }
// // // });

// // // //filter users
// // // app.get('/users', async (req, res) => {
// // //     const searchTerm = req.query.search || '';
// // //     console.log('Search Term:', searchTerm); // Log the search term

// // //     try {
// // //         const { data: users, error } = await supabase
// // //             .from('users')
// // //             .select('*')
// // //             .ilike('username', `%${searchTerm}%`)
// // //             .not('username', 'eq', req.query.userId);

// // //         if (error) throw error;

// // //         res.json(users);
// // //     } catch (error) {
// // //         console.error('Users Error:', error.message); // Log error details
// // //         res.status(500).json({ message: 'Server error', error: error.message });
// // //     }
// // // });

// // // app.get('/usersWhoMessaged', async (req, res) => {
// // //     const userId = req.query.userId;
// // //     if (!userId) return res.status(400).json({ error: 'User ID is required' });

// // //     console.log(`Fetching messages for userId: ${userId}`);

// // //     try {
// // //         // Fetch messages where the logged-in user is the recipient
// // //         const { data: receivedMessages, error: receivedMessageError } = await supabase
// // //             .from('messages')
// // //             .select('from_user_id, content, created_at')
// // //             .eq('to_user_id', userId);

// // //         if (receivedMessageError) {
// // //             console.error('Error fetching received messages:', receivedMessageError.message);
// // //             return res.status(500).json({ error: 'Error fetching received messages' });
// // //         }

// // //         // Fetch messages where the logged-in user is the sender
// // //         const { data: sentMessages, error: sentMessageError } = await supabase
// // //             .from('messages')
// // //             .select('to_user_id, content, created_at')
// // //             .eq('from_user_id', userId);

// // //         if (sentMessageError) {
// // //             console.error('Error fetching sent messages:', sentMessageError.message);
// // //             return res.status(500).json({ error: 'Error fetching sent messages' });
// // //         }

// // //         console.log('Fetched received messages:', receivedMessages);
// // //         console.log('Fetched sent messages:', sentMessages);

// // //         // Combine the lists of messages and sort by timestamp
// // //         const allMessages = [
// // //             ...receivedMessages.map(msg => ({
// // //                 userId: msg.from_user_id,
// // //                 lastMessage: msg.content,
// // //                 lastMessageDate: msg.created_at
// // //             })),
// // //             ...sentMessages.map(msg => ({
// // //                 userId: msg.to_user_id,
// // //                 lastMessage: msg.content,
// // //                 lastMessageDate: msg.created_at
// // //             }))
// // //         ];

// // //         // Remove duplicates and keep the latest message timestamp and content for each user
// // //         const uniqueMessages = allMessages.reduce((acc, msg) => {
// // //             if (!acc[msg.userId] || new Date(msg.lastMessageDate) > new Date(acc[msg.userId].lastMessageDate)) {
// // //                 acc[msg.userId] = msg;
// // //             }
// // //             return acc;
// // //         }, {});

// // //         // Convert to array and sort by lastMessageDate descending
// // //         const sortedUserMessages = Object.values(uniqueMessages).sort((a, b) => new Date(b.lastMessageDate) - new Date(a.lastMessageDate));

// // //         // Extract unique user IDs from the sorted messages
// // //         const uniqueUserIds = sortedUserMessages.map(msg => msg.userId).filter(id => id !== userId); // Exclude the logged-in user

// // //         console.log('Unique user IDs to fetch:', uniqueUserIds);

// // //         // Fetch user details for each unique user ID
// // //         const { data: users, error: userError } = await supabase
// // //             .from('users')
// // //             .select('id, username, email') // Adjust fields as needed
// // //             .in('id', uniqueUserIds);

// // //         if (userError) {
// // //             console.error('Error fetching users:', userError.message);
// // //             return res.status(500).json({ error: 'Error fetching users' });
// // //         }

// // //         console.log('Fetched users:', users);

// // //         // Map the users with their last message content and date
// // //         const usersWithLastMessage = users.map(user => {
// // //             const userMessage = sortedUserMessages.find(msg => msg.userId === user.id);
// // //             return {
// // //                 ...user,
// // //                 lastMessage: userMessage ? userMessage.lastMessage : null,
// // //                 lastMessageDate: userMessage ? userMessage.lastMessageDate : null
// // //             };
// // //         });

// // //         // Sort users by lastMessageDate descending
// // //         const sortedUsers = usersWithLastMessage.sort((a, b) => new Date(b.lastMessageDate) - new Date(a.lastMessageDate));

// // //         res.json(sortedUsers);
// // //     } catch (error) {
// // //         console.error('Error fetching data:', error.message);
// // //         res.status(500).json({ error: 'Error fetching data' });
// // //     }
// // // });




// // // // Socket.IO events
// // // io.on('connection', (socket) => {
// // //     console.log('A user connected:', socket.id);

// // //     socket.on('joinRoom', (receiverId) => {
// // //         socket.join(receiverId);
// // //     });

// // //     socket.on('message', async (message) => {
// // //         console.log('Message received:', message);
// // //         const { senderId, receiverId, text } = message;

// // //         // Save message to Supabase
// // //         const { data, error } = await supabase
// // //             .from('messages')
// // //             .insert([{ sender_id: senderId, receiver_id: receiverId, text }]);

// // //         if (error) {
// // //             console.error('Error inserting message:', error.message);
// // //             return;
// // //         }

// // //         // Emit message to the receiver
// // //         io.to(receiverId).emit('message', { id: data[0].id, senderId, text });
// // //     });

// // //     socket.on('messageDeleted', async (messageId) => {
// // //         console.log('Message deleted:', messageId);

// // //         // Delete message from Supabase
// // //         const { error } = await supabase
// // //             .from('messages')
// // //             .delete()
// // //             .eq('id', messageId);

// // //         if (error) {
// // //             console.error('Error deleting message:', error.message);
// // //             return;
// // //         }

// // //         // Notify clients
// // //         io.emit('messageDeleted', messageId);
// // //     });

// // //     socket.on('disconnect', () => {
// // //         console.log('User disconnected:', socket.id);
// // //     });
// // // });

// // // // Fetch messages between users
// // // app.get('/getMessages', async (req, res) => {
// // //     const { fromUserId, toUserId } = req.query; // Get IDs from query parameters

// // //     if (!fromUserId || !toUserId) {
// // //         return res.status(400).json({ error: 'fromUserId and toUserId are required' });
// // //     }

// // //     console.log(`Fetching messages for: fromUserId=${fromUserId}, toUserId=${toUserId}`);

// // //     try {
// // //         // Fetch messages where the current user is sender and other user is receiver
// // //         const { data: messagesFromUser, error: errorFromUser } = await supabase
// // //             .from('messages')
// // //             .select('*')
// // //             .eq('from_user_id', fromUserId)
// // //             .eq('to_user_id', toUserId)
// // //             .order('created_at', { ascending: true });

// // //         if (errorFromUser) {
// // //             console.error('Error fetching messages from user:', errorFromUser.message);
// // //             return res.status(500).json({ error: 'Error fetching messages from user' });
// // //         }

// // //         // Fetch messages where the current user is receiver and other user is sender
// // //         const { data: messagesToUser, error: errorToUser } = await supabase
// // //             .from('messages')
// // //             .select('*')
// // //             .eq('from_user_id', toUserId)
// // //             .eq('to_user_id', fromUserId)
// // //             .order('created_at', { ascending: true });

// // //         if (errorToUser) {
// // //             console.error('Error fetching messages to user:', errorToUser.message);
// // //             return res.status(500).json({ error: 'Error fetching messages to user' });
// // //         }

// // //         // Combine the results
// // //         const allMessages = [...messagesFromUser, ...messagesToUser];

// // //         // Return combined messages
// // //         res.json({ messages: allMessages });
// // //     } catch (error) {
// // //         console.error('Error:', error.message);
// // //         res.status(500).json({ error: 'Internal server error' });
// // //     }
// // // });



// // // // // Route to get user ID by username
// // // // app.get('/getUserIdByUsername/:username', async (req, res) => {
// // // //     const { username } = req.params;
    
// // // //     try {
// // // //         const { data, error } = await supabase
// // // //             .from('users')  // Replace with your actual table name
// // // //             .select('id')  // Assuming 'id' is the UUID column
// // // //             .eq('username', username)
// // // //             .single();

// // // //         if (error) throw error;

// // // //         res.json({ userId: data.id });
// // // //     } catch (error) {
// // // //         console.error('GetUserIdByUsername Error:', error.message);
// // // //         res.status(400).json({ message: error.message });
// // // //     }
// // // // });


// // // // Socket.IO setup for real-time messaging
// // // io.on('connection', (socket) => {
// // //     console.log('A user connected');

// // //     socket.on('joinRoom', async (userId) => {
// // //         console.log(`User ${userId} joined the room`);
// // //         socket.join(userId);
// // //     });

// // //     socket.on('sendMessage', async ({ sender, receiver, text }) => {
// // //         try {
// // //             // Insert the message into Supabase
// // //             const { data, error } = await supabase
// // //                 .from('messages')
// // //                 .insert([{ from_user_id: sender, to_user_id: receiver, content: text }]);

// // //             if (error) throw error;

// // //             // Emit the message to both sender and receiver
// // //             io.to(receiver).emit('message', data[0]);
// // //             io.to(sender).emit('message', data[0]);
// // //         } catch (error) {
// // //             console.error('SendMessage Error:', error.message);
// // //         }
// // //     });

// // //     socket.on('deleteMessage', async ({ messageId }) => {
// // //         try {
// // //             const { error } = await supabase
// // //                 .from('messages')
// // //                 .delete()
// // //                 .eq('id', messageId);

// // //             if (error) throw error;

// // //             // Notify clients about the deleted message
// // //             io.emit('messageDeleted', messageId);
// // //         } catch (error) {
// // //             console.error('DeleteMessage Error:', error.message);
// // //         }
// // //     });

// // //     socket.on('disconnect', () => {
// // //         console.log('User disconnected');
// // //     });
// // // });

// // // server.listen(PORT, () => {
// // //     console.log(`Server is running on port ${PORT}`);
// // // });


// // // const validateEmail = (email) => {
// // //     const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// // //     return re.test(email);
// // // };



// // // app.post('/sendMessage', async (req, res) => {
// // //     const { senderId, receiverId, text } = req.body;

// // //     console.log('Received sender ID:', senderId);
// // //     console.log('Received receiver ID:', receiverId);

// // //     try {
// // //         // Validate sender and receiver IDs
// // //         if (!senderId || !receiverId) {
// // //             throw new Error('Sender ID or receiver ID is missing');
// // //         }

// // //         // Insert the message into Supabase
// // //         const { data, error } = await supabase
// // //             .from('messages')
// // //             .insert([{ from_user_id: senderId, to_user_id: receiverId, content: text }]);

// // //         if (error) {
// // //             console.error('Supabase Insert Error:', error.message);
// // //             throw error;
// // //         }

// // //         // Check if data is valid and has the expected structure
// // //         if (!data || !Array.isArray(data) || data.length === 0) {
// // //             throw new Error('No data returned from Supabase insert');
// // //         }

// // //         console.log('Inserted message data:', data);
// // //         res.json(data[0]);
// // //     } catch (error) {
// // //         console.error('SendMessage Error:', error.message);
// // //         res.status(400).json({ message: error.message });
// // //     }
// // // });


// // // app.post('/deleteMessage', async (req, res) => {
// // //     const { messageId } = req.body;

// // //     console.log('Received request to delete message:', messageId);

// // //     try {
// // //         // Fetch the message from Supabase
// // //         const { data: message, error: fetchError } = await supabase
// // //             .from('messages')
// // //             .select('*')
// // //             .eq('id', messageId)
// // //             .single();

// // //         if (fetchError || !message) {
// // //             console.log('Message not found:', messageId);
// // //             return res.status(404).json({ message: 'Message not found' });
// // //         }

// // //         const currentTime = new Date();
// // //         const messageTime = new Date(message.created_at);
// // //         const diffMinutes = (currentTime - messageTime) / (1000 * 60);

// // //         if (diffMinutes > 2) {
// // //             console.log('Message is too old to delete:', messageId);
// // //             return res.status(403).json({ message: 'Message is too old to delete' });
// // //         }

// // //         // Log before deleting
// // //         console.log('Attempting to delete message:', messageId);

// // //         // Delete the message
// // //         const { error: deleteError } = await supabase
// // //             .from('messages')
// // //             .delete()
// // //             .eq('id', messageId);

// // //         if (deleteError) {
// // //             console.error('Error deleting message:', deleteError.message);
// // //             return res.status(500).json({ message: 'Error deleting message' });
// // //         }

// // //         // Log after successful deletion
// // //         console.log('Message deleted successfully:', messageId);
        
// // //         io.emit('messageDeleted', messageId); // Notify clients
// // //         res.status(200).json({ message: 'Message deleted successfully' });
// // //     } catch (error) {
// // //         console.error('Server error:', error);
// // //         res.status(500).json({ message: 'Server error', error });
// // //     }
// // // });


// // // // app.post('/addReaction', async (req, res) => {
// // // //     const { messageId, userId, reactionType } = req.body;

// // // //     console.log('Adding reaction:', { messageId, userId, reactionType });

// // // //     // Validate inputs
// // // //     if (!messageId || !userId || !reactionType) {
// // // //         return res.status(400).json({ error: 'Missing required fields' });
// // // //     }

// // // //     try {
// // // //         const { data: existingReactions, error: checkError } = await supabase
// // // //             .from('reactions')
// // // //             .select('*')
// // // //             .eq('message_id', messageId)
// // // //             .eq('user_id', userId);

// // // //         console.log('Existing reactions:', existingReactions);
// // // //         if (checkError) {
// // // //             console.error('Error checking existing reactions:', checkError.message);
// // // //             throw checkError;
// // // //         }

// // // //         const { data, error: upsertError } = await supabase
// // // //             .from('reactions')
// // // //             .upsert({ message_id: messageId, user_id: userId, reaction_type: reactionType }, { onConflict: ['message_id', 'user_id'] });

// // // //         if (upsertError) {
// // // //             console.error('Error inserting or updating reaction:', upsertError.message);
// // // //             throw upsertError;
// // // //         }

// // // //         console.log('Reaction added or updated successfully:', data);
// // // //         return res.status(200).json({ success: true, message: 'Reaction added or updated successfully' });
// // // //     } catch (error) {
// // // //         console.error('Error adding reaction:', error.message);
// // // //         res.status(500).json({ error: 'Internal Server Error' });
// // // //     }
// // // // });

// // // app.post('/addReaction', async (req, res) => {
// // //     const { messageId, userId, reactionType } = req.body;

// // //     console.log('Adding reaction:', { messageId, userId, reactionType });

// // //     // Validate inputs
// // //     if (!messageId || !userId || !reactionType) {
// // //         return res.status(400).json({ error: 'Missing required fields' });
// // //     }

// // //     try {
// // //         // Update the reaction in the messages table
// // //         const { data, error: updateError } = await supabase
// // //             .from('messages')
// // //             .update({ reaction: reactionType })
// // //             .eq('id', messageId);

// // //         if (updateError) {
// // //             console.error('Error updating reaction:', updateError.message);
// // //             throw updateError;
// // //         }

// // //         console.log('Reaction added or updated successfully:', data);
// // //         return res.status(200).json({ success: true, message: 'Reaction added or updated successfully' });
// // //     } catch (error) {
// // //         console.error('Error adding reaction:', error.message);
// // //         res.status(500).json({ error: 'Internal Server Error' });
// // //     }
// // // });





// // // // Fetch reactions for a message
// // // app.get('/getReactions', async (req, res) => {
// // //     const { messageId } = req.query;

// // //     console.log('Fetching reactions for messageId:', messageId);

// // //     try {
// // //         const { data: reactions, error } = await supabase
// // //             .from('reactions')
// // //             .select('*')
// // //             .eq('message_id', messageId);

// // //         if (error) {
// // //             console.error('Error fetching reactions:', error.message);
// // //             throw error;
// // //         }

// // //         console.log('Reactions fetched:', reactions);
// // //         res.json({ reactions });
// // //     } catch (error) {
// // //         console.error('Failed to fetch reactions:', error.message);
// // //         res.status(500).json({ error: 'Failed to fetch reactions' });
// // //     }
// // // });




// // // app.get('/api/getUserEmail', async (req, res) => {
// // //     try {
// // //         // Fetch user email logic
// // //         const email = await getUserEmailFromDatabase(); // Replace with your actual logic
// // //         if (email) {
// // //             res.json({ email });
// // //         } else {
// // //             res.status(404).json({ message: 'User email not found' });
// // //         }
// // //     } catch (error) {
// // //         console.error('Error fetching user email:', error);
// // //         res.status(500).send('Server Error');
// // //     }
// // // });


// // // // Get users who have messaged the logged-in user
// // // app.get('/messagedUsers', async (req, res) => {
// // //     const userId = req.query.userId;

// // //     if (!userId) {
// // //         return res.status(400).json({ error: 'User ID is required' });
// // //     }

// // //     try {
// // //         const result = await pool.query(
// // //             `SELECT DISTINCT u.id, u.username, u.email, u.lastMessageDate
// // //             FROM users u
// // //             JOIN messages m ON (u.id = m.from_user_id OR u.id = m.to_user_id)
// // //             WHERE (m.from_user_id = $1 OR m.to_user_id = $1)
// // //             AND u.id != $1
// // //             ORDER BY m.timestamp DESC`,
// // //             [userId]
// // //         );

// // //         res.json(result.rows);
// // //     } catch (err) {
// // //         console.error(userId, err);
// // //         res.status(500).json({ error: userId });
// // //     }
// // // });



// // // // Express example
// // // app.put('/users/update', async (req, res) => {
// // //     const { userId, newUsername } = req.body;

// // //     if (!userId || !newUsername) {
// // //         return res.status(400).json({ error: 'Missing userId or newUsername' });
// // //     }

// // //     try {
// // //         // Update the user in the database
// // //         await db.query('UPDATE users SET username = $1 WHERE id = $2', [newUsername, userId]);
// // //         res.status(200).json({ message: 'Username updated successfully' });
// // //     } catch (error) {
// // //         console.error('Error updating username:', error);
// // //         res.status(500).json({ error: 'Failed to update username' });
// // //     }
// // // });



// // // // Start server
// // // app.listen(3001, () => {
// // //     console.log('Server running on http://localhost:3001');
// // //     console.log(`Server is running on port ${PORT}`);
// // // });

// // // console.log('WebSocket server is running on ws://localhost:8080');








// // // // const express = require('express');
// // // // const http = require('http');
// // // // const socketIo = require('socket.io');
// // // // const cors = require('cors');
// // // // const { createClient } = require('@supabase/supabase-js');
// // // // const bcrypt = require('bcryptjs');
// // // // const { ExpressPeerServer } = require('peer');
// // // // const WebSocket = require('ws');
// // // // const wss = new WebSocket.Server({ port: 8080 }); // Port for WebSocket server
// // // // // const io = require('socket.io')(server);


// // // // const supabase = createClient(
// // // //     'https://baxtkicfvocgdlcimfvp.supabase.co',
// // // //     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJheHRraWNmdm9jZ2RsY2ltZnZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE4NTE0NTksImV4cCI6MjAzNzQyNzQ1OX0.n1IuPPw-cMOCB_7S4bZbzy3736ouz8QLJWlhfodMTig' // Ensure this key is correct
// // // // );

// // // // const app = express();
// // // // const server = http.createServer(app);
// // // // const io = require('socket.io')(server);
// // // // const PORT = process.env.PORT || 3000; // Define PORT here



// // // // app.use(cors({
// // // //     origin: "http://localhost:3002", // Replace with your client URL
// // // //     methods: ["GET", "POST"],
// // // //     credentials: true
// // // //   }));


// // // // app.use(express.json());
// // // // app.use(express.static('public'));



// // // // // Basic route to check server status
// // // // app.get('/', (req, res) => {
// // // //     res.send('Server is running!');
// // // // });


// // // // // User Registration
// // // // app.post('/register', async (req, res) => {
// // // //     const { email, password, username } = req.body;
// // // //     console.log(`Received registration request: email=${email}, username=${username}`);

// // // //     try {
// // // //         // Check if the user already exists
// // // //         const { data: existingUser, error: checkError } = await supabase
// // // //             .from('users')
// // // //             .select('*')
// // // //             .or(`email.eq.${email},username.eq.${username}`);

// // // //         if (checkError) {
// // // //             console.error('Error checking existing user:', checkError);
// // // //             throw checkError;
// // // //         }

// // // //         console.log('Existing user check result:', existingUser);

// // // //         if (existingUser.length > 0) {
// // // //             console.log('User already exists:', existingUser);
// // // //             return res.status(400).json({ message: 'User already exists' });
// // // //         }

// // // //         // Hash the password
// // // //         console.log('Hashing password');
// // // //         const password_hash = await bcrypt.hash(password, 10);
// // // //         console.log('Password hash:', password_hash);

// // // //         // Insert the new user into the database
// // // //         console.log('Inserting new user');
// // // //         const { data, error } = await supabase
// // // //             .from('users')
// // // //             .insert([{ username, email, password_hash }]);

// // // //         if (error) {
// // // //             console.error('Error inserting user:', error);
// // // //             throw error;
// // // //         }

// // // //         console.log('User registered successfully:', data);
// // // //         res.json({ message: 'User registered successfully!' });
// // // //     } catch (error) {
// // // //         console.error('Register Error:', error.message, error); // Log error details
// // // //         res.status(400).json({ message: error.message });
// // // //     }
// // // // });


// // // // // User Login
// // // // app.post('/login', async (req, res) => {
// // // //     const { email, password } = req.body;
// // // //     try {
// // // //         const { data: users, error } = await supabase
// // // //             .from('users')
// // // //             .select('*')
// // // //             .eq('email', email);

// // // //         if (error) throw error;

// // // //         if (users.length === 0) {
// // // //             return res.status(400).json({ message: 'User not found' });
// // // //         }

// // // //         const user = users[0];
// // // //         const passwordMatch = await bcrypt.compare(password, user.password_hash);

// // // //         if (!passwordMatch) {
// // // //             return res.status(400).json({ message: 'Invalid password' });
// // // //         }

// // // //         res.json({ message: 'Login successful!', user: { id: user.id, username: user.username, email: user.email } });
// // // //     } catch (error) {
// // // //         console.error('Login Error:', error.message); // Log error details
// // // //         res.status(400).json({ message: error.message });
// // // //     }
// // // // });

// // // // //filter users
// // // // app.get('/users', async (req, res) => {
// // // //     const searchTerm = req.query.search || '';
// // // //     console.log('Search Term:', searchTerm); // Log the search term

// // // //     try {
// // // //         const { data: users, error } = await supabase
// // // //             .from('users')
// // // //             .select('*')
// // // //             .ilike('username', `%${searchTerm}%`)
// // // //             .not('username', 'eq', req.query.userId);

// // // //         if (error) throw error;

// // // //         res.json(users);
// // // //     } catch (error) {
// // // //         console.error('Users Error:', error.message); // Log error details
// // // //         res.status(500).json({ message: 'Server error', error: error.message });
// // // //     }
// // // // });

// // // // app.get('/usersWhoMessaged', async (req, res) => {
// // // //     const userId = req.query.userId;
// // // //     if (!userId) return res.status(400).json({ error: 'User ID is required' });

// // // //     console.log(`Fetching messages for userId: ${userId}`);

// // // //     try {
// // // //         // Fetch messages where the logged-in user is the recipient
// // // //         const { data: receivedMessages, error: receivedMessageError } = await supabase
// // // //             .from('messages')
// // // //             .select('from_user_id, content, created_at')
// // // //             .eq('to_user_id', userId);

// // // //         if (receivedMessageError) {
// // // //             console.error('Error fetching received messages:', receivedMessageError.message);
// // // //             return res.status(500).json({ error: 'Error fetching received messages' });
// // // //         }

// // // //         // Fetch messages where the logged-in user is the sender
// // // //         const { data: sentMessages, error: sentMessageError } = await supabase
// // // //             .from('messages')
// // // //             .select('to_user_id, content, created_at')
// // // //             .eq('from_user_id', userId);

// // // //         if (sentMessageError) {
// // // //             console.error('Error fetching sent messages:', sentMessageError.message);
// // // //             return res.status(500).json({ error: 'Error fetching sent messages' });
// // // //         }

// // // //         console.log('Fetched received messages:', receivedMessages);
// // // //         console.log('Fetched sent messages:', sentMessages);

// // // //         // Combine the lists of messages and sort by timestamp
// // // //         const allMessages = [
// // // //             ...receivedMessages.map(msg => ({
// // // //                 userId: msg.from_user_id,
// // // //                 lastMessage: msg.content,
// // // //                 lastMessageDate: msg.created_at
// // // //             })),
// // // //             ...sentMessages.map(msg => ({
// // // //                 userId: msg.to_user_id,
// // // //                 lastMessage: msg.content,
// // // //                 lastMessageDate: msg.created_at
// // // //             }))
// // // //         ];

// // // //         // Remove duplicates and keep the latest message timestamp and content for each user
// // // //         const uniqueMessages = allMessages.reduce((acc, msg) => {
// // // //             if (!acc[msg.userId] || new Date(msg.lastMessageDate) > new Date(acc[msg.userId].lastMessageDate)) {
// // // //                 acc[msg.userId] = msg;
// // // //             }
// // // //             return acc;
// // // //         }, {});

// // // //         // Convert to array and sort by lastMessageDate descending
// // // //         const sortedUserMessages = Object.values(uniqueMessages).sort((a, b) => new Date(b.lastMessageDate) - new Date(a.lastMessageDate));

// // // //         // Extract unique user IDs from the sorted messages
// // // //         const uniqueUserIds = sortedUserMessages.map(msg => msg.userId).filter(id => id !== userId); // Exclude the logged-in user

// // // //         console.log('Unique user IDs to fetch:', uniqueUserIds);

// // // //         // Fetch user details for each unique user ID
// // // //         const { data: users, error: userError } = await supabase
// // // //             .from('users')
// // // //             .select('id, username, email') // Adjust fields as needed
// // // //             .in('id', uniqueUserIds);

// // // //         if (userError) {
// // // //             console.error('Error fetching users:', userError.message);
// // // //             return res.status(500).json({ error: 'Error fetching users' });
// // // //         }

// // // //         console.log('Fetched users:', users);

// // // //         // Map the users with their last message content and date
// // // //         const usersWithLastMessage = users.map(user => {
// // // //             const userMessage = sortedUserMessages.find(msg => msg.userId === user.id);
// // // //             return {
// // // //                 ...user,
// // // //                 lastMessage: userMessage ? userMessage.lastMessage : null,
// // // //                 lastMessageDate: userMessage ? userMessage.lastMessageDate : null
// // // //             };
// // // //         });

// // // //         // Sort users by lastMessageDate descending
// // // //         const sortedUsers = usersWithLastMessage.sort((a, b) => new Date(b.lastMessageDate) - new Date(a.lastMessageDate));

// // // //         res.json(sortedUsers);
// // // //     } catch (error) {
// // // //         console.error('Error fetching data:', error.message);
// // // //         res.status(500).json({ error: 'Error fetching data' });
// // // //     }
// // // // });




// // // // // Socket.IO events
// // // // io.on('connection', (socket) => {
// // // //     console.log('A user connected:', socket.id);

// // // //     socket.on('joinRoom', (receiverId) => {
// // // //         socket.join(receiverId);
// // // //     });

// // // //     socket.on('message', async (message) => {
// // // //         console.log('Message received:', message);
// // // //         const { senderId, receiverId, text } = message;

// // // //         // Save message to Supabase
// // // //         const { data, error } = await supabase
// // // //             .from('messages')
// // // //             .insert([{ sender_id: senderId, receiver_id: receiverId, text }]);

// // // //         if (error) {
// // // //             console.error('Error inserting message:', error.message);
// // // //             return;
// // // //         }

// // // //         // Emit message to the receiver
// // // //         io.to(receiverId).emit('message', { id: data[0].id, senderId, text });
// // // //     });

// // // //     socket.on('messageDeleted', async (messageId) => {
// // // //         console.log('Message deleted:', messageId);

// // // //         // Delete message from Supabase
// // // //         const { error } = await supabase
// // // //             .from('messages')
// // // //             .delete()
// // // //             .eq('id', messageId);

// // // //         if (error) {
// // // //             console.error('Error deleting message:', error.message);
// // // //             return;
// // // //         }

// // // //         // Notify clients
// // // //         io.emit('messageDeleted', messageId);
// // // //     });

// // // //     socket.on('disconnect', () => {
// // // //         console.log('User disconnected:', socket.id);
// // // //     });
// // // // });

// // // // // Fetch messages between users
// // // // app.get('/getMessages', async (req, res) => {
// // // //     const { fromUserId, toUserId } = req.query; // Get IDs from query parameters

// // // //     if (!fromUserId || !toUserId) {
// // // //         return res.status(400).json({ error: 'fromUserId and toUserId are required' });
// // // //     }

// // // //     console.log(`Fetching messages for: fromUserId=${fromUserId}, toUserId=${toUserId}`);

// // // //     try {
// // // //         // Fetch messages where the current user is sender and other user is receiver
// // // //         const { data: messagesFromUser, error: errorFromUser } = await supabase
// // // //             .from('messages')
// // // //             .select('*')
// // // //             .eq('from_user_id', fromUserId)
// // // //             .eq('to_user_id', toUserId)
// // // //             .order('created_at', { ascending: true });

// // // //         if (errorFromUser) {
// // // //             console.error('Error fetching messages from user:', errorFromUser.message);
// // // //             return res.status(500).json({ error: 'Error fetching messages from user' });
// // // //         }

// // // //         // Fetch messages where the current user is receiver and other user is sender
// // // //         const { data: messagesToUser, error: errorToUser } = await supabase
// // // //             .from('messages')
// // // //             .select('*')
// // // //             .eq('from_user_id', toUserId)
// // // //             .eq('to_user_id', fromUserId)
// // // //             .order('created_at', { ascending: true });

// // // //         if (errorToUser) {
// // // //             console.error('Error fetching messages to user:', errorToUser.message);
// // // //             return res.status(500).json({ error: 'Error fetching messages to user' });
// // // //         }

// // // //         // Combine the results
// // // //         const allMessages = [...messagesFromUser, ...messagesToUser];

// // // //         // Return combined messages
// // // //         res.json({ messages: allMessages });
// // // //     } catch (error) {
// // // //         console.error('Error:', error.message);
// // // //         res.status(500).json({ error: 'Internal server error' });
// // // //     }
// // // // });



// // // // // Socket.IO setup for real-time messaging
// // // // io.on('connection', (socket) => {
// // // //     console.log('A user connected');

// // // //     socket.on('joinRoom', async (userId) => {
// // // //         console.log(`User ${userId} joined the room`);
// // // //         socket.join(userId);
// // // //     });

// // // //     socket.on('sendMessage', async ({ sender, receiver, text }) => {
// // // //         try {
// // // //             // Insert the message into Supabase
// // // //             const { data, error } = await supabase
// // // //                 .from('messages')
// // // //                 .insert([{ from_user_id: sender, to_user_id: receiver, content: text }]);

// // // //             if (error) throw error;

// // // //             // Emit the message to both sender and receiver
// // // //             io.to(receiver).emit('message', data[0]);
// // // //             io.to(sender).emit('message', data[0]);
// // // //         } catch (error) {
// // // //             console.error('SendMessage Error:', error.message);
// // // //         }
// // // //     });

// // // //     socket.on('deleteMessage', async ({ messageId }) => {
// // // //         try {
// // // //             const { error } = await supabase
// // // //                 .from('messages')
// // // //                 .delete()
// // // //                 .eq('id', messageId);

// // // //             if (error) throw error;

// // // //             // Notify clients about the deleted message
// // // //             io.emit('messageDeleted', messageId);
// // // //         } catch (error) {
// // // //             console.error('DeleteMessage Error:', error.message);
// // // //         }
// // // //     });

// // // //     socket.on('disconnect', () => {
// // // //         console.log('User disconnected');
// // // //     });
// // // // });

// // // // server.listen(PORT, () => {
// // // //     console.log(`Server is running on port ${PORT}`);
// // // // });



// // // // app.post('/sendMessage', async (req, res) => {
// // // //     const { senderId, receiverId, text } = req.body;

// // // //     console.log('Received sender ID:', senderId);
// // // //     console.log('Received receiver ID:', receiverId);

// // // //     try {
// // // //         // Validate sender and receiver IDs
// // // //         if (!senderId || !receiverId) {
// // // //             throw new Error('Sender ID or receiver ID is missing');
// // // //         }

// // // //         // Insert the message into Supabase
// // // //         const { data, error } = await supabase
// // // //             .from('messages')
// // // //             .insert([{ from_user_id: senderId, to_user_id: receiverId, content: text }]);

// // // //         if (error) {
// // // //             console.error('Supabase Insert Error:', error.message);
// // // //             throw error;
// // // //         }

// // // //         // Check if data is valid and has the expected structure
// // // //         if (!data || !Array.isArray(data) || data.length === 0) {
// // // //             throw new Error('No data returned from Supabase insert');
// // // //         }

// // // //         console.log('Inserted message data:', data);
// // // //         res.json(data[0]);
// // // //     } catch (error) {
// // // //         console.error('SendMessage Error:', error.message);
// // // //         res.status(400).json({ message: error.message });
// // // //     }
// // // // });


// // // // app.post('/deleteMessage', async (req, res) => {
// // // //     const { messageId } = req.body;

// // // //     console.log('Received request to delete message:', messageId);

// // // //     try {
// // // //         // Fetch the message from Supabase
// // // //         const { data: message, error: fetchError } = await supabase
// // // //             .from('messages')
// // // //             .select('*')
// // // //             .eq('id', messageId)
// // // //             .single();

// // // //         if (fetchError || !message) {
// // // //             console.log('Message not found:', messageId);
// // // //             return res.status(404).json({ message: 'Message not found' });
// // // //         }

// // // //         const currentTime = new Date();
// // // //         const messageTime = new Date(message.created_at);
// // // //         const diffMinutes = (currentTime - messageTime) / (1000 * 60);

// // // //         if (diffMinutes > 2) {
// // // //             console.log('Message is too old to delete:', messageId);
// // // //             return res.status(403).json({ message: 'Message is too old to delete' });
// // // //         }

// // // //         // Log before deleting
// // // //         console.log('Attempting to delete message:', messageId);

// // // //         // Delete the message
// // // //         const { error: deleteError } = await supabase
// // // //             .from('messages')
// // // //             .delete()
// // // //             .eq('id', messageId);

// // // //         if (deleteError) {
// // // //             console.error('Error deleting message:', deleteError.message);
// // // //             return res.status(500).json({ message: 'Error deleting message' });
// // // //         }

// // // //         // Log after successful deletion
// // // //         console.log('Message deleted successfully:', messageId);
        
// // // //         io.emit('messageDeleted', messageId); // Notify clients
// // // //         res.status(200).json({ message: 'Message deleted successfully' });
// // // //     } catch (error) {
// // // //         console.error('Server error:', error);
// // // //         res.status(500).json({ message: 'Server error', error });
// // // //     }
// // // // });

// // // // app.post('/addReaction', async (req, res) => {
// // // //     const { messageId, userId, reactionType } = req.body;

// // // //     console.log('Adding reaction:', { messageId, userId, reactionType });

// // // //     // Validate inputs
// // // //     if (!messageId || !userId || !reactionType) {
// // // //         return res.status(400).json({ error: 'Missing required fields' });
// // // //     }

// // // //     try {
// // // //         // Update the reaction in the messages table
// // // //         const { data, error: updateError } = await supabase
// // // //             .from('messages')
// // // //             .update({ reaction: reactionType })
// // // //             .eq('id', messageId);

// // // //         if (updateError) {
// // // //             console.error('Error updating reaction:', updateError.message);
// // // //             throw updateError;
// // // //         }

// // // //         console.log('Reaction added or updated successfully:', data);
// // // //         return res.status(200).json({ success: true, message: 'Reaction added or updated successfully' });
// // // //     } catch (error) {
// // // //         console.error('Error adding reaction:', error.message);
// // // //         res.status(500).json({ error: 'Internal Server Error' });
// // // //     }
// // // // });


// // // // // Get users who have messaged the logged-in user
// // // // app.get('/messagedUsers', async (req, res) => {
// // // //     const userId = req.query.userId;

// // // //     if (!userId) {
// // // //         return res.status(400).json({ error: 'User ID is required' });
// // // //     }

// // // //     try {
// // // //         const result = await pool.query(
// // // //             `SELECT DISTINCT u.id, u.username, u.email, u.lastMessageDate
// // // //             FROM users u
// // // //             JOIN messages m ON (u.id = m.from_user_id OR u.id = m.to_user_id)
// // // //             WHERE (m.from_user_id = $1 OR m.to_user_id = $1)
// // // //             AND u.id != $1
// // // //             ORDER BY m.timestamp DESC`,
// // // //             [userId]
// // // //         );

// // // //         res.json(result.rows);
// // // //     } catch (err) {
// // // //         console.error(userId, err);
// // // //         res.status(500).json({ error: userId });
// // // //     }
// // // // });



// // // // // Express example
// // // // app.put('/users/update', async (req, res) => {
// // // //     const { userId, newUsername } = req.body;

// // // //     if (!userId || !newUsername) {
// // // //         return res.status(400).json({ error: 'Missing userId or newUsername' });
// // // //     }

// // // //     try {
// // // //         // Update the user in the database
// // // //         await db.query('UPDATE users SET username = $1 WHERE id = $2', [newUsername, userId]);
// // // //         res.status(200).json({ message: 'Username updated successfully' });
// // // //     } catch (error) {
// // // //         console.error('Error updating username:', error);
// // // //         res.status(500).json({ error: 'Failed to update username' });
// // // //     }
// // // // });



// // // // // Start server
// // // // app.listen(3001, () => {
// // // //     console.log('Server running on http://localhost:3001');
// // // //     console.log(`Server is running on port ${PORT}`);
// // // // });

// // // // console.log('WebSocket server is running on ws://localhost:8080');
















// // const express = require('express');
// // const http = require('http');
// // const socketIo = require('socket.io');
// // const cors = require('cors');

// // const { createClient } = require('@supabase/supabase-js');
// // const bcrypt = require('bcryptjs');
// // const { ExpressPeerServer } = require('peer');

// // const WebSocket = require('ws');
// // const wss = new WebSocket.Server({ port: 8080 }); // Port for WebSocket server



// // const supabase = createClient(
// //     'https://baxtkicfvocgdlcimfvp.supabase.co',
// //     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJheHRraWNmdm9jZ2RsY2ltZnZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE4NTE0NTksImV4cCI6MjAzNzQyNzQ1OX0.n1IuPPw-cMOCB_7S4bZbzy3736ouz8QLJWlhfodMTig' // Ensure this key is correct
// // );

// // const app = express();
// // const server = http.createServer(app);
// // const io = require('socket.io')(server);
// // // const io = new Server(server);


// // const PORT = process.env.PORT || 3000; // Define PORT here



// // // app.use(cors());

// // app.use(cors({
// //     origin: "http://localhost:3002", // Replace with your client URL
// //     methods: ["GET", "POST"],
// //     credentials: true
// //   }));


// //   io.on('connection', (socket) => {
// //     console.log('A user connected:', socket.id);

// //     socket.on('acceptCall', ({ to }) => {
// //         console.log(`Call accepted by ${socket.id}`);
// //         io.to(to).emit('callAccepted', { from: socket.id });
// //     });

// //     socket.on('rejectCall', ({ to }) => {
// //         console.log(`Call rejected by ${socket.id}`);
// //         io.to(to).emit('callRejected', { from: socket.id });
// //     });

// //     // Other socket events go here...

// //     socket.on('disconnect', () => {
// //         console.log('User disconnected:', socket.id);
// //     });
// // });

// // app.use(express.json());
// // app.use(express.static('public'));



// // //audio call
// // io.on('connection', (socket) => {
// //     console.log('New client connected');
  
// //     socket.on('offer', (data) => {
// //       socket.to(data.to).emit('offer', data.offer);
// //     });
  
// //     socket.on('answer', (data) => {
// //       socket.to(data.to).emit('answer', data.answer);
// //     });
  
// //     socket.on('ice-candidate', (data) => {
// //       socket.to(data.to).emit('ice-candidate', data.candidate);
// //     });
  
// //     socket.on('disconnect', () => {
// //       console.log('Client disconnected');
// //     });
// //   });


// // // Basic route to check server status
// // app.get('/', (req, res) => {
// //     res.send('Server is running!');
// // });


// // // User Registration
// // app.post('/register', async (req, res) => {
// //     const { email, password, username } = req.body;
// //     console.log(`Received registration request: email=${email}, username=${username}`);

// //     try {
// //         // Check if the user already exists
// //         const { data: existingUser, error: checkError } = await supabase
// //             .from('users')
// //             .select('*')
// //             .or(`email.eq.${email},username.eq.${username}`);

// //         if (checkError) {
// //             console.error('Error checking existing user:', checkError);
// //             throw checkError;
// //         }

// //         console.log('Existing user check result:', existingUser);

// //         if (existingUser.length > 0) {
// //             console.log('User already exists:', existingUser);
// //             return res.status(400).json({ message: 'User already exists' });
// //         }

// //         // Hash the password
// //         console.log('Hashing password');
// //         const password_hash = await bcrypt.hash(password, 10);
// //         console.log('Password hash:', password_hash);

// //         // Insert the new user into the database
// //         console.log('Inserting new user');
// //         const { data, error } = await supabase
// //             .from('users')
// //             .insert([{ username, email, password_hash }]);

// //         if (error) {
// //             console.error('Error inserting user:', error);
// //             throw error;
// //         }

// //         console.log('User registered successfully:', data);
// //         res.json({ message: 'User registered successfully!' });
// //     } catch (error) {
// //         console.error('Register Error:', error.message, error); // Log error details
// //         res.status(400).json({ message: error.message });
// //     }
// // });


// // // User Login
// // app.post('/login', async (req, res) => {
// //     const { email, password } = req.body;
// //     try {
// //         const { data: users, error } = await supabase
// //             .from('users')
// //             .select('*')
// //             .eq('email', email);

// //         if (error) throw error;

// //         if (users.length === 0) {
// //             return res.status(400).json({ message: 'User not found' });
// //         }

// //         const user = users[0];
// //         const passwordMatch = await bcrypt.compare(password, user.password_hash);

// //         if (!passwordMatch) {
// //             return res.status(400).json({ message: 'Invalid password' });
// //         }

// //         res.json({ message: 'Login successful!', user: { id: user.id, username: user.username, email: user.email } });
// //     } catch (error) {
// //         console.error('Login Error:', error.message); // Log error details
// //         res.status(400).json({ message: error.message });
// //     }
// // });

// // //filter users
// // app.get('/users', async (req, res) => {
// //     const searchTerm = req.query.search || '';
// //     console.log('Search Term:', searchTerm); // Log the search term

// //     try {
// //         const { data: users, error } = await supabase
// //             .from('users')
// //             .select('*')
// //             .ilike('username', `%${searchTerm}%`)
// //             .not('username', 'eq', req.query.userId);

// //         if (error) throw error;

// //         res.json(users);
// //     } catch (error) {
// //         console.error('Users Error:', error.message); // Log error details
// //         res.status(500).json({ message: 'Server error', error: error.message });
// //     }
// // });

// // app.get('/usersWhoMessaged', async (req, res) => {
// //     const userId = req.query.userId;
// //     if (!userId) return res.status(400).json({ error: 'User ID is required' });

// //     console.log(`Fetching messages for userId: ${userId}`);

// //     try {
// //         // Fetch messages where the logged-in user is the recipient
// //         const { data: receivedMessages, error: receivedMessageError } = await supabase
// //             .from('messages')
// //             .select('from_user_id, content, created_at')
// //             .eq('to_user_id', userId);

// //         if (receivedMessageError) {
// //             console.error('Error fetching received messages:', receivedMessageError.message);
// //             return res.status(500).json({ error: 'Error fetching received messages' });
// //         }

// //         // Fetch messages where the logged-in user is the sender
// //         const { data: sentMessages, error: sentMessageError } = await supabase
// //             .from('messages')
// //             .select('to_user_id, content, created_at')
// //             .eq('from_user_id', userId);

// //         if (sentMessageError) {
// //             console.error('Error fetching sent messages:', sentMessageError.message);
// //             return res.status(500).json({ error: 'Error fetching sent messages' });
// //         }

// //         console.log('Fetched received messages:', receivedMessages);
// //         console.log('Fetched sent messages:', sentMessages);

// //         // Combine the lists of messages and sort by timestamp
// //         const allMessages = [
// //             ...receivedMessages.map(msg => ({
// //                 userId: msg.from_user_id,
// //                 lastMessage: msg.content,
// //                 lastMessageDate: msg.created_at
// //             })),
// //             ...sentMessages.map(msg => ({
// //                 userId: msg.to_user_id,
// //                 lastMessage: msg.content,
// //                 lastMessageDate: msg.created_at
// //             }))
// //         ];

// //         // Remove duplicates and keep the latest message timestamp and content for each user
// //         const uniqueMessages = allMessages.reduce((acc, msg) => {
// //             if (!acc[msg.userId] || new Date(msg.lastMessageDate) > new Date(acc[msg.userId].lastMessageDate)) {
// //                 acc[msg.userId] = msg;
// //             }
// //             return acc;
// //         }, {});

// //         // Convert to array and sort by lastMessageDate descending
// //         const sortedUserMessages = Object.values(uniqueMessages).sort((a, b) => new Date(b.lastMessageDate) - new Date(a.lastMessageDate));

// //         // Extract unique user IDs from the sorted messages
// //         const uniqueUserIds = sortedUserMessages.map(msg => msg.userId).filter(id => id !== userId); // Exclude the logged-in user

// //         console.log('Unique user IDs to fetch:', uniqueUserIds);

// //         // Fetch user details for each unique user ID
// //         const { data: users, error: userError } = await supabase
// //             .from('users')
// //             .select('id, username, email') // Adjust fields as needed
// //             .in('id', uniqueUserIds);

// //         if (userError) {
// //             console.error('Error fetching users:', userError.message);
// //             return res.status(500).json({ error: 'Error fetching users' });
// //         }

// //         console.log('Fetched users:', users);

// //         // Map the users with their last message content and date
// //         const usersWithLastMessage = users.map(user => {
// //             const userMessage = sortedUserMessages.find(msg => msg.userId === user.id);
// //             return {
// //                 ...user,
// //                 lastMessage: userMessage ? userMessage.lastMessage : null,
// //                 lastMessageDate: userMessage ? userMessage.lastMessageDate : null
// //             };
// //         });

// //         // Sort users by lastMessageDate descending
// //         const sortedUsers = usersWithLastMessage.sort((a, b) => new Date(b.lastMessageDate) - new Date(a.lastMessageDate));

// //         res.json(sortedUsers);
// //     } catch (error) {
// //         console.error('Error fetching data:', error.message);
// //         res.status(500).json({ error: 'Error fetching data' });
// //     }
// // });




// // // Socket.IO events
// // io.on('connection', (socket) => {
// //     console.log('A user connected:', socket.id);

// //     socket.on('joinRoom', (receiverId) => {
// //         socket.join(receiverId);
// //     });

// //     socket.on('message', async (message) => {
// //         console.log('Message received:', message);
// //         const { senderId, receiverId, text } = message;

// //         // Save message to Supabase
// //         const { data, error } = await supabase
// //             .from('messages')
// //             .insert([{ sender_id: senderId, receiver_id: receiverId, text }]);

// //         if (error) {
// //             console.error('Error inserting message:', error.message);
// //             return;
// //         }

// //         // Emit message to the receiver
// //         io.to(receiverId).emit('message', { id: data[0].id, senderId, text });
// //     });

// //     socket.on('messageDeleted', async (messageId) => {
// //         console.log('Message deleted:', messageId);

// //         // Delete message from Supabase
// //         const { error } = await supabase
// //             .from('messages')
// //             .delete()
// //             .eq('id', messageId);

// //         if (error) {
// //             console.error('Error deleting message:', error.message);
// //             return;
// //         }

// //         // Notify clients
// //         io.emit('messageDeleted', messageId);
// //     });

// //     socket.on('disconnect', () => {
// //         console.log('User disconnected:', socket.id);
// //     });
// // });

// // // Fetch messages between users
// // app.get('/getMessages', async (req, res) => {
// //     const { fromUserId, toUserId } = req.query; // Get IDs from query parameters

// //     if (!fromUserId || !toUserId) {
// //         return res.status(400).json({ error: 'fromUserId and toUserId are required' });
// //     }

// //     console.log(`Fetching messages for: fromUserId=${fromUserId}, toUserId=${toUserId}`);

// //     try {
// //         // Fetch messages where the current user is sender and other user is receiver
// //         const { data: messagesFromUser, error: errorFromUser } = await supabase
// //             .from('messages')
// //             .select('*')
// //             .eq('from_user_id', fromUserId)
// //             .eq('to_user_id', toUserId)
// //             .order('created_at', { ascending: true });

// //         if (errorFromUser) {
// //             console.error('Error fetching messages from user:', errorFromUser.message);
// //             return res.status(500).json({ error: 'Error fetching messages from user' });
// //         }

// //         // Fetch messages where the current user is receiver and other user is sender
// //         const { data: messagesToUser, error: errorToUser } = await supabase
// //             .from('messages')
// //             .select('*')
// //             .eq('from_user_id', toUserId)
// //             .eq('to_user_id', fromUserId)
// //             .order('created_at', { ascending: true });

// //         if (errorToUser) {
// //             console.error('Error fetching messages to user:', errorToUser.message);
// //             return res.status(500).json({ error: 'Error fetching messages to user' });
// //         }

// //         // Combine the results
// //         const allMessages = [...messagesFromUser, ...messagesToUser];

// //         // Return combined messages
// //         res.json({ messages: allMessages });
// //     } catch (error) {
// //         console.error('Error:', error.message);
// //         res.status(500).json({ error: 'Internal server error' });
// //     }
// // });



// // // Socket.IO setup for real-time messaging
// // io.on('connection', (socket) => {
// //     console.log('A user connected');

// //     socket.on('joinRoom', async (userId) => {
// //         console.log(`User ${userId} joined the room`);
// //         socket.join(userId);
// //     });

// //     socket.on('sendMessage', async ({ sender, receiver, text }) => {
// //         try {
// //             // Insert the message into Supabase
// //             const { data, error } = await supabase
// //                 .from('messages')
// //                 .insert([{ from_user_id: sender, to_user_id: receiver, content: text }]);

// //             if (error) throw error;

// //             // Emit the message to both sender and receiver
// //             io.to(receiver).emit('message', data[0]);
// //             io.to(sender).emit('message', data[0]);
// //         } catch (error) {
// //             console.error('SendMessage Error:', error.message);
// //         }
// //     });

// //     socket.on('deleteMessage', async ({ messageId }) => {
// //         try {
// //             const { error } = await supabase
// //                 .from('messages')
// //                 .delete()
// //                 .eq('id', messageId);

// //             if (error) throw error;

// //             // Notify clients about the deleted message
// //             io.emit('messageDeleted', messageId);
// //         } catch (error) {
// //             console.error('DeleteMessage Error:', error.message);
// //         }
// //     });

// //     socket.on('disconnect', () => {
// //         console.log('User disconnected');
// //     });
// // });

// // server.listen(PORT, () => {
// //     console.log(`Server is running on port ${PORT}`);
// // });


// // const validateEmail = (email) => {
// //     const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// //     return re.test(email);
// // };



// // app.post('/sendMessage', async (req, res) => {
// //     const { senderId, receiverId, text } = req.body;

// //     console.log('Received sender ID:', senderId);
// //     console.log('Received receiver ID:', receiverId);

// //     try {
// //         // Validate sender and receiver IDs
// //         if (!senderId || !receiverId) {
// //             throw new Error('Sender ID or receiver ID is missing');
// //         }

// //         // Insert the message into Supabase
// //         const { data, error } = await supabase
// //             .from('messages')
// //             .insert([{ from_user_id: senderId, to_user_id: receiverId, content: text }]);

// //         if (error) {
// //             console.error('Supabase Insert Error:', error.message);
// //             throw error;
// //         }

// //         // Check if data is valid and has the expected structure
// //         if (!data || !Array.isArray(data) || data.length === 0) {
// //             throw new Error('No data returned from Supabase insert');
// //         }

// //         console.log('Inserted message data:', data);
// //         res.json(data[0]);
// //     } catch (error) {
// //         console.error('SendMessage Error:', error.message);
// //         res.status(400).json({ message: error.message });
// //     }
// // });


// // app.post('/deleteMessage', async (req, res) => {
// //     const { messageId } = req.body;

// //     console.log('Received request to delete message:', messageId);

// //     try {
// //         // Fetch the message from Supabase
// //         const { data: message, error: fetchError } = await supabase
// //             .from('messages')
// //             .select('*')
// //             .eq('id', messageId)
// //             .single();

// //         if (fetchError || !message) {
// //             console.log('Message not found:', messageId);
// //             return res.status(404).json({ message: 'Message not found' });
// //         }

// //         const currentTime = new Date();
// //         const messageTime = new Date(message.created_at);
// //         const diffMinutes = (currentTime - messageTime) / (1000 * 60);

// //         if (diffMinutes > 2) {
// //             console.log('Message is too old to delete:', messageId);
// //             return res.status(403).json({ message: 'Message is too old to delete' });
// //         }

// //         // Log before deleting
// //         console.log('Attempting to delete message:', messageId);

// //         // Delete the message
// //         const { error: deleteError } = await supabase
// //             .from('messages')
// //             .delete()
// //             .eq('id', messageId);

// //         if (deleteError) {
// //             console.error('Error deleting message:', deleteError.message);
// //             return res.status(500).json({ message: 'Error deleting message' });
// //         }

// //         // Log after successful deletion
// //         console.log('Message deleted successfully:', messageId);
        
// //         io.emit('messageDeleted', messageId); // Notify clients
// //         res.status(200).json({ message: 'Message deleted successfully' });
// //     } catch (error) {
// //         console.error('Server error:', error);
// //         res.status(500).json({ message: 'Server error', error });
// //     }
// // });


// // app.post('/addReaction', async (req, res) => {
// //     const { messageId, userId, reactionType } = req.body;

// //     console.log('Adding reaction:', { messageId, userId, reactionType });

// //     // Validate inputs
// //     if (!messageId || !userId || !reactionType) {
// //         return res.status(400).json({ error: 'Missing required fields' });
// //     }

// //     try {
// //         // Update the reaction in the messages table
// //         const { data, error: updateError } = await supabase
// //             .from('messages')
// //             .update({ reaction: reactionType })
// //             .eq('id', messageId);

// //         if (updateError) {
// //             console.error('Error updating reaction:', updateError.message);
// //             throw updateError;
// //         }

// //         console.log('Reaction added or updated successfully:', data);
// //         return res.status(200).json({ success: true, message: 'Reaction added or updated successfully' });
// //     } catch (error) {
// //         console.error('Error adding reaction:', error.message);
// //         res.status(500).json({ error: 'Internal Server Error' });
// //     }
// // });





// // // Fetch reactions for a message
// // app.get('/getReactions', async (req, res) => {
// //     const { messageId } = req.query;

// //     console.log('Fetching reactions for messageId:', messageId);

// //     try {
// //         const { data: reactions, error } = await supabase
// //             .from('reactions')
// //             .select('*')
// //             .eq('message_id', messageId);

// //         if (error) {
// //             console.error('Error fetching reactions:', error.message);
// //             throw error;
// //         }

// //         console.log('Reactions fetched:', reactions);
// //         res.json({ reactions });
// //     } catch (error) {
// //         console.error('Failed to fetch reactions:', error.message);
// //         res.status(500).json({ error: 'Failed to fetch reactions' });
// //     }
// // });




// // app.get('/api/getUserEmail', async (req, res) => {
// //     try {
// //         // Fetch user email logic
// //         const email = await getUserEmailFromDatabase(); // Replace with your actual logic
// //         if (email) {
// //             res.json({ email });
// //         } else {
// //             res.status(404).json({ message: 'User email not found' });
// //         }
// //     } catch (error) {
// //         console.error('Error fetching user email:', error);
// //         res.status(500).send('Server Error');
// //     }
// // });


// // // Get users who have messaged the logged-in user
// // app.get('/messagedUsers', async (req, res) => {
// //     const userId = req.query.userId;

// //     if (!userId) {
// //         return res.status(400).json({ error: 'User ID is required' });
// //     }

// //     try {
// //         const result = await pool.query(
// //             `SELECT DISTINCT u.id, u.username, u.email, u.lastMessageDate
// //             FROM users u
// //             JOIN messages m ON (u.id = m.from_user_id OR u.id = m.to_user_id)
// //             WHERE (m.from_user_id = $1 OR m.to_user_id = $1)
// //             AND u.id != $1
// //             ORDER BY m.timestamp DESC`,
// //             [userId]
// //         );

// //         res.json(result.rows);
// //     } catch (err) {
// //         console.error(userId, err);
// //         res.status(500).json({ error: userId });
// //     }
// // });



// // // Express example
// // app.put('/users/update', async (req, res) => {
// //     const { userId, newUsername } = req.body;

// //     if (!userId || !newUsername) {
// //         return res.status(400).json({ error: 'Missing userId or newUsername' });
// //     }

// //     try {
// //         // Update the user in the database
// //         await db.query('UPDATE users SET username = $1 WHERE id = $2', [newUsername, userId]);
// //         res.status(200).json({ message: 'Username updated successfully' });
// //     } catch (error) {
// //         console.error('Error updating username:', error);
// //         res.status(500).json({ error: 'Failed to update username' });
// //     }
// // });



// // // Start server
// // app.listen(3001, () => {
// //     console.log('Server running on http://localhost:3001');
// //     console.log(`Server is running on port ${PORT}`);
// // });

// // console.log('WebSocket server is running on ws://localhost:8080');


// const express = require('express');
// const http = require('http');
// const socketIo = require('socket.io');
// const cors = require('cors');
// const { createClient } = require('@supabase/supabase-js');
// const bcrypt = require('bcryptjs');
// const { PeerServer } = require('peer'); // Use only the required peer library

// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server);


// const supabase = createClient(
//     'https://baxtkicfvocgdlcimfvp.supabase.co',
//     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJheHRraWNmdm9jZ2RsY2ltZnZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE4NTE0NTksImV4cCI6MjAzNzQyNzQ1OX0.n1IuPPw-cMOCB_7S4bZbzy3736ouz8QLJWlhfodMTig' // Ensure this key is correct
// );

// app.use(cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"],
//     credentials: true
// }));


// app.use(express.json());
// app.use(express.static('public'));

// app.listen(3001, () => {
//     console.log('Server running on port 3001');
//   });

// // WebSocket setup if needed
// // const WebSocket = require('ws');
// // const wss = new WebSocket.Server({ port: 8080 });

// // Peer server setup
// const peerServer = PeerServer({ port: 9000, path: '/myapp' });


// // io.on('connection', (socket) => {
// //     console.log('A user connected');
// //     socket.on('disconnect', () => {
// //       console.log('User disconnected');
// //     });
// //   });
  
// // Socket.IO connection
// io.on('connection', (socket) => {
//     console.log('A user connected:', socket.id);

//     // Handle call offer
//     socket.on('offer', (data) => {
//         socket.to(data.to).emit('offer', data.offer);
//     });

//     // Handle call answer
//     socket.on('answer', (data) => {
//         socket.to(data.to).emit('answer', data.answer);
//     });

//      // Handle ICE candidates
//      socket.on('ice-candidate', (data) => {
//         socket.to(data.to).emit('ice-candidate', data.candidate);
//     });


//     socket.on('acceptCall', ({ to }) => {
//         io.to(to).emit('callAccepted', { from: socket.id });
//     });

//     socket.on('rejectCall', ({ to }) => {
//         io.to(to).emit('callRejected', { from: socket.id });
//     });


//     socket.on('joinRoom', (receiverId) => {
//         socket.join(receiverId);
//     });

//     socket.on('disconnect', () => {
//         console.log('User disconnected:', socket.id);
//     });

//     socket.on('message', async (message) => {
//         const { senderId, receiverId, text } = message;
//         const { data, error } = await supabase
//             .from('messages')
//             .insert([{ from_user_id: senderId, to_user_id: receiverId, content: text }]);

//         if (error) {
//             console.error('Error inserting message:', error.message);
//             return;
//         }

//         io.to(receiverId).emit('message', { id: data[0].id, senderId, text });
//     });

//     socket.on('disconnect', () => {
//         console.log('User disconnected:', socket.id);
//     });
// });


// // Basic route to check server status
// app.get('/', (req, res) => {
//     res.send('Server is running!');
// });

// // Routes
// app.post('/register', async (req, res) => {
//     const { email, password, username } = req.body;
//     console.log(`Received registration request: email=${email}, username=${username}`);

//     try {
//         // Check if the user already exists
//         const { data: existingUser, error: checkError } = await supabase
//             .from('users')
//             .select('*')
//             .or(`email.eq.${email},username.eq.${username}`);

//         if (checkError) {
//             console.error('Error checking existing user:', checkError);
//             throw checkError;
//         }

//         console.log('Existing user check result:', existingUser);

//         if (existingUser.length > 0) {
//             console.log('User already exists:', existingUser);
//             return res.status(400).json({ message: 'User already exists' });
//         }

//         // Hash the password
//         console.log('Hashing password');
//         const password_hash = await bcrypt.hash(password, 10);
//         console.log('Password hash:', password_hash);

//         // Insert the new user into the database
//         console.log('Inserting new user');
//         const { data, error } = await supabase
//             .from('users')
//             .insert([{ username, email, password_hash }]);

//         if (error) {
//             console.error('Error inserting user:', error);
//             throw error;
//         }

//         console.log('User registered successfully:', data);
//         res.json({ message: 'User registered successfully!' });
//     } catch (error) {
//         console.error('Register Error:', error.message, error); // Log error details
//         res.status(400).json({ message: error.message });
//     }
// });



// // User Login
// app.post('/login', async (req, res) => {
//     const { email, password } = req.body;
//     try {
//         const { data: users, error } = await supabase
//             .from('users')
//             .select('*')
//             .eq('email', email);

//         if (error) throw error;

//         if (users.length === 0) {
//             return res.status(400).json({ message: 'User not found' });
//         }

//         const user = users[0];
//         const passwordMatch = await bcrypt.compare(password, user.password_hash);

//         if (!passwordMatch) {
//             return res.status(400).json({ message: 'Invalid password' });
//         }

//         res.json({ message: 'Login successful!', user: { id: user.id, username: user.username, email: user.email } });
//     } catch (error) {
//         console.error('Login Error:', error.message); // Log error details
//         res.status(400).json({ message: error.message });
//     }
// });

// app.get('/users', async (req, res) => {
//     const searchTerm = req.query.search || '';
//     console.log('Search Term:', searchTerm); // Log the search term

//     try {
//         const { data: users, error } = await supabase
//             .from('users')
//             .select('*')
//             .ilike('username', `%${searchTerm}%`)
//             .not('username', 'eq', req.query.userId);

//         if (error) throw error;

//         res.json(users);
//     } catch (error) {
//         console.error('Users Error:', error.message); // Log error details
//         res.status(500).json({ message: 'Server error', error: error.message });
//     }
// });


// app.get('/usersWhoMessaged', async (req, res) => {
//     const userId = req.query.userId;
//     if (!userId) return res.status(400).json({ error: 'User ID is required' });

//     console.log(`Fetching messages for userId: ${userId}`);

//     try {
//         // Fetch messages where the logged-in user is the recipient
//         const { data: receivedMessages, error: receivedMessageError } = await supabase
//             .from('messages')
//             .select('from_user_id, content, created_at')
//             .eq('to_user_id', userId);

//         if (receivedMessageError) {
//             console.error('Error fetching received messages:', receivedMessageError.message);
//             return res.status(500).json({ error: 'Error fetching received messages' });
//         }

//         // Fetch messages where the logged-in user is the sender
//         const { data: sentMessages, error: sentMessageError } = await supabase
//             .from('messages')
//             .select('to_user_id, content, created_at')
//             .eq('from_user_id', userId);

//         if (sentMessageError) {
//             console.error('Error fetching sent messages:', sentMessageError.message);
//             return res.status(500).json({ error: 'Error fetching sent messages' });
//         }

//         console.log('Fetched received messages:', receivedMessages);
//         console.log('Fetched sent messages:', sentMessages);

//         // Combine the lists of messages and sort by timestamp
//         const allMessages = [
//             ...receivedMessages.map(msg => ({
//                 userId: msg.from_user_id,
//                 lastMessage: msg.content,
//                 lastMessageDate: msg.created_at
//             })),
//             ...sentMessages.map(msg => ({
//                 userId: msg.to_user_id,
//                 lastMessage: msg.content,
//                 lastMessageDate: msg.created_at
//             }))
//         ];

//         // Remove duplicates and keep the latest message timestamp and content for each user
//         const uniqueMessages = allMessages.reduce((acc, msg) => {
//             if (!acc[msg.userId] || new Date(msg.lastMessageDate) > new Date(acc[msg.userId].lastMessageDate)) {
//                 acc[msg.userId] = msg;
//             }
//             return acc;
//         }, {});

//         // Convert to array and sort by lastMessageDate descending
//         const sortedUserMessages = Object.values(uniqueMessages).sort((a, b) => new Date(b.lastMessageDate) - new Date(a.lastMessageDate));

//         // Extract unique user IDs from the sorted messages
//         const uniqueUserIds = sortedUserMessages.map(msg => msg.userId).filter(id => id !== userId); // Exclude the logged-in user

//         console.log('Unique user IDs to fetch:', uniqueUserIds);

//         // Fetch user details for each unique user ID
//         const { data: users, error: userError } = await supabase
//             .from('users')
//             .select('id, username, email') // Adjust fields as needed
//             .in('id', uniqueUserIds);

//         if (userError) {
//             console.error('Error fetching users:', userError.message);
//             return res.status(500).json({ error: 'Error fetching users' });
//         }

//         console.log('Fetched users:', users);

//         // Map the users with their last message content and date
//         const usersWithLastMessage = users.map(user => {
//             const userMessage = sortedUserMessages.find(msg => msg.userId === user.id);
//             return {
//                 ...user,
//                 lastMessage: userMessage ? userMessage.lastMessage : null,
//                 lastMessageDate: userMessage ? userMessage.lastMessageDate : null
//             };
//         });

//         // Sort users by lastMessageDate descending
//         const sortedUsers = usersWithLastMessage.sort((a, b) => new Date(b.lastMessageDate) - new Date(a.lastMessageDate));

//         res.json(sortedUsers);
//     } catch (error) {
//         console.error('Error fetching data:', error.message);
//         res.status(500).json({ error: 'Error fetching data' });
//     }
// });


// app.get('/getMessages', async (req, res) => {
//     const { fromUserId, toUserId } = req.query; // Get IDs from query parameters

//     if (!fromUserId || !toUserId) {
//         return res.status(400).json({ error: 'fromUserId and toUserId are required' });
//     }

//     console.log(`Fetching messages for: fromUserId=${fromUserId}, toUserId=${toUserId}`);

//     try {
//         // Fetch messages where the current user is sender and other user is receiver
//         const { data: messagesFromUser, error: errorFromUser } = await supabase
//             .from('messages')
//             .select('*')
//             .eq('from_user_id', fromUserId)
//             .eq('to_user_id', toUserId)
//             .order('created_at', { ascending: true });

//         if (errorFromUser) {
//             console.error('Error fetching messages from user:', errorFromUser.message);
//             return res.status(500).json({ error: 'Error fetching messages from user' });
//         }

//         // Fetch messages where the current user is receiver and other user is sender
//         const { data: messagesToUser, error: errorToUser } = await supabase
//             .from('messages')
//             .select('*')
//             .eq('from_user_id', toUserId)
//             .eq('to_user_id', fromUserId)
//             .order('created_at', { ascending: true });

//         if (errorToUser) {
//             console.error('Error fetching messages to user:', errorToUser.message);
//             return res.status(500).json({ error: 'Error fetching messages to user' });
//         }

//         // Combine the results
//         const allMessages = [...messagesFromUser, ...messagesToUser];

//         // Return combined messages
//         res.json({ messages: allMessages });
//     } catch (error) {
//         console.error('Error:', error.message);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });


// app.post('/sendMessage', async (req, res) => {
//     const { senderId, receiverId, text } = req.body;

//     console.log('Received sender ID:', senderId);
//     console.log('Received receiver ID:', receiverId);

//     try {
//         // Validate sender and receiver IDs
//         if (!senderId || !receiverId) {
//             throw new Error('Sender ID or receiver ID is missing');
//         }

//         // Insert the message into Supabase
//         const { data, error } = await supabase
//             .from('messages')
//             .insert([{ from_user_id: senderId, to_user_id: receiverId, content: text }]);

//         if (error) {
//             console.error('Supabase Insert Error:', error.message);
//             throw error;
//         }

//         // Check if data is valid and has the expected structure
//         if (!data || !Array.isArray(data) || data.length === 0) {
//             throw new Error('No data returned from Supabase insert');
//         }

//         console.log('Inserted message data:', data);
//         res.json(data[0]);
//     } catch (error) {
//         console.error('SendMessage Error:', error.message);
//         res.status(400).json({ message: error.message });
//     }
// });


// app.post('/deleteMessage', async (req, res) => {
//     const { messageId } = req.body;

//     console.log('Received request to delete message:', messageId);

//     try {
//         // Fetch the message from Supabase
//         const { data: message, error: fetchError } = await supabase
//             .from('messages')
//             .select('*')
//             .eq('id', messageId)
//             .single();

//         if (fetchError || !message) {
//             console.log('Message not found:', messageId);
//             return res.status(404).json({ message: 'Message not found' });
//         }

//         const currentTime = new Date();
//         const messageTime = new Date(message.created_at);
//         const diffMinutes = (currentTime - messageTime) / (1000 * 60);

//         if (diffMinutes > 2) {
//             console.log('Message is too old to delete:', messageId);
//             return res.status(403).json({ message: 'Message is too old to delete' });
//         }

//         // Log before deleting
//         console.log('Attempting to delete message:', messageId);

//         // Delete the message
//         const { error: deleteError } = await supabase
//             .from('messages')
//             .delete()
//             .eq('id', messageId);

//         if (deleteError) {
//             console.error('Error deleting message:', deleteError.message);
//             return res.status(500).json({ message: 'Error deleting message' });
//         }

//         // Log after successful deletion
//         console.log('Message deleted successfully:', messageId);
        
//         io.emit('messageDeleted', messageId); // Notify clients
//         res.status(200).json({ message: 'Message deleted successfully' });
//     } catch (error) {
//         console.error('Server error:', error);
//         res.status(500).json({ message: 'Server error', error });
//     }
// });


// app.post('/addReaction', async (req, res) => {
//     const { messageId, userId, reactionType } = req.body;

//     console.log('Adding reaction:', { messageId, userId, reactionType });

//     // Validate inputs
//     if (!messageId || !userId || !reactionType) {
//         return res.status(400).json({ error: 'Missing required fields' });
//     }

//     try {
//         // Update the reaction in the messages table
//         const { data, error: updateError } = await supabase
//             .from('messages')
//             .update({ reaction: reactionType })
//             .eq('id', messageId);

//         if (updateError) {
//             console.error('Error updating reaction:', updateError.message);
//             throw updateError;
//         }

//         console.log('Reaction added or updated successfully:', data);
//         return res.status(200).json({ success: true, message: 'Reaction added or updated successfully' });
//     } catch (error) {
//         console.error('Error adding reaction:', error.message);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });


// app.get('/api/getUserEmail', async (req, res) => {
//     try {
//         // Fetch user email logic
//         const email = await getUserEmailFromDatabase(); // Replace with your actual logic
//         if (email) {
//             res.json({ email });
//         } else {
//             res.status(404).json({ message: 'User email not found' });
//         }
//     } catch (error) {
//         console.error('Error fetching user email:', error);
//         res.status(500).send('Server Error');
//     }
// });

// //Get users who have messaged the logged-in user
// app.get('/messagedUsers', async (req, res) => {
//     const userId = req.query.userId;

//     if (!userId) {
//         return res.status(400).json({ error: 'User ID is required' });
//     }

//     try {
//         const result = await pool.query(
//             `SELECT DISTINCT u.id, u.username, u.email, u.lastMessageDate
//             FROM users u
//             JOIN messages m ON (u.id = m.from_user_id OR u.id = m.to_user_id)
//             WHERE (m.from_user_id = $1 OR m.to_user_id = $1)
//             AND u.id != $1
//             ORDER BY m.timestamp DESC`,
//             [userId]
//         );

//         res.json(result.rows);
//     } catch (err) {
//         console.error(userId, err);
//         res.status(500).json({ error: userId });
//     }
// });

// // Additional routes...

// io.on('connection', (socket) => {
//     console.log('A user connected:', socket.id);

//     socket.on('joinRoom', (receiverId) => {
//         socket.join(receiverId);
//     });

//     socket.on('message', async (message) => {
//         console.log('Message received:', message);
//         const { senderId, receiverId, text } = message;

//         // Save message to Supabase
//         const { data, error } = await supabase
//             .from('messages')
//             .insert([{ sender_id: senderId, receiver_id: receiverId, text }]);

//         if (error) {
//             console.error('Error inserting message:', error.message);
//             return;
//         }

//         // Emit message to the receiver
//         io.to(receiverId).emit('message', { id: data[0].id, senderId, text });
//     });

//     socket.on('messageDeleted', async (messageId) => {
//         console.log('Message deleted:', messageId);

//         // Delete message from Supabase
//         const { error } = await supabase
//             .from('messages')
//             .delete()
//             .eq('id', messageId);

//         if (error) {
//             console.error('Error deleting message:', error.message);
//             return;
//         }

//         // Notify clients
//         io.emit('messageDeleted', messageId);
//     });

//     socket.on('disconnect', () => {
//         console.log('User disconnected:', socket.id);
//     });
// });

// const PORT = process.env.PORT || 3000;
// server.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });




const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
const bcrypt = require('bcryptjs');
const { PeerServer } = require('peer'); 

const app = express();
const server = http.createServer(app);
// const io = socketIo(server);
const supabase = createClient(
    'https://baxtkicfvocgdlcimfvp.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJheHRraWNmdm9jZ2RsY2ltZnZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE4NTE0NTksImV4cCI6MjAzNzQyNzQ1OX0.n1IuPPw-cMOCB_7S4bZbzy3736ouz8QLJWlhfodMTig' // Use environment variables for sensitive data
);


// const allowedOrigins = ["http://localhost:3002", "http://localhost:3001"];

// const socketIo = require('socket.io');

app.use(cors({
    origin: "http://localhost:3000", // Update this to match your frontend origin
    methods: ["GET", "POST"],
    credentials: true
}));

const io = socketIo(server, {
    cors: {
        origin: "http://localhost:3000", // Update this to match your frontend origin
        methods: ["GET", "POST"],
        credentials: true
    }
});



app.use(express.json());
// app.use(express.static('public'));

// WebSocket setup if needed
// const WebSocket = require('ws');
// const wss = new WebSocket.Server({ port: 8080 });

// Peer server setup
const peerServer = PeerServer({ port: 9000, path: '/myapp' });

// Socket.IO connection
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('acceptCall', ({ to }) => {
        io.to(to).emit('callAccepted', { from: socket.id });
    });

    socket.on('rejectCall', ({ to }) => {
        io.to(to).emit('callRejected', { from: socket.id });
    });

    socket.on('offer', (data) => {
        socket.to(data.to).emit('offer', data.offer);
    });

    socket.on('answer', (data) => {
        socket.to(data.to).emit('answer', data.answer);
    });

    socket.on('ice-candidate', (data) => {
        socket.to(data.to).emit('ice-candidate', data.candidate);
    });

    socket.on('joinRoom', (receiverId) => {
        socket.join(receiverId);
    });

    socket.on('message', async (message) => {
        const { senderId, receiverId, text } = message;
        const { data, error } = await supabase
            .from('messages')
            .insert([{ from_user_id: senderId, to_user_id: receiverId, content: text }]);

        if (error) {
            console.error('Error inserting message:', error.message);
            return;
        }

        io.to(receiverId).emit('message', { id: data[0].id, senderId, text });
    });

});


// Basic route to check server status
app.get('/', (req, res) => {
    res.send('Server is running!');
});

// Routes
app.post('/register', async (req, res) => {
    const { email, password, username } = req.body;
    console.log(`Received registration request: email=${email}, username=${username}`);

    try {
        // Check if the user already exists
        const { data: existingUser, error: checkError } = await supabase
            .from('users')
            .select('*')
            .or(`email.eq.${email},username.eq.${username}`);

        if (checkError) {
            console.error('Error checking existing user:', checkError);
            throw checkError;
        }

        console.log('Existing user check result:', existingUser);

        if (existingUser.length > 0) {
            console.log('User already exists:', existingUser);
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        console.log('Hashing password');
        const password_hash = await bcrypt.hash(password, 10);
        console.log('Password hash:', password_hash);

        // Insert the new user into the database
        console.log('Inserting new user');
        const { data, error } = await supabase
            .from('users')
            .insert([{ username, email, password_hash }]);

        if (error) {
            console.error('Error inserting user:', error);
            throw error;
        }

        console.log('User registered successfully:', data);
        res.json({ message: 'User registered successfully!' });
    } catch (error) {
        console.error('Register Error:', error.message, error); // Log error details
        res.status(400).json({ message: error.message });
    }
});



// User Login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const { data: users, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', email);

        if (error) throw error;

        if (users.length === 0) {
            return res.status(400).json({ message: 'User not found' });
        }

        const user = users[0];
        const passwordMatch = await bcrypt.compare(password, user.password_hash);

        if (!passwordMatch) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        res.json({ message: 'Login successful!', user: { id: user.id, username: user.username, email: user.email } });
    } catch (error) {
        console.error('Login Error:', error.message); // Log error details
        res.status(400).json({ message: error.message });
    }
});

app.get('/users', async (req, res) => {
    const searchTerm = req.query.search || '';
    console.log('Search Term:', searchTerm); // Log the search term

    try {
        const { data: users, error } = await supabase
            .from('users')
            .select('*')
            .ilike('username', `%${searchTerm}%`)
            .not('username', 'eq', req.query.userId);

        if (error) throw error;

        res.json(users);
    } catch (error) {
        console.error('Users Error:', error.message); // Log error details
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});


app.get('/usersWhoMessaged', async (req, res) => {
    const userId = req.query.userId;
    if (!userId) return res.status(400).json({ error: 'User ID is required' });

    console.log(`Fetching messages for userId: ${userId}`);

    try {
        // Fetch messages where the logged-in user is the recipient
        const { data: receivedMessages, error: receivedMessageError } = await supabase
            .from('messages')
            .select('from_user_id, content, created_at')
            .eq('to_user_id', userId);

        if (receivedMessageError) {
            console.error('Error fetching received messages:', receivedMessageError.message);
            return res.status(500).json({ error: 'Error fetching received messages' });
        }

        // Fetch messages where the logged-in user is the sender
        const { data: sentMessages, error: sentMessageError } = await supabase
            .from('messages')
            .select('to_user_id, content, created_at')
            .eq('from_user_id', userId);

        if (sentMessageError) {
            console.error('Error fetching sent messages:', sentMessageError.message);
            return res.status(500).json({ error: 'Error fetching sent messages' });
        }

        console.log('Fetched received messages:', receivedMessages);
        console.log('Fetched sent messages:', sentMessages);

        // Combine the lists of messages and sort by timestamp
        const allMessages = [
            ...receivedMessages.map(msg => ({
                userId: msg.from_user_id,
                lastMessage: msg.content,
                lastMessageDate: msg.created_at
            })),
            ...sentMessages.map(msg => ({
                userId: msg.to_user_id,
                lastMessage: msg.content,
                lastMessageDate: msg.created_at
            }))
        ];

        // Remove duplicates and keep the latest message timestamp and content for each user
        const uniqueMessages = allMessages.reduce((acc, msg) => {
            if (!acc[msg.userId] || new Date(msg.lastMessageDate) > new Date(acc[msg.userId].lastMessageDate)) {
                acc[msg.userId] = msg;
            }
            return acc;
        }, {});

        // Convert to array and sort by lastMessageDate descending
        const sortedUserMessages = Object.values(uniqueMessages).sort((a, b) => new Date(b.lastMessageDate) - new Date(a.lastMessageDate));

        // Extract unique user IDs from the sorted messages
        const uniqueUserIds = sortedUserMessages.map(msg => msg.userId).filter(id => id !== userId); // Exclude the logged-in user

        console.log('Unique user IDs to fetch:', uniqueUserIds);

        // Fetch user details for each unique user ID
        const { data: users, error: userError } = await supabase
            .from('users')
            .select('id, username, email') // Adjust fields as needed
            .in('id', uniqueUserIds);

        if (userError) {
            console.error('Error fetching users:', userError.message);
            return res.status(500).json({ error: 'Error fetching users' });
        }

        console.log('Fetched users:', users);

        // Map the users with their last message content and date
        const usersWithLastMessage = users.map(user => {
            const userMessage = sortedUserMessages.find(msg => msg.userId === user.id);
            return {
                ...user,
                lastMessage: userMessage ? userMessage.lastMessage : null,
                lastMessageDate: userMessage ? userMessage.lastMessageDate : null
            };
        });

        // Sort users by lastMessageDate descending
        const sortedUsers = usersWithLastMessage.sort((a, b) => new Date(b.lastMessageDate) - new Date(a.lastMessageDate));

        res.json(sortedUsers);
    } catch (error) {
        console.error('Error fetching data:', error.message);
        res.status(500).json({ error: 'Error fetching data' });
    }
});


app.get('/getMessages', async (req, res) => {
    const { fromUserId, toUserId } = req.query; // Get IDs from query parameters

    if (!fromUserId || !toUserId) {
        return res.status(400).json({ error: 'fromUserId and toUserId are required' });
    }

    console.log(`Fetching messages for: fromUserId=${fromUserId}, toUserId=${toUserId}`);

    try {
        // Fetch messages where the current user is sender and other user is receiver
        const { data: messagesFromUser, error: errorFromUser } = await supabase
            .from('messages')
            .select('*')
            .eq('from_user_id', fromUserId)
            .eq('to_user_id', toUserId)
            .order('created_at', { ascending: true });

        if (errorFromUser) {
            console.error('Error fetching messages from user:', errorFromUser.message);
            return res.status(500).json({ error: 'Error fetching messages from user' });
        }

        // Fetch messages where the current user is receiver and other user is sender
        const { data: messagesToUser, error: errorToUser } = await supabase
            .from('messages')
            .select('*')
            .eq('from_user_id', toUserId)
            .eq('to_user_id', fromUserId)
            .order('created_at', { ascending: true });

        if (errorToUser) {
            console.error('Error fetching messages to user:', errorToUser.message);
            return res.status(500).json({ error: 'Error fetching messages to user' });
        }

        // Combine the results
        const allMessages = [...messagesFromUser, ...messagesToUser];

        // Return combined messages
        res.json({ messages: allMessages });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.post('/sendMessage', async (req, res) => {
    const { senderId, receiverId, text } = req.body;

    console.log('Received sender ID:', senderId);
    console.log('Received receiver ID:', receiverId);

    try {
        // Validate sender and receiver IDs
        if (!senderId || !receiverId) {
            throw new Error('Sender ID or receiver ID is missing');
        }

        // Insert the message into Supabase
        const { data, error } = await supabase
            .from('messages')
            .insert([{ from_user_id: senderId, to_user_id: receiverId, content: text }]);

        if (error) {
            console.error('Supabase Insert Error:', error.message);
            throw error;
        }

        // Check if data is valid and has the expected structure
        if (!data || !Array.isArray(data) || data.length === 0) {
            throw new Error('No data returned from Supabase insert');
        }

        console.log('Inserted message data:', data);
        res.json(data[0]);
    } catch (error) {
        console.error('SendMessage Error:', error.message);
        res.status(400).json({ message: error.message });
    }
});


app.post('/deleteMessage', async (req, res) => {
    const { messageId } = req.body;

    console.log('Received request to delete message:', messageId);

    try {
        // Fetch the message from Supabase
        const { data: message, error: fetchError } = await supabase
            .from('messages')
            .select('*')
            .eq('id', messageId)
            .single();

        if (fetchError || !message) {
            console.log('Message not found:', messageId);
            return res.status(404).json({ message: 'Message not found' });
        }

        const currentTime = new Date();
        const messageTime = new Date(message.created_at);
        const diffMinutes = (currentTime - messageTime) / (1000 * 60);

        if (diffMinutes > 2) {
            console.log('Message is too old to delete:', messageId);
            return res.status(403).json({ message: 'Message is too old to delete' });
        }

        // Log before deleting
        console.log('Attempting to delete message:', messageId);

        // Delete the message
        const { error: deleteError } = await supabase
            .from('messages')
            .delete()
            .eq('id', messageId);

        if (deleteError) {
            console.error('Error deleting message:', deleteError.message);
            return res.status(500).json({ message: 'Error deleting message' });
        }

        // Log after successful deletion
        console.log('Message deleted successfully:', messageId);
        
        io.emit('messageDeleted', messageId); // Notify clients
        res.status(200).json({ message: 'Message deleted successfully' });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ message: 'Server error', error });
    }
});


app.post('/addReaction', async (req, res) => {
    const { messageId, userId, reactionType } = req.body;

    console.log('Adding reaction:', { messageId, userId, reactionType });

    // Validate inputs
    if (!messageId || !userId || !reactionType) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        // Update the reaction in the messages table
        const { data, error: updateError } = await supabase
            .from('messages')
            .update({ reaction: reactionType })
            .eq('id', messageId);

        if (updateError) {
            console.error('Error updating reaction:', updateError.message);
            throw updateError;
        }

        console.log('Reaction added or updated successfully:', data);
        return res.status(200).json({ success: true, message: 'Reaction added or updated successfully' });
    } catch (error) {
        console.error('Error adding reaction:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.get('/api/getUserEmail', async (req, res) => {
    try {
        // Fetch user email logic
        const email = await getUserEmailFromDatabase(); // Replace with your actual logic
        if (email) {
            res.json({ email });
        } else {
            res.status(404).json({ message: 'User email not found' });
        }
    } catch (error) {
        console.error('Error fetching user email:', error);
        res.status(500).send('Server Error');
    }
});

// Get users who have messaged the logged-in user
app.get('/messagedUsers', async (req, res) => {
    const userId = req.query.userId;

    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    try {
        const result = await pool.query(
            `SELECT DISTINCT u.id, u.username, u.email, u.lastMessageDate
            FROM users u
            JOIN messages m ON (u.id = m.from_user_id OR u.id = m.to_user_id)
            WHERE (m.from_user_id = $1 OR m.to_user_id = $1)
            AND u.id != $1
            ORDER BY m.timestamp DESC`,
            [userId]
        );

        res.json(result.rows);
    } catch (err) {
        console.error(userId, err);
        res.status(500).json({ error: userId });
    }
});

// Additional routes...

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('joinRoom', (receiverId) => {
        socket.join(receiverId);
    });

    socket.on('message', async (message) => {
        console.log('Message received:', message);
        const { senderId, receiverId, text } = message;

        // Save message to Supabase
        const { data, error } = await supabase
            .from('messages')
            .insert([{ sender_id: senderId, receiver_id: receiverId, text }]);

        if (error) {
            console.error('Error inserting message:', error.message);
            return;
        }

        // Emit message to the receiver
        io.to(receiverId).emit('message', { id: data[0].id, senderId, text });
    });

    socket.on('messageDeleted', async (messageId) => {
        console.log('Message deleted:', messageId);

        // Delete message from Supabase
        const { error } = await supabase
            .from('messages')
            .delete()
            .eq('id', messageId);

        if (error) {
            console.error('Error deleting message:', error.message);
            return;
        }

        // Notify clients
        io.emit('messageDeleted', messageId);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});