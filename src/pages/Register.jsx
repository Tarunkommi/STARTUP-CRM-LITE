import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = formData;
    
    // Client-side validations
    if (!name || !email || !password || !confirmPassword) {
      return toast.error('Please fill in all fields');
    }
    
    if (password.length < 6) {
      return toast.error('Password must be at least 6 characters long');
    }
    
    if (password !== confirmPassword) {
      return toast.error('Passwords do not match');
    }

    setIsSubmitting(true);
    try {
      await register(name, email, password);
      toast.success('Account created successfully');
      navigate('/');
    } catch (error) {
      // Loop over our express-validator errors array if sent by the backend
      if (error.response?.data?.errors) {
        error.response.data.errors.forEach(err => toast.error(err.message));
      } else {
        toast.error(error.response?.data?.message || 'Registration failed');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F7F8F5] dark:bg-[#171A17] py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white dark:bg-[#212520] p-8 rounded-xl shadow-lg border border-[#D6D8D2] dark:border-[#343A35]">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-[#1C201B] dark:text-[#F4F6F2]">
            Create a new account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <label className="block text-sm font-medium text-[#1C201B] dark:text-[#F4F6F2] mb-1" htmlFor="name">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="relative block w-full appearance-none rounded-md border border-[#D6D8D2] dark:border-[#343A35] px-3 py-2 text-[#1C201B] dark:text-[#F4F6F2] bg-white dark:bg-[#171A17] placeholder-[#59635A]/60 dark:placeholder-[#B9C0B8]/50 focus:z-10 focus:border-[#50614F] dark:focus:border-[#8BAE87] focus:outline-none focus:ring-1 focus:ring-[#50614F] dark:focus:ring-[#8BAE87] sm:text-sm"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1C201B] dark:text-[#F4F6F2] mb-1" htmlFor="email">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full appearance-none rounded-md border border-[#D6D8D2] dark:border-[#343A35] px-3 py-2 text-[#1C201B] dark:text-[#F4F6F2] bg-white dark:bg-[#171A17] placeholder-[#59635A]/60 dark:placeholder-[#B9C0B8]/50 focus:z-10 focus:border-[#50614F] dark:focus:border-[#8BAE87] focus:outline-none focus:ring-1 focus:ring-[#50614F] dark:focus:ring-[#8BAE87] sm:text-sm"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1C201B] dark:text-[#F4F6F2] mb-1" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="relative block w-full appearance-none rounded-md border border-[#D6D8D2] dark:border-[#343A35] px-3 py-2 text-[#1C201B] dark:text-[#F4F6F2] bg-white dark:bg-[#171A17] placeholder-[#59635A]/60 dark:placeholder-[#B9C0B8]/50 focus:z-10 focus:border-[#50614F] dark:focus:border-[#8BAE87] focus:outline-none focus:ring-1 focus:ring-[#50614F] dark:focus:ring-[#8BAE87] sm:text-sm"
                placeholder="Minimum 6 characters"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1C201B] dark:text-[#F4F6F2] mb-1" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                className="relative block w-full appearance-none rounded-md border border-[#D6D8D2] dark:border-[#343A35] px-3 py-2 text-[#1C201B] dark:text-[#F4F6F2] bg-white dark:bg-[#171A17] placeholder-[#59635A]/60 dark:placeholder-[#B9C0B8]/50 focus:z-10 focus:border-[#50614F] dark:focus:border-[#8BAE87] focus:outline-none focus:ring-1 focus:ring-[#50614F] dark:focus:ring-[#8BAE87] sm:text-sm"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-[#50614F] hover:bg-[#3E4C3D] dark:bg-[#8BAE87] dark:text-[#171A17] dark:hover:bg-[#9FBF9B] py-2 px-4 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-[#50614F] dark:focus:ring-[#8BAE87] focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? 'Registering...' : 'Register'}
            </button>
          </div>
          
          <div className="text-center text-sm">
            <span className="text-[#59635A] dark:text-[#B9C0B8]">Already have an account? </span>
            <Link to="/login" className="font-medium text-[#50614F] hover:text-[#3E4C3D] dark:text-[#8BAE87] dark:hover:text-[#A7B5A3]">
              Sign in here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
