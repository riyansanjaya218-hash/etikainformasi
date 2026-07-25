import React, { useState } from 'react';
import { Sparkles, X, Send, Bot, User, Loader2 } from 'lucide-react';

interface AiTutorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const AiTutorModal: React.FC<AiTutorModalProps> = ({ isOpen, onClose }) => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Halo! Saya Asisten Literasi Digital AI 🎓. Ada yang bisa saya bantu terkait Etika Informasi, verifikasi hoaks SIFT, privasi data, atau etika penggunaan AI dalam tugas akademik?'
    }
  ]);

  if (!isOpen) return null;

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userText = input.trim();
    setInput('');
    const newMessages: Message[] = [...messages, { role: 'user', content: userText }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText, history: newMessages })
      });

      const data = await res.json();
      if (res.ok && data.text) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.text }]);
      } else {
        setMessages(prev => [
          ...prev,
          { 
            role: 'assistant', 
            content: 'Maaf, Asisten AI sedang dalam pemeliharaan. Namun sebagai panduan etis: Selalu gunakan metode SIFT (Stop, Investigate, Find better coverage, Trace claims) sebelum membagikan informasi!' 
          }
        ]);
      }
    } catch (err) {
      setMessages(prev => [
        ...prev,
        { 
          role: 'assistant', 
          content: 'Terjadi masalah jaringan. Ingatlah untuk selalu memverifikasi informasi melalui situs resmi seperti Mafindo (turnbackhoax.id) atau Kominfo.' 
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-stone-900/70 backdrop-blur-xs z-50 flex items-center justify-center p-4 font-sans">
      <div className="bg-[#F9F7F2] dark:bg-[#1A1A18] w-full max-w-lg h-[540px] border border-stone-300 dark:border-stone-800 shadow-2xl flex flex-col overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-4 bg-[#1A1A1A] text-white flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-amber-600 text-white">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-sm leading-tight text-stone-100">Asisten Literasi AI Digital</h3>
              <p className="text-[10px] uppercase tracking-widest text-amber-300 font-bold">Pembimbing Etika & Cek Fakta Digital</p>
            </div>
          </div>

          <button onClick={onClose} className="p-1 text-stone-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages Body */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#E9E4DB] dark:bg-[#22211F] text-xs">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && (
                <div className="w-7 h-7 bg-[#1A1A1A] text-white flex items-center justify-center shrink-0 text-xs font-bold border border-stone-800">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[80%] p-3 leading-relaxed font-sans ${
                  msg.role === 'user'
                    ? 'bg-[#1A1A1A] text-stone-100'
                    : 'bg-[#F9F7F2] dark:bg-stone-900 text-stone-900 dark:text-stone-100 border border-stone-300 dark:border-stone-800'
                }`}
              >
                {msg.content}
              </div>

              {msg.role === 'user' && (
                <div className="w-7 h-7 bg-amber-700 text-white flex items-center justify-center shrink-0 text-xs font-bold border border-amber-800">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-stone-600 dark:text-stone-400 italic text-xs pl-9 font-serif">
              <Loader2 className="w-4 h-4 animate-spin text-amber-700" />
              <span>Sedang menganalisis & menyusun penjelasan etis...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="p-3 bg-[#F9F7F2] dark:bg-[#1A1A18] border-t border-stone-300 dark:border-stone-800 flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Tanyakan topik etika atau tempel berita untuk dicermati..."
            className="flex-1 px-3.5 py-2.5 bg-stone-100 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-stone-900"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="p-2.5 bg-[#1A1A1A] hover:bg-stone-800 disabled:opacity-50 text-white transition-colors border border-stone-800"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
};
