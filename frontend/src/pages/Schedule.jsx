
// import React, { useState, useEffect } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import axios from 'axios';
// import { motion } from 'framer-motion';
// import {
//   FiClock,
//   FiBell,
//   FiCheckCircle,
//   FiAlertTriangle,
//   FiCalendar,
//   FiTrendingUp,
//   FiBarChart2,
//   FiRefreshCw,
//   FiPieChart,
//   FiActivity,
//   FiDatabase
// } from 'react-icons/fi';
// import { FaPills, FaUserMd, FaCalendarCheck } from 'react-icons/fa';


// const MedicationSchedule = () => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);
//   const [stats, setStats] = useState({
//     activeMedications: 0,
//     todayDoses: 0,
//     upcomingDoses: 0,
//     adherenceRate: 0,
//     streak: 0,
//     pendingReminders: 0
//   });
//   const [recentActivity, setRecentActivity] = useState([]);
//   const [systemHealth, setSystemHealth] = useState({
//     reminderService: 'active',
//     doseTracker: 'active',
//     notificationService: 'active',
//     database: 'healthy'
//   });
//   const [notificationLoading, setNotificationLoading] = useState(false);

//   const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   const fetchDashboardData = async () => {
//     try {
//       setLoading(true);

//       // Fetch medication stats (mock if needed)
//       const medsRes = await axios.get(`${API_BASE_URL}/medications`, {
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//       });

//       const dosesRes = await axios.get(`${API_BASE_URL}/medications/upcoming/today`, {
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//       });

//       const activeMeds = medsRes.data.filter(m => m.isActive).length;
//       const todayDoses = dosesRes.data.doses?.length || 0;

//       setStats({
//         activeMedications: activeMeds,
//         todayDoses,
//         upcomingDoses: todayDoses,
//         adherenceRate: 85, // mock value
//         streak: 7,         // mock value
//         pendingReminders: todayDoses
//       });

//       // Mock recent activity
//       setRecentActivity([
//         { id: 1, type: 'reminder', message: 'Paracetamol reminder sent', time: '10:30 AM', status: 'success' },
//         { id: 2, type: 'dose', message: 'Dose marked as taken', time: '09:15 AM', status: 'success' },
//         { id: 3, type: 'missed', message: 'Missed dose detected', time: 'Yesterday', status: 'warning' },
//         { id: 4, type: 'report', message: 'Daily report generated', time: '08:00 AM', status: 'success' },
//       ]);
//     } catch (error) {
//       console.error('Error fetching dashboard data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Send Test Notification Function
//   const sendTestNotification = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       setNotificationLoading(true);

//       const response = await axios.post(`${API_BASE_URL}/notifications/test`, {}, {
//         headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
//       });

//       if (response.data.success) {
//         alert(`✅ Test Notification Sent Successfully!\nCheck email/push notifications.`);
//         setSystemHealth(prev => ({ ...prev, notificationService: 'active', lastTest: new Date().toLocaleTimeString() }));
//       } else {
//         alert(`❌ Failed: ${response.data.error || 'Unknown error'}`);
//       }

//     } catch (error) {
//       console.error(error);
//       alert(`❌ Error sending test notification: ${error.message}`);
//     } finally {
//       setNotificationLoading(false);
//     }
//   };

//   const quickActions = [
//   {
//     id: 1,
//     title: "Generate Today's Doses",
//     description: 'Create medication doses for today',
//     icon: FaCalendarCheck,
//     color: 'bg-blue-500',
//     action: async () => {
//       try {
//         // 🔹 MOCKED: simulate success
//         await new Promise(resolve => setTimeout(resolve, 500)); // 0.5s delay
//         alert("✅ Today's doses generated successfully!");
//         fetchDashboardData(); // refresh stats
//       } catch {
//         alert("❌ Failed to generate doses");
//       }
//     }
//   },
//   {
//     id: 2,
//     title: 'Send Test Reminder',
//     description: 'Test notification system',
//     icon: FiBell,
//     color: 'bg-green-500',
//     action: sendTestNotification
//   },
//   {
//     id: 3,
//     title: 'Check Missed Doses',
//     description: 'Scan for missed medications',
//     icon: FiAlertTriangle,
//     color: 'bg-yellow-500',
//     action: async () => {
//       try {
//         await new Promise(resolve => setTimeout(resolve, 500));
//         alert('✅ Checked missed doses. None found!');
//       } catch {
//         alert('❌ Failed to check missed doses');
//       }
//     }
//   },
//   {
//     id: 4,
//     title: 'Generate Report',
//     description: 'Create adherence report',
//     icon: FiBarChart2,
//     color: 'bg-purple-500',
//     action: async () => {
//       try {
//         await new Promise(resolve => setTimeout(resolve, 500));
//         alert('✅ Daily report generated! Check your email.');
//       } catch {
//         alert('❌ Failed to generate report');
//       }
//     }
//   }
// ];


//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading medication dashboard...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           <div className="flex items-center justify-between mb-6">
//             <div>
//               <button
//                 onClick={() => navigate(-1)}
//                 className="mb-4 px-4 py-2 text-gray-600 hover:text-gray-800 flex items-center"
//               >
//                 <FiClock className="mr-2" />
//                 Back to Dashboard
//               </button>
//               <h1 className="text-3xl md:text-4xl font-bold text-gray-800 flex items-center">
//                 <FaPills className="mr-3 text-blue-600" />
//                 Medication Management Hub
//               </h1>
//               <p className="text-gray-600 mt-2">
//                 Monitor and manage all your medication schedules and automated services
//               </p>
//             </div>
//             <button
//               onClick={fetchDashboardData}
//               className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
//             >
//               <FiRefreshCw className="mr-2" />
//               Refresh
//             </button>
//           </div>

//           {/* Stats Overview */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//             <div className="bg-white rounded-xl shadow-sm p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-gray-500">Active Medications</p>
//                   <p className="text-2xl font-bold text-gray-800 mt-2">{stats.activeMedications}</p>
//                 </div>
//                 <div className="bg-blue-100 p-3 rounded-full">
//                   <FaPills className="w-6 h-6 text-blue-600" />
//                 </div>
//               </div>
//               <Link to="/medications" className="text-blue-600 text-sm mt-4 block hover:text-blue-800">
//                 View all medications →
//               </Link>
//             </div>

//             <div className="bg-white rounded-xl shadow-sm p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-gray-500">Today's Doses</p>
//                   <p className="text-2xl font-bold text-gray-800 mt-2">{stats.todayDoses}</p>
//                 </div>
//                 <div className="bg-green-100 p-3 rounded-full">
//                   <FiCheckCircle className="w-6 h-6 text-green-600" />
//                 </div>
//               </div>
//               <Link to="/medications/upcoming" className="text-green-600 text-sm mt-4 block hover:text-green-800">
//                 View upcoming doses →
//               </Link>
//             </div>

//             <div className="bg-white rounded-xl shadow-sm p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-gray-500">Adherence Rate</p>
//                   <p className="text-2xl font-bold text-gray-800 mt-2">{stats.adherenceRate}%</p>
//                 </div>
//                 <div className="bg-purple-100 p-3 rounded-full">
//                   <FiTrendingUp className="w-6 h-6 text-purple-600" />
//                 </div>
//               </div>
//               <p className="text-purple-600 text-sm mt-4">Current streak: {stats.streak} days 🔥</p>
//             </div>
//           </div>
//         </div>

//         {/* Main Content Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Left Column - Quick Actions */}
//           <div className="lg:col-span-2">
//             <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
//               <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
//                 <FiActivity className="mr-3 text-blue-600" />
//                 Quick Actions
//               </h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {quickActions.map((action) => {
//                   const Icon = action.icon;
//                   return (
//                     <motion.button
//                       key={action.id}
//                       whileHover={{ scale: 1.03 }}
//                       whileTap={{ scale: 0.97 }}
//                       onClick={action.action}
//                       className="bg-white border border-gray-200 rounded-lg p-4 text-left hover:border-blue-300 hover:shadow-md transition-all"
//                     >
//                       <div className="flex items-center mb-3">
//                         <div className={`${action.color} p-2 rounded-lg mr-3`}>
//                           <Icon className="w-5 h-5 text-white" />
//                         </div>
//                         <h3 className="font-bold text-gray-800">{action.title}</h3>
//                       </div>
//                       <p className="text-sm text-gray-600">{action.description}</p>
//                     </motion.button>
//                   );
//                 })}
//               </div>
//             </div>

//             {/* Recent Activity */}
//             <div className="bg-white rounded-xl shadow-sm p-6">
//               <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
//                 <FiClock className="mr-3 text-blue-600" />
//                 Recent Activity
//               </h2>
//               <div className="space-y-4">
//                 {recentActivity.map((activity) => (
//                   <div key={activity.id} className="flex items-center border-b border-gray-100 pb-4 last:border-0">
//                     <div className={`p-2 rounded-lg mr-4 ${
//                       activity.status === 'success' ? 'bg-green-100' :
//                       activity.status === 'warning' ? 'bg-yellow-100' :
//                       'bg-red-100'
//                     }`}>
//                       {activity.type === 'reminder' && <FiBell className={`w-4 h-4 ${
//                         activity.status === 'success' ? 'text-green-600' :
//                         activity.status === 'warning' ? 'text-yellow-600' :
//                         'text-red-600'
//                       }`} />}
//                       {activity.type === 'dose' && <FaPills className={`w-4 h-4 ${
//                         activity.status === 'success' ? 'text-green-600' :
//                         activity.status === 'warning' ? 'text-yellow-600' :
//                         'text-red-600'
//                       }`} />}
//                       {activity.type === 'missed' && <FiAlertTriangle className={`w-4 h-4 ${
//                         activity.status === 'success' ? 'text-green-600' :
//                         activity.status === 'warning' ? 'text-yellow-600' :
//                         'text-red-600'
//                       }`} />}
//                       {activity.type === 'report' && <FiBarChart2 className={`w-4 h-4 ${
//                         activity.status === 'success' ? 'text-green-600' :
//                         activity.status === 'warning' ? 'text-yellow-600' :
//                         'text-red-600'
//                       }`} />}
//                     </div>
//                     <div className="flex-1">
//                       <p className="text-gray-800">{activity.message}</p>
//                       <p className="text-sm text-gray-500">{activity.time}</p>
//                     </div>
//                     <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//                       activity.status === 'success' ? 'bg-green-100 text-green-800' :
//                       activity.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
//                       'bg-red-100 text-red-800'
//                     }`}>
//                       {activity.status}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Right Column - System Health & Help */}
//           <div className="space-y-8">
//             {/* System Health */}
//             <div className="bg-white rounded-xl shadow-sm p-6">
//               <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
//                 <FiPieChart className="mr-3 text-blue-600" />
//                 System Health
//               </h2>
//               {Object.entries(systemHealth).map(([key, value]) => (
//                 <div key={key} className="flex items-center justify-between mb-2">
//                   <span className="capitalize text-gray-700">{key.replace(/([A-Z])/g, ' $1')}</span>
//                   <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//                     value === 'active' || value === 'healthy' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
//                   }`}>
//                     {value.charAt(0).toUpperCase() + value.slice(1)}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MedicationSchedule;
// import React, { useState, useEffect } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import axios from 'axios';
// import { motion } from 'framer-motion';
// import {
//   FiClock,
//   FiBell,
//   FiCheckCircle,
//   FiAlertTriangle,
//   FiTrendingUp,
//   FiBarChart2,
//   FiRefreshCw,
//   FiPieChart,
//   FiActivity
// } from 'react-icons/fi';
// import { FaPills, FaCalendarCheck } from 'react-icons/fa';
// import { useNotifications } from '../context/NotificationContext'; // ✅ import notifications

// const MedicationSchedule = () => {
//   const navigate = useNavigate();
//   const { addAlert } = useNotifications();

//   const [loading, setLoading] = useState(true);
//   const [stats, setStats] = useState({
//     activeMedications: 0,
//     todayDoses: 0,
//     upcomingDoses: 0,
//     adherenceRate: 0,
//     streak: 0,
//     pendingReminders: 0
//   });
//   const [recentActivity, setRecentActivity] = useState([]);
//   const [systemHealth, setSystemHealth] = useState({
//     reminderService: 'active',
//     doseTracker: 'active',
//     notificationService: 'active',
//     database: 'healthy'
//   });

//   const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   const fetchDashboardData = async () => {
//     try {
//       setLoading(true);

//       // 🔹 Mock API calls
//       const medsRes = await axios.get(`${API_BASE_URL}/medications`, {
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//       });
//       const dosesRes = await axios.get(`${API_BASE_URL}/medications/upcoming/today`, {
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//       });

//       const activeMeds = medsRes.data.filter(m => m.isActive).length;
//       const todayDoses = dosesRes.data.doses?.length || 0;

//       setStats({
//         activeMedications: activeMeds,
//         todayDoses,
//         upcomingDoses: todayDoses,
//         adherenceRate: 85, // mock
//         streak: 7,         // mock
//         pendingReminders: todayDoses
//       });

//       // Mock recent activity
//       setRecentActivity([
//         { id: 1, type: 'reminder', message: 'Paracetamol reminder sent', time: '10:30 AM', status: 'success' },
//         { id: 2, type: 'dose', message: 'Dose marked as taken', time: '09:15 AM', status: 'success' },
//         { id: 3, type: 'missed', message: 'Missed dose detected', time: 'Yesterday', status: 'warning' },
//         { id: 4, type: 'report', message: 'Daily report generated', time: '08:00 AM', status: 'success' },
//       ]);
//     } catch (error) {
//       console.error('Error fetching dashboard data:', error);
//       addAlert('❌ Failed to fetch dashboard data', 'error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Quick Actions
//   const quickActions = [
//     {
//       id: 1,
//       title: "Generate Today's Doses",
//       description: 'Create medication doses for today',
//       icon: FaCalendarCheck,
//       color: 'bg-blue-500',
//       action: async () => {
//         try {
//           await new Promise(resolve => setTimeout(resolve, 500));
//           addAlert("✅ Today's doses generated successfully!", 'success');
//           fetchDashboardData();
//         } catch {
//           addAlert("❌ Failed to generate today's doses", 'error');
//         }
//       }
//     },
//     {
//       id: 2,
//       title: 'Send Test Reminder',
//       description: 'Test notification system',
//       icon: FiBell,
//       color: 'bg-green-500',
//       action: async () => {
//         try {
//           await new Promise(resolve => setTimeout(resolve, 500));
//           addAlert('✅ Test reminder sent!', 'success');
//         } catch {
//           addAlert('❌ Failed to send test reminder', 'error');
//         }
//       }
//     },
//     {
//       id: 3,
//       title: 'Check Missed Doses',
//       description: 'Scan for missed medications',
//       icon: FiAlertTriangle,
//       color: 'bg-yellow-500',
//       action: async () => {
//         try {
//           await new Promise(resolve => setTimeout(resolve, 500));
//           addAlert('✅ Checked missed doses. None found!', 'success');
//         } catch {
//           addAlert('❌ Failed to check missed doses', 'error');
//         }
//       }
//     },
//     {
//       id: 4,
//       title: 'Generate Report',
//       description: 'Create adherence report',
//       icon: FiBarChart2,
//       color: 'bg-purple-500',
//       action: async () => {
//         try {
//           await new Promise(resolve => setTimeout(resolve, 500));
//           addAlert('✅ Daily report generated! Check email.', 'success');
//         } catch {
//           addAlert('❌ Failed to generate report', 'error');
//         }
//       }
//     }
//   ];

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading medication dashboard...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           <div className="flex items-center justify-between mb-6">
//             <div>
//               <button
//                 onClick={() => navigate(-1)}
//                 className="mb-4 px-4 py-2 text-gray-600 hover:text-gray-800 flex items-center"
//               >
//                 <FiClock className="mr-2" /> Back to Dashboard
//               </button>
//               <h1 className="text-3xl md:text-4xl font-bold text-gray-800 flex items-center">
//                 <FaPills className="mr-3 text-blue-600" /> Medication Management Hub
//               </h1>
//               <p className="text-gray-600 mt-2">
//                 Monitor and manage all your medication schedules and automated services
//               </p>
//             </div>
//             <button
//               onClick={fetchDashboardData}
//               className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
//             >
//               <FiRefreshCw className="mr-2" /> Refresh
//             </button>
//           </div>

//           {/* Stats Overview */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//             <div className="bg-white rounded-xl shadow-sm p-6 flex justify-between items-center">
//               <div>
//                 <p className="text-sm text-gray-500">Active Medications</p>
//                 <p className="text-2xl font-bold text-gray-800 mt-2">{stats.activeMedications}</p>
//               </div>
//               <div className="bg-blue-100 p-3 rounded-full">
//                 <FaPills className="w-6 h-6 text-blue-600" />
//               </div>
//             </div>
//             <div className="bg-white rounded-xl shadow-sm p-6 flex justify-between items-center">
//               <div>
//                 <p className="text-sm text-gray-500">Today's Doses</p>
//                 <p className="text-2xl font-bold text-gray-800 mt-2">{stats.todayDoses}</p>
//               </div>
//               <div className="bg-green-100 p-3 rounded-full">
//                 <FiCheckCircle className="w-6 h-6 text-green-600" />
//               </div>
//             </div>
//             <div className="bg-white rounded-xl shadow-sm p-6 flex justify-between items-center">
//               <div>
//                 <p className="text-sm text-gray-500">Adherence Rate</p>
//                 <p className="text-2xl font-bold text-gray-800 mt-2">{stats.adherenceRate}%</p>
//               </div>
//               <div className="bg-purple-100 p-3 rounded-full">
//                 <FiTrendingUp className="w-6 h-6 text-purple-600" />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Main Content Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Left Column - Quick Actions */}
//           <div className="lg:col-span-2">
//             <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
//               <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
//                 <FiActivity className="mr-3 text-blue-600" /> Quick Actions
//               </h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {quickActions.map(action => {
//                   const Icon = action.icon;
//                   return (
//                     <motion.button
//                       key={action.id}
//                       whileHover={{ scale: 1.03 }}
//                       whileTap={{ scale: 0.97 }}
//                       onClick={action.action}
//                       className="bg-white border border-gray-200 rounded-lg p-4 text-left hover:border-blue-300 hover:shadow-md transition-all"
//                     >
//                       <div className="flex items-center mb-3">
//                         <div className={`${action.color} p-2 rounded-lg mr-3`}>
//                           <Icon className="w-5 h-5 text-white" />
//                         </div>
//                         <h3 className="font-bold text-gray-800">{action.title}</h3>
//                       </div>
//                       <p className="text-sm text-gray-600">{action.description}</p>
//                     </motion.button>
//                   );
//                 })}
//               </div>
//             </div>

//             {/* Recent Activity */}
//             <div className="bg-white rounded-xl shadow-sm p-6">
//               <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
//                 <FiClock className="mr-3 text-blue-600" /> Recent Activity
//               </h2>
//               <div className="space-y-4">
//                 {recentActivity.map(activity => (
//                   <div key={activity.id} className="flex items-center border-b border-gray-100 pb-4 last:border-0">
//                     <div className={`p-2 rounded-lg mr-4 ${
//                       activity.status === 'success' ? 'bg-green-100' :
//                       activity.status === 'warning' ? 'bg-yellow-100' :
//                       'bg-red-100'
//                     }`}>
//                       {activity.type === 'reminder' && <FiBell className={`w-4 h-4 ${
//                         activity.status === 'success' ? 'text-green-600' :
//                         activity.status === 'warning' ? 'text-yellow-600' :
//                         'text-red-600'
//                       }`} />}
//                       {activity.type === 'dose' && <FaPills className={`w-4 h-4 ${
//                         activity.status === 'success' ? 'text-green-600' :
//                         activity.status === 'warning' ? 'text-yellow-600' :
//                         'text-red-600'
//                       }`} />}
//                       {activity.type === 'missed' && <FiAlertTriangle className={`w-4 h-4 ${
//                         activity.status === 'success' ? 'text-green-600' :
//                         activity.status === 'warning' ? 'text-yellow-600' :
//                         'text-red-600'
//                       }`} />}
//                       {activity.type === 'report' && <FiBarChart2 className={`w-4 h-4 ${
//                         activity.status === 'success' ? 'text-green-600' :
//                         activity.status === 'warning' ? 'text-yellow-600' :
//                         'text-red-600'
//                       }`} />}
//                     </div>
//                     <div className="flex-1">
//                       <p className="text-gray-800">{activity.message}</p>
//                       <p className="text-sm text-gray-500">{activity.time}</p>
//                     </div>
//                     <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//                       activity.status === 'success' ? 'bg-green-100 text-green-800' :
//                       activity.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
//                       'bg-red-100 text-red-800'
//                     }`}>
//                       {activity.status}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Right Column - System Health */}
//           <div className="space-y-8">
//             <div className="bg-white rounded-xl shadow-sm p-6">
//               <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
//                 <FiPieChart className="mr-3 text-blue-600" /> System Health
//               </h2>
//               {Object.entries(systemHealth).map(([key, value]) => (
//                 <div key={key} className="flex items-center justify-between mb-2">
//                   <span className="capitalize text-gray-700">{key.replace(/([A-Z])/g, ' $1')}</span>
//                   <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//                     value === 'active' || value === 'healthy' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
//                   }`}>
//                     {value.charAt(0).toUpperCase() + value.slice(1)}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default MedicationSchedule;
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { motion } from 'framer-motion';
// import {
//   FiClock, FiBell, FiCheckCircle, FiAlertTriangle, FiTrendingUp,
//   FiBarChart2, FiRefreshCw, FiPieChart, FiActivity
// } from 'react-icons/fi';
// import { FaPills, FaCalendarCheck } from 'react-icons/fa';
// import { useNotifications } from '../context/NotificationContext';

// const MedicationSchedule = () => {
//   const navigate = useNavigate();
//   const { addAlert } = useNotifications();

//   const [loading, setLoading] = useState(true);
//   const [stats, setStats] = useState({
//     activeMedications: 0,
//     todayDoses: 0,
//     upcomingDoses: 0,
//     adherenceRate: 0,
//     streak: 0,
//     pendingReminders: 0
//   });
//   const [recentActivity, setRecentActivity] = useState([]);
//   const [systemHealth, setSystemHealth] = useState({
//     reminderService: 'active',
//     doseTracker: 'active',
//     notificationService: 'active',
//     database: 'healthy'
//   });

//   const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   const fetchDashboardData = async () => {
//     try {
//       setLoading(true);

//       const medsRes = await axios.get(`${API_BASE_URL}/medications`, {
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//       });
//       const dosesRes = await axios.get(`${API_BASE_URL}/medications/upcoming/today`, {
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//       });

//       const activeMeds = medsRes.data.filter(m => m.isActive).length;
//       const todayDoses = dosesRes.data.doses?.length || 0;

//       setStats({
//         activeMedications: activeMeds,
//         todayDoses,
//         upcomingDoses: todayDoses,
//         adherenceRate: 85,
//         streak: 7,
//         pendingReminders: todayDoses
//       });

//       setRecentActivity([
//         { id: 1, type: 'reminder', message: 'Paracetamol reminder sent', time: '10:30 AM', status: 'success' },
//         { id: 2, type: 'dose', message: 'Dose marked as taken', time: '09:15 AM', status: 'success' },
//         { id: 3, type: 'missed', message: 'Missed dose detected', time: 'Yesterday', status: 'warning' },
//         { id: 4, type: 'report', message: 'Daily report generated', time: '08:00 AM', status: 'success' },
//       ]);
//     } catch (error) {
//       console.error('Error fetching dashboard data:', error);
//       addAlert('❌ Failed to fetch dashboard data', 'error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const quickActions = [
//     {
//       id: 1,
//       title: "Generate Today's Doses",
//       description: 'Create medication doses for today',
//       icon: FaCalendarCheck,
//       color: 'bg-blue-500',
//       action: async () => { addAlert("✅ Today's doses generated!", 'success'); fetchDashboardData(); }
//     },
//     {
//       id: 2,
//       title: 'Send Test Reminder',
//       description: 'Test notification system',
//       icon: FiBell,
//       color: 'bg-green-500',
//       action: async () => { addAlert('✅ Test reminder sent!', 'success'); }
//     },
//     {
//       id: 3,
//       title: 'Check Missed Doses',
//       description: 'Scan for missed medications',
//       icon: FiAlertTriangle,
//       color: 'bg-yellow-500',
//       action: async () => { addAlert('✅ Checked missed doses.', 'success'); }
//     },
//     {
//       id: 4,
//       title: 'Generate Report',
//       description: 'Create adherence report',
//       icon: FiBarChart2,
//       color: 'bg-purple-500',
//       action: async () => { addAlert('✅ Daily report generated!', 'success'); }
//     }
//   ];

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
//           <p className="mt-4 text-gray-600 dark:text-gray-300">Loading medication dashboard...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen p-4 md:p-6 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           <div className="flex items-center justify-between mb-6">
//             <div>
//               <button
//                 onClick={() => navigate(-1)}
//                 className="mb-4 px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white flex items-center transition-colors"
//               >
//                 <FiClock className="mr-2" /> Back to Dashboard
//               </button>
//               <h1 className="text-3xl md:text-4xl font-bold flex items-center">
//                 <FaPills className="mr-3 text-blue-600" /> Medication Management Hub
//               </h1>
//               <p className="text-gray-600 dark:text-gray-400 mt-2">
//                 Monitor and manage all your medication schedules and automated services
//               </p>
//             </div>
//             <button
//               onClick={fetchDashboardData}
//               className="px-4 py-2 bg-gray-200 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-100 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors flex items-center"
//             >
//               <FiRefreshCw className="mr-2" /> Refresh
//             </button>
//           </div>

//           {/* Stats Overview */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//             {/* Active Medications */}
//             <div className="rounded-xl shadow-sm p-6 flex justify-between items-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
//               <div>
//                 <p className="text-sm text-gray-500 dark:text-gray-400">Active Medications</p>
//                 <p className="text-2xl font-bold mt-2">{stats.activeMedications}</p>
//               </div>
//               <div className="bg-blue-100 dark:bg-blue-800 p-3 rounded-full">
//                 <FaPills className="w-6 h-6 text-blue-600 dark:text-white" />
//               </div>
//             </div>
//             {/* Today's Doses */}
//             <div className="rounded-xl shadow-sm p-6 flex justify-between items-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
//               <div>
//                 <p className="text-sm text-gray-500 dark:text-gray-400">Today's Doses</p>
//                 <p className="text-2xl font-bold mt-2">{stats.todayDoses}</p>
//               </div>
//               <div className="bg-green-100 dark:bg-green-800 p-3 rounded-full">
//                 <FiCheckCircle className="w-6 h-6 text-green-600 dark:text-white" />
//               </div>
//             </div>
//             {/* Adherence Rate */}
//             <div className="rounded-xl shadow-sm p-6 flex justify-between items-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
//               <div>
//                 <p className="text-sm text-gray-500 dark:text-gray-400">Adherence Rate</p>
//                 <p className="text-2xl font-bold mt-2">{stats.adherenceRate}%</p>
//               </div>
//               <div className="bg-purple-100 dark:bg-purple-800 p-3 rounded-full">
//                 <FiTrendingUp className="w-6 h-6 text-purple-600 dark:text-white" />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Main Content Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Left Column - Quick Actions */}
//           <div className="lg:col-span-2">
//             <div className="rounded-xl shadow-sm p-6 mb-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
//               <h2 className="text-xl font-bold mb-6 flex items-center">
//                 <FiActivity className="mr-3 text-blue-600 dark:text-white" /> Quick Actions
//               </h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {quickActions.map(action => {
//                   const Icon = action.icon;
//                   return (
//                     <motion.button
//                       key={action.id}
//                       whileHover={{ scale: 1.03 }}
//                       whileTap={{ scale: 0.97 }}
//                       onClick={action.action}
//                       className="flex flex-col bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg p-4 text-left hover:bg-gray-100 dark:hover:bg-gray-600 hover:shadow-md transition-all"
//                     >
//                       <div className="flex items-center mb-3">
//                         <div className={`${action.color} p-2 rounded-lg mr-3 flex-shrink-0`}>
//                           <Icon className="w-5 h-5 text-white" />
//                         </div>
//                         <h3 className="font-bold">{action.title}</h3>
//                       </div>
//                       <p className="text-sm text-gray-600 dark:text-gray-200">{action.description}</p>
//                     </motion.button>
//                   );
//                 })}
//               </div>
//             </div>

//             {/* Recent Activity */}
//             <div className="rounded-xl shadow-sm p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
//               <h2 className="text-xl font-bold mb-6 flex items-center">
//                 <FiClock className="mr-3 text-blue-600 dark:text-white" /> Recent Activity
//               </h2>
//               <div className="space-y-4">
//                 {recentActivity.map(activity => (
//                   <div key={activity.id} className="flex items-center border-b border-gray-100 dark:border-gray-700 pb-4 last:border-0">
//                     <div className={`p-2 rounded-lg mr-4 ${
//                       activity.status === 'success' ? 'bg-green-100 dark:bg-green-800' :
//                       activity.status === 'warning' ? 'bg-yellow-100 dark:bg-yellow-800' :
//                       'bg-red-100 dark:bg-red-800'
//                     }`}>
//                       {activity.type === 'reminder' && <FiBell className={`w-4 h-4 ${
//                         activity.status === 'success' ? 'text-green-600 dark:text-green-200' :
//                         activity.status === 'warning' ? 'text-yellow-600 dark:text-yellow-200' :
//                         'text-red-600 dark:text-red-200'
//                       }`} />}
//                       {activity.type === 'dose' && <FaPills className={`w-4 h-4 ${
//                         activity.status === 'success' ? 'text-green-600 dark:text-green-200' :
//                         activity.status === 'warning' ? 'text-yellow-600 dark:text-yellow-200' :
//                         'text-red-600 dark:text-red-200'
//                       }`} />}
//                       {activity.type === 'missed' && <FiAlertTriangle className={`w-4 h-4 ${
//                         activity.status === 'success' ? 'text-green-600 dark:text-green-200' :
//                         activity.status === 'warning' ? 'text-yellow-600 dark:text-yellow-200' :
//                         'text-red-600 dark:text-red-200'
//                       }`} />}
//                       {activity.type === 'report' && <FiBarChart2 className={`w-4 h-4 ${
//                         activity.status === 'success' ? 'text-green-600 dark:text-green-200' :
//                         activity.status === 'warning' ? 'text-yellow-600 dark:text-yellow-200' :
//                         'text-red-600 dark:text-red-200'
//                       }`} />}
//                     </div>
//                     <div className="flex-1">
//                       <p className="text-gray-800 dark:text-gray-100">{activity.message}</p>
//                       <p className="text-sm text-gray-500 dark:text-gray-300">{activity.time}</p>
//                     </div>
//                     <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//                       activity.status === 'success' ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200' :
//                       activity.status === 'warning' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200' :
//                       'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-200'
//                     }`}>
//                       {activity.status}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Right Column - System Health */}
//           <div className="space-y-8">
//             <div className="rounded-xl shadow-sm p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
//               <h2 className="text-xl font-bold mb-6 flex items-center">
//                 <FiPieChart className="mr-3 text-blue-600 dark:text-white" /> System Health
//               </h2>
//               {Object.entries(systemHealth).map(([key, value]) => (
//                 <div key={key} className="flex items-center justify-between mb-2">
//                   <span className="capitalize text-gray-700 dark:text-gray-300">{key.replace(/([A-Z])/g, ' $1')}</span>
//                   <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//                     value === 'active' || value === 'healthy' ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-200'
//                   }`}>
//                     {value.charAt(0).toUpperCase() + value.slice(1)}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MedicationSchedule;

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { motion } from 'framer-motion';
// import {
//   FiClock, FiBell, FiCheckCircle, FiAlertTriangle, FiTrendingUp,
//   FiBarChart2, FiRefreshCw, FiPieChart, FiActivity
// } from 'react-icons/fi';
// import { FaPills, FaCalendarCheck } from 'react-icons/fa';
// import { useNotifications } from '../context/NotificationContext';

// const MedicationSchedule = () => {
//   const navigate = useNavigate();
//   const { addAlert } = useNotifications();

//   const [loading, setLoading] = useState(true);
//   const [stats, setStats] = useState({
//     activeMedications: 0,
//     todayDoses: 0,
//     upcomingDoses: 0,
//     adherenceRate: 0,
//     streak: 0,
//     pendingReminders: 0
//   });
//   const [recentActivity, setRecentActivity] = useState([]);
//   const [systemHealth, setSystemHealth] = useState({
//     reminderService: 'active',
//     doseTracker: 'active',
//     notificationService: 'active',
//     database: 'healthy'
//   });

//   const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   const fetchDashboardData = async () => {
//     try {
//       setLoading(true);
//       const medsRes = await axios.get(`${API_BASE_URL}/medications`, {
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//       });
//       const dosesRes = await axios.get(`${API_BASE_URL}/medications/upcoming/today`, {
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//       });

//       const activeMeds = medsRes.data.filter(m => m.isActive).length;
//       const todayDoses = dosesRes.data.doses?.length || 0;

//       setStats({
//         activeMedications: activeMeds,
//         todayDoses,
//         upcomingDoses: todayDoses,
//         adherenceRate: 85,
//         streak: 7,
//         pendingReminders: todayDoses
//       });

//       setRecentActivity([
//         { id: 1, type: 'reminder', message: 'Paracetamol reminder sent', time: '10:30 AM', status: 'success' },
//         { id: 2, type: 'dose', message: 'Dose marked as taken', time: '09:15 AM', status: 'success' },
//         { id: 3, type: 'missed', message: 'Missed dose detected', time: 'Yesterday', status: 'warning' },
//         { id: 4, type: 'report', message: 'Daily report generated', time: '08:00 AM', status: 'success' },
//       ]);
//     } catch (error) {
//       console.error('Error fetching dashboard data:', error);
//       addAlert('❌ Failed to fetch dashboard data', 'error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const quickActions = [
//     { id: 1, title: "Generate Today's Doses", description: 'Create medication doses for today', icon: FaCalendarCheck, color: 'bg-blue-500', action: async () => { addAlert("✅ Today's doses generated!", 'success'); fetchDashboardData(); } },
//     { id: 2, title: 'Send Test Reminder', description: 'Test notification system', icon: FiBell, color: 'bg-green-500', action: async () => { addAlert('✅ Test reminder sent!', 'success'); } },
//     { id: 3, title: 'Check Missed Doses', description: 'Scan for missed medications', icon: FiAlertTriangle, color: 'bg-yellow-500', action: async () => { addAlert('✅ Checked missed doses.', 'success'); } },
//     { id: 4, title: 'Generate Report', description: 'Create adherence report', icon: FiBarChart2, color: 'bg-purple-500', action: async () => { addAlert('✅ Daily report generated!', 'success'); } }
//   ];

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
//           <p className="mt-4 text-gray-600 dark:text-gray-300">Loading medication dashboard...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen p-4 md:p-6 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           <div className="flex items-center justify-between mb-6">
//             <div>
//               <button
//                 onClick={() => navigate(-1)}
//                 className="mb-4 px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white flex items-center transition-colors"
//               >
//                 <FiClock className="mr-2" /> Back to Dashboard
//               </button>
//               <h1 className="text-3xl md:text-4xl font-bold flex items-center">
//                 <FaPills className="mr-3 text-blue-600" /> Medication Management Hub
//               </h1>
//               <p className="text-gray-600 dark:text-gray-400 mt-2">
//                 Monitor and manage all your medication schedules and automated services
//               </p>
//             </div>
//             <button
//               onClick={fetchDashboardData}
//               className="px-4 py-2 bg-gray-200 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-100 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors flex items-center"
//             >
//               <FiRefreshCw className="mr-2" /> Refresh
//             </button>
//           </div>

//           {/* Stats Overview with colored cards */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//             <div className="rounded-xl p-6 flex justify-between items-center bg-blue-50 dark:bg-blue-900 border border-blue-100 dark:border-blue-800">
//               <div>
//                 <p className="text-sm text-blue-600 dark:text-blue-300">Active Medications</p>
//                 <p className="text-2xl font-bold mt-2">{stats.activeMedications}</p>
//               </div>
//               <div className="bg-blue-100 dark:bg-blue-800 p-3 rounded-full">
//                 <FaPills className="w-6 h-6 text-blue-600 dark:text-white" />
//               </div>
//             </div>

//             <div className="rounded-xl p-6 flex justify-between items-center bg-green-50 dark:bg-green-900 border border-green-100 dark:border-green-800">
//               <div>
//                 <p className="text-sm text-green-600 dark:text-green-300">Today's Doses</p>
//                 <p className="text-2xl font-bold mt-2">{stats.todayDoses}</p>
//               </div>
//               <div className="bg-green-100 dark:bg-green-800 p-3 rounded-full">
//                 <FiCheckCircle className="w-6 h-6 text-green-600 dark:text-white" />
//               </div>
//             </div>

//             <div className="rounded-xl p-6 flex justify-between items-center bg-purple-50 dark:bg-purple-900 border border-purple-100 dark:border-purple-800">
//               <div>
//                 <p className="text-sm text-purple-600 dark:text-purple-300">Adherence Rate</p>
//                 <p className="text-2xl font-bold mt-2">{stats.adherenceRate}%</p>
//               </div>
//               <div className="bg-purple-100 dark:bg-purple-800 p-3 rounded-full">
//                 <FiTrendingUp className="w-6 h-6 text-purple-600 dark:text-white" />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Main Content Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Left Column - Quick Actions */}
//           <div className="lg:col-span-2 space-y-8">
//             <div className="rounded-xl p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
//               <h2 className="text-xl font-bold mb-6 flex items-center">
//                 <FiActivity className="mr-3 text-blue-600 dark:text-white" /> Quick Actions
//               </h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {quickActions.map(action => {
//                   const Icon = action.icon;
// //                   return (
// //                     <motion.button
// //                       key={action.id}
// //                       whileHover={{ scale: 1.03 }}
// //                       whileTap={{ scale: 0.97 }}
// //                       onClick={action.action}
// //                       className={`flex flex-col p-4 rounded-lg text-left transition-all border ${
// //                         action.color.replace('bg-', 'border-')
// //                       } hover:shadow-lg`}
// //                     >
// //                       <div className="flex items-center mb-3">
// //                         <div className={`${action.color} p-2 rounded-lg mr-3 flex-shrink-0`}>
// //                           <Icon className="w-5 h-5 text-white" />
// //                         </div>
// //                         <h3 className="font-bold">{action.title}</h3>
// //                       </div>
// //                       <p className="text-sm text-gray-600 dark:text-gray-200">{action.description}</p>
// //                     </motion.button>
// //                   );
// //                 })}
// //               </div>
// //             </div>
// //           </div>

// //           {/* Right Column - System Health */}
// //           <div className="space-y-8">
// //             <div className="rounded-xl shadow-sm p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
// //               <h2 className="text-xl font-bold mb-6 flex items-center">
// //                 <FiPieChart className="mr-3 text-blue-600 dark:text-white" /> System Health
// //               </h2>
// //               {Object.entries(systemHealth).map(([key, value]) => (
// //                 <div key={key} className="flex items-center justify-between mb-2">
// //                   <span className="capitalize text-gray-700 dark:text-gray-300">{key.replace(/([A-Z])/g, ' $1')}</span>
// //                   <span className={`px-2 py-1 rounded-full text-xs font-medium ${
// //                     value === 'active' || value === 'healthy'
// //                       ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200'
// //                       : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-200'
// //                   }`}>
// //                     {value.charAt(0).toUpperCase() + value.slice(1)}
// //                   </span>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// //export default MedicationSchedule;
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { motion } from 'framer-motion';
// import {
//   FiClock,
//   FiBell,
//   FiCheckCircle,
//   FiAlertTriangle,
//   FiTrendingUp,
//   FiBarChart2,
//   FiRefreshCw,
//   FiPieChart,
//   FiActivity
// } from 'react-icons/fi';
// import { FaPills, FaCalendarCheck } from 'react-icons/fa';
// import { useNotifications } from '../context/NotificationContext';

// const MedicationSchedule = () => {
//   const navigate = useNavigate();
//   const { addAlert } = useNotifications();

//   const [loading, setLoading] = useState(true);
//   const [stats, setStats] = useState({
//     activeMedications: 0,
//     todayDoses: 0,
//     upcomingDoses: 0,
//     adherenceRate: 0,
//     streak: 0,
//     pendingReminders: 0
//   });
//   const [recentActivity, setRecentActivity] = useState([]);
//   const [systemHealth, setSystemHealth] = useState({
//     reminderService: 'active',
//     doseTracker: 'active',
//     notificationService: 'active',
//     database: 'healthy'
//   });

//   const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   const fetchDashboardData = async () => {
//     try {
//       setLoading(true);

//       const medsRes = await axios.get(`${API_BASE_URL}/medications`, {
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//       });
//       const dosesRes = await axios.get(`${API_BASE_URL}/medications/upcoming/today`, {
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//       });

//       const activeMeds = medsRes.data.filter(m => m.isActive).length;
//       const todayDoses = dosesRes.data.doses?.length || 0;

//       setStats({
//         activeMedications: activeMeds,
//         todayDoses,
//         upcomingDoses: todayDoses,
//         adherenceRate: 85, // mock
//         streak: 7,         // mock
//         pendingReminders: todayDoses
//       });

//       setRecentActivity([
//         { id: 1, type: 'reminder', message: 'Paracetamol reminder sent', time: '10:30 AM', status: 'success' },
//         { id: 2, type: 'dose', message: 'Dose marked as taken', time: '09:15 AM', status: 'success' },
//         { id: 3, type: 'missed', message: 'Missed dose detected', time: 'Yesterday', status: 'warning' },
//         { id: 4, type: 'report', message: 'Daily report generated', time: '08:00 AM', status: 'success' },
//       ]);
//     } catch (error) {
//       console.error('Error fetching dashboard data:', error);
//       addAlert('❌ Failed to fetch dashboard data', 'error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Quick Actions
//   const quickActions = [
//     {
//       id: 1,
//       title: "Generate Today's Doses",
//       description: 'Create medication doses for today',
//       icon: FaCalendarCheck,
//       color: 'bg-blue-500',
//       action: async () => {
//         try {
//           await new Promise(resolve => setTimeout(resolve, 500));
//           addAlert("✅ Today's doses generated successfully!", 'success');
//           fetchDashboardData();
//         } catch {
//           addAlert("❌ Failed to generate today's doses", 'error');
//         }
//       }
//     },
//     {
//       id: 2,
//       title: 'Send Test Reminder',
//       description: 'Test notification system',
//       icon: FiBell,
//       color: 'bg-green-500',
//       action: async () => {
//         try {
//           await new Promise(resolve => setTimeout(resolve, 500));
//           addAlert('✅ Test reminder sent!', 'success');
//         } catch {
//           addAlert('❌ Failed to send test reminder', 'error');
//         }
//       }
//     },
//     {
//       id: 3,
//       title: 'Check Missed Doses',
//       description: 'Scan for missed medications',
//       icon: FiAlertTriangle,
//       color: 'bg-yellow-500',
//       action: async () => {
//         try {
//           await new Promise(resolve => setTimeout(resolve, 500));
//           addAlert('✅ Checked missed doses. None found!', 'success');
//         } catch {
//           addAlert('❌ Failed to check missed doses', 'error');
//         }
//       }
//     },
//     {
//       id: 4,
//       title: 'Generate Report',
//       description: 'Create adherence report',
//       icon: FiBarChart2,
//       color: 'bg-purple-500',
//       action: async () => {
//         try {
//           await new Promise(resolve => setTimeout(resolve, 500));
//           addAlert('✅ Daily report generated! Check email.', 'success');
//         } catch {
//           addAlert('❌ Failed to generate report', 'error');
//         }
//       }
//     }
//   ];

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
//           <p className="mt-4 text-gray-600 dark:text-gray-300">Loading medication dashboard...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen p-4 md:p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           <div className="flex items-center justify-between mb-6">
//             <div>
//               <button
//                 onClick={() => navigate(-1)}
//                 className="mb-4 px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white flex items-center"
//               >
//                 <FiClock className="mr-2" /> Back to Dashboard
//               </button>
//               <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 flex items-center">
//                 <FaPills className="mr-3 text-blue-600 dark:text-blue-400" /> Medication Management Hub
//               </h1>
//               <p className="text-gray-600 dark:text-gray-300 mt-2">
//                 Monitor and manage all your medication schedules and automated services
//               </p>
//             </div>
//             <button
//               onClick={fetchDashboardData}
//               className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center"
//             >
//               <FiRefreshCw className="mr-2" /> Refresh
//             </button>
//           </div>

//           {/* Stats Overview */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//             <div className="bg-blue-100 dark:bg-blue-900 rounded-xl shadow-sm p-6 flex justify-between items-center">
//               <div>
//                 <p className="text-sm text-gray-700 dark:text-gray-200">Active Medications</p>
//                 <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{stats.activeMedications}</p>
//               </div>
//               <div className="bg-blue-200 dark:bg-blue-800 p-3 rounded-full">
//                 <FaPills className="w-6 h-6 text-blue-600 dark:text-blue-300" />
//               </div>
//             </div>
//             <div className="bg-green-100 dark:bg-green-900 rounded-xl shadow-sm p-6 flex justify-between items-center">
//               <div>
//                 <p className="text-sm text-gray-700 dark:text-gray-200">Today's Doses</p>
//                 <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{stats.todayDoses}</p>
//               </div>
//               <div className="bg-green-200 dark:bg-green-800 p-3 rounded-full">
//                 <FiCheckCircle className="w-6 h-6 text-green-600 dark:text-green-300" />
//               </div>
//             </div>
//             <div className="bg-purple-100 dark:bg-purple-900 rounded-xl shadow-sm p-6 flex justify-between items-center">
//               <div>
//                 <p className="text-sm text-gray-700 dark:text-gray-200">Adherence Rate</p>
//                 <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{stats.adherenceRate}%</p>
//               </div>
//               <div className="bg-purple-200 dark:bg-purple-800 p-3 rounded-full">
//                 <FiTrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-300" />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Main Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Left Column */}
//           <div className="lg:col-span-2 space-y-8">
//             {/* Quick Actions */}
//             <div className="rounded-xl p-6 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
//               <h2 className="text-xl font-bold mb-6 flex items-center text-gray-900 dark:text-gray-100">
//                 <FiActivity className="mr-3 text-blue-600 dark:text-blue-400" /> Quick Actions
//               </h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {quickActions.map(action => {
//                   const Icon = action.icon;
//                   return (
//                     <motion.button
//                       key={action.id}
//                       whileHover={{ scale: 1.03 }}
//                       whileTap={{ scale: 0.97 }}
//                       onClick={action.action}
//                       className="flex flex-col p-4 rounded-lg transition-all border shadow-sm bg-white dark:bg-gray-700 hover:shadow-md dark:hover:shadow-lg border-gray-200 dark:border-gray-600"
//                     >
//                       <div className="flex items-center mb-3">
//                         <div className={`${action.color} p-2 rounded-lg mr-3 flex-shrink-0`}>
//                           <Icon className="w-5 h-5 text-white" />
//                         </div>
//                         <h3 className="font-bold text-gray-900 dark:text-gray-100">{action.title}</h3>
//                       </div>
//                       <p className="text-sm text-gray-700 dark:text-gray-300">{action.description}</p>
//                     </motion.button>
//                   );
//                 })}
//               </div>
//             </div>

//             {/* Recent Activity */}
//             <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
//               <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
//                 <FiClock className="mr-3 text-blue-600 dark:text-blue-400" /> Recent Activity
//               </h2>
//               <div className="space-y-4">
//                 {recentActivity.map(activity => (
//                   <div key={activity.id} className="flex items-center border-b border-gray-100 dark:border-gray-700 pb-4 last:border-0">
//                     <div className={`p-2 rounded-lg mr-4 ${
//                       activity.status === 'success' ? 'bg-green-100 dark:bg-green-700' :
//                       activity.status === 'warning' ? 'bg-yellow-100 dark:bg-yellow-700' :
//                       'bg-red-100 dark:bg-red-700'
//                     }`}>
//                       {activity.type === 'reminder' && <FiBell className={`w-4 h-4 ${
//                         activity.status === 'success' ? 'text-green-600 dark:text-green-200' :
//                         activity.status === 'warning' ? 'text-yellow-600 dark:text-yellow-200' :
//                         'text-red-600 dark:text-red-200'
//                       }`} />}
//                       {activity.type === 'dose' && <FaPills className={`w-4 h-4 ${
//                         activity.status === 'success' ? 'text-green-600 dark:text-green-200' :
//                         activity.status === 'warning' ? 'text-yellow-600 dark:text-yellow-200' :
//                         'text-red-600 dark:text-red-200'
//                       }`} />}
//                       {activity.type === 'missed' && <FiAlertTriangle className={`w-4 h-4 ${
//                         activity.status === 'success' ? 'text-green-600 dark:text-green-200' :
//                         activity.status === 'warning' ? 'text-yellow-600 dark:text-yellow-200' :
//                         'text-red-600 dark:text-red-200'
//                       }`} />}
//                       {activity.type === 'report' && <FiBarChart2 className={`w-4 h-4 ${
//                         activity.status === 'success' ? 'text-green-600 dark:text-green-200' :
//                         activity.status === 'warning' ? 'text-yellow-600 dark:text-yellow-200' :
//                         'text-red-600 dark:text-red-200'
//                       }`} />}
//                     </div>
//                     <div className="flex-1">
//                       <p className="text-gray-900 dark:text-gray-100">{activity.message}</p>
//                       <p className="text-sm text-gray-600 dark:text-gray-300">{activity.time}</p>
//                     </div>
//                     <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//                       activity.status === 'success' ? 'bg-green-100 dark:bg-green-700 text-green-800 dark:text-green-200' :
//                       activity.status === 'warning' ? 'bg-yellow-100 dark:bg-yellow-700 text-yellow-800 dark:text-yellow-200' :
//                       'bg-red-100 dark:bg-red-700 text-red-800 dark:text-red-200'
//                     }`}>
//                       {activity.status}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Right Column - System Health */}
//           <div className="space-y-8">
//             <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
//               <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
//                 <FiPieChart className="mr-3 text-blue-600 dark:text-blue-400" /> System Health
//               </h2>
//               {Object.entries(systemHealth).map(([key, value]) => (
//                 <div key={key} className="flex items-center justify-between mb-2">
//                   <span className="capitalize text-gray-700 dark:text-gray-300">{key.replace(/([A-Z])/g, ' $1')}</span>
//                   <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//                     value === 'active' || value === 'healthy' ? 'bg-green-100 dark:bg-green-700 text-green-800 dark:text-green-200' : 
//                     'bg-red-100 dark:bg-red-700 text-red-800 dark:text-red-200'
//                   }`}>
//                     {value.charAt(0).toUpperCase() + value.slice(1)}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MedicationSchedule;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { Toaster, toast } from "react-hot-toast";

import {
  FiClock,
  FiBell,
  FiCheckCircle,
  FiAlertTriangle,
  FiTrendingUp,
  FiBarChart2,
  FiRefreshCw,
  FiPieChart,
  FiActivity
} from "react-icons/fi";
import { FaPills, FaCalendarCheck } from "react-icons/fa";

import { useNotifications } from "../context/NotificationContext";

const MedicationSchedule = () => {
  const navigate = useNavigate();
  const { addAlert } = useNotifications();

  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    activeMedications: 0,
    todayDoses: 0,
    adherenceRate: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [systemHealth, setSystemHealth] = useState({
    reminderService: "active",
    doseTracker: "active",
    notificationService: "active",
    database: "healthy"
  });

  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // 🔹 Mock API calls
      const medsRes = await axios.get(`${API_BASE_URL}/medications`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      const dosesRes = await axios.get(`${API_BASE_URL}/medications/upcoming/today`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });

      const activeMeds = medsRes.data.filter((m) => m.isActive).length;
      const todayDoses = dosesRes.data.doses?.length || 0;

      setStats({
        activeMedications: activeMeds,
        todayDoses,
        adherenceRate: 85 // mock
      });

      setRecentActivity([
        { id: 1, type: "reminder", message: "Paracetamol reminder sent", time: "10:30 AM", status: "success" },
        { id: 2, type: "dose", message: "Dose marked as taken", time: "09:15 AM", status: "success" },
        { id: 3, type: "missed", message: "Missed dose detected", time: "Yesterday", status: "warning" },
        { id: 4, type: "report", message: "Daily report generated", time: "08:00 AM", status: "success" }
      ]);
    } catch (error) {
      console.error(error);
      addAlert("❌ Failed to fetch dashboard data", "error");
      toast.error("❌ Failed to fetch dashboard data");
    } finally {
      setLoading(false);
    }
  };

  // Helper for Quick Action alerts
  const handleAction = async (actionFn, successMsg, errorMsg) => {
    try {
      await actionFn();
      addAlert(successMsg, "success");
      toast.success(successMsg);
      fetchDashboardData();
    } catch {
      addAlert(errorMsg, "error");
      toast.error(errorMsg);
    }
  };

  const quickActions = [
    {
      id: 1,
      title: "Generate Today's Doses",
      description: "Create medication doses for today",
      icon: FaCalendarCheck,
      color: "bg-blue-500",
      action: () => handleAction(
        () => new Promise((res) => setTimeout(res, 500)),
        "✅ Today's doses generated successfully!",
        "❌ Failed to generate today's doses"
      )
    },
    {
      id: 2,
      title: "Send Test Reminder",
      description: "Test notification system",
      icon: FiBell,
      color: "bg-green-500",
      action: () => handleAction(
        () => new Promise((res) => setTimeout(res, 500)),
        "✅ Test reminder sent!",
        "❌ Failed to send test reminder"
      )
    },
    {
      id: 3,
      title: "Check Missed Doses",
      description: "Scan for missed medications",
      icon: FiAlertTriangle,
      color: "bg-yellow-500",
      action: () => handleAction(
        () => new Promise((res) => setTimeout(res, 500)),
        "✅ Checked missed doses. None found!",
        "❌ Failed to check missed doses"
      )
    },
    {
      id: 4,
      title: "Generate Report",
      description: "Create adherence report",
      icon: FiBarChart2,
      color: "bg-purple-500",
      action: () => handleAction(
        () => new Promise((res) => setTimeout(res, 500)),
        "✅ Daily report generated!",
        "❌ Failed to generate report"
      )
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Loading medication dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-6">
      {/* 🔥 Toaster */}
      <Toaster position="top-right" reverseOrder={false} />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <button
                onClick={() => navigate(-1)}
                className="mb-4 px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white flex items-center"
              >
                <FiClock className="mr-2" /> Back to Dashboard
              </button>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white flex items-center">
                <FaPills className="mr-3 text-blue-600" /> Medication Management Hub
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Monitor and manage all your medication schedules and automated services
              </p>
            </div>
            <button
              onClick={fetchDashboardData}
              className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center transition-colors"
            >
              <FiRefreshCw className="mr-2" /> Refresh
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-100 dark:bg-blue-900 rounded-xl shadow-sm p-6 flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-700 dark:text-gray-200">Active Medications</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{stats.activeMedications}</p>
              </div>
              <div className="bg-blue-500 p-3 rounded-full">
                <FaPills className="w-6 h-6 text-white" />
              </div>
            </div>

            <div className="bg-green-100 dark:bg-green-900 rounded-xl shadow-sm p-6 flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-700 dark:text-gray-200">Today's Doses</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{stats.todayDoses}</p>
              </div>
              <div className="bg-green-500 p-3 rounded-full">
                <FiCheckCircle className="w-6 h-6 text-white" />
              </div>
            </div>

            <div className="bg-purple-100 dark:bg-purple-900 rounded-xl shadow-sm p-6 flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-700 dark:text-gray-200">Adherence Rate</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{stats.adherenceRate}%</p>
              </div>
              <div className="bg-purple-500 p-3 rounded-full">
                <FiTrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Quick Actions */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold dark:text-white mb-6 flex items-center">
                <FiActivity className="mr-3 text-blue-600" /> Quick Actions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quickActions.map((action) => {
                  const Icon = action.icon;
                  return (
                    <motion.button
                      key={action.id}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={action.action}
                      className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4 text-left hover:border-blue-300 hover:shadow-md transition-all"
                    >
                      <div className="flex items-center mb-3">
                        <div className={`${action.color} p-2 rounded-lg mr-3`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="font-bold dark:text-white text-gray-800">{action.title}</h3>
                      </div>
                      <p className="text-sm dark:text-gray-300 text-gray-600">{action.description}</p>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold dark:text-white mb-6 flex items-center">
                <FiClock className="mr-3 text-blue-600" /> Recent Activity
              </h2>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center border-b border-gray-100 dark:border-gray-700 pb-4 last:border-0">
                    <div className={`p-2 rounded-lg mr-4 ${
                      activity.status === "success"
                        ? "bg-green-100 dark:bg-green-700"
                        : activity.status === "warning"
                        ? "bg-yellow-100 dark:bg-yellow-700"
                        : "bg-red-100 dark:bg-red-700"
                    }`}>
                      {activity.type === "reminder" && <FiBell className={`w-4 h-4 ${
                        activity.status === "success"
                          ? "text-green-600 dark:text-green-100"
                          : activity.status === "warning"
                          ? "text-yellow-600 dark:text-yellow-100"
                          : "text-red-600 dark:text-red-100"
                      }`} />}
                      {activity.type === "dose" && <FaPills className={`w-4 h-4 ${
                        activity.status === "success"
                          ? "text-green-600 dark:text-green-100"
                          : activity.status === "warning"
                          ? "text-yellow-600 dark:text-yellow-100"
                          : "text-red-600 dark:text-red-100"
                      }`} />}
                      {activity.type === "missed" && <FiAlertTriangle className={`w-4 h-4 ${
                        activity.status === "success"
                          ? "text-green-600 dark:text-green-100"
                          : activity.status === "warning"
                          ? "text-yellow-600 dark:text-yellow-100"
                          : "text-red-600 dark:text-red-100"
                      }`} />}
                      {activity.type === "report" && <FiBarChart2 className={`w-4 h-4 ${
                        activity.status === "success"
                          ? "text-green-600 dark:text-green-100"
                          : activity.status === "warning"
                          ? "text-yellow-600 dark:text-yellow-100"
                          : "text-red-600 dark:text-red-100"
                      }`} />}
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-800 dark:text-white">{activity.message}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-300">{activity.time}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      activity.status === "success"
                        ? "bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100"
                        : activity.status === "warning"
                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-100"
                        : "bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-100"
                    }`}>
                      {activity.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: System Health */}
          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold dark:text-white mb-6 flex items-center">
                <FiPieChart className="mr-3 text-blue-600" /> System Health
              </h2>
              {Object.entries(systemHealth).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between mb-2">
                  <span className="capitalize text-gray-700 dark:text-gray-200">{key.replace(/([A-Z])/g, " $1")}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    value === "active" || value === "healthy"
                      ? "bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100"
                      : "bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-100"
                  }`}>
                    {value.charAt(0).toUpperCase() + value.slice(1)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicationSchedule;


