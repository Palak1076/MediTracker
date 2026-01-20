import React, { createContext, useState, useContext, useEffect } from 'react';
import { authAPI } from '../api/auth';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        
        if (token && storedUser) {
            try {
                const userData = JSON.parse(storedUser);
                setUser(userData);
                
                // Verify token is still valid
                await authAPI.getProfile();
            } catch (err) {
                // Token is invalid, clear storage
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                setUser(null);
            }
        }
        setLoading(false);
    };

    const login = async (email, password) => {
        setError('');
        try {
            const data = await authAPI.login({ email, password });
            setUser(data.user);
            return { success: true, data };
        } catch (err) {
            const errorMsg = err.response?.data?.error || 'Login failed. Please check your credentials.';
            setError(errorMsg);
            return { success: false, error: errorMsg };
        }
    };

    const register = async (userData) => {
    setError('');
    try {
        const res = await authAPI.register(userData);

        // ✅ SAVE TOKEN
        localStorage.setItem('token', res.token);

        // ✅ SET USER STATE
        setUser(res.user);

        return { success: true };
    } catch (err) {
        const errorMsg =
            err.response?.data?.error || 'Registration failed. Please try again.';
        setError(errorMsg);
        return { success: false, error: errorMsg };
    }
};


    const logout = () => {
        authAPI.logout();
        setUser(null);
        setError('');
        window.location.href = '/login';
    };

    const updateProfile = async (userData) => {
        try {
            const data = await authAPI.updateProfile(userData);
            setUser(data.user);
            localStorage.setItem('user', JSON.stringify(data.user));
            return { success: true, data };
        } catch (err) {
            const errorMsg = err.response?.data?.error || 'Update failed';
            return { success: false, error: errorMsg };
        }
    };

    const value = {
        user,
        login,
        register,
        setUser,
        logout,
        updateProfile,
        loading,
        error,
        setError
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};