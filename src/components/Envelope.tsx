/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import swansImg from '../assets/images/swans_on_lake_1780230049563.png';

interface EnvelopeProps {
  onOpen: () => void;
}

export default function Envelope({ onOpen }: EnvelopeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullyOpened, setIsFullyOpened] = useState(false);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);
    
    // Smooth timing: Flap opens -> card emerges -> invitation view shifts
    setTimeout(() => {
      setIsFullyOpened(true);
    }, 1800); // Exiting animation completes in 1.8s

    setTimeout(() => {
      onOpen();
    }, 2800); // State changes in 2.8s
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#faf6f0] px-4 overflow-hidden relative selection:bg-sage-100">
      
      {/* Decorative subtle texture/vignette */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent to-cream-200/40 pointer-events-none" />

      <AnimatePresence>
        {!isFullyOpened && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-lg flex flex-col items-center justify-center relative z-10"
          >
            {/* Header Text */}
            <motion.div 
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.1 }}
              className="text-center mb-8 flex flex-col gap-1.5"
            >
              <span className="text-xs uppercase tracking-[0.25em] text-sage-600 font-sans font-medium">
                You've Got Mail From
              </span>
              <h1 className="text-4xl sm:text-5xl font-signature text-sage-700 italic select-none">
                Benedict & Sophie
              </h1>
            </motion.div>

            {/* Envelope Perspective Board */}
            <div className="relative w-full aspect-[4/3] flex items-center justify-center pt-6">
              
              {/* Back shadows */}
              <div className="absolute inset-x-8 bottom-0 h-4 bg-black/5 blur-md rounded-full pointer-events-none" />

              {/* The Realistic Envelope Body */}
              <div className="relative w-full max-w-[400px] h-[250px] bg-sage-500 rounded-lg shadow-2xl relative">
                
                {/* 1. Envelope Cavity Background & The Slip Card */}
                <div className="absolute inset-0 bg-sage-600 overflow-hidden rounded-lg">
                  {/* Subtle dark interior shadow */}
                  <div className="absolute inset-0 bg-black/10 shadow-inner pointer-events-none" />
                </div>

                {/* The Slipping emerging Invite Card */}
                <motion.div
                  initial={{ y: 15 }}
                  animate={isOpen ? { y: -160, scale: 0.96 } : { y: 15 }}
                  transition={{ 
                    y: { delay: 0.6, duration: 1.4, ease: [0.16, 1, 0.3, 1] },
                    scale: { delay: 0.6, duration: 1.4 }
                  }}
                  className="absolute left-[8%] right-[8%] top-3 bottom-3 bg-cream-50 rounded shadow-md border border-neutral-200/50 flex flex-col p-4 select-none pointer-events-none"
                  style={{ zIndex: isOpen ? 12 : 5 }}
                >
                  <div className="w-full h-full border border-gold-300 flex flex-col items-center justify-center p-3 relative bg-cream-50">
                    {/* Decorative gold micro corners */}
                    <div className="absolute top-1 left-1 w-2 h-2 border-t border-l border-gold-300" />
                    <div className="absolute top-1 right-1 w-2 h-2 border-t border-r border-gold-300" />
                    <div className="absolute bottom-1 left-1 w-2 h-2 border-b border-l border-gold-300" />
                    <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-gold-300" />

                    {/* Swans Classic Artwork */}
                    <div className="w-full flex-1 relative overflow-hidden bg-cream-100 rounded border border-gold-200 mb-2">
                      <img 
                        src={swansImg} 
                        alt="Benedict and Sophie Monogram Swans" 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    
                    <div className="text-[9px] uppercase tracking-[0.2em] text-neutral-500 font-sans mt-0.5">
                      The Wedding of
                    </div>
                    <div className="text-md font-serif font-semibold text-charcoal-800 italic mt-0.5">
                      Benedict & Sophie
                    </div>
                    <div className="text-[7px] uppercase tracking-[0.15em] text-gold-500 mt-1 font-sans">
                      Sept 24, 2026 • Austin, TX
                    </div>
                  </div>
                </motion.div>

                {/* 2. Side and Bottom Folds (Over the emerging card to simulate depth) */}
                <div className="absolute inset-0 z-10 pointer-events-none">
                  {/* Left Triangle flap */}
                  <svg className="absolute inset-y-0 left-0 w-1/2 h-full" viewBox="0 0 200 250" preserveAspectRatio="none">
                    <polygon points="0,0 200,125 0,250" fill="#586753" className="stroke-sage-600/30 stroke-[0.5]" />
                  </svg>
                  {/* Right Triangle flap */}
                  <svg className="absolute inset-y-0 right-0 w-1/2 h-full" viewBox="0 0 200 250" preserveAspectRatio="none">
                    <polygon points="200,0 0,125 200,250" fill="#586753" className="stroke-sage-600/30 stroke-[0.5]" />
                  </svg>
                  {/* Bottom flap */}
                  <svg className="absolute bottom-0 inset-x-0 w-full h-[150px]" viewBox="0 0 400 150" preserveAspectRatio="none">
                    <polygon points="0,150 200,15 400,150" fill="#4d5a49" className="stroke-sage-700/20 stroke-[0.5]" />
                  </svg>
                </div>

                {/* 3. Top Flap with 3D folding down */}
                <motion.div
                  initial={{ rotateX: 0 }}
                  animate={isOpen ? { rotateX: 180, zIndex: 1, y: -2 } : { rotateX: 0, zIndex: 20 }}
                  transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1] }}
                  style={{ transformOrigin: "top center", transformStyle: "preserve-3d" }}
                  className="absolute top-0 inset-x-0 h-[125px] cursor-pointer"
                >
                  {/* Front Face (Sage green triangle pointing down when closed) */}
                  <div className="absolute inset-0 backface-hidden" style={{ backfaceVisibility: "hidden" }}>
                    <svg className="w-full h-full" viewBox="0 0 400 125" preserveAspectRatio="none">
                      <polygon points="0,0 200,125 400,0" fill="#62735d" className="shadow-lg stroke-sage-400/20 stroke-[0.5]" />
                    </svg>
                  </div>

                  {/* Back Face (Inside pattern or sage green when flipped up) */}
                  <div className="absolute inset-0 w-full h-full" style={{ transform: "rotateX(180deg)", backfaceVisibility: "hidden" }}>
                    <svg className="w-full h-full" viewBox="0 0 400 125" preserveAspectRatio="none">
                      <polygon points="0,0 200,125 400,0" fill="#5b6a56" className="stroke-sage-400/40" />
                    </svg>
                  </div>
                </motion.div>

                {/* 4. Elegant digital white/gold wax seal (Fades with flap and floats) */}
                <motion.div
                  animate={isOpen ? { 
                    y: 75,
                    scale: 0.85,
                    opacity: 0,
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0)"
                  } : { 
                    y: 105,
                    scale: 1,
                    opacity: 1,
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.15)"
                  }}
                  transition={{ 
                    y: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
                    scale: { duration: 0.6 },
                    opacity: { delay: 0.4, duration: 0.4 }
                  }}
                  onClick={handleOpen}
                  className="absolute left-1/2 -ml-11 h-22 w-22 rounded-full cursor-pointer flex items-center justify-center select-none active:scale-95 transition-transform duration-200 z-30"
                  style={{
                    backgroundColor: "#faf7f0",
                    border: "2px solid #eae2d6",
                    backgroundImage: "radial-gradient(ellipse at 50% 50%, #fafbfd 0%, #ede6db 60%, #e1d8cb 100%)",
                  }}
                >
                  {/* Irregular outer wax seal edge using styled inner SVG outline */}
                  <div className="absolute inset-1 rounded-full border border-gold-300/40 pointer-events-none" />
                  <div className="absolute inset-2.5 rounded-full border border-dashed border-gold-400/20 pointer-events-none" />
                  
                  {/* Wax Seal monogram initials initials "B&S" */}
                  <div className="flex flex-col items-center justify-center text-center leading-none mt-1">
                    <span className="text-[12px] uppercase font-sans tracking-[0.15em] text-gold-600 font-semibold">B</span>
                    <span className="text-[8px] font-signature text-gold-500 italic my-[-1px]">and</span>
                    <span className="text-[12px] uppercase font-sans tracking-[0.15em] text-gold-600 font-semibold">S</span>
                  </div>

                  {/* Gentle radiating luxury ring */}
                  <div className="absolute inset-0 rounded-full animate-ping border border-gold-300 opacity-20 pointer-events-none scale-105" />
                </motion.div>

                {/* Elegant White Tulip Bouquet underneath/offset behind the envelope */}
                <div className="absolute -left-12 -bottom-14 h-48 w-48 pointer-events-none z-22 select-none">
                  {/* Decorative Hand-drawn styled vector tulip bouquet in base container */}
                  <svg viewBox="0 0 100 100" className="w-full h-full text-sage-300 drop-shadow-md">
                    {/* Tulip Stems */}
                    <path d="M40,90 Q45,60 35,30" fill="none" stroke="#83917a" strokeWidth="1.5" />
                    <path d="M45,90 Q50,65 52,35" fill="none" stroke="#83917a" strokeWidth="1.5" />
                    <path d="M50,90 Q48,60 62,40" fill="none" stroke="#83917a" strokeWidth="1.5" />
                    {/* Leaves */}
                    <path d="M40,80 Q25,60 30,45 Q36,65 42,75 Z" fill="#9fad96" opacity="0.8" />
                    <path d="M48,80 Q65,65 60,45 Q53,65 48,75 Z" fill="#9fad96" opacity="0.8" />
                    {/* Flowers (White creamy tulip buds) */}
                    {/* Tulip 1 */}
                    <g transform="translate(30,15) rotate(-15) scale(0.7)">
                      <path d="M10,35 C5,20 10,5 20,5 C30,5 35,20 30,35 C25,40 15,40 10,35 Z" fill="#faf6f0" stroke="#eae2d5" strokeWidth="0.5" />
                      <path d="M10,35 C15,25 18,15 20,5" fill="none" stroke="#eae2d5" strokeWidth="0.5" />
                      <path d="M30,35 C25,25 22,15 20,5" fill="none" stroke="#eae2d5" strokeWidth="0.5" />
                    </g>
                    {/* Tulip 2 */}
                    <g transform="translate(45,18) scale(0.65)">
                      <path d="M10,35 C5,20 10,5 20,5 C30,5 35,20 30,35 C25,40 15,40 10,35 Z" fill="#fcf9f5" stroke="#eae2d5" strokeWidth="0.5" />
                      <path d="M10,35 C15,25 18,15 20,5" fill="none" stroke="#eae2d5" strokeWidth="0.5" />
                      <path d="M30,35 C25,25 22,15 20,5" fill="none" stroke="#eae2d5" strokeWidth="0.5" />
                    </g>
                    {/* Tulip 3 */}
                    <g transform="translate(55,24) rotate(20) scale(0.6)">
                      <path d="M10,35 C5,20 10,5 20,5 C30,5 35,20 30,35 C25,40 15,40 10,35 Z" fill="#fcfaf7" stroke="#eae2d5" strokeWidth="0.5" />
                      <path d="M10,35 C15,25 18,15 20,5" fill="none" stroke="#eae2d5" strokeWidth="0.5" />
                      <path d="M30,35 C25,25 22,15 20,5" fill="none" stroke="#eae2d5" strokeWidth="0.5" />
                    </g>
                  </svg>
                </div>

              </div>
            </div>

            {/* Instruction Footer Subtext */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={isOpen ? { opacity: 0, y: 10 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mt-6 flex flex-col items-center justify-center gap-1.5 cursor-pointer"
              onClick={handleOpen}
            >
              <span className="text-[10px] uppercase tracking-[0.3em] font-sans text-sage-500 hover:text-sage-700 transition-colors font-medium">
                Tap to Open the Seal...
              </span>
              <motion.div 
                animate={{ y: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
                className="w-1.5 h-1.5 rounded-full bg-sage-400"
              />
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
