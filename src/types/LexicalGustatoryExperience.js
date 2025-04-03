import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LexicalGustatoryExperience = () => {
  // Full word bank with taste emojis
  const fullWordBank = {
    "Sunshine": { 
      taste: "Warm lemon drops 🍋", 
      color: "#FFD700",
      emoji: "☀️"
    },
    "Rain": { 
      taste: "Cold mint ❄️", 
      color: "#00B4D8",
      emoji: "🌧️"
    },
    "Book": { 
      taste: "Buttered toast 🍞", 
      color: "#A67C52",
      emoji: "📖"
    },
    "Music": { 
      taste: "Sweet tangerine 🍊", 
      color: "#FF9E00",
      emoji: "🎵"
    },
    "Friend": { 
      taste: "Honey 🍯", 
      color: "#F9C74F",
      emoji: "👫"
    },
    "Monday": { 
      taste: "Stale cereal 🥣", 
      color: "#A5A5A5",
      emoji: "📅"
    },
    "Love": { 
      taste: "Strawberries 🍓", 
      color: "#FF6B6B",
      emoji: "❤️"
    },
    "Money": { 
      taste: "Metallic pennies 💰", 
      color: "#C0C0C0",
      emoji: "💵"
    },
    "Summer": { 
      taste: "Watermelon 🍉", 
      color: "#FF7AA2",
      emoji: "🌞"
    },
    "Winter": { 
      taste: "Peppermint candy cane 🍬", 
      color: "#A5D8FF",
      emoji: "⛄"
    },
    "Adventure": { 
      taste: "Spicy chili 🌶️", 
      color: "#E63946",
      emoji: "🗺️"
    },
    "Home": { 
      taste: "Fresh baked cookies 🍪", 
      color: "#D4A373",
      emoji: "🏠"
    },
    "Dream": { 
      taste: "Cotton candy 🍭", 
      color: "#FFB7D5",
      emoji: "💭"
    },
    "Ocean": { 
      taste: "Salty seaweed 🌊", 
      color: "#1D3557",
      emoji: "🌊"
    },
    "Mountain": { 
      taste: "Pine needles 🌲", 
      color: "#2A9D8F",
      emoji: "⛰️"
    }
  };

  // State for currently displayed words
  const [displayedWords, setDisplayedWords] = useState(() => {
    return shuffleArray(Object.keys(fullWordBank)).slice(0, 6);
  });
  const [selectedWord, setSelectedWord] = useState(null);
  const [infoVisible, setInfoVisible] = useState(false);

  // Shuffle function
  const shuffleWords = () => {
    setSelectedWord(null);
    setInfoVisible(false);
    setDisplayedWords(shuffleArray(Object.keys(fullWordBank)).slice(0, 6));
  };

  const handleWordClick = (word) => {
    setSelectedWord(word);
    setInfoVisible(true);
    setTimeout(() => setInfoVisible(false), 3000);
  };

  return (
    <div className="p-6 rounded-xl bg-white shadow-lg text-black mb-6">
      <p className="mb-6 text-center">
        Where words evoke specific taste sensations
      </p>

      <div className="grid grid-cols-2 gap-3 mb-6">
        {displayedWords.map((word) => (
          <motion.button
            key={word}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleWordClick(word)}
            className={`p-3 rounded-lg flex items-center justify-center transition-colors ${
              selectedWord === word ? 'bg-opacity-90' : 'bg-opacity-50'
            }`}
            style={{ 
              backgroundColor: `${fullWordBank[word].color}${
                selectedWord === word ? '90' : '50'
              }`
            }}
          >
            <span className="text-xl mr-2">{fullWordBank[word].emoji}</span>
            <span className="font-medium">{word}</span>
          </motion.button>
        ))}
      </div>

      <div className="flex justify-center items-center mb-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={shuffleWords}
          className="px-3 py-1 bg-gray-200 rounded-full text-sm font-medium"
        >
          Shuffle 🔄
        </motion.button>
      </div>

      <AnimatePresence>
        {infoVisible && selectedWord && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: 'spring', damping: 10 }}
            className="p-3 rounded-lg mb-4 text-center"
            style={{ backgroundColor: `${fullWordBank[selectedWord].color}20` }}
          >
            <p className="font-medium">
              The word <strong>"{selectedWord}"</strong> tastes like<br />
              <span className="text-lg">{fullWordBank[selectedWord].taste}</span>
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="p-3 bg-red-50 rounded-lg text-red-800 text-sm">
        <p className="font-medium">ℹ️ About Lexical-Gustatory Synesthesia:</p>
        <p>
          For people with this condition, hearing or reading words automatically 
          triggers specific taste sensations in their mouth.
        </p>
      </div>
    </div>
  );
};

// Helper function to shuffle array
function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export default LexicalGustatoryExperience;