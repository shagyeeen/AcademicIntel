"use client";

import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { GlassCard } from '@/components/ui/GlassCard';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, 
  Send, 
  UserCircle, 
  Sparkles, 
  ShieldCheck, 
  MessageCircle, 
  TrendingUp, 
  AlertCircle,
  Clock,
  ThumbsUp,
  BrainCircuit
} from 'lucide-react';

interface Doubt {
  id: number;
  content: string;
  category: string;
  timestamp: string;
  replies: number;
  votes: number;
  aiStatus: 'Moderated' | 'Insight Attached' | 'Analyzing';
}

const initialDoubts: Doubt[] = [
  { 
    id: 1, 
    content: "Can someone explain the difference between Llama 3 and Llama 3.2 vision architectures in simple terms?", 
    category: "AI Systems", 
    timestamp: "2h ago", 
    replies: 5, 
    votes: 12,
    aiStatus: 'Insight Attached'
  },
  { 
    id: 2, 
    content: "When is the deadline for the neural network backpropagation project? The portal says Monday but syllabus says Wednesday.", 
    category: "Logistics", 
    timestamp: "4h ago", 
    replies: 2, 
    votes: 8,
    aiStatus: 'Moderated'
  }
];

export default function DoubtExchange() {
  const [doubts, setDoubts] = useState<Doubt[]>(initialDoubts);
  const [newDoubt, setNewDoubt] = useState('');
  const [isPosting, setIsPosting] = useState(false);

  const handlePostDoubt = () => {
    if (!newDoubt.trim()) return;
    setIsPosting(true);
    
    // Simulate AI Moderation
    setTimeout(() => {
      const doubt: Doubt = {
        id: doubts.length + 1,
        content: newDoubt,
        category: "General",
        timestamp: "Just now",
        replies: 0,
        votes: 0,
        aiStatus: 'Analyzing'
      };
      setDoubts([doubt, ...doubts]);
      setNewDoubt('');
      setIsPosting(false);
      
      // Update status to 'Moderated' after 2 seconds
      setTimeout(() => {
        setDoubts(prev => prev.map(d => d.id === doubt.id ? { ...d, aiStatus: 'Moderated' } : d));
      }, 2000);
    }, 1000);
  };

  return (
    <DashboardLayout role="student">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-pink-500 font-bold text-xs uppercase tracking-widest mb-2">
              <ShieldCheck size={14} /> Anonymous Neural Network
            </div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight">Doubt Exchange</h1>
            <p className="text-gray-500 mt-1">Collab with peers without revealing your identity. AI moderated for clarity.</p>
          </div>
          <div className="flex gap-2">
            <div className="px-4 py-2 bg-pink-50 rounded-2xl border border-pink-100 flex items-center gap-2">
              <TrendingUp size={16} className="text-pink-500" />
              <span className="text-xs font-bold text-pink-700 uppercase">98% Resolved</span>
            </div>
          </div>
        </div>

        {/* Post Doubt Form */}
        <GlassCard className="p-1 border-4 border-white">
          <div className="bg-gray-50/50 rounded-[28px] p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-gray-400">
                <UserCircle size={24} />
              </div>
              <div className="flex-1 space-y-4">
                <textarea 
                  value={newDoubt}
                  onChange={(e) => setNewDoubt(e.target.value)}
                  placeholder="Drop your anonymous question here..."
                  className="w-full bg-transparent border-none text-gray-800 placeholder-gray-400 focus:ring-0 text-lg font-medium resize-none h-24"
                />
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex gap-2 text-[10px] uppercase font-bold text-gray-400">
                    <span className="px-3 py-1 bg-white rounded-lg border border-gray-100">Next.js</span>
                    <span className="px-3 py-1 bg-white rounded-lg border border-gray-100">AI Architecture</span>
                  </div>
                  <button 
                    onClick={handlePostDoubt}
                    disabled={isPosting || !newDoubt.trim()}
                    className={`px-6 py-2 rounded-xl flex items-center gap-2 transition-all ${
                      isPosting || !newDoubt.trim() 
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                      : 'bg-pink-500 text-white shadow-lg shadow-pink-200 hover:scale-105 active:scale-95'
                    }`}
                  >
                    {isPosting ? 'Analyzing...' : <>Post Anonymously <Send size={14} /></>}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Doubts Feed */}
        <div className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <h3 className="font-black text-gray-900 uppercase tracking-tighter text-xl">Recent Intelligence Gaps</h3>
            <div className="flex items-center gap-4 text-xs font-bold text-gray-400">
              <span className="text-pink-500 cursor-pointer">All Doubts</span>
              <span className="cursor-pointer hover:text-gray-800 transition-colors">My Posts</span>
              <span className="cursor-pointer hover:text-gray-800 transition-colors">Unanswered</span>
            </div>
          </div>

          <AnimatePresence mode="popLayout">
            {doubts.map((doubt, idx) => (
              <motion.div
                key={doubt.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                layout
              >
                <GlassCard className="group hover:border-pink-200 transition-all">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Votes Sidebar */}
                    <div className="flex md:flex-col items-center justify-center gap-2 bg-gray-50 p-3 rounded-2xl border border-gray-100 md:w-16">
                      <button className="p-1 hover:text-pink-500 transition-colors"><ThumbsUp size={18} /></button>
                      <span className="text-lg font-black text-gray-800">{doubt.votes}</span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 bg-gray-100 rounded text-gray-500">{doubt.category}</span>
                          <span className="text-[10px] font-bold text-gray-400 flex items-center gap-1">
                            <Clock size={10} /> {doubt.timestamp}
                          </span>
                        </div>
                        
                        {/* AI Status Tag */}
                        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter ${
                          doubt.aiStatus === 'Insight Attached' 
                          ? 'bg-purple-50 text-purple-600 border border-purple-100'
                          : doubt.aiStatus === 'Analyzing'
                          ? 'bg-blue-50 text-blue-600 border border-blue-100 animate-pulse'
                          : 'bg-green-50 text-green-600 border border-green-100'
                        }`}>
                          {doubt.aiStatus === 'Insight Attached' ? <Sparkles size={10} /> : 
                           doubt.aiStatus === 'Analyzing' ? <BrainCircuit size={10} className="animate-spin" /> : 
                           <ShieldCheck size={10} />}
                          {doubt.aiStatus}
                        </div>
                      </div>

                      <p className="text-gray-800 font-semibold leading-relaxed group-hover:text-pink-600 transition-colors">
                        {doubt.content}
                      </p>

                      <div className="flex items-center gap-6 pt-4 border-t border-gray-50">
                        <div className="flex items-center gap-2 text-gray-400 hover:text-pink-500 cursor-pointer transition-colors">
                          <MessageCircle size={16} />
                          <span className="text-xs font-bold">{doubt.replies} Replies</span>
                        </div>
                        {doubt.aiStatus === 'Insight Attached' && (
                          <div className="flex items-center gap-2 text-purple-500 cursor-pointer group/insight">
                            <BrainCircuit size={16} className="group-hover/insight:scale-110 transition-transform" />
                            <span className="text-xs font-bold">1 AI Breakdown available</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Sidebar Mini-Intel */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="p-6 bg-gray-900 rounded-[32px] text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/20 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-pink-500/30 transition-all duration-700" />
              <div className="flex items-center gap-3 mb-4">
                 <div className="w-10 h-10 rounded-xl bg-pink-500 flex items-center justify-center">
                    <Sparkles size={20} />
                 </div>
                 <h4 className="font-black text-lg">AI Bounty Program</h4>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed mb-6 font-medium">
                Answer "Verified" doubts to earn **Academic Credits**. AI validates the accuracy of your logic in real-time.
              </p>
              <button className="w-full py-3 bg-white text-gray-900 rounded-2xl text-xs font-bold hover:shadow-xl transition-all uppercase tracking-widest">
                Browse Bounty Doubts
              </button>
           </div>

           <div className="p-6 bg-pink-50 rounded-[32px] border border-pink-100 flex flex-col justify-center">
              <div className="flex items-center gap-4 mb-4">
                 <div className="w-10 h-10 rounded-xl bg-pink-500/10 flex items-center justify-center text-pink-500">
                    <MessageSquare size={20} />
                 </div>
                 <div>
                    <h4 className="font-black text-gray-800">Exchange Impact</h4>
                    <p className="text-[10px] font-bold text-pink-500 uppercase tracking-widest">Global Stats</p>
                 </div>
              </div>
              <div className="flex items-end gap-2">
                 <span className="text-4xl font-black text-gray-900 tracking-tighter">1.4k</span>
                 <span className="text-xs font-bold text-green-500 mb-2">+12% this week</span>
              </div>
              <p className="text-[10px] font-bold text-gray-400 uppercase mt-4">Questions resolved by the collective intelligence.</p>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
