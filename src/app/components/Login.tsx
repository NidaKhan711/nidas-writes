'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

interface AuthData {
  name: string;
  email: string;
  token?: string;
}

interface LoginProps {
  onLoginSuccess: (userData: AuthData) => void;
  switchToSignin: () => void;
}

export default function Login({ onLoginSuccess, switchToSignin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const res = await fetch('/api/auth/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Login failed');
      }

      if (data.token) {
        localStorage.setItem('token', data.token);
      }

      setSuccess(data.message || 'Login successful!');
      if (data.user) {
        onLoginSuccess(data.user);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-6 mt-6"
      id="Login"
    >
      {error && (
        <motion.div variants={itemVariants}>
          <Alert variant="destructive" className="bg-[#f3e9d7] border-[#996568] rounded-md">
            <Terminal className="h-4 w-4 text-[#996568]" />
            <AlertTitle className="text-[#5a3e36] font-bold">Error</AlertTitle>
            <AlertDescription className="text-[#5a3e36]/80">{error}</AlertDescription>
          </Alert>
        </motion.div>
      )}

      {success && (
        <motion.div variants={itemVariants}>
          <Alert className="bg-[#f3e9d7] border-[#e8c9a7] rounded-md">
            <Terminal className="h-4 w-4 text-[#5a3e36]" />
            <AlertTitle className="text-[#5a3e36] font-bold">Success</AlertTitle>
            <AlertDescription className="text-[#5a3e36]/80">{success}</AlertDescription>
          </Alert>
        </motion.div>
      )}

      <motion.form
        variants={containerVariants}
        className="space-y-6 font-serif"
        onSubmit={handleSubmit}
      >
        <motion.div variants={itemVariants}>
          <label htmlFor="email" className="block text-sm font-medium" style={{ color: '#5a3e36' }}>
            Email
          </label>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 bg-transparent border-b-2 border-[#d3c6b6] text-[#5a3e36] focus:outline-none focus:border-[#996568] transition-all"
            disabled={isLoading}
            required
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <label htmlFor="password" className="block text-sm font-medium" style={{ color: '#5a3e36' }}>
            Password
          </label>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 bg-transparent border-b-2 border-[#d3c6b6] text-[#5a3e36] focus:outline-none focus:border-[#996568] transition-all"
            disabled={isLoading}
            required
            minLength={6}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <Button
            type="submit"
            className="w-full px-8 py-4 rounded-md font-bold transition-all duration-300 disabled:opacity-50"
            style={{
              color: '#fffcf1',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              background: 'linear-gradient(to right, #996568, #b87a7d)'
            }}
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
        </motion.div>
      </motion.form>

      <motion.div
        variants={itemVariants}
        className="flex flex-col items-center text-sm space-y-2 font-serif mt-6"
      >
        <div className="text-[#5a3e36]/80">
          Don&apos;t have an account?{' '}
          <button
            type="button"
            onClick={switchToSignin}
            className="font-medium hover:underline"
            style={{ color: '#996568' }}
            disabled={isLoading}
          >
            Sign up
          </button>
        </div>
        
      </motion.div>
    </motion.div>
  );
}