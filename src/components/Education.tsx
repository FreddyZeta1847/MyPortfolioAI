import React from 'react';
import { GraduationCap, Calendar } from 'lucide-react';
import { education } from '../data/education';

const Education: React.FC = () => {
  return (
    <section id="education" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Education</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-blue-200"></div>
            
            {education.map((item, index) => {
              // Forza ITIS a sinistra (index 0) e Politecnico a destra (index 1)
              const isLeft = index === 0;
              const isRight = index === 1;
              
              return (
                <div key={index} className={`relative z-10 mb-12 ${
                  isLeft ? 'md:pr-12 md:text-right md:mr-auto md:w-1/2' : 
                  isRight ? 'md:pl-12 md:ml-auto md:w-1/2' : ''
                }`}>
                  <div className={`flex items-center mb-2 ${
                    isLeft ? 'md:justify-end' : 'md:justify-start'
                  }`}>
                    <Calendar size={18} className={`text-blue-600 mr-2 ${
                      isLeft ? 'md:order-2 md:ml-2 md:mr-0' : ''
                    }`} />
                    <span className="text-blue-600 font-medium">{item.period}</span>
                  </div>
                  
                  <div className={`bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-600 ${
                    isLeft ? 'md:mr-6' : 'md:ml-6'
                  }`}>
                    <div className={`absolute top-6 ${
                      isLeft ? 'right-0 md:-right-3' : 'left-0 md:-left-3'
                    } w-6 h-6 rounded-full bg-blue-600 border-4 border-white z-20`}></div>
                    
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.institution}</h3>
                    <div className="flex items-center mb-3">
                      <GraduationCap size={18} className="text-blue-600 mr-2" />
                      <span className="text-gray-700">{item.degree}</span>
                    </div>
                    {item.description && (
                      <p className="text-gray-600">{item.description}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-gray-700 italic">
              Throughout my academic journey, I developed strong foundations in programming, networking, operating systems, databases, and software development.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;