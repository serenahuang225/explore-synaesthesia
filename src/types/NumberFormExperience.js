import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NumberFormExperience = () => {
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [explanationVisible, setExplanationVisible] = useState(false);
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Update container dimensions on resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Number positions in the mental number line (customize these)
  const numberPositions = {
    1: { x: 30, y: 50, color: '#FF6B6B', size: 20, desc: 'in the middle to the left' },
    2: { x: 70, y: 30, color: '#FF9E6B', size: 21, desc: 'to the top right' },
    3: { x: 90, y: 90, color: '#FFC16B', size: 22, desc: 'on the bottom right' },
    4: { x: 20, y: 60, color: '#FFE36B', size: 18, desc: 'to the middle left' },
    5: { x: 50, y: 20, color: '#DAF7A6', size: 25, desc: 'in the top middle' },
    6: { x: 80, y: 60, color: '#9BF79E', size: 23, desc: 'in the middle right' },
    7: { x: 10, y: 90, color: '#5CF796', size: 22, desc: 'in the bottom left' },
    8: { x: 40, y: 10, color: '#33D1A0', size: 21, desc: 'at the very top' },
    9: { x: 70, y: 50, color: '#06A0D6', size: 20, desc: 'in the middle right' },
    10: { x: 50, y: 80, color: '#f367A6', size: 27, desc: 'in the bottom middle' }
  };

  const handleNumberClick = (number) => {
    setSelectedNumber(number);
    setExplanationVisible(true);
  };

  return (
    <div className="p-6 rounded-xl text-black shadow-lg mb-6 bg-white">
      <p className="mb-6 text-center">
        How some people visualize numbers in space
      </p>

      <div 
        ref={containerRef}
        className="relative w-full h-64 bg-gray-50 rounded-lg mb-6 overflow-hidden border border-gray-200"
      >
        {/* Background grid */}
        <div className="absolute inset-0 opacity-20">
          {Array.from({ length: 10 }).map((_, i) => (
            <div 
              key={`grid-${i}`}
              className="absolute border-r border-gray-300"
              style={{ left: `${(i + 1) * 10}%`, height: '100%' }}
            />
          ))}
          {Array.from({ length: 5 }).map((_, i) => (
            <div 
              key={`grid-h-${i}`}
              className="absolute border-t border-gray-300"
              style={{ top: `${(i + 1) * 20}%`, width: '100%' }}
            />
          ))}
        </div>

        {/* Number elements */}
        {Object.entries(numberPositions).map(([number, { x, y, color, size }]) => (
          <motion.div
            key={number}
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            animate={{
              x: `${x}px`,
              y: `${y}px`,
              backgroundColor: selectedNumber === number ? color : `${color}80`,
              borderColor: selectedNumber === number ? color : `${color}40`
            }}
            transition={{ type: 'spring', stiffness: 100 }}
            onClick={() => handleNumberClick(number)}
            className="absolute flex items-center justify-center rounded-full cursor-pointer border-2"
            style={{
              width: size,
              height: size,
              transform: 'translate(-50%, -50%)',
              zIndex: selectedNumber === number ? 10 : 1
            }}
          >
            <span className="text-white font-bold">{number}</span>
          </motion.div>
        ))}

        {/* Connecting lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {Object.entries(numberPositions).slice(0, -1).map(([number], i) => {
            const current = numberPositions[number];
            const next = numberPositions[parseInt(number) + 1];
            return (
              <line
                key={`line-${number}`}
                x1={`${current.x}%`}
                y1={`${current.y}%`}
                x2={`${next.x}%`}
                y2={`${next.y}%`}
                stroke={selectedNumber === number || selectedNumber === (parseInt(number) + 1) ? 
                  current.color : `${current.color}40`}
                strokeWidth="2"
                strokeDasharray={i % 2 === 0 ? "0" : "5,5"}
              />
            );
          })}
        </svg>
      </div>

      <AnimatePresence>
        {explanationVisible && selectedNumber && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="p-4 rounded-lg mb-4 text-center"
            style={{ backgroundColor: `${numberPositions[selectedNumber].color}` }}
          >
            <p className="font-medium">
              Number <strong>{selectedNumber}</strong> appears {numberPositions[selectedNumber].desc}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="p-4 bg-orange-50 rounded-lg text-orange-800 text-sm">
        <p className="font-medium">ℹ️ About Number Form Synesthesia:</p>
        <p>
          People with this condition see numbers as occupying specific positions in space,
          often with unique colors and spatial relationships between them.
        </p>
      </div>
    </div>
  );
};

export default NumberFormExperience;