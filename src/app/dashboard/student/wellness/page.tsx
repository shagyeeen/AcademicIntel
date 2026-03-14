"use client";

import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { GlassCard } from '@/components/ui/GlassCard';
import { 
  Heart, 
  Brain, 
  Battery, 
  Zap, 
  Smile, 
  Moon,
  TrendingUp,
  Activity,
  ArrowRight,
  CheckCircle,
  Coffee,
  Sun,
  Timer
} from 'lucide-react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer 
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';

const wellnessData = [
  { subject: 'Academic Load', A: 120, fullMark: 150 },
  { subject: 'Sleep', A: 98, fullMark: 150 },
  { subject: 'Social', A: 86, fullMark: 150 },
  { subject: 'Focus', A: 99, fullMark: 150 },
  { subject: 'Stress', A: 85, fullMark: 150 },
  { subject: 'Physical', A: 65, fullMark: 150 },
];

export default function WellnessPage() {
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [strategy, setStrategy] = React.useState<string | null>(null);

  const generateStrategy = () => {
    setIsGenerating(true);
    setStrategy(null);
    
    // Simulate AI thinking
    setTimeout(() => {
      setIsGenerating(false);
      setStrategy("Based on your 15% load increase: Take a 20-min 'Non-Sleep Deep Rest' (NSDR) break at 4 PM. Avoid screens during the break. Your next focus block will be 24% more efficient.");
    }, 1500);
  };

  return (
    <DashboardLayout role="student">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-pink-500 font-bold text-xs uppercase tracking-widest mb-2">
              <Heart size={14} /> AI Wellness Insight
            </div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight">Academic Wellness</h1>
            <p className="text-gray-500 mt-1">Holistic analysis of your mental and physical state vs. academic performance.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <GlassCard className="lg:col-span-2">
              <h3 className="font-extrabold text-gray-800 text-lg mb-8">Personal Equilibrium Radar</h3>
              <div className="h-[400px] w-full">
                 <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={wellnessData}>
                       <PolarGrid stroke="#f1f5f9" />
                       <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 'bold' }} />
                       <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                       <Radar
                         name="Shagin"
                         dataKey="A"
                         stroke="#f472b6"
                         fill="#f472b6"
                         fillOpacity={0.4}
                       />
                    </RadarChart>
                 </ResponsiveContainer>
              </div>
           </GlassCard>

           <div className="space-y-6">
              <GlassCard className="bg-gradient-to-br from-pink-500 to-purple-600 text-white border-none shadow-xl shadow-pink-200">
                 <div className="flex flex-col gap-6">
                    <div className="flex justify-between items-start">
                       <div className="p-3 bg-white/20 rounded-2xl">
                          <Zap size={24} />
                       </div>
                       <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Insight v1.2</span>
                    </div>
                    <div>
                       <h4 className="text-xl font-black mb-2">Burnout Warning</h4>
                       <p className="text-xs text-white/80 leading-relaxed font-medium">
                          Your "Academic Load" has increased by 15% this week. Focus levels remain high, but sleep quality is declining.
                       </p>
                    </div>
                    
                    <button 
                      onClick={generateStrategy}
                      disabled={isGenerating}
                      className="w-full py-3 bg-white text-pink-600 rounded-2xl text-xs font-black flex items-center justify-center gap-2 hover:bg-pink-50 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                       {isGenerating ? (
                         <>
                           <div className="w-4 h-4 border-2 border-pink-600 border-t-transparent rounded-full animate-spin" />
                           Analyzing...
                         </>
                       ) : (
                         <>
                           Generate Break Strategy <ArrowRight size={14} />
                         </>
                       )}
                    </button>

                    <AnimatePresence>
                       {strategy && (
                         <motion.div
                           initial={{ height: 0, opacity: 0 }}
                           animate={{ height: 'auto', opacity: 1 }}
                           exit={{ height: 0, opacity: 0 }}
                           className="overflow-hidden"
                         >
                            <div className="p-4 bg-white/10 rounded-2xl border border-white/20 space-y-3">
                               <div className="flex items-center gap-2 text-[10px] font-black uppercase text-white">
                                  <Brain size={12} /> AI Strategy
                               </div>
                               <p className="text-[11px] leading-relaxed font-bold italic">
                                  "{strategy}"
                               </p>
                               <div className="flex gap-2">
                                  <div className="flex items-center gap-1 text-[9px] bg-white text-pink-600 px-2 py-1 rounded-full font-black">
                                     <Timer size={10} /> 20 MINS
                                  </div>
                                  <div className="flex items-center gap-1 text-[9px] bg-pink-400/30 text-white px-2 py-1 rounded-full font-black">
                                     <Coffee size={10} /> RECHARGE
                                  </div>
                               </div>
                            </div>
                         </motion.div>
                       )}
                    </AnimatePresence>
                 </div>
              </GlassCard>

              <GlassCard>
                 <h4 className="font-extrabold text-gray-800 mb-6 flex items-center gap-2">
                    <Activity size={16} className="text-pink-500" /> Vital Metrics
                 </h4>
                 <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                       <div className="flex items-center gap-3">
                          <Moon className="text-blue-500" size={18} />
                          <span className="text-xs font-bold text-gray-600">Sleep Cycle</span>
                       </div>
                       <span className="text-sm font-black text-gray-900">6.2h</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                       <div className="flex items-center gap-3">
                          <Smile className="text-green-500" size={18} />
                          <span className="text-xs font-bold text-gray-600">Mood Avg.</span>
                          </div>
                       <span className="text-sm font-black text-gray-900">Positive</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                       <div className="flex items-center gap-3">
                          <Battery className="text-orange-500" size={18} />
                          <span className="text-xs font-bold text-gray-600">Social Battery</span>
                       </div>
                       <span className="text-sm font-black text-gray-900">42%</span>
                    </div>
                 </div>
              </GlassCard>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
