// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../context/AuthContext';
// import { useMedications } from '../context/MedicationContext';
// import Input from '../components/common/Input';
// import Button from '../components/common/Button';
// import Card from '../components/common/Card';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import { 
//     FiUser, 
//     FiMail, 
//     FiPhone, 
//     FiCalendar,
//     FiMapPin,
//     FiEdit2,
//     FiSave,
//     FiLock,
//     FiShield,
//     FiBell,
//     FiActivity
// } from 'react-icons/fi';

// const Profile = () => {
//     const { user, updateProfile } = useAuth();
//     const { medications, getMedicationStats } = useMedications();

//     const [isEditing, setIsEditing] = useState(false);
//     const [formData, setFormData] = useState({
//         name: '',
//         email: '',
//         phone: '',
//         birthDate: '',
//         address: '',
//         emergencyContact: ''
//     });
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState('');
//     const [success, setSuccess] = useState('');
//     const navigate=useNavigate();

//     useEffect(() => {
//         if (user) {
//             setFormData({
//                 name: user.name || '',
//                 email: user.email || '',
//                 phone: user.phone || '',
//                 birthDate: user.birthDate || '',
//                 address: user.address || '',
//                 emergencyContact: user.emergencyContact || ''
//             });
//         }
//     }, [user]);

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({ ...prev, [name]: value }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setError('');
//         setSuccess('');

//         try {
//             const result = await updateProfile(formData);
//             if (result.success) {
//                 setSuccess('Profile updated successfully!');
//                 setIsEditing(false);
//             } else {
//                 setError(result.error || 'Failed to update profile');
//             }
//         } catch {
//             setError('An error occurred. Please try again.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     /* ================== DYNAMIC STATS ================== */
//     const stats = getMedicationStats();

//     const adherenceRate = medications.length
//         ? Math.round((stats.active / medications.length) * 100)
//         : 0;

//     const userStats = [
//         {
//             label: 'Medication Streak',
//             value: `${stats.today} days`,
//             icon: FiActivity
//         },
//         {
//             label: 'Adherence Rate',
//             value: `${adherenceRate}%`,
//             icon: FiBell
//         },
//         {
//             label: 'Active Medications',
//             value: stats.active,
//             icon: FiShield
//         },
//         {
//             label: 'Total Medications',
//             value: stats.total,
//             icon: FiActivity
//         }
//     ];
//     /* =================================================== */

//     if (!user) {
//         return (
//             <div className="flex justify-center items-center h-64">
//                 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
//             </div>
//         );
//     }

//     return (
//         <div className="space-y-6">
//             {/* Header */}
//             <div className="flex justify-between items-center">
//                 <div>
//                     <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
//                     <p className="text-gray-600 mt-2">Manage your account and preferences</p>
//                 </div>

//                 {!isEditing && (
//                     <Button onClick={() => setIsEditing(true)} variant="primary">
//                         <FiEdit2 className="w-5 h-5 mr-2" />
//                         Edit Profile
//                     </Button>
//                 )}
//             </div>

//             {/* Stats Cards */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//                 {userStats.map((stat, index) => {
//                     const Icon = stat.icon;
//                     return (
//                         <Card key={index}>
//                             <div className="flex items-center">
//                                 <div className="bg-blue-100 p-3 rounded-lg mr-4">
//                                     <Icon className="w-6 h-6 text-blue-600" />
//                                 </div>
//                                 <div>
//                                     <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
//                                     <p className="text-sm text-gray-600">{stat.label}</p>
//                                 </div>
//                             </div>
//                         </Card>
//                     );
//                 })}
//             </div>

//             {/* Messages */}
//             {error && (
//                 <div className="bg-red-50 border border-red-200 rounded-lg p-4">
//                     <p className="text-red-700">{error}</p>
//                 </div>
//             )}

//             {success && (
//                 <div className="bg-green-50 border border-green-200 rounded-lg p-4">
//                     <p className="text-green-700">{success}</p>
//                 </div>
//             )}

//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//                 {/* Profile Form */}
//                 <div className="lg:col-span-2">
//                     <Card>
//                         <form onSubmit={handleSubmit} className="space-y-6">
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                                 <Input label="Full Name" name="name" value={formData.name}
//                                     onChange={handleInputChange} disabled={!isEditing} required
//                                     icon={<FiUser className="w-5 h-5 text-gray-400" />} />

//                                 <Input label="Email Address" name="email" type="email"
//                                     value={formData.email} onChange={handleInputChange}
//                                     disabled={!isEditing} required
//                                     icon={<FiMail className="w-5 h-5 text-gray-400" />} />
//                             </div>

//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                                 <Input label="Phone Number" name="phone" type="tel"
//                                     value={formData.phone} onChange={handleInputChange}
//                                     disabled={!isEditing}
//                                     icon={<FiPhone className="w-5 h-5 text-gray-400" />} />

//                                 <Input label="Birth Date" name="birthDate" type="date"
//                                     value={formData.birthDate} onChange={handleInputChange}
//                                     disabled={!isEditing}
//                                     icon={<FiCalendar className="w-5 h-5 text-gray-400" />} />
//                             </div>

//                             <Input label="Address" name="address"
//                                 value={formData.address} onChange={handleInputChange}
//                                 disabled={!isEditing}
//                                 icon={<FiMapPin className="w-5 h-5 text-gray-400" />} />

//                             <Input label="Emergency Contact" name="emergencyContact"
//                                 value={formData.emergencyContact} onChange={handleInputChange}
//                                 disabled={!isEditing}
//                                 helperText="Phone number of emergency contact"
//                                 icon={<FiPhone className="w-5 h-5 text-gray-400" />} />

//                             {isEditing && (
//                                 <div className="flex justify-end space-x-4 pt-6 border-t">
//                                     <Button type="button" variant="outline"
//                                         onClick={() => setIsEditing(false)} disabled={loading}>
//                                         Cancel
//                                     </Button>
//                                     <Button type="submit" variant="primary" loading={loading}>
//                                         <FiSave className="w-5 h-5 mr-2" />
//                                         Save Changes
//                                     </Button>
//                                 </div>
//                             )}
//                         </form>
//                     </Card>
//                 </div>

//                 {/* Sidebar */}
//                 <div className="space-y-6">
//                     <Card>
//                         <h3 className="font-bold text-gray-900 mb-4">Account Status</h3>
//                         <div className="space-y-3">
//                            <div className="flex justify-between">
//     <span className="text-gray-600">Account Created</span>
//     <span className="font-medium">
//         {user?.createdAt
//             ? new Date(user.createdAt).toLocaleDateString()
//             : 'N/A'}
//     </span>
// </div>

//                         </div>
//                     </Card>

//                     <Card>
//                         <h3 className="font-bold text-gray-900 mb-4">Quick Actions</h3>
//                         <Button variant="outline" fullWidth onClick={()=>{
//                             navigate("/change-password");
//                         }}>
//                             <FiLock className="w-4 h-4 mr-2" />
//                             Change Password
//                         </Button>
//                     </Card>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Profile;
// import React, { useState, useEffect } from "react";
// import { useAuth } from "../context/AuthContext";
// import { useMedications } from "../context/MedicationContext";
// import Input from "../components/common/Input";
// import Button from "../components/common/Button";
// import Card from "../components/common/Card";
// import { useNavigate } from "react-router-dom";
// import {
//   FiUser,
//   FiMail,
//   FiPhone,
//   FiCalendar,
//   FiMapPin,
//   FiEdit2,
//   FiSave,
//   FiLock,
//   FiShield,
//   FiBell,
//   FiActivity,
// } from "react-icons/fi";

// const Profile = () => {
//   const { user, updateProfile } = useAuth();
//   const { medications, getMedicationStats } = useMedications();
//   const navigate = useNavigate();

//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     birthDate: "",
//     address: "",
//     emergencyContact: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   useEffect(() => {
//     if (user) {
//       setFormData({
//         name: user.name || "",
//         email: user.email || "",
//         phone: user.phone || "",
//         birthDate: user.birthDate || "",
//         address: user.address || "",
//         emergencyContact: user.emergencyContact || "",
//       });
//     }
//   }, [user]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");
//     setSuccess("");

//     try {
//       const result = await updateProfile(formData);
//       if (result.success) {
//         setSuccess("Profile updated successfully!");
//         setIsEditing(false);
//       } else {
//         setError(result.error || "Failed to update profile");
//       }
//     } catch {
//       setError("An error occurred. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ================== DYNAMIC STATS ================== */
//   const stats = getMedicationStats();
//   const adherenceRate = medications.length
//     ? Math.round((stats.active / medications.length) * 100)
//     : 0;

//   const userStats = [
//     {
//       label: "Medication Streak",
//       value: `${stats.today} days`,
//       icon: FiActivity,
//       color: "bg-blue-50 dark:bg-blue-900 text-blue-800 dark:text-blue-100",
//     },
//     {
//       label: "Adherence Rate",
//       value: `${adherenceRate}%`,
//       icon: FiBell,
//       color: "bg-green-50 dark:bg-green-900 text-green-800 dark:text-green-100",
//     },
//     {
//       label: "Active Medications",
//       value: stats.active,
//       icon: FiShield,
//       color: "bg-purple-50 dark:bg-purple-900 text-purple-800 dark:text-purple-100",
//     },
//     {
//       label: "Total Medications",
//       value: stats.total,
//       icon: FiActivity,
//       color: "bg-yellow-50 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100",
//     },
//   ];
//   /* =================================================== */

//   if (!user) {
//     return (
//       <div className="flex justify-center items-center h-64 bg-gray-50 dark:bg-gray-900">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6 p-4 md:p-6 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
//       {/* Header */}
//       <div className="flex justify-between items-center flex-wrap">
//         <div>
//           <h1 className="text-3xl font-bold">My Profile</h1>
//           <p className="text-gray-600 dark:text-gray-400 mt-1">
//             Manage your account and preferences
//           </p>
//         </div>
//         {!isEditing && (
//           <Button
//             onClick={() => setIsEditing(true)}
//             variant="primary"
//             className="mt-2 md:mt-0"
//           >
//             <FiEdit2 className="w-5 h-5 mr-2" />
//             Edit Profile
//           </Button>
//         )}
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {userStats.map((stat, index) => {
//           const Icon = stat.icon;
//           return (
//             <Card key={index} className={`${stat.color}`}>
//               <div className="flex items-center">
//                 <div className="p-3 rounded-lg mr-4 bg-opacity-30">
//                   <Icon className="w-6 h-6" />
//                 </div>
//                 <div>
//                   <p className="text-2xl font-bold">{stat.value}</p>
//                   <p className="text-sm">{stat.label}</p>
//                 </div>
//               </div>
//             </Card>
//           );
//         })}
//       </div>

//       {/* Messages */}
//       {error && (
//         <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg p-4">
//           <p className="text-red-700 dark:text-red-200">{error}</p>
//         </div>
//       )}
//       {success && (
//         <div className="bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-lg p-4">
//           <p className="text-green-700 dark:text-green-200">{success}</p>
//         </div>
//       )}

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         {/* Profile Form */}
//         <div className="lg:col-span-2">
//           <Card>
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <Input
//                   label="Full Name"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleInputChange}
//                   disabled={!isEditing}
//                   required
//                   icon={<FiUser className="w-5 h-5 text-gray-400 dark:text-gray-300" />}
//                 />
//                 <Input
//                   label="Email Address"
//                   name="email"
//                   type="email"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   disabled={!isEditing}
//                   required
//                   icon={<FiMail className="w-5 h-5 text-gray-400 dark:text-gray-300" />}
//                 />
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <Input
//                   label="Phone Number"
//                   name="phone"
//                   type="tel"
//                   value={formData.phone}
//                   onChange={handleInputChange}
//                   disabled={!isEditing}
//                   icon={<FiPhone className="w-5 h-5 text-gray-400 dark:text-gray-300" />}
//                 />
//                 <Input
//                   label="Birth Date"
//                   name="birthDate"
//                   type="date"
//                   value={formData.birthDate}
//                   onChange={handleInputChange}
//                   disabled={!isEditing}
//                   icon={<FiCalendar className="w-5 h-5 text-gray-400 dark:text-gray-300" />}
//                 />
//               </div>

//               <Input
//                 label="Address"
//                 name="address"
//                 value={formData.address}
//                 onChange={handleInputChange}
//                 disabled={!isEditing}
//                 icon={<FiMapPin className="w-5 h-5 text-gray-400 dark:text-gray-300" />}
//               />

//               <Input
//                 label="Emergency Contact"
//                 name="emergencyContact"
//                 value={formData.emergencyContact}
//                 onChange={handleInputChange}
//                 disabled={!isEditing}
//                 helperText="Phone number of emergency contact"
//                 icon={<FiPhone className="w-5 h-5 text-gray-400 dark:text-gray-300" />}
//               />

//               {isEditing && (
//                 <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
//                   <Button
//                     type="button"
//                     variant="outline"
//                     onClick={() => setIsEditing(false)}
//                     disabled={loading}
//                   >
//                     Cancel
//                   </Button>
//                   <Button type="submit" variant="primary" loading={loading}>
//                     <FiSave className="w-5 h-5 mr-2" />
//                     Save Changes
//                   </Button>
//                 </div>
//               )}
//             </form>
//           </Card>
//         </div>

//         {/* Sidebar */}
//         <div className="space-y-6">
//           <Card>
//             <h3 className="font-bold mb-4">Account Status</h3>
//             <div className="space-y-3">
//               <div className="flex justify-between">
//                 <span className="text-gray-600 dark:text-gray-300">Account Created</span>
//                 <span className="font-medium">
//                   {user?.createdAt
//                     ? new Date(user.createdAt).toLocaleDateString()
//                     : "N/A"}
//                 </span>
//               </div>
//             </div>
//           </Card>

//           <Card>
//             <h3 className="font-bold mb-4">Quick Actions</h3>
//             <Button
//               variant="outline"
//               fullWidth
//               onClick={() => {
//                 navigate("/change-password");
//               }}
//             >
//               <FiLock className="w-4 h-4 mr-2" />
//               Change Password
//             </Button>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;
// import React, { useState, useEffect } from "react";
// import { useAuth } from "../context/AuthContext";
// import { useMedications } from "../context/MedicationContext";
// import Input from "../components/common/Input";
// import Button from "../components/common/Button";
// import Card from "../components/common/Card";
// import { useNavigate } from "react-router-dom";
// import {
//   FiUser,
//   FiMail,
//   FiPhone,
//   FiCalendar,
//   FiMapPin,
//   FiEdit2,
//   FiSave,
//   FiLock,
//   FiShield,
//   FiBell,
//   FiActivity,
// } from "react-icons/fi";

// const Profile = () => {
//   const { user, updateProfile } = useAuth();
//   const { medications, getMedicationStats } = useMedications();
//   const navigate = useNavigate();

//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     birthDate: "",
//     address: "",
//     emergencyContact: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   useEffect(() => {
//     if (user) {
//       setFormData({
//         name: user.name || "",
//         email: user.email || "",
//         phone: user.phone || "",
//         birthDate: user.birthDate || "",
//         address: user.address || "",
//         emergencyContact: user.emergencyContact || "",
//       });
//     }
//   }, [user]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");
//     setSuccess("");

//     try {
//       const result = await updateProfile(formData);
//       if (result.success) {
//         setSuccess("Profile updated successfully!");
//         setIsEditing(false);
//       } else {
//         setError(result.error || "Failed to update profile");
//       }
//     } catch {
//       setError("An error occurred. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ================== DYNAMIC STATS ================== */
//   const stats = getMedicationStats();
//   const adherenceRate = medications.length
//     ? Math.round((stats.active / medications.length) * 100)
//     : 0;

//   const userStats = [
//     {
//       label: "Medication Streak",
//       value: `${stats.today} days`,
//       icon: FiActivity,
//       color: "bg-blue-50 dark:bg-blue-900 text-blue-800 dark:text-blue-100",
//     },
//     {
//       label: "Adherence Rate",
//       value: `${adherenceRate}%`,
//       icon: FiBell,
//       color: "bg-green-50 dark:bg-green-900 text-green-800 dark:text-green-100",
//     },
//     {
//       label: "Active Medications",
//       value: stats.active,
//       icon: FiShield,
//       color: "bg-purple-50 dark:bg-purple-900 text-purple-800 dark:text-purple-100",
//     },
//     {
//       label: "Total Medications",
//       value: stats.total,
//       icon: FiActivity,
//       color: "bg-yellow-50 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100",
//     },
//   ];
//   /* =================================================== */

//   if (!user) {
//     return (
//       <div className="flex justify-center items-center h-64 bg-gray-50 dark:bg-gray-900">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6 p-4 md:p-6 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
//       {/* Header */}
//       <div className="flex justify-between items-center flex-wrap">
//         <div>
//           <h1 className="text-3xl font-bold">My Profile</h1>
//           <p className="text-gray-600 dark:text-gray-400 mt-1">
//             Manage your account and preferences
//           </p>
//         </div>
//         {!isEditing && (
//           <Button
//             onClick={() => setIsEditing(true)}
//             variant="primary"
//             className="mt-2 md:mt-0"
//           >
//             <FiEdit2 className="w-5 h-5 mr-2" />
//             Edit Profile
//           </Button>
//         )}
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {userStats.map((stat, index) => {
//           const Icon = stat.icon;
//           return (
//             <Card key={index} className={`${stat.color}`}>
//               <div className="flex items-center">
//                 <div className="p-3 rounded-lg mr-4 bg-opacity-30">
//                   <Icon className="w-6 h-6" />
//                 </div>
//                 <div>
//                   <p className="text-2xl font-bold">{stat.value}</p>
//                   <p className="text-sm">{stat.label}</p>
//                 </div>
//               </div>
//             </Card>
//           );
//         })}
//       </div>

//       {/* Messages */}
//       {error && (
//         <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg p-4">
//           <p className="text-red-700 dark:text-red-200">{error}</p>
//         </div>
//       )}
//       {success && (
//         <div className="bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-lg p-4">
//           <p className="text-green-700 dark:text-green-200">{success}</p>
//         </div>
//       )}

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         {/* Profile Form */}
//         <div className="lg:col-span-2">
//           <Card>
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <Input
//                   label="Full Name"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleInputChange}
//                   disabled={!isEditing}
//                   required
//                   icon={<FiUser className="w-5 h-5 text-gray-400 dark:text-gray-300" />}
//                 />
//                 <Input
//                   label="Email Address"
//                   name="email"
//                   type="email"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   disabled={!isEditing}
//                   required
//                   icon={<FiMail className="w-5 h-5 text-gray-400 dark:text-gray-300" />}
//                 />
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <Input
//                   label="Phone Number"
//                   name="phone"
//                   type="tel"
//                   value={formData.phone}
//                   onChange={handleInputChange}
//                   disabled={!isEditing}
//                   icon={<FiPhone className="w-5 h-5 text-gray-400 dark:text-gray-300" />}
//                 />
//                 <Input
//                   label="Birth Date"
//                   name="birthDate"
//                   type="date"
//                   value={formData.birthDate}
//                   onChange={handleInputChange}
//                   disabled={!isEditing}
//                   icon={<FiCalendar className="w-5 h-5 text-gray-400 dark:text-gray-300" />}
//                 />
//               </div>

//               <Input
//                 label="Address"
//                 name="address"
//                 value={formData.address}
//                 onChange={handleInputChange}
//                 disabled={!isEditing}
//                 icon={<FiMapPin className="w-5 h-5 text-gray-400 dark:text-gray-300" />}
//               />

//               <Input
//                 label="Emergency Contact"
//                 name="emergencyContact"
//                 value={formData.emergencyContact}
//                 onChange={handleInputChange}
//                 disabled={!isEditing}
//                 helperText="Phone number of emergency contact"
//                 icon={<FiPhone className="w-5 h-5 text-gray-400 dark:text-gray-300" />}
//               />

//               {isEditing && (
//                 <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
//                   <Button
//                     type="button"
//                     variant="outline"
//                     onClick={() => setIsEditing(false)}
//                     disabled={loading}
//                   >
//                     Cancel
//                   </Button>
//                   <Button type="submit" variant="primary" loading={loading}>
//                     <FiSave className="w-5 h-5 mr-2" />
//                     Save Changes
//                   </Button>
//                 </div>
//               )}
//             </form>
//           </Card>
//         </div>

//         {/* Sidebar */}
//         <div className="space-y-6">
//           <Card>
//             <h3 className="font-bold mb-4">Account Status</h3>
//             <div className="space-y-3">
//               <div className="flex justify-between">
//                 <span className="text-gray-600 dark:text-gray-300">Account Created</span>
//                 <span className="font-medium">
//                   {user?.createdAt
//                     ? new Date(user.createdAt).toLocaleDateString()
//                     : "N/A"}
//                 </span>
//               </div>
//             </div>
//           </Card>

//           <Card>
//             <h3 className="font-bold mb-4">Quick Actions</h3>
//             <Button
//               variant="outline"
//               fullWidth
//               onClick={() => {
//                 navigate("/change-password");
//               }}
//             >
//               <FiLock className="w-4 h-4 mr-2" />
//               Change Password
//             </Button>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useMedications } from "../context/MedicationContext";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import { useNavigate } from "react-router-dom";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiCalendar,
  FiMapPin,
  FiEdit2,
  FiSave,
  FiLock,
  FiShield,
  FiBell,
  FiActivity,
} from "react-icons/fi";

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const { medications, getMedicationStats } = useMedications();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    birthDate: "",
    address: "",
    emergencyContact: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        birthDate: user.birthDate || "",
        address: user.address || "",
        emergencyContact: user.emergencyContact || "",
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const result = await updateProfile(formData);
      if (result.success) {
        setSuccess("Profile updated successfully!");
        setIsEditing(false);
      } else {
        setError(result.error || "Failed to update profile");
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const stats = getMedicationStats();
  const adherenceRate = medications.length
    ? Math.round((stats.active / medications.length) * 100)
    : 0;

  const userStats = [
    {
      label: "Medication Streak",
      value: `${stats.today} days`,
      icon: FiActivity,
      bg: "bg-gradient-to-r from-blue-600 to-blue-400",
    },
    {
      label: "Adherence Rate",
      value: `${adherenceRate}%`,
      icon: FiBell,
      bg: "bg-gradient-to-r from-green-600 to-green-400",
    },
    {
      label: "Active Medications",
      value: stats.active,
      icon: FiShield,
      bg: "bg-gradient-to-r from-purple-600 to-purple-400",
    },
    {
      label: "Total Medications",
      value: stats.total,
      icon: FiActivity,
      bg: "bg-gradient-to-r from-yellow-600 to-yellow-400",
    },
  ];

  if (!user) {
    return (
      <div className="flex justify-center items-center h-64 bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 md:p-6 bg-gray-900 text-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center flex-wrap">
        <div>
          <h1 className="text-3xl font-bold text-white">My Profile</h1>
          <p className="text-gray-300 mt-1">
            Manage your account and preferences
          </p>
        </div>
        {!isEditing && (
          <Button
            onClick={() => setIsEditing(true)}
            variant="primary"
            className="mt-2 md:mt-0"
          >
            <FiEdit2 className="w-5 h-5 mr-2" />
            Edit Profile
          </Button>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {userStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card
              key={index}
              className={`${stat.bg} p-4 rounded-xl flex items-center text-white shadow-lg`}
            >
              <div className="flex items-center w-full">
                <div className="p-3 rounded-lg mr-4 bg-white/20">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm font-semibold">{stat.label}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Messages */}
      {error && (
        <div className="bg-red-900 border border-red-700 rounded-lg p-4">
          <p className="text-red-200">{error}</p>
        </div>
      )}
      {success && (
        <div className="bg-green-900 border border-green-700 rounded-lg p-4">
          <p className="text-green-200">{success}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Form */}
        <div className="lg:col-span-2">
          <Card className="bg-gray-800 text-gray-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  bold
                  className="bg-gray-700 text-white"
                  icon={<FiUser className="w-5 h-5 text-gray-300" />}
                />
                <Input
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  bold
                  className="bg-gray-700 text-white"
                  icon={<FiMail className="w-5 h-5 text-gray-300" />}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  bold
                  className="bg-gray-700 text-white"
                  icon={<FiPhone className="w-5 h-5 text-gray-300" />}
                />
                <Input
                  label="Birth Date"
                  name="birthDate"
                  type="date"
                  value={formData.birthDate}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  bold
                  className="bg-gray-700 text-white"
                  icon={<FiCalendar className="w-5 h-5 text-gray-300" />}
                />
              </div>

              <Input
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                disabled={!isEditing}
                bold
                className="bg-gray-700 text-white"
                icon={<FiMapPin className="w-5 h-5 text-gray-300" />}
              />

              <Input
                label="Emergency Contact"
                name="emergencyContact"
                value={formData.emergencyContact}
                onChange={handleInputChange}
                disabled={!isEditing}
                helperText="Phone number of emergency contact"
                bold
                className="bg-gray-700 text-white"
                icon={<FiPhone className="w-5 h-5 text-gray-300" />}
              />

              {isEditing && (
                <div className="flex justify-end space-x-4 pt-6 border-t border-gray-700">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsEditing(false)}
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary" loading={loading}>
                    <FiSave className="w-5 h-5 mr-2" />
                    Save Changes
                  </Button>
                </div>
              )}
            </form>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card className="bg-gray-800 text-gray-100">
           <h3 className="font-bold mb-4 text-gray-900 dark:text-white">Account Status</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Account Created</span>
                <span className="font-semibold">
                  {user?.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "N/A"}
                </span>
              </div>
            </div>
          </Card>

          <Card className="bg-gray-800 text-gray-100">
           <h3 className="font-bold mb-4 text-gray-900 dark:text-white">Quick Actions</h3>
            <Button
              variant="outline"
              fullWidth
              onClick={() => navigate("/change-password")}
            >
              <FiLock className="w-4 h-4 mr-2" />
              Change Password
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
