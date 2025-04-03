import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MirrorTouchExperience = () => {
  const [activeTouch, setActiveTouch] = useState(null);
  const [sensationIntensity, setSensationIntensity] = useState(0);
  const [reactionVisible, setReactionVisible] = useState(false);

  const touchPoints = [
    {
      bodyPart: "Hand",
      emoji: "✋",
      color: "#FF6B6B",
      sensation: "Tingling in your palm",
      intensity: 30
    },
    {
      bodyPart: "Shoulder",
      emoji: "💪",
      color: "#4ECDC4",
      sensation: "Light pressure on your shoulder",
      intensity: 25
    },
    {
      bodyPart: "Cheek",
      emoji: "👱",
      color: "#FFD166",
      sensation: "Gentle brush against your cheek",
      intensity: 35
    },
    {
      bodyPart: "Back",
      emoji: "🧍",
      color: "#06D6A0",
      sensation: "Warmth spreading across your back",
      intensity: 20
    },
    {
      bodyPart: "Forehead",
      emoji: "🧠",
      color: "#A64DFF",
      sensation: "Cool sensation on your brow",
      intensity: 28
    },
    {
      bodyPart: "Foot",
      emoji: "👞",
      color: "#FF8E4D",
      sensation: "Light tickle on your sole",
      intensity: 22
    },
    {
      bodyPart: "Arm",
      emoji: "💪",
      color: "#4D8EFF",
      sensation: "Goosebumps along your arm",
      intensity: 26
    },
    {
      bodyPart: "Leg",
      emoji: "🦵",
      color: "#4DFF8E",
      sensation: "Mild vibration in your thigh",
      intensity: 24
    }
  ];

  const simulateTouch = (touchPoint) => {
    setActiveTouch(touchPoint);
    setSensationIntensity(touchPoint.intensity);
    if (!reactionVisible) {
      setTimeout(() => setReactionVisible(false), 5000);
    }
    setReactionVisible(true);
    
    const fadeInterval = setInterval(() => {
      setSensationIntensity(prev => {
        const newValue = prev - 1;
        if (newValue <= 0) {
          clearInterval(fadeInterval);
          return 0;
        }
        return newValue;
      });
    }, 200);
  };

  return (
    <div className="p-6 rounded-xl bg-white shadow-lg text-black mb-6">
      <p className="mb-6 text-center">
        Where seeing touch evokes physical sensations
      </p>

      {/* Human silhouette with touch points */}
      <div className="relative h-64 flex justify-center">
        <div className="relative">
          {/* Human silhouette (simplified) */}
          <div className="w-32 top-4 h-48 bg-gray-100 rounded-full relative">
            {/* head */}
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gray-100 rounded-full"></div>
          </div>
          
          {/* Touch points */}
          {touchPoints.map((point, index) => {
            let positionClass = "";
            let pulseSize = point.intensity*2;
            
            switch(point.bodyPart) {
              case "Hand":
                positionClass = "left-5/6 top-1/3";
                break;
              case "Shoulder":
                positionClass = "left-1/3 top-10";
                break;
              case "Cheek":
                positionClass = "left-3/5 top-4";
                break;
              case "Back":
                positionClass = "left-1/2 top-1/3";
                break;
              case "Forehead":
                positionClass = "left-2/5 top-0";
                break;
              case "Foot":
                positionClass = "left-1/2 bottom-5";
                break;
              case "Arm":
                positionClass = "left-1/6 top-1/3";
                break;
              case "Leg":
                positionClass = "left-3/4 top-1/2";
                break;
              default:
                positionClass = "left-1/2 top-1/2";
            }

            return (
              <motion.div
                key={point.bodyPart}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => simulateTouch(point)}
                className={`absolute ${positionClass} transform -translate-x-1/2 -translate-y-1/2 
                  rounded-full cursor-pointer flex items-center justify-center`}
                style={{
                  width: `${pulseSize}px`,
                  height: `${pulseSize}px`,
                  backgroundColor: `${point.color}${activeTouch?.bodyPart === point.bodyPart ? '90' : '20'}`,
                  zIndex: 10
                }}
              >
                <span className="text-2xl">{point.emoji}</span>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Sensation intensity meter */}
      <div className="relative h-4 mb-6 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          initial={{ width: '0%' }}
          animate={{ width: `${sensationIntensity}%` }}
          style={{
            background: 'linear-gradient(to right, #4ECDC4, #FF6B6B)'
          }}
          transition={{ duration: 0.3 }}
        />
        <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-800">
          Sensation Intensity: {sensationIntensity}%
        </div>
      </div>

      <AnimatePresence>
        {reactionVisible && activeTouch && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: 'spring', damping: 10 }}
            className="p-3 rounded-lg mb-4 text-center"
            style={{ backgroundColor: `${activeTouch.color}20` }}
          >
            <p className="font-medium">
              Watching {activeTouch.bodyPart.toLowerCase()} touch evokes:<br />
              <span className="text-lg">{activeTouch.sensation}</span>
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="p-3 bg-pink-50 rounded-lg text-pink-800 text-sm">
        <p className="font-medium">ℹ️ About Mirror-Touch Synesthesia:</p>
        <p>
          People with this condition physically feel sensations when they observe others being touched,
          as if their own body was being touched.
        </p>
      </div>
    </div>
  );
};

export default MirrorTouchExperience;