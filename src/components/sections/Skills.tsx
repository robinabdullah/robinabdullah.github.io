'use client';

import { motion } from 'framer-motion';

interface SkillsProps {
  skills: {
    frontend: string[];
    backend: string[];
    tools: string[];
  };
}

export default function Skills({ skills }: SkillsProps) {
  return (
    <section id="skills" className="py-20">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Skills & Technologies</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-light to-primary-dark mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            My technical expertise and toolset
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Frontend */}
          <SkillCategory title="Frontend Development" skills={skills.frontend} delay={0} />
          
          {/* Backend */}
          <SkillCategory title="Backend Development" skills={skills.backend} delay={0.2} />
          
          {/* Tools */}
          <SkillCategory title="Tools & Platforms" skills={skills.tools} delay={0.4} />
        </div>
      </div>
    </section>
  );
}

interface SkillCategoryProps {
  title: string;
  skills: string[];
  delay: number;
}

function SkillCategory({ title, skills, delay }: SkillCategoryProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="bg-white rounded-lg shadow-md p-8"
    >
      <h3 className="text-xl font-semibold mb-6 gradient-text">{title}</h3>
      <div className="space-y-4">
        {skills.map((skill, index) => (
          <div key={index} className="relative">
            <div className="flex justify-between mb-1">
              <span className="text-gray-700">{skill}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: '85%' }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: delay + index * 0.1 }}
                className="h-2 rounded-full bg-gradient-to-r from-primary-light to-primary-dark"
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}