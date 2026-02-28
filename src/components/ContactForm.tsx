import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function ContactForm() {
  const [form, setForm] = useState<FormData>({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill in all fields');
      return;
    }

    setSending(true);
    try {
      const res = await fetch('http://localhost:3001/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error('Failed to send');

      setSent(true);
      setForm({ name: '', email: '', message: '' });
      toast.success('Message sent successfully!');
    } catch {
      toast.error('Failed to send. Try emailing me directly!');
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass rounded-2xl p-10 text-center"
      >
        <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
        <h3 className="font-display text-xl font-semibold text-surface-800 dark:text-white mb-2">
          Message Sent!
        </h3>
        <p className="text-surface-500 dark:text-surface-400 mb-6">
          Thank you for reaching out. I'll get back to you soon.
        </p>
        <button
          onClick={() => setSent(false)}
          className="text-primary-600 dark:text-primary-400 font-medium hover:underline"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-6">
      {/* Name */}
      <div className="relative">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder=" "
          className="peer w-full px-4 py-3 bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl text-surface-800 dark:text-white placeholder-transparent focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all"
          required
        />
        <label className="absolute left-4 -top-2.5 text-xs font-medium text-surface-500 dark:text-surface-400 bg-white dark:bg-surface-800 px-1 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-surface-400 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-primary-600 dark:peer-focus:text-primary-400">
          Name
        </label>
      </div>

      {/* Email */}
      <div className="relative">
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder=" "
          className="peer w-full px-4 py-3 bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl text-surface-800 dark:text-white placeholder-transparent focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all"
          required
        />
        <label className="absolute left-4 -top-2.5 text-xs font-medium text-surface-500 dark:text-surface-400 bg-white dark:bg-surface-800 px-1 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-surface-400 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-primary-600 dark:peer-focus:text-primary-400">
          Email
        </label>
      </div>

      {/* Message */}
      <div className="relative">
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder=" "
          rows={5}
          className="peer w-full px-4 py-3 bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl text-surface-800 dark:text-white placeholder-transparent focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all resize-none"
          required
        />
        <label className="absolute left-4 -top-2.5 text-xs font-medium text-surface-500 dark:text-surface-400 bg-white dark:bg-surface-800 px-1 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-surface-400 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-primary-600 dark:peer-focus:text-primary-400">
          Message
        </label>
      </div>

      {/* Submit */}
      <motion.button
        type="submit"
        disabled={sending}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white px-6 py-3.5 rounded-xl font-medium shadow-glow hover:shadow-glow-lg transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed shimmer-btn"
      >
        {sending ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send size={18} />
            Send Message
          </>
        )}
      </motion.button>
    </form>
  );
}
