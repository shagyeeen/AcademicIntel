"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Activity, 
  UserCheck, 
  MessageCircle, 
  TrendingUp, 
  ArrowRight,
  ChevronRight,
  Shield,
  Wifi,
  BarChart3,
  Dna
} from 'lucide-react';
import Link from 'next/link';
import { GlassCard } from '@/components/ui/GlassCard';

export default function LandingPage() {
  const features = [
    {
      title: "Classroom Mood Detection",
      desc: "Real-time feedback on student engagement and lecture pace.",
      icon: <Activity className="w-8 h-8 text-pink-500" />,
    },
    {
      title: "Student Stress Analytics",
      desc: "AI-driven detection of academic burnout and stress levels.",
      icon: <Brain className="w-8 h-8 text-purple-500" />,
    },
    {
      title: "Smart Attendance",
      desc: "Secure, face-recognition based attendance with IP verification.",
      icon: <UserCheck className="w-8 h-8 text-blue-500" />,
    },
    {
      title: "Anonymous Doubt Exchange",
      desc: "Collaborative learning without fear of judgment.",
      icon: <MessageCircle className="w-8 h-8 text-green-500" />,
    },
    {
      title: "Assignment Workload Analyzer",
      desc: "Intelligent tracking of academic burden and deadlines.",
      icon: <BarChart3 className="w-8 h-8 text-orange-500" />,
    }
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center bg-white/30 backdrop-blur-xl border border-white/40 rounded-2xl px-8 py-3 shadow-lg">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-tr from-pink-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg shadow-pink-200">
              <Dna className="text-white w-6 h-6" />
            </div>
            <span className="font-bold text-xl tracking-tight text-gray-800">AcademicIntel <span className="text-pink-500">AI</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <Link href="#features" className="hover:text-pink-500 transition-colors">Features</Link>
            <Link href="#overview" className="hover:text-pink-500 transition-colors">Platform</Link>
            <Link href="/login" className="px-6 py-2 bg-pink-500 text-white rounded-xl shadow-lg hover:shadow-pink-200 hover:bg-pink-600 transition-all font-semibold">Join Now</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100/50 border border-pink-200 text-pink-600 text-sm font-semibold mb-8"
          >
            <Shield className="w-4 h-4" />
            <span>Next-Gen Academic Intelligence</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight tracking-tight"
          >
            AcademicIntel AI — <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">Smart Classroom</span> <br /> Intelligence Platform
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-600 mb-12 max-w-3xl leading-relaxed"
          >
            Empower educators and students with real-time analytics, stress monitoring, and AI-driven insights. Built for modern universities that prioritize mental health and academic excellence.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col md:flex-row gap-4 mb-20"
          >
            <Link href="/login" className="glass-button text-lg px-10 py-4 flex items-center gap-2">
              Explore Dashboard <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="#overview" className="glass-button-secondary text-lg px-10 py-4">
              Watch Demo
            </Link>
          </motion.div>

          {/* Floating Cards Display */}
          <div className="relative w-full max-w-5xl h-[400px]">
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="absolute top-0 left-0"
            >
              <GlassCard className="w-64">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-sm font-semibold">Class Engagement</span>
                </div>
                <div className="h-16 w-full bg-green-50 rounded-lg relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-around">
                    {[40, 70, 45, 90, 65, 80].map((h, i) => (
                      <div key={i} className="w-2 bg-green-400 rounded-t-sm" style={{ height: `${h}%` }} />
                    ))}
                  </div>
                </div>
                <div className="mt-4 text-xs text-gray-500">Engagement up 12% today</div>
              </GlassCard>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 20, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1 }}
              className="absolute top-20 right-0"
            >
              <GlassCard className="w-64">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center">
                    <Brain className="w-4 h-4 text-pink-600" />
                  </div>
                  <span className="text-sm font-semibold">Burnout Risk</span>
                </div>
                <div className="flex items-end gap-2 px-2">
                  <span className="text-3xl font-bold">Low</span>
                  <span className="text-sm text-green-500 mb-1 tracking-tight">Stable</span>
                </div>
                <div className="mt-4 w-full h-2 bg-gray-100 rounded-full">
                  <div className="w-1/3 h-full bg-green-400 rounded-full" />
                </div>
              </GlassCard>
            </motion.div>

            <motion.div 
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute bottom-0 left-1/4"
            >
              <GlassCard className="w-80">
                <div className="text-left">
                  <div className="flex items-center gap-2 mb-4">
                    <MessageCircle className="w-5 h-5 text-purple-500" />
                    <span className="text-sm font-semibold">Live Doubts</span>
                  </div>
                  <div className="space-y-3">
                    <div className="p-2 bg-white/50 rounded-lg text-xs leading-relaxed">
                      "How do we optimize LLM context usage?"
                      <div className="flex justify-between mt-1 text-[10px] text-gray-400">
                        <span>#AI</span> <span>2 mins ago</span>
                      </div>
                    </div>
                    <div className="p-2 bg-purple-50 rounded-lg text-xs leading-relaxed border border-purple-100">
                      "Check the sliding window attention paper."
                      <div className="flex justify-between mt-1 text-[10px] text-purple-400">
                        <span>Top Answer</span> <span>Verified</span>
                      </div>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Intelligent Classroom Features</h2>
            <p className="text-gray-600">Everything you need to manage a digital-first classroom.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -10 }}
                className="group"
              >
                <GlassCard className="h-full">
                  <div className="p-3 bg-white w-fit rounded-2xl shadow-sm mb-6 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">{feature.desc}</p>
                  <div className="flex items-center gap-2 text-pink-500 font-semibold cursor-pointer group-hover:gap-4 transition-all">
                    Learn more <ChevronRight className="w-4 h-4" />
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Overview */}
      <section id="overview" className="py-24 px-6 bg-pink-50/50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Built for Modern Universities</h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              AcademicIntel AI bridges the gap between students and teachers through transparent, data-driven communication. We focus on the "Human" in the learning process by monitoring emotional and mental wellbeing alongside academic performance.
            </p>
            <div className="space-y-6">
              {[
                { title: "WiFi Restricted Attendance", desc: "Prevents proxy attendance with network verification.", icon: <Wifi className="w-5 h-5" /> },
                { title: "IP-Locked Mood Votes", desc: "Ensures genuine feedback from students in the lecture.", icon: <Shield className="w-5 h-5" /> },
                { title: "Profanity Detection", desc: "Keeps the anonymous exchange professional and safe.", icon: <MessageCircle className="w-5 h-5" /> }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-pink-500">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">{item.title}</h4>
                    <p className="text-gray-500 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
             <div className="absolute inset-0 bg-pink-400/20 blur-[100px] rounded-full" />
             <GlassCard className="relative p-0 overflow-hidden border-2 border-white/60">
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" 
                  alt="Dashboard Preview" 
                  className="w-full h-auto opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-pink-500/20 to-transparent" />
             </GlassCard>
          </div>
        </div>
      </section>

      {/* Footer / CTA */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <GlassCard className="bg-gradient-to-br from-pink-500 to-purple-600 p-12 border-none">
            <h2 className="text-4xl font-bold text-white mb-6">Ready to transform your classroom?</h2>
            <p className="text-pink-100 mb-10 text-lg">Join 500+ universities worldwide using AcademicIntel AI.</p>
            <div className="flex justify-center gap-4">
               <Link href="/login" className="bg-white text-pink-600 px-10 py-4 rounded-xl font-bold shadow-xl hover:scale-105 active:scale-95 transition-all">Get Started Free</Link>
            </div>
          </GlassCard>
        </div>
        <div className="text-center mt-20 text-gray-400 text-sm">
          © 2026 AcademicIntel AI. All rights reserved. Built with ❤️ for Education.
        </div>
      </section>
    </div>
  );
}
