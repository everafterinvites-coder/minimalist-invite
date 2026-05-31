import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface RSVPModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RSVPModal({ isOpen, onClose }: RSVPModalProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [isAttending, setIsAttending] = useState<boolean | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyLqIFhvLM8H70_FLXukLmSrcMlRRr2DkOjA13m1Kb0cRZVuiRgGX3yNIc4mrQVfei9Aw/exec';

    const rsvpData = { fullName, email, isAttending, submittedAt: new Date().toISOString() };

    try {
      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rsvpData)
      });
      alert("RSVP Submitted!");
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/50" />
          <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md relative z-10">
            <button onClick={onClose} className="absolute top-4 right-4"><X /></button>
            <h2 className="text-2xl font-bold mb-4">RSVP</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input type="text" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} className="border p-2 rounded" required />
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="border p-2 rounded" required />
              <select onChange={(e) => setIsAttending(e.target.value === 'yes')} className="border p-2 rounded" required>
                <option value="">Will you attend?</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
              <button type="submit" className="bg-gold-500 text-white p-2 rounded">Submit RSVP</button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
