'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Contact from '@/components/sections/Contact';
import FeaturedWork from '@/components/sections/FeaturedWork';
import Certifications from '@/components/sections/Certifications';
import portfolioData from '@/data/portfolio.json';

// Sample data structure to prevent hydration errors
const defaultData = {
  personalInfo: {
    name: "Abdullah Saleh Robin",
    title: "Senior Software Engineer",
    bio: "Senior Software Engineer building .NET and C# back-ends, React and Angular front-ends, and applied AI in production.",
    about: "I have nine years of professional experience building scalable enterprise applications across e-commerce, compliance, healthcare and public-sector domains, working with distributed, cross-timezone teams across the US and Canada. My work centres on cloud-native .NET and Angular/React architectures and on AI-augmented engineering workflows. Based in Germany, available immediately, and authorized to work without sponsorship.",
    avatar: "/images/profile.png",
    email: "abdullahsalehrobin@gmail.com",
    phone: "+49 152 06964467",
    location: "Berlin, Germany",
    careerStartDate: "2017-09-01",
    socialLinks: {
      github: "https://github.com/robinabdullah",
      linkedin: "https://www.linkedin.com/in/robinabdullah/"
    },
    availability: "Open to work \u00b7 Berlin, Germany",
    proofPoints: [{"value": "up to 80%", "label": "faster upgrade cycles"}, {"value": "600+", "label": "dev hours reclaimed a year"}, {"value": "{{years}} years", "label": "professional experience"}]
  },
  featured: [],
  certifications: [],
  skills: {
    programmingLanguages: [],
    dotnetBackend: [],
    architecturesPatterns: [],
    frontEndTechnologies: [],
    nodeJs: [],
    securityAuth: [],
    databases: [],
    cloudPlatforms: [],
    devOpsTools: [],
    apisMessaging: [],
    aiLlmIntegration: [],
    aiAssistedDevelopment: [],
    documentProcessingOcr: [],
    platformsProducts: [],
    testing: [],
    methodologies: []
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

  const { personalInfo, skills, experience, education, projects, featured, certifications } = data;

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
    dotnetBackend: skills.dotnetBackend || [],
    architecturesPatterns: skills.architecturesPatterns || [],
    frontEndTechnologies: skills.frontEndTechnologies || [],
    nodeJs: skills.nodeJs || [],
    securityAuth: skills.securityAuth || [],
    databases: skills.databases || [],
    cloudPlatforms: skills.cloudPlatforms || [],
    devOpsTools: skills.devOpsTools || [],
    apisMessaging: skills.apisMessaging || [],
    aiLlmIntegration: skills.aiLlmIntegration || [],
    aiAssistedDevelopment: skills.aiAssistedDevelopment || [],
    documentProcessingOcr: skills.documentProcessingOcr || [],
    platformsProducts: skills.platformsProducts || [],
    testing: skills.testing || [],
    methodologies: skills.methodologies || []
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
        availability={personalInfo.availability}
        proofPoints={personalInfo.proofPoints}
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
      
      <FeaturedWork featured={featured} />

      <Projects projects={projects} />

      <Certifications certifications={certifications} />
      
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