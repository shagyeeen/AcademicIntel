"use client";

import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { GlassCard } from '@/components/ui/GlassCard';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, 
  Search,
  Filter,
  Brain,
  AlertCircle,
  TrendingUp,
  Flame,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  ShieldAlert
} from 'lucide-react';

interface HotTopic {
  id: number;
  label: string;
  count: number;
  trend: 'up' | 'down' | 'stable';
}

const hotTopics: HotTopic[] = [
  { id: 1, label: "Llama 3.2 Vision", count: 42, trend: 'up' },
  { id: 2, label: "Backpropagation Logic", count: 28, trend: 'up' },
  { id: 3, label: "Assignment #4 Deadline", count: 18, trend: 'stable' },
  { id: 4, label: "GPU Resource Allocation", count: 12, trend: 'down' },
];

export default function DoubtsMonitoring() {
  const [filter, setFilter] = useState<'All' | 'Unresolved' | 'Hot'>('All');
  const [reports, setReports] = useState([
    { id: 1, studentId: 'STU-ANON_832', time: '45m ago', urgency: 'High', text: "The mathematical proof for the chain rule in backpropagation is causing widespread confusion. Can we get a visual breakdown?", verified: false, hot: true, unresolved: true },
    { id: 2, studentId: 'STU-ANON_512', time: '1h ago', urgency: 'Medium', text: "Are we expected to use vanilla PyTorch or can we use Lightning for the upcoming project?", verified: false, hot: false, unresolved: true },
    { id: 3, studentId: 'STU-ANON_122', time: '2h ago', urgency: 'High', text: "The server resource limits are too tight for our local LLM testing. Can we request an increase?", verified: false, hot: false, unresolved: true },
  ]);

  const toggleVerified = (id: number) => {
    setReports(prev => prev.map(r => r.id === id ? { ...r, verified: !r.verified } : r));
  };

  const toggleHot = (id: number) => {
    setReports(prev => prev.map(r => r.id === id ? { ...r, hot: !r.hot } : r));
  };

  const markResolved = (id: number) => {
    setReports(prev => prev.map(r => r.id === id ? { ...r, unresolved: false } : r));
    alert("Response submitted and report archived.");
  };

  const filteredReports = reports.filter(r => {
    if (filter === 'All') return true;
    if (filter === 'Unresolved') return r.unresolved;
    if (filter === 'Hot') return r.hot;
    return true;
  });

  return (
    <DashboardLayout role="teacher">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-pink-500 font-bold text-xs uppercase tracking-widest mb-2">
              <Brain size={14} /> Intel Insight Radar
            </div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight">Doubts Monitoring</h1>
            <p className="text-gray-500 mt-1">AI-categorized student bottlenecks and recursive questions.</p>
          </div>
          
          <div className="flex items-center gap-3">
             <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input 
                  type="text" 
                  placeholder="Scan specific doubts..." 
                  className="bg-white border border-gray-100 rounded-2xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-100 w-64 shadow-sm"
                />
             </div>
             <button className="p-2.5 bg-white border border-gray-100 rounded-2xl hover:bg-gray-50 transition-all shadow-sm">
                <Filter size={18} className="text-gray-600" />
             </button>
          </div>
        </div>

        {/* Global Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <GlassCard className="p-6 border-l-4 border-l-pink-500">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Active Bottlenecks</p>
              <div className="flex items-end justify-between">
                 <span className="text-4xl font-black text-gray-900">24</span>
                 <div className="flex items-center gap-1 text-red-500 text-[10px] font-bold pb-1.5">
                    <TrendingUp size={12} /> +4 today
                 </div>
              </div>
              <p className="text-[10px] text-gray-500 mt-2 font-medium italic">Most bottlenecks are in **Module 4: Neural Architecture**.</p>
           </GlassCard>

           <GlassCard className="p-6 border-l-4 border-l-purple-500">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Resolution Speed</p>
              <div className="flex items-end justify-between">
                 <span className="text-4xl font-black text-gray-900">1.8h</span>
                 <div className="flex items-center gap-1 text-green-500 text-[10px] font-bold pb-1.5">
                    <CheckCircle2 size={12} /> 12% faster
                 </div>
              </div>
              <p className="text-[10px] text-gray-500 mt-2 font-medium">AI Peer Assistance handles 65% of initial triage.</p>
           </GlassCard>

           <GlassCard className="p-6 border-l-4 border-l-blue-500 bg-gray-900 text-white">
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Hot Topic Pulse</p>
              <div className="flex items-center gap-3">
                 <Flame className="text-orange-500 animate-pulse" />
                 <span className="text-xl font-black">Backpropagation Logic</span>
              </div>
              <p className="text-[10px] text-gray-400 mt-2 font-medium">12 new doubts in the last hour. Recommend an emergency sync?</p>
           </GlassCard>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
           {/* Doubts Management */}
           <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center justify-between px-2">
                 <h3 className="font-black text-gray-900 uppercase tracking-tighter text-xl">Pending Intelligence Reports</h3>
                 <div className="flex gap-2">
                    {['All', 'Unresolved', 'Hot'].map((f) => (
                      <button 
                        key={f}
                        onClick={() => setFilter(f as any)}
                        className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                          filter === f 
                          ? 'bg-pink-500 text-white shadow-lg' 
                          : 'bg-white text-gray-500 border border-gray-100 hover:border-pink-200'
                        }`}
                      >
                        {f}
                      </button>
                    ))}
                 </div>
              </div>

              <div className="space-y-4">
                 {filteredReports.map((report) => (
                   <motion.div
                     key={report.id}
                     initial={{ opacity: 0, x: -20 }}
                     animate={{ opacity: 1, x: 0 }}
                     layout
                   >
                     <GlassCard className={`group hover:bg-white/60 transition-all border-l-2 ${report.verified ? 'border-l-green-500' : 'border-transparent hover:border-l-pink-500'}`}>
                        <div className="flex gap-6">
                           <div className={`w-12 h-12 rounded-2xl ${report.verified ? 'bg-green-50 text-green-500' : 'bg-pink-50 text-pink-500'} flex-shrink-0 flex items-center justify-center`}>
                              {report.verified ? <CheckCircle2 size={20} /> : <MessageSquare size={20} />}
                           </div>
                           <div className="flex-1 space-y-2">
                              <div className="flex items-center justify-between">
                                 <div className="flex items-center gap-3">
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{report.studentId}</span>
                                    <span className="text-[10px] font-bold text-gray-300 italic">{report.time}</span>
                                 </div>
                                 <div className="flex items-center gap-2">
                                    {report.unresolved && <div className="px-2 py-0.5 bg-red-50 text-red-500 rounded text-[9px] font-black uppercase">{report.urgency} Urgency</div>}
                                    {report.hot && <Flame size={14} className="text-orange-500 animate-pulse" />}
                                    {!report.unresolved && <div className="px-2 py-0.5 bg-green-50 text-green-500 rounded text-[9px] font-black uppercase">Resolved</div>}
                                    <ShieldAlert size={14} className="text-orange-400" />
                                 </div>
                              </div>
                              <p className={`text-gray-800 font-bold leading-relaxed ${!report.unresolved ? 'line-through opacity-50' : ''}`}>
                                 {report.text}
                              </p>
                              <div className="flex items-center gap-4 pt-3 uppercase tracking-tighter text-[9px] font-black">
                                 <button 
                                   onClick={() => toggleVerified(report.id)}
                                   className={`${report.verified ? 'text-green-600' : 'text-pink-500'} hover:underline font-black`}
                                 >
                                    {report.verified ? 'Verified ✓' : 'Mark as Verified'}
                                 </button>
                                 <button 
                                   onClick={() => toggleHot(report.id)}
                                   className={`${report.hot ? 'text-orange-500' : 'text-gray-400'} hover:text-gray-600`}
                                 >
                                    {report.hot ? 'Trending Item' : 'Tag as Hot Topic'}
                                 </button>
                                 <button 
                                   onClick={() => markResolved(report.id)}
                                   className="text-blue-500 flex items-center gap-1 ml-auto hover:bg-blue-50 px-2 py-1 rounded-lg transition-all"
                                 >
                                    Provide Final Answer <ArrowUpRight size={10} />
                                 </button>
                              </div>
                           </div>
                        </div>
                     </GlassCard>
                   </motion.div>
                 ))}
              </div>
           </div>

           {/* Trends Sidebar */}
           <div className="lg:col-span-4 space-y-8">
              <div className="p-8 bg-white rounded-[40px] border border-gray-100 shadow-xl relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-pink-50 rounded-full blur-3xl -mr-16 -mt-16" />
                 <h4 className="font-black text-gray-900 uppercase tracking-tighter text-lg mb-6 flex items-center gap-2">
                    <TrendingUp size={20} className="text-pink-500" /> Real-time Hot Topics
                 </h4>
                 <div className="space-y-6">
                    {hotTopics.map((topic) => (
                       <div key={topic.id} className="flex items-center justify-between group cursor-pointer">
                          <div className="space-y-1">
                             <p className="font-bold text-gray-800 group-hover:text-pink-600 transition-colors">{topic.label}</p>
                             <div className="flex items-center gap-1.5">
                                <span className="text-[10px] font-black text-gray-400 uppercase underline decoration-pink-500/20">{topic.count} Queries</span>
                                {topic.trend === 'up' && <ArrowUpRight size={12} className="text-red-500" />}
                             </div>
                          </div>
                          <div className={`w-2 h-2 rounded-full ${topic.trend === 'up' ? 'bg-red-500 animate-pulse' : 'bg-gray-200'}`} />
                       </div>
                    ))}
                 </div>
                 <button className="w-full mt-8 py-4 bg-gray-900 text-white rounded-[24px] text-xs font-black uppercase tracking-widest hover:shadow-2xl transition-all active:scale-95">
                    Generate Hot Topic Report
                 </button>
              </div>

              <div className="p-8 bg-pink-500 rounded-[40px] text-white space-y-4">
                 <div className="flex items-center gap-3">
                    <Brain className="w-8 h-8 opacity-50" />
                    <h4 className="font-black text-xl leading-tight">AI Teaching Assistant</h4>
                 </div>
                 <p className="text-xs text-pink-50 font-medium leading-relaxed">
                    "I have identified a pattern of 15 students struggling with **Chain Rule Proof**. I suggest creating a 5-minute Loom video and tagging it as an **Expert Anchor**."
                 </p>
                 <button className="w-full py-3 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">
                    Approve AI Recommendation
                 </button>
              </div>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
