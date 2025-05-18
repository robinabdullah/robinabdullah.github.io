'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedinIn, FaTwitter, FaCheckCircle, FaExclamationTriangle, FaLock } from 'react-icons/fa';
import { 
  PAGECLIP_SCRIPT_URL, 
  PAGECLIP_CSS_URL, 
  getFormActionUrl 
} from '@/config/pageclip-config';

interface ContactProps {
  email: string;
  location: string;
  phone?: string;
  socialLinks?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
}

export default function Contact({ email, location, phone = "+880 1676797123", socialLinks }: ContactProps) {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | 'success' | 'error'>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  // Check localStorage on initial load to see if user has already submitted a message
  useEffect(() => {
    const previousSubmission = localStorage.getItem('contactFormSubmitted');
    if (previousSubmission === 'true') {
      setHasSubmitted(true);
    }
  }, []);

  useEffect(() => {
    // Load PageClip script
    const script = document.createElement('script');
    script.src = PAGECLIP_SCRIPT_URL;
    script.charset = 'utf-8';
    script.async = true;
    document.body.appendChild(script);

    // Load PageClip CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = PAGECLIP_CSS_URL;
    link.media = 'screen';
    document.head.appendChild(link);

    // Clean up on unmount
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (hasSubmitted) return; // Prevent changes if already submitted
    
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormReset = () => {
    setFormState({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
  };

  // Hook into Pageclip form submit events
  useEffect(() => {
    const setupPageclip = () => {
      if (window.Pageclip && formRef.current) {
        window.Pageclip.form(formRef.current, {
          onSubmit: (event) => {
            // Prevent submission if user has already submitted a form
            if (hasSubmitted) {
              return false;
            }
            
            setIsSubmitting(true);
            // Return true to allow the submission to proceed
            return true;
          },
          onResponse: (error: any, response: any) => {
            if (!error) {
              // Set the form as submitted permanently
              setHasSubmitted(true);
              localStorage.setItem('contactFormSubmitted', 'true');
              
              handleFormReset();
              setSubmitStatus('success');
            } else {
              setSubmitStatus('error');
            }
            setIsSubmitting(false);
          },
          successTemplate: '<span></span>' // Use empty template since we handle success UI ourselves
        });
      }
    };

    // Check if Pageclip is already loaded
    if (window.Pageclip) {
      setupPageclip();
    } else {
      // Otherwise set up a listener for when it loads
      const checkPageclip = setInterval(() => {
        if (window.Pageclip) {
          clearInterval(checkPageclip);
          setupPageclip();
        }
      }, 100);

      // Clean up interval
      return () => clearInterval(checkPageclip);
    }
  }, [hasSubmitted]);
  
  return (
    <section id="contact" className="py-2 bg-dark/10 backdrop-blur-sm">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Get In Touch</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-light to-primary-dark mx-auto mb-6"></div>
          <p className="text-lg text-gray-200 max-w-3xl mx-auto">
            Have a question or want to work together? Drop me a message!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-white"
          >
            <h3 className="text-2xl font-semibold mb-6 text-white">Contact Information</h3>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-primary-light/20 text-primary-light">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-white">Email</h4>
                  <p className="mt-1 text-gray-300">{email}</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-primary-light/20 text-primary-light">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-white">Phone</h4>
                  <p className="mt-1 text-gray-300">{phone}</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-primary-light/20 text-primary-light">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-white">Location</h4>
                  <p className="mt-1 text-gray-300">{location}</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-primary-light/20 text-primary-light">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-white">Social Profiles</h4>
                  <div className="mt-2 flex space-x-4">
                    <a 
                      href={socialLinks?.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-primary-light transition-colors"
                      aria-label="GitHub Profile"
                    >
                      <FaGithub className="h-6 w-6" />
                    </a>
                    <a 
                      href={socialLinks?.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-primary-light transition-colors"
                      aria-label="LinkedIn Profile"
                    >
                      <FaLinkedinIn className="h-6 w-6" />
                    </a>
                    <a 
                      href={socialLinks?.twitter} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-primary-light transition-colors"
                      aria-label="Twitter Profile"
                    >
                      <FaTwitter className="h-6 w-6" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            {/* Permanent Form Disabled Overlay - Shows when user has already submitted */}
            {hasSubmitted && submitStatus !== 'success' && (
              <div className="absolute inset-0 z-10 bg-black/80 backdrop-blur-sm rounded-lg flex flex-col items-center justify-center p-8 text-center">
                <div className="bg-primary-light/20 p-4 rounded-full mb-4">
                  <FaLock className="h-10 w-10 text-primary-light" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Message Already Sent</h3>
                <p className="text-gray-300 mb-4">
                  You've already sent a message. Thank you for reaching out!
                </p>
                <p className="text-gray-400 text-sm max-w-md">
                  I've received your message and will respond as soon as possible.
                  If you need to send additional information, please use email.
                </p>
              </div>
            )}

            {/* Success Message Overlay */}
            <AnimatePresence>
              {submitStatus === 'success' && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 z-10 bg-black/80 backdrop-blur-sm rounded-lg flex flex-col items-center justify-center p-8 text-center"
                >
                  <div className="bg-gradient-to-r from-primary-light to-primary-dark p-4 rounded-full mb-4">
                    <FaCheckCircle className="h-12 w-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">Message Sent!</h3>
                  <p className="text-gray-200 mb-3">Thank you for your message. I'll get back to you as soon as possible.</p>
                  <p className="text-gray-400 text-sm mb-6">For additional inquiries, please reach out via email.</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Error Message */}
            <AnimatePresence>
              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-0 inset-x-0 z-10 bg-red-900/80 text-white p-4 rounded-t-lg flex items-center"
                >
                  <FaExclamationTriangle className="h-5 w-5 text-red-300 mr-2" />
                  <p>There was an error sending your message. Please try again.</p>
                  <button 
                    onClick={() => setSubmitStatus(null)}
                    className="ml-auto text-red-300 hover:text-white"
                    aria-label="Close error message"
                  >
                    ×
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <form 
              ref={formRef}
              action={getFormActionUrl()} 
              method="post"
              className={`pageclip-form bg-white/5 backdrop-blur-sm rounded-lg shadow-md p-8 ${hasSubmitted ? 'opacity-80' : ''}`}
            >
              <div className="mb-6">
                <label htmlFor="name" className="block text-white mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  disabled={hasSubmitted || isSubmitting}
                  required
                  className="w-full p-3 bg-white/10 border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary-light disabled:opacity-70"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="email" className="block text-white mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  disabled={hasSubmitted || isSubmitting}
                  required
                  className="w-full p-3 bg-white/10 border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary-light disabled:opacity-70"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="subject" className="block text-white mb-2">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formState.subject}
                  onChange={handleChange}
                  disabled={hasSubmitted || isSubmitting}
                  required
                  className="w-full p-3 bg-white/10 border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary-light disabled:opacity-70"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-white mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formState.message}
                  onChange={handleChange}
                  disabled={hasSubmitted || isSubmitting}
                  required
                  className="w-full p-3 bg-white/10 border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary-light disabled:opacity-70"
                />
              </div>

              <button
                type="submit"
                disabled={hasSubmitted || isSubmitting}
                className="pageclip-form__submit w-full button-primary py-3 flex justify-center items-center disabled:opacity-70"
              >
                <span>
                  {isSubmitting 
                    ? 'Sending...' 
                    : hasSubmitted 
                      ? 'Message Sent' 
                      : 'Send Message'
                  }
                </span>
              </button>
              
              {hasSubmitted && !submitStatus && (
                <p className="text-center text-gray-400 text-sm mt-4">
                  You have already sent a message. Thank you!
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}