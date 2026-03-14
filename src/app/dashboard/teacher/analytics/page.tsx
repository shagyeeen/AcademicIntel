"use client";

import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { GlassCard } from '@/components/ui/GlassCard';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Target, 
  Brain, 
  Zap, 
  Clock, 
  ChevronRight,
  Filter,
  Download,
  Calendar,
  Layers,
  Sparkles
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie
} from 'recharts';

const focusData = [
  { time: '09:00', focus: 85, distraction: 15 },
  { time: '09:15', focus: 92, distraction: 8 },
  { time: '09:30', focus: 88, distraction: 12 },
  { time: '09:45', focus: 75, distraction: 25 },
  { time: '10:00', focus: 65, distraction: 35 },
  { time: '10:15', focus: 80, distraction: 20 },
  { time: '10:30', focus: 95, distraction: 5 },
];

const topicRetention = [
  { name: 'Gradient Descent', score: 88 },
  { name: 'Activation Functions', score: 72 },
  { name: 'Bias-Variance', score: 65 },
  { name: 'Backprop Logic', score: 45 },
  { name: 'RNN Architectures', score: 92 },
];

const COLORS = ['#ec4899', '#8b5cf6', '#3b82f6', '#10b981', '#f59e0b'];

export default function ClassAnalytics() {
  const [activeTab, setActiveTab] = useState('performance');

  return (
    <DashboardLayout role="teacher">
      <style jsx global>{`
        @media print {
          aside, header, .no-print, button {
            display: none !important;
          }
          main {
             margin-left: 0 !important;
             padding: 0 !important;
          }
          .GlassCard {
            box-shadow: none !important;
            border: 1px solid #eee !important;
            break-inside: avoid;
          }
          body {
            background: white !important;
          }
        }
      `}</style>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header section with high-tech vibe */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-pink-500 font-black text-xs uppercase tracking-[0.2em] mb-2">
              <Sparkles size={14} className="animate-pulse" /> Neural Intelligence HUB
            </div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight">Class Intelligence Reports</h1>
            <p className="text-gray-500 mt-2 font-medium">Decoding student neural engagement and curriculum efficiency.</p>
          </div>
          
          <div className="flex items-center gap-3">
             <div className="p-3 bg-white border border-gray-100 rounded-2xl shadow-sm flex items-center gap-3 cursor-pointer hover:bg-gray-50 transition-all no-print">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-xs font-bold text-gray-600 uppercase tracking-tighter">Last 7 Days</span>
             </div>
             <button 
               onClick={() => window.print()}
               className="p-3 bg-gray-900 text-white rounded-2xl shadow-xl flex items-center gap-2 hover:bg-black transition-all active:scale-95 no-print"
             >
                <Download className="w-4 h-4" /> <span className="text-xs font-bold uppercase tracking-widest px-2">Export PDF</span>
             </button>
          </div>
        </div>

        {/* Top Level Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
           <GlassCard className="p-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-5 bg-pink-500 rounded-bl-full group-hover:scale-150 transition-transform duration-700" />
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Focus Index</p>
              <div className="flex items-baseline gap-2">
                 <span className="text-4xl font-black text-gray-900 leading-none">82%</span>
                 <span className="text-[10px] font-bold text-green-500 flex items-center gap-1">
                    <TrendingUp size={12} /> +5.2%
                 </span>
              </div>
              <p className="text-[10px] text-gray-400 mt-3 font-medium">Optimal range maintained for 42m</p>
           </GlassCard>

           <GlassCard className="p-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-5 bg-purple-500 rounded-bl-full group-hover:scale-150 transition-transform duration-700" />
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Knowledge Pulse</p>
              <div className="flex items-baseline gap-2">
                 <span className="text-4xl font-black text-gray-900 leading-none">68</span>
                 <span className="text-xs font-bold text-gray-300">/100</span>
              </div>
              <p className="text-[10px] text-gray-400 mt-3 font-medium italic">Based on real-time doubt analysis</p>
           </GlassCard>

           <GlassCard className="p-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-5 bg-blue-500 rounded-bl-full group-hover:scale-150 transition-transform duration-700" />
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Struggle Alerts</p>
              <div className="flex items-baseline gap-2">
                 <span className="text-4xl font-black text-pink-500 leading-none">12</span>
                 <span className="text-[10px] font-extrabold text-pink-300 uppercase">High Priority</span>
              </div>
              <p className="text-[10px] text-gray-400 mt-3 font-medium underline decoration-pink-500/20">Action required: Neural Net Section</p>
           </GlassCard>

           <GlassCard className="p-6 relative overflow-hidden group bg-gray-900 text-white">
              <div className="absolute top-0 right-0 p-4 opacity-20 bg-white rounded-bl-full group-hover:scale-150 transition-transform duration-700" />
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">AI Steering Score</p>
              <div className="flex items-baseline gap-2">
                 <span className="text-4xl font-black text-white leading-none">9.4</span>
                 <span className="text-xs font-bold text-purple-400">Excellent</span>
              </div>
              <p className="text-[10px] text-gray-500 mt-3 font-medium">Proficiency in curriculum alignment</p>
           </GlassCard>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
           {/* Focus Intensity Chart */}
           <div className="lg:col-span-8 flex flex-col gap-8">
              <GlassCard className="p-8">
                 <div className="flex items-center justify-between mb-10">
                    <div>
                       <h3 className="text-xl font-black text-gray-800 tracking-tighter uppercase">Focus Intensity Matrix</h3>
                       <p className="text-xs text-gray-400 font-medium">Real-time biometric-based engagement tracking</p>
                    </div>
                    <div className="flex gap-4">
                       <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-pink-500 rounded-full shadow-[0_0_10px_rgba(236,72,153,0.4)]" />
                          <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Neural focus</span>
                       </div>
                       <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-gray-200 rounded-full" />
                          <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Noise</span>
                       </div>
                    </div>
                 </div>

                 <div className="h-[350px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                       <AreaChart data={focusData}>
                          <defs>
                             <linearGradient id="focusGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#ec4899" stopOpacity={0.4}/>
                                <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
                             </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                          <XAxis 
                            dataKey="time" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{fontSize: 10, fontWeight: 'bold', fill: '#94a3b8'}} 
                          />
                          <YAxis 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{fontSize: 10, fill: '#94a3b8'}} 
                          />
                          <Tooltip 
                            contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '15px' }}
                            itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                          />
                          <Area 
                            type="monotone" 
                            dataKey="focus" 
                            stroke="#ec4899" 
                            fillOpacity={1} 
                            fill="url(#focusGrad)" 
                            strokeWidth={4}
                            animationDuration={2000}
                          />
                          <Area 
                            type="monotone" 
                            dataKey="distraction" 
                            stroke="#e2e8f0" 
                            fillOpacity={0} 
                            strokeWidth={2}
                            strokeDasharray="5 5"
                          />
                       </AreaChart>
                    </ResponsiveContainer>
                 </div>
                 
                 <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-gray-50">
                    <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 group hover:border-pink-200 transition-all">
                       <Target className="w-5 h-5 text-gray-400 mb-2 group-hover:text-pink-500 transition-colors" />
                       <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Peak focus</p>
                       <p className="text-xl font-black text-gray-800">10:30 AM</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 group hover:border-pink-200 transition-all">
                       <Clock className="w-5 h-5 text-gray-400 mb-2 group-hover:text-pink-500 transition-colors" />
                       <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Fatigue point</p>
                       <p className="text-xl font-black text-gray-800">10:00 AM</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 group hover:border-pink-200 transition-all">
                       <Zap className="w-5 h-5 text-gray-400 mb-2 group-hover:text-pink-500 transition-colors" />
                       <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Recovery speed</p>
                       <p className="text-xl font-black text-gray-800">High</p>
                    </div>
                 </div>
              </GlassCard>

              {/* Topic Retention Scorecard */}
              <GlassCard className="p-8">
                 <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xl font-black text-gray-800 tracking-tighter uppercase">Topic Retention Scorecard</h3>
                    <div className="p-2 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-all">
                       <Filter size={16} className="text-gray-400" />
                    </div>
                 </div>
                 <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                       <BarChart data={topicRetention} layout="vertical">
                          <XAxis type="number" hide />
                          <YAxis 
                            dataKey="name" 
                            type="category" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{fontSize: 12, fontWeight: 'bold', fill: '#475569'}} 
                            width={150}
                          />
                          <Tooltip 
                            cursor={{fill: 'transparent'}}
                            contentStyle={{ borderRadius: '16px', border: 'none' }}
                          />
                          <Bar dataKey="score" radius={[0, 10, 10, 0]} barSize={25}>
                             {topicRetention.map((entry, index) => (
                               <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                             ))}
                          </Bar>
                       </BarChart>
                    </ResponsiveContainer>
                 </div>
                 <p className="text-[10px] font-bold text-gray-400 mt-4 text-center uppercase tracking-[0.2em]">Based on student doubt exchange and quiz recursive analysis</p>
              </GlassCard>
           </div>

           {/* Sidebar Analytics Actions */}
           <div className="lg:col-span-4 space-y-8">
              {/* AI Pedagogical Advisor - Pro Version */}
              <div className="p-8 bg-gradient-to-br from-gray-900 to-black rounded-[40px] text-white shadow-2xl relative overflow-hidden group">
                 <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-[80px] group-hover:bg-purple-500/20 transition-all duration-1000" />
                 
                 <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-md">
                       <Brain className="w-6 h-6 text-pink-400" />
                    </div>
                    <div>
                       <h4 className="font-extrabold text-lg leading-none">Curriculum Steering</h4>
                       <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Model: Llama 3 Oracle</p>
                    </div>
                 </div>

                 <div className="space-y-6">
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all cursor-pointer">
                       <p className="text-xs font-bold text-purple-300 uppercase mb-2">Strategy 01</p>
                       <p className="text-xs text-gray-300 leading-relaxed font-medium">Topic **Backprop Logic** shows a 40% retention drop. AI recommends a **Gamified Recursive Trace** drill.</p>
                       <button className="mt-4 flex items-center gap-2 text-[10px] font-black uppercase text-white hover:text-pink-400 transition-colors">
                          Deploy Strategy <ChevronRight size={12} />
                       </button>
                    </div>

                    <div className="p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all cursor-pointer">
                       <p className="text-xs font-bold text-blue-300 uppercase mb-2">Strategy 02</p>
                       <p className="text-xs text-gray-300 leading-relaxed font-medium">Individual focus peaked mid-session. Optimal for introducing **Advanced RNNs** now.</p>
                       <button className="mt-4 flex items-center gap-2 text-[10px] font-black uppercase text-white hover:text-pink-400 transition-colors">
                          Adjust Roadmap <ChevronRight size={12} />
                       </button>
                    </div>
                 </div>

                 <button 
                   onClick={() => alert("Simulating a 24-hour analytical prediction... Data stream looks healthy.")}
                   className="w-full mt-10 py-4 bg-pink-500 text-white rounded-[24px] text-xs font-black uppercase tracking-widest hover:bg-pink-600 transition-all shadow-lg active:scale-95"
                 >
                    Run Predictive Analysis
                 </button>
              </div>

              {/* Student Risk Index */}
              <GlassCard className="p-8">
                 <h4 className="font-black text-gray-800 uppercase tracking-tighter text-lg mb-6 flex items-center gap-2">
                    <Users size={20} className="text-pink-500" /> Student Risk Index
                 </h4>
                 <div className="space-y-6">
                    {[
                      { name: 'STU-9402', risk: 85, color: 'bg-red-500' },
                      { name: 'STU-2931', risk: 72, color: 'bg-orange-500' },
                      { name: 'STU-1049', risk: 45, color: 'bg-yellow-500' },
                      { name: 'STU-5829', risk: 12, color: 'bg-green-500' },
                    ].map((stu, i) => (
                      <div key={i} className="flex items-center gap-4 group">
                         <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center font-bold text-[10px] text-gray-400 group-hover:bg-pink-50 group-hover:text-pink-500 transition-colors">ID</div>
                         <div className="flex-1">
                            <div className="flex justify-between items-center mb-1">
                               <span className="text-xs font-bold text-gray-700">{stu.name}</span>
                               <span className="text-[10px] font-black text-gray-400">{stu.risk}% risk</span>
                            </div>
                            <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                               <motion.div 
                                 initial={{ width: 0 }}
                                 animate={{ width: `${stu.risk}%` }}
                                 transition={{ duration: 1, delay: i * 0.2 }}
                                 className={`h-full ${stu.color}`} 
                               />
                            </div>
                         </div>
                      </div>
                    ))}
                 </div>
                 <button className="w-full mt-8 py-3 bg-gray-50 text-gray-500 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-100 transition-all">
                    View Full Leaderboard
                 </button>
              </GlassCard>

              {/* Resource Allocation */}
              <GlassCard className="p-8 border-l-4 border-l-blue-500">
                 <div className="flex items-center gap-3 mb-4">
                    <Layers className="text-blue-500 w-5 h-5" />
                    <h4 className="font-black text-gray-800 uppercase tracking-tighter text-lg">Resource Load</h4>
                 </div>
                 <p className="text-xs text-gray-500 font-medium leading-relaxed">
                    Local GPU (RTX 4090 Cluster) is at **88% capacity**. 15 students running local LLM inference concurrently.
                 </p>
                 <div className="mt-4 p-3 bg-blue-50 rounded-xl border border-blue-100 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
                    <span className="text-[9px] font-black text-blue-700 uppercase">Live monitoring active</span>
                 </div>
              </GlassCard>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
