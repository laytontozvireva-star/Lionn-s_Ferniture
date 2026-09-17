import React, { useEffect } from 'react';
import { CheckCircle2, Info, X } from 'lucide-react';

export default function Toast({ message, isVisible, onClose, type = 'success' }) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const isSuccess = type === 'success';

  return (
    <div
      className={`fixed bottom-4 right-4 flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg text-white transform transition-all duration-300 z-50 animate-in slide-in-from-bottom-5 fade-in ${
        isSuccess ? 'bg-green-600' : 'bg-[#b38947]'
      }`}
    >
      {isSuccess ? <CheckCircle2 size={20} /> : <Info size={20} />}
      <span className="text-sm font-medium">{message}</span>
      <button onClick={onClose} className="ml-2 hover:opacity-75 transition-opacity">
        <X size={16} />
      </button>
    </div>
  );
}
