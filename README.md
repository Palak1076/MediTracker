# MediTracker

MediTracker is a **full-stack health management application** designed to help users track their medications, manage health routines, and receive intelligent reminders. It combines **Google & JWT authentication, AI assistance, notifications, rewards, and analytics** to improve medication adherence and overall health management.

---

## 🌟 Features

- **Authentication**
  - Google OAuth login  
  - JWT-based secure authentication  
  - **Forget password via OTP sent to email**  
  - Password reset functionality  

- **Medication Management**
  - Add, edit, delete, and view medication history  
  - Set reminders for doses  
  - Track adherence over time  

- **AI Assistant**
  - Chatbot powered by AI to answer health and medication queries  
  - Provides personalized health tips and recommendations  

- **Notifications**
  - Email notifications for upcoming or missed doses  
  - Reward notifications for consistent adherence  

- **Reward System**
  - Earn points or rewards for taking medications on time  

- **Analytics**
  - Visual dashboards showing medication adherence trends  
  - Insights to optimize health routines  

- **Responsive Frontend**
  - Works seamlessly on mobile and desktop devices  
  - Built with React and Tailwind CSS  

---

## 🛠️ Tech Stack

- **Frontend:** React, Tailwind CSS, Vite  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **Authentication:** Google OAuth & JWT  
- **Notifications:** Email & Push notifications  
- **AI Assistant:** Custom AI-powered chatbot  
- **Analytics:** Custom dashboards  


## 📁 Folder Structure

Meditracker/
Meditracker/
├── backend/
│ ├── src/
│ │ ├── config/
│ │ │ ├── database.js
│ │ │ ├── firebase.js
│ │ │ └── firebaseAdmin.js
│ │ ├── controllers/
│ │ │ ├── aiController.js
│ │ │ ├── analyticsController.js
│ │ │ ├── authController.js
│ │ │ ├── healthController.js
│ │ │ ├── medicationController.js
│ │ │ ├── notificationController.js
│ │ │ ├── reminderController.js
│ │ │ ├── rewardController.js
│ │ │ └── scheduleController.js
│ │ ├── middleware/
│ │ │ ├── auth.js
│ │ │ ├── errorHandler.js
│ │ │ └── validation.js
│ │ ├── models/
│ │ │ ├── Dose.js
│ │ │ ├── HealthEntry.js
│ │ │ ├── Medication.js
│ │ │ ├── Reminder.js
│ │ │ ├── Reward.js
│ │ │ ├── SideEffect.js
│ │ │ └── User.js
│ │ ├── routes/
│ │ │ ├── ai.js
│ │ │ ├── analyticsRoutes.js
│ │ │ ├── auth.js
│ │ │ ├── changePasswordRoute.js
│ │ │ ├── dashboard.js
│ │ │ ├── doses.js
│ │ │ ├── emailTest.js
│ │ │ ├── health.js
│ │ │ ├── medication.js
│ │ │ ├── notificationRoutes.js
│ │ │ ├── reminders.js
│ │ │ ├── reward.js
│ │ │ ├── scheduleRoutes.js
│ │ │ └── userRoutes.js
│ │ ├── services/
│ │ │ ├── ai/
│ │ │ │ ├── ChatbotService.js
│ │ │ │ └── PredictionService.js
│ │ │ ├── notification/
│ │ │ │ ├── DoseNotificationManager.js
│ │ │ │ ├── EmailService.js
│ │ │ │ ├── PushNotification.js
│ │ │ │ └── reward-notification.service.js
│ │ │ ├── reward/
│ │ │ │ ├── index.js
│ │ │ │ └── reward.service.js
│ │ │ ├── scheduler/
│ │ │ │ ├── MissedDoseDetector.js
│ │ │ │ ├── ReminderScheduler.js
│ │ │ │ └── cronJobs.js
│ │ │ ├── websocket/
│ │ │ │ └── socketService.js
│ │ │ ├── analyticsService.js
│ │ │ ├── notificationService.js
│ │ │ └── aiService.js
│ │ └── server.js
│ ├── package.json
│ └── package-lock.json
├── frontend/
│ ├── public/
│ │ ├── favicon.ico
│ │ ├── firebase-messaging-sw.js
│ │ ├── logo192.png
│ │ ├── logo512.png
│ │ └── vite.svg
│ ├── src/
│ │ ├── api/
│ │ ├── components/
│ │ ├── context/
│ │ ├── hooks/
│ │ ├── pages/
│ │ ├── services/
│ │ ├── styles/
│ │ ├── utils/
│ │ ├── App.css
│ │ ├── App.jsx
│ │ ├── index.css
│ │ ├── index.js
│ │ ├── main.jsx
│ │ └── firebase.js
│ ├── package.json
│ └── package-lock.json
---


## 🚀 Getting Started

### Prerequisites
- Node.js >= 18.x
- npm or yarn
- MongoDB

### Backend Setup

cd backend
npm install
cp .env.example .env    # Add your environment variables
npm run dev

### Frontend Setup

cd frontend
npm install
cp .env.example .env    # Add Firebase & API keys
npm run dev

### Environment Variables
## Backend.env

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
OPENAI_API_KEY=your_openai_api_key
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

## Frontend.env

VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id



