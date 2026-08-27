'use client';

import { motion } from 'framer-motion';

interface Metric {
  value: string;
  label: string;
}

interface FeaturedItem {
  title: string;
  tagline: string;
  description: string;
  role?: string;
  period?: string;
  metrics: Metric[];
  techStack: string[];
}

interface FeaturedWorkProps {
  featured: FeaturedItem[];
}

export default function FeaturedWork({ featured }: FeaturedWorkProps) {
  if (!featured || featured.length === 0) return null;

  return (
    <section id="featured" className="py-2 relative overflow-hidden">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Featured Work</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#a855f7] to-[#6366f1] mx-auto rounded-full"></div>
          <p className="mt-4 text-gray-400">The two pieces of work I would want you to look at first</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {featured.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative bg-[#0300147a] backdrop-blur-xl p-6 rounded-xl border border-[#ffffff18] shadow-xl overflow-hidden hover:border-[#a855f7]/40 transition-all duration-300"
            >
              <div className="absolute -right-16 -top-16 w-40 h-40 rounded-full bg-purple-500/10 blur-2xl"></div>

              <div className="relative">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
                  <h3 className="text-xl font-bold bg-gradient-to-r from-[#a855f7] to-[#6366f1] bg-clip-text text-transparent">
                    {item.title}
                  </h3>
                  {item.period && (
                    <span className="text-xs text-gray-400 bg-[#ffffff0a] px-2 py-0.5 rounded-full border border-[#ffffff12]">
                      {item.period}
                    </span>
                  )}
                </div>

                {item.role && <p className="text-sm text-gray-400 mb-3">{item.role}</p>}

                <p className="text-[15px] text-gray-200 font-medium mb-3">{item.tagline}</p>
                <p className="text-[15px] text-gray-300 leading-relaxed mb-5">{item.description}</p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
                  {item.metrics.map((m) => (
                    <div
                      key={m.label}
                      className="p-3 rounded-lg bg-[#ffffff08] border border-[#ffffff12] text-center"
                    >
                      <div className="text-lg font-bold bg-gradient-to-r from-[#a855f7] to-[#6366f1] bg-clip-text text-transparent">
                        {m.value}
                      </div>
                      <div className="mt-0.5 text-[11px] text-gray-400 leading-tight">{m.label}</div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2">
                  {item.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-[11px] px-2 py-1 rounded-md bg-[#ffffff0a] text-gray-300 border border-[#ffffff12]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
