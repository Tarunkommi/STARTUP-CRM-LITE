import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return toast.error('Please fill in all fields');
    }

    setIsSubmitting(true);
    try {
      await login(email, password);
      toast.success('Logged in successfully');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F7F8F5] dark:bg-[#171A17] py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white dark:bg-[#212520] p-8 rounded-xl shadow-lg border border-[#D6D8D2] dark:border-[#343A35]">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-[#1C201B] dark:text-[#F4F6F2]">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4 rounded-md shadow-sm">
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                autoComplete="current-password"
                required
                className="relative block w-full appearance-none rounded-md border border-[#D6D8D2] dark:border-[#343A35] px-3 py-2 text-[#1C201B] dark:text-[#F4F6F2] bg-white dark:bg-[#171A17] placeholder-[#59635A]/60 dark:placeholder-[#B9C0B8]/50 focus:z-10 focus:border-[#50614F] dark:focus:border-[#8BAE87] focus:outline-none focus:ring-1 focus:ring-[#50614F] dark:focus:ring-[#8BAE87] sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-[#50614F] hover:bg-[#3E4C3D] dark:bg-[#8BAE87] dark:text-[#171A17] dark:hover:bg-[#9FBF9B] py-2 px-4 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-[#50614F] dark:focus:ring-[#8BAE87] focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
          
          <div className="text-center text-sm">
            <span className="text-[#59635A] dark:text-[#B9C0B8]">Don't have an account? </span>
            <Link to="/register" className="font-medium text-[#50614F] hover:text-[#3E4C3D] dark:text-[#8BAE87] dark:hover:text-[#A7B5A3]">
              Register here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
