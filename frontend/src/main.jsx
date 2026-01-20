import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App.jsx';
import './index.css';
import './App.css';
import { NotificationProvider } from "./context/NotificationContext.jsx";
createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <ThemeProvider>
      <BrowserRouter>
      <NotificationProvider>
        <App />
      </NotificationProvider>
       
      </BrowserRouter>
    </ThemeProvider>
  </GoogleOAuthProvider>
);
