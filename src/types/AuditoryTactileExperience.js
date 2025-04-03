import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

const AuditoryTactileExperience = () => {
  const [activeFrequency, setActiveFrequency] = useState(null);
  const [oscillators, setOscillators] = useState({});
  const controls = useAnimation();

  const frequencies = [
    { value: 120, note: 'C', color: '#FF5733' },
    { value: 130, note: 'D', color: '#FFC300' },
    { value: 140, note: 'E', color: '#DAF7A6' },
    { value: 150, note: 'F', color: '#33FF57' },
    { value: 160, note: 'G', color: '#33FFC4' },
    { value: 170, note: 'A', color: '#33A2FF' },
    { value: 180, note: 'B', color: '#9033FF' },
    { value: 190, note: 'C', color: '#FF33E6' }
  ];

  const playSound = async (frequency, color) => {
    // Stop any currently playing sound
    stopAllSounds();
    
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      const panner = audioContext.createStereoPanner();
      
      oscillator.type = 'sine';
      oscillator.frequency.value = frequency;
      gainNode.gain.value = 0.1;
      panner.pan.value = Math.random() * 2 - 1; // Random stereo panning
      
      oscillator.connect(gainNode);
      gainNode.connect(panner);
      panner.connect(audioContext.destination);
      
      // Create vibration pattern (alternating pulses)
      const vibrationPattern = [10, 20, 10, 20, 10];
      if ('vibrate' in navigator) {
        navigator.vibrate(vibrationPattern);
      }
      
      oscillator.start();
      setOscillators(prev => ({ ...prev, [frequency]: { oscillator, audioContext } }));
      setActiveFrequency(frequency);
      
      // Animate the button
      await controls.start({
        scale: [1, 1.1, 1],
        // backgroundColor: color,
        transition: { duration: 0.5 }
      });
      
      // Stop after 2 seconds if not holding
      setTimeout(() => {
        if (activeFrequency === frequency) {
          stopSound(frequency);
        }
      }, 2000);
      
    } catch (error) {
      console.error('Audio error:', error);
    }
  };

  const stopSound = (frequency) => {
    if (oscillators[frequency]) {
      oscillators[frequency].oscillator.stop();
      oscillators[frequency].audioContext.close();
      setOscillators(prev => {
        const newOscillators = { ...prev };
        delete newOscillators[frequency];
        return newOscillators;
      });
      if (activeFrequency === frequency) {
        setActiveFrequency(null);
      }
    }
  };

  const stopAllSounds = () => {
    Object.keys(oscillators).forEach(freq => {
      stopSound(parseInt(freq));
    });
    if ('vibrate' in navigator) {
      navigator.vibrate(0); // Stop vibration
    }
  };

  useEffect(() => {
    return () => {
      stopAllSounds();
    };
  }, []);

  return (
    <motion.div className="p-6 rounded-xl bg-white shadow-lg mb-6 flex flex-col items-center justify-center">
      <p className="mb-6 text-black">Experience sound through touch and vibration</p>
      
      <div className="grid grid-cols-4 gap-6 mb-12">
        {frequencies.map(({ value, note, color }) => (
          <motion.button
            key={value}
            initial={{ backgroundColor: '#4c1d95' }}
            animate={activeFrequency === value ? { 
              scale: 1.1,
              boxShadow: `0 0 20px ${color}`
            } : controls}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onMouseDown={() => playSound(value, color)}
            onMouseUp={() => stopSound(value)}
            onMouseLeave={() => stopSound(value)}
            className="px-6 py-6 rounded-full transition-all flex flex-col items-center"
            style={{ boxShadow: '0 4px 8px rgba(0,0,0,0.3)' }}
          >
            <span className="text-2xl font-bold">{note}</span>
            <span className="text-sm opacity-80">{value}Hz</span>
          </motion.button>
        ))}
      </div>
      
      <motion.div
        animate={{
          scale: activeFrequency ? [1, 1.05, 1] : 1,
          backgroundColor: activeFrequency ? frequencies.find(f => f.value === activeFrequency)?.color || '#8b5cf6' : '#4c1d95'
        }}
        transition={{ 
          duration: 0.5,
          repeat: activeFrequency ? Infinity : 0,
          repeatType: 'reverse'
        }}
        className="w-72 h-72 rounded-full flex items-center justify-center mb-8 border-4 border-white/20"
      >
        <div className="text-center">
          <p className="text-2xl mb-2">Current Frequency</p>
          <p className="text-4xl font-bold">
            {activeFrequency ? `${activeFrequency}Hz` : 'None'}
          </p>
          <p className="text-lg mt-4 opacity-80">
            {activeFrequency ? 'Vibration active' : 'Press a button to start'}
          </p>
        </div>
      </motion.div>

      <div className="p-4 bg-purple-50 rounded-lg text-purple-800 text-sm">
      <p className="font-medium">ℹ️ About Auditory-Tactile Synesthesia:</p>
      <p>
        People with this condition experience physical sensations on their body when hearing sounds. Different sounds can trigger distinct tactile feelings like tingling, pressure, or vibrations,
        often in specific body locations.
      </p>
      </div>

    </motion.div>
  );
};

export default AuditoryTactileExperience;