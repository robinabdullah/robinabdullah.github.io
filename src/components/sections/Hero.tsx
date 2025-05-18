'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useCountUp } from 'react-countup';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { FaGithub, FaLinkedinIn, FaTwitter } from 'react-icons/fa';

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
  careerStartDate?: string;
  statistics?: {
    yearsExperience?: number;
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
    <div className="flex flex-col items-center p-3 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/5 cursor-default group">
      <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#a855f7] to-[#6366f1] bg-clip-text text-transparent group-hover:from-[#6366f1] group-hover:to-[#a855f7] transition-all duration-500" ref={countUpRef}>
        0
      </div>
      <div className="mt-1 text-sm text-gray-300 font-medium group-hover:text-white">{label}</div>
    </div>
  );
}

// Calculate years of experience
function calculateYearsOfExperience(startDate: string): number {
  const start = new Date(startDate);
  const today = new Date();
  
  // Calculate the difference in years
  let years = today.getFullYear() - start.getFullYear();
  
  // If we haven't reached the anniversary month/day yet, subtract 1 year
  if (
    today.getMonth() < start.getMonth() ||
    (today.getMonth() === start.getMonth() && today.getDate() < start.getDate())
  ) {
    years--;
  }
  
  return years;
}

function SocialLink({ href, platform }: { href: string; platform: string }) {
  const iconMap = {
    GitHub: <FaGithub className="w-6 h-6" />,
    LinkedIn: <FaLinkedinIn className="w-6 h-6" />,
    Twitter: <FaTwitter className="w-6 h-6" />
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

export default function Hero({ 
  name, 
  title, 
  bio, 
  avatar, 
  socialLinks, 
  careerStartDate,
  statistics 
}: HeroProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [dotLottie, setDotLottie] = useState(null);
  
  // Calculate years of experience 
  const yearsOfExperience = useMemo(() => {
    if (careerStartDate) {
      return calculateYearsOfExperience(careerStartDate);
    }
    // Fallback to the static value if provided, or default to 0
    return statistics?.yearsExperience || 0;
  }, [careerStartDate, statistics?.yearsExperience]);
  
  // Handle hydration issues with animations
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // Prepare a static or dynamic statistics object
  const displayStats = {
    yearsExperience: yearsOfExperience,
    projectsDelivered: statistics?.projectsDelivered || 0,
    technologiesMastered: statistics?.technologiesMastered || 0,
    codeCommits: statistics?.codeCommits || 0
  };

  const dotLottieRefCallback = (dotLottie: any) => {
    setDotLottie(dotLottie);
  };

  // ====== Shared content components ======
  // Hero content 
  const renderHeroContent = (withAnimation = false) => {
    const ContentWrapper = withAnimation ? motion.div : 'div';
    const animationProps = withAnimation ? {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5 }
    } : {};
    
    return (
      // @ts-ignore - TS doesn't like dynamic components with props
      <ContentWrapper className="z-10" {...animationProps}>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
          <span className="text-2xl md:text-3xl lg:text-4xl text-gray-300 mb-3">Hi, I'm</span> <br />
          <span className="gradient-text whitespace-nowrap">{name}</span>
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-300 mb-6">
          <span className="relative inline-block gradient-text">{title}</span>
        </h2>
        <p className="text-lg text-gray-300 mb-8">
          {bio}
        </p>
        <div className="flex flex-wrap gap-4 items-center">
          <a 
            href="/cv/Resume of Abdullah Saleh Robin.pdf" 
            download="Abdullah_Robin_Resume.pdf"
            className="px-5 py-2.5 text-sm bg-gradient-to-r from-[#a855f7] to-[#6366f1] text-white rounded-md hover:opacity-100 hover:shadow-lg hover:shadow-purple-500/30 hover:scale-105 transition-all duration-300 shadow-md flex items-center justify-center w-44"
          >
            Download Resume
          </a>
          
          <SocialLink href={socialLinks.github} platform="GitHub" />
          <SocialLink href={socialLinks.linkedin} platform="LinkedIn" />
          <SocialLink href={socialLinks.twitter} platform="Twitter" />
        </div>
      </ContentWrapper>
    );
  };
  
  // Animation/Lottie container
  const renderAnimationContainer = (withAnimation = false) => {
    const ContainerWrapper = withAnimation ? motion.div : 'div';
    const animationProps = withAnimation ? {
      initial: { opacity: 0, scale: 0.9 },
      animate: { opacity: 1, scale: 1 },
      transition: { duration: 0.5, delay: 0.2 }
    } : {};
    
    return (
      // @ts-ignore - TS doesn't like dynamic components with props
      <ContainerWrapper
        className="flex justify-center items-center md:justify-end pl-0 pr-6 relative"
        {...animationProps}
      >
        {/* Background glow effects */}
        <div className="absolute -z-10 w-96 h-96 blur-[120px] rounded-full bg-purple-700/10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute -z-10 w-64 h-64 blur-[80px] rounded-full bg-indigo-600/10 bottom-0 right-0"></div>
        
        {/* Animation container */}
        <div className="w-full max-w-[320px] md:max-w-[400px] h-[320px] md:h-[400px] relative">
          {withAnimation && (
            <DotLottieReact
              src="https://lottie.host/58753882-bb6a-49f5-a2c0-950eda1e135a/NLbpVqGegK.lottie"
              autoplay
              loop
              dotLottieRefCallback={dotLottieRefCallback}
              style={{ width: '100%', height: '100%' }}
            />
          )}
          {/* Empty div for SSR */}
        </div>
      </ContainerWrapper>
    );
  };
  
  // Statistics section
  const renderStatistics = (withAnimation = false) => {
    if (!statistics) return null;
    
    const StatWrapper = withAnimation ? motion.div : 'div';
    const StatItemWrapper = withAnimation ? motion.div : 'div';
    const wrapperProps = withAnimation ? {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5, delay: 0.4 }
    } : {};
    
    return (
      // @ts-ignore - TS doesn't like dynamic components with props
      <StatWrapper
        className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-2 bg-[#0300147a] backdrop-blur-xl p-5 rounded-xl border border-[#ffffff18] shadow-xl relative overflow-hidden"
        {...wrapperProps}
      >
        {/* Decorative elements */}
        <div className="absolute -right-12 -top-12 w-24 h-24 rounded-full bg-purple-500/10 blur-xl"></div>
        <div className="absolute -left-12 -bottom-12 w-24 h-24 rounded-full bg-blue-500/10 blur-xl"></div>
        
        {withAnimation ? (
          <>
            <StatItemWrapper
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
              className="flex flex-col items-center"
            >
              <StatItem value={displayStats.yearsExperience} label="Years of Experience" delay={0.6} />
            </StatItemWrapper>
            <StatItemWrapper
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.6 }}
              className="flex flex-col items-center"
            >
              <StatItem value={displayStats.projectsDelivered} label="Projects Delivered" delay={0.8} />
            </StatItemWrapper>
            <StatItemWrapper
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.7 }}
              className="flex flex-col items-center"
            >
              <StatItem value={displayStats.technologiesMastered} label="Technologies Mastered" delay={1.0} />
            </StatItemWrapper>
            <StatItemWrapper
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.8 }}
              className="flex flex-col items-center"
            >
              <StatItem value={displayStats.codeCommits} label="Code Commits" delay={1.2} />
            </StatItemWrapper>
          </>
        ) : (
          <>
            <div className="flex flex-col items-center p-3 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/5 cursor-default group">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#a855f7] to-[#6366f1] bg-clip-text text-transparent group-hover:from-[#6366f1] group-hover:to-[#a855f7] transition-all duration-500">
                {displayStats.yearsExperience}+
              </div>
              <div className="mt-1 text-sm text-gray-300 font-medium group-hover:text-white">Years of Experience</div>
            </div>
            <div className="flex flex-col items-center p-3 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/5 cursor-default group">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#a855f7] to-[#6366f1] bg-clip-text text-transparent group-hover:from-[#6366f1] group-hover:to-[#a855f7] transition-all duration-500">
                {displayStats.projectsDelivered}+
              </div>
              <div className="mt-1 text-sm text-gray-300 font-medium group-hover:text-white">Projects Delivered</div>
            </div>
            <div className="flex flex-col items-center p-3 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/5 cursor-default group">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#a855f7] to-[#6366f1] bg-clip-text text-transparent group-hover:from-[#6366f1] group-hover:to-[#a855f7] transition-all duration-500">
                {displayStats.technologiesMastered}+
              </div>
              <div className="mt-1 text-sm text-gray-300 font-medium group-hover:text-white">Technologies Mastered</div>
            </div>
            <div className="flex flex-col items-center p-3 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/5 cursor-default group">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#a855f7] to-[#6366f1] bg-clip-text text-transparent group-hover:from-[#6366f1] group-hover:to-[#a855f7] transition-all duration-500">
                {displayStats.codeCommits.toLocaleString()}+
              </div>
              <div className="mt-1 text-sm text-gray-300 font-medium group-hover:text-white">Code Commits</div>
            </div>
          </>
        )}
      </StatWrapper>
    );
  };

  // Render scroll down indicator (client-side only)
  const renderScrollDownIndicator = () => {
    if (!isMounted) return null;
    
    return (
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
    );
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-[1.3fr_0.7fr] gap-12 items-center">
          {/* Hero content - with or without animations */}
          {renderHeroContent(isMounted)}
          
          {/* Lottie animation - with or without animations */}
          {renderAnimationContainer(isMounted)}
        </div>

        {/* Statistics section - with or without animations */}
        {renderStatistics(isMounted)}
      </div>
      
      {/* Scroll down indicator - client-side only */}
      {renderScrollDownIndicator()}
    </section>
  );
}