import React from 'react';
import { Github, Linkedin, Mail, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold text-blue-400 mb-2">Federico Santini</h2>
            <p className="text-gray-400">Computer Engineering Student</p>
          </div>
          
          <div className="flex space-x-4">
            <a 
              href="https://github.com/FreddyZeta1847" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-gray-800 hover:bg-gray-700 p-2 rounded-full transition-colors duration-300"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a 
              href="https://www.linkedin.com/in/federico-santini" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-blue-700 hover:bg-blue-600 p-2 rounded-full transition-colors duration-300"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a 
              href="mailto:santinifederico06@gmail.com" 
              className="bg-red-600 hover:bg-red-500 p-2 rounded-full transition-colors duration-300"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
            <a 
              href="tel:+393393338159" 
              className="bg-green-600 hover:bg-green-500 p-2 rounded-full transition-colors duration-300"
              aria-label="Phone"
            >
              <Phone size={20} />
            </a>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} Federico Santini. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;