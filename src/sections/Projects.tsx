import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Eye } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  liveUrl: string;
  githubUrl: string;
}

const projects: Project[] = [
  {
    id: 8,
    title: 'TrackItinerary',
    category: 'SaaS',
    description: 'Multi-Tenant SaaS CRM for travel agencies supporting lead management, itinerary creation, automated follow-ups, and booking operations.',
    image: '/images/project-8.jpg',
    liveUrl: 'https://trackitinerary.com/',
    githubUrl: '#',
  },
  {
    id: 9,
    title: 'Mindcraft',
    category: 'Design',
    description: 'Interactive interior design platform showcasing projects, services, and design concepts with API-driven functionality.',
    image: '/images/project-1.jpg',
    liveUrl: '#',
    githubUrl: '#',
  },

  {
    id: 2,
    title: 'TripNavigate',
    category: 'Travel',
    description: 'Comprehensive travel navigation platform helping users discover and plan their perfect journeys.',
    image: '/images/project-2.jpg',
    liveUrl: 'https://www.google.com/search?q=tripnavigate',
    githubUrl: '#',
  },
];

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => observer.disconnect();
  }, []);
  
  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/3 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]" />
      </div>
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-12 transition-all duration-700 opacity-100 translate-y-0`}>
          <span className="inline-block px-3 md:px-4 py-2 rounded-full bg-[#7B68EE]/10 text-[#7B68EE] text-xs md:text-sm font-medium mb-4">
            Portfolio
          </span>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4">
            Selected <span className="gradient-text">Works</span>
          </h2>
          <p className="text-[#B8B8D1] text-sm md:text-lg max-w-2xl mx-auto">
            A showcase of my recent projects and creative endeavors
          </p>
        </div>
        
        {/* Projects Grid */}
        <div className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`w-full md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] max-w-[400px] group relative glass-card rounded-2xl overflow-hidden transition-all duration-500 hover-lift opacity-100 translate-y-0`}
              style={{ 
                transitionDelay: `${300 + index * 100}ms`,
                animation: `float ${5 + index * 0.5}s ease-in-out infinite`,
                animationDelay: `${index * 0.3}s`,
              }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t from-[#0F0F1A] via-[#0F0F1A]/50 to-transparent transition-opacity duration-300 ${
                  hoveredProject === project.id ? 'opacity-90' : 'opacity-0'
                }`} />
                
                {/* Hover Actions */}
                <div className={`absolute inset-0 flex items-center justify-center gap-4 transition-all duration-300 ${
                  hoveredProject === project.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}>
                  {project.liveUrl !== '#' && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-[#7B68EE] flex items-center justify-center text-white hover:bg-[#5C8DF6] hover:scale-110 transition-all duration-300"
                    >
                      <Eye className="w-5 h-5" />
                    </a>
                  )}
                  
                </div>
                
                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 rounded-full bg-[#0F0F1A]/80 backdrop-blur-sm text-xs text-[#B8B8D1] border border-[#7B68EE]/20">
                    {project.category}
                  </span>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-[#7B68EE] transition-colors duration-300">
                  {project.title}
                </h3>
                <div className="group/desc relative">
                  <p className="text-[#B8B8D1] text-xs md:text-sm mb-4 line-clamp-2 transition-all duration-300 cursor-help">
                    {project.description}
                  </p>
                  
                  {/* Custom Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 p-4 bg-gradient-to-r from-[#2D2D44] to-[#1A1A2E] border border-[#7B68EE]/50 rounded-xl shadow-2xl opacity-0 invisible group-hover/desc:opacity-100 group-hover/desc:visible transition-all duration-300 z-50 min-w-[300px] max-w-[400px]">
                    <p className="text-white text-xs md:text-sm leading-relaxed">
                      {project.description}
                    </p>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[10px] border-r-[10px] border-t-[10px] border-transparent border-t-[#2D2D44] -mt-[1px]"></div>
                  </div>
                </div>
                
              </div>
              
              {/* Bottom Glow */}
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#7B68EE] to-[#5C8DF6] transition-transform duration-300 ${
                hoveredProject === project.id ? 'scale-x-100' : 'scale-x-0'
              }`} />
            </div>
          ))}
        </div>
        
        {/* View All Button */}
        <div className={`text-center mt-12 transition-all duration-700 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <button className="magnetic-btn group inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 border-2 border-[#7B68EE]/50 rounded-full text-white font-semibold text-sm md:text-base hover:border-[#7B68EE] hover:bg-[#7B68EE]/10 transition-all duration-300">
            View All Projects
            <ExternalLink className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
