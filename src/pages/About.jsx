import React from 'react';
import { Leaf, Feather } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      
      {/* Header Banner */}
      <div className="bg-[#1a1a2e] text-white py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">About Bookish</h1>
      </div>

      <div className="max-w-4xl mx-auto px-4 -mt-10">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100">
          
          {/* Profile Section */}
          <div className="flex flex-col md:flex-row gap-8 items-start mb-12">
            <div className="w-full md:w-1/3">
              <img 
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2670&auto=format&fit=crop" 
                alt="Elena" 
                className="w-full rounded-2xl shadow-md transform -rotate-2 hover:rotate-0 transition-transform duration-300"
              />
            </div>
            <div className="w-full md:w-2/3">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Hello, I'm Okikiade.</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  I started Bookish as a digital garden—a place to plant ideas about nature, creativity, and the slower pace of life.
                </p>
                <p>
                  My background is in environmental science and creative writing. I believe that the two fields are not mutually exclusive; in fact, they are deeply intertwined. Science gives us the 'how', but art gives us the 'why'.
                </p>
              </div>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-emerald-50 p-8 rounded-2xl">
              <div className="flex items-center gap-2 mb-4 text-emerald-800">
                <Leaf size={20} />
                <h3 className="font-bold text-lg">Our Mission</h3>
              </div>
              <p className="text-emerald-700 text-sm leading-relaxed">
                To cultivate a community that appreciates the quiet beauty of the natural world through words and images.
              </p>
            </div>

            <div className="bg-indigo-50 p-8 rounded-2xl">
              <div className="flex items-center gap-2 mb-4 text-indigo-800">
                <Feather size={20} />
                <h3 className="font-bold text-lg">What We Cover</h3>
              </div>
              <p className="text-indigo-700 text-sm leading-relaxed">
                From scientific articles about forestry to haiku collections and nature photography galleries.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default About;