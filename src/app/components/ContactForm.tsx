'use client';
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const subjectRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const validateField = (name: keyof FormData, value: string): string => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        return '';
      case 'email':
        if (!value.trim()) return 'Email is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Please enter a valid email';
        return '';
      case 'message':
        if (!value.trim()) return 'Message is required';
        if (value.trim().length < 10) return 'Message must be at least 10 characters';
        return '';
      default:
        return '';
    }
  };

  const handleInputChange = (name: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      const error = validateField(name, value);
      if (!error) {
        setErrors(prev => ({ ...prev, [name]: undefined }));
      }
    }
  };

  const handleBlur = (name: keyof FormData) => {
    const error = validateField(name, formData[name]);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all required fields
    const newErrors: FormErrors = {};
    Object.keys(formData).forEach(key => {
      if (key === 'name' || key === 'email' || key === 'message') {
        const error = validateField(key as keyof FormData, formData[key as keyof FormData]);
        if (error) newErrors[key as keyof FormErrors] = error;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setErrors({});
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClear = () => {
    setFormData({ name: '', email: '', subject: '', message: '' });
    setErrors({});
    setIsSubmitted(false);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <div className="w-16 h-16 bg-[#996568]/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-[#996568]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-semibold text-[#5a3e36] mb-2">Message Sent!</h3>
        <p className="text-[#5a3e36]/90 mb-6">Thank you for your message. We'll get back to you soon!</p>
        <Button onClick={handleClear} variant="outline">
          Send Another Message
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.form
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <motion.div variants={itemVariants} className="relative">
        <Input
          ref={nameRef}
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          onBlur={() => handleBlur('name')}
          className={`h-14 px-4 pt-6 pb-2 text-base transition-all duration-200 bg-white/80 ${
            errors.name ? 'border-red-500 focus:border-red-500' : 'border-[#e8c9a7] focus:border-[#996568] focus:ring-[#996568]/50'
          }`}
          placeholder=" "
        />
        <label
          htmlFor="name"
          className={`absolute left-4 transition-all duration-200 pointer-events-none ${
            formData.name || nameRef.current === document.activeElement
              ? 'top-2 text-xs text-[#996568]'
              : 'top-4 text-base text-[#996568]/60'
          }`}
        >
          Name *
        </label>
        {errors.name && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-500 text-sm mt-1 ml-1"
          >
            {errors.name}
          </motion.p>
        )}
      </motion.div>

      <motion.div variants={itemVariants} className="relative">
        <Input
          ref={emailRef}
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          onBlur={() => handleBlur('email')}
          className={`h-14 px-4 pt-6 pb-2 text-base transition-all duration-200 bg-white/80 ${
            errors.email ? 'border-red-500 focus:border-red-500' : 'border-[#e8c9a7] focus:border-[#996568] focus:ring-[#996568]/50'
          }`}
          placeholder=" "
        />
        <label
          htmlFor="email"
          className={`absolute left-4 transition-all duration-200 pointer-events-none ${
            formData.email || emailRef.current === document.activeElement
              ? 'top-2 text-xs text-[#996568]'
              : 'top-4 text-base text-[#996568]/60'
          }`}
        >
          Email *
        </label>
        {errors.email && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-500 text-sm mt-1 ml-1"
          >
            {errors.email}
          </motion.p>
        )}
      </motion.div>

      <motion.div variants={itemVariants} className="relative">
        <Input
          ref={subjectRef}
          type="text"
          id="subject"
          value={formData.subject}
          onChange={(e) => handleInputChange('subject', e.target.value)}
          className="h-14 px-4 pt-6 pb-2 text-base border-[#e8c9a7] focus:border-[#996568] focus:ring-[#996568]/50 bg-white/80 transition-all duration-200"
          placeholder=" "
        />
        <label
          htmlFor="subject"
          className={`absolute left-4 transition-all duration-200 pointer-events-none ${
            formData.subject || subjectRef.current === document.activeElement
              ? 'top-2 text-xs text-[#996568]'
              : 'top-4 text-base text-[#996568]/60'
          }`}
        >
          Subject (Optional)
        </label>
      </motion.div>

      <motion.div variants={itemVariants} className="relative">
        <Textarea
          ref={messageRef}
          id="message"
          value={formData.message}
          onChange={(e) => handleInputChange('message', e.target.value)}
          onBlur={() => handleBlur('message')}
          rows={5}
          className={`px-4 pt-6 pb-2 text-base resize-none transition-all duration-200 bg-white/80 ${
            errors.message ? 'border-red-500 focus:border-red-500' : 'border-[#e8c9a7] focus:border-[#996568] focus:ring-[#996568]/50'
          }`}
          placeholder=" "
        />
        <label
          htmlFor="message"
          className={`absolute left-4 transition-all duration-200 pointer-events-none ${
            formData.message || messageRef.current === document.activeElement
              ? 'top-2 text-xs text-[#996568]'
              : 'top-4 text-base text-[#996568]/60'
          }`}
        >
          Message *
        </label>
        {errors.message && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-500 text-sm mt-1 ml-1"
          >
            {errors.message}
          </motion.p>
        )}
      </motion.div>

      <motion.div variants={itemVariants} className="flex gap-4 pt-4">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 h-12 bg-[#996568] hover:bg-[#b87a7d] text-white font-medium rounded-lg transition-all duration-200 hover:shadow-lg active:scale-95"
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Sending...
            </div>
          ) : (
            'Send Message'
          )}
        </Button>
        <Button
          type="button"
          onClick={handleClear}
          variant="outline"
          className="h-12 px-6 border-[#996568] hover:border-[#b87a7d] hover:bg-[#996568]/10 transition-all duration-200 hover:shadow-md active:scale-95"
        >
          Clear
        </Button>
      </motion.div>
    </motion.form>
  );
}
