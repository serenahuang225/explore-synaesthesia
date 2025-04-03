import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ExperienceView from './ExperienceView';
import InfoPage from './InfoPage';

const generateRandomSize = () => {
  const base = 90 + Math.random() * 90;
  return { width: `${base}px`, height: `${base}px` };
};

const SynesthesiaTypes = [
  { name: 'Auditory-Tactile', color: '#a64dff' },
  { name: 'Grapheme-Color', color: '#4d4dff' },
  { name: 'Mirror Touch', color: '#e94dff' },
  { name: 'Misophonia', color: '#4de5ff' },
  { name: 'Chromesthesia', color: '#000' },
  { name: 'Lexical-Gustatory', color: '#E54611' },
  { name: 'Number Form', color: '#ffa64d' },
  { name: 'Spatial Sequence', color: '#4de24d' }
];

const Blob = ({ x, y, color, text, onClick, size }) => {
  return (
    <motion.div
      onClick={onClick}
      initial={{ scale: 1 }}
      animate={{ 
        y: [0, -10, 0],
        scale: [1, 1.05, 1]
      }}
      whileHover={{
        scale: 1.2,
        transition: { duration: 0.2 }
      }}
      transition={{ 
        duration: 4 + Math.random() * 3,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      style={{
        position: 'absolute',
        left: `${x}%`,
        top: `${y}%`,
        ...size,
        borderRadius: '50%',
        backgroundColor: color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.4))',
        transform: 'translate(-50%, -50%)',
        willChange: 'transform'
      }}
    >
      <motion.span
        style={{
          color: 'white',
          fontWeight: 'bold',
          textShadow: '0 2px 4px rgba(0,0,0,0.3)',
          textAlign: 'center',
          fontSize: '14px',
          padding: '8px'
        }}
      >
        {text}
      </motion.span>
    </motion.div>
  );
};

export default function App() {
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [showInfo, setShowInfo] = useState(false);
  
  // Generate random positions and sizes for blobs
  const blobData = SynesthesiaTypes.map((type, index) => {
    const angle = (index / SynesthesiaTypes.length) * Math.PI * 2;
    const distance = 0.3 + Math.random() * 0.2;
    return {
      ...type,
      x: 45 + Math.cos(angle) * distance * 50,
      y: 40 + Math.sin(angle) * distance * 50,
      size: generateRandomSize()
    };
  });

  return (
    <div style={{
      position: 'relative',
      width: '100vw',
      height: '100vh',
      backgroundColor: 'white',
      overflow: 'hidden'
    }}>
      <AnimatePresence>
        {selectedExperience ? (
          <ExperienceView
            experience={selectedExperience} 
            onBack={() => setSelectedExperience(null)} 
          />
        ) : (
          <>
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              style={{
                position: 'absolute',
                top: '10%',
                transform: 'translateX(-50%)',
                color: '#333',
                fontSize: '2.5rem',
                textAlign: 'center',
                width: '100%'
              }}
            >
              Synesthesia Explorer
            </motion.h1>
            
            <motion.button 
              whileHover={{scale: 1.1}} style={{cursor: 'pointer'}}
              onClick={() => setShowInfo(true)}
              className="fixed flex items-center top-4 right-4 bg-gray-200 text-black p-3 rounded-full shadow-lg"
            >
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg> Info
            </motion.button>
            
            {blobData.map((blob) => (
              <Blob
                key={blob.name}
                x={blob.x}
                y={blob.y}
                color={blob.color}
                text={blob.name}
                onClick={() => setSelectedExperience(blob)}
                size={blob.size}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showInfo && <InfoPage onClose={() => setShowInfo(false)} />}
      </AnimatePresence>
    </div>
  );
}