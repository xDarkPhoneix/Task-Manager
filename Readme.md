# 📝 Task Manager App

A full-stack task management app built with React, Node.js, Express, and MongoDB.

## 🚀 Features

- User authentication (login/register)
- Create, edit, and delete tasks
- Track task status (Pending, In Progress, Completed)
- Responsive UI using TailwindCSS
- State management with Redux Toolkit

## LiveLInk

https://task-manager-sagg.onrender.com



## 🔧 Tech Stack

- Frontend: React, Vite, TailwindCSS, ShadCN UI
- Backend: Node.js, Express.js, MongoDB
- Auth: JWT, Cookies
- State: Redux Toolkit

## 📦 Installation

```bash
# Clone the repo
git clone https://github.com/xDarkPhoneix/Task-Manager
cd frontend
cd ..

# Install dependencies
npm install # (in Root directory also)

# Start frontend and backend
npm run dev

#Changing Of Url in frontend 
In authService and taskService change API_END_POINT to localhost
#Changing Of Url in backend
 change API_BASE_URL in .env


#setup .env
#Add Your Own database Uri and other keys
PORT=8000
MONGODB_URI="mongodb+srv://rajsaurav589:saurav589@cluster0.bb0mmwn.mongodb.net"
CLOUDINARY_CLOUD_NAME=dlwmylfh0
CLOUDINARY_API_KEY=622873594415476
CLOUDINARY_API_SECRET=GJ9XkVC6oLWfTRg9xozTRs45DfM
ACCESS_TOKEN_SECRET=chai-aur-code
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=chai-aur-backend
REFRESH_TOKEN_EXPIRY=10d
NODE_ENV="production"
API_BASE_URL="https://eventmanagement-urhj.onrender.com" 
