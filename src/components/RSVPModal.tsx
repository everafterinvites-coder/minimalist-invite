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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || isAttending === null) return;

    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyLqIFhvLM8H70_FLXukLmSrcMlRRr2DkOjA13m1Kb0cRZVuiRgGX3yNIc4mrQVfei9Aw/exec';

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

    try {
      // Connect to Google Sheets
      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rsvpData)
      });

      localStorage.setItem('wedding_rsvp', JSON.stringify(rsvpData));
      setCurrentRSVP(rsvpData);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting to Google Sheets:", error);
      alert("There was an error submitting your RSVP. Please try again.");
    }
  };

  const handleReset = () => {
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#1c221b]/70 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="relative bg-cream-50 w-full max-w-lg rounded-xl shadow-2xl flex flex-col overflow-hidden max-h-[85vh] border border-gold-300"
          >
            {/* Modal content remains identical to your original design... */}
            {/* (Keep your existing return JSX here for the Form and Success views) */}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
