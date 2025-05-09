'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Contact from '@/components/sections/Contact';

// Sample data structure to prevent hydration errors
const defaultData = {
  personalInfo: {
    name: "Robin Abdullah",
    title: "Full Stack Developer",
    bio: "I am a passionate full stack developer with expertise in building responsive web applications.",
    about: "With several years of experience in web development...",
    avatar: "/images/profile.jpg",
    email: "hello@example.com",
    location: "Dhaka, Bangladesh",
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
    codeCommits: 5000
  },
  skills: {
    frontend: ["HTML", "CSS", "JavaScript"],
    backend: ["Node.js", "Express"],
    tools: ["Git", "GitHub"]
  },
  experience: [],
  education: [],
  projects: []
};

export default function Home() {
  const [portfolioData, setPortfolioData] = useState(defaultData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/portfolio');
        if (!response.ok) throw new Error('Failed to fetch portfolio data');
        const data = await response.json();
        setPortfolioData(data);
      } catch (error) {
        console.error('Error loading portfolio data:', error);
        // Fall back to default data in case of error
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const { personalInfo, skills, experience, education, projects, statistics } = portfolioData;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-light"></div>
      </div>
    );
  }

  return (
    <main>
      <Header />
      
      <Hero 
        name={personalInfo.name}
        title={personalInfo.title}
        bio={personalInfo.bio}
        avatar={personalInfo.avatar}
        socialLinks={personalInfo.socialLinks}
        statistics={statistics}
      />
      
      <About 
        name={personalInfo.name}
        about={personalInfo.about}
        avatar={personalInfo.avatar}
        experience={experience}
        education={education}
      />
      
      <Skills skills={skills} />
      
      <Projects projects={projects} />
      
      <Contact 
        email={personalInfo.email}
        location={personalInfo.location}
      />
      
      <Footer />
    </main>
  );
}