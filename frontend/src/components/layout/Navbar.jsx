
// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
// import { useTheme } from "../../context/ThemeContext";
// import { useNotifications } from "../../context/NotificationContext";
// import { FiHome, FiUser, FiLogOut, FiMenu, FiX, FiBell, FiSun, FiMoon } from "react-icons/fi";
// import { FaPills } from "react-icons/fa";
// import { BsRobot } from "react-icons/bs";

// const Navbar = () => {
//   const { user, logout } = useAuth();
//   const { darkMode, toggleTheme } = useTheme();
//   const { alerts } = useNotifications();
//   const navigate = useNavigate();

//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [showNotifications, setShowNotifications] = useState(false);

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   const navLinks = [
//     { to: "/", label: "Dashboard" },
//     { to: "/medications", label: "Medications" },
//     { to: "/chatbot", label: "AI Assistant" },
//     { to: "/profile", label: "Profile" },
//   ];

//   return (
//     <nav className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16 items-center">

//           {/* Logo */}
//           <Link to="/" className="flex items-center space-x-3">
//             <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
//               <FaPills className="w-6 h-6 text-white" />
//             </div>
//             <div>
//               <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
//                 MediTracker
//               </h1>
//             </div>
//           </Link>

//           {/* Desktop Nav */}
//           <div className="hidden md:flex items-center space-x-2">
//             {navLinks.map(link => (
//               <Link key={link.to} to={link.to} className="px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
//                 {link.label}
//               </Link>
//             ))}

//             {/* Dark mode toggle */}
//             <button onClick={toggleTheme} className="p-2 rounded-lg">
//               {darkMode ? <FiSun className="text-yellow-400" /> : <FiMoon />}
//             </button>

//             {/* Notifications */}
//             <div className="relative">
//               <button
//                 onClick={() => setShowNotifications(!showNotifications)}
//                 className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 relative"
//               >
//                 <FiBell className="w-5 h-5" />
//                 {alerts.length > 0 && (
//                   <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs h-4 w-4 rounded-full flex items-center justify-center">
//                     {alerts.length}
//                   </span>
//                 )}
//               </button>

//               {showNotifications && (
//                 <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden z-50">
//                   {alerts.length === 0 && <div className="px-4 py-2 text-gray-500 text-sm">No alerts</div>}
//                   {alerts.map(alert => (
//                     <div
//                       key={alert.id}
//                       className={`px-4 py-2 border-b last:border-0 text-sm ${
//                         alert.type === "success"
//                           ? "text-green-700 dark:text-green-400"
//                           : alert.type === "warning"
//                           ? "text-yellow-700 dark:text-yellow-400"
//                           : alert.type === "error"
//                           ? "text-red-700 dark:text-red-400"
//                           : "text-gray-700 dark:text-gray-300"
//                       }`}
//                     >
//                       {alert.message}
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Logout */}
//             {user && (
//               <button onClick={handleLogout} className="ml-3 px-4 py-2 text-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-gray-800">
//                 Logout
//               </button>
//             )}
//           </div>

//           {/* Mobile Menu */}
//           <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 rounded-lg">
//             {isMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
//           </button>
//         </div>

//         {isMenuOpen && (
//           <div className="md:hidden bg-white dark:bg-gray-900 border-t dark:border-gray-700">
//             {navLinks.map(link => (
//               <Link key={link.to} to={link.to} onClick={() => setIsMenuOpen(false)} className="block px-6 py-3">
//                 {link.label}
//               </Link>
//             ))}
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
// import { useTheme } from "../../context/ThemeContext";
// import { useNotifications } from "../../context/NotificationContext";
// import { FiHome, FiUser, FiLogOut, FiMenu, FiX, FiBell, FiSun, FiMoon } from "react-icons/fi";
// import { FaPills } from "react-icons/fa";

// const Navbar = () => {
//   const { user, logout } = useAuth();
//   const { darkMode, toggleTheme } = useTheme();
//   const { alerts } = useNotifications();
//   const navigate = useNavigate();

//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [showNotifications, setShowNotifications] = useState(false);

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   const navLinks = [
//     { to: "/", label: "Dashboard" },
//     { to: "/medications", label: "Medications" },
//     { to: "/chatbot", label: "AI Assistant" },
//     { to: "/profile", label: "Profile" },
//   ];

//   // ✅ Apply dark mode globally
//   useEffect(() => {
//     document.documentElement.classList.toggle("dark", darkMode);
//   }, [darkMode]);

//   return (
//     <nav className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16 items-center">

//           {/* Logo */}
//           <Link to="/" className="flex items-center space-x-3">
//             <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
//               <FaPills className="w-6 h-6 text-white" />
//             </div>
//             <div>
//               <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
//                 MediTracker
//               </h1>
//               <p className="text-xs text-gray-500 dark:text-gray-400">
//                 Your Health Companion
//               </p>
//             </div>
//           </Link>

//           {/* Desktop Nav */}
//           <div className="hidden md:flex items-center space-x-2">
//             {navLinks.map(link => (
//               <Link
//                 key={link.to}
//                 to={link.to}
//                 className="flex items-center px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
//               >
//                 {link.label}
//               </Link>
//             ))}

//             {/* Dark mode toggle */}
//             <button
//               onClick={toggleTheme}
//               className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
//             >
//               {darkMode ? <FiSun className="w-5 h-5 text-yellow-400" /> : <FiMoon className="w-5 h-5" />}
//             </button>

//             {/* Notifications */}
//             <div className="relative">
//               <button
//                 onClick={() => setShowNotifications(!showNotifications)}
//                 className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 relative"
//               >
//                 <FiBell className="w-5 h-5" />
//                 {alerts?.length > 0 && (
//                   <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs h-4 w-4 rounded-full flex items-center justify-center">
//                     {alerts.length}
//                   </span>
//                 )}
//               </button>

//               {showNotifications && (
//                 <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden z-50">
//                   {(!alerts || alerts.length === 0) && (
//                     <div className="px-4 py-2 text-gray-500 text-sm">No alerts</div>
//                   )}
//                   {alerts?.map(alert => (
//                     <div
//                       key={alert.id}
//                       className={`px-4 py-2 border-b last:border-0 text-sm ${
//                         alert.type === "success"
//                           ? "text-green-700 dark:text-green-400"
//                           : alert.type === "warning"
//                           ? "text-yellow-700 dark:text-yellow-400"
//                           : alert.type === "error"
//                           ? "text-red-700 dark:text-red-400"
//                           : "text-gray-700 dark:text-gray-300"
//                       }`}
//                     >
//                       {alert.message}
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Logout */}
//             {user && (
//               <button
//                 onClick={handleLogout}
//                 className="ml-3 px-4 py-2 text-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-gray-800 transition"
//               >
//                 Logout
//               </button>
//             )}
//           </div>

//           {/* Mobile Menu */}
//           <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 rounded-lg">
//             {isMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
//           </button>
//         </div>

//         {isMenuOpen && (
//           <div className="md:hidden bg-white dark:bg-gray-900 border-t dark:border-gray-700">
//             {navLinks.map(link => (
//               <Link
//                 key={link.to}
//                 to={link.to}
//                 onClick={() => setIsMenuOpen(false)}
//                 className="block px-6 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
//               >
//                 {link.label}
//               </Link>
//             ))}
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { useNotifications } from "../../context/NotificationContext";
import { FiHome, FiUser, FiLogOut, FiMenu, FiX, FiBell, FiSun, FiMoon } from "react-icons/fi";
import { FaPills } from "react-icons/fa";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { darkMode, toggleTheme } = useTheme();
  const { alerts } = useNotifications();
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navLinks = [
    { to: "/", label: "Dashboard" },
    { to: "/medications", label: "Medications" },
    { to: "/chatbot", label: "AI Assistant" },
    { to: "/profile", label: "Profile" },
  ];

  return (
    <nav className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
              <FaPills className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                MediTracker
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Your Health Companion
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-3">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className="px-4 py-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                {link.label}
              </Link>
            ))}

            {/* Dark mode toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              {darkMode ? <FiSun className="w-5 h-5 text-yellow-400" /> : <FiMoon className="w-5 h-5 text-gray-700 dark:text-gray-200" />}
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 relative transition"
              >
                <FiBell className="w-5 h-5" />
                {alerts?.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs h-4 w-4 rounded-full flex items-center justify-center">
                    {alerts.length}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden z-50">
                  {(!alerts || alerts.length === 0) && (
                    <div className="px-4 py-2 text-gray-500 dark:text-gray-400 text-sm">No alerts</div>
                  )}
                  {alerts?.map(alert => (
                    <div
                      key={alert.id}
                      className={`px-4 py-2 border-b last:border-0 text-sm ${
                        alert.type === "success"
                          ? "text-green-700 dark:text-green-400"
                          : alert.type === "warning"
                          ? "text-yellow-700 dark:text-yellow-400"
                          : alert.type === "error"
                          ? "text-red-700 dark:text-red-400"
                          : "text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {alert.message}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Logout */}
            {user && (
              <button
                onClick={handleLogout}
                className="ml-3 px-4 py-2 text-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-gray-800 transition"
              >
                Logout
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            {isMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-900 border-t dark:border-gray-700">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsMenuOpen(false)}
                className="block px-6 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
