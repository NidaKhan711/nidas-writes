'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
} from '@/components/ui/alert-dialog';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Signin from './Signin';
import Login from './Login';

interface AuthData {
  name: string;
  email?: string;
  avatar?: string;
}

interface User extends AuthData {
  id: string;
}

const NAV_ITEMS = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Blogs', path: '/blog' },
  { name: 'Contact', path: '/contact' },
];

const ANIMATION_VARIANTS = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  },
  item: {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { stiffness: 100 },
    },
  },
  mobileMenu: {
    open: { opacity: 1, height: 'auto' },
    closed: { opacity: 0, height: 0 },
  },
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      if (typeof window !== 'undefined') {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          try {
            const userData = JSON.parse(storedUser) as User;
            setUser({
              ...userData,
              avatar: userData.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&background=random`
            });
            setIsLoggedIn(true);
          } catch (error) {
            console.error('Error parsing user data:', error);
            localStorage.removeItem('user');
          }
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const generateId = () => {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  };

  const handleAuthSuccess = (userData: AuthData) => {
    const userWithDefaults: User = {
      id: generateId(),
      name: userData.name,
      email: userData.email,
      avatar: userData.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&background=random`
    };
    
    setUser(userWithDefaults);
    setIsLoggedIn(true);
    localStorage.setItem('user', JSON.stringify(userWithDefaults));
    setAuthDialogOpen(false);
    setIsOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('user');
    setLogoutDialogOpen(false);
  };

  const openAuthDialog = () => {
    setAuthDialogOpen(true);
    setIsOpen(false);
  };

  const switchAuthMode = () => {
    setShowLogin(prev => !prev);
  };

  if (isLoading) {
    return <div className="h-16 bg-[#fffcf1]"></div>;
  }

  const logoutButton = async () => {
    try {
      const res = await fetch('/api/auth/user/logout', {
        method: 'POST',
      });

      if (!res.ok) {
        throw new Error('Failed to logout');
      }

      const data = await res.json();
      console.log(data.message);
      handleLogout();
    } catch (error) {
      console.error('Logout failed:', error);
      alert('Logout failed. Please try again.');
    }
  };

  return (
    <>
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-[#fffcf1] w-full fixed top-0 z-20 shadow-sm border-b border-[#e8c9a7]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex-shrink-0 flex items-center"
            >
              <Link href="/" className="text-2xl font-bold text-[#5a3e36]">
                Nida&apos;s Writes
              </Link>
            </motion.div>

            <div className="hidden md:flex items-center space-x-8">
              <motion.div
                variants={ANIMATION_VARIANTS.container}
                initial="hidden"
                animate="visible"
                className="flex space-x-8"
              >
                {NAV_ITEMS.map((item) => (
                  <motion.div key={item.name} variants={ANIMATION_VARIANTS.item}>
                    <Link
                      href={item.path}
                      className="text-[#5a3e36] hover:text-[#946b6d] px-3 py-2 rounded-md text-base font-medium transition-colors duration-300"
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </motion.div>

              {isLoggedIn ? (
                <motion.div variants={ANIMATION_VARIANTS.item}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:bg-[#f3e9d7]">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={user?.avatar} alt={user?.name || 'User'} />
                          <AvatarFallback className="bg-[#996568] text-white">
                            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 bg-white border border-[#e8c9a7]" align="end" forceMount>
                      <DropdownMenuItem asChild className="hover:bg-[#f3e9d7] text-[#5a3e36]">
                        <Link href="/profile" className="w-full">
                          Profile
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild className="hover:bg-[#f3e9d7] text-[#5a3e36]">
                        <Link href="/settings" className="w-full">
                          Settings
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => setLogoutDialogOpen(true)}
                        className="text-[#996568] hover:bg-[#f3e9d7] focus:text-[#996568]"
                      >
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </motion.div>
              ) : (
                <motion.div variants={ANIMATION_VARIANTS.item}>
                  <Button
                    variant="outline"
                    onClick={openAuthDialog}
                    className="bg-[#996568] text-white px-6 py-2 rounded-md border-2 border-[#b87a7d] text-base font-medium hover:bg-[#b87a7d] transition-colors duration-300 shadow"
                  >
                    Sign In
                  </Button>
                </motion.div>
              )}
            </div>

            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-[#5a3e36] hover:text-[#996568] focus:outline-none"
                aria-expanded={isOpen}
                aria-label="Toggle menu"
              >
                {isOpen ? (
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        <motion.div
          initial={false}
          animate={isOpen ? 'open' : 'closed'}
          variants={ANIMATION_VARIANTS.mobileMenu}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg border-t border-[#e8c9a7]">
            {NAV_ITEMS.map((item) => (
              <motion.div 
                key={item.name}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href={item.path}
                  className="block px-3 py-2 text-base font-medium text-[#5a3e36] hover:text-[#996568] hover:bg-[#f3e9d7] rounded-md"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}

            {isLoggedIn ? (
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center px-3 py-2 space-x-3"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.avatar} alt={user?.name || 'User'} />
                  <AvatarFallback className="bg-[#996568] text-white">
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </AvatarFallback>
                </Avatar>
                <span className="text-[#5a3e36] flex-grow">{user?.name}</span>
                <Button 
                  variant="ghost" 
                  onClick={() => setLogoutDialogOpen(true)}
                  className="text-[#996568] hover:bg-[#f3e9d7]"
                >
                  Logout
                </Button>
              </motion.div>
            ) : (
              <motion.div 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="outline"
                  onClick={openAuthDialog}
                  className="w-full px-3 py-2 rounded-md text-base font-medium text-white bg-[#996568] hover:bg-[#b87a7d] border border-[#b87a7d]"
                >
                  Sign In
                </Button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.nav>

      <Dialog open={authDialogOpen} onOpenChange={setAuthDialogOpen}>
        <DialogContent className="sm:max-w-[425px] bg-white border border-[#e8c9a7]">
          <DialogHeader>
            <DialogTitle className="text-center text-[#5a3e36]">
              {showLogin ? 'Login' : 'Create Account'}
            </DialogTitle>
          </DialogHeader>
          {showLogin ? (
            <Login 
              onLoginSuccess={handleAuthSuccess}
              switchToSignin={switchAuthMode}
            />
          ) : (
            <Signin 
              onSigninSuccess={handleAuthSuccess} 
              switchToLogin={switchAuthMode}
            />
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog open={logoutDialogOpen} onOpenChange={setLogoutDialogOpen}>
        <AlertDialogContent className="bg-white border border-[#e8c9a7]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-[#5a3e36]">Confirm Logout</AlertDialogTitle>
            <AlertDialogDescription className="text-[#5a3e36]/80">
              You&apos;ll need to sign in again to access your account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-white text-[#5a3e36] border border-[#e8c9a7] hover:bg-[#f3e9d7]">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={logoutButton}
              className="bg-[#996568] hover:bg-[#b87a7d] text-white"
            >
              Logout
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}