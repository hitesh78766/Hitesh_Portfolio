import { useEffect, useRef, useState } from 'react';
import { Building2, Calendar, MapPin, ChevronRight } from 'lucide-react';

interface ExperienceItem {
  id: number;
  role: string;
  company: string;
  location: string;
  period: string;
  description: string;
  achievements: string[];
  side: 'left' | 'right';
}

const experiences: ExperienceItem[] = [
  {
    id: 1,
    role: 'Frontend Developer',
    company: 'Eligo Creative Services Pvt. Ltd.',
    location: 'Shimla, Himachal Pradesh',
    period: 'Present',
    description: 'Working on live production client projects and delivering production-ready UI solutions.',
    achievements: [
      'Contributed to the development of TripNavigate (travel platform)',
      'Worked on business websites including Skykoda.com',
      'Built reusable React components to improve UI consistency',
      'Utilized AI development tools to enhance coding efficiency',
    ],
    side: 'left',
  },
  {
    id: 2,
    role: 'Web Development Trainee',
    company: 'BigBoxx Technologies',
    location: 'Chandigarh, India',
    period: '6 Months Training',
    description: 'Learned modern frontend development practices and built multiple projects.',
    achievements: [
      'Learned React.js, Next.js, and modern frontend technologies',
      'Built multiple responsive web applications and mini projects',
      'Mastered HTML, CSS, JavaScript, and Bootstrap',
    ],
    side: 'right',
  },
];

const Experience = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [lineProgress, setLineProgress] = useState(0);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Animate line progress
          setTimeout(() => setLineProgress(100), 500);
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
  
  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[120px]" />
      </div>
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-700 opacity-100 translate-y-0`}>
          <span className="inline-block px-3 md:px-4 py-2 rounded-full bg-[#7B68EE]/10 text-[#7B68EE] text-xs md:text-sm font-medium mb-4">
            Journey
          </span>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4">
            Career <span className="gradient-text">Timeline</span>
          </h2>
          <p className="text-[#B8B8D1] text-sm md:text-lg max-w-2xl mx-auto">
            1+ years of crafting digital experiences and building modern web applications
          </p>
        </div>
        
        {/* Timeline */}
        <div className="relative max-w-5xl mx-auto">
          {/* Center Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 hidden lg:block">
            {/* Background Line */}
            <div className="absolute inset-0 bg-[#1A1A2E] rounded-full" />
            {/* Progress Line */}
            <div 
              className="absolute top-0 left-0 right-0 bg-gradient-to-b from-[#7B68EE] to-[#5C8DF6] rounded-full transition-all duration-2000 ease-out"
              style={{ height: `${lineProgress}%` }}
            />
          </div>
          
          {/* Mobile Line */}
          <div className="absolute left-4 top-0 bottom-0 w-1 lg:hidden">
            <div className="absolute inset-0 bg-[#1A1A2E] rounded-full" />
            <div 
              className="absolute top-0 left-0 right-0 bg-gradient-to-b from-[#7B68EE] to-[#5C8DF6] rounded-full transition-all duration-2000 ease-out"
              style={{ height: `${lineProgress}%` }}
            />
          </div>
          
          {/* Experience Items */}
          <div className="space-y-12 lg:space-y-0">
            {experiences.map((exp, index) => (
              <div
                key={exp.id}
                className={`relative lg:grid lg:grid-cols-2 lg:gap-8 ${
                  index !== experiences.length - 1 ? 'lg:pb-16' : ''
                }`}
              >
                {/* Timeline Node */}
                <div 
                  className={`absolute left-4 lg:left-1/2 w-5 h-5 -translate-x-1/2 rounded-full border-4 border-[#0F0F1A] z-10 transition-all duration-500 ${
                    isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                  } ${activeIndex === index ? 'bg-[#7B68EE] shadow-[0_0_20px_rgba(123,104,238,0.8)]' : 'bg-[#5C8DF6]'}`}
                  style={{ 
                    transitionDelay: `${500 + index * 200}ms`,
                    top: '24px',
                  }}
                />
                
                {/* Content Card */}
                <div 
                  className={`ml-12 lg:ml-0 ${
                    exp.side === 'right' ? 'lg:col-start-2' : 'lg:col-start-1 lg:text-right'
                  }`}
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                >
                  <div 
                    className={`glass-card rounded-2xl p-6 transition-all duration-500 hover-lift ${
                      isVisible ? 'opacity-100 translate-x-0' : `opacity-0 ${exp.side === 'left' ? '-translate-x-10' : 'translate-x-10'}`
                    } ${activeIndex === index ? 'border-[#7B68EE]/50 shadow-[0_0_30px_rgba(123,104,238,0.2)]' : ''}`}
                    style={{ transitionDelay: `${600 + index * 200}ms` }}
                  >
                    {/* Header */}
                    <div className={`flex flex-wrap items-center gap-3 mb-3 ${exp.side === 'left' ? 'lg:justify-end' : ''}`}>
                      <span className="px-2 md:px-3 py-1 rounded-full bg-gradient-to-r from-[#7B68EE]/20 to-[#5C8DF6]/20 text-[#7B68EE] text-xs md:text-sm font-medium flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {exp.period}
                      </span>
                      <span className="px-2 md:px-3 py-1 rounded-full bg-[#1A1A2E] text-[#B8B8D1] text-xs md:text-sm flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {exp.location}
                      </span>
                    </div>
                    
                    {/* Role & Company */}
                    <h3 className="text-lg md:text-xl font-bold text-white mb-1">{exp.role}</h3>
                    <div className={`flex items-center gap-2 mb-4 ${exp.side === 'left' ? 'lg:justify-end' : ''}`}>
                      <Building2 className="w-4 h-4 text-[#7B68EE]" />
                      <span className="text-[#B8B8D1] font-medium">{exp.company}</span>
                    </div>
                    
                    {/* Description */}
                    <p className="text-[#B8B8D1] text-sm md:text-base mb-4">{exp.description}</p>
                    
                    {/* Achievements */}
                    <div className="space-y-2">
                      {exp.achievements.map((achievement, i) => (
                        <div 
                          key={i}
                          className={`flex items-start gap-2 ${exp.side === 'left' ? 'lg:flex-row-reverse lg:text-right' : ''}`}
                        >
                          <ChevronRight className="w-4 h-4 text-[#7B68EE] mt-0.5 flex-shrink-0" />
                          <span className="text-xs md:text-sm text-[#B8B8D1] leading-relaxed flex-1">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Empty space for alternating layout */}
                {exp.side === 'right' && <div className="hidden lg:block lg:col-start-1" />}
              </div>
            ))}
          </div>
        </div>
        
        {/* Summary Stats */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-3xl mx-auto justify-center transition-all duration-700 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {[
            { value: '1+', label: 'Years Experience' },
            { value: '6+', label: 'Frontend Projects' },
            { value: '10+', label: 'Technologies' },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="text-center glass-card p-4 rounded-xl"
              style={{ transitionDelay: `${1100 + index * 100}ms` }}
            >
              <div className="text-2xl md:text-3xl font-bold gradient-text mb-1">{stat.value}</div>
              <div className="text-[#B8B8D1] text-xs md:text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
