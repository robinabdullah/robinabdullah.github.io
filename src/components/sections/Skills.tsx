'use client';

import { motion } from 'framer-motion';
import { FaReact, FaAws, FaDocker, FaGitAlt, FaJira, FaAngular, FaBootstrap, FaMicrosoft,
         FaJava, FaNodeJs, FaUserShield, FaShieldAlt, FaCogs, FaFilePdf, FaVial, FaTasks,
         FaUsers } from 'react-icons/fa';
import { SiTypescript, SiJavascript, SiDotnet, SiNextdotjs, SiMongodb, SiMysql,
         SiExpress, SiRedux, SiTailwindcss, SiMui,
         SiRabbitmq,
         SiSqlite,
         SiBlazor,
         SiPython, SiReactivex, SiWebpack, SiGooglecloud, SiGnubash, SiGoogledrive,
         SiMessenger, SiOpencv, SiGithubcopilot, SiProtodotio, SiOpenai, SiClaude,
         SiGooglegemini, SiKubernetes, SiGithubactions, SiArgo, SiNginx, SiSwagger,
         SiSitecore, SiSpringboot, SiJsonwebtokens } from 'react-icons/si';
import { TbBrandCSharp, TbDatabaseSearch } from 'react-icons/tb';
import { GoDatabase } from 'react-icons/go';
import { BsDiagram3Fill, BsHddNetwork } from 'react-icons/bs';
import { VscAzure, VscAzureDevops } from "react-icons/vsc";
import { BiLogoPostgresql } from "react-icons/bi";
import { DiMsqlServer, DiRedis } from "react-icons/di";
import { LiaJenkins } from "react-icons/lia";

interface SkillsProps {
  skills: {
    programmingLanguages: string[];
    dotnetBackend: string[];
    architecturesPatterns: string[];
    frontEndTechnologies: string[];
    nodeJs: string[];
    securityAuth: string[];
    databases: string[];
    cloudPlatforms: string[];
    devOpsTools: string[];
    apisMessaging: string[];
    aiLlmIntegration: string[];
    aiAssistedDevelopment: string[];
    documentProcessingOcr: string[];
    platformsProducts: string[];
    testing: string[];
    methodologies: string[];
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
    "C#": { icon: <TbBrandCSharp />, color: "bg-purple-500" },
    "TypeScript": { icon: <SiTypescript />, color: "bg-blue-500" },
    "JavaScript": { icon: <SiJavascript />, color: "bg-yellow-500" },
    "SQL": { icon: <GoDatabase />, color: "bg-slate-500" },
    "Python": { icon: <SiPython />, color: "bg-yellow-600" },
    "Java": { icon: <FaJava />, color: "bg-red-600" },
    ".NET": { icon: <SiDotnet />, color: "bg-purple-600" },
    "ASP.NET Core": { icon: <SiDotnet />, color: "bg-purple-600" },
    "Entity Framework Core": { icon: <SiDotnet />, color: "bg-purple-500" },
    "Entity Framework": { icon: <SiDotnet />, color: "bg-purple-500" },
    ".NET Framework": { icon: <SiDotnet />, color: "bg-purple-700" },
    "ASP.NET MVC": { icon: <SiDotnet />, color: "bg-purple-500" },
    "REST APIs": { icon: <BsHddNetwork />, color: "bg-green-500" },
    "REST": { icon: <BsHddNetwork />, color: "bg-green-500" },
    "LINQ": { icon: <SiDotnet />, color: "bg-purple-500" },
    "SignalR": { icon: <BsHddNetwork />, color: "bg-blue-500" },
    "Socket.IO": { icon: <BsHddNetwork />, color: "bg-gray-600" },
    "MediatR": { icon: <BsDiagram3Fill />, color: "bg-indigo-500" },
    "WPF": { icon: <FaMicrosoft />, color: "bg-blue-600" },
    "Blazor": { icon: <SiBlazor />, color: "bg-purple-400" },
    "Spring Boot": { icon: <SiSpringboot />, color: "bg-green-600" },
    "Express.js": { icon: <SiExpress />, color: "bg-gray-500" },
    "Express": { icon: <SiExpress />, color: "bg-gray-500" },
    "Node.js": { icon: <FaNodeJs />, color: "bg-green-600" },
    "Background Workers": { icon: <FaCogs />, color: "bg-slate-600" },
    "Microservices": { icon: <BsHddNetwork />, color: "bg-blue-500" },
    "Event-Driven Architecture": { icon: <BsDiagram3Fill />, color: "bg-red-500" },
    "Event-Driven": { icon: <BsDiagram3Fill />, color: "bg-red-500" },
    "Clean Architecture": { icon: <BsDiagram3Fill />, color: "bg-teal-500" },
    "Domain-Driven Design": { icon: <BsDiagram3Fill />, color: "bg-green-500" },
    "Domain Driven Design": { icon: <BsDiagram3Fill />, color: "bg-green-500" },
    "CQRS": { icon: <BsDiagram3Fill />, color: "bg-orange-500" },
    "SOLID Principles": { icon: <BsDiagram3Fill />, color: "bg-cyan-600" },
    "Object-Oriented Design": { icon: <BsDiagram3Fill />, color: "bg-indigo-500" },
    "Design Patterns": { icon: <BsDiagram3Fill />, color: "bg-violet-500" },
    "Serverless": { icon: <FaAws />, color: "bg-orange-400" },
    "Client-Server": { icon: <BsHddNetwork />, color: "bg-purple-500" },
    "React": { icon: <FaReact />, color: "bg-blue-500" },
    "Angular": { icon: <FaAngular />, color: "bg-red-500" },
    "RxJS": { icon: <SiReactivex />, color: "bg-pink-600" },
    "Angular Material": { icon: <FaAngular />, color: "bg-red-400" },
    "Next.js": { icon: <SiNextdotjs />, color: "bg-black" },
    "Redux": { icon: <SiRedux />, color: "bg-purple-500" },
    "Web Workers": { icon: <FaCogs />, color: "bg-slate-500" },
    "Webpack": { icon: <SiWebpack />, color: "bg-sky-600" },
    "Tailwind CSS": { icon: <SiTailwindcss />, color: "bg-blue-400" },
    "Bootstrap": { icon: <FaBootstrap />, color: "bg-purple-500" },
    "Material UI": { icon: <SiMui />, color: "bg-blue-500" },
    "JWT": { icon: <SiJsonwebtokens />, color: "bg-rose-600" },
    "RBAC": { icon: <FaUserShield />, color: "bg-emerald-600" },
    "2FA": { icon: <FaUserShield />, color: "bg-emerald-500" },
    "HMAC-SHA256 request signing": { icon: <FaShieldAlt />, color: "bg-rose-500" },
    "Web Crypto API": { icon: <FaShieldAlt />, color: "bg-rose-500" },
    "SHA-256 hashing": { icon: <FaShieldAlt />, color: "bg-rose-500" },
    "Route Guards": { icon: <FaShieldAlt />, color: "bg-emerald-600" },
    "Rate Limiting": { icon: <FaShieldAlt />, color: "bg-amber-600" },
    "SQL Server": { icon: <DiMsqlServer />, color: "bg-blue-600" },
    "MSSQL": { icon: <DiMsqlServer />, color: "bg-blue-600" },
    "PostgreSQL": { icon: <BiLogoPostgresql />, color: "bg-blue-500" },
    "Redis": { icon: <DiRedis />, color: "bg-red-500" },
    "MySQL": { icon: <SiMysql />, color: "bg-blue-600" },
    "MongoDB": { icon: <SiMongodb />, color: "bg-green-500" },
    "Azure Table Storage": { icon: <VscAzure />, color: "bg-blue-500" },
    "SQLite": { icon: <SiSqlite />, color: "bg-blue-400" },
    "Query Optimization & Indexing": { icon: <TbDatabaseSearch />, color: "bg-cyan-600" },
    "Azure": { icon: <VscAzure />, color: "bg-blue-500" },
    "AWS": { icon: <FaAws />, color: "bg-orange-400" },
    "Google Cloud": { icon: <SiGooglecloud />, color: "bg-sky-500" },
    "Docker": { icon: <FaDocker />, color: "bg-blue-500" },
    "Kubernetes": { icon: <SiKubernetes />, color: "bg-blue-600" },
    "CI/CD": { icon: <FaCogs />, color: "bg-amber-600" },
    "Git": { icon: <FaGitAlt />, color: "bg-red-500" },
    "GitHub Actions": { icon: <SiGithubactions />, color: "bg-slate-700" },
    "ArgoCD": { icon: <SiArgo />, color: "bg-orange-500" },
    "Kustomize": { icon: <SiKubernetes />, color: "bg-blue-500" },
    "Nginx": { icon: <SiNginx />, color: "bg-green-600" },
    "IIS": { icon: <FaMicrosoft />, color: "bg-blue-500" },
    "Bash": { icon: <SiGnubash />, color: "bg-gray-700" },
    "Jenkins": { icon: <LiaJenkins />, color: "bg-red-400" },
    "Azure DevOps": { icon: <VscAzureDevops />, color: "bg-blue-500" },
    "OpenAPI / Swagger": { icon: <SiSwagger />, color: "bg-green-500" },
    "HTTP": { icon: <BsHddNetwork />, color: "bg-sky-600" },
    "RabbitMQ": { icon: <SiRabbitmq />, color: "bg-orange-400" },
    "gRPC": { icon: <BsHddNetwork />, color: "bg-blue-400" },
    "Protobuf": { icon: <SiProtodotio />, color: "bg-indigo-600" },
    "Google Drive API": { icon: <SiGoogledrive />, color: "bg-yellow-500" },
    "Facebook Messenger Platform": { icon: <SiMessenger />, color: "bg-blue-500" },
    "API Integration": { icon: <BsHddNetwork />, color: "bg-teal-600" },
    "OpenAI Platform API": { icon: <SiOpenai />, color: "bg-emerald-700" },
    "Google Gemini API": { icon: <SiGooglegemini />, color: "bg-indigo-500" },
    "RAG": { icon: <BsDiagram3Fill />, color: "bg-fuchsia-600" },
    "Google Cloud Vision API": { icon: <SiGooglecloud />, color: "bg-sky-500" },
    "OpenCV": { icon: <SiOpencv />, color: "bg-green-600" },
    "Rasa NLP": { icon: <BsDiagram3Fill />, color: "bg-purple-600" },
    "Optimizely Opal": { icon: <BsDiagram3Fill />, color: "bg-blue-700" },
    "Schema-Constrained JSON Output": { icon: <BsDiagram3Fill />, color: "bg-slate-600" },
    "Claude Code": { icon: <SiClaude />, color: "bg-orange-600" },
    "Cursor IDE": { icon: <FaCogs />, color: "bg-slate-800" },
    "GitHub Copilot": { icon: <SiGithubcopilot />, color: "bg-slate-700" },
    "MCP-based workflows": { icon: <BsHddNetwork />, color: "bg-violet-600" },
    "Google Cloud Vision OCR": { icon: <SiGooglecloud />, color: "bg-sky-500" },
    "PDF.js": { icon: <FaFilePdf />, color: "bg-red-600" },
    "Ghostscript": { icon: <FaFilePdf />, color: "bg-red-500" },
    "OpenCV Table Extraction": { icon: <SiOpencv />, color: "bg-green-600" },
    "SHA-256 OCR Caching": { icon: <FaShieldAlt />, color: "bg-rose-500" },
    "Multi-Threaded Batch Processing": { icon: <FaCogs />, color: "bg-slate-600" },
    "Optimizely Configured Commerce": { icon: <BsHddNetwork />, color: "bg-blue-700" },
    "Sitecore": { icon: <SiSitecore />, color: "bg-red-600" },
    "TDD": { icon: <FaVial />, color: "bg-lime-600" },
    "NUnit": { icon: <FaVial />, color: "bg-green-600" },
    "xUnit": { icon: <FaVial />, color: "bg-green-500" },
    "Playwright": { icon: <FaVial />, color: "bg-emerald-600" },
    "Unit Testing": { icon: <FaVial />, color: "bg-lime-600" },
    "Integration Testing": { icon: <FaVial />, color: "bg-teal-600" },
    "Agile": { icon: <FaTasks />, color: "bg-sky-600" },
    "Jira": { icon: <FaJira />, color: "bg-blue-400" },
    "Pull-Request Review": { icon: <FaGitAlt />, color: "bg-red-500" },
    "Pair Programming": { icon: <FaUsers />, color: "bg-amber-600" },
    "Mentoring": { icon: <FaUsers />, color: "bg-violet-500" },
    "SignalR & Socket.io": { icon: <BsHddNetwork />, color: "bg-blue-500" }
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
      title: ".NET & Backend", 
      items: skills.dotnetBackend,
      headerGradient: "from-indigo-600 to-purple-600",
      glowColor: "bg-indigo-500/20"
    },
    { 
      title: "Architecture & Patterns", 
      items: skills.architecturesPatterns,
      headerGradient: "from-green-600 to-teal-600",
      glowColor: "bg-green-500/20"
    },
    { 
      title: "Front-End", 
      items: skills.frontEndTechnologies,
      headerGradient: "from-pink-600 to-rose-600",
      glowColor: "bg-pink-500/20"
    },
    { 
      title: "Node.js", 
      items: skills.nodeJs,
      headerGradient: "from-lime-600 to-green-600",
      glowColor: "bg-lime-500/20"
    },
    { 
      title: "Security & Auth", 
      items: skills.securityAuth,
      headerGradient: "from-rose-600 to-red-600",
      glowColor: "bg-rose-500/20"
    },
    { 
      title: "Databases & Caching", 
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
      title: "Cloud-Native & DevOps", 
      items: skills.devOpsTools,
      headerGradient: "from-amber-600 to-orange-600",
      glowColor: "bg-amber-500/20"
    },
    { 
      title: "APIs & Messaging", 
      items: skills.apisMessaging,
      headerGradient: "from-teal-600 to-cyan-600",
      glowColor: "bg-teal-500/20"
    },
    { 
      title: "AI & LLM Integration", 
      items: skills.aiLlmIntegration,
      headerGradient: "from-fuchsia-600 to-purple-600",
      glowColor: "bg-fuchsia-500/20"
    },
    { 
      title: "AI-Assisted Development", 
      items: skills.aiAssistedDevelopment,
      headerGradient: "from-violet-600 to-fuchsia-600",
      glowColor: "bg-violet-500/20"
    },
    { 
      title: "Document Processing & OCR", 
      items: skills.documentProcessingOcr,
      headerGradient: "from-orange-600 to-red-600",
      glowColor: "bg-orange-500/20"
    },
    { 
      title: "Platforms & Products", 
      items: skills.platformsProducts,
      headerGradient: "from-sky-600 to-indigo-600",
      glowColor: "bg-sky-500/20"
    },
    { 
      title: "Testing", 
      items: skills.testing,
      headerGradient: "from-emerald-600 to-green-600",
      glowColor: "bg-emerald-500/20"
    },
    { 
      title: "Methodologies", 
      items: skills.methodologies,
      headerGradient: "from-slate-600 to-gray-600",
      glowColor: "bg-slate-500/20"
    }
  ];

  return (
    <section id="skills" className="py-2 relative overflow-hidden">
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