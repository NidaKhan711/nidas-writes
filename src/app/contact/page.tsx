"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
import emailjs from '@emailjs/browser';

export default function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  // Define social media links with their icons and URLs
  const socialLinks = [
    {
      icon: Facebook,
      href: "https://www.facebook.com", // Replace with your Facebook profile URL
    },
    {
      icon: Twitter,
      href: "https://www.twitter.com/your-username", // Replace with your Twitter profile URL
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/_nidabatool/", // Replace with your Instagram profile URL
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/nida-batool-6a5599312/", // Replace with your LinkedIn profile URL
    },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("Sending...");

    // EmailJS integration
    emailjs
      .sendForm(
        'service_qe8s487', // Replace with your EmailJS Service ID
        'template_kteuw2x', // Replace with your EmailJS Template ID
        e.currentTarget,
        'TI60_DAjjXZ5CCnSz' // Replace with your EmailJS Public Key
      )
      .then(
        (result) => {
          console.log('SUCCESS!', result.text);
          setStatus("Message sent successfully!");
          setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
        },
        (error) => {
          console.log('FAILED...', error.text);
          setStatus("Failed to send message. Please try again.");
        }
      );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f6f2] via-[#f7f3ed] to-[#f4ebe1] text-[#4a3930] px-6 py-12 mt-12">
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;500;600&display=swap');`}
      </style>
      
      {/* Header Section */}
      <div className="text-center mb-12">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-extrabold mb-4"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Get in Touch
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg text-[#4a3930]/70 max-w-2xl mx-auto font-medium"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          We&apos;d love to hear from you. Let&apos;s start a conversation and build something amazing together.
        </motion.p>
      </div>

      <div className="flex flex-col lg:flex-row gap-10 max-w-6xl mx-auto">
        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="lg:w-2/5 bg-white rounded-2xl p-8 shadow-xl h-fit border border-gray-100"
        >
          <h3 className="text-2xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>Our Details</h3>
          
          <div className="space-y-8">
            <div className="flex items-start">
              <div className="bg-[#f0e8dd] p-4 rounded-full mr-4 text-[#8a6a6a]">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-semibold text-lg">Email Address</h4>
                <p className="text-[#4a3930]/70">nida711711@gmail.com</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-[#f0e8dd] p-4 rounded-full mr-4 text-[#8a6a6a]">
                <Phone className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-semibold text-lg">Phone Number</h4>
                <p className="text-[#4a3930]/70">03100041834</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-[#f0e8dd] p-4 rounded-full mr-4 text-[#8a6a6a]">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-semibold text-lg">Our Location</h4>
                <p className="text-[#4a3930]/70">Punjab, Pakistan</p>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <h4 className="font-semibold text-lg mb-4">Follow Our Journey</h4>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  whileHover={{ scale: 1.1, y: -3 }}
                  className="bg-[#f0e8dd] p-3 rounded-full cursor-pointer text-[#8a6a6a] transition-colors hover:bg-[#e4ddd4]"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <link.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="lg:w-3/5 bg-white rounded-2xl p-8 shadow-xl border border-gray-100"
        >
          <h3 className="text-2xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>Send us a Message</h3>
          
          <form onSubmit={handleSubmit} className="space-y-6" style={{ fontFamily: "'Inter', sans-serif" }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-[#4a3930]/90 font-medium">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-3 rounded-lg border border-[#d9c7b4] bg-[#fdfaf5] text-[#4a3930] focus:ring-2 focus:ring-[#8a6a6a] outline-none transition-all"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block mb-2 text-[#4a3930]/90 font-medium">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-3 rounded-lg border border-[#d9c7b4] bg-[#fdfaf5] text-[#4a3930] focus:ring-2 focus:ring-[#8a6a6a] outline-none transition-all"
                  placeholder="Your email"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-[#4a3930]/90 font-medium">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg border border-[#d9c7b4] bg-[#fdfaf5] text-[#4a3930] focus:ring-2 focus:ring-[#8a6a6a] outline-none transition-all"
                  placeholder="Your phone number"
                />
              </div>

              <div>
                <label className="block mb-2 text-[#4a3930]/90 font-medium">Subject</label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg border border-[#d9c7b4] bg-[#fdfaf5] text-[#4a3930] focus:ring-2 focus:ring-[#8a6a6a] outline-none transition-all"
                >
                  <option value="">Select a subject</option>
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Collaboration">Collaboration</option>
                  <option value="Support">Support</option>
                  <option value="Feedback">Feedback</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block mb-2 text-[#4a3930]/90 font-medium">Message *</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full p-3 rounded-lg border border-[#d9c7b4] bg-[#fdfaf5] text-[#4a3930] focus:ring-2 focus:ring-[#8a6a6a] outline-none transition-all"
                placeholder="Your message..."
              ></textarea>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3.5 bg-gradient-to-r from-[#8a6a6a] to-[#b38586] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
            >
              Send Message
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </motion.button>
          </form>

          {status && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`mt-6 text-center font-medium ${status.includes("successfully") ? "text-green-600" : status.includes("Sending") ? "text-blue-600" : "text-red-600"}`}
            >
              {status}
            </motion.p>
          )}
        </motion.div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#f9e4e6] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-[#e4ddf9] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-20 left-1/4 w-72 h-72 bg-[#f9f1e4] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
    </div>
  );
}