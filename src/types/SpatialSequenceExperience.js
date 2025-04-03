import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SpatialSequenceExperience = () => {
  const [selectedSequence, setSelectedSequence] = useState(null);
  const [highlightedItem, setHighlightedItem] = useState(null);
  const sequences = {
    "Months": {
      items: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      color: "#4ECDC4",
      path: [
        { x: 10, y: 50 }, { x: 20, y: 30 }, { x: 30, y: 40 },
        { x: 40, y: 60 }, { x: 50, y: 70 }, { x: 60, y: 50 },
        { x: 70, y: 30 }, { x: 80, y: 40 }, { x: 90, y: 60 },
        { x: 80, y: 70 }, { x: 70, y: 50 }, { x: 60, y: 30 }
      ]
    },
    "Weekdays": {
      items: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      color: "#FF6B6B",
      path: [
        { x: 15, y: 70 }, { x: 30, y: 30 }, { x: 45, y: 60 },
        { x: 60, y: 40 }, { x: 75, y: 70 }, { x: 90, y: 50 },
        { x: 85, y: 30 }
      ]
    },
    "Numbers": {
      items: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
      color: "#FFD166",
      path: [
        { x: 10, y: 30 }, { x: 25, y: 50 }, { x: 40, y: 30 },
        { x: 55, y: 50 }, { x: 70, y: 30 }, { x: 85, y: 50 },
        { x: 70, y: 70 }, { x: 55, y: 50 }, { x: 40, y: 70 },
        { x: 25, y: 50 }
      ]
    }
  };

  // Auto-highlight items in sequence
  useEffect(() => {
    if (!selectedSequence) return;
    
    let currentIndex = 0;
    const interval = setInterval(() => {
      setHighlightedItem(currentIndex);
      currentIndex = (currentIndex + 1) % sequences[selectedSequence].items.length;
    }, 800);

    return () => clearInterval(interval);
  }, [selectedSequence]);

  return (
    <div className="p-6 rounded-xl bg-white shadow-lg mb-6">
      <p className="mb-6 text-center text-black">
        How sequences occupy space in the mind's eye
      </p>

      <div className="grid grid-cols-3 gap-3 mb-6">
        {Object.keys(sequences).map((sequenceName) => (
          <motion.button
            key={sequenceName}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedSequence(sequenceName)}
            className={`p-3 rounded-lg transition-colors border-2 ${
              selectedSequence === sequenceName ? 'bg-opacity-90' : 'bg-opacity-25'
            }`}
            style={{ 
              backgroundColor: `${sequences[sequenceName].color}${
                selectedSequence === sequenceName ? '90' : '50'
              }`, borderColor: `${sequences[sequenceName].color}${
                selectedSequence === sequenceName ? '' : '00'
              }`
            }}
          >
            {sequenceName}
          </motion.button>
        ))}
      </div>

      {selectedSequence && (
        <div className="relative w-full h-64 bg-gray-50 rounded-lg mb-6 overflow-hidden border border-gray-200">
          {/* Connecting path */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <path
              d={`M ${sequences[selectedSequence].path.map((p, i) => 
                `${p.x}% ${p.y}% ${i === sequences[selectedSequence].path.length - 1 ? '' : 'L '}`
              ).join('')}`}
              stroke={sequences[selectedSequence].color}
              strokeWidth="2"
              fill="none"
              strokeDasharray="5,5"
            />
          </svg>

          {/* Sequence items */}
          {sequences[selectedSequence].items.map((item, index) => {
            const pos = sequences[selectedSequence].path[index];
            return (
              <motion.div
                key={`${selectedSequence}-${item}`}
                initial={{ scale: 1 }}
                animate={{ 
                  scale: highlightedItem === index ? 1.3 : 1,
                  backgroundColor: highlightedItem === index ? 
                    sequences[selectedSequence].color : `${sequences[selectedSequence].color}80`
                }}
                whileHover={{ scale: 1.2 }}
                className="absolute flex items-center justify-center rounded-full cursor-pointer border-2"
                style={{
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  width: 40,
                  height: 40,
                  transform: 'translate(-50%, -50%)',
                  borderColor: sequences[selectedSequence].color,
                  zIndex: highlightedItem === index ? 10 : 1
                }}
                onClick={() => setHighlightedItem(index)}
              >
                <span className="text-white font-bold">{item}</span>
              </motion.div>
            );
          })}
        </div>
      )}

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="p-3 bg-green-50 rounded-lg text-green-800 text-sm"
      >
        <p className="font-medium">ℹ️ About Spatial Sequence Synesthesia:</p>
        <p>
          People with this condition perceive sequences (like numbers, months, or weekdays) 
          as occupying specific locations in space, forming unique 3D patterns.
        </p>
      </motion.div>
    </div>
  );
};

export default SpatialSequenceExperience;