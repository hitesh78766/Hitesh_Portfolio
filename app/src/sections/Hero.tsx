import { useEffect, useRef } from 'react';
import { ArrowDown, Linkedin, Facebook } from 'lucide-react';

const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {

    // Particle animation
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      opacity: number;
    }> = [];

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, i) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(123, 104, 238, ${particle.opacity})`;
        ctx.fill();

        // Draw connections
        particles.slice(i + 1).forEach((other) => {
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(123, 104, 238, ${0.1 * (1 - distance / 150)})`;
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
      />

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-600/20 rounded-full blur-[100px] animate-float-delayed" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Text Content */}
          <div className={`space-y-8 transition-all duration-1000 opacity-100 translate-y-0`}>
            {/* Greeting */}
            <div className="space-y-2">
              <p className="text-sm md:text-lg text-[#B8B8D1] font-medium tracking-wide">
                <span className="inline-block animate-pulse">👋</span> Hello, I'm
              </p>
              <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold">
                <span className="gradient-text">Hitesh Sharma</span>
              </h1>
            </div>

            {/* Role */}
            <div className="relative">
              <h2 className="text-xl md:text-3xl lg:text-4xl font-semibold text-white">
                Frontend{' '}
                <span className="relative">
                  <span className="text-[#7B68EE]">Developer</span>
                  <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#7B68EE] to-[#5C8DF6] rounded-full" />
                </span>
              </h2>
            </div>

            {/* Description */}
            <p className="text-sm md:text-lg text-[#B8B8D1] leading-relaxed max-w-xl">
              I craft high-performance, accessible, and visually stunning web experiences.
              <span className="text-white font-semibold"> 1+ years</span> of hands-on experience
              building modern frontend applications. Passionate about creating interfaces that feel like magic.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={scrollToProjects}
                className="magnetic-btn group relative px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-[#7B68EE] to-[#5C8DF6] rounded-full text-white font-semibold text-sm md:text-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(123,104,238,0.5)] hover:scale-105"
              >
                <span className="relative z-10 flex items-center gap-2">
                  View My Work
                  <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                </span>
              </button>

              <a
                href="/Hitesh_Resume.pdf"
                download
                className="px-6 md:px-8 py-3 md:py-4 border-2 border-[#7B68EE]/50 rounded-full text-white font-semibold text-sm md:text-lg hover:border-[#7B68EE] hover:bg-[#7B68EE]/10 transition-all duration-300"
              >
                Download Resume
              </a>
            </div>

            {/* Social Links */}
            {/* <div className="flex gap-4 pt-4">
              {[
                { icon: Facebook, href: 'https://m.me/Hitesh.Sharma.78766', label: 'Facebook' },
                { icon: Linkedin, href: 'https://linkedin.com/in/hitesh-sharma-7509232a6', label: 'LinkedIn' },
              ].map((social, index) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-[#1A1A2E] border border-[#7B68EE]/30 flex items-center justify-center text-[#B8B8D1] hover:text-white hover:border-[#7B68EE] hover:bg-[#7B68EE]/20 transition-all duration-300 hover:scale-110"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div> */}
          </div>

          {/* Right - Profile Image */}
          <div className={`relative flex justify-center lg:justify-end transition-all duration-1000 delay-300 opacity-100 translate-x-0`}>
            {/* Decorative Rings */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[400px] h-[400px] border border-[#7B68EE]/20 rounded-full animate-rotate-slow" />
              <div className="absolute w-[350px] h-[350px] border border-[#5C8DF6]/20 rounded-full animate-rotate-slow" style={{ animationDirection: 'reverse', animationDuration: '25s' }} />
              <div className="absolute w-[450px] h-[450px] border border-dashed border-[#7B68EE]/10 rounded-full animate-rotate-slow" style={{ animationDuration: '30s' }} />
            </div>

            {/* Image Container */}
            <div className="relative w-80 h-96 lg:w-96 lg:h-[480px] rounded-3xl overflow-hidden gradient-border animate-pulse-glow">
              <img
                src="/images/image-profile.jpg"
                alt="Hitesh Sharma"
                className="w-full h-full object-cover"
              />

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F1A]/60 via-transparent to-transparent" />

              {/* Floating Badge */}
              <div className="absolute -bottom-3 -left-3 glass-card px-6 py-3 rounded-2xl ">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-white font-semibold">Available for work</span>
                </div>
              </div>

              {/* Experience Badge */}
              <div className="absolute -top-2 -right-3 glass-card px-4 py-2 rounded-xl ">
                <span className="text-2xl font-bold gradient-text">1+</span>
                <span className="text-[#B8B8D1] text-sm block">Years Exp.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0F0F1A] to-transparent" />
    </section>
  );
};

export default Hero;
