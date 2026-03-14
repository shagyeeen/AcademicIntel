"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  GraduationCap, 
  Lock, 
  Mail, 
  ArrowRight, 
  ChevronLeft,
  Dna
} from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [role, setRole] = useState<'student' | 'teacher' | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      localStorage.setItem('userRole', role || '');
      localStorage.setItem('userEmail', email);
      
      // Mock session: link specific inputs to student profiles
      if (role === 'student') {
        let studentId = '727824tuit213'; // Default to Shagin
        if (email.toLowerCase().includes('tharika') || email.includes('244')) {
          studentId = '727824tuit244';
        } else if (email.toLowerCase().includes('sineshana') || email.includes('220')) {
          studentId = '727824tuit220';
        }
        localStorage.setItem('studentId', studentId);
        router.push('/dashboard/student');
      } else {
        router.push('/dashboard/teacher');
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden bg-white">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-pink-100 rounded-full blur-[120px] opacity-60" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-100 rounded-full blur-[120px] opacity-60" />

      <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 group">
        <div className="p-2 bg-white/50 rounded-lg group-hover:bg-white transition-all shadow-sm">
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </div>
        <span className="text-sm font-semibold text-gray-500 group-hover:text-gray-900 transition-all">Back to Home</span>
      </Link>

      <div className="w-full max-w-md relative z-10">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-tr from-pink-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-xl shadow-pink-200 mb-4 animate-float">
            <Dna className="text-white w-10 h-10" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">AcademicIntel <span className="text-pink-500">AI</span></h1>
          <p className="text-gray-500 mt-2">Intelligence for the future of learning</p>
        </div>

        <GlassCard className="p-8 border-2 border-white/60">
          <AnimatePresence mode="wait">
            {!role ? (
              <motion.div
                key="role-selection"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <h2 className="text-xl font-bold text-gray-800">Choose your role</h2>
                  <p className="text-gray-500 text-sm">Select how you want to experience the platform</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setRole('student')}
                    className="flex flex-col items-center justify-center p-6 bg-white/50 hover:bg-pink-50 border-2 border-transparent hover:border-pink-300 rounded-2xl transition-all group"
                  >
                    <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <GraduationCap className="w-6 h-6 text-pink-600" />
                    </div>
                    <span className="font-bold text-gray-700">Student</span>
                  </button>
                  <button
                    onClick={() => setRole('teacher')}
                    className="flex flex-col items-center justify-center p-6 bg-white/50 hover:bg-purple-50 border-2 border-transparent hover:border-purple-300 rounded-2xl transition-all group"
                  >
                    <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <User className="w-6 h-6 text-purple-600" />
                    </div>
                    <span className="font-bold text-gray-700">Teacher</span>
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="login-form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handleLogin}
                className="space-y-5"
              >
                <div className="flex items-center justify-between mb-6">
                  <button 
                    type="button"
                    onClick={() => setRole(null)}
                    className="flex items-center gap-1 text-xs font-bold text-pink-500 uppercase tracking-widest hover:text-pink-600 transition-all"
                  >
                    <ChevronLeft className="w-4 h-4" /> Change Role
                  </button>
                  <div className="px-3 py-1 rounded-full bg-pink-100 text-pink-600 text-[10px] font-bold uppercase tracking-widest">
                    {role} Access
                  </div>
                </div>

                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Welcome Back</h2>
                  <p className="text-gray-500 text-sm">Sign in to your portal</p>
                </div>

                <div className="space-y-4">
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      required
                      placeholder={role === 'student' ? "Student ID or Email" : "Teacher Email"}
                      className="w-full glass-input pl-12 h-12"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="password"
                      required
                      placeholder="Password"
                      className="w-full glass-input pl-12 h-12"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end">
                   <Link href="#" className="text-xs text-pink-500 hover:text-pink-600 font-semibold">Forgot Password?</Link>
                </div>

                <button
                  type="submit"
                  className="w-full glass-button h-12 flex items-center justify-center gap-2 group"
                >
                  Sign In <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="text-center mt-6">
                   <p className="text-xs text-gray-400">Need help? Contact <span className="text-pink-400 font-bold underline cursor-pointer">Support</span></p>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </GlassCard>
      </div>
    </div>
  );
}
