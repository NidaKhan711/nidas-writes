'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface AuthData {
  name: string;
  email: string;
  token?: string; // Added token for authentication
}

interface LoginProps {
  onLoginSuccess: (userData: AuthData) => void; // Corrected prop name
  switchToSignin: () => void;
}

export default function Login({ onLoginSuccess, switchToSignin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

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
    setError('');
    setSuccess('');
    setIsLoading(true);

    if (!email || !password) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    try {
      // Simulate API call - replace with your actual authentication
      const response = await authenticateUser(email, password);
      
      setSuccess('Login successful! Redirecting...');
      
      // Call the success handler with user data
      onLoginSuccess({
        name: response.name,
        email: response.email,
        token: response.token // Include token if available
      });

      // Redirect after delay
      setTimeout(() => {
        router.push('/');
      }, 2000);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  // Mock authentication function - replace with real API call
  const authenticateUser = async (email: string, password: string): Promise<AuthData> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === 'user@example.com' && password === 'password123') {
          resolve({
            name: 'John Doe',
            email: email,
            token: 'mock-jwt-token-12345'
          });
        } else {
          reject(new Error('Invalid email or password'));
        }
      }, 1500);
    });
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-4 mt-4"
      id="Login"
    >
      {/* Error and Success messages remain the same */}
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
        {/* Form fields remain the same */}
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
        className="text-center text-sm text-gray-600"
      >
        Don't have an account?{' '}
        <button
          type="button"
          onClick={switchToSignin}
          className="font-medium hover:underline"
          style={{ color: '#996568' }}
          disabled={isLoading}
        >
          Sign up
        </button>
      </motion.div>
    </motion.div>
  );
}