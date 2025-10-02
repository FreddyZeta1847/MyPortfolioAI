import React from 'react';
import { Github, Linkedin, Mail, Phone } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="pt-28 pb-20 md:min-h-screen flex items-center bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center md:space-x-12">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-1 rounded-full shadow-xl inline-block">
              <div className="bg-white p-2 rounded-full">
                <img 
                  src="/images/profile_pic.jpg" 
                  alt="Federico Santini" 
                  className="w-64 h-64 md:w-80 md:h-80 rounded-full object-cover"
                />
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Hello! I'm <span className="text-blue-600">Federico Santini</span>.
            </h1>

            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              I am an aspiring Computer Engineering student at Politecnico di Milano, having recently graduated with honors in Computer Science from ITIS P. Hensemberger in Monza. Born on August 1st, 2006 in Desio, Italy, I bring a strong foundation in software development and a passion for innovative technology solutions.
            </p>

            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              My technical interests span across game development, artificial intelligence research, and cybersecurity. I am particularly drawn to creating robust, scalable applications and exploring cutting-edge AI technologies. Beyond coding, competitive sports have instilled in me the values of discipline, perseverance, and effective teamwork—qualities I bring to every project I undertake.
            </p>

            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              I am a curious, driven problem-solver with a commitment to continuous learning and collaboration. I thrive in challenging environments where I can leverage technology to create meaningful impact.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <a 
                href="mailto:santinifederico06@gmail.com" 
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-300"
              >
                <Mail size={20} />
                Contact Me
              </a>
              <div className="flex gap-4">
                <a 
                  href="https://github.com/FreddyZeta1847" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-center w-10 h-10 bg-gray-800 hover:bg-gray-900 text-white rounded-full transition-colors duration-300"
                >
                  <Github size={20} />
                </a>
                <a 
                  href="https://www.linkedin.com/in/federico-santini" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-center w-10 h-10 bg-blue-700 hover:bg-blue-800 text-white rounded-full transition-colors duration-300"
                >
                  <Linkedin size={20} />
                </a>
                <a 
                  href="tel:+393393338159" 
                  className="flex items-center justify-center w-10 h-10 bg-green-600 hover:bg-green-700 text-white rounded-full transition-colors duration-300"
                >
                  <Phone size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;