import { useState } from 'react';
import { motion } from 'motion/react';

export default function Envelope({ onOpen }: { onOpen: () => void }) {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <div className="h-full flex items-center justify-center">
      <div className="relative w-80 h-60 bg-sage-600 rounded-lg shadow-xl">
        {/* The Card Emerging */}
        <motion.div
          animate={isOpened ? { y: -100 } : { y: 0 }}
          transition={{ type: "spring", stiffness: 60, damping: 15 }}
          className="absolute inset-x-4 top-4 h-40 bg-cream-50 rounded shadow-md z-10"
        />

        {/* The Flap - Event Trigger */}
        <motion.div
          animate={isOpened ? { rotateX: 180 } : { rotateX: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          onAnimationComplete={() => isOpened && onOpen()}
          onClick={() => setIsOpened(true)}
          className="absolute inset-0 z-20 cursor-pointer"
          style={{ transformOrigin: "top center", transformStyle: "preserve-3d" }}
        >
          <div className="w-full h-full bg-sage-700 rounded-t-lg" />
        </motion.div>
      </div>
    </div>
  );
}
