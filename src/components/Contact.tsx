import React from 'react';
import { Mail, Phone, Github, Linkedin, MapPin } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 bg-warm-100">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-800 mb-4">Get In Touch</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto mb-6 rounded-full"></div>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Whether you'd like to collaborate, discuss an opportunity, or simply connect about technology, feel free to reach out!
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-soft p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Email */}
              <a
                href="mailto:santinifederico06@gmail.com"
                className="group flex items-center p-4 rounded-xl bg-warm-50 hover:bg-primary-50 transition-all duration-300"
              >
                <div className="flex-shrink-0 bg-primary-100 group-hover:bg-primary-200 p-4 rounded-xl transition-colors">
                  <Mail size={28} className="text-primary-600" />
                </div>
                <div className="ml-4">
                  <h4 className="text-sm font-medium text-slate-500 uppercase tracking-wide">Email</h4>
                  <p className="text-slate-800 font-medium group-hover:text-primary-600 transition-colors">
                    santinifederico06@gmail.com
                  </p>
                </div>
              </a>

              {/* Phone */}
              <a
                href="tel:+393393338159"
                className="group flex items-center p-4 rounded-xl bg-warm-50 hover:bg-accent-50 transition-all duration-300"
              >
                <div className="flex-shrink-0 bg-accent-100 group-hover:bg-accent-200 p-4 rounded-xl transition-colors">
                  <Phone size={28} className="text-accent-600" />
                </div>
                <div className="ml-4">
                  <h4 className="text-sm font-medium text-slate-500 uppercase tracking-wide">Phone</h4>
                  <p className="text-slate-800 font-medium group-hover:text-accent-600 transition-colors">
                    +39 339 333 8159
                  </p>
                </div>
              </a>

              {/* Location */}
              <div className="flex items-center p-4 rounded-xl bg-warm-50">
                <div className="flex-shrink-0 bg-slate-200 p-4 rounded-xl">
                  <MapPin size={28} className="text-slate-600" />
                </div>
                <div className="ml-4">
                  <h4 className="text-sm font-medium text-slate-500 uppercase tracking-wide">Location</h4>
                  <p className="text-slate-800 font-medium">Italy</p>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex items-center p-4 rounded-xl bg-warm-50">
                <div className="flex-shrink-0 bg-slate-200 p-4 rounded-xl">
                  <Github size={28} className="text-slate-600" />
                </div>
                <div className="ml-4">
                  <h4 className="text-sm font-medium text-slate-500 uppercase tracking-wide">Social</h4>
                  <div className="flex space-x-3 mt-1">
                    <a
                      href="https://github.com/FreddyZeta1847"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-slate-800 hover:bg-slate-900 text-white p-2 rounded-lg transition-all duration-300 hover:scale-110"
                      aria-label="GitHub"
                    >
                      <Github size={18} />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/federico-santini"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#0077B5] hover:bg-[#006396] text-white p-2 rounded-lg transition-all duration-300 hover:scale-110"
                      aria-label="LinkedIn"
                    >
                      <Linkedin size={18} />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-10 text-center">
              <a
                href="mailto:santinifederico06@gmail.com"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white font-medium rounded-xl transition-all duration-300 shadow-soft hover:shadow-warm hover:scale-105"
              >
                <Mail size={20} className="mr-2" />
                Send me an Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;