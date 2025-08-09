'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiBook, FiHeart, FiMail, FiTwitter, FiInstagram, FiYoutube } from 'react-icons/fi';

const Footer = () => {
  const footerLinks = [
    {
      title: "Explore",
      links: [
        { name: "Wisdom Library", href: "/library", icon: <FiBook /> },
        { name: "Mind Studies", href: "/psychology", icon: <FiBook /> },
        { name: "Daily Meditations", href: "/meditations", icon: <FiHeart /> }
      ]
    },
    {
      title: "Connect",
      links: [
        { name: "Contact Us", href: "/contact", icon: <FiMail /> },
        { name: "Contributors", href: "/team", icon: <FiHeart /> },
        { name: "Submit Article", href: "/contribute", icon: <FiBook /> }
      ]
    }
  ];

  const socialLinks = [
    { icon: <FiTwitter />, href: "#" },
    { icon: <FiInstagram />, href: "#" },
    { icon: <FiYoutube />, href: "#" }
  ];

  return (
    <motion.footer 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, margin: "-50px" }}
      className="bg-[#0C0C0C] text-[#EFEFEF] pt-16 pb-8 px-4 sm:px-6 lg:px-8 border-t border-[#1A1A1A]"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-serif font-bold mb-4 text-[#C49E5C]">Mind & Meaning</h3>
            <p className="text-[#EFEFEF] opacity-80 mb-6">
              Exploring the depths of human consciousness and timeless wisdom.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ y: -3, scale: 1.1 }}
                  className="text-[#8C1C13] hover:text-[#C49E5C] text-xl transition-colors"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Links Sections */}
          {footerLinks.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-medium mb-4 border-b border-[#4C5F2A] pb-2 text-[#C49E5C]">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + linkIndex * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <Link href={link.href} className="flex items-center text-[#EFEFEF] hover:text-[#C49E5C] transition-colors opacity-80 hover:opacity-100">
                      <span className="mr-2">{link.icon}</span>
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="border-t border-[#4C5F2A] my-8 w-full"
        />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
            className="text-[#EFEFEF] text-sm mb-4 md:mb-0 opacity-70"
          >
            © {new Date().getFullYear()} Mind & Meaning. All rights reserved.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            viewport={{ once: true }}
            className="flex space-x-6"
          >
            <Link href="/privacy" className="text-[#EFEFEF] hover:text-[#C49E5C] text-sm transition-colors opacity-70 hover:opacity-100">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-[#EFEFEF] hover:text-[#C49E5C] text-sm transition-colors opacity-70 hover:opacity-100">
              Terms of Service
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;