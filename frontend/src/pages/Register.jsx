import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { FiUser, FiMail, FiLock, FiCheck, FiAlertCircle } from 'react-icons/fi';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        acceptTerms: false
    });
    
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    
    const { register, error: authError } = useAuth();
    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        } else if (formData.name.length < 2) {
            newErrors.name = 'Name must be at least 2 characters';
        }
        
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }
        
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
            newErrors.password = 'Password must contain uppercase, lowercase, and numbers';
        }
        
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }
        
        if (!formData.acceptTerms) {
            newErrors.acceptTerms = 'You must accept the terms and conditions';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }
        
        setLoading(true);
        
        try {
            const result = await register({
                name: formData.name,
                email: formData.email,
                password: formData.password
            });
            
            if (result.success) {
                navigate('/dashboard');
            }
        } catch (err) {
            console.error('Registration error:', err);
        } finally {
            setLoading(false);
        }
    };

    const passwordRequirements = [
        { label: 'At least 8 characters', met: formData.password.length >= 8 },
        { label: 'Contains uppercase letter', met: /[A-Z]/.test(formData.password) },
        { label: 'Contains lowercase letter', met: /[a-z]/.test(formData.password) },
        { label: 'Contains number', met: /\d/.test(formData.password) }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
            <div className="max-w-2xl w-full">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-4">
                        <FiUser className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900">Create Your Account</h1>
                    <p className="text-gray-600 mt-2">
                        Join MediTracker and take control of your health journey
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Registration Form */}
                    <Card className="p-8">
                        {(authError || Object.keys(errors).length > 0) && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                                {authError && (
                                    <p className="text-red-700 flex items-center">
                                        <FiAlertCircle className="w-5 h-5 mr-2" />
                                        {authError}
                                    </p>
                                )}
                                {Object.keys(errors).map(key => (
                                    errors[key] && <p key={key} className="text-red-700 text-sm mt-1">{errors[key]}</p>
                                ))}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <Input
                                label="Full Name *"
                                name="name"
                                type="text"
                                placeholder="John Doe"
                                value={formData.name}
                                onChange={handleInputChange}
                                error={errors.name}
                                icon={<FiUser className="w-5 h-5 text-gray-400" />}
                                required
                            />

                            <Input
                                label="Email Address *"
                                name="email"
                                type="email"
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={handleInputChange}
                                error={errors.email}
                                icon={<FiMail className="w-5 h-5 text-gray-400" />}
                                required
                            />

                            <Input
                                label="Password *"
                                name="password"
                                type="password"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleInputChange}
                                error={errors.password}
                                icon={<FiLock className="w-5 h-5 text-gray-400" />}
                                required
                            />

                            <Input
                                label="Confirm Password *"
                                name="confirmPassword"
                                type="password"
                                placeholder="••••••••"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                error={errors.confirmPassword}
                                icon={<FiCheck className="w-5 h-5 text-gray-400" />}
                                required
                            />

                            <div className="flex items-start">
                                <input
                                    type="checkbox"
                                    id="acceptTerms"
                                    name="acceptTerms"
                                    checked={formData.acceptTerms}
                                    onChange={handleInputChange}
                                    className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <label htmlFor="acceptTerms" className="ml-2 text-sm text-gray-700">
                                    I agree to the{' '}
                                    <a href="/terms" className="text-blue-600 hover:text-blue-800">
                                        Terms of Service
                                    </a>{' '}
                                    and{' '}
                                    <a href="/privacy" className="text-blue-600 hover:text-blue-800">
                                        Privacy Policy
                                    </a>
                                </label>
                            </div>
                            {errors.acceptTerms && (
                                <p className="text-red-600 text-sm">{errors.acceptTerms}</p>
                            )}

                            <Button
                                type="submit"
                                variant="primary"
                                size="large"
                                loading={loading}
                                fullWidth
                            >
                                Create Account
                            </Button>

                            <p className="text-center text-gray-600">
                                Already have an account?{' '}
                                <Link
                                    to="/login"
                                    className="font-medium text-blue-600 hover:text-blue-800"
                                >
                                    Sign in
                                </Link>
                            </p>
                        </form>
                    </Card>

                    {/* Password Requirements & Benefits */}
                    <div className="space-y-6">
                        {/* Password Requirements */}
                        <Card>
                            <h3 className="font-bold text-gray-900 mb-4">Password Requirements</h3>
                            <div className="space-y-2">
                                {passwordRequirements.map((req, index) => (
                                    <div key={index} className="flex items-center">
                                        <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-3 ${req.met
                                                ? 'bg-green-100 text-green-600'
                                                : 'bg-gray-100 text-gray-400'
                                            }`}>
                                            {req.met ? '✓' : '•'}
                                        </div>
                                        <span className={`text-sm ${req.met ? 'text-gray-700' : 'text-gray-500'}`}>
                                            {req.label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        {/* Benefits */}
                        <Card>
                            <h3 className="font-bold text-gray-900 mb-4">Why Join MediTracker?</h3>
                            <ul className="space-y-3">
                                <li className="flex items-start">
                                    <div className="bg-blue-100 p-1 rounded mr-3">
                                        <FiCheck className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <span className="text-gray-700">AI-powered medication reminders</span>
                                </li>
                                <li className="flex items-start">
                                    <div className="bg-blue-100 p-1 rounded mr-3">
                                        <FiCheck className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <span className="text-gray-700">Health insights and analytics</span>
                                </li>
                                <li className="flex items-start">
                                    <div className="bg-blue-100 p-1 rounded mr-3">
                                        <FiCheck className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <span className="text-gray-700">Emergency contact notifications</span>
                                </li>
                                <li className="flex items-start">
                                    <div className="bg-blue-100 p-1 rounded mr-3">
                                        <FiCheck className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <span className="text-gray-700">Rewards for consistent adherence</span>
                                </li>
                                <li className="flex items-start">
                                    <div className="bg-blue-100 p-1 rounded mr-3">
                                        <FiCheck className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <span className="text-gray-700">Export reports for healthcare providers</span>
                                </li>
                            </ul>
                        </Card>

                        {/* Security Note */}
                        <div className="text-center text-sm text-gray-500">
                            <p>🔒 Your data is encrypted and secure</p>
                            <p className="mt-1">HIPAA compliant • End-to-end encryption</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;