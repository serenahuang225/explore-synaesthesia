import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playAudio, stopAudio } from '../utils/audioPlayer';

const MisophoniaExperience = () => {
  const [activeSound, setActiveSound] = useState(null);
  const [stressLevel, setStressLevel] = useState(0);
  const [reactionVisible, setReactionVisible] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const triggerSounds = [
    {
      name: "Chewing",
      emoji: "🍽️",
      color: "#FF6B6B",
      file: "/sounds/chewing.mp3",
      intensity: 30
    },
    {
      name: "Pen Clicking",
      emoji: "🖊️",
      color: "#4ECDC4",
      file: "/sounds/pen-clicking.mp3",
      intensity: 20
    },
    {
      name: "Sniffling",
      emoji: "🤧",
      color: "#FFD166",
      file: "/sounds/sniffling.mp3",
      intensity: 25
    },
    {
      name: "Keyboard",
      emoji: "⌨️",
      color: "#06D6A0",
      file: "/sounds/keyboard.mp3",
      intensity: 15
    }
  ];

  const playSound = async (sound) => {
    stopAllSounds();
    setActiveSound(sound);
    setStressLevel(prev => Math.min(prev + sound.intensity, 100));
    setReactionVisible(true);
    
    try {
      setIsAudioPlaying(true);
      await playAudio(sound.file, 0.5);
      // When audio ends naturally
      setIsAudioPlaying(false);
    } catch (error) {
      console.error('Playback failed:', error);
      setIsAudioPlaying(false);
    }
  };

  const stopAllSounds = () => {
    triggerSounds.forEach(sound => {
      stopAudio(sound.file);
    });
    setIsAudioPlaying(false);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isAudioPlaying) {
        if (stressLevel > 75) {
          setStressLevel(prev => Math.max(prev - 2, 0));
        } else if (stressLevel > 0) {
          setStressLevel(prev => Math.max(prev - 1, 0));
        }
      }
    }, 150);

    return () => clearInterval(timer);
  }, [isAudioPlaying, stressLevel]);

  useEffect(() => {
    // Hide reaction after delay
    const timer = setTimeout(() => setReactionVisible(false), 2000);
    return () => clearTimeout(timer);
  }, [activeSound]);

  return (
    <div className="p-6 rounded-xl text-black shadow-lg mb-6 bg-white">
      <p className="text-black">
        {stressLevel > 75 
          ? "😫 Overwhelmed by trigger sounds" 
          : stressLevel > 50 
            ? "😣 These sounds are uncomfortable" 
            : "😐 Select a trigger sound to experience"}
      </p>

      {/* Stress meter */}
      <div className="relative h-6 mb-8 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          initial={{ width: '0%' }}
          animate={{ width: `${stressLevel}%` }}
          style={{
            background: stressLevel > 75 
              ? 'linear-gradient(to right, #FF6B6B, #FF0000)' 
              : stressLevel > 50 
                ? 'linear-gradient(to right, #FFD166, #FF6B6B)' 
                : 'linear-gradient(to right, #4ECDC4, #06D6A0)'
          }}
          transition={{ duration: 0.5 }}
        />
        <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-800">
          Stress Level: {stressLevel}%
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        {triggerSounds.map((sound) => (
          <motion.button
            key={sound.name}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => playSound(sound)}
            onMouseUp={stopAllSounds}
            onMouseLeave={stopAllSounds}
            className={`p-4 rounded-lg flex flex-col items-center ${
              activeSound?.name === sound.name ? 'bg-opacity-90' : 'bg-opacity-50'
            }`}
            style={{ backgroundColor: `${sound.color}${activeSound?.name === sound.name ? '90' : '50'}` }}
          >
            <span className="text-2xl mb-1">{sound.emoji}</span>
            <span className="font-medium">{sound.name}</span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {reactionVisible && activeSound && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: 'spring', damping: 10 }}
            className="p-4 rounded-lg mb-4 text-center"
            style={{ backgroundColor: `${activeSound.color}20` }}
          >
            <p className="text-lg font-medium">
              {stressLevel > 75 
                ? `😤 Can't stand this ${activeSound.name.toLowerCase()}!` 
                : `😖 ${activeSound.name} is triggering!`}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Coping mechanism */}
      {stressLevel > 50 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 p-3 bg-blue-50 rounded-lg text-blue-800 text-sm"
        >
          <p className="font-medium">💡 Coping Suggestion:</p>
          <p>
            {stressLevel > 75
              ? "Try deep breathing (4-7-8 technique)"
              : "Consider using noise-cancelling headphones"}
          </p>
        </motion.div>
      )}

      <div className="p-3 bg-blue-50 rounded-lg text-blue-800 text-sm">
        <p className="font-medium">ℹ️ About Misophonia:</p>
        <p>
          People with this condition experience intense emotional or physiological responses
          to specific sounds (like chewing or tapping). These "trigger sounds" can cause
          anger, distress, or even physical pain, unlike typical annoyance.
        </p>
      </div>
    </div>
  );
};

export default MisophoniaExperience;