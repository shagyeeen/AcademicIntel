"use client";

import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { GlassCard } from '@/components/ui/GlassCard';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, 
  Users, 
  AlertTriangle, 
  Lightbulb, 
  Bot, 
  Cpu, 
  Terminal,
  MessageCircle,
  TrendingDown,
  TrendingUp,
  Brain,
  ChevronRight,
  ShieldAlert,
  Search,
  CheckCircle2,
  XCircle,
  Activity
} from 'lucide-react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line,
  AreaChart,
  Area
} from 'recharts';

import ClassroomCCTV from '@/components/dashboard/CCTVMonitor';

const moodDistribution = [
  { name: 'Interested', value: 45, color: '#4ade80' },
  { name: 'Bored', value: 25, color: '#fbbf24' },
  { name: 'Confused', value: 20, color: '#f87171' },
  { name: 'Too Fast', value: 5, color: '#60a5fa' },
  { name: 'Too Slow', value: 5, color: '#a78bfa' },
];

const stressAlerts = [
  { id: 'STU104', level: 'High', reasons: ['Late assignments', 'High confusion mood'], risk: 85 },
  { id: 'STU209', level: 'Critical', reasons: ['Constant absence', 'Academic decline'], risk: 92 },
  { id: 'STU088', level: 'Moderate', reasons: ['Increasing workload score'], risk: 65 },
];

const engagementTrend = [
  { time: '10:00', engagement: 60 },
  { time: '10:15', engagement: 85 },
  { time: '10:30', engagement: 45 },
  { time: '10:45', engagement: 30 },
  { time: '11:00', engagement: 70 },
];

const topicAnalytics = [
  { name: 'Neural Arch', interested: 40, bored: 8 },
  { name: 'Backprop', interested: 15, bored: 33 },
  { name: 'Gradients', interested: 25, bored: 23 },
  { name: 'Dataset', interested: 38, bored: 10 },
  { name: 'CNNs', interested: 44, bored: 4 },
];

export default function TeacherDashboard() {
  const [selectedModel, setSelectedModel] = useState('Llama3 (Local)');
  const [implementedSteps, setImplementedSteps] = useState<number[]>([]);
  const [aiMessage, setAiMessage] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  const getAiSuggestion = async () => {
    setIsAiLoading(true);
    const boredTopics = topicAnalytics.filter(t => t.bored > t.interested).map(t => t.name).join(", ");
    try {
      const response = await fetch('/api/ai-proxy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          prompt: `Class analytics show students are bored in: ${boredTopics}. Provide a comprehensive pedagogical analysis and 3 specific, highly creative strategies to improvise learning for these topics. Each strategy should be explained with implementation details. Your response MUST be detailed and between 150 to 200 words to provide maximum value for the teacher.`, 
          model: selectedModel 
        }),
      });
      const data = await response.json();
      setAiMessage(data.choices?.[0]?.message?.content || "Focus on gamified quizzes and peer-to-peer coding sessions for complex logic topics.");
    } catch (error) {
      setAiMessage("Error connecting to AI Proxy. Please check local Ollama instance.");
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <DashboardLayout role="teacher">
      <div className="flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Classroom Intel: Advanced AI <span className="text-gray-400 font-normal">/ SEC-A</span></h1>
            <p className="text-gray-500">Live monitoring 48 students in real-time.</p>
          </div>
          <div className="flex gap-4">
             <div className="flex items-center gap-2 p-3 bg-pink-100/50 rounded-2xl border border-pink-200">
                <Users className="w-5 h-5 text-pink-500" />
                <span className="text-sm font-bold text-pink-700">42/48 Present</span>
             </div>
             <div className="flex items-center gap-2 p-3 bg-green-100/50 rounded-2xl border border-green-200">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span className="text-sm font-bold text-green-700">Lecture Healthy</span>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* CCTV MONITOR - FULL WIDTH TOP */}
          <ClassroomCCTV />

          {/* Main Visualizations */}
          <div className="lg:col-span-2 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Mood Distribution Pie */}
              <GlassCard>
                <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-pink-500" /> Live Mood Distribution
                </h3>
                <div className="h-[250px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={moodDistribution}
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {moodDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-4">
                   {moodDistribution.map((m, i) => (
                     <div key={i} className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: m.color }} />
                        <span className="text-[10px] font-bold text-gray-500 uppercase">{m.name}: {m.value}%</span>
                     </div>
                   ))}
                </div>
              </GlassCard>

               {/* Topic Wise Engagement Analytics */}
               <GlassCard className="md:col-span-2">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-pink-500" /> Topic Engagement Analytics
                    </h3>
                    <div className="flex gap-4">
                       <div className="flex items-center gap-1">
                          <div className="w-3 h-3 bg-green-400 rounded-full" />
                          <span className="text-[10px] font-bold text-gray-400">INTERESTED</span>
                       </div>
                       <div className="flex items-center gap-1">
                          <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                          <span className="text-[10px] font-bold text-gray-400">BORED</span>
                       </div>
                    </div>
                  </div>
                  <div className="h-[300px] w-full">
                     <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={topicAnalytics}>
                           <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                           <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold'}} />
                           <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                           <Tooltip 
                             cursor={{fill: '#f8fafc'}}
                             contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                           />
                           <Bar dataKey="interested" fill="#4ade80" radius={[4, 4, 0, 0]} barSize={20} />
                           <Bar dataKey="bored" fill="#fbbf24" radius={[4, 4, 0, 0]} barSize={20} />
                        </BarChart>
                     </ResponsiveContainer>
                  </div>
                  <div className="mt-4 p-3 bg-pink-50 rounded-xl border border-pink-100 flex items-center gap-3">
                     <AlertTriangle className="w-4 h-4 text-pink-500" />
                     <p className="text-[10px] font-bold text-pink-700 uppercase">Attention Required: Over 60% of students expressed boredom during 'Backpropagation' segment.</p>
                  </div>
               </GlassCard>

               {/* Lecture Engagement Timeline */}
               <GlassCard>
                  <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                   <TrendingDown className="w-5 h-5 text-blue-500" /> Engagement Timeline
                 </h3>
                 <div className="h-[200px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                       <AreaChart data={engagementTrend}>
                         <defs>
                           <linearGradient id="colorEngage" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                             <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                           </linearGradient>
                         </defs>
                         <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                         <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                         <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                         <Tooltip />
                         <Area type="monotone" dataKey="engagement" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorEngage)" strokeWidth={3} />
                       </AreaChart>
                    </ResponsiveContainer>
                 </div>
                 <p className="text-[10px] text-gray-400 mt-4 text-center">Significant drop detected during 10:45 Explanation phase.</p>
               </GlassCard>
            </div>

            {/* AI Teaching suggestions (Proxy to Groq via Ollama UI) */}
            <GlassCard className="relative overflow-hidden border-2 border-purple-100">
               <div className="absolute top-0 right-0 p-4">
                  <div className="flex items-center gap-2 px-3 py-1 bg-purple-50 rounded-full border border-purple-100">
                     <Cpu className="w-3 h-3 text-purple-500" />
                     <span className="text-[10px] font-bold text-purple-600 uppercase">Model: {selectedModel}</span>
                  </div>
               </div>
               
               <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-purple-500 rounded-2xl shadow-lg shadow-purple-200">
                     <Bot className="w-6 h-6 text-white" />
                  </div>
                  <div>
                     <h3 className="text-xl font-bold text-gray-800">AI Pedagogical Assistant</h3>
                     <p className="text-sm text-gray-500">Real-time classroom optimization suggestions</p>
                  </div>
               </div>

                <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 mb-6 border border-purple-100 shadow-inner relative min-h-[200px]">
                   <div className="flex items-center justify-between mb-6 border-b border-purple-50 pb-4">
                      <div className="flex items-center gap-2">
                         <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                         <span className="text-purple-900 font-black text-xs uppercase tracking-widest">Neural Pedagogical Report</span>
                      </div>
                      <span className="text-[10px] font-bold text-gray-400">SESSION: SEC-A-2026</span>
                   </div>

                   <AnimatePresence mode="wait">
                     {aiMessage ? (
                       <motion.div
                         initial={{ opacity: 0, y: 10 }}
                         animate={{ opacity: 1, y: 0 }}
                         className="text-gray-800 leading-relaxed text-sm space-y-4"
                       >
                         {aiMessage.split('\n\n').map((para, i) => (
                           <p key={i} className="font-medium">
                             {para.split(/(\*\*.*?\*\*)/).map((part, j) => 
                               part.startsWith('**') && part.endsWith('**') 
                               ? <strong key={j} className="text-purple-700 font-extrabold">{part.slice(2, -2)}</strong> 
                               : part
                             )}
                           </p>
                         ))}
                         
                         <div className="pt-6 flex gap-3">
                            <button className="flex items-center gap-2 text-[10px] font-black uppercase text-purple-600 bg-purple-50 px-3 py-1.5 rounded-full border border-purple-100 hover:bg-purple-100 transition-all">
                               <CheckCircle2 size={12} /> Mark as Implemented
                            </button>
                            <button className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100 hover:bg-gray-100 transition-all">
                               <Search size={12} /> Deep Dive Analysis
                            </button>
                         </div>
                       </motion.div>
                     ) : isAiLoading ? (
                       <motion.div className="flex flex-col items-center justify-center h-40 gap-4">
                          <div className="flex gap-2">
                             <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" />
                             <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.1s]" />
                             <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.2s]" />
                          </div>
                          <p className="text-xs font-bold text-purple-400 animate-pulse uppercase tracking-widest">Compiling Pedagogical Data...</p>
                       </motion.div>
                     ) : (
                       <div className="flex flex-col items-center justify-center h-40 text-center space-y-2">
                          <Brain size={32} className="text-purple-100" />
                          <p className="text-sm font-bold text-gray-300 italic">Select a classroom segment or click 'Analyze' for live pedagogical steering...</p>
                       </div>
                     )}
                   </AnimatePresence>
                </div>

               <div className="flex flex-col sm:flex-row gap-4">
                  <select 
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    className="glass-input h-12 flex-1 font-bold text-sm bg-white"
                  >
                     <option>Llama3 (Local)</option>
                     <option>Mistral (Local)</option>
                     <option>Gemma (Local)</option>
                  </select>
                  <button 
                    onClick={getAiSuggestion}
                    disabled={isAiLoading}
                    className="glass-button h-12 px-8 flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <Lightbulb className="w-4 h-4" /> Analyze Classroom State
                  </button>
               </div>
            </GlassCard>

            {/* Assignment Analytics */}
            <GlassCard>
                <h3 className="text-lg font-bold text-gray-800 mb-6">Assignment Completion Rates</h3>
                <div className="space-y-4">
                   {[
                     { name: 'Neural Networks HW-4', completed: 32, total: 48, status: 'On Track' },
                     { name: 'AI Ethics Paper', completed: 42, total: 48, status: 'Completed' },
                     { name: 'Final Project Draft', completed: 12, total: 48, status: 'Warning' }
                   ].map((item, idx) => (
                     <div key={idx} className="p-4 bg-white/50 border border-white/60 rounded-2xl">
                        <div className="flex justify-between mb-2">
                           <span className="font-bold text-gray-800 text-sm">{item.name}</span>
                           <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${
                             item.status === 'Warning' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'
                           }`}>{item.status}</span>
                        </div>
                        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden mb-2">
                           <div 
                             className={`h-full ${item.status === 'Warning' ? 'bg-red-400' : 'bg-pink-400'}`}
                             style={{ width: `${(item.completed / item.total) * 100}%` }}
                           />
                        </div>
                        <div className="flex justify-between text-[10px] font-bold text-gray-400">
                           <span>{item.completed} Students Submitted</span>
                           <span>{Math.round((item.completed / item.total) * 100)}%</span>
                        </div>
                     </div>
                   ))}
                </div>
            </GlassCard>
          </div>

          {/* Teacher Sidebar Area */}
          <div className="space-y-8">
            {/* Student Stress Alert System */}
            <GlassCard className="border-l-4 border-l-red-500">
               <div className="flex items-center gap-2 mb-6">
                  <ShieldAlert className="w-5 h-5 text-red-500" />
                  <h3 className="text-lg font-bold text-gray-800">Critical Stress Alerts</h3>
               </div>
               <div className="space-y-4">
                  {stressAlerts.map((alert, idx) => (
                    <div key={idx} className="p-4 bg-red-50/50 border border-red-100 rounded-2xl">
                       <div className="flex justify-between items-center mb-2">
                          <span className="text-xs font-bold text-gray-900">ID: {alert.id}</span>
                          <span className="text-[10px] font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded-full">{alert.level}</span>
                       </div>
                       <div className="flex items-center gap-4 mb-3">
                          <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                             <div className="h-full bg-red-500" style={{ width: `${alert.risk}%` }} />
                          </div>
                          <span className="text-[10px] font-bold text-red-700">{alert.risk}% Risk</span>
                       </div>
                       <div className="flex flex-wrap gap-1">
                          {alert.reasons.map((r, i) => (
                            <span key={i} className="text-[9px] bg-red-100/50 text-red-600 px-1.5 py-0.5 rounded border border-red-100 font-medium">#{r}</span>
                          ))}
                       </div>
                       <button className="mt-4 w-full py-2 bg-white rounded-xl text-xs font-bold text-red-600 border border-red-200 hover:bg-red-500 hover:text-white transition-all shadow-sm">
                          Initiate Wellness Check
                       </button>
                    </div>
                  ))}
               </div>
            </GlassCard>

            {/* Live Doubt Monitoring */}
            <GlassCard>
               <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-gray-800">Active Doubts</h3>
                  <div className="px-2 py-0.5 bg-pink-100 text-pink-600 rounded text-[10px] font-bold">4 Unresolved</div>
               </div>
               <div className="space-y-3">
                  <div className="p-3 bg-white border border-gray-100 rounded-xl hover:border-pink-200 cursor-pointer transition-all">
                     <p className="text-xs text-gray-700 font-medium mb-2 leading-relaxed italic">"Can you repeat the derivation for Theorem 4.2? A bit too fast."</p>
                     <div className="flex justify-between items-center">
                        <span className="text-[9px] font-bold text-gray-400">#os ∙ 2 mins ago</span>
                        <TrendingUp className="w-3 h-3 text-red-400" />
                     </div>
                  </div>
                  <div className="p-3 bg-white border border-gray-100 rounded-xl hover:border-pink-200 cursor-pointer transition-all">
                     <p className="text-xs text-gray-700 font-medium mb-2 leading-relaxed italic">"Does the time complexity O(n log n) apply to decentralized clusters?"</p>
                     <div className="flex justify-between items-center">
                        <span className="text-[9px] font-bold text-gray-400">#datastructures ∙ 5 mins ago</span>
                        <MessageCircle className="w-3 h-3 text-blue-400" />
                     </div>
                  </div>
               </div>
               <button className="mt-6 w-full glass-button-secondary py-3 text-xs flex items-center justify-center gap-2">
                  <MessageCircle className="w-4 h-4" /> Open Doubt Exchange
               </button>
            </GlassCard>

            {/* Automated Attendance Summary */}
            <GlassCard>
               <h3 className="text-lg font-bold text-gray-800 mb-4">Smart Attendance</h3>
               <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className="flex justify-between mb-4">
                     <div className="text-center">
                        <p className="text-[10px] text-gray-400 font-bold uppercase">Present</p>
                        <p className="text-xl font-bold text-green-600">42</p>
                     </div>
                     <div className="text-center">
                        <p className="text-[10px] text-gray-400 font-bold uppercase">Late</p>
                        <p className="text-xl font-bold text-yellow-500">3</p>
                     </div>
                     <div className="text-center">
                        <p className="text-[10px] text-gray-400 font-bold uppercase">Absent</p>
                        <p className="text-xl font-bold text-red-500">3</p>
                     </div>
                  </div>
                  <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden flex">
                     <div className="h-full bg-green-500" style={{ width: '87%' }} />
                     <div className="h-full bg-yellow-500" style={{ width: '6%' }} />
                     <div className="h-full bg-red-500" style={{ width: '7%' }} />
                  </div>
               </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
