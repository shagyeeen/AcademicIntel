"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Users, Brain, Activity, Shield, Maximize2, AlertCircle, RefreshCw, Upload } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';

interface StudentIndicator {
  id: number;
  x: number;
  y: number;
  mood: 'Focused' | 'Confused' | 'Bored' | 'Distracted';
  attention: number;
}

const students: StudentIndicator[] = [
  { id: 1, x: 25, y: 35, mood: 'Focused', attention: 92 },
  { id: 2, x: 45, y: 38, mood: 'Focused', attention: 88 },
  { id: 3, x: 65, y: 34, mood: 'Confused', attention: 45 },
  { id: 4, x: 30, y: 55, mood: 'Focused', attention: 95 },
  { id: 5, x: 55, y: 58, mood: 'Bored', attention: 20 },
  { id: 6, x: 75, y: 56, mood: 'Focused', attention: 89 },
  { id: 7, x: 20, y: 75, mood: 'Distracted', attention: 10 },
  { id: 8, x: 40, y: 72, mood: 'Focused', attention: 91 },
  { id: 9, x: 60, y: 78, mood: 'Confused', attention: 35 },
  { id: 10, x: 80, y: 71, mood: 'Focused', attention: 87 },
];

export default function ClassroomCCTV() {
  const [isScanning, setIsScanning] = useState(true);
  const [activeStudent, setActiveStudent] = useState<StudentIndicator | null>(null);
  const [scanPulse, setScanPulse] = useState(0);
  const [groqInsight, setGroqInsight] = useState<string | null>(null);
  const [isProfiling, setIsProfiling] = useState(false);
  const [customImage, setCustomImage] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setScanPulse(prev => (prev + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case 'Focused': return 'bg-green-500';
      case 'Confused': return 'bg-yellow-500';
      case 'Bored': return 'bg-orange-500';
      case 'Distracted': return 'bg-red-500';
      default: return 'bg-blue-500';
    }
  };

  const runGroqAnalysis = async (imgBase64?: string) => {
    setIsProfiling(true);
    setGroqInsight("Neural networks processing image feed...");
    try {
      let payloadImg = imgBase64;
      
      if (!payloadImg) {
        const imgResp = await fetch('/classroom.png');
        const blob = await imgResp.blob();
        const reader = new FileReader();
        payloadImg = await new Promise<string>((resolve) => {
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(blob);
        });
      }

      const aiResponse = await fetch('/api/ai-proxy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: imgBase64 
            ? "CRITICAL ANALYSIS: Provide a comprehensive deep-dive into the classroom image. Analyze student postures, facial expressions, and overall social dynamics. Are they sleeping, bored, or engaged? Report the 'Vibe' and 'Engagement %' with detailed reasoning. Your response MUST be between 150 to 200 words."
            : "CCTV VISION SCAN: Analyze Section-A in detail. Monitor for signs of burnout, sleeping students, and active engagement. Provide a holistic overview of the classroom atmosphere and suggest immediate environmental improvements. Your response MUST be between 150 to 200 words.",
          images: [payloadImg]
        })
      });

      const data = await aiResponse.json();
      
      if (data.choices && data.choices.length > 0) {
        setGroqInsight(data.choices[0].message.content);
      } else if (data.error) {
        setGroqInsight(`AI System Error: ${data.error.message || data.error}`);
      } else {
        setGroqInsight("AI Link Active but returned no analysis.");
      }
    } catch (err) {
      console.error("Teacher Groq Error:", err);
      setGroqInsight("AI Link Interrupted. Using local heuristic data.");
    } finally {
      setIsProfiling(false);
    }
  };

  const handleCustomUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setCustomImage(base64);
        runGroqAnalysis(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <GlassCard className="lg:col-span-3 overflow-hidden relative border-2 border-white/60 p-0">
      <div className="flex flex-col md:flex-row h-[500px]">
        {/* CCTV Feed */}
        <div className="flex-1 relative bg-black group overflow-hidden">
          <img 
            src={customImage || "/classroom.png"} 
            alt="Classroom CCTV Feed" 
            className="w-full h-full object-cover opacity-80"
          />
          
          {/* Scanning Line Overlay */}
          <motion.div 
            className="absolute left-0 right-0 h-1 bg-pink-500/50 shadow-[0_0_15px_rgba(244,114,182,0.8)] z-10"
            animate={{ top: ['0%', '100%', '0%'] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          />

          {/* AI Detection Layers */}
          <div className="absolute inset-0 z-10">
            {students.map((student) => (
              <motion.div
                key={student.id}
                className="absolute"
                style={{ left: `${student.x}%`, top: `${student.y}%` }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.2 }}
                onClick={() => setActiveStudent(student)}
              >
                <div className="relative cursor-pointer">
                  {/* Bounding Box Simulation */}
                  <div className={`w-8 h-8 md:w-12 md:h-12 border-2 rounded-lg ${getMoodColor(student.mood).replace('bg-', 'border-')} opacity-60 flex items-center justify-center`}>
                    <div className={`w-1 h-1 rounded-full ${getMoodColor(student.mood)} animate-ping`} />
                  </div>
                  
                  {/* Mini Stats Label */}
                  <div className={`absolute -top-6 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded text-[8px] font-bold text-white whitespace-nowrap ${getMoodColor(student.mood)} shadow-lg`}>
                    {student.attention}% {student.mood}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Interface Overlays */}
          <div className="absolute top-4 left-4 flex flex-col gap-2 z-20">
            <div className="flex items-center gap-2 bg-red-500 px-3 py-1 rounded-full animate-pulse shadow-lg shadow-red-500/20">
              <Camera className="w-3 h-3 text-white" />
              <span className="text-[10px] font-bold text-white uppercase tracking-widest">Live Feed // SEC-A</span>
            </div>
            <div className="bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-mono text-green-400 border border-green-500/30">
              BIT_RATE: 4.2 Mbps
            </div>
          </div>

          <div className="absolute bottom-4 right-4 z-20 flex gap-2">
             <input 
               type="file" 
               id="cctv-upload" 
               hidden 
               accept="image/*" 
               onChange={handleCustomUpload} 
             />
             <label 
               htmlFor="cctv-upload"
               className="p-2 bg-pink-500/80 hover:bg-pink-600 backdrop-blur-xl rounded-xl border border-white/20 text-white transition-all cursor-pointer flex items-center gap-2 text-xs font-bold"
             >
                <Upload size={14} /> Upload View
             </label>
             <button className="p-2 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-xl border border-white/20 text-white transition-all">
                <Maximize2 size={18} />
             </button>
          </div>
        </div>

        {/* Intelligence Sidebar */}
        <div className="w-full md:w-80 bg-white/10 backdrop-blur-2xl border-l border-white/20 p-6 flex flex-col gap-6 overflow-y-auto">
          <div>
             <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Brain className="w-4 h-4 text-pink-500" /> Vision Intel
             </h3>
             <div className="grid grid-cols-1 gap-4">
                <div className="p-4 bg-white/50 rounded-2xl border border-white/40">
                   <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Avg. Attention</p>
                   <div className="flex items-end gap-2">
                      <span className="text-3xl font-bold text-gray-900">74%</span>
                      <span className="text-[10px] font-bold text-green-500 mb-1.5">+12% vs last lecture</span>
                   </div>
                   <div className="mt-2 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-pink-500" style={{ width: '74%' }} />
                   </div>
                </div>

                <div className="p-4 bg-white/50 rounded-2xl border border-white/40">
                   <div className="flex justify-between items-start mb-1">
                      <p className="text-[10px] font-bold text-gray-400 uppercase">Cloud AI Perspective</p>
                      {isProfiling && <RefreshCw className="w-3 h-3 text-pink-500 animate-spin" />}
                   </div>
                    <div className="text-[10px] font-medium text-gray-700 leading-normal py-2 space-y-2 max-h-[250px] overflow-y-auto custom-scrollbar">
                       {groqInsight ? (
                         groqInsight.split('\n\n').map((para, i) => (
                           <p key={i}>
                             {para.split(/(\*\*.*?\*\*)/).map((part, j) => 
                               part.startsWith('**') && part.endsWith('**') 
                               ? <strong key={j} className="text-pink-600 font-bold">{part.slice(2, -2)}</strong> 
                               : part
                             )}
                           </p>
                         ))
                       ) : (
                         <span className="italic text-gray-400">Awaiting neural analysis trigger...</span>
                       )}
                    </div>
                    {(!groqInsight || customImage) && !isProfiling && (
                       <button 
                         onClick={() => runGroqAnalysis(customImage || undefined)}
                         className="mt-3 w-full py-1.5 bg-pink-500 text-white rounded-lg text-[9px] font-black uppercase tracking-tighter hover:bg-pink-600 transition-colors flex items-center justify-center gap-2"
                       >
                          {customImage ? <RefreshCw size={10} /> : <Brain size={10} />}
                          {customImage ? "Re-Analyze Custom Feed" : "Request AI Snapshot"}
                       </button>
                    )}
                    {customImage && (
                      <button 
                        onClick={() => { setCustomImage(null); setGroqInsight(null); }}
                        className="mt-2 w-full py-1.5 bg-gray-100 text-gray-600 rounded-lg text-[9px] font-black uppercase tracking-tighter hover:bg-gray-200 transition-colors"
                      >
                        Reset to Default
                      </button>
                    )}
                </div>
             </div>
          </div>

          <AnimatePresence mode="wait">
            {activeStudent ? (
              <motion.div
                key="student-detail"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="p-4 bg-pink-500 rounded-2xl shadow-xl shadow-pink-200 text-white relative overflow-hidden"
              >
                <button 
                  onClick={() => setActiveStudent(null)}
                  className="absolute top-2 right-2 text-white/60 hover:text-white"
                >
                  <AlertCircle size={16} />
                </button>
                <div className="flex items-center gap-3 mb-4">
                   <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                      <Users className="w-6 h-6" />
                   </div>
                   <div>
                      <p className="text-xs font-bold uppercase tracking-widest opacity-70">Entity ID</p>
                      <p className="font-bold">STU-{activeStudent.id}2049</p>
                   </div>
                </div>
                <div className="space-y-3">
                   <div className="flex justify-between items-center text-xs">
                      <span className="opacity-70 font-semibold">Live Mood:</span>
                      <span className="bg-white/20 px-2 py-0.5 rounded-full font-bold">{activeStudent.mood}</span>
                   </div>
                   <div className="flex justify-between items-center text-xs">
                      <span className="opacity-70 font-semibold">Attention:</span>
                      <span className="font-bold text-lg">{activeStudent.attention}%</span>
                   </div>
                   <div className="h-1 w-full bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full bg-white" style={{ width: `${activeStudent.attention}%` }} />
                   </div>
                </div>
                <button className="mt-4 w-full py-2 bg-white text-pink-500 rounded-xl text-xs font-bold hover:bg-pink-50 transition-colors">
                   View History
                </button>
              </motion.div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center opacity-40">
                 <Shield size={48} className="text-gray-400 mb-2" />
                 <p className="text-xs font-bold text-gray-500">Tap a detection box to inspect student analytics</p>
              </div>
            )}
          </AnimatePresence>

          <div className="mt-auto">
             <button className="w-full glass-button py-3 text-xs flex items-center justify-center gap-2">
                <Users className="w-4 h-4" /> Download Intelligence Report
             </button>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
