// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './Settings.css'; // Create this CSS file

// export default function Settings() {
//   const navigate = useNavigate();

//   const [notifications, setNotifications] = useState(true);
//   const [darkMode, setDarkMode] = useState(false);

//   // Load saved preferences on mount
//   useEffect(() => {
//     const savedDark = localStorage.getItem('darkMode') === 'true';
//     setDarkMode(savedDark);

//     const savedNotifications = localStorage.getItem('notifications') === 'true';
//     setNotifications(savedNotifications);
//   }, []);

//   // Apply dark mode class to body
//   useEffect(() => {
//     if (darkMode) {
//       document.body.classList.add('dark-mode');
//     } else {
//       document.body.classList.remove('dark-mode');
//     }
//     localStorage.setItem('darkMode', darkMode);
//   }, [darkMode]);

//   // Handle notifications toggle
//   const handleNotificationsChange = async () => {
//     setNotifications(!notifications);
//     localStorage.setItem('notifications', !notifications);

//     // Optional: persist on backend
//     try {
//       await axios.put('/api/user/settings', { notifications: !notifications });
//     } catch (err) {
//       console.error('Failed to update notifications:', err.message);
//     }
//   };

//   return (
//     <div className="settings-container">
//       <h1>Settings</h1>

//       {/* Profile Section */}
//       <section className="settings-section">
//         <h2>Profile</h2>
//         <p>Update your personal information and account details.</p>
//         <button className="settings-button" onClick={() => navigate('/profile')}>
//           Edit Profile
//         </button>
//       </section>

//       {/* Account Section */}
//       <section className="settings-section">
//         <h2>Account</h2>
//         <p>Manage your password and connected accounts.</p>
//         <button className="settings-button" onClick={() => navigate('/change-password')}>
//           Change Password
//         </button>
//       </section>

//       {/* Notifications Section */}
//       <section className="settings-section">
//         <h2>Notifications</h2>
//         <label>
//           <input
//             type="checkbox"
//             checked={notifications}
//             onChange={handleNotificationsChange}
//           />{' '}
//           Enable Email Notifications
//         </label>
//       </section>

//       {/* Dark Mode Section */}
//       <section className="settings-section">
//         <h2>Appearance</h2>
//         <label>
//   <input
//     type="checkbox"
//     checked={darkMode}
//     onChange={() => setDarkMode(!darkMode)}
//   />{' '}
//   Enable Dark Mode
// </label>

//       </section>
//       <section>
//         <h2 className="font-semibold">Support</h2>
//         <button
//           onClick={() => navigate('/support')}
//           className="btn bg-blue-600 hover:bg-blue-700"
//         >
//           Help & Support
//         </button>
//       </section>
//     </div>
//   );
// }
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Settings() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(true);

  // Load saved notifications preference on mount
  useEffect(() => {
    const savedNotifications = localStorage.getItem('notifications') === 'true';
    setNotifications(savedNotifications);
  }, []);

  // Handle notifications toggle
  const handleNotificationsChange = async () => {
    const newValue = !notifications;
    setNotifications(newValue);
    localStorage.setItem('notifications', newValue);

    // Optional: persist on backend
    try {
      await axios.put('/api/user/settings', { notifications: newValue });
    } catch (err) {
      console.error('Failed to update notifications:', err.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 bg-gray-50 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-blue-600">Settings</h1>

      {/* Profile Section */}
      <section className="mb-6 p-4 bg-white rounded-md shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold mb-1">Profile</h2>
        <p className="text-gray-700 mb-2">Update your personal information and account details.</p>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => navigate('/profile')}
        >
          Edit Profile
        </button>
      </section>

      {/* Account Section */}
      <section className="mb-6 p-4 bg-white rounded-md shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold mb-1">Account</h2>
        <p className="text-gray-700 mb-2">Manage your password and connected accounts.</p>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => navigate('/change-password')}
        >
          Change Password
        </button>
      </section>

      {/* Notifications Section */}
      <section className="mb-6 p-4 bg-white rounded-md shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold mb-2">Notifications</h2>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={notifications}
            onChange={handleNotificationsChange}
            className="w-4 h-4"
          />
          <span className="text-gray-700">Enable Email Notifications</span>
        </label>
      </section>

      {/* Support Section */}
      <section className="mb-6 p-4 bg-white rounded-md shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold mb-2">Support</h2>
        <button
          onClick={() => navigate('/support')}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Help & Support
        </button>
      </section>
    </div>
  );
}
