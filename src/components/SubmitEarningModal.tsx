import React, { useState } from 'react';
import { X, Upload, CheckCircle, ShieldCheck, Zap, Flame, IndianRupee, FileCheck } from 'lucide-react';
import { Category } from '../types';
import { formatINR } from '../utils/formatters';

interface SubmitEarningModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess: (amount: number, category: Category, title: string) => void;
}

export const SubmitEarningModal: React.FC<SubmitEarningModalProps> = ({
  isOpen,
  onClose,
  onSubmitSuccess,
}) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<Category>('freelancing');
  const [title, setTitle] = useState('');
  const [clientName, setClientName] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [fileName, setFileName] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseInt(amount.replace(/[^0-9]/g, ''), 10);
    if (!numAmount || numAmount <= 0) return;

    setSubmitted(true);
    setTimeout(() => {
      onSubmitSuccess(numAmount, category, title || 'Client Project Deliverable');
      setSubmitted(false);
      setAmount('');
      setTitle('');
      setClientName('');
      setTransactionId('');
      setFileName(null);
      onClose();
    }, 1500);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl bg-[#111111] border border-neutral-800 p-6 sm:p-8 shadow-2xl space-y-6 max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#BEFF00]/10 border border-[#BEFF00]/30 text-[#BEFF00] text-xs font-mono font-bold">
            <Zap className="w-3.5 h-3.5 fill-[#BEFF00]" />
            EARNING PROOF SUBMISSION
          </div>
          <h3 className="text-2xl sm:text-3xl font-heading font-black uppercase text-white tracking-wide">
            Log New Verified Income
          </h3>
          <p className="text-xs sm:text-sm text-neutral-400">
            Every ₹ you earn moves you up the ranks. Invoices and receipts are verified in under 4 hours.
          </p>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-3 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-[#BEFF00]/20 border-2 border-[#BEFF00] flex items-center justify-center mx-auto text-black">
              <CheckCircle className="w-8 h-8 text-[#BEFF00]" />
            </div>
            <div className="font-heading text-2xl font-black uppercase text-white">
              Income Submitted!
            </div>
            <p className="text-sm text-neutral-300 max-w-sm mx-auto">
              Your proof is in the rapid verification queue. Your position will climb automatically once verified!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Amount in INR */}
            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase font-bold text-neutral-300">
                Income Earned (₹ INR) *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none font-mono text-lg font-black text-[#BEFF00]">
                  ₹
                </div>
                <input
                  type="number"
                  min="50"
                  max="1000000"
                  required
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="e.g. 2500"
                  className="w-full pl-9 pr-4 py-3 bg-[#161616] border border-neutral-800 rounded-xl text-lg font-mono font-black text-white placeholder-neutral-600 focus:outline-none focus:border-[#BEFF00]"
                />
              </div>
            </div>

            {/* Hustle Category */}
            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase font-bold text-neutral-300">
                Hustle Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
                className="w-full px-4 py-2.5 bg-[#161616] border border-neutral-800 rounded-xl text-sm text-white font-semibold focus:outline-none focus:border-[#BEFF00]"
              >
                <option value="freelancing">Freelancing (Design, Web, Copy)</option>
                <option value="building">Building (Coding, Micro-SaaS, Bots)</option>
                <option value="content">Content (Video Editing, YouTube, Thumbnails)</option>
                <option value="tutoring">Tutoring (Math, Coding, JEE)</option>
                <option value="selling">Selling (Merch, Crafts, Thrift)</option>
                <option value="other">Other Hustle</option>
              </select>
            </div>

            {/* Hustle Description */}
            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase font-bold text-neutral-300">
                What did you do? *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Designed landing page for startup"
                className="w-full px-4 py-2.5 bg-[#161616] border border-neutral-800 rounded-xl text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-[#BEFF00]"
              />
            </div>

            {/* UPI or Transaction Reference */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="block text-xs font-mono uppercase font-bold text-neutral-300">
                  Client / Buyer Name
                </label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="e.g. NovaTech Labs"
                  className="w-full px-3.5 py-2 bg-[#161616] border border-neutral-800 rounded-xl text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-[#BEFF00]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-mono uppercase font-bold text-neutral-300">
                  UPI / Ref ID (Optional)
                </label>
                <input
                  type="text"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  placeholder="e.g. UPI-984210"
                  className="w-full px-3.5 py-2 bg-[#161616] border border-neutral-800 rounded-xl text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-[#BEFF00]"
                />
              </div>
            </div>

            {/* File Upload Drop Area */}
            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase font-bold text-neutral-300">
                Upload Payment Screenshot or Invoice
              </label>
              <label className="border-2 border-dashed border-neutral-800 hover:border-[#BEFF00]/60 rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer transition-colors bg-[#0A0A0A]">
                <Upload className="w-6 h-6 text-[#BEFF00] mb-1" />
                <span className="text-xs text-neutral-300 font-semibold">
                  {fileName ? fileName : 'Click to select payment proof (JPG, PNG, PDF)'}
                </span>
                <span className="text-[10px] text-neutral-500 mt-0.5">
                  Screenshots of UPI receipts, client payments, or platform invoices
                </span>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#BEFF00] hover:bg-[#a6e000] text-black font-extrabold text-sm tracking-tight transition-all shadow-[0_0_20px_rgba(190,255,0,0.25)] flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4 fill-black" />
              <span>Submit & Enter Verification Queue</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
