// components/Login.jsx
'use client';


import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';
import { useRouter } from 'next/navigation';


interface LoginProps {
  onSigninSuccess: (userData: { name: string; email: string }) => void;
  switchToLogin: () => void;
}


export default function Login({ onSigninSuccess, switchToLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Basic validation
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    // Simulate successful login
    setSuccess('Login successful! Redirecting...');
    setTimeout(() => {
      router.push('/');
      // You might want to close the dialog here if it's open
    }, 2000);
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-4 mt-4"
      id='Login'
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
          />
        </motion.div>

        <motion.div variants={itemVariants} className="text-right">
          <Link
            href="/forgot-password"
            className="text-sm font-medium hover:underline"
            style={{ color: '#996568' }}
          >
            Forgot password?
          </Link>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Button
            type="submit"
            className="w-20"
            style={{ backgroundColor: '#996568' }}
          >
            Login
          </Button>
        </motion.div>
      </motion.form>

      <motion.div
        variants={itemVariants}
        className="text-center text-sm text-gray-600"
      >
        Don't have an account?{' '}
        <Link
          onClick={switchToLogin}
          href="/Sign"
          className="font-medium hover:underline"
          style={{ color: '#996568' }}
        >
          Sign up
        </Link>
      </motion.div>
    </motion.div>
  );
}