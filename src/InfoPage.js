import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const InfoPage = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('history');

  const sources = [
    {
      url: "https://www.bps.org.uk/psychologist/surprising-world-synaesthesia",
      title: "The British Psychological Society: The surprising world of synaesthesia"
    },
    {
      url: "https://www.scientificamerican.com/article/what-is-synesthesia/",
      title: "Scientific American: What Is Synesthesia?"
    },
    {
      url: "https://my.clevelandclinic.org/health/symptoms/24995-synesthesia#possible-causes",
      title: "Cleveland Clinic: Synesthesia"
    },
    {
      url: "https://www.psychologytoday.com/us/basics/synesthesia#the-different-types-of-synesthesia",
      title: "Psychology Today: Synesthesia"
    },
    {
      url: "https://www.sussex.ac.uk/synaesthesia/faq",
      title: "University of Sussex: Synaesthesia research"
    },
    {
      url: "https://www.mcgill.ca/oss/article/critical-thinking/making-sense-synaesthesia-harder-it-looks",
      title: "McGill University: Making Sense of Synaesthesia Is Harder Than It Looks"
    },
    {
      url: "https://www.bbc.co.uk/sn/tvradio/programmes/horizon/derek_qa.shtml",
      title: "BBC: Derek Tastes of Earwax"
    },
  ]
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose} // Close when clicking outside
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        {/* Header */}
        <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold">About Synesthesia</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            ✕
          </button>
        </div>
        
        {/* Tabs */}
        <div className="flex border-b">
          {['history', 'causes', 'treatments', 'sources'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 font-medium text-sm capitalize transition-colors ${
                activeTab === tab 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.replace('-', ' ')}
            </button>
          ))}
        </div>
        
        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'history' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="font-bold text-lg mb-3">History and General Overview of Synesthesia</h3>
              <p className="mb-4">
                Synesthesia was first scientifically documented in 1812 by German physician Georg Sachs.
                Notable synesthetes include Pharrel Williams, William Kandinsky, Vincent Van Gogh, and Billie Eilish.
              </p>
              <p className="mb-4">
                The phenomenon gained scientific attention in the late 19th century and is now recognized
                as a genuine perceptual phenomenon occurring in 2-4% of the population.
              </p>
              <p className="mb-4">There are now <strong>300</strong> listed types of synaesthesia, but they can be summarized into 5-10 groups.
              However, scientists still cannot agree on how to define it properly.</p>
              <p className="mb-4">Overall, synaesthesia can be described as brain functions end up talking to each other in a way 
                that is unusual. For example, specific letters will always be perceived as having specific colours.</p>
              <p className="mb-4">
              Synesthetes appear more common in creative fields and often score higher on creativity tests.
              This could be because of how their brains wire different sections together, which could enhance creative connections between unrelated concepts.
              </p>
              <p>More scientific research is necesary.</p>
            </motion.div>
          )}
          
          {activeTab === 'causes' && (
            <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <h3 className="font-bold text-lg mb-3">Causes</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Main Types</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Developmental:</strong> Present from childhood, often runs in families</li>
                  <li><strong>Acquired:</strong> Results from brain injury or sensory changes</li>
                  <li><strong>Drug-induced:</strong> Temporary effects from psychedelics</li>
                </ul>
              </div>
          
              <div>
                <h4 className="font-semibold mb-2">Key Factors</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Genetic:</strong> Usually a relative also has synaesthesia</li>
                  <li><strong>Developmental:</strong> May involve retained childhood neural connections</li>
                  <li><strong>Neurological structure:</strong> More connections between brain areas & sensory regions</li>
                </ul>
              </div>
          
              <div>
                <h4 className="font-semibold mb-2">Notable Differences</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Developmental is most consistent and automatic</li>
                  <li>Acquired tends to be less consistent and music-resistant</li>
                  <li>Drug-induced is emotion-dependent and can alter perception</li>
                </ul>
              </div>
            </div>
          </motion.div>
          )}
          
          {activeTab === 'treatments' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="font-bold text-lg mb-3">Management & Treatment</h3>
              
              <div className="space-y-4">
                <div>
                  <p className="mb-2">
                    Developmental and acquired synesthesia doesn't usually need treatment. 
                    In rare cases when effects are undesirable like Misophonia, people can learn to manage 
                    or minimize these effects.
                  </p>
                  <p className="mb-2">
                    Drug-induced synesthesia can happen at higher doses. Treatments vary by drug but generally focus on 
                    managing more serious symptoms like seizures or agitation.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">General Approaches</h4>
                  <p className="mb-3">While not a disorder, some helpful approaches include:</p>
                  <ul className="list-disc pl-5 space-y-2 mb-4">
                    <li>Sensory integration therapy for overwhelming cases</li>
                    <li>Environmental modifications (noise-cancelling headphones, etc.)</li>
                    <li>Creative outlets to channel the experiences</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
          
          {activeTab === 'sources' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="font-bold text-lg mb-3">Sources & References</h3>
              <ul className="space-y-2 mb-4">
                {sources.map((source, index) => (
                  <li key={index}>
                    <a 
                      href={source.url}
                      className="text-blue-600 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {source.title}
                    </a>
                  </li>
                ))}
              </ul>
              
              <div className="pt-4 border-t">
                <a 
                  href="https://github.com/serenahuang225/explore-synaesthesia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-black hover:underline"
                >
                  <svg className="w-5 h-5 mr-2" fill="black" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  View Project on GitHub
                </a>
              </div>
              
              <div className="mt-4 pt-4 border-t text-center text-gray-500">
                Made with ❤️ by Serena 🤪
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default InfoPage;