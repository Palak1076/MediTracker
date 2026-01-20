import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { AuthProvider } from './context/AuthContext';
import { MedicationProvider } from './context/MedicationContext';
import ScrollToTop from './components/common/ScrollToTop';
import PrivateRoute from './components/common/PrivateRoute';
import { Toaster } from 'react-hot-toast';

import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import Footer from './components/layout/Footer';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Medications from './pages/Medications';
import AddMedication from './pages/AddMedication';
import EditMedication from './pages/EditMedication';
import ChatbotPage from './pages/Chatbot';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Schedule from './pages/Schedule';
import AnalyticsDashboard from './pages/AnalyticsDashboard';
import ChangePassword from './pages/ChangePassword';

import { requestNotificationPermission } from "./utils/notification";
import './App.css';
import Support from './pages/Support';
import ProtectedRoute from "./components/ProtectedRoute";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
const Layout = ({ children, darkMode, setDarkMode }) => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  // Notification permission
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !isAuthPage) {
      requestNotificationPermission();
    }
  }, [location.pathname]);

  if (isAuthPage) return <div className="min-h-screen">{children}</div>;

  return (
  <div className="min-h-screen flex flex-col">
    <Navbar />

    <div className="flex flex-1">
      <Sidebar />

      <main
        className={`
          flex-1 p-6 pt-16
          bg-gray-50 text-gray-900
          dark:bg-gray-900 dark:text-gray-100
        `}
      >
        {children}
      </main>
    </div>

    <Footer />
  </div>
);}




function App() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('darkMode') === 'true'
  );

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  // return (
    
  //   <LocalizationProvider dateAdapter={AdapterDayjs}>
  //      <ScrollToTop />
  //     <AuthProvider>
  //       <MedicationProvider>
  //         <Layout darkMode={darkMode} setDarkMode={setDarkMode}>
  //           <Routes>
  //             <Route path="/login" element={<Login />} />
  //             <Route path="/register" element={<Register />} />
  //             <Route path="/forgot-password" element={<ForgotPassword />} />
  //             <Route path="/reset-password" element={<ResetPassword />} />

  //             <Route element={<ProtectedRoute />}>
  //               <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
  //               <Route path="/analytics" element={<PrivateRoute><AnalyticsDashboard /></PrivateRoute>} />
  //               <Route path="/medications" element={<PrivateRoute><Medications /></PrivateRoute>} />
  //               <Route path="/medications/add" element={<PrivateRoute><AddMedication /></PrivateRoute>} />
  //               <Route path="/medications/edit/:id" element={<PrivateRoute><EditMedication /></PrivateRoute>} />
  //               <Route path="/chatbot" element={<PrivateRoute><ChatbotPage /></PrivateRoute>} />
  //               <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
  //               <Route path="/settings" element={<PrivateRoute><Settings darkMode={darkMode} setDarkMode={setDarkMode} /></PrivateRoute>} />
  //               <Route path="/schedule" element={<PrivateRoute><Schedule /></PrivateRoute>} />
  //               <Route path="/change-password" element={<PrivateRoute><ChangePassword /></PrivateRoute>} />
  //               <Route path="/support" element={<PrivateRoute><Support /></PrivateRoute>} />
  //             </Route>

  //             <Route path="*" element={<Navigate to="/" replace />} />
  //           </Routes>
  //         </Layout>
  //       </MedicationProvider>
  //     </AuthProvider>
  //   </LocalizationProvider>
  // );
  return (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <ScrollToTop />
    <AuthProvider>
      <MedicationProvider>
        <Layout darkMode={darkMode} setDarkMode={setDarkMode}>
          {/* 🔥 Add Toaster here */}
          <Toaster position="top-right" reverseOrder={false} />

          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              <Route path="/analytics" element={<PrivateRoute><AnalyticsDashboard /></PrivateRoute>} />
              <Route path="/medications" element={<PrivateRoute><Medications /></PrivateRoute>} />
              <Route path="/medications/add" element={<PrivateRoute><AddMedication /></PrivateRoute>} />
              <Route path="/medications/edit/:id" element={<PrivateRoute><EditMedication /></PrivateRoute>} />
              <Route path="/chatbot" element={<PrivateRoute><ChatbotPage /></PrivateRoute>} />
              <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
              <Route path="/settings" element={<PrivateRoute><Settings darkMode={darkMode} setDarkMode={setDarkMode} /></PrivateRoute>} />
              <Route path="/schedule" element={<PrivateRoute><Schedule /></PrivateRoute>} />
              <Route path="/change-password" element={<PrivateRoute><ChangePassword /></PrivateRoute>} />
              <Route path="/support" element={<PrivateRoute><Support /></PrivateRoute>} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </MedicationProvider>
    </AuthProvider>
  </LocalizationProvider>
);

}
export default App;
