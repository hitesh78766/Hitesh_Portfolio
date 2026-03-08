import { useEffect, useRef, useState } from 'react';

interface Skill {
  name: string;
  icon: string;
  color: string;
  proficiency: number;
  x: number;
  y: number;
  size: 'sm' | 'md' | 'lg';
}

const skills: Skill[] = [
  { name: 'HTML5', icon: '🌐', color: '#E34F26', proficiency: 98, x: 10, y: 30, size: 'lg' },
  { name: 'CSS3', icon: '🎨', color: '#1572B6', proficiency: 95, x: 25, y: 55, size: 'lg' },
  { name: 'JavaScript', icon: '⚡', color: '#F7DF1E', proficiency: 95, x: 45, y: 15, size: 'lg' },
  { name: 'React', icon: '⚛️', color: '#61DAFB', proficiency: 90, x: 70, y: 35, size: 'lg' },
  { name: 'Next.js', icon: '▲', color: '#FFFFFF', proficiency: 85, x: 88, y: 60, size: 'lg' },
  { name: 'Vue.js', icon: '💚', color: '#4FC08D', proficiency: 85, x: 20, y: 75, size: 'md' },
  { name: 'Vuetify', icon: '🔷', color: '#1867C0', proficiency: 85, x: 40, y: 70, size: 'sm' },
  { name: 'TypeScript', icon: '📘', color: '#3178C6', proficiency: 80, x: 55, y: 50, size: 'lg' },
  { name: 'Tailwind', icon: '🌊', color: '#06B6D4', proficiency: 90, x: 80, y: 20, size: 'md' },
  { name: 'Bootstrap', icon: '🅱️', color: '#7952B3', proficiency: 95, x: 30, y: 88, size: 'md' },
  { name: 'Material UI', icon: '🔷', color: '#0081CB', proficiency: 88, x: 65, y: 80, size: 'md' },
  { name: 'Git', icon: '🌿', color: '#F05032', proficiency: 90, x: 90, y: 80, size: 'md' },
  { name: 'Figma', icon: '🎭', color: '#F24E1E', proficiency: 85, x: 5, y: 65, size: 'sm' },
  // { name: 'Node.js', icon: '🟢', color: '#339933', proficiency: 80, x: 95, y: 45, size: 'sm' },
  { name: 'Sass', icon: '🎀', color: '#CC6699', proficiency: 85, x: 75, y: 95, size: 'sm' },
];

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => observer.disconnect();
  }, []);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setMousePos({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        });
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  const getSizeClasses = (size: string) => {
    // All skills have the same size regardless of device
    return 'w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 text-xs md:text-sm lg:text-base';
  };
  
  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[120px]" />
      </div>
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-700 opacity-100 translate-y-0`}>
          <span className="inline-block px-4 py-2 rounded-full bg-[#7B68EE]/10 text-[#7B68EE] text-sm font-medium mb-4">
            Expertise
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Tech <span className="gradient-text">Stack</span>
          </h2>
          <p className="text-[#B8B8D1] text-lg max-w-2xl mx-auto">
            Tools and technologies I use to bring ideas to life
          </p>
        </div>
        
        {/* Skills Galaxy */}
        <div 
          className={`relative h-[500px] md:h-[600px] lg:h-[700px] transition-all duration-1000 opacity-100`}
        >
          {/* Connection Lines SVG */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#7B68EE" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#5C8DF6" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            {isVisible && skills.map((skill, i) => 
              skills.slice(i + 1).map((otherSkill, j) => {
                const distance = Math.sqrt(
                  Math.pow(skill.x - otherSkill.x, 2) + 
                  Math.pow(skill.y - otherSkill.y, 2)
                );
                if (distance < 40) {
                  return (
                    <line
                      key={`${i}-${j}`}
                      x1={`${skill.x}%`}
                      y1={`${skill.y}%`}
                      x2={`${otherSkill.x}%`}
                      y2={`${otherSkill.y}%`}
                      stroke="url(#lineGradient)"
                      strokeWidth="1"
                      className={`transition-opacity duration-300 ${
                        hoveredSkill === skill.name || hoveredSkill === otherSkill.name
                          ? 'opacity-100'
                          : 'opacity-30'
                      }`}
                    />
                  );
                }
                return null;
              })
            )}
          </svg>
          
          {/* Skill Nodes */}
          {skills.map((skill, index) => {
            const isHovered = hoveredSkill === skill.name;
            const isOtherHovered = hoveredSkill && hoveredSkill !== skill.name;
            
            // Calculate parallax offset
            const parallaxX = (mousePos.x - 0.5) * 20 * (index % 3 + 1);
            const parallaxY = (mousePos.y - 0.5) * 20 * (index % 3 + 1);
            
            return (
              <div
                key={skill.name}
                className={`absolute skill-node cursor-pointer ${getSizeClasses(skill.size)}`}
                style={{
                  left: `calc(${skill.x}% - 32px)`,
                  top: `calc(${skill.y}% - 32px)`,
                  transform: `translate(${parallaxX}px, ${parallaxY}px) scale(${isHovered ? 1.2 : 1})`,
                  transitionDelay: `${index * 50}ms`,
                  animation: isVisible ? `float ${4 + index * 0.3}s ease-in-out infinite` : 'none',
                  animationDelay: `${index * 0.2}s`,
                  opacity: isVisible ? (isOtherHovered ? 0.4 : 1) : 0,
                  filter: isOtherHovered ? 'blur(2px)' : 'none',
                }}
                onMouseEnter={() => setHoveredSkill(skill.name)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                <div
                  className={`w-full h-full rounded-2xl glass-card flex flex-col items-center justify-center gap-1 transition-all duration-300 ${
                    isHovered ? 'shadow-[0_0_30px_rgba(123,104,238,0.5)] border-[#7B68EE]' : ''
                  }`}
                  style={{
                    borderColor: isHovered ? skill.color : undefined,
                  }}
                >
                  <span className="text-sm md:text-base lg:text-lg">{skill.icon}</span>
                  <span className="text-white font-medium text-center px-0.5 leading-tight text-[10px] md:text-sm lg:text-base">
                    {skill.name}
                  </span>
                  
                  {/* Proficiency Tooltip */}
                  {isHovered && (
                    <div className="absolute -bottom-10 md:-bottom-12 left-1/2 -translate-x-1/2 glass-card px-2 md:px-3 py-1 rounded-lg whitespace-nowrap z-20">
                      <span className="text-[#7B68EE] font-semibold text-xs md:text-sm">{skill.proficiency}%</span>
                      <span className="text-[#B8B8D1] text-xs ml-1 hidden md:inline">proficiency</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          
          {/* Center Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 md:w-64 md:h-64 bg-gradient-to-r from-[#7B68EE]/20 to-[#5C8DF6]/20 rounded-full blur-[60px] md:blur-[80px] pointer-events-none" />
        </div>
        
        {/* Skills Categories */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {[
            { name: 'Frontend', skills: 'React, Vue, Next.js', icon: '💻' },
            { name: 'Styling', skills: 'Tailwind, Sass, CSS', icon: '🎨' },
            { name: 'Tools', skills: 'Git, GitHub, Figma', icon: '🛠️' },
            { name: 'Languages', skills: 'JS, TypeScript, HTML', icon: '⌨️' },
          ].map((category, index) => (
            <div
              key={category.name}
              className="glass-card p-5 rounded-xl hover-lift transition-all duration-300"
              style={{ transitionDelay: `${600 + index * 100}ms` }}
            >
              <div className="text-3xl mb-2">{category.icon}</div>
              <h4 className="text-white font-semibold mb-1">{category.name}</h4>
              <p className="text-[#B8B8D1] text-sm">{category.skills}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
