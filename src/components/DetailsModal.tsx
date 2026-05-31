/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, FlameKindling, Hotel, Sparkles } from 'lucide-react';
import { ScheduleEvent, Accommodation } from '../types';

interface DetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SCHEDULE: ScheduleEvent[] = [
  {
    time: "4:00 PM",
    title: "GARDEN ARRIVAL & TOASTS",
    description: "Welcome champagne and sparkling juices served in the conservatory. Enjoy a romantic string classical quartet.",
    note: "Valet parking is completely hosted for all guests."
  },
  {
    time: "4:30 PM",
    title: "THE SACRED VOUS",
    description: "Exchange of wedding vows under the soaring glass cathedral at the Glass House Garden.",
    note: "Please mute all cameras and cellular phones for an unplugged ceremony."
  },
  {
    time: "5:15 PM",
    title: "COCKTAIL RECEPTION",
    description: "Artisan hors d'oeuvres and signature garden cocktails served in the botanical courtyard.",
    note: "Interactive photo booths are open throughout this time."
  },
  {
    time: "6:30 PM",
    title: "RECEPTION DINNER & DANCING",
    description: "A formal multi-course seasonal autumn dinner followed by lively celebratory dancing, customized toasts and desserts.",
  },
  {
    time: "10:30 PM",
    title: "SPARKLER SEND-OFF",
    description: "Gather with light sparklers in hand to bless Benedict & Sophie as they embark on their honeymoon journey."
  }
];

const HOTELS: Accommodation[] = [
  {
    name: "The Austin Conservatory & Spa",
    description: "A luxury 5-star resort boasting indoor greenhouse pools and majestic garden grounds right next to our venue.",
    distance: "0.5 miles from venue",
    priceRange: "$$$",
    promoCode: "BEN_SOPH_CONSERV",
    websiteUrl: "https://example.com/austin-conservatory"
  },
  {
    name: "Lakeside Botanical Hotel",
    description: "An elegant, modern mid-century boutique hotel overlooking the calm Swan Lake with exquisite sunset patios.",
    distance: "2.1 miles from venue",
    priceRange: "$$",
    promoCode: "SO_BEN_LOVE",
    websiteUrl: "https://example.com/lake-botanical"
  },
  {
    name: "Sage Creek Garden Suites",
    description: "Charming, historic stone cottages tucked in quiet pecan groves. Perfect for group stays and family stays.",
    distance: "4.2 miles from venue",
    priceRange: "$",
    promoCode: "SWAN_GARDENS",
    websiteUrl: "https://example.com/sage-creek"
  }
];

export default function DetailsModal({ isOpen, onClose }: DetailsModalProps) {
  const [activeTab, setActiveTab] = useState<'schedule' | 'dress' | 'hotels'>('schedule');

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#1c221b]/70 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="relative bg-cream-50 w-full max-w-2xl rounded-xl shadow-2xl flex flex-col overflow-hidden max-h-[85vh] border border-gold-300"
          >
            
            {/* Ornate Inner borders */}
            <div className="absolute top-2 left-2 right-2 bottom-2 border border-gold-300/30 rounded-lg pointer-events-none z-10" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2 rounded-full text-sage-600 hover:text-sage-800 hover:bg-sage-100/50 transition-colors cursor-pointer"
              aria-label="Close details"
              id="close-details-btn"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="pt-8 pb-4 text-center px-6 relative z-10">
              <h2 className="font-display text-2xl sm:text-3xl text-sage-700 tracking-wide font-medium italic">
                Wedding Celebrations
              </h2>
              <div className="w-16 h-[1px] bg-gold-400 mx-auto mt-2" />
            </div>

            {/* Styled Tab Bar Navigation */}
            <div className="flex border-b border-cream-200 px-6 gap-2 relative z-10">
              <button
                onClick={() => setActiveTab('schedule')}
                className={`flex-1 py-3 text-xs tracking-[0.15em] uppercase font-sans font-medium border-b-2 flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 ${
                  activeTab === 'schedule'
                    ? 'border-sage-500 text-sage-700 scale-102 font-semibold'
                    : 'border-transparent text-sage-400 hover:text-sage-600'
                }`}
                id="tab-schedule"
              >
                <Calendar className="w-3.5 h-3.5" />
                Schedule
              </button>
              <button
                onClick={() => setActiveTab('dress')}
                className={`flex-1 py-3 text-xs tracking-[0.15em] uppercase font-sans font-medium border-b-2 flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 ${
                  activeTab === 'dress'
                    ? 'border-sage-500 text-sage-700 scale-102 font-semibold'
                    : 'border-transparent text-sage-400 hover:text-sage-600'
                }`}
                id="tab-dress"
              >
                <FlameKindling className="w-3.5 h-3.5" />
                Dress Code
              </button>
              <button
                onClick={() => setActiveTab('hotels')}
                className={`flex-1 py-3 text-xs tracking-[0.15em] uppercase font-sans font-medium border-b-2 flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 ${
                  activeTab === 'hotels'
                    ? 'border-sage-500 text-sage-700 scale-102 font-semibold'
                    : 'border-transparent text-sage-400 hover:text-sage-600'
                }`}
                id="tab-hotels"
              >
                <Hotel className="w-3.5 h-3.5" />
                Stays
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-6 py-6 no-scrollbar relative z-10 text-charcoal-700">
              
              {/* Tab 1: SCHEDULE */}
              {activeTab === 'schedule' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6 max-w-lg mx-auto"
                >
                  <p className="text-center text-xs font-serif italic text-sage-500 mb-6">
                    A beautiful day crafted for family and friends. Join us in celebrating our journey.
                  </p>
                  
                  {SCHEDULE.map((event, index) => (
                    <div key={index} className="flex gap-4 group relative">
                      {/* Timeline Dot and Line */}
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 rounded-full border border-gold-400 flex items-center justify-center group-hover:scale-125 transition-transform">
                          <div className="w-1 h-1 rounded-full bg-sage-500" />
                        </div>
                        {index < SCHEDULE.length - 1 && (
                          <div className="flex-1 w-[1px] bg-gold-300/40 my-1" />
                        )}
                      </div>
                      
                      {/* Content details */}
                      <div className="pb-4">
                        <span className="font-sans text-[11px] font-semibold tracking-wider text-gold-500 block leading-tight">
                          {event.time}
                        </span>
                        <h4 className="font-display text-sm tracking-wide text-sage-700 font-semibold mt-0.5">
                          {event.title}
                        </h4>
                        <p className="font-sans text-xs text-charcoal-700 leading-relaxed mt-1">
                          {event.description}
                        </p>
                        {event.note && (
                          <span className="inline-block mt-1.5 px-2 py-0.5 bg-sage-50 border border-sage-200/50 rounded-full font-serif text-[10px] text-sage-600 italic">
                            * {event.note}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {/* Tab 2: DRESS CODE */}
              {activeTab === 'dress' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6 max-w-lg mx-auto"
                >
                  <div className="text-center">
                    <span className="text-[10px] tracking-[0.2em] uppercase text-gold-500 font-sans block mb-1">
                      Visual Aesthetic
                    </span>
                    <h3 className="font-display text-xl text-sage-700 font-medium italic">
                      Garden Formal / Botanical Elegant
                    </h3>
                    <p className="font-sans text-xs text-charcoal-700 leading-relaxed mt-3 max-w-md mx-auto">
                      In harmony with the stunning lush green settings of the glass cathedral, we invite our guests to dress in sophisticated garden-party wear. 
                    </p>
                  </div>

                  {/* Curated Color Swatches */}
                  <div className="border border-gold-300/40 rounded-lg p-4 bg-cream-100 flex flex-col items-center">
                    <span className="text-[9px] uppercase tracking-wider text-sage-500 font-sans block mb-3 font-medium">
                      Our Suggested Colors & Inspiration
                    </span>
                    
                    <div className="grid grid-cols-5 gap-3 w-full max-w-xs justify-center">
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full shadow-md bg-[#62735d] border border-white" />
                        <span className="text-[9px] text-charcoal-750 font-sans mt-1.5">Sage</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full shadow-md bg-[#d1d6c7] border border-white" />
                        <span className="text-[9px] text-charcoal-750 font-sans mt-1.5">Moss</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full shadow-md bg-[#faf7f2] border border-gold-200" />
                        <span className="text-[9px] text-charcoal-750 font-sans mt-1.5">Cream</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full shadow-md bg-[#be9e6c] border border-white" />
                        <span className="text-[9px] text-charcoal-750 font-sans mt-1.5">Gold</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-15 rounded-full shadow-md bg-[#e7dba8] border border-white" />
                        <span className="text-[9px] text-charcoal-750 font-sans mt-1.5">Champagne</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-sage-50/60 border border-dashed border-sage-200 rounded-md">
                    <h5 className="text-[11px] uppercase tracking-wider font-semibold text-sage-700 font-sans flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-gold-500" />
                      Guest Guidelines
                    </h5>
                    <ul className="text-xs text-charcoal-700 mt-2 space-y-1.5 list-disc list-inside">
                      <li><strong>Gentlemen:</strong> Lightweight formal suits, dinner dinners, or nice linen jackets with neutral trousers in sand, dark gray, or forest green. High quality leather loafers or dress shoes.</li>
                      <li><strong>Ladies:</strong> Floor-length dresses, midis, or silk evening sets printed in botanical themes or solid elegant neutral shades. Nice chunky heels or smart flats for grassy lawns.</li>
                      <li>We kindly request that guests avoid bridal whites (ivory, cream dress colors list) and complete dark black.</li>
                    </ul>
                  </div>
                </motion.div>
              )}

              {/* Tab 3: ACCOMMODATIONS */}
              {activeTab === 'hotels' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4 max-w-lg mx-auto"
                >
                  <p className="text-center text-xs font-serif italic text-sage-500 mb-4">
                    For your travel convenience, we have reserved hotel room block rates at these select destinations.
                  </p>
                  
                  {HOTELS.map((hotel, index) => (
                    <div
                      key={index}
                      className="border border-gold-200 p-4 rounded-lg bg-cream-100 hover:border-gold-300 transition-all duration-300"
                    >
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <h4 className="font-display text-sm tracking-wide text-sage-700 font-bold">
                            {hotel.name}
                          </h4>
                          <span className="text-[10px] text-sage-500 font-sans mt-0.5 block">
                            {hotel.distance} • Price level: <span className="text-gold-500">{hotel.priceRange}</span>
                          </span>
                        </div>
                        <a
                          href={hotel.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-sage-500 hover:bg-sage-600 text-white text-[10px] tracking-wider uppercase font-sans py-1 px-3 rounded hover:scale-102 active:scale-98 transition-all duration-200"
                        >
                          Book Stay
                        </a>
                      </div>
                      
                      <p className="font-sans text-xs text-charcoal-700 leading-relaxed mt-2">
                        {hotel.description}
                      </p>
                      
                      {hotel.promoCode && (
                        <div className="mt-3 flex items-center justify-between border-t border-cream-200 pt-2 text-[10px]">
                          <span className="font-sans text-neutral-550">Group Promo Code:</span>
                          <span className="font-mono bg-white border border-gold-300/40 px-2 py-0.5 rounded text-gold-600 font-semibold select-all">
                            {hotel.promoCode}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </motion.div>
              )}

            </div>

            {/* Inner bottom border highlight */}
            <div className="py-4 bg-cream-100/90 text-center border-t border-cream-200 mt-auto relative z-10">
              <span className="font-signature text-gold-500 text-xl italic select-none">
                With Love, Benedict & Sophie
              </span>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
