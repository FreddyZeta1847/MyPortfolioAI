import React from 'react';
import { GraduationCap, Calendar } from 'lucide-react';
import { education } from '../data/education';

const Education: React.FC = () => {
  return (
    <section id="education" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-800 mb-4">Education</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto rounded-full"></div>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-primary-300 via-primary-400 to-accent-300"></div>

            {education.map((item, index) => {
              const isLeft = index === 0;
              const isRight = index === 1;

              return (
                <div key={index} className={`relative z-10 mb-12 ${
                  isLeft ? 'md:pr-12 md:text-right md:mr-auto md:w-1/2' :
                  isRight ? 'md:pl-12 md:ml-auto md:w-1/2' : ''
                }`}>
                  <div className={`flex items-center mb-3 ${
                    isLeft ? 'md:justify-end' : 'md:justify-start'
                  }`}>
                    <Calendar size={18} className={`text-primary-600 mr-2 ${
                      isLeft ? 'md:order-2 md:ml-2 md:mr-0' : ''
                    }`} />
                    <span className="text-primary-600 font-medium">{item.period}</span>
                  </div>

                  <div className={`bg-white rounded-xl shadow-soft p-6 border-l-4 border-primary-500 hover:shadow-warm transition-all duration-300 ${
                    isLeft ? 'md:mr-6' : 'md:ml-6'
                  }`}>
                    <div className={`absolute top-8 ${
                      isLeft ? 'right-0 md:-right-3' : 'left-0 md:-left-3'
                    } w-6 h-6 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 border-4 border-white z-20 shadow-md`}></div>

                    <h3 className="text-xl font-semibold text-slate-800 mb-2">{item.institution}</h3>
                    <div className={`flex items-center mb-3 ${isLeft ? 'md:justify-end' : ''}`}>
                      <GraduationCap size={18} className="text-accent-500 mr-2" />
                      <span className="text-slate-600">{item.degree}</span>
                    </div>
                    {item.description && (
                      <p className="text-slate-500">{item.description}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <p className="text-slate-600 italic bg-primary-50/50 py-4 px-6 rounded-xl inline-block">
              Throughout my academic journey, I developed strong foundations in programming, networking, operating systems, databases, and software development.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;