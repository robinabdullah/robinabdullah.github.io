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
    title: "Senior Backend & Full-Stack Engineer",
    bio: "Senior Backend & Full-Stack Engineer with 9 years building enterprise applications in .NET with C# and in Java with Spring Boot, across e-commerce, healthcare, compliance and public-sector platforms.\n\nI designed, built and ran an election-data platform end to end that processed 230,000+ scanned PDFs and 177M+ records, and served roughly 20M searches inside a 15-day national election window.\n\nAt Optimizely I co-engineered SpireWiz, cutting upgrade cycles by up to 80% and reclaiming 600+ developer hours a year. Microsoft Certified.",
    about: "I have nine years of professional experience building scalable enterprise applications across e-commerce, compliance, healthcare and public-sector domains, working with distributed, cross-timezone teams across the US and Canada. My work centres on backend services, REST APIs and data-intensive systems, built in .NET with C# and in Java with Spring Boot, with Angular and React front-ends, together with applied AI: integrating LLMs into production systems with schema-constrained output and fallback handling. Based in Germany, available immediately, and authorized to work without sponsorship.",
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
    proofPoints: [{"value": "40 → 5 min", "label": "Batch document processing"}, {"value": "3 hrs → 20 min", "label": "AI-assisted data entry"}, {"value": "55% faster", "label": "Enterprise migration delivery"}]
  },
  featured: [],
  certifications: [],
  skills: {
    programmingLanguages: [],
    javaJvm: [],
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
    javaJvm: skills.javaJvm || [],
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