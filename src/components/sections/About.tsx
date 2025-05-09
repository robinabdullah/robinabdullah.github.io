'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface AboutProps {
  name: string;
  about: string;
  avatar: string;
  experience: Array<{
    company: string;
    position: string;
    period: string;
    description: string;
    location?: string;
    workType?: string;
  }>;
  education: Array<{
    institution: string;
    degree: string;
    period: string;
    description: string;
  }>;
}

export default function About({ name, about, avatar, experience, education }: AboutProps) {
  return (
    <section id="about" className="py-20">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-light to-primary-dark mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Get to know me better
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Profile Image & Bio */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-1"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-lg shadow-md overflow-hidden">
              <div className="relative h-72 w-full">
                <Image 
                  src={avatar} 
                  alt={name} 
                  fill 
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">{name}</h3>
                <p className="text-gray-200">{about}</p>
              </div>
            </div>
          </motion.div>

          {/* Experience & Education */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-2"
          >
            {/* Experience */}
            <div className="mb-10">
              <h3 className="text-2xl font-semibold mb-6">Work Experience</h3>
              <div className="space-y-6">
                {experience.map((item, index) => (
                  <div key={index} className="border-l-4 border-primary-light pl-5 pb-5">
                    <h4 className="text-xl font-medium">{item.position}</h4>
                    <p className="text-primary-light font-medium">{item.company}</p>
                    <div className="flex flex-wrap gap-x-4 text-gray-300 text-sm mt-1">
                      <p>{item.period}</p>
                      {item.location && <p>• {item.location}</p>}
                      {item.workType && <p>• {item.workType}</p>}
                    </div>
                    <p className="text-gray-200 mt-2">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div>
              <h3 className="text-2xl font-semibold mb-6">Education</h3>
              <div className="space-y-6">
                {education.map((item, index) => (
                  <div key={index} className="border-l-4 border-primary-light pl-5 pb-5">
                    <h4 className="text-xl font-medium">{item.degree}</h4>
                    <p className="text-primary-light font-medium">{item.institution}</p>
                    <p className="text-gray-300 text-sm mt-1">{item.period}</p>
                    <p className="text-gray-200 mt-2">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}