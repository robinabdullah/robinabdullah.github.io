'use client';

import { motion } from 'framer-motion';
import { FaReact, FaNode, FaAws, FaDocker, FaGitAlt, FaJira, FaAngular, FaBootstrap, FaMicrosoft } from 'react-icons/fa';
import { SiTypescript, SiJavascript, SiDotnet, SiNextdotjs, SiMongodb, SiMysql, 
         SiRedis, SiExpress, SiRedux, SiTailwindcss, SiMui } from 'react-icons/si';
import { TbBrandCSharp, TbDatabaseSearch } from 'react-icons/tb';
import { GoDatabase } from 'react-icons/go';
import { BsDiagram3Fill, BsHddNetwork } from 'react-icons/bs';

interface SkillsProps {
  skills: {
    programmingLanguages: string[];
    frameworks: string[];
    architecturesPatterns: string[];
    databases: string[];
    cloudPlatforms: string[];
    devOpsTools: string[];
    frontEndTechnologies: string[];
    otherSkills: string[];
  };
}

// Define skill items with icons
interface SkillItem {
  name: string;
  icon: React.ReactNode;
  color?: string;
}

// Define skill category props
interface SkillCategoryProps {
  title: string;
  skills: SkillItem[];
  variants: any;
  headerGradient: string;
  glowColor: string;
}

// Icon mapping for skills
const getSkillIcon = (skillName: string): { icon: React.ReactNode; color: string } => {
  const iconMap: { [key: string]: { icon: React.ReactNode; color: string } } = {
    // Programming Languages
    "C#": { icon: <TbBrandCSharp />, color: "bg-purple-500" },
    "JavaScript": { icon: <SiJavascript />, color: "bg-yellow-500" },
    "TypeScript": { icon: <SiTypescript />, color: "bg-blue-500" },
    
    // Frameworks
    "ASP.NET Core": { icon: <SiDotnet />, color: "bg-purple-600" },
    "ASP.NET MVC": { icon: <SiDotnet />, color: "bg-purple-500" },
    "Blazor": { icon: <SiDotnet />, color: "bg-purple-400" },
    "Express.js": { icon: <SiExpress />, color: "bg-gray-500" },
    "React": { icon: <FaReact />, color: "bg-blue-500" },
    "Next.js": { icon: <SiNextdotjs />, color: "bg-black" },
    
    // Architectures
    "Domain Driven Design": { icon: <BsDiagram3Fill />, color: "bg-green-500" },
    "Microservices": { icon: <BsHddNetwork />, color: "bg-blue-500" },
    "Client-Server": { icon: <BsHddNetwork />, color: "bg-purple-500" },
    "Event-Driven": { icon: <BsDiagram3Fill />, color: "bg-red-500" },
    "CQRS": { icon: <BsDiagram3Fill />, color: "bg-orange-500" },
    "Serverless": { icon: <FaAws />, color: "bg-orange-400" },
    
    // Databases
    "MSSQL": { icon: <TbDatabaseSearch />, color: "bg-blue-500" },
    "MongoDB": { icon: <SiMongodb />, color: "bg-green-500" },
    "MySQL": { icon: <SiMysql />, color: "bg-blue-600" },
    "DynamoDB": { icon: <FaAws />, color: "bg-orange-400" },
    "SQLite": { icon: <GoDatabase />, color: "bg-blue-400" },
    
    // Cloud
    "Azure": { icon: <FaMicrosoft />, color: "bg-blue-500" },
    "AWS": { icon: <FaAws />, color: "bg-orange-400" },
    
    // DevOps
    "Git": { icon: <FaGitAlt />, color: "bg-red-500" },
    "Azure DevOps": { icon: <FaMicrosoft />, color: "bg-blue-500" },
    "Docker": { icon: <FaDocker />, color: "bg-blue-500" },
    "Jenkins": { icon: <TbDatabaseSearch />, color: "bg-red-400" },
    "IIS": { icon: <FaMicrosoft />, color: "bg-blue-500" },
    "Jira": { icon: <FaJira />, color: "bg-blue-400" },
    
    // Frontend
    "Angular": { icon: <FaAngular />, color: "bg-red-500" },
    "Redux": { icon: <SiRedux />, color: "bg-purple-500" },
    "Bootstrap": { icon: <FaBootstrap />, color: "bg-purple-500" },
    "Tailwind CSS": { icon: <SiTailwindcss />, color: "bg-blue-400" },
    "Material UI": { icon: <SiMui />, color: "bg-blue-500" },
    
    // Other
    "SignalR & Socket.io": { icon: <BsHddNetwork />, color: "bg-blue-500" },
    "Entity Framework Core": { icon: <SiDotnet />, color: "bg-purple-500" },
    "Entity Framework": { icon: <SiDotnet />, color: "bg-purple-500" },
    "REST": { icon: <BsHddNetwork />, color: "bg-green-500" },
    "gRPC": { icon: <BsHddNetwork />, color: "bg-blue-400" },
    "LINQ": { icon: <SiDotnet />, color: "bg-purple-500" },
    "RabbitMQ": { icon: <BsHddNetwork />, color: "bg-orange-400" },
    "Redis": { icon: <SiRedis />, color: "bg-red-500" }
  };

  // Default icon and color if not found
  const defaultIcon = { icon: <BsHddNetwork />, color: "bg-gray-500" };
  
  return iconMap[skillName] || defaultIcon;
};

export default function Skills({ skills }: SkillsProps) {
  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  // Map skill categories to their properties
  const skillCategories = [
    { 
      title: "Programming Languages", 
      items: skills.programmingLanguages,
      headerGradient: "from-purple-600 to-blue-600",
      glowColor: "bg-purple-500/20"
    },
    { 
      title: "Frameworks", 
      items: skills.frameworks,
      headerGradient: "from-indigo-600 to-purple-600",
      glowColor: "bg-indigo-500/20"
    },
    { 
      title: "Architectures", 
      items: skills.architecturesPatterns,
      headerGradient: "from-green-600 to-teal-600",
      glowColor: "bg-green-500/20"
    },
    { 
      title: "Databases", 
      items: skills.databases,
      headerGradient: "from-cyan-600 to-blue-600",
      glowColor: "bg-cyan-500/20"
    },
    { 
      title: "Cloud Platforms", 
      items: skills.cloudPlatforms,
      headerGradient: "from-blue-600 to-sky-600",
      glowColor: "bg-blue-500/20"
    },
    { 
      title: "DevOps & Tools", 
      items: skills.devOpsTools,
      headerGradient: "from-amber-600 to-orange-600",
      glowColor: "bg-amber-500/20"
    },
    { 
      title: "Front-End", 
      items: skills.frontEndTechnologies,
      headerGradient: "from-pink-600 to-rose-600",
      glowColor: "bg-pink-500/20"
    },
    { 
      title: "Other Skills", 
      items: skills.otherSkills,
      headerGradient: "from-violet-600 to-purple-600",
      glowColor: "bg-violet-500/20"
    }
  ];

  return (
    <section id="skills" className="py-10 relative overflow-hidden">
      {/* Background animation elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{
            duration: 10,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="absolute top-0 left-0 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl transform -translate-x-1/3 -translate-y-1/3"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{
            duration: 12,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1
          }}
          className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-blue-500/10 rounded-full blur-3xl transform translate-x-1/3 translate-y-1/3"
        />
      </div>
      
      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Skills & Technologies</h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-purple-500 to-indigo-600 mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            My technical expertise and toolset that I've mastered over the years
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {skillCategories.map((category, idx) => {
            // Convert the string array to SkillItem array with icons
            const skillItems = category.items.map(skillName => {
              const { icon, color } = getSkillIcon(skillName);
              return { name: skillName, icon, color };
            });
            
            return (
              <SkillCategory 
                key={idx}
                title={category.title}
                skills={skillItems}
                variants={itemVariants}
                headerGradient={category.headerGradient}
                glowColor={category.glowColor}
              />
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

function SkillCategory({ title, skills, variants, headerGradient, glowColor }: SkillCategoryProps) {
  return (
    <motion.div
      variants={variants}
      whileHover={{ 
        y: -5,
        transition: { duration: 0.3 }
      }}
      className={`bg-gradient-to-b from-gray-900/95 via-gray-900/90 to-black/90
                backdrop-blur-md rounded-xl 
                shadow-lg border border-white/10 overflow-hidden
                hover:shadow-xl transition-all duration-500
                hover:border-white/20 group relative`}
    >
      {/* Modern glass-like glow effect */}
      <div className={`absolute inset-0 ${glowColor} rounded-xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-500`}></div>
      
      {/* Header with modern gradient */}
      <div className="relative z-10">
        <div className="py-4 px-5 border-b border-white/10">
          <h3 className={`text-xl font-bold bg-gradient-to-r ${headerGradient} bg-clip-text text-transparent`}>
            {title}
          </h3>
        </div>
      </div>
      
      {/* Skills content */}
      <div className="p-5 relative z-10">
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              whileHover={{
                scale: 1.05,
                y: -2,
                transition: { type: "spring", stiffness: 300 }
              }}
              className="relative"
            >
              <span className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full text-sm
                        bg-gray-800/60 text-white border border-white/10
                        hover:border-white/30 hover:bg-gray-700/60
                        transition-all duration-300 cursor-default shadow-md backdrop-blur-sm"
              >
                <span className={`flex items-center justify-center w-6 h-6 rounded-full ${skill.color} text-white shadow-[0_0_10px_rgba(255,255,255,0.15)]`}>
                  <span className="text-[0.85rem]">{skill.icon}</span>
                </span>
                <span className="font-medium">{skill.name}</span>
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}