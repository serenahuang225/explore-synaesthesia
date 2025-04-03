import { useState } from 'react';
import { motion } from 'framer-motion';

const GraphemeColorExperience = ({ onBack }) => {
  const [selectedChar, setSelectedChar] = useState(null);
  
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('');
  
  const colorMap = {
    'A': '#FF5733', 'B': '#33FF57', 'C': '#3357FF', 'D': '#e3ee33',
    'E': '#FF33F3', 'F': '#33FFF3', 'G': '#8A2BE2', 'H': '#FF6347',
    'I': '#7CFC00', 'J': '#9932CC', 'K': '#FF4500', 'L': '#00FA9A',
    'M': '#4169E1', 'N': '#FFD700', 'O': '#FF69B4', 'P': '#32CD32',
    'Q': '#BA55D3', 'R': '#FF8C00', 'S': '#00BFFF', 'T': '#FF1493',
    'U': '#228B22', 'V': '#9400D3', 'W': '#FF0000', 'X': '#00CED1',
    'Y': '#FFD700', 'Z': '#4B0082',
    '0': '#333', '1': '#1E90FF', '2': '#3CB371', '3': '#9370DB',
    '4': '#FF6347', '5': '#FFD700', '6': '#20B2AA', '7': '#FF69B4',
    '8': '#CD5C5C', '9': '#9ACD32'
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <p className="mb-8">Letters and numbers evoke colors</p>
      
      <div className="grid grid-cols-8 gap-2 mb-8 max-w-2xl">
        {characters.map(char => (
          <motion.div
            key={char}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setSelectedChar(char)}
            className={`flex items-center justify-center w-12 h-12 rounded-lg cursor-pointer ${selectedChar === char ? 'ring-4 ring-white' : ''}`}
            style={{ backgroundColor: colorMap[char] }}
          >
            <span className="text-xl font-bold mix-blend-overlay">{char}</span>
          </motion.div>
        ))}
      </div>
      
      {selectedChar && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-8 text-center"
        >
          <p className="text-2xl mb-2">You selected: <span className="font-bold">{selectedChar}</span></p>
          <div 
            className="w-32 h-32 mx-auto rounded-full shadow-lg"
            style={{ backgroundColor: colorMap[selectedChar] }}
          />
          <p className="mt-2 text-lg">{colorMap[selectedChar]}</p>
        </motion.div>
      )}
      
      <div className="p-3 bg-blue-50 rounded-lg text-blue-800 text-sm mb-6">
        <p className="font-medium">ℹ️ About Grapheme-Color Synesthesia:</p>
        <p>
          People with this condition perceive letters, numbers, or symbols as inherently colored.
          Each grapheme (like "A" or "8") consistently evokes a specific color, 
          creating a vivid mental palette for written language and numerical systems.
        </p>
      </div>

    </div>
  );
};

export default GraphemeColorExperience;