import { useRef, useState } from 'react';
import { Send, Mail, MapPin, Phone, Linkedin, Facebook, CheckCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';

const Contact = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // EmailJS Configuration
      const serviceID = 'service_p15usfn';
      const templateID = 'template_ql8s77v';
      const publicKey = 'qSGXzdjPJiwMFl0b0';

      await emailjs.send(serviceID, templateID, {
        from_name: formState.name,
        from_email: formState.email,
        message: formState.message,
        to_email: 'hs760950@gmail.com',
      }, publicKey);

      toast.success('Message sent successfully! I\'ll get back to you soon.');

      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({ name: '', email: '', message: '' });

      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      setIsSubmitting(false);

      const errorMessage = error as any;
      if (errorMessage.text === 'The Public Key is invalid') {
        toast.error('EmailJS configuration error. Please check your Public Key.');
      } else if (errorMessage.status === 400) {
        toast.error('Invalid request. Please check your EmailJS configuration.');
      } else {
        toast.error('Failed to send message. Please try again later.');
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'hs760950@gmail.com', href: 'mailto:hs760950@gmail.com' },
    { icon: Phone, label: 'Phone', value: '+91 7876697516', href: 'tel:+917876697516' },
    { icon: MapPin, label: 'Location', value: 'Shimla, Himachal Pradesh', href: '#' },
  ];

  const socialLinks = [
    { icon: Facebook, href: 'https://m.me/Hitesh.Sharma.78766', label: 'Facebook' },
    { icon: Linkedin, href: 'https://linkedin.com/in/hitesh-sharma-7509232a6', label: 'LinkedIn' },
  ];

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-700 opacity-100 translate-y-0`}>
          <span className="inline-block px-3 md:px-4 py-2 rounded-full bg-[#7B68EE]/10 text-[#7B68EE] text-xs md:text-sm font-medium mb-4">
            Get In Touch
          </span>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4">
            Let's Build the <span className="gradient-text">Future</span>
          </h2>
          <p className="text-[#B8B8D1] text-sm md:text-lg max-w-2xl mx-auto">
            Have a project in mind? Let's create something amazing together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Left - Contact Info */}
          <div className={`space-y-8 transition-all duration-700 delay-200 opacity-100 translate-x-0`}>
            <div className="glass-card rounded-3xl p-8">
              <h3 className="text-lg md:text-2xl font-bold text-white mb-6">Contact Information</h3>

              {/* Contact Details */}
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-4 group"
                    style={{
                      opacity: 1,
                      transform: 'translateX(0)',
                      transition: `all 0.5s ease ${300 + index * 100}ms`,
                    }}
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#7B68EE]/20 to-[#5C8DF6]/20 flex items-center justify-center group-hover:from-[#7B68EE] group-hover:to-[#5C8DF6] transition-all duration-300">
                      <item.icon className="w-5 h-5 text-[#7B68EE] group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <div className="text-[#B8B8D1] text-xs md:text-sm">{item.label}</div>
                      <div className="text-white font-medium group-hover:text-[#7B68EE] transition-colors">
                        {item.value}
                      </div>
                    </div>
                  </a>
                ))}
              </div>


            </div>

            {/* Availability Card
            <div
              className="glass-card rounded-2xl p-6 border-l-4 border-[#7B68EE]"
              style={{
                opacity: 1,
                transform: 'translateY(0)',
                transition: 'all 0.5s ease 800ms',
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <span className="text-white font-semibold text-sm md:text-base">Available for new projects</span>
              </div>
              <p className="text-[#B8B8D1] text-xs md:text-sm">
                I'm currently open to freelance opportunities and full-time positions.
                Let's discuss how I can help bring your vision to life.
              </p>
            </div>
            */}
          </div>

          {/* Right - Contact Form */}
          <div className={`transition-all duration-700 delay-400 opacity-100 translate-x-0`}>
            <div className="glass-card rounded-3xl p-8">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#7B68EE] to-[#5C8DF6] flex items-center justify-center animate-scale-in">
                    <CheckCircle className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-lg md:text-2xl font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-[#B8B8D1] text-sm md:text-base">Thank you for reaching out. I'll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h3 className="text-lg md:text-2xl font-bold text-white mb-6">Send a Message</h3>

                  {/* Name Field */}
                  <div className="relative">
                    <label
                      className={`absolute left-0 transition-all duration-300 ${focusedField === 'name' || formState.name
                          ? 'top-0 text-xs md:text-sm text-[#7B68EE]'
                          : 'top-3 text-xs md:text-sm text-[#B8B8D1]'
                        }`}
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      required
                      autoComplete="off"
                      className="w-full bg-transparent border-b-2 border-[#7B68EE]/30 focus:border-[#7B68EE] py-3 text-white outline-none focus:outline-none transition-colors"
                    />
                    <div
                      className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#7B68EE] to-[#5C8DF6] transition-all duration-300 ${focusedField === 'name' ? 'w-full' : 'w-0'
                        }`}
                    />
                  </div>

                  {/* Email Field */}
                  <div className="relative">
                    <label
                      className={`absolute left-0 transition-all duration-300 ${focusedField === 'email' || formState.email
                          ? 'top-0 text-xs md:text-sm text-[#7B68EE]'
                          : 'top-3 text-xs md:text-sm text-[#B8B8D1]'
                        }`}
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      required
                      autoComplete="off"
                      className="w-full bg-transparent border-b-2 border-[#7B68EE]/30 focus:border-[#7B68EE] py-3 text-white outline-none focus:outline-none transition-colors"
                    />
                    <div
                      className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#7B68EE] to-[#5C8DF6] transition-all duration-300 ${focusedField === 'email' ? 'w-full' : 'w-0'
                        }`}
                    />
                  </div>

                  {/* Message Field */}
                  <div className="relative">
                    <label
                      className={`absolute left-0 transition-all duration-300 ${focusedField === 'message' || formState.message
                          ? 'top-0 text-xs md:text-sm text-[#7B68EE]'
                          : 'top-3 text-xs md:text-sm text-[#B8B8D1]'
                        }`}
                    >
                      Your Message
                    </label>
                    <textarea
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      required
                      rows={4}
                      autoComplete="off"
                      className="w-full bg-transparent py-3 text-white outline-none focus:outline-none transition-colors resize-none"
                    />
                    <div
                      className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#7B68EE] to-[#5C8DF6] transition-all duration-300 ${focusedField === 'message' ? 'w-full' : 'w-0'
                        }`}
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 md:py-4 bg-gradient-to-r from-[#7B68EE] to-[#5C8DF6] rounded-xl text-white font-semibold text-sm md:text-base flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(123,104,238,0.5)] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed group"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
