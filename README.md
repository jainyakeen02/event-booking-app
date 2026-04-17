# 🎟️ Event Booking App (MERN Stack)

A full-stack Event Booking Application where users can explore events, book tickets, and manage their profiles efficiently.

---

## 🚀 Features

* 🔐 User Authentication (Login/Register with JWT)
* 👤 User Profile Management
* 🎉 Add / View Events
* 🎫 Event Booking System
* 🖼️ Upload Profile Photo
* 🌐 Responsive UI

---

## 🛠️ Tech Stack

### Frontend:

* React.js
* Vite
* Axios
* CSS / Tailwind

### Backend:

* Node.js
* Express.js
* MongoDB
* JWT Authentication
* Multer (for file uploads)

---

## 📂 Folder Structure

```
project-root/
│
├── backend/
│   ├── config/          # Database & app configuration
│   ├── controllers/     # Business logic
│   ├── middleware/      # Authentication middleware
│   ├── models/          # Database schemas
│   ├── routes/          # API routes
│   ├── uploads/         # Uploaded images/files
│   ├── .env             # Environment variables
│   ├── server.js        # Main server file
│   ├── package.json
│
├── frontend/
│   ├── public/          # Static files
│   ├── src/             # React source code
│   ├── index.html
│   ├── package.json
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/event-booking-app.git
cd event-booking-app
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create `.env` file in backend folder:

```
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

Run backend:

```bash
npm run dev
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🔐 Authentication Flow

* User registers and logs in
* JWT token is generated
* Token is used to access protected routes
* Logged-in users can:

  * Book events
  * Add events

---

## 📌 Future Improvements

* 💳 Payment Integration
* 📅 Event Calendar
* 🔔 Notifications
* ⭐ Reviews & Ratings

---

