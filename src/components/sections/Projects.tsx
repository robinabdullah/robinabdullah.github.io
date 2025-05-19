'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaGithub, FaExternalLinkAlt, FaBuilding } from 'react-icons/fa';

interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  techStack: string[];
  skills: string[];
  date: string;
  associatedWith?: string;
  imageUrl: string;
  githubLink?: string;
  liveDemoLink?: string;
}

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  const [filter, setFilter] = useState('All');
  const [visibleCount, setVisibleCount] = useState(9);
  const [mounted, setMounted] = useState(false);

  // Extract unique categories from projects for filter buttons
  const categories = useMemo(() => {
    const uniqueCategories = ['All', ...new Set(projects.map(project => project.category))];
    return uniqueCategories;
  }, [projects]);

  // Filter projects based on selected category
  const filteredProjects = useMemo(() => {
    if (filter === 'All') {
      return projects;
    }
    return projects.filter(project => project.category === filter);
  }, [projects, filter]);

  // Projects to display based on pagination
  const displayedProjects = useMemo(() => {
    return filteredProjects.slice(0, visibleCount);
  }, [filteredProjects, visibleCount]);

  // Handle category change
  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    setVisibleCount(9); // Reset to first page when filter changes
    window.scrollTo({ top: document.getElementById('projects')?.offsetTop || 0, behavior: 'smooth' });
  };

  // Handle "Show More" button click
  const handleShowMore = () => {
    setVisibleCount(prev => Math.min(prev + 9, filteredProjects.length));
  };
  
  // Set mounted state to true after component mounts
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section id="projects" className="py-2 bg-dark/10 backdrop-blur-sm">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Projects</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-light to-primary-dark mx-auto mb-6"></div>
          <p className="text-lg text-gray-200 max-w-3xl mx-auto">
          A collection of my works across various technologies and domains. Each project represents unique challenges and solutions.
          </p>
        </motion.div>

        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {categories.map((category, index) => (
            <motion.button
              key={index}
              onClick={() => handleFilterChange(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === category
                  ? 'bg-gradient-to-r from-primary-light to-primary-dark text-white'
                  : 'bg-white/10 text-gray-200 hover:bg-white/20'
              }`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="wait">
            {mounted && displayedProjects.map((project, index) => (
              <ProjectCard 
                key={project.id} 
                project={project}
                index={index}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Show More button */}
        {filteredProjects.length > visibleCount && (
          <div className="text-center mt-12">
            <motion.button
              onClick={handleShowMore}
              className="button-primary px-6 py-3 rounded-full"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Show More
            </motion.button>
          </div>
        )}
      </div>
    </section>
  );
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  // State to track if the image failed to load
  const [imgError, setImgError] = useState(false);
  
  // Use fallback image if none provided or if there was an error loading the image
  const imageUrl = imgError || !project.imageUrl ? '/images/projects/no-image.png' : project.imageUrl;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4, delay: index % 9 * 0.05 }}
      className="bg-white/5 backdrop-blur-sm rounded-lg project-card-shadow overflow-hidden hover:bg-white/10 h-full flex flex-col"
    >
      <div className="relative h-48 w-full overflow-hidden">
        <Image 
          src={imageUrl} 
          alt={project.title} 
          fill 
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-top transition-transform duration-500 hover:scale-110"
          priority={index < 6}
          onError={() => setImgError(true)}
        />
        
        {project.category && (
          <span className="project-category-badge">
            {project.category}
          </span>
        )}
      </div>
      
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="text-xl font-semibold mb-2 text-white">{project.title}</h3>
        
        <div className="flex flex-col gap-1 mb-3">
          {project.associatedWith && (
            <div className="flex items-center gap-1.5">
              <FaBuilding className="text-primary-light/90 w-3 h-3" />
              <p className="text-sm text-white/80">
                {project.associatedWith}
              </p>
            </div>
          )}
        </div>
        
        <p className="text-gray-300 text-sm mb-auto">
          {project.description}
        </p>
        
        <div className="mt-4">
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.techStack.map((tech, i) => (
              <span 
                key={i} 
                className="project-tech-badge hover:bg-primary-light/20 transition-colors duration-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        
        <div className="flex gap-3 mt-3">
          {project.githubLink && (
            <Link 
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link"
              aria-label="View GitHub repository"
            >
              <FaGithub size={20} />
            </Link>
          )}
          
          {project.liveDemoLink && (
            <div className="relative group">
              <Link 
                href={project.liveDemoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link"
                aria-label="View live demo"
              >
                <FaExternalLinkAlt size={18} />
              </Link>
              <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                View Live Demo
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}