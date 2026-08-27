'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';

interface ProofPoint {
  value: string;
  label: string;
}

interface HeroProps {
  name: string;
  title: string;
  bio: string;
  avatar: string;
  socialLinks: {
    github: string;
    linkedin: string;
  };
  careerStartDate?: string;
  availability?: string;
  proofPoints?: ProofPoint[];
}

// Whole years since a start date, rounded to the nearest year so the figure matches how the CV
// states it (continuous employment since Sep 2017 reads as "9 years" from month 107 onward).
function calculateYearsOfExperience(startDate: string): number {
  const start = new Date(startDate);
  const today = new Date();
  const months =
    (today.getFullYear() - start.getFullYear()) * 12 + (today.getMonth() - start.getMonth());
  return Math.max(0, Math.round(months / 12));
}

function SocialLink({ href, platform }: { href: string; platform: string }) {
  const iconMap = {
    GitHub: <FaGithub className="w-6 h-6" />,
    LinkedIn: <FaLinkedinIn className="w-6 h-6" />
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
  availability,
  proofPoints
}: HeroProps) {
  const [isMounted, setIsMounted] = useState(false);

  const yearsOfExperience = useMemo(
    () => (careerStartDate ? calculateYearsOfExperience(careerStartDate) : 0),
    [careerStartDate]
  );

  // Pills come from portfolio.json. `{{years}}` is substituted with the computed figure so the
  // years-of-experience pill never goes stale.
  const pills = useMemo(
    () =>
      (proofPoints || []).map((p) => ({
        value: p.value.replace('{{years}}', String(yearsOfExperience)),
        label: p.label.replace('{{years}}', String(yearsOfExperience))
      })),
    [proofPoints, yearsOfExperience]
  );

  const bioParagraphs = useMemo(
    () => bio.split(/\n+/).map((t) => t.trim()).filter(Boolean),
    [bio]
  );

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // ====== Shared content components ======
  const renderHeroContent = (withAnimation = false) => {
    const ContentWrapper = withAnimation ? motion.div : 'div';
    const animationProps = withAnimation
      ? {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5 }
        }
      : {};

    return (
      // @ts-ignore - TS doesn't like dynamic components with props
      <ContentWrapper className="z-10" {...animationProps}>
        {availability && (
          <div className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-full bg-[#22c55e12] border border-[#22c55e40] text-sm text-green-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
            </span>
            {availability}
          </div>
        )}

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
          <span className="text-2xl md:text-3xl lg:text-4xl text-gray-300 mb-3">Hi, I'm</span> <br />
          <span className="gradient-text whitespace-nowrap">{name}</span>
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-300 mb-6">
          <span className="relative inline-block gradient-text">{title}</span>
        </h2>
        <div className="mb-8 space-y-3">
          {bioParagraphs.map((para, i) => (
            <p key={i} className="text-[17px] leading-relaxed text-gray-300">
              {para}
            </p>
          ))}
        </div>

        <div className="flex flex-wrap gap-4 items-center">
          <a
            href="/cv/Resume_of_Abdullah_Saleh_Robin.pdf"
            download="Abdullah_Saleh_Robin_Resume.pdf"
            className="px-5 py-2.5 text-sm bg-gradient-to-r from-[#a855f7] to-[#6366f1] text-white rounded-md hover:opacity-100 hover:shadow-lg hover:shadow-purple-500/30 hover:scale-105 transition-all duration-300 shadow-md flex items-center justify-center w-44"
          >
            Download Resume
          </a>

          <SocialLink href={socialLinks.github} platform="GitHub" />
          <SocialLink href={socialLinks.linkedin} platform="LinkedIn" />
        </div>
      </ContentWrapper>
    );
  };

  // Portrait — replaces the old Lottie player, whose remote source no longer resolves.
  const renderPortrait = (withAnimation = false) => {
    const ContainerWrapper = withAnimation ? motion.div : 'div';
    const animationProps = withAnimation
      ? {
          initial: { opacity: 0, scale: 0.9 },
          animate: { opacity: 1, scale: 1 },
          transition: { duration: 0.5, delay: 0.2 }
        }
      : {};

    return (
      // @ts-ignore - TS doesn't like dynamic components with props
      <ContainerWrapper
        className="flex justify-center items-center md:justify-end pl-0 pr-6 relative"
        {...animationProps}
      >
        {/* Background glow effects */}
        <div className="absolute -z-10 w-96 h-96 blur-[120px] rounded-full bg-purple-700/10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute -z-10 w-64 h-64 blur-[80px] rounded-full bg-indigo-600/10 bottom-0 right-0"></div>

        <div className="relative w-[260px] h-[260px] md:w-[360px] md:h-[360px]">
          {/* Soft gradient ring */}
          <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-[#a855f7] via-[#6366f1] to-transparent opacity-60 blur-[2px]"></div>
          <div className="absolute inset-0 rounded-full overflow-hidden border border-[#ffffff20] shadow-2xl">
            <Image
              src={avatar}
              alt={name}
              fill
              sizes="(max-width: 768px) 260px, 360px"
              priority
              style={{ objectFit: 'cover', objectPosition: 'center top' }}
            />
          </div>
        </div>
      </ContainerWrapper>
    );
  };

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

  // Stat strip — full width, below the two hero columns (its original position).
  const renderStats = (withAnimation = false) => {
    if (pills.length === 0) return null;

    const StatWrapper = withAnimation ? motion.div : 'div';
    const wrapperProps = withAnimation
      ? {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay: 0.4 }
        }
      : {};

    return (
      // @ts-ignore - TS doesn't like dynamic components with props
      <StatWrapper
        className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-2 bg-[#0300147a] backdrop-blur-xl p-5 rounded-xl border border-[#ffffff18] shadow-xl relative overflow-hidden"
        {...wrapperProps}
      >
        <div className="absolute -right-12 -top-12 w-24 h-24 rounded-full bg-purple-500/10 blur-xl"></div>
        <div className="absolute -left-12 -bottom-12 w-24 h-24 rounded-full bg-blue-500/10 blur-xl"></div>

        {pills.map((pill, i) => (
          <div
            key={i}
            className="flex flex-col items-center p-3 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/5 cursor-default group"
          >
            <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#a855f7] to-[#6366f1] bg-clip-text text-transparent group-hover:from-[#6366f1] group-hover:to-[#a855f7] transition-all duration-500 whitespace-nowrap">
              {pill.value}
            </div>
            <div className="mt-1 text-sm text-gray-300 font-medium group-hover:text-white text-center">
              {pill.label}
            </div>
          </div>
        ))}
      </StatWrapper>
    );
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center py-24">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {renderHeroContent(isMounted)}
          {renderPortrait(isMounted)}
        </div>

        {renderStats(isMounted)}
      </div>

      {renderScrollDownIndicator()}
    </section>
  );
}
