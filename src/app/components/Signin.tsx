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
      const res = await fetch("/api/auth/signup", {
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
          <Alert variant="destructive" className="bg-[#2A1A1A] border-[#8C1C13]">
            <Terminal className="h-4 w-4" />
            <AlertTitle className="text-[#EFEFEF]">Error</AlertTitle>
            <AlertDescription className="text-[#B0B0B0]">{error}</AlertDescription>
          </Alert>
        </motion.div>
      )}

      {success && (
        <motion.div variants={itemVariants}>
          <Alert className="bg-[#1A2A1A] border-[#4C5F2A]">
            <Terminal className="h-4 w-4 text-[#C49E5C]" />
            <AlertTitle className="text-[#EFEFEF]">Success</AlertTitle>
            <AlertDescription className="text-[#B0B0B0]">{success}</AlertDescription>
          </Alert>
        </motion.div>
      )}

      <motion.form
        variants={containerVariants}
        className="space-y-4"
        onSubmit={handleSubmit}
      >
        <motion.div variants={itemVariants}>
          <label htmlFor="name" className="block text-sm font-medium text-[#EFEFEF]">
            Name
          </label>
          <Input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 bg-[#1A1A1A] border-[#2A2A2A] text-[#EFEFEF] focus:border-[#C49E5C]"
            disabled={isLoading}
            required
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <label htmlFor="email" className="block text-sm font-medium text-[#EFEFEF]">
            Email
          </label>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 bg-[#1A1A1A] border-[#2A2A2A] text-[#EFEFEF] focus:border-[#C49E5C]"
            disabled={isLoading}
            required
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <label htmlFor="password" className="block text-sm font-medium text-[#EFEFEF]">
            Password
          </label>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 bg-[#1A1A1A] border-[#2A2A2A] text-[#EFEFEF] focus:border-[#C49E5C]"
            disabled={isLoading}
            required
            minLength={6}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <Button
            type="submit"
            className="w-20 bg-[#4C5F2A] hover:bg-[#5a6f33] text-[#EFEFEF]"
            disabled={isLoading}
          >
            {isLoading ? 'Signing up...' : 'Sign up'}
          </Button>
        </motion.div>
      </motion.form>

      <motion.div
        variants={itemVariants}
        className="text-center text-sm text-[#B0B0B0]"
      >
        Already have an account?{' '}
        <button
          type="button"
          onClick={switchToLogin}
          className="font-medium hover:underline text-[#C49E5C]"
          disabled={isLoading}
        >
          Login
        </button>
      </motion.div>
    </motion.div>
  );
}