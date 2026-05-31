/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Envelope from './components/Envelope';
import MagazineInvitation from './components/MagazineInvitation';

export default function App() {
  const [viewState, setViewState] = useState<'envelope' | 'magazine'>('envelope');

  const handleOpenEnvelope = () => {
    setViewState('magazine');
  };

  return (
    <div className="min-h-screen bg-[#faf6f0] text-charcoal-800 antialiased font-sans flex flex-col justify-between selection:bg-sage-200">
      <AnimatePresence mode="wait">
        {viewState === 'envelope' ? (
          <motion.div
            key="envelope"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full flex flex-col items-center justify-center"
          >
            <Envelope onOpen={handleOpenEnvelope} />
          </motion.div>
        ) : (
          <motion.div
            key="magazine-layouts"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex-1"
          >
            <MagazineInvitation />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
