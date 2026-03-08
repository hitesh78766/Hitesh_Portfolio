import { Heart, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="relative py-12 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-600/5 rounded-full blur-[150px]" />
      </div>
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Copyright */}
          <div className="text-center md:text-left">
            <a href="#home" className="text-2xl font-bold inline-block mb-2">
              <span className="gradient-text">Hitesh Sharma</span>
            </a>
            <p className="text-[#B8B8D1] text-sm">
              © {currentYear} All rights reserved.
            </p>
          </div>
          
          {/* Made With Love */}
          <div className="flex items-center gap-2 text-[#B8B8D1] text-sm">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
            <span>and lots of</span>
            <span className="text-[#7B68EE] font-medium">coffee</span>
          </div>
          
          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="group w-12 h-12 rounded-full bg-[#1A1A2E] border border-[#7B68EE]/30 flex items-center justify-center text-[#B8B8D1] hover:text-white hover:border-[#7B68EE] hover:bg-[#7B68EE]/20 transition-all duration-300 hover:scale-110"
          >
            <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
        
        {/* Bottom Border */}
        <div className="mt-8 pt-8 border-t border-[#7B68EE]/10">
          <div className="flex flex-wrap justify-center gap-6 text-sm text-[#B8B8D1]">
            <a href="#" className="hover:text-[#7B68EE] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#7B68EE] transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-[#7B68EE] transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
