"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { GlassCard } from '@/components/ui/GlassCard';
import { motion, AnimatePresence } from 'framer-motion';
import FaceScanner from '@/components/dashboard/FaceScanner';
import { 
  Frown, 
  Meh, 
  Smile, 
  FastForward, 
  Rewind, 
  Upload, 
  Clock, 
  AlertCircle,
  TrendingUp,
  Brain,
  Activity,
  MessageCircle,
  ArrowUp,
  CheckCircle,
  Tag,
  Camera,
  Wifi,
  Shield,
  Search,
  UserCheck,
  User,
  File,
  X,
  Bot
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area 
} from 'recharts';

const moodData = [
  { name: 'Mon', stress: 30, attentiveness: 85, bored: 10 },
  { name: 'Tue', stress: 45, attentiveness: 70, bored: 25 },
  { name: 'Wed', stress: 60, attentiveness: 50, bored: 40 },
  { name: 'Thu', stress: 85, attentiveness: 40, bored: 55 },
  { name: 'Fri', stress: 40, attentiveness: 75, bored: 20 },
  { name: 'Sat', stress: 35, attentiveness: 90, bored: 15 },
  { name: 'Sun', stress: 25, attentiveness: 95, bored: 5 },
];

export default function StudentDashboard() {
  const [moodSubmitted, setMoodSubmitted] = useState(false);
  const [doubtText, setDoubtText] = useState('');
  const [isAttendanceMarked, setAttendanceMarked] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string>('727824tuit213');
  const [currentUserName, setCurrentUserName] = useState<string>('Shagin');
  const [expandedDoubtId, setExpandedDoubtId] = useState<number | null>(null);
  const [selectedModel, setSelectedModel] = useState('Llama3 (Local)');
  const [isAiAnswering, setIsAiAnswering] = useState<number | null>(null);
  const [assignments, setAssignments] = useState<any[]>([
    { id: 1, title: 'Neural Networks HW-4', type: 'Assignment', due: '14h', status: 'pending', color: 'pink', file: null },
    { id: 2, title: 'Big Data Case Study', type: 'Assignment', due: '3 days', status: 'pending', color: 'purple', file: null },
    { id: 3, title: 'Symposium Tech-Talk', type: 'OD', status: 'approved', color: 'blue' },
    { id: 4, title: 'Inter-College Sports', type: 'OD', status: 'pending', color: 'orange' },
  ]);

  const handleFileSelect = (id: number, remove = false) => {
    if (remove) {
      setAssignments(prev => prev.map(a => a.id === id ? { ...a, file: null } : a));
      return;
    }
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf';
    input.onchange = (e: any) => {
      const name = e.target.files[0]?.name;
      if (name) setAssignments(prev => prev.map(a => a.id === id ? { ...a, file: name } : a));
    };
    input.click();
  };
  const [doubts, setDoubts] = useState([
    { 
      id: 101, 
      text: "Can someone explain the difference between DFT and FFT in simple terms? Still confused about the complexity reduction.", 
      tag: "#signalsystems", 
      upvotes: 24, 
      time: "10 mins ago", 
      solved: true,
      answers: [
        { id: 1, author: "AI Tutor", text: "FFT is essentially an efficient algorithm to compute DFT. DFT has O(N²) complexity, while FFT brings it down to O(N log N) using a divide-and-conquer approach.", upvotes: 98, isAi: true },
        { id: 2, author: "Suresh P.", text: "FFT is just a faster way to do DFT. Think of it like a shortcut through a forest vs walking around it.", upvotes: 56, isAi: false },
        { id: 3, author: "Anonymous", text: "The complexity reduction comes from the Cooley-Tukey algorithm usually. It exploits the periodicity and symmetry properties of Wn.", upvotes: 45, isAi: false },
        { id: 4, author: "Elena M.", text: "If N=1024, DFT takes ~1 million operations, FFT takes ~10k. That's a 100x speedup!", upvotes: 38, isAi: false },
        { id: 5, author: "Physics Nerd", text: "It's also why spectrum analysis can happen in real-time on your phone.", upvotes: 22, isAi: false },
        { id: 6, author: "Anonymous", text: "Does anyone have a good Python implementation for this?", upvotes: 14, isAi: false },
        { id: 7, author: "Prof. David", text: "Look into scipy.fft, it's the industry standard for Python.", upvotes: 12, isAi: false },
        { id: 8, author: "StudyBuddy", text: "Saved my life for the midterms!", upvotes: 8, isAi: false },
        { id: 9, author: "Anonymous", text: "FFT is only for N power of 2 right?", upvotes: 5, isAi: false },
        { id: 10, author: "AI Assistant", text: "Most traditional FFTs like Cooley-Tukey require N to be a power of 2, but there are generalizations for other N as well.", upvotes: 4, isAi: true }
      ]
    },
    {
      id: 102,
      text: "How exactly does the 'this' keyword work in arrow functions vs regular functions? I keep getting undefined errors in my React callbacks.",
      tag: "#javascript",
      upvotes: 18,
      time: "25 mins ago",
      solved: true,
      answers: [
        { id: 1, author: "AI Mentor", text: "Regular functions have their own 'this' context based on how they're called. Arrow functions, however, capture 'this' from their lexical environment. In React, this means arrow functions don't need manual binding in the constructor.", upvotes: 120, isAi: true },
        { id: 2, author: "DevGuru", text: "Think of arrow functions as having no 'this' of their own. They just look up to the nearest parent scope.", upvotes: 44, isAi: false }
      ]
    },
    {
      id: 103,
      text: "What's the best approach to normalize a database with many-to-many relationships? Using a join table or just arrays?",
      tag: "#dbms",
      upvotes: 12,
      time: "1 hour ago",
      solved: false,
      answers: [
        { id: 1, author: "DBA Mike", text: "Always use a junction/join table in relational DBs. Arrays (like JSONB) are tempting but break first normal form and make querying difficult.", upvotes: 35, isAi: false }
      ]
    },
    {
      id: 104,
      text: "Can anyone explain Bellman-Ford algorithm with an example? Why do we need it if Dijkstra is faster?",
      tag: "#algorithms",
      upvotes: 31,
      time: "2 hours ago",
      solved: true,
      answers: [
        { id: 1, author: "AI Tutor", text: "Bellman-Ford is necessary when the graph contains negative weight edges. Dijkstra fails in those cases because it's greedy. Bellman-Ford can also detect negative cycles by performing one extra relaxation step.", upvotes: 156, isAi: true },
        { id: 2, author: "AlgoExpert", text: "Basically: Negative weights? Bellman-Ford. All positive? Dijkstra. Simple as that!", upvotes: 62, isAi: false }
      ]
    }
  ]);

  const handleDoubtSubmit = () => {
    if (!doubtText.trim()) return;
    const newDoubt = {
      id: Date.now(),
      text: doubtText,
      tag: "#general",
      upvotes: 0,
      time: "Just now",
      solved: false,
      answers: []
    };
    setDoubts([newDoubt, ...doubts]);
    setDoubtText('');
  };

  const getAiAnswer = async (doubtId: number, text: string) => {
    setIsAiAnswering(doubtId);
    try {
      const resp = await fetch('/api/ai-proxy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          prompt: `As an expert academic tutor, answer this student doubt: "${text}". Provide a clear, structured, and helpful response. Limit 60 words.`,
          model: selectedModel
        })
      });
      const data = await resp.json();
      const aiContent = data.choices?.[0]?.message?.content || "Neural pathway busy, try again.";
      
      setDoubts(prev => prev.map(d => d.id === doubtId ? {
        ...d,
        answers: [
          { id: Date.now(), author: "AI Instant Help", text: aiContent, upvotes: 99, isAi: true },
          ...(d.answers || [])
        ],
        solved: true
      } : d));
    } catch (e) {
      console.error(e);
    } finally {
      setIsAiAnswering(null);
      setExpandedDoubtId(doubtId);
    }
  };

  const handleAssignmentSubmit = (id: number) => {
    setAssignments(prev => prev.map(a => 
      a.id === id ? { ...a, status: 'submitted' } : a
    ));
  };

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
       const storedId = localStorage.getItem('studentId');
       if (storedId) {
         setCurrentUserId(storedId);
         const students = [
           { id: '727824tuit213', name: 'Shagin Dharshanth' },
           { id: '727824tuit220', name: 'Sineshana S J' },
           { id: '727824tuit244', name: 'Tharikasini M S' }
         ];
         const match = students.find(s => s.id === storedId);
         if (match) setCurrentUserName(match.name);
       }
    }
  }, []);

  // Workload calc
  const assignmentsPerWeek = 4;
  const lateSubmissions = 1;
  const missedAssignments = 0;
  const workloadScore = (assignmentsPerWeek * 2) + (lateSubmissions * 3) + (missedAssignments * 5);
  // Max possible around 30-40 for high stress
  const stressLevel = workloadScore > 20 ? 'High Stress' : workloadScore > 10 ? 'Moderate Stress' : 'Low Stress';

  const handleVerification = (student: any) => {
    setAttendanceMarked(true);
  };

  return (
    <DashboardLayout role="student">
      <div className="flex flex-col gap-8">
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome back, {currentUserName.split(' ')[0]}! 👋</h1>
            <p className="text-gray-500">Here's your academic intelligence overview for today.</p>
          </div>
          <div className="flex items-center gap-3">
             <div className="flex -space-x-3">
                {[1,2,3].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-pink-100 flex items-center justify-center text-xs font-bold text-pink-600">
                    JD
                  </div>
                ))}
             </div>
             <div className="p-2 border border-gray-100 rounded-xl bg-gray-50/50">
                <p className="text-[10px] font-bold text-gray-400 leading-none mb-1">CURRENT CLASS</p>
                <p className="text-xs font-bold text-gray-700">Advanced AI Systems</p>
             </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <GlassCard className="border-l-4 border-l-pink-400">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-pink-100 rounded-lg">
                <Brain className="w-5 h-5 text-pink-600" />
              </div>
              <span className="text-[10px] font-bold text-green-500 bg-green-50 px-2 py-1 rounded-full">+4% from last week</span>
            </div>
            <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">Stress Score</h3>
            <p className="text-3xl font-bold text-gray-900 mt-1">{workloadScore}</p>
            <p className={`text-xs mt-2 font-semibold ${stressLevel === 'High Stress' ? 'text-red-500' : 'text-green-500'}`}>{stressLevel}</p>
          </GlassCard>

          <GlassCard className="border-l-4 border-l-blue-400">
            <div className="flex justify-between items-star mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Upload className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-[10px] font-bold text-blue-500 bg-blue-50 px-2 py-1 rounded-full">2 Pending</span>
            </div>
            <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">Submissions</h3>
            <p className="text-3xl font-bold text-gray-900 mt-1">12/14</p>
            <p className="text-xs text-gray-400 mt-2">85% Completion rate</p>
          </GlassCard>

          <GlassCard className="border-l-4 border-l-purple-400">
            <div className="flex justify-between items-star mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
              <span className="text-[10px] font-bold text-purple-500 bg-purple-50 px-2 py-1 rounded-full">Top 5%</span>
            </div>
            <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">Attendance</h3>
            <p className="text-3xl font-bold text-gray-900 mt-1">94.2%</p>
            <p className="text-xs text-gray-400 mt-2">Class Average: 82%</p>
          </GlassCard>

          <GlassCard className="border-l-4 border-l-orange-400">
            <div className="flex justify-between items-star mb-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                <MessageCircle className="w-5 h-5 text-orange-600" />
              </div>
              <span className="text-[10px] font-bold text-orange-500 bg-orange-50 px-2 py-1 rounded-full">Active</span>
            </div>
            <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">Doubt Rank</h3>
            <p className="text-3xl font-bold text-gray-900 mt-1">Silver</p>
            <p className="text-xs text-gray-400 mt-2">12 Answers upvoted</p>
          </GlassCard>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Analytics Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* Stress Trend Chart */}
            <GlassCard>
              <div className="flex items-center justify-between mb-8">
                <div>
                   <h3 className="text-xl font-bold text-gray-800">Stress & Wellbeing Trend</h3>
                   <p className="text-sm text-gray-500">Weekly analysis of your academic burnout levels</p>
                </div>
                <div className="flex gap-4">
                   <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 bg-pink-400 rounded-full shadow-[0_0_8px_rgba(244,114,182,0.5)]" />
                      <span className="text-[10px] uppercase font-black text-gray-400 tracking-wider">Stress</span>
                   </div>
                   <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 bg-green-400 rounded-full shadow-[0_0_8px_rgba(74,222,128,0.5)]" />
                      <span className="text-[10px] uppercase font-black text-gray-400 tracking-wider">Attentiveness</span>
                   </div>
                   <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 bg-amber-400 rounded-full shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
                      <span className="text-[10px] uppercase font-black text-gray-400 tracking-wider">Boredom</span>
                   </div>
                </div>
              </div>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={moodData}>
                    <defs>
                      <linearGradient id="colorStress" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f472b6" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#f472b6" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorAttend" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorBored" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#fbbf24" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#9CA3AF', fontWeight: 'bold'}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#9CA3AF', fontWeight: 'bold'}} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)', background: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(8px)' }}
                    />
                    <Area type="monotone" dataKey="stress" stroke="#f472b6" fillOpacity={1} fill="url(#colorStress)" strokeWidth={4} />
                    <Area type="monotone" dataKey="attentiveness" stroke="#10b981" fillOpacity={1} fill="url(#colorAttend)" strokeWidth={4} />
                    <Area type="monotone" dataKey="bored" stroke="#fbbf24" fillOpacity={1} fill="url(#colorBored)" strokeWidth={4} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </GlassCard>

            {/* Anonymous Doubt Exchange */}
            <GlassCard>
              <h3 className="text-xl font-bold text-gray-800 mb-6">Anonymous Doubt Exchange</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <User className="text-gray-400 w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <textarea 
                      placeholder="Ask a doubt anonymously..."
                      className="w-full glass-input h-24 resize-none mb-3"
                      value={doubtText}
                      onChange={(e) => setDoubtText(e.target.value)}
                    />
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                      <div className="flex gap-2">
                        <button className="px-3 py-1 bg-pink-100 text-pink-600 rounded-lg text-xs font-bold border border-pink-200">#math</button>
                        <button className="px-3 py-1 bg-purple-100 text-purple-600 rounded-lg text-xs font-bold border border-purple-200">#os</button>
                      </div>
                      <div className="flex items-center gap-3">
                         <select 
                           value={selectedModel}
                           onChange={(e) => setSelectedModel(e.target.value)}
                           className="text-[10px] font-bold bg-white/50 border border-gray-100 rounded-lg px-2 py-1 outline-none focus:border-pink-300"
                         >
                            <option>Llama3 (Local)</option>
                            <option>Mistral (Local)</option>
                            <option>Gemma (Local)</option>
                         </select>
                         <button 
                           onClick={handleDoubtSubmit}
                           className="glass-button px-6 py-2"
                         >
                           Post Anonymously
                         </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                   {doubts.map(doubt => (
                     <div key={doubt.id} className="p-4 bg-white/50 border border-white/60 rounded-2xl">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-2">
                             <div className="w-6 h-6 rounded-full bg-pink-500 flex items-center justify-center text-[10px] text-white font-bold">A</div>
                             <span className="text-xs font-bold text-gray-700">Anonymous Student</span>
                             <span className="text-[10px] text-gray-400">{doubt.time}</span>
                          </div>
                          <div className="flex items-center gap-1 text-pink-500 bg-pink-50 px-2 py-0.5 rounded-full text-[10px] font-bold">
                             <Tag className="w-3 h-3" /> {doubt.tag}
                          </div>
                        </div>
                        <p className="text-sm text-gray-700 leading-relaxed mb-4">
                          {doubt.text}
                        </p>
                        <div className="flex items-center gap-6">
                           <button className="flex items-center gap-1.5 text-gray-400 hover:text-pink-500 transition-colors">
                              <ArrowUp className="w-4 h-4" /> <span className="text-xs font-bold">{doubt.upvotes}</span>
                           </button>
                           <button 
                             onClick={() => setExpandedDoubtId(expandedDoubtId === doubt.id ? null : doubt.id)}
                             className="flex items-center gap-1.5 text-gray-400 hover:text-pink-500 transition-colors"
                           >
                              <MessageCircle className="w-4 h-4" /> <span className="text-xs font-bold">{(doubt.answers || []).length} Answers</span>
                           </button>
                           <button 
                             onClick={() => getAiAnswer(doubt.id, doubt.text)}
                             disabled={isAiAnswering === doubt.id}
                             className={`flex items-center gap-1.5 text-xs font-black uppercase ${isAiAnswering === doubt.id ? 'text-gray-300' : 'text-purple-500 hover:text-purple-600'}`}
                           >
                              <Bot className="w-4 h-4" /> {isAiAnswering === doubt.id ? 'Thinking...' : 'AI Answer'}
                           </button>
                           <div className="ml-auto">
                              {doubt.solved ? (
                                <span className="text-[10px] font-bold text-green-500 flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Solved</span>
                              ) : (
                                <span className="text-[10px] font-bold text-orange-500 flex items-center gap-1"><Clock className="w-3 h-3" /> Pending</span>
                              )}
                           </div>
                        </div>

                        {/* Answers Section */}
                        <AnimatePresence>
                          {expandedDoubtId === doubt.id && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="mt-6 border-t border-gray-100 pt-6 space-y-4 overflow-hidden"
                            >
                              { (doubt.answers || []).sort((a: any, b: any) => b.upvotes - a.upvotes).map((ans: any) => (
                                <div key={ans.id} className={`p-4 rounded-xl ${ans.isAi ? 'bg-purple-50 border border-purple-100' : 'bg-gray-50 border border-gray-100'}`}>
                                  <div className="flex justify-between items-center mb-2">
                                    <div className="flex items-center gap-2">
                                      {ans.isAi ? <Bot size={14} className="text-purple-500" /> : <div className="w-4 h-4 rounded-full bg-gray-200" />}
                                      <span className={`text-[10px] font-black uppercase ${ans.isAi ? 'text-purple-700' : 'text-gray-500'}`}>{ans.author}</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400">
                                      <ArrowUp size={10} /> {ans.upvotes}
                                    </div>
                                  </div>
                                  <p className="text-xs text-gray-700 leading-relaxed font-medium">
                                    {ans.text}
                                  </p>
                                </div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                     </div>
                   ))}
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Right Sidebar Area */}
          <div className="space-y-8">
            {/* Real-time Mood Feedback */}
            <GlassCard>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Lecture Mood</h3>
              <p className="text-xs text-gray-500 mb-6 font-medium">How are you feeling about the current lecture?</p>
              
              <AnimatePresence mode="wait">
                {!moodSubmitted ? (
                  <motion.div 
                    key="mood-form"
                    className="grid grid-cols-5 gap-2"
                  >
                    {[
                      { icon: <Smile />, label: "Interested", color: "hover:bg-green-100 text-green-600" },
                      { icon: <Meh />, label: "Bored", color: "hover:bg-yellow-100 text-yellow-600" },
                      { icon: <Frown />, label: "Confused", color: "hover:bg-red-100 text-red-600" },
                      { icon: <FastForward />, label: "Too Fast", color: "hover:bg-blue-100 text-blue-600" },
                      { icon: <Rewind />, label: "Too Slow", color: "hover:bg-purple-100 text-purple-600" },
                    ].map((mood, idx) => (
                      <button 
                        key={idx}
                        onClick={() => setMoodSubmitted(true)}
                        className={`flex flex-col items-center gap-2 p-2 rounded-xl transition-all ${mood.color}`}
                      >
                        {mood.icon}
                        <span className="text-[8px] font-bold uppercase tracking-tighter">{mood.label}</span>
                      </button>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div 
                    key="mood-thanks"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-4 bg-green-50 rounded-2xl border border-green-100"
                  >
                    <CheckCircle className="text-green-500 mb-2" />
                    <p className="text-xs font-bold text-green-700">Mood recorded!</p>
                  </motion.div>
                )}
              </AnimatePresence>
              <p className="mt-4 text-[9px] text-gray-400 text-center">Restricted to one submission per IP per lecture.</p>
            </GlassCard>

            {/* Smart Attendance Quick Link */}
            <GlassCard>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-800">Biometric Attendance</h3>
                <div className="px-2 py-0.5 bg-green-100 text-green-600 rounded text-[10px] font-bold">LIVE</div>
              </div>
              
              <Link href="/dashboard/student/attendance" className="flex flex-col items-center py-6 bg-gray-50/50 rounded-2xl border border-dashed border-gray-200 group hover:border-pink-300 transition-all cursor-pointer overflow-hidden relative block">
                 <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                 <div className="w-16 h-16 rounded-full bg-white shadow-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                    <UserCheck className="w-8 h-8 text-pink-500" />
                 </div>
                 <p className="font-bold text-gray-800">Verification Required</p>
                 <p className="text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-widest">Advanced AI systems</p>
                 
                 <div className="mt-6 w-[80%] glass-button py-3 text-xs flex items-center justify-center gap-2">
                    <Camera className="w-4 h-4" /> Smart Attendance
                 </div>
              </Link>
              <p className="mt-4 text-[9px] text-gray-400 text-center uppercase tracking-tighter">EyeTrace AI Recognition System</p>
            </GlassCard>

            {/* Assignments Portal */}
            <GlassCard>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-800">Assignments & OD</h3>
                </div>
                <div className="space-y-3">
                   {assignments.map(assignment => (
                     <div key={assignment.id} className={`p-4 ${
                       assignment.status === 'submitted' || assignment.status === 'approved' 
                       ? 'bg-green-50 border-green-100' 
                       : assignment.status === 'pending' && assignment.type === 'OD'
                       ? 'bg-orange-50 border-orange-100'
                       : assignment.color === 'pink' ? 'bg-pink-50 border-pink-100' : 'bg-white/50 border-gray-100'
                     } border rounded-xl transition-all`}>
                        <div className="flex justify-between items-start mb-1">
                          <span className={`text-[10px] font-bold ${
                            assignment.status === 'submitted' || assignment.status === 'approved' ? 'text-green-600' : 
                            assignment.type === 'OD' ? 'text-orange-600' :
                            assignment.color === 'pink' ? 'text-pink-600' : 'text-purple-600'
                          } uppercase`}>
                            {assignment.type}: {assignment.status === 'submitted' ? 'Completed' : assignment.status === 'approved' ? 'Approved' : assignment.type === 'OD' ? 'Pending Approval' : `Due in ${assignment.due}`}
                          </span>
                          {assignment.status === 'submitted' || assignment.status === 'approved' ? (
                            <CheckCircle size={12} className="text-green-500" />
                          ) : (
                            <AlertCircle className={`w-3 h-3 ${assignment.color === 'pink' ? 'text-pink-600 animate-pulse' : 'text-gray-400'}`} />
                          )}
                        </div>
                        <p className="text-sm font-bold text-gray-800">{assignment.title}</p>
                        
                        {assignment.type === 'Assignment' && (
                          <div className="mt-3 space-y-2">
                             {!assignment.file && assignment.status === 'pending' && (
                               <button 
                                 onClick={() => handleFileSelect(assignment.id)}
                                 className="w-full py-2 bg-pink-50 text-pink-600 rounded-lg text-xs font-bold border border-pink-200 hover:bg-pink-100 flex items-center justify-center gap-2"
                               >
                                 <Upload size={14} /> Upload PDF
                               </button>
                             )}
                             
                             {assignment.file && assignment.status === 'pending' && (
                                <div className="p-2 bg-gray-50 rounded-lg border border-gray-100 flex items-center justify-between">
                                   <div className="flex items-center gap-2 overflow-hidden">
                                      <File size={12} className="text-pink-500 flex-shrink-0" />
                                      <span className="text-[10px] font-bold text-gray-500 truncate">{assignment.file}</span>
                                   </div>
                                   <button onClick={() => handleFileSelect(assignment.id, true)} className="text-red-400 p-1 hover:bg-red-50 rounded-md transition-colors">
                                      <X size={12} />
                                   </button>
                                </div>
                             )}

                             <button 
                               disabled={assignment.status === 'submitted' || !assignment.file}
                               onClick={() => handleAssignmentSubmit(assignment.id)}
                               className={`w-full py-2 rounded-lg text-xs font-bold transition-all ${
                                 assignment.status === 'submitted' 
                                 ? 'bg-green-500 text-white cursor-default' 
                                 : assignment.file 
                                 ? 'bg-pink-500 text-white hover:shadow-xl hover:-translate-y-0.5' 
                                 : 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-60'
                               }`}
                             >
                               {assignment.status === 'submitted' ? 'Submitted' : 'Submit Now'}
                             </button>
                          </div>
                        )}
                     </div>
                   ))}
                   
                   <a 
                     href="https://ski-od-v7.netlify.app/" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="mt-4 w-full py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-2xl text-xs font-bold flex items-center justify-center gap-2 hover:shadow-lg transition-all"
                   >
                     🚀 Apply New OD
                   </a>
                </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
