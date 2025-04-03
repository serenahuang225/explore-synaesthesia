import { motion } from 'framer-motion';

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

export default Blob