# 📖 Storybooks

A full-stack web application that allows users to create and manage **public and private stories**. Built with **Node.js**, **Express**, **MongoDB**, and **Passport.js** for authentication via **Google OAuth**. Templating is done using **Handlebars (HBS)**.

## 🚀 Features

- 🔐 Google OAuth authentication using Passport.js
- 📖 Create, view, update, and delete stories
- 🔒 Control story visibility (public/private)
- 🧰 MVC architecture with clean, modular code
- 🗓️ Friendly date formatting with Moment.js
- ✨ Custom Handlebars helpers for UI logic
- 📦 Session storage using MongoDB via `connect-mongo`
- 🔧 Environment-based config with dotenv

## 🛠️ Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB + Mongoose**
- **Passport.js (Google OAuth)**
- **Express-session**
- **Connect-mongo**
- **dotenv**
- **Handlebars (via express-handlebars)**
- **Morgan (request logging)**
- **Method-override**
- **Body-parser**
- **Moment.js**
- **Custom Handlebars Helpers**

## 📁 Project Structure

📁 config # Passport config and DB setup 📁 models # Mongoose models 📁 routes # Express routes for index, auth, stories 📁 views # Handlebars templates 📁 public # Static assets (CSS, images) 📄 app.js # Main application file 📄 helpers/hbs.js# Custom Handlebars helper functions




## 📦 Installation & Setup

1. **Clone the repository**
```bash
git clone git@github.com:yourusername/storybooks.git
cd storybooks

2...Install dependencies

npm install


3...Create a .env file in the root
PORT=3000
NODE_ENV=development
MONGO_URI=
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
SESSION_SECRET=

4.Run the development server
npm run dev
or use nodemon at once.

🔒 Authentication
Authentication is handled using Passport.js and Google OAuth 2.0 strategy. User sessions are persisted via MongoDB using connect-mongo.

📝 License
MIT © Sarab

