# Chat Application

A real-time chat application built using Node.js for the backend, React.js for the frontend, and TailwindCSS for styling. The application supports real-time messaging, voice and video calling, message reactions, and more.

## Features

- **Real-time Messaging:** Exchange messages instantly.
- **Voice and Video Calling:** Make voice and video calls.
- **Message Reactions:** React to messages.
- **Message Deletion:** Delete messages within 2 minutes.
- **User Authentication:** Sign in with email/password.

## Screenshots:

1. **Login Screen:** 
   ![Login Screen](chat-app-frontend/src/assets/loginchat.jpg)
   
2. **SignUp Screen:** 
   ![SignUp Screen](chat-app-frontend/src/assets/registerchat.jpg)

3. **Home Screen:** 
   ![Home Screen](chat-app-frontend/src/assets/homechat.jpg)

5. **Chat Screen:** 
   ![Chat Screen](chat-app-frontend/src/assets/chatpagechat.jpg)

6. **Video Call Screen:** 
   ![Video Call Screen](chat-app-frontend/src/assets/VideoCall.jpg)



Here are some videos showcasing the application:
- **Home Page Overview:** [Watch Video](https://github.com/sreyas-sc/JSChatAPP/chat-app-frontend/src/assets/chatappjs.mp4)




## Installation

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Supabase](https://supabase.com/) (for database and authentication)

### Clone the Repository

First, clone the repository:

```bash
Git Clone https://github.com/sreyas-sc/JSChatApp.git
cd BellaCode

cd chat-app-backend
npm install


cd ../chat-app-frontend
npm install

```

### Run the app

```bash
cd BellaCode/chat-app-backend
node server.js

cd BellaCode/chat-app-frontend
npm start
```

## Database Schema(SUPABASE):

(Change the database URL, KEY)

**users Table**

```bash
create table
  public.users (
    id uuid not null default extensions.uuid_generate_v4 (),
    username character varying(255) not null,
    email character varying(255) not null,
    password_hash text not null,
    created_at timestamp with time zone null default now(),
    updated_at timestamp with time zone null default now(),
    constraint users_pkey primary key (id),
    constraint unique_email unique (email),
    constraint users_username_key unique (username)
  ) tablespace pg_default;
```

**messages Table:**

```bash
create table
  public.messages (
    id uuid not null default extensions.uuid_generate_v4 (),
    content text not null,
    created_at timestamp with time zone null default now(),
    updated_at timestamp with time zone null default now(),
    from_user_id uuid null,
    to_user_id uuid null,
    reaction character varying null,
    constraint messages_pkey primary key (id),
    constraint fk_from_user foreign key (from_user_id) references users (id) on delete set null,
    constraint fk_to_user foreign key (to_user_id) references users (id) on delete set null
  ) tablespace pg_default;
```
