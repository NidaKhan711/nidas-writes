'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiHome, FiUser, FiBookOpen, FiMail, FiHeart } from 'react-icons/fi';

const Footer = () => {
  const navLinks = [
    { name: "Home", href: "/", icon: <FiHome /> },
    { name: "About", href: "/about", icon: <FiUser /> },
    { name: "Blog", href: "/blog", icon: <FiBookOpen /> },
    { name: "Contact", href: "/contact", icon: <FiMail /> },
    { name: "Donate", href: "/donate", icon: <FiHeart /> },
  ];

  return (
    <motion.footer 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, margin: "-50px" }}
      className="bg-[#fffcf1] text-[#5a3e36] pt-12 pb-6 px-4 sm:px-6 lg:px-8 border-t border-[#e8c9a7]"
    >
      <div className="max-w-6xl mx-auto text-center">
        {/* Brand / Title */}
        <motion.h3 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl font-serif font-bold mb-4 text-[#996568]"
        >
          Mindora
        </motion.h3>

        {/* Navigation Links */}
        <motion.ul 
          className="flex flex-wrap justify-center gap-6 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {navLinks.map((link) => (
            <motion.li
              key={link.name}
              whileHover={{ y: -2, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link 
                href={link.href} 
                className="flex items-center gap-2 text-[#5a3e36] hover:text-[#996568] transition-colors text-sm md:text-base"
              >
                {link.icon}
                {link.name}
              </Link>
            </motion.li>
          ))}
        </motion.ul>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="border-t border-[#e8c9a7] my-4 w-full"
        />

        {/* Copyright */}
        <p className="text-xs md:text-sm text-[#5a3e36]/80">
          © {new Date().getFullYear()}   Mindora. All rights reserved.
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;