import React from 'react';
import { Code, Globe, PenTool as Tool, Brain } from 'lucide-react';
import { skills } from '../data/skills';

const getIconForCategory = (category: string) => {
  switch(category) {
    case 'Programming Languages':
      return <Code size={24} className="text-blue-600" />;
    case 'Web Technologies':
      return <Globe size={24} className="text-green-600" />;
    case 'Development Tools & Environments':
      return <Tool size={24} className="text-purple-600" />;
    case 'Additional Skills':
      return <Brain size={24} className="text-orange-600" />;
    default:
      return <Code size={24} className="text-blue-600" />;
  }
};

const Skills: React.FC = () => {
  return (
    <section id="skills\" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Skills & Technologies</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Here are the tools and languages I've worked with. I continuously stay updated through online courses and personal projects.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {skills.map((skill, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg shadow-md p-6 border-t-4 border-blue-600 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                {getIconForCategory(skill.category)}
                <h3 className="text-xl font-semibold text-gray-800 ml-3">{skill.category}</h3>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {skill.items.map((item, idx) => (
                  <span 
                    key={idx} 
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;