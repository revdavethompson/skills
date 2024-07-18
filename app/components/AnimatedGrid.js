'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import useWindowSize from '@/hooks/useWindowSize';

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const AnimatedGrid = () => {
  const { width } = useWindowSize();
  const [columns, setColumns] = useState('grid-cols-2');
  const [currentColumns, setCurrentColumns] = useState('grid-cols-2');
  const [key, setKey] = useState(0); // Key to trigger re-render

  useEffect(() => {
    let newColumns = 'grid-cols-4';
    if (width >= 1280) newColumns = 'grid-cols-8'; // xl
    else if (width >= 1024) newColumns = 'grid-cols-7'; // lg
    else if (width >= 768) newColumns = 'grid-cols-6'; // md
    else if (width >= 640) newColumns = 'grid-cols-5'; // sm

    if (newColumns !== currentColumns) {
      setColumns(newColumns);
      setCurrentColumns(newColumns);
      setKey(prevKey => prevKey + 1); // Trigger re-render with new key
    }
  }, [width, currentColumns]);

  return (
    <motion.div
      key={key} // Use key to trigger re-animation
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      className={`grid gap-x-6 gap-y-4 justify-items-center items-start px-11 mt-11 ${columns}`}
      layout
    >
      {['construction', 'piano', 'music_note', 'plumbing', 'hardware', 'keyboard', 'skillet', 'delete', 'bolt', 'key'].map((icon, index) => (
        <motion.div
          key={index}
          variants={item}
          layout
          className="group flex flex-col items-center m-2"
        >
          <button className="bg-violet-500 flex items-center justify-center w-16 h-16 rounded-full text-white hover:bg-violet-400 transform hover:-translate-y-1 hover:scale-110">
            <span className="material-symbols-outlined text-4xl">{icon}</span>
          </button>
          <p className="text-center text-gray-700 group-hover:text-gray-500">{icon}</p>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default AnimatedGrid;
