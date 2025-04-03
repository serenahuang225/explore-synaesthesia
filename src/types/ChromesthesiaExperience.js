import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Soundfont } from 'smplr';

const context = new AudioContext();
const marimba = new Soundfont(context, { instrument: 'marimba' });

const noteMapping = {
  a: 60, b: 61, c: 62, d: 63, e: 64, f: 65, g: 66,
  h: 67, i: 68, j: 69, k: 70, l: 71, m: 72, n: 73,
  o: 74, p: 75, q: 76, r: 77, s: 78, t: 79, u: 80,
  v: 81, w: 82, x: 83, y: 84, z: 85, ' ': 86, '!': 87
};

function ChromesthesiaExperience() {
  const [blobs, setBlobs] = useState([]);

  const radius = 50

  const handleKeyPress = (event) => {
    const note = noteMapping[event.key.toLowerCase()];
    if (note) {
      marimba.start({ note, velocity: 80 });
      const newBlob = {
        id: Date.now(),
        x: Math.random() * (window.innerWidth)-radius,
        y: Math.random() * (window.innerHeight)-radius,

        color: `hsl(${(note-60)/(27) * 360}, 80%, 50%)`
      };

      console.log(newBlob)

      setBlobs((prev) => [...prev, newBlob]);
      setTimeout(() => {
        setBlobs((prev) => prev.filter(blob => blob.id !== newBlob.id));
      }, 3000);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <motion.div className="p-6 rounded-xl bg-white shadow-lg mb-6 flex flex-col items-center justify-center">
      <p className="text-black mb-4">Press any key to make some music! 🎵</p>
      <div className="p-3 bg-gray-100 rounded-lg text-black text-sm">
        <p className="font-medium">ℹ️ About Chromesthesia:</p>
        <p>
          People with this condition experience automatic, involuntary color associations
          when hearing sounds or music. Each sound, note, or musical key may trigger
          distinct color perceptions.
        </p>
      </div>

      <div style={{position: 'absolute', height: '100vh', width: '100vw', top: 0, left: 0, zIndex: -1}}>
        {blobs.map(blob => (
          <motion.div
            key={blob.id}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: [0, 1, 1, 1, 1, 1, 1, 1, 0], scale: [0.9, 1, 0.9] }}
            transition={{ duration: 2 }}
            className="absolute rounded-full"
            style={{
              width: `${radius*2}px`,
              height: `${radius*2}px`,
              backgroundColor: blob.color,
              top: blob.y,
              left: blob.x,
              boxShadow: `0 0 20px ${blob.color}`
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}

export default ChromesthesiaExperience;