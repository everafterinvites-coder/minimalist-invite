import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Envelope from './components/Envelope';
import MagazineInvitation from './components/MagazineInvitation';

export default function App() {
  const [viewState, setViewState] = useState<'envelope' | 'magazine'>('envelope');

  return (
    <div className="min-h-screen bg-[#faf6f0] text-charcoal-800 antialiased overflow-hidden">
      <AnimatePresence mode="wait">
        {viewState === 'envelope' ? (
          <motion.div
            key="envelope"
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="h-screen w-full"
          >
            <Envelope onOpen={() => setViewState('magazine')} />
          </motion.div>
        ) : (
          <motion.div
            key="magazine"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <MagazineInvitation />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
