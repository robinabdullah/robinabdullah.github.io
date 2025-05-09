'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useCountUp } from 'react-countup';

interface HeroProps {
  name: string;
  title: string;
  bio: string;
  avatar: string;
  socialLinks: {
    github: string;
    linkedin: string;
    twitter: string;
  };
  statistics?: {
    yearsExperience: number;
    projectsDelivered: number;
    technologiesMastered: number;
    codeCommits: number;
  };
}

function StatItem({ value, label, delay }: { value: number; label: string; delay: number }) {
  const countUpRef = useRef<HTMLDivElement>(null);
  const { start } = useCountUp({
    ref: countUpRef,
    start: 0,
    end: value,
    delay: delay,
    duration: 2.5,
    suffix: "+",
    formattingFn: value >= 1000 ? (val) => val.toLocaleString() + "+" : undefined,
  });

  useEffect(() => {
    start();
  }, [start]);

  return (
    <div className="flex flex-col items-center p-4 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/5 cursor-default group">
      <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#a855f7] to-[#6366f1] bg-clip-text text-transparent group-hover:from-[#6366f1] group-hover:to-[#a855f7] transition-all duration-500" ref={countUpRef}>
        0
      </div>
      <div className="mt-2 text-sm text-gray-300 font-medium group-hover:text-white">{label}</div>
    </div>
  );
}

export default function Hero({ name, title, bio, avatar, socialLinks, statistics }: HeroProps) {
  const [isMounted, setIsMounted] = useState(false);
  
  // Handle hydration issues with animations
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // Prevent SSR rendering of animations
  if (!isMounted) {
    return (
      <section id="home" className="relative min-h-screen flex items-center">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Static version for SSR */}
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                Hi, I'm <span className="gradient-text">{name}</span>
              </h1>
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-300 mb-6">
                <span className="relative inline-block gradient-text">{title}</span>
              </h2>
              <p className="text-lg text-gray-300 mb-8">
                {bio}
              </p>
              <div className="flex flex-wrap gap-4">
                <a 
                  href="/cv/Resume of Abdullah Saleh Robin.pdf" 
                  download="Abdullah_Robin_Resume.pdf"
                  className="px-5 py-2.5 text-sm bg-gradient-to-r from-[#a855f7] to-[#6366f1] text-white rounded-md hover:opacity-100 hover:shadow-lg hover:shadow-purple-500/30 hover:scale-105 transition-all duration-300 shadow-md flex items-center justify-center w-36"
                >
                  Download CV
                </a>
                <Link href="#contact" className="px-5 py-2.5 text-sm bg-transparent border border-[#6366f1]/50 text-gray-200 rounded-md hover:bg-[#ffffff15] hover:scale-105 hover:border-[#6366f1] transition-all duration-300 shadow-md flex items-center justify-center w-36">
                  Contact Me
                </Link>
                <Link href="#projects" className="px-5 py-2.5 text-sm border border-[#a855f7]/50 text-gray-200 rounded-md hover:bg-[#ffffff15] hover:scale-105 hover:border-[#a855f7] transition-all duration-300 shadow-md flex items-center justify-center w-36">
                  View Work
                </Link>
              </div>
              
              <div className="mt-8 flex space-x-4">
                <SocialLink href={socialLinks.github} platform="GitHub" />
                <SocialLink href={socialLinks.linkedin} platform="LinkedIn" />
                <SocialLink href={socialLinks.twitter} platform="Twitter" />
              </div>
            </div>
            
            {/* Image */}
            <div className="flex justify-center">
              <div className="relative w-64 h-64 md:w-80 md:h-80 overflow-hidden rounded-full border-4 border-gray-800 shadow-lg">
                <Image 
                  src={avatar} 
                  alt={name} 
                  fill 
                  style={{ objectFit: 'cover' }}
                  priority
                />
              </div>
            </div>
          </div>

          {/* Static Statistics */}
          {statistics && (
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 bg-[#0300147a] backdrop-blur-xl p-8 rounded-xl border border-[#ffffff18] shadow-xl relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute -right-12 -top-12 w-24 h-24 rounded-full bg-purple-500/10 blur-xl"></div>
              <div className="absolute -left-12 -bottom-12 w-24 h-24 rounded-full bg-blue-500/10 blur-xl"></div>
              
              <div className="flex flex-col items-center p-4 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/5 cursor-default group">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#a855f7] to-[#6366f1] bg-clip-text text-transparent group-hover:from-[#6366f1] group-hover:to-[#a855f7] transition-all duration-500">
                  {statistics.yearsExperience}+
                </div>
                <div className="mt-2 text-sm text-gray-300 font-medium group-hover:text-white">Years of Experience</div>
              </div>
              <div className="flex flex-col items-center p-4 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/5 cursor-default group">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#a855f7] to-[#6366f1] bg-clip-text text-transparent group-hover:from-[#6366f1] group-hover:to-[#a855f7] transition-all duration-500">
                  {statistics.projectsDelivered}+
                </div>
                <div className="mt-2 text-sm text-gray-300 font-medium group-hover:text-white">Projects Delivered</div>
              </div>
              <div className="flex flex-col items-center p-4 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/5 cursor-default group">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#a855f7] to-[#6366f1] bg-clip-text text-transparent group-hover:from-[#6366f1] group-hover:to-[#a855f7] transition-all duration-500">
                  {statistics.technologiesMastered}+
                </div>
                <div className="mt-2 text-sm text-gray-300 font-medium group-hover:text-white">Technologies Mastered</div>
              </div>
              <div className="flex flex-col items-center p-4 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/5 cursor-default group">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#a855f7] to-[#6366f1] bg-clip-text text-transparent group-hover:from-[#6366f1] group-hover:to-[#a855f7] transition-all duration-500">
                  {statistics.codeCommits.toLocaleString()}+
                </div>
                <div className="mt-2 text-sm text-gray-300 font-medium group-hover:text-white">Code Commits</div>
              </div>
            </div>
          )}
        </div>
      </section>
    );
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Hi, I'm <span className="gradient-text">{name}</span>
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-300 mb-6">
              <span className="relative inline-block gradient-text">{title}</span>
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              {bio}
            </p>
            <div className="flex flex-wrap gap-4">
              <a 
                href="/cv/Resume of Abdullah Saleh Robin.pdf" 
                download="Abdullah_Robin_Resume.pdf"
                className="px-5 py-2.5 text-sm bg-gradient-to-r from-[#a855f7] to-[#6366f1] text-white rounded-md hover:opacity-100 hover:shadow-lg hover:shadow-purple-500/30 hover:scale-105 transition-all duration-300 shadow-md flex items-center justify-center w-36"
              >
                Download CV
              </a>
              <Link 
                href="#contact" 
                className="px-5 py-2.5 text-sm bg-transparent border border-[#6366f1]/50 text-gray-200 rounded-md hover:bg-[#ffffff15] hover:scale-105 hover:border-[#6366f1] transition-all duration-300 shadow-md flex items-center justify-center w-36"
              >
                Contact Me
              </Link>
              <Link 
                href="#projects" 
                className="px-5 py-2.5 text-sm border border-[#a855f7]/50 text-gray-200 rounded-md hover:bg-[#ffffff15] hover:scale-105 hover:border-[#a855f7] transition-all duration-300 shadow-md flex items-center justify-center w-36"
              >
                View Work
              </Link>
            </div>
            
            <div className="mt-8 flex space-x-4">
              <SocialLink href={socialLinks.github} platform="GitHub" />
              <SocialLink href={socialLinks.linkedin} platform="LinkedIn" />
              <SocialLink href={socialLinks.twitter} platform="Twitter" />
            </div>
          </motion.div>
          
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80 overflow-hidden rounded-full border-4 border-gray-800 shadow-lg">
              <Image 
                src={avatar} 
                alt={name} 
                fill 
                style={{ objectFit: 'cover' }}
                priority
              />
            </div>
          </motion.div>
        </div>

        {/* Statistics */}
        {statistics && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 bg-[#0300147a] backdrop-blur-xl p-8 rounded-xl border border-[#ffffff18] shadow-xl relative overflow-hidden group"
          >
            {/* Decorative elements */}
            <div className="absolute -right-12 -top-12 w-24 h-24 rounded-full bg-purple-500/10 blur-xl"></div>
            <div className="absolute -left-12 -bottom-12 w-24 h-24 rounded-full bg-blue-500/10 blur-xl"></div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
              className="flex flex-col items-center"
            >
              <StatItem value={statistics.yearsExperience} label="Years of Experience" delay={0.6} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.6 }}
              className="flex flex-col items-center"
            >
              <StatItem value={statistics.projectsDelivered} label="Projects Delivered" delay={0.8} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.7 }}
              className="flex flex-col items-center"
            >
              <StatItem value={statistics.technologiesMastered} label="Technologies Mastered" delay={1.0} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.8 }}
              className="flex flex-col items-center"
            >
              <StatItem value={statistics.codeCommits} label="Code Commits" delay={1.2} />
            </motion.div>
          </motion.div>
        )}
      </div>
      
      {/* Scroll down indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.5, 
          delay: 0.5,
          repeat: Infinity,
          repeatType: 'reverse'
        }}
      >
        <Link href="#about" className="flex flex-col items-center text-gray-400 hover:text-primary-light">
          <span className="text-sm mb-2">Scroll Down</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </Link>
      </motion.div>
    </section>
  );
}

function SocialLink({ href, platform }: { href: string; platform: string }) {
  const iconMap = {
    GitHub: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
    LinkedIn: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
    Twitter: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
      </svg>
    )
  };

  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="flex items-center justify-center w-12 h-12 rounded-full bg-[#ffffff10] text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-[#a855f7]/20 hover:to-[#6366f1]/20 hover:scale-110 hover:border hover:border-[#a855f7]/50 transition-all duration-300"
      aria-label={`Visit ${platform} profile`}
      title={`Visit ${platform} profile`}
    >
      {iconMap[platform as keyof typeof iconMap]}
    </a>
  );
}