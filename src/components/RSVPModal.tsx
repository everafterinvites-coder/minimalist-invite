/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, Sparkles, CheckCircle2 } from 'lucide-react';
import { RSVPResponse } from '../types';

interface RSVPModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RSVPModal({ isOpen, onClose }: RSVPModalProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [isAttending, setIsAttending] = useState<boolean | null>(null);
  const [hasPlusOne, setHasPlusOne] = useState(false);
  const [plusOneName, setPlusOneName] = useState('');
  const [dietaryRestrictions, setDietaryRestrictions] = useState('');
  const [diningPreference, setDiningPreference] = useState<'beef' | 'salmon' | 'vegan' | 'none'>('none');
  const [songRequest, setSongRequest] = useState('');
  const [message, setMessage] = useState('');
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentRSVP, setCurrentRSVP] = useState<RSVPResponse | null>(null);

  // Check if they already RSVP'd on this device
  useEffect(() => {
    const saved = localStorage.getItem('wedding_rsvp');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setCurrentRSVP(parsed);
      } catch (e) {
        console.error("Error reading saved RSVP", e);
      }
    }
  }, [isOpen]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || isAttending === null) return;

    const rsvpData: RSVPResponse = {
      id: crypto.randomUUID?.() || Date.now().toString(),
      fullName,
      email,
      isAttending,
      hasPlusOne: isAttending ? hasPlusOne : false,
      plusOneName: (isAttending && hasPlusOne) ? plusOneName : '',
      dietaryRestrictions,
      diningPreference: isAttending ? diningPreference : 'none',
      songRequest,
      message,
      submittedAt: new Date().toISOString()
    };

    localStorage.setItem('wedding_rsvp', JSON.stringify(rsvpData));
    setCurrentRSVP(rsvpData);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    // Let them update their RSVP
    if (currentRSVP) {
      setFullName(currentRSVP.fullName || '');
      setEmail(currentRSVP.email || '');
      setIsAttending(currentRSVP.isAttending);
      setHasPlusOne(currentRSVP.hasPlusOne || false);
      setPlusOneName(currentRSVP.plusOneName || '');
      setDietaryRestrictions(currentRSVP.dietaryRestrictions || '');
      setDiningPreference(currentRSVP.diningPreference || 'none');
      setSongRequest(currentRSVP.songRequest || '');
      setMessage(currentRSVP.message || '');
    }
    setIsSubmitted(false);
    setCurrentRSVP(null);
  };

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

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="relative bg-cream-50 w-full max-w-lg rounded-xl shadow-2xl flex flex-col overflow-hidden max-h-[85vh] border border-gold-300"
          >
            {/* Fine Inner framing */}
            <div className="absolute top-2 left-2 right-2 bottom-2 border border-gold-300/30 rounded-lg pointer-events-none z-10" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2 rounded-full text-sage-600 hover:text-sage-800 hover:bg-sage-100/50 transition-colors cursor-pointer"
              aria-label="Close RSVP form"
              id="close-rsvp-btn"
            >
              <X className="w-5 h-5" />
            </button>

            {/* View 1: ALREADY SUBMITTED or SUCCESS */}
            {(isSubmitted || currentRSVP) ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-8 text-center flex flex-col items-center justify-center relative z-10 my-auto min-h-[400px]"
              >
                <div className="w-16 h-16 rounded-full bg-sage-50 border border-sage-200 flex items-center justify-center mb-6 text-sage-500 shadow-sm">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                
                <span className="text-[10px] tracking-[0.25em] uppercase text-gold-500 font-sans block mb-1">
                  Thank You
                </span>
                
                <h3 className="font-display text-2xl sm:text-3xl text-sage-700 italic font-medium">
                  {(isSubmitted ? (isAttending ? "We can't wait to celebrate!" : "You will be missed!") : "RSVP Already Registered")}
                </h3>
                
                <div className="w-16 h-[1px] bg-gold-400 my-4" />
                
                <p className="font-sans text-xs text-charcoal-700 max-w-xs leading-relaxed">
                  {(currentRSVP?.isAttending) 
                    ? `We have noted details under the name of "${currentRSVP.fullName}". Thank you for honoring us with your presence in Austin, Texas on September 24th!`
                    : `We are truly sorry that you won't be able to share our special day under the name "${currentRSVP?.fullName}". We carry you warm in our hearts.`
                  }
                </p>

                {currentRSVP?.isAttending && currentRSVP.diningPreference !== 'none' && (
                  <div className="mt-4 px-4 py-2 bg-sage-50 border border-sage-200/50 rounded-lg text-xs font-sans text-sage-700">
                    <span className="font-semibold block text-[10px] uppercase text-gold-500 tracking-wider">Lighter Gourmet Selection:</span>
                    {currentRSVP.diningPreference === 'beef' && "Dry-Aged Austin Angus Tenderloin"}
                    {currentRSVP.diningPreference === 'salmon' && "Citrus Grilled Herb King Salmon"}
                    {currentRSVP.diningPreference === 'vegan' && "Truffled Fall Sage Mushroom Gnocchi"}
                  </div>
                )}

                <div className="mt-8 flex gap-3">
                  <button
                    onClick={handleReset}
                    className="text-xs uppercase tracking-wider font-sans py-2 px-4 rounded border border-gold-300 text-gold-600 hover:bg-gold-50 transition-all cursor-pointer"
                  >
                    Change RSVP
                  </button>
                  <button
                    onClick={onClose}
                    className="text-xs uppercase tracking-wider font-sans py-2 px-5 rounded bg-sage-500 text-white hover:bg-sage-600 shadow-md transition-all cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </motion.div>
            ) : (
              /* View 2: THE FORM */
              <form onSubmit={handleSubmit} className="flex-1 flex flex-col overflow-hidden relative z-10">
                
                {/* Scrollable Form Header */}
                <div className="pt-8 pb-3 text-center px-6 border-b border-cream-200">
                  <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-gold-500 font-semibold mb-1">
                    Kindly RSVP Here
                  </p>
                  <h3 className="font-display text-2xl text-sage-700 font-medium italic">
                    Be Part of Our Day
                  </h3>
                  <div className="w-12 h-[1px] bg-gold-400 mx-auto mt-2" />
                </div>

                {/* Form Inputs Body */}
                <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 no-scrollbar text-charcoal-700">
                  
                  {/* Full Name */}
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] uppercase tracking-wider font-sans font-semibold text-sage-600">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Benedict Bridgerton"
                      className="w-full bg-white border border-neutral-200 rounded px-3 py-2 text-xs font-sans focus:outline-none focus:border-sage-500 transition-colors h-10 shadow-sm"
                      id="rsvp-fullname"
                    />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] uppercase tracking-wider font-sans font-semibold text-sage-600">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="benedict@bridgerton.com"
                      className="w-full bg-white border border-neutral-200 rounded px-3 py-2 text-xs font-sans focus:outline-none focus:border-sage-500 transition-colors h-10 shadow-sm"
                      id="rsvp-email"
                    />
                  </div>

                  {/* Attendance Selector Buttons */}
                  <div className="flex flex-col gap-1.5 pt-1">
                    <span className="text-[10px] uppercase tracking-wider font-sans font-semibold text-sage-600">
                      Will You Honor Us With Your Presence?
                    </span>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setIsAttending(true);
                          if (diningPreference === 'none') {
                            setDiningPreference('beef'); // Default to meat
                          }
                        }}
                        className={`py-3 px-4 border rounded text-center transition-all h-14 justify-center text-xs font-sans uppercase tracking-wider flex items-center gap-1.5 cursor-pointer ${
                          isAttending === true
                            ? 'bg-sage-500 border-sage-600 text-white shadow-md'
                            : 'bg-white border-neutral-200 text-sage-500 hover:border-sage-300'
                        }`}
                        id="rsvp-btn-yes"
                      >
                        <Heart className={`w-3.5 h-3.5 ${isAttending === true ? 'fill-white text-white' : ''}`} />
                        Gladly Accept
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsAttending(false);
                          setHasPlusOne(false);
                          setDiningPreference('none');
                        }}
                        className={`py-3 px-4 border rounded text-center transition-all h-14 justify-center text-xs font-sans uppercase tracking-wider flex items-center gap-1.5 cursor-pointer ${
                          isAttending === false
                            ? 'bg-sage-600 border-sage-700 text-white shadow-md'
                            : 'bg-white border-neutral-200 text-sage-500 hover:border-sage-300'
                        }`}
                        id="rsvp-btn-no"
                      >
                        Decline
                      </button>
                    </div>
                  </div>

                  {/* Conditional inputs if attending */}
                  <AnimatePresence>
                    {isAttending === true && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-4 overflow-hidden pt-1"
                      >
                        {/* Plus One Switch */}
                        <div className="flex items-center justify-between bg-cream-100 p-3 rounded-md border border-neutral-100 shadow-sm">
                          <div>
                            <span className="text-xs font-semibold text-sage-700 font-sans block">Request Plus One?</span>
                            <span className="text-[9px] text-sage-400 font-sans block">Bring a companion to share the joy</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => setHasPlusOne(!hasPlusOne)}
                            className={`w-11 h-6 rounded-full transition-colors relative flex items-center ${
                              hasPlusOne ? 'bg-sage-500 justify-end' : 'bg-neutral-300 justify-start'
                            }`}
                            id="rsvp-plusone-toggle"
                          >
                            <motion.span 
                              layout 
                              className="w-4 h-4 rounded-full bg-white mx-1 shadow"
                            />
                          </button>
                        </div>

                        {/* Plus One Name Input */}
                        {hasPlusOne && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex flex-col gap-1 pl-2 border-l-2 border-gold-300"
                          >
                            <label className="text-[10px] uppercase tracking-wider font-sans font-semibold text-sage-600">
                              Plus One Guest Name
                            </label>
                            <input
                              type="text"
                              required={hasPlusOne}
                              value={plusOneName}
                              onChange={(e) => setPlusOneName(e.target.value)}
                              placeholder="Sophie Beckett"
                              className="w-full bg-white border border-neutral-200 rounded px-3 py-2 text-xs font-sans focus:outline-none focus:border-sage-500 transition-colors h-10 shadow-sm"
                              id="rsvp-plusone-name"
                            />
                          </motion.div>
                        )}

                        {/* Dining Preference Radio Cards */}
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] uppercase tracking-wider font-sans font-semibold text-sage-600">
                            Gourmet Main-Course Selection
                          </label>
                          <div className="flex flex-col gap-2">
                            {/* Beef Option */}
                            <label className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-all ${
                              diningPreference === 'beef'
                                ? 'bg-cream-200 border-gold-400 shadow-sm scale-101'
                                : 'bg-white border-neutral-200'
                            }`}>
                              <div className="flex items-center gap-3">
                                <input
                                  type="radio"
                                  name="dining"
                                  checked={diningPreference === 'beef'}
                                  onChange={() => setDiningPreference('beef')}
                                  className="accent-sage-600 cursor-pointer"
                                  id="beef-radio"
                                />
                                <div className="text-left font-sans">
                                  <span className="text-xs font-semibold block text-charcoal-850">Dry-Aged Angus Steak</span>
                                  <span className="text-[9px] text-sage-400 block leading-none mt-0.5">Classic tenderloin, roasted autumn root vegetables, red wine reduction</span>
                                </div>
                              </div>
                            </label>

                            {/* Salmon Option */}
                            <label className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-all ${
                              diningPreference === 'salmon'
                                ? 'bg-cream-200 border-gold-400 shadow-sm scale-101'
                                : 'bg-white border-neutral-200'
                            }`}>
                              <div className="flex items-center gap-3">
                                <input
                                  type="radio"
                                  name="dining"
                                  checked={diningPreference === 'salmon'}
                                  onChange={() => setDiningPreference('salmon')}
                                  className="accent-sage-600 cursor-pointer"
                                  id="salmon-radio"
                                />
                                <div className="text-left font-sans">
                                  <span className="text-xs font-semibold block text-charcoal-850">Citrus Herb King Salmon</span>
                                  <span className="text-[9px] text-sage-400 block leading-none mt-0.5">Fresh glaze grilled salmon, asparagus spear bouquet, warm wild rice nest</span>
                                </div>
                              </div>
                            </label>

                            {/* Vegan Option */}
                            <label className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-all ${
                              diningPreference === 'vegan'
                                ? 'bg-cream-200 border-gold-400 shadow-sm scale-101'
                                : 'bg-white border-neutral-200'
                            }`}>
                              <div className="flex items-center gap-3">
                                <input
                                  type="radio"
                                  name="dining"
                                  checked={diningPreference === 'vegan'}
                                  onChange={() => setDiningPreference('vegan')}
                                  className="accent-sage-600 cursor-pointer"
                                  id="vegan-radio"
                                />
                                <div className="text-left font-sans">
                                  <span className="text-xs font-semibold block text-charcoal-850">Autumn Wild Mushroom Gnocchi</span>
                                  <span className="text-[9px] text-sage-400 block leading-none mt-0.5">Vegan artisanal gnocchi tossed with organic fresh sage and white truffles</span>
                                </div>
                              </div>
                            </label>
                          </div>
                        </div>

                        {/* Dietary Restrictions */}
                        <div className="flex flex-col gap-1">
                          <label className="text-[10px] uppercase tracking-wider font-sans font-semibold text-sage-600">
                            Dietary Restrictions or Food Allergies (If Any)
                          </label>
                          <input
                            type="text"
                            value={dietaryRestrictions}
                            onChange={(e) => setDietaryRestrictions(e.target.value)}
                            placeholder="Nut allergy, gluten sensitivity, etc."
                            className="w-full bg-white border border-neutral-200 rounded px-3 py-2 text-xs font-sans focus:outline-none focus:border-sage-500 transition-colors shadow-sm"
                            id="rsvp-dietary"
                          />
                        </div>

                        {/* Song Request */}
                        <div className="flex flex-col gap-1">
                          <label className="text-[10px] uppercase tracking-wider font-sans font-semibold text-sage-600">
                            What Song Will Get You On the Dance Floor?
                          </label>
                          <input
                            type="text"
                            value={songRequest}
                            onChange={(e) => setSongRequest(e.target.value)}
                            placeholder="L-O-V-E by Nat King Cole"
                            className="w-full bg-white border border-neutral-200 rounded px-3 py-2 text-xs font-sans focus:outline-none focus:border-sage-500 transition-colors shadow-sm"
                            id="rsvp-song"
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Message to the Couple */}
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] uppercase tracking-wider font-sans font-semibold text-sage-600">
                      Warm Message for Benedict & Sophie
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Send your blessings, love, or helpful travel details here..."
                      rows={3}
                      className="w-full bg-white border border-neutral-200 rounded px-3 py-2 text-xs font-sans focus:outline-none focus:border-sage-500 transition-colors resize-none shadow-sm"
                      id="rsvp-message"
                    />
                  </div>

                </div>

                {/* Form Footer Action Buttons */}
                <div className="p-4 bg-cream-100 border-t border-cream-200 flex gap-3 relative z-10">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 py-3 text-xs uppercase font-sans tracking-wider border border-sage-200 hover:bg-white text-sage-600 rounded transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isAttending === null}
                    className={`flex-1 py-3 text-xs uppercase font-sans tracking-wider rounded text-white font-medium flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer ${
                      isAttending === null
                        ? 'bg-neutral-300 border-neutral-400 cursor-not-allowed shadow-none'
                        : 'bg-sage-500 hover:bg-sage-600 hover:scale-101 active:scale-99'
                    }`}
                    id="submit-rsvp-btn"
                  >
                    <Sparkles className="w-3.5 h-3.5 fill-white-20" />
                    Submit RSVP
                  </button>
                </div>

              </form>
            )}

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
