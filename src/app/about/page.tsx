'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { 
  Brain, 
  Heart, 
  BookOpen, 
  Users, 
  Award, 
  Microscope, 
  Lightbulb, 
  Clock,
  Star,
  Quote,
  ArrowRight,
  PlayCircle
} from 'lucide-react';

const About = () => {
  const [currentQuote, setCurrentQuote] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);

  // Fixed variants with proper typing
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const floatingVariants = {
    float: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop"
      }
    }
  };

  const philosophicalQuotes = [
    {
      text: "The mind and body are not separate entities, but interconnected aspects of our complete human experience.",
      context: "On Mind-Body Connection"
    },
    {
      text: "True wisdom emerges when we understand both the 'why' of philosophy and the 'how' of physiology.",
      context: "On Integrated Learning"
    },
    {
      text: "Every heartbeat carries the rhythm of our thoughts, every thought shapes our physical being.",
      context: "On Psychosomatic Unity"
    }
  ];

  const expertiseAreas = [
    {
      icon: Brain,
      title: "Philosophy of Mind",
      description: "Exploring consciousness, perception, and the nature of mental phenomena through rigorous philosophical analysis.",
      depth: "15+ years of research"
    },
    {
      icon: Heart,
      title: "Human Physiology",
      description: "Understanding how our biological systems function and interconnect to create our lived experience.",
      depth: "Clinical expertise"
    },
    {
      icon: Lightbulb,
      title: "Integrated Teaching",
      description: "Bridging abstract philosophical concepts with concrete physiological understanding for holistic learning.",
      depth: "Innovative pedagogy"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % philosophicalQuotes.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#fffcf1] overflow-hidden mt-15">
      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-24"
        style={{ y: heroY, opacity: heroOpacity }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-20 left-1/4 w-40 h-40 bg-[#996568]/8 rounded-full blur-2xl"
            animate="float"
          />
          <motion.div
            className="absolute bottom-1/3 right-1/6 w-60 h-60 bg-[#e8c9a7]/15 rounded-full blur-3xl"
            animate="float"
            transition={{ delay: 2 }}
          />
          <motion.div
            className="absolute top-1/2 left-1/6 w-32 h-32 bg-[#996568]/6 rounded-full blur-xl"
            animate="float"
            transition={{ delay: 1 }}
          />
        </div>

        <div className="container mx-auto relative z-10">
          <motion.div 
            className="grid lg:grid-cols-2 gap-12 items-center"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <div className="space-y-6">
              <motion.div >
                <h1 className="text-5xl lg:text-6xl font-bold text-[#5a3e36] leading-tight">
                  Dr. Taqee
                  <span className="block text-[#996568] text-4xl lg:text-5xl">Khan</span>
                </h1>
                <div className="mt-3 flex items-center space-x-3">
                  <div className="h-1 w-10 bg-[#996568]"></div>
                  <p className="text-[#996568] font-medium tracking-wider uppercase text-sm">
                    Philosopher • Physiologist • Educator
                  </p>
                </div>
              </motion.div>

              <motion.p 
                className="text-lg lg:text-xl text-[#5a3e36]/90 leading-relaxed max-w-lg"
              >
                Bridging ancient wisdom with modern science, I guide students through the fascinating 
                intersection where philosophical inquiry meets physiological understanding.
              </motion.p>

              <motion.div 
                className="bg-white/80 backdrop-blur-sm p-5 rounded-xl border border-[#e8c9a7]"
              >
                <motion.div
                  key={currentQuote}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <Quote className="text-[#996568] mb-2" size={20} />
                  <p className="text-[#5a3e36] italic leading-relaxed mb-1">
                    "{philosophicalQuotes[currentQuote].text}"
                  </p>
                  <p className="text-[#996568] text-sm font-medium">
                    {philosophicalQuotes[currentQuote].context}
                  </p>
                </motion.div>
              </motion.div>

              <motion.div 
                className="flex flex-wrap gap-3"
              >
                <motion.button
                  className="group bg-[#996568] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#b87a7d] transition-all duration-300 flex items-center space-x-2"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <span>Begin Your Journey</span>
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
                </motion.button>
                
                <motion.button
                  className="group border-2 border-[#996568] text-[#996568] px-6 py-3 rounded-lg font-semibold hover:bg-[#996568]/10 transition-all duration-300 flex items-center space-x-2"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  <PlayCircle className={`transition-transform ${isPlaying ? 'scale-110' : ''}`} size={18} />
                  <span>Watch Introduction</span>
                </motion.button>
              </motion.div>
            </div>

            <motion.div 
              className="relative flex justify-center"
            >
              <motion.div
                className="relative w-80 h-80"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#996568]/20 via-[#e8c9a7]/30 to-[#996568]/10 rounded-full blur-xl"></div>
                
                <motion.div
                  className="relative w-full h-full bg-white/80 backdrop-blur-sm rounded-full border border-[#e8c9a7] flex items-center justify-center"
                  animate="float"
                >
                  <div className="text-center">
                    <motion.div
                      className="text-[#996568] mb-3"
                      whileHover={{ rotate: 5, scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Brain size={64} />
                    </motion.div>
                    <div className="flex justify-center space-x-3 text-[#996568]">
                      <motion.div
                        whileHover={{ y: -3, rotate: -3 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Microscope size={28} />
                      </motion.div>
                      <motion.div
                        whileHover={{ y: -3, rotate: 3 }}
                        transition={{ duration: 0.3 }}
                      >
                        <BookOpen size={28} />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Expertise Section */}
      <motion.section 
        className="py-16 bg-gradient-to-b from-[#fffcf1] to-white/50 px-6 md:px-12 lg:px-24"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-[#5a3e36] mb-4">My Teaching Philosophy</h2>
            <p className="text-lg text-[#5a3e36]/90 max-w-3xl mx-auto leading-relaxed">
              Education becomes transformative when we understand not just what we think, but how our thinking 
              emerges from our biological nature.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {expertiseAreas.map((area, index) => {
              const IconComponent = area.icon;
              return (
                <motion.div
                  key={index}
                  className="group relative"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  whileHover={{ y: -8 }}
                >
                  <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-[#e8c9a7] hover:border-[#996568] transition-all duration-300 h-full">
                    <div className="w-16 h-16 bg-[#996568]/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-[#996568]/20 transition-all duration-300">
                      <IconComponent className="text-[#996568]" size={28} />
                    </div>
                    
                    <h3 className="text-xl font-bold text-[#5a3e36] mb-3">{area.title}</h3>
                    <p className="text-[#5a3e36]/90 leading-relaxed mb-3">{area.description}</p>
                    <div className="flex items-center text-[#996568] font-medium text-sm">
                      <Clock size={14} className="mr-1" />
                      <span>{area.depth}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* Academic Credentials */}
      <motion.section 
        className="py-16 bg-white/60 backdrop-blur-sm px-6 md:px-12 lg:px-24"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div>
                <h2 className="text-3xl font-bold text-[#5a3e36] mb-4">Academic Foundation</h2>
                <p className="text-[#5a3e36]/90 leading-relaxed mb-6">
                  My dual expertise allows me to offer a unique perspective that traditional education often separates.
                </p>
              </div>

              <div className="space-y-5">
                <motion.div 
                  className="flex items-start space-x-4"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-12 h-12 bg-[#996568]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Award className="text-[#996568]" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#5a3e36] mb-1">Ph.D. in Philosophy</h3>
                    <p className="text-[#5a3e36]/90 leading-relaxed text-sm">
                      Oxford University - Specialization in Philosophy of Mind and Consciousness Studies.
                    </p>
                  </div>
                </motion.div>

                <motion.div 
                  className="flex items-start space-x-4"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-12 h-12 bg-[#996568]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Microscope className="text-[#996568]" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#5a3e36] mb-1">M.D. in Human Physiology</h3>
                    <p className="text-[#5a3e36]/90 leading-relaxed text-sm">
                      Cambridge University Medical School - Focus on neuroscience and psychophysiology.
                    </p>
                  </div>
                </motion.div>

                <motion.div 
                  className="flex items-start space-x-4"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-12 h-12 bg-[#996568]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Users className="text-[#996568]" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#5a3e36] mb-1">20+ Years Teaching</h3>
                    <p className="text-[#5a3e36]/90 leading-relaxed text-sm">
                      Pioneer in developing holistic educational approaches.
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-[#996568]/10 via-white/80 to-[#e8c9a7]/20 p-8 rounded-2xl backdrop-blur-sm border border-[#e8c9a7]"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.01 }}
            >
              <h3 className="text-2xl font-bold text-[#5a3e36] mb-6">Educational Impact</h3>
              
              <div className="grid grid-cols-2 gap-5">
                <motion.div 
                  className="text-center"
                  whileHover={{ scale: 1.03 }}
                >
                  <div className="text-3xl font-bold text-[#996568] mb-1">15,000+</div>
                  <p className="text-[#5a3e36]/90 font-medium text-sm">Students Taught</p>
                </motion.div>
                
                <motion.div 
                  className="text-center"
                  whileHover={{ scale: 1.03 }}
                >
                  <div className="text-3xl font-bold text-[#996568] mb-1">98%</div>
                  <p className="text-[#5a3e36]/90 font-medium text-sm">Satisfaction Rate</p>
                </motion.div>
                
                <motion.div 
                  className="text-center"
                  whileHover={{ scale: 1.03 }}
                >
                  <div className="text-3xl font-bold text-[#996568] mb-1">50+</div>
                  <p className="text-[#5a3e36]/90 font-medium text-sm">Published Papers</p>
                </motion.div>
                
                <motion.div 
                  className="text-center"
                  whileHover={{ scale: 1.03 }}
                >
                  <div className="text-3xl font-bold text-[#996568] mb-1">12</div>
                  <p className="text-[#5a3e36]/90 font-medium text-sm">Awards Received</p>
                </motion.div>
              </div>

              <div className="mt-6 pt-6 border-t border-[#996568]/20">
                <div className="flex items-center justify-center space-x-1 text-[#996568]">
                  {[1,2,3,4,5].map((star) => (
                    <Star key={star} size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="text-center text-[#5a3e36]/90 mt-1 italic text-sm">
                  "Transformative learning that changes how you see yourself and the world."
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Final CTA */}
      <motion.section 
        className="py-16 bg-gradient-to-br from-[#fffcf1] via-white/80 to-[#996568]/5 px-6 md:px-12 lg:px-24"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto text-center">
          <motion.div
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#5a3e36] mb-6">
              Ready to Explore the Connection Between Mind and Body?
            </h2>
            <p className="text-lg text-[#5a3e36]/90 mb-8 leading-relaxed">
              Join a learning community where philosophical wisdom meets scientific understanding.
            </p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.button
                className="group bg-[#996568] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#b87a7d] transition-all duration-300 flex items-center space-x-2"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                <span>Start Learning Today</span>
                <ArrowRight className="group-hover:translate-x-1 transition-transform duration-300" size={18} />
              </motion.button>
              
              <motion.button
                className="border-2 border-[#996568] text-[#996568] px-8 py-3 rounded-lg font-semibold hover:bg-[#996568]/10 transition-all duration-300"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                Explore Courses
              </motion.button>
            </motion.div>

            <motion.div 
              className="mt-8 pt-6 border-t border-[#996568]/20"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <p className="text-[#996568] font-medium mb-3 text-sm">Connect with me</p>
              <div className="flex justify-center space-x-4">
                <motion.a
                  className="text-[#5a3e36]/70 hover:text-[#996568] transition-colors cursor-pointer text-sm"
                  whileHover={{ y: -1 }}
                >
                  Weekly Discussions
                </motion.a>
                <motion.a
                  className="text-[#5a3e36]/70 hover:text-[#996568] transition-colors cursor-pointer text-sm"
                  whileHover={{ y: -1 }}
                >
                  Research
                </motion.a>
                <motion.a
                  className="text-[#5a3e36]/70 hover:text-[#996568] transition-colors cursor-pointer text-sm"
                  whileHover={{ y: -1 }}
                >
                  Mentoring
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default About;