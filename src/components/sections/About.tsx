'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import React, { useMemo } from 'react';

interface Experience {
  company: string;
  position: string;
  period: string;
  description: string;
  location?: string;
  workType?: string;
}

interface AboutProps {
  name: string;
  about: string;
  avatar: string;
  experience: Array<Experience>;
  education: Array<{
    institution: string;
    degree: string;
    period: string;
    description: string;
  }>;
  careerStartDate?: string;
}

// Helper function to convert description text to bullet points
const descriptionToBulletPoints = (description: string): string[] => {
  // If description already contains bullet points (marked by •), split by them
  if (description.includes('•')) {
    return description.split('•').filter(item => item.trim().length > 0).map(item => item.trim());
  }
  
  // If description contains line breaks, split by them
  if (description.includes('\n')) {
    return description.split('\n').filter(item => item.trim().length > 0);
  }
  
  // Split by periods to create individual bullet points
  if (description.includes('. ')) {
    return description.split('. ')
      .filter(item => item.trim().length > 0)
      .map(item => item.endsWith('.') ? item : `${item}.`);
  }
  
  // Otherwise, return as a single bullet point
  return [description];
};

// Calculate the duration between two dates
const calculateDuration = (periodString: string): string => {
  try {
    // Handle "Present" in the period string
    const period = periodString.replace('Present', new Date().toISOString().slice(0, 7));
    
    // Extract start and end dates
    const dates = period.split(' - ');
    if (dates.length !== 2) return '';
    
    const startDate = new Date(dates[0]);
    const endDate = new Date(dates[1]);
    
    // Calculate years and months difference
    let yearsDiff = endDate.getFullYear() - startDate.getFullYear();
    let monthsDiff = endDate.getMonth() - startDate.getMonth();
    
    if (monthsDiff < 0) {
      monthsDiff += 12;
      yearsDiff--;
    }
    
    // Format the duration
    if (yearsDiff > 0 && monthsDiff > 0) {
      return `${yearsDiff} yr${yearsDiff > 1 ? 's' : ''} ${monthsDiff} mo${monthsDiff > 1 ? 's' : ''}`;
    } else if (yearsDiff > 0) {
      return `${yearsDiff} yr${yearsDiff > 1 ? 's' : ''}`;
    } else if (monthsDiff > 0) {
      return `${monthsDiff} mo${monthsDiff > 1 ? 's' : ''}`;
    }
    
    return '';
  } catch (error) {
    return '';
  }
};

// Calculate years of experience from a start date to present
const calculateYearsOfExperience = (startDate: string): number => {
  try {
    const start = new Date(startDate);
    const today = new Date();
    
    let years = today.getFullYear() - start.getFullYear();
    
    // Adjust if we haven't reached the anniversary month/day yet
    if (today.getMonth() < start.getMonth() || 
        (today.getMonth() === start.getMonth() && today.getDate() < start.getDate())) {
      years--;
    }
    
    return years > 0 ? years : 0;
  } catch (error) {
    return 0;
  }
};

// Extract date from period string
const extractDate = (periodString: string, isStartDate: boolean): Date => {
  try {
    const dates = periodString.split(' - ');
    if (dates.length !== 2) return new Date();
    
    const dateStr = isStartDate ? dates[0] : dates[1] === 'Present' ? new Date().toISOString().slice(0, 7) : dates[1];
    return new Date(dateStr);
  } catch (error) {
    return new Date();
  }
};

export default function About({ name, about, avatar, experience, education, careerStartDate }: AboutProps) {
  // Calculate years of experience if career start date is provided
  const yearsOfExperience = useMemo(() => {
    if (careerStartDate) {
      return calculateYearsOfExperience(careerStartDate);
    }
    return 0;
  }, [careerStartDate]);

  // Group experience by company
  const groupedExperience = useMemo(() => {
    const groupByCompany = experience.reduce((acc: Record<string, Experience[]>, exp) => {
      if (!acc[exp.company]) {
        acc[exp.company] = [];
      }
      acc[exp.company].push(exp);
      return acc;
    }, {});

    // Sort positions within each company by date (most recent first)
    Object.keys(groupByCompany).forEach(company => {
      groupByCompany[company].sort((a, b) => {
        const dateA = extractDate(a.period, false).getTime();
        const dateB = extractDate(b.period, false).getTime();
        return dateB - dateA;
      });
    });

    // Calculate full duration at each company
    return Object.entries(groupByCompany).map(([company, positions]) => {
      const latestEndDate = Math.max(...positions.map(p => extractDate(p.period, false).getTime()));
      const earliestStartDate = Math.min(...positions.map(p => extractDate(p.period, true).getTime()));
      
      // Format the dates for overall company period
      const startDateStr = new Date(earliestStartDate).toLocaleString('en-US', { month: 'short', year: 'numeric' });
      const endDateStr = latestEndDate === new Date().getTime() ? 'Present' : new Date(latestEndDate).toLocaleString('en-US', { month: 'short', year: 'numeric' });
      const overallPeriod = `${startDateStr} - ${endDateStr}`;
      
      return {
        company,
        positions,
        overallPeriod,
        duration: calculateDuration(overallPeriod),
        location: positions[0].location, // Use location from the most recent position
        workType: positions[0].workType, // Use workType from the most recent position
        hasSingleRole: positions.length === 1, // Flag for companies with just one role
      };
    }).sort((a, b) => {
      // Sort companies by most recent end date
      const dateA = extractDate(a.overallPeriod, false).getTime();
      const dateB = extractDate(b.overallPeriod, false).getTime();
      return dateB - dateA;
    });
  }, [experience]);

  return (
    <section id="about" className="py-16">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3">About Me</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 mx-auto mb-4"></div>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Get to know me better
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Profile Image & Bio */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-4"
          >
            <div className="bg-[#0300147a] backdrop-blur-sm rounded-xl shadow-xl border border-[#ffffff18] overflow-hidden relative">
              <div className="relative h-64 w-full rounded-t-xl overflow-hidden">
                <Image 
                  src={avatar} 
                  alt={name} 
                  fill 
                  style={{ objectFit: 'cover', objectPosition: 'center top' }}
                  className="hover:scale-105 transition-all duration-500"
                />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-[#a855f7] to-[#6366f1] bg-clip-text text-transparent">{name}</h3>
                <p className="text-gray-200 text-[15px] leading-relaxed">
                  With over {yearsOfExperience} years of experience as a full-stack developer, I specialize in building enterprise-grade applications using .NET, Angular, and various cloud platforms. I'm passionate about creating clean, maintainable, and high-performance software solutions that solve real business problems. My expertise spans backend systems, RESTful APIs, database design, and front-end development.
                </p>
                
                <div className="mt-5 mb-3 flex items-center">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-r from-[#a855f7] to-[#6366f1] flex items-center justify-center mr-2">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold text-white">What I'm doing</h4>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="flex flex-col items-center p-3 rounded-lg bg-[#ffffff0a] hover:bg-[#ffffff12] transition-all duration-300 border border-[#ffffff12] col-span-1">
                    <div className="w-10 h-10 rounded-full bg-[#a855f720] flex items-center justify-center mb-2">
                      <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path>
                      </svg>
                    </div>
                    <h4 className="text-base font-semibold mb-1">Backend</h4>
                    <p className="text-center text-xs text-gray-300">API & Database</p>
                  </div>
                  
                  <div className="flex flex-col items-center p-3 rounded-lg bg-[#ffffff0a] hover:bg-[#ffffff12] transition-all duration-300 border border-[#ffffff12] col-span-2">
                    <div className="w-10 h-10 rounded-full bg-[#a855f720] flex items-center justify-center mb-2">
                      <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path>
                      </svg>
                    </div>
                    <h4 className="text-base font-semibold mb-1">Full-Stack Development</h4>
                    <p className="text-center text-xs text-gray-300">.NET Core, Angular, React</p>
                  </div>
                  
                  <div className="flex flex-col items-center p-3 rounded-lg bg-[#ffffff0a] hover:bg-[#ffffff12] transition-all duration-300 border border-[#ffffff12] col-span-3">
                    <div className="w-10 h-10 rounded-full bg-[#a855f720] flex items-center justify-center mb-2">
                      <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                      </svg>
                    </div>
                    <h4 className="text-base font-semibold mb-1">Enterprise Solutions</h4>
                    <p className="text-center text-xs text-gray-300">Scalable, secure, and maintainable systems</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Experience Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-8"
          >
            <div className="bg-[#0300147a] backdrop-blur-sm rounded-xl shadow-xl border border-[#ffffff18] p-5">
              <h3 className="text-xl font-bold mb-5 flex items-center">
                <span className="w-5 h-5 rounded-full bg-gradient-to-r from-[#a855f7] to-[#6366f1] flex items-center justify-center mr-2">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </span>
                Experience
              </h3>
              
              {/* Timeline style experience section - grouped by company */}
              <div className="relative border-l-2 border-purple-500/30 ml-[10px]">
                {groupedExperience.map((companyData, index) => {
                  // Hard-code current date for Optimizely if it's the current company
                  let overallPeriod = companyData.overallPeriod;
                  if (companyData.company === "Optimizely") {
                    overallPeriod = "May 2023 - Present";
                  }
                  
                  return (
                    <div key={index} className={`mb-6 relative pl-6 ${index === groupedExperience.length - 1 ? 'pb-0' : ''}`}>
                      {/* Timeline dot - perfectly centered on the line */}
                      <div className="absolute w-5 h-5 rounded-full bg-gradient-to-r from-[#a855f7] to-[#6366f1] -left-[10px] top-0 flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                      
                      <div className="bg-[#ffffff08] hover:bg-[#ffffff12] p-4 rounded-lg border border-[#ffffff12] transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/5">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-base font-bold text-white">{companyData.company}</h4>
                          {companyData.duration && (
                            <span className="inline-block px-2 py-0.5 bg-[#ffffff12] rounded-full text-xs text-gray-300 whitespace-nowrap">
                              {companyData.duration}
                            </span>
                          )}
                        </div>
                        
                        <div className="flex flex-wrap gap-2 text-gray-300 text-xs mb-2">
                          <span className="bg-[#ffffff12] px-2 py-0.5 rounded-full">{overallPeriod}</span>
                          {companyData.location && <span className="bg-[#ffffff12] px-2 py-0.5 rounded-full">{companyData.location}</span>}
                          {companyData.workType && <span className="bg-[#ffffff12] px-2 py-0.5 rounded-full">{companyData.workType}</span>}
                        </div>
                        
                        {/* Multiple positions at the same company */}
                        {companyData.positions.map((position, posIndex) => (
                          <div key={posIndex} className={posIndex > 0 ? "mt-3 pt-3 border-t border-white/10" : ""}>
                            <h5 className="text-base font-medium text-purple-400 mb-1">{position.position}</h5>
                            {/* Only show period for roles in companies with multiple positions */}
                            {(!companyData.hasSingleRole) && (
                              <p className="text-xs text-gray-400 mb-1">{position.period}</p>
                            )}
                            
                            {/* Bullet points for description */}
                            <ul className="space-y-1 text-gray-300">
                              {descriptionToBulletPoints(position.description).map((point, i) => (
                                <li key={i} className="flex items-start">
                                  <span className="text-purple-400 mt-[4px] mr-2 text-xs">•</span>
                                  <span className="text-[14px] leading-relaxed flex-1">{point}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
                
                {/* Download CV Button at the end of timeline */}
                <div className="pl-6 pt-1 relative">
                  <a 
                    href="/cv/Resume of Abdullah Saleh Robin.pdf" 
                    download="Abdullah_Robin_Resume.pdf"
                    className="inline-block px-5 py-2 text-sm bg-gradient-to-r from-[#a855f7] to-[#6366f1] text-white rounded-md hover:opacity-100 hover:shadow-lg hover:shadow-purple-500/30 hover:scale-105 transition-all duration-300 shadow-md flex items-center justify-center"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                    Download Resume
                  </a>
                </div>
              </div>
            </div>
            
            {/* Education section hidden from UI but data structure still maintained */}
            {/* We're keeping the data structure but not rendering it */}
          </motion.div>
        </div>
      </div>
    </section>
  );
}