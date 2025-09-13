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
}

interface SigninProps {
  onSigninSuccess: (userData: AuthData) => void;
  switchToLogin: () => void;
}

export default function Signin({ onSigninSuccess, switchToLogin }: SigninProps) {
  const [name, setName] = useState('');
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
      const res = await fetch("/api/auth/user/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Signup failed');
      }

      setSuccess(data.message || 'Signup successful!');
      if (data.user) {
        onSigninSuccess(data.user);
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
    >
      {error && (
        <motion.div variants={itemVariants}>
          <Alert variant="destructive" className="bg-[#f3e9d7] border-[#996568]">
            <Terminal className="h-4 w-4 text-[#996568]" />
            <AlertTitle className="text-[#5a3e36]">Error</AlertTitle>
            <AlertDescription className="text-[#5a3e36]/80">{error}</AlertDescription>
          </Alert>
        </motion.div>
      )}

      {success && (
        <motion.div variants={itemVariants}>
          <Alert className="bg-[#f3e9d7] border-[#e8c9a7]">
            <Terminal className="h-4 w-4 text-[#5a3e36]" />
            <AlertTitle className="text-[#5a3e36]">Success</AlertTitle>
            <AlertDescription className="text-[#5a3e36]/80">{success}</AlertDescription>
          </Alert>
        </motion.div>
      )}

      <motion.form
        variants={containerVariants}
        className="space-y-4"
        onSubmit={handleSubmit}
      >
        <motion.div variants={itemVariants}>
          <label htmlFor="name" className="block text-sm font-medium text-[#5a3e36]">
            Name
          </label>
          <Input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 bg-white border-[#e8c9a7] text-[#5a3e36] focus:border-[#996568]"
            placeholder="Enter your name"
            disabled={isLoading}
            required
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <label htmlFor="email" className="block text-sm font-medium text-[#5a3e36]">
            Email
          </label>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 bg-white border-[#e8c9a7] text-[#5a3e36] focus:border-[#996568]"
            placeholder="Enter your email"
            disabled={isLoading}
            required
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <label htmlFor="password" className="block text-sm font-medium text-[#5a3e36]">
            Password
          </label>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 bg-white border-[#e8c9a7] text-[#5a3e36] focus:border-[#996568]"
            placeholder="Create a password"
            disabled={isLoading}
            required
            minLength={6}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <Button
            type="submit"
            className="w-20 bg-[#996568] hover:bg-[#b87a7d] text-white"
            disabled={isLoading}
          >
            {isLoading ? 'Signing up...' : 'Sign up'}
          </Button>
        </motion.div>
      </motion.form>

      <motion.div
        variants={itemVariants}
        className="text-center text-sm text-[#5a3e36]/80"
      >
        Already have an account?{' '}
        <button
          type="button"
          onClick={switchToLogin}
          className="font-medium hover:underline text-[#996568]"
          disabled={isLoading}
        >
          Login
        </button>
      </motion.div>
    </motion.div>
  );
}
