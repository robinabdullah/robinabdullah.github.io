'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Contact from '@/components/sections/Contact';
import portfolioData from '@/data/portfolio.json';

// Sample data structure to prevent hydration errors
const defaultData = {
  personalInfo: {
    name: "Robin Abdullah",
    title: "Full Stack Developer",
    bio: "I am a passionate full stack developer with expertise in building responsive web applications.",
    about: "With several years of experience in web development...",
    avatar: "/images/profile.png",
    email: "hello@example.com",
    phone: "+880 1676797123",
    location: "Dhaka, Bangladesh",
    careerStartDate: "2016-04-01",
    socialLinks: {
      github: "https://github.com/",
      linkedin: "https://linkedin.com/in/",
      twitter: "https://twitter.com/"
    }
  },
  statistics: {
    yearsExperience: 7,
    projectsDelivered: 20,
    technologiesMastered: 15,
    codeQuality: 90
  },
  skills: {
    programmingLanguages: ["JavaScript", "TypeScript"],
    frameworks: ["React", "Next.js"],
    architecturesPatterns: [],
    databases: [],
    cloudPlatforms: [],
    devOpsTools: ["Git", "GitHub"],
    frontEndTechnologies: ["HTML", "CSS"],
    otherSkills: []
  },
  experience: [],
  education: [],
  projects: []
};

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(defaultData);

  useEffect(() => {
    // Use the directly imported data instead of fetching from API
    setData(portfolioData);
    setIsLoading(false);
  }, []);

  const { personalInfo, skills, experience, education, projects, statistics } = data;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-light"></div>
      </div>
    );
  }

  // Create a default skills object that matches the Skills component interface
  const skillsData = {
    programmingLanguages: skills.programmingLanguages || [],
    frameworks: skills.frameworks || [],
    architecturesPatterns: skills.architecturesPatterns || [],
    databases: skills.databases || [],
    cloudPlatforms: skills.cloudPlatforms || [],
    devOpsTools: skills.devOpsTools || [],
    frontEndTechnologies: skills.frontEndTechnologies || [],
    otherSkills: skills.otherSkills || []
  };

  return (
    <main>
      <Header />
      
      <Hero 
        name={personalInfo.name}
        title={personalInfo.title}
        bio={personalInfo.bio}
        avatar={personalInfo.avatar}
        socialLinks={personalInfo.socialLinks}
        careerStartDate={personalInfo.careerStartDate}
        statistics={statistics}
      />
      
      <About 
        name={personalInfo.name}
        about={personalInfo.about}
        avatar={personalInfo.avatar}
        experience={experience}
        education={education}
        careerStartDate={personalInfo.careerStartDate}
      />
      
      <Skills skills={skillsData} />
      
      <Projects projects={projects} />
      
      <Contact 
        email={personalInfo.email}
        location={personalInfo.location}
        phone={personalInfo.phone}
        socialLinks={personalInfo.socialLinks}
      />
      
      {/* <Footer /> */}
    </main>
  );
}