/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, CalendarDays, Heart, MapPin, Sparkle, Clock } from 'lucide-react';
import DetailsModal from './DetailsModal';
import RSVPModal from './RSVPModal';

// Import Generated Images
import swansImg from '../assets/images/swans_on_lake_1780230049563.png';
import coupleEditorialImg from '../assets/images/couple_editorial_1780230070528.png';
import coupleSunsetImg from '../assets/images/couple_sunset_1780230091464.png';

export default function MagazineInvitation() {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [rsvpOpen, setRsvpOpen] = useState(false);

  // Countdown State
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Calculate Countdown
  useEffect(() => {
    // September 24, 2026 at 4:00 PM (Austin, TX CDT is UTC-5)
    const targetDate = new Date('2026-09-24T16:00:00-05:00').getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#faf7f2] pb-24 relative selection:bg-sage-105 select-none font-sans overflow-x-hidden">
      
      {/* Background ambient gold grid overlay */}
      <div className="absolute inset-x-0 top-0 h-full max-h-screen bg-[radial-gradient(#e7dba8_0.8px,transparent_0.8px)] [background-size:24px_24px] opacity-[0.22] pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-12">
        
        {/* Magazine Editorial Masthead */}
        <header className="text-center mb-16 relative">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="flex flex-col items-center gap-1.5"
          >
            <span className="text-[10px] tracking-[0.35em] uppercase text-gold-500 font-sans font-medium">
              The Celebration of Marriage
            </span>
            <div className="flex items-center gap-4 justify-center w-full max-w-md my-0.5">
              <div className="h-[0.5px] bg-gold-300 flex-1 opacity-70" />
              <Sparkles className="w-3.5 h-3.5 text-gold-500 animate-pulse" />
              <div className="h-[0.5px] bg-gold-300 flex-1 opacity-70" />
            </div>
            <h1 className="text-5xl sm:text-6xl font-display text-sage-700 italic font-semibold italic flex flex-wrap justify-center items-center gap-x-3 gap-y-1">
              Benedict <span className="font-signature text-gold-500 text-5xl sm:text-6xl tracking-wide font-normal italic lowercase my-[-4px]">and</span> Sophie
            </h1>
            <p className="text-[10px] sm:text-xs font-serif text-sage-500 italic mt-1.5 tracking-wider">
              AUSTIN, TEXAS • TWENTY-FOURTH OF SEPTEMBER
            </p>
          </motion.div>
        </header>

        {/* Magazine Grid Layout */}
        <main className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch mb-20">

          {/* Section 1: The Swans Oil Painting Centerpiece (Span 7) */}
          <motion.section
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.0 }}
            className="md:col-span-7 flex flex-col justify-between"
          >
            <div className="bg-white rounded-lg p-5 border border-gold-300 shadow-lg relative h-full flex flex-col justify-between overflow-hidden">
              {/* Ornate corner brackets */}
              <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-gold-300/65" />
              <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-gold-300/65" />
              <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-gold-300/65" />
              <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-gold-300/65" />

              <div className="relative aspect-[4/3] rounded overflow-hidden border border-gold-200 shadow-sm flex-1 mb-4 bg-cream-50">
                <img
                  src={swansImg}
                  alt="Swans artwork motif"
                  className="w-full h-full object-cover transition-transform duration-1000 hover:scale-103"
                  referrerPolicy="no-referrer"
                />
                {/* Vignette */}
                <div className="absolute inset-0 bg-image-vignette opacity-20 pointer-events-none" />
              </div>

              <div className="text-center pt-2 px-2">
                <div className="font-signature text-gold-500 text-2xl mb-1 select-none">
                  Serenity of Love
                </div>
                <p className="font-serif text-[11px] leading-relaxed text-charcoal-700 italic">
                  "Like two swans drifting majestically on still waters, true love finds its sanctuary in quiet hearts."
                </p>
              </div>
            </div>
          </motion.section>

          {/* Section 2: The Big Date & Location Card (Span 5) */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.0, delay: 0.15 }}
            className="md:col-span-5 flex flex-col"
          >
            <div className="bg-sage-50 rounded-lg p-6 border border-sage-200 shadow-lg flex-1 flex flex-col justify-center text-center relative overflow-hidden">
              
              {/* Inside Double line border */}
              <div className="absolute inset-3 border border-sage-300/30 rounded" />
              
              <div className="relative z-10 flex flex-col items-center">
                
                <CalendarDays className="w-5 h-5 text-gold-500 mb-4" />
                
                <span className="text-[10px] tracking-[0.25em] uppercase text-gold-500 font-sans font-medium mb-2">
                  Kindly Save the Date
                </span>
                
                <div className="font-display text-4xl text-sage-700 font-bold mb-1 italic tracking-tight">
                  24
                </div>
                <div className="font-display font-semibold text-lg uppercase text-sage-600 tracking-[0.15em] mb-4">
                  September 2026
                </div>
                
                {/* Visual flower accent divider */}
                <span className="font-serif text-gold-500 text-xs italic tracking-widest my-1 mb-3">
                  at 4:00 PM
                </span>

                <div className="h-[0.5px] w-24 bg-gold-300 my-2" />

                <div className="flex items-center gap-1.5 justify-center text-sage-700 font-display font-medium text-xs tracking-[0.05em] mt-2 mb-2">
                  <MapPin className="w-3.5 h-3.5 text-sage-500" />
                  THE GLASS HOUSE GARDEN
                </div>

                <p className="font-sans text-[10px] text-charcoal-700 uppercase tracking-widest max-w-[190px] mx-auto mt-1 leading-relaxed">
                  Austin, Texas
                </p>

                <div className="mt-6 flex flex-col gap-1 items-center justify-center">
                  {/* Styled venue initials digital crest */}
                  <div className="w-8 h-8 rounded-full border border-gold-400 font-sans flex items-center justify-center text-[10px] text-gold-500 font-semibold select-none bg-white">
                    B&S
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Section 3: Tap for Details Frame (Asymmetrical Span 4) */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.0 }}
            className="md:col-span-4 flex flex-col"
          >
            <div 
              onClick={() => setDetailsOpen(true)}
              className="bg-white rounded-lg p-6 border-2 border-gold-400 hover:border-gold-500 shadow-md flex-1 flex flex-col items-center justify-center text-center cursor-pointer hover:shadow-xl transition-all duration-300 relative group overflow-hidden"
              style={{
                backgroundImage: "linear-gradient(to bottom, #ffffff 0%, #faf9f6 100%)"
              }}
            >
              {/* Gold luxury thin borders */}
              <div className="absolute top-2 left-2 right-2 bottom-2 border border-dashed border-gold-300/50 rounded pointer-events-none" />
              
              <div className="relative z-10 flex flex-col items-center">
                
                {/* Mirror decorative SVG or vintage frame */}
                <div className="w-12 h-14 border border-gold-400 rounded-t-full rounded-b-full flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300 bg-cream-50">
                  <Clock className="w-4 h-4 text-gold-500 group-hover:animate-spin" style={{ animationDuration: '6s' }} />
                </div>

                <span className="text-[10px] tracking-[0.25em] uppercase text-gold-500 font-sans font-semibold mb-2">
                  Event Guide
                </span>
                
                <h3 className="font-display text-md text-sage-700 font-semibold italic tracking-wide">
                  Schedule, Clothes & Hotels
                </h3>
                
                <span className="font-signature text-gold-500 text-2xl block mt-2 select-none group-hover:translate-y-[-2px] transition-transform">
                  tap here for the details
                </span>
                
                <div className="w-4 h-4 rounded-full border border-gold-400 flex items-center justify-center mt-4">
                  <div className="w-1.5 h-1.5 bg-sage-500 rounded-full" />
                </div>
              </div>
            </div>
          </motion.section>

          {/* Section 4: Polaroid Photo Memories Plaque (Span 5) */}
          <motion.section
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.0, delay: 0.1 }}
            className="md:col-span-5 flex flex-col"
          >
            <div className="bg-cream-200 rounded-lg p-5 border border-gold-300 shadow-md flex-1 flex flex-col justify-between relative overflow-hidden">
              
              <div className="text-center mb-4">
                <span className="text-[9px] tracking-[0.2em] uppercase text-sage-600 font-sans block mb-0.5">
                  Precious Moments
                </span>
                <h3 className="font-display font-medium text-sm text-sage-700 italic">
                  Moments Traveled Together
                </h3>
              </div>

              {/* Overlapping Polaroid gallery */}
              <div className="relative h-60 w-full flex items-center justify-center mb-2">
                {/* Polaroid 1 (Greenhouse style, tilted left) */}
                <div className="absolute top-2 left-6 w-[170px] bg-white p-2.5 pb-8 shadow-xl border border-neutral-150 rotate-[-4deg] rounded-sm transform hover:rotate-[-1deg] transition-all duration-300 z-10 hover:z-20">
                  <div className="aspect-[3/4] w-full overflow-hidden bg-neutral-100 rounded-sm">
                    <img 
                      src={coupleEditorialImg} 
                      alt="Benedict and Sophie in Greenhouse" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="text-center font-signature text-[#5c5040] text-sm mt-2 select-none">
                    Under the greenhouse
                  </div>
                </div>

                {/* Polaroid 2 (Lakeside style sunset, tilted right) */}
                <div className="absolute top-4 right-6 w-[170px] bg-white p-2.5 pb-8 shadow-xl border border-neutral-150 rotate-[6deg] rounded-sm transform hover:rotate-[1deg] transition-all duration-300 hover:z-20">
                  <div className="aspect-[3/4] w-full overflow-hidden bg-neutral-100 rounded-sm">
                    <img 
                      src={coupleSunsetImg} 
                      alt="Benedict and Sophie at Sunset beach" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="text-center font-signature text-[#5c5040] text-sm mt-2 select-none">
                    Chasing waves, 2026
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Section 5: RSVP Floral Plaque (Span 3) */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.0, delay: 0.15 }}
            className="md:col-span-3 flex flex-col"
          >
            <div 
              onClick={() => setRsvpOpen(true)}
              className="bg-sage-600 text-white rounded-lg p-6 border border-sage-700 hover:bg-sage-700 shadow-md flex-1 flex flex-col items-center justify-center text-center cursor-pointer hover:shadow-xl transition-all duration-300 relative group overflow-hidden"
            >
              
              {/* Gilded Inner Borders */}
              <div className="absolute inset-2.5 border border-white/20 rounded pointer-events-none" />
              <div className="absolute inset-4 border border-dashed border-gold-300/30 rounded pointer-events-none" />

              <div className="relative z-10 flex flex-col items-center">
                <Heart className="w-6 h-6 text-gold-300 mb-4 group-hover:scale-110 group-hover:fill-gold-300 transition-all duration-300" />
                
                <span className="text-[9px] tracking-[0.25em] uppercase text-gold-300 font-sans font-semibold mb-2">
                  The Honor of Your
                </span>
                
                <h3 className="font-display text-lg text-white font-medium tracking-wide">
                  Presence
                </h3>
                
                <span className="font-signature text-gold-200 text-3xl block mt-1 select-none">
                  kindly RSVP here
                </span>
                
                <div className="mt-4 px-3 py-1 bg-white/10 rounded-full border border-white/10 text-[9px] tracking-widest uppercase font-sans font-medium text-cream-100">
                  Form Open
                </div>
              </div>
            </div>
          </motion.section>

          {/* Section 6: Our Love Story Arched Frame (Span 12 - Full Width Asymmetric Story Card) */}
          <motion.section
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2 }}
            className="col-span-1 md:col-span-12"
          >
            <div className="bg-white rounded-lg p-6 sm:p-8 border border-gold-300 shadow-lg relative overflow-hidden">
              <div className="absolute top-2 left-2 right-2 bottom-2 border border-gold-300/20 rounded-lg pointer-events-none" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                
                {/* Arched Portrait Image Frame */}
                <div className="flex justify-center">
                  <div className="w-full max-w-[280px] aspect-[3/4] bg-cream-100 border border-gold-300 p-2 relative shadow-lg" style={{ borderRadius: "140px 140px 0 0" }}>
                    <div className="w-full h-full overflow-hidden" style={{ borderRadius: "130px 130px 0 0" }}>
                      <img 
                        src={coupleSunsetImg} 
                        alt="Our Love Story lake sunset" 
                        className="w-full h-full object-cover transition-transform duration-1000 hover:scale-104"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>
                </div>

                {/* Love Story Text Details */}
                <div className="flex flex-col justify-center text-center md:text-left pr-0 md:pr-4">
                  <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                    <Sparkle className="w-3.5 h-3.5 text-gold-500" />
                    <span className="text-[10px] uppercase font-sans tracking-[0.25em] text-gold-500 font-semibold">
                      Our Love Story
                    </span>
                  </div>
                  
                  <h3 className="font-display text-2xl text-sage-700 italic font-semibold mb-4 text-center md:text-left">
                    Two Swans in Safe Harbors
                  </h3>
                  
                  <p className="font-serif text-xs sm:text-sm text-charcoal-700 leading-relaxed italic mb-4">
                    "Meeting under the Austin pecan groves, our connection grew over lakeside sunset strolls, long morning coffees, and simple conversations. Sophie found her anchor, and Benedict found his muse. Like the classic swans on beautiful waters, we are completing each other's journey."
                  </p>
                  
                  <p className="font-serif text-xs sm:text-sm text-charcoal-700 leading-relaxed italic mb-4">
                    "Now, nestled inside the Glass House Garden conservatory, we pledge our sacred vow to walk happily ever after. We cannot wait to take this grand step surrounded by families, warmth, and the dearest friends of our lives."
                  </p>

                  <div className="flex justify-center md:justify-start">
                    <div className="w-12 h-[1px] bg-gold-400" />
                  </div>
                </div>

              </div>
            </div>
          </motion.section>

        </main>

        {/* Footer with countdown timer in an elegant custom block banner */}
        <footer className="mt-16 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0 }}
            className="bg-sage-100 border border-sage-200 rounded-xl p-8 max-w-xl mx-auto shadow-md relative"
          >
            <div className="absolute inset-1.5 border border-sage-300/30 rounded-lg pointer-events-none" />

            <span className="text-[10px] tracking-[0.3em] uppercase text-sage-600 block mb-4 font-sans font-medium">
              Countdown to the vows
            </span>

            {/* Countdown layout */}
            <div className="grid grid-cols-4 gap-2 max-w-xs mx-auto mb-6 text-sage-750">
              <div className="flex flex-col items-center bg-white/70 py-2.5 rounded border border-sage-200/50">
                <span className="text-xl sm:text-2xl font-semibold font-display tracking-tight text-sage-800">
                  {timeLeft.days.toString().padStart(2, '0')}
                </span>
                <span className="text-[8px] uppercase tracking-wider font-sans text-sage-500 mt-0.5">
                  Days
                </span>
              </div>
              <div className="flex flex-col items-center bg-white/70 py-2.5 rounded border border-sage-200/50">
                <span className="text-xl sm:text-2xl font-semibold font-display tracking-tight text-sage-800">
                  {timeLeft.hours.toString().padStart(2, '0')}
                </span>
                <span className="text-[8px] uppercase tracking-wider font-sans text-sage-500 mt-0.5">
                  Hours
                </span>
              </div>
              <div className="flex flex-col items-center bg-white/70 py-2.5 rounded border border-sage-200/50">
                <span className="text-xl sm:text-2xl font-semibold font-display tracking-tight text-sage-800">
                  {timeLeft.minutes.toString().padStart(2, '0')}
                </span>
                <span className="text-[8px] uppercase tracking-wider font-sans text-sage-500 mt-0.5">
                  Mins
                </span>
              </div>
              <div className="flex flex-col items-center bg-white/70 py-2.5 rounded border border-sage-200/50">
                <span className="text-xl sm:text-2xl font-semibold font-display tracking-tight text-sage-800">
                  {timeLeft.seconds.toString().padStart(2, '0')}
                </span>
                <span className="text-[8px] uppercase tracking-wider font-sans text-sage-500 mt-0.5">
                  Secs
                </span>
              </div>
            </div>

            <p className="text-[10px] uppercase tracking-widest text-[#6c7c64] font-sans font-semibold mb-2">
              Before the Big Day
            </p>

            <span className="text-2xl font-signature text-gold-600 block mt-3 select-none">
              With Love, Benedict & Sophie
            </span>
          </motion.div>

          <p className="text-[9px] uppercase tracking-widest text-neutral-400 mt-12 mb-4 font-sans">
            Created for the Celebration of Sophie & Benedict Bridgerton • Sept 24, 2026
          </p>
        </footer>

      </div>

      {/* Modals */}
      <DetailsModal isOpen={detailsOpen} onClose={() => setDetailsOpen(false)} />
      <RSVPModal isOpen={rsvpOpen} onClose={() => setRsvpOpen(false)} />

    </div>
  );
}
