'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
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
      const res = await fetch('/api/auth/login', {
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
        // Optional: Redirect after successful login
        // router.push('/dashboard');
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
      className="space-y-4 mt-4"
      id="Login"
    >
      {error && (
        <motion.div variants={itemVariants}>
          <Alert variant="destructive">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </motion.div>
      )}

      {success && (
        <motion.div variants={itemVariants}>
          <Alert>
            <Terminal className="h-4 w-4" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        </motion.div>
      )}

      <motion.form
        variants={containerVariants}
        className="space-y-4"
        onSubmit={handleSubmit}
      >
        <motion.div variants={itemVariants}>
          <label htmlFor="email" className="block text-sm font-medium text-[#3A1700]">
            Email
          </label>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1"
            disabled={isLoading}
            required
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <label htmlFor="password" className="block text-sm font-medium text-[#3A1700]">
            Password
          </label>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1"
            disabled={isLoading}
            required
            minLength={6}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <Button
            type="submit"
            className="w-20"
            style={{ backgroundColor: '#996568' }}
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
        </motion.div>
      </motion.form>

      <motion.div
        variants={itemVariants}
        className="flex flex-col items-center text-sm text-gray-600 space-y-2"
      >
        <div>
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
        <Link 
          href="/forgot-password" 
          className="font-medium hover:underline" 
          style={{ color: '#996568' }}
        >
          Forgot password?
        </Link>
      </motion.div>
    </motion.div>
  );
}