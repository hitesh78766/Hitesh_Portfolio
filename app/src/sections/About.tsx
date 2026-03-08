import { useEffect, useRef, useState } from 'react';
import { Code2, Users, Award, Briefcase } from 'lucide-react';

interface StatProps {
  icon: React.ElementType;
  value: number;
  suffix: string;
  label: string;
  delay: number;
  isVisible: boolean;
}

const AnimatedStat = ({ icon: Icon, value, suffix, label, delay, isVisible }: StatProps) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (!isVisible) return;
    
    const timeout = setTimeout(() => {
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;
      
      const interval = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(interval);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
      
      return () => clearInterval(interval);
    }, delay);
    
    return () => clearTimeout(timeout);
  }, [isVisible, value, delay]);
  
  return (
    <div 
      className={`glass-card p-6 rounded-2xl text-center hover-lift transition-all duration-500 ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br from-[#7B68EE]/20 to-[#5C8DF6]/20 flex items-center justify-center">
        <Icon className="w-7 h-7 text-[#7B68EE]" />
      </div>
      <div className="text-2xl md:text-4xl font-bold gradient-text mb-1">
        {count}{suffix}
      </div>
      <div className="text-[#B8B8D1] text-sm">{label}</div>
    </div>
  );
};

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
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
  
  const stats = [
    { icon: Briefcase, value: 1, suffix: '+', label: 'Years Experience' },
    { icon: Code2, value: 6, suffix: '+', label: 'Frontend Projects' },
    { icon: Users, value: 5, suffix: '+', label: 'Happy Clients' },
    { icon: Award, value: 1, suffix: '', label: 'Certification' },
  ];
  
  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/10 rounded-full blur-[120px]" />
      
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-700 opacity-100 translate-y-0`}>
          <span className="inline-block px-3 md:px-4 py-2 rounded-full bg-[#7B68EE]/10 text-[#7B68EE] text-xs md:text-sm font-medium mb-4">
            About Me
          </span>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4">
            The <span className="gradient-text">Developer</span> Behind the Code
          </h2>
        </div>
        
        {/* Main Content Card */}
        <div 
      className={`glass-card rounded-3xl p-8 lg:p-12 mb-16 transition-all duration-700 delay-200 opacity-100 translate-y-0`}
          style={{ perspective: '1000px' }}
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Text */}
            <div className="space-y-6">
              <p className="text-sm md:text-lg text-[#B8B8D1] leading-relaxed">
                Passionate and detail-oriented <span className="text-white font-semibold">Frontend Developer</span> with hands-on 
                experience in building modern, responsive, and high-performance web applications using React.js and Next.js.
              </p>
              <p className="text-sm md:text-lg text-[#B8B8D1] leading-relaxed">
                Experienced in working on <span className="text-white font-semibold">live client projects</span> and delivering 
                production-ready UI solutions. Skilled in leveraging AI-powered development tools to improve 
                productivity, code quality, and development speed.
              </p>
              <p className="text-sm md:text-lg text-[#B8B8D1] leading-relaxed">
                I specialize in converting design files into responsive, pixel-perfect web interfaces 
                and building reusable components for UI consistency.
              </p>
              
              {/* Skills Tags */}
              <div className="flex flex-wrap gap-3 pt-4">
                {['Problem Solver', 'UI/UX Enthusiast', 'Performance Geek'].map((tag, index) => (
                  <span
                    key={tag}
                    className={`px-3 md:px-4 py-2 rounded-full bg-[#7B68EE]/10 text-[#7B68EE] text-xs md:text-sm font-medium border border-[#7B68EE]/20 transition-all duration-500 hover:bg-[#7B68EE]/20 hover:scale-105 ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}
                    style={{ transitionDelay: `${400 + index * 100}ms` }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Right - Visual */}
            <div className="relative">
              {/* Code Snippet Visual */}
              <div className="glass-card rounded-2xl p-6 font-mono text-sm">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="ml-4 text-[#B8B8D1] text-xs">about-me.js</span>
                </div>
                <div className="space-y-2 text-[#B8B8D1]">
                  <div>
                    <span className="text-[#7B68EE]">const</span>{' '}
                    <span className="text-[#5C8DF6]">developer</span> = {'{'}
                  </div>
                  <div className="pl-4">
                    <span className="text-[#B8B8D1]">name:</span>{' '}
                    <span className="text-green-400">'Hitesh Sharma'</span>,
                  </div>
                  <div className="pl-4">
                    <span className="text-[#B8B8D1]">role:</span>{' '}
                    <span className="text-green-400">'Frontend Developer'</span>,
                  </div>
                  <div className="pl-4">
                    <span className="text-[#B8B8D1]">experience:</span>{' '}
                    <span className="text-orange-400">1+</span>,
                  </div>
                  <div className="pl-4">
                    <span className="text-[#7B68EE]">skills</span>: () ={'>'} {'['}
                  </div>
                  <div className="pl-8 text-green-400">
                    'React', 'Next.js', 'Vue', 'TypeScript'
                  </div>
                  <div className="pl-4">{']'}</div>
                  <div>{'}'}</div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-[#7B68EE] to-[#5C8DF6] rounded-xl flex items-center justify-center animate-float shadow-lg">
                <Code2 className="w-10 h-10 text-white" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <AnimatedStat
              key={stat.label}
              {...stat}
              delay={index * 150}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;

