import React from 'react'
import { motion } from 'framer-motion';

import AuditoryTactileExperience from './types/AuditoryTactileExperience';
import ChromesthesiaExperience from './types/ChromesthesiaExperience';
import GraphemeColorExperience from './types/GraphemeColorExperience';
import MisophoniaExperience from './types/MisophoniaExperience';
import NumberFormExperience from './types/NumberFormExperience';
import LexicalGustatoryExperience from './types/LexicalGustatoryExperience';
import SpatialSequenceExperience from './types/SpatialSequenceExperience';
import MirrorTouchExperience from './types/MirrorTouchExperience';

const ExperienceView = ({ experience, onBack }) => {
  return (
    <motion.div
      key={experience.name}
      initial={{ clipPath: `circle(0% at ${experience.x}% ${experience.y}%)`, opacity: 0, scale: 0.5}}
      animate={{ clipPath: 'circle(150% at 50% 50%)', opacity: 1, scale: 1 }}
      exit={{ clipPath: `circle(0% at ${experience.x}% ${experience.y}%)`, opacity: 0, scale: 0.5}}
      transition={{ duration: 0.8, ease: [1, 0.22, 0.36, 1] }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: experience.color,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: 20,
        transformOrigin: `${experience.x}% ${experience.y}%`,
        overflow: 'scroll'
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        style={{
          width: '80%',
          maxWidth: '600px',
          padding: '40px',
          color: 'white',
          textAlign: 'center'
        }}
      >
        <h1 className='text-4xl mb-6'>{experience.name} Synesthesia</h1>
        
        {
          experience.name==="Auditory-Tactile" && <AuditoryTactileExperience />
        }
        {
          experience.name==="Chromesthesia" && <ChromesthesiaExperience />
        }
        {
          experience.name==="Grapheme-Color" && <GraphemeColorExperience />
        }
        {
          experience.name==="Misophonia" && <MisophoniaExperience />
        }
        {
          experience.name==="Spatial Sequence" && <SpatialSequenceExperience />
        }
        {
          experience.name==="Lexical-Gustatory" && <LexicalGustatoryExperience />
        }
        {
          experience.name==="Number Form" && <NumberFormExperience />
        }
        {
          experience.name==="Mirror Touch" && <MirrorTouchExperience />
        }

        <motion.button
          onClick={onBack}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            padding: '12px 24px',
            backgroundColor: 'white',
            color: experience.color,
            border: 'none',
            borderRadius: '50px',
            fontSize: '1rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
          }}
        >
          Back to all Types
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default ExperienceView