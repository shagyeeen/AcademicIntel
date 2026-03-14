"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { GlassCard } from '@/components/ui/GlassCard';
import FaceScanner from '@/components/dashboard/FaceScanner';
import { 
  Calendar, 
  Clock, 
  ShieldCheck, 
  Info, 
  History,
  CheckCircle2,
  XCircle,
  FileText
} from 'lucide-react';

export default function AttendancePage() {
  const [lastVerified, setLastVerified] = useState<any>(null);
  const [currentUserId, setCurrentUserId] = useState<string>('727824tuit213');

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedId = localStorage.getItem('studentId');
      if (storedId) setCurrentUserId(storedId);
    }
  }, []);

  const attendanceHistory = [
    { date: 'Mar 12, 2026', time: '10:45 AM', subject: 'Advanced AI Systems', status: 'Present', type: 'Biometric' },
    { date: 'Mar 11, 2026', time: '09:00 AM', subject: 'Neural Networks', status: 'Present', type: 'Biometric' },
    { date: 'Mar 10, 2026', time: '01:30 PM', subject: 'Ethics in AI', status: 'Late', type: 'Manual' },
    { date: 'Mar 09, 2026', time: '10:45 AM', subject: 'Advanced AI Systems', status: 'Present', type: 'Biometric' },
  ];

  return (
    <DashboardLayout role="student">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-pink-500 font-bold text-xs uppercase tracking-widest mb-2">
              <ShieldCheck size={14} /> EyeTrace Verification System
            </div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight">Smart Attendance</h1>
            <p className="text-gray-500 mt-1">Verify your identity using 3D facial mesh analysis to mark your attendance.</p>
          </div>
          <div className="flex p-1 bg-gray-100 rounded-2xl border border-gray-200">
            <button className="px-4 py-2 bg-white rounded-xl text-xs font-bold text-gray-800 shadow-sm">Live Scan</button>
            <button className="px-4 py-2 text-xs font-bold text-gray-500 hover:text-gray-800 transition-colors">History</button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Scanner Section */}
          <div className="lg:col-span-8 space-y-6">
            <AnimatePresence>
              {lastVerified && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="bg-green-500 rounded-[32px] p-8 text-white flex items-center justify-between mb-8 shadow-2xl shadow-green-200 border-4 border-white/20">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 rounded-3xl bg-white/20 flex items-center justify-center text-white scale-110 shadow-lg">
                        <CheckCircle2 size={32} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60 mb-1">Attendance Synchronized</p>
                        <h2 className="text-3xl font-black tracking-tighter">Verified: {lastVerified.name}</h2>
                        <p className="text-sm font-bold opacity-80 mt-1 uppercase tracking-widest">{lastVerified.id} // SEC-A</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setLastVerified(null)}
                      className="px-6 py-2 bg-white text-green-600 rounded-xl text-xs font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all"
                    >
                      Dismiss
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <GlassCard className="p-0 overflow-hidden border-4 border-white">
              <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white/50">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-pink-500 flex items-center justify-center text-white">
                       <ShieldCheck size={20} />
                    </div>
                    <div>
                       <h3 className="font-extrabold text-gray-800 text-lg">Identity Verification</h3>
                       <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Secure Biometric Node // 104.92.11.4</p>
                    </div>
                 </div>
                 <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-full border border-green-100 text-green-600">
                    <CheckCircle2 size={12} />
                    <span className="text-[10px] font-bold uppercase">System Online</span>
                 </div>
              </div>
              <div className="p-8">
                <FaceScanner 
                  onVerified={(s) => setLastVerified(s)} 
                  expectedStudentId={currentUserId}
                />
              </div>
              <div className="px-8 py-4 bg-gray-50/50 border-t border-gray-100 flex items-center gap-4">
                 <Info className="text-gray-400" size={16} />
                 <p className="text-[10px] font-bold text-gray-400 uppercase leading-normal">
                    Privacy Note: Facial data is processed locally and discarded after high-dimension vector comparison. 
                    No raw images are stored on our servers.
                 </p>
              </div>
            </GlassCard>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
               <div className="p-5 bg-white rounded-3xl border border-gray-100 shadow-sm">
                  <div className="w-8 h-8 rounded-lg bg-pink-100 flex items-center justify-center text-pink-600 mb-3">
                     <Calendar size={16} />
                  </div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase">Monthly Attendance</p>
                  <p className="text-2xl font-black text-gray-900">94.8%</p>
               </div>
               <div className="p-5 bg-white rounded-3xl border border-gray-100 shadow-sm">
                  <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600 mb-3">
                     <Clock size={16} />
                  </div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase">Avg. Arrival Time</p>
                  <p className="text-2xl font-black text-gray-900">10:42 AM</p>
               </div>
               <div className="p-5 bg-white rounded-3xl border border-gray-100 shadow-sm">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 mb-3">
                     <History size={16} />
                  </div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase">Classes Today</p>
                  <p className="text-2xl font-black text-gray-900">4 / 4</p>
               </div>
            </div>
          </div>

          {/* Sidebar / Logs */}
          <div className="lg:col-span-4 space-y-6">
            <GlassCard>
              <h3 className="font-extrabold text-gray-800 mb-6 flex items-center gap-2">
                <FileText size={18} className="text-pink-500" /> Recent Activity
              </h3>
              <div className="space-y-4">
                {attendanceHistory.map((log, idx) => (
                  <div key={idx} className="flex gap-4 p-4 bg-gray-50 rounded-2xl border border-white hover:border-pink-200 transition-all">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      log.status === 'Present' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'
                    }`}>
                      {log.status === 'Present' ? <CheckCircle2 size={18} /> : <Clock size={18} />}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-gray-800">{log.subject}</h4>
                      <p className="text-[10px] text-gray-500 font-medium">{log.date} ∙ {log.time}</p>
                      <div className="flex items-center gap-2 mt-2">
                         <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold ${
                           log.status === 'Present' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                         }`}>{log.status}</span>
                         <span className="text-[8px] font-bold text-gray-300 uppercase tracking-widest">{log.type}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-6 py-3 border-2 border-dashed border-gray-200 rounded-2xl text-[10px] font-bold text-gray-400 uppercase hover:bg-gray-50 transition-all">
                Export Full Report
              </button>
            </GlassCard>

            <div className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-[32px] text-white relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/20 rounded-full blur-3xl -mr-16 -mt-16" />
               <h4 className="font-bold text-sm mb-2">Need Help?</h4>
               <p className="text-xs text-gray-400 mb-6 font-medium leading-relaxed">
                  If the scanner fails to recognize you, please contact the academic office for a manual override.
               </p>
               <button className="w-full py-3 bg-white text-gray-900 rounded-2xl text-xs font-bold hover:shadow-xl transition-all">
                  Open Support Ticket
               </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
