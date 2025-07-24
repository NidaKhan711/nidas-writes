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
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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

// Types
type User = {
  name: string;
  avatar?: string;
  [key: string]: any;
};

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

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setIsLoggedIn(true);
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  // Handlers
  const handleLoginSuccess = (userData: User) => {
    const userWithAvatar = {
      ...userData,
      avatar: userData.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&background=random`
    };
    
    setUser(userWithAvatar);
    setIsLoggedIn(true);
    localStorage.setItem('user', JSON.stringify(userWithAvatar));
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
    setShowLogin(!showLogin);
  };

  // Components
  const Logo = () => (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="flex-shrink-0 flex items-center justify-center pl-8"
    >
      <Link href="/" className="text-2xl font-bold text-[#341601]">
        Nida&apos;s Writes
      </Link>
    </motion.div>
  );

  const NavLinks = ({ isMobile = false }) => (
    <>
      {NAV_ITEMS.map((item) => (
        <motion.div 
          key={item.name} 
          variants={!isMobile ? ANIMATION_VARIANTS.item : undefined}
          whileHover={isMobile ? { scale: 1.02 } : undefined}
          whileTap={isMobile ? { scale: 0.98 } : undefined}
        >
          <Link
            href={item.path}
            className={isMobile 
              ? "block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100"
              : "text-amber-950 hover:text-amber-700 px-3 py-2 rounded-md text-base font-medium transition-colors duration-300"
            }
            onClick={() => isMobile && setIsOpen(false)}
          >
            {item.name}
          </Link>
        </motion.div>
      ))}
    </>
  );

  const UserProfile = ({ isMobile = false }) => (
    <>
      {isLoggedIn ? (
        isMobile ? (
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center px-3 py-2"
          >
            <Avatar className="h-8 w-8 mr-2">
              <AvatarImage src={user?.avatar} alt={user?.name} />
              <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-gray-700">{user?.name}</span>
            <Button 
              variant="ghost" 
              onClick={() => setLogoutDialogOpen(true)}
              className="ml-auto text-red-600"
            >
              Logout
            </Button>
          </motion.div>
        ) : (
          <motion.div variants={ANIMATION_VARIANTS.item}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuItem>
                  <Link href="/profile" className="w-full">
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/settings" className="w-full">
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLogoutDialogOpen(true)}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </motion.div>
        )
      ) : (
        <motion.div 
          variants={!isMobile ? ANIMATION_VARIANTS.item : undefined}
          whileHover={isMobile ? { scale: 1.02 } : undefined}
          whileTap={isMobile ? { scale: 0.98 } : undefined}
        >
          <Button
            variant="outline"
            onClick={openAuthDialog}
            className={isMobile 
              ? "w-full px-3 py-2 rounded-md text-base font-medium text-[#6F4E37] bg-[#FDF3EB] hover:bg-[#FCECD8] mt-2"
              : "bg-[#ffedde] text-[#6F4E37] px-6 py-2 rounded-md border-2 border-[rgb(254,217,186)] text-base font-medium hover:bg-[#ffd49e] transition-colors duration-300 shadow"
            }
          >
            Sign In
          </Button>
        </motion.div>
      )}
    </>
  );

  const MobileMenuButton = () => (
    <button
      onClick={() => setIsOpen(!isOpen)}
      className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 focus:outline-none"
      aria-expanded={isOpen}
      aria-label="Toggle menu"
    >
      <svg
        className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`}
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
      <svg
        className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`}
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
    </button>
  );

  return (
    <>
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-[#FFFCF1] w-full fixed top-0 z-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Logo />

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <motion.div
                variants={ANIMATION_VARIANTS.container}
                initial="hidden"
                animate="visible"
                className="flex space-x-8"
              >
                <NavLinks />
              </motion.div>
              <UserProfile />
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <MobileMenuButton />
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={false}
          animate={isOpen ? 'open' : 'closed'}
          variants={ANIMATION_VARIANTS.mobileMenu}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white">
            <NavLinks isMobile />
            <UserProfile isMobile />
          </div>
        </motion.div>
      </motion.nav>

      {/* Authentication Dialog */}
      <Dialog open={authDialogOpen} onOpenChange={setAuthDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-center text-[#3A1700]">
              {showLogin ? 'Login' : 'Sign In'}
            </DialogTitle>
          </DialogHeader>
          {showLogin ? (
            <Login 
              onLoginSuccess={handleLoginSuccess}
              switchToSignin={switchAuthMode}
            />
          ) : (
            <Signin 
              onSigninSuccess={handleLoginSuccess} 
              switchToLogin={switchAuthMode}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Logout Confirmation Dialog */}
      <AlertDialog open={logoutDialogOpen} onOpenChange={setLogoutDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
            <AlertDialogDescription>
              You'll need to sign in again to access your account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleLogout}
              className="bg-[#996568] hover:bg-[#7a4f4f]"
            >
              Logout
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}