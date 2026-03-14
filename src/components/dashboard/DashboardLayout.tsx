"use client";

import React, { useState } from 'react';
import { 
  Dna, 
  LayoutDashboard, 
  BookOpen, 
  MessageSquare, 
  BarChart3, 
  Settings, 
  LogOut, 
  Bell, 
  User,
  Search,
  Menu,
  X,
  Activity,
  UserCheck
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  active?: boolean;
}

const SidebarItem = ({ icon, label, href, active }: SidebarItemProps) => (
  <Link href={href}>
    <div className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${
      active 
      ? 'bg-pink-500 text-white shadow-lg shadow-pink-200' 
      : 'text-gray-500 hover:bg-white hover:text-pink-500'
    }`}>
      <div className={`transition-transform duration-300 ${active ? '' : 'group-hover:scale-110'}`}>
        {icon}
      </div>
      <span className="font-semibold text-sm">{label}</span>
    </div>
  </Link>
);

export default function DashboardLayout({ children, role }: { children: React.ReactNode, role: 'student' | 'teacher' }) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

  const studentItems = [
    { icon: <LayoutDashboard size={20} />, label: "Dashboard", href: "/dashboard/student" },
    { icon: <BookOpen size={20} />, label: "Assignments", href: "#" },
    { icon: <MessageSquare size={20} />, label: "Doubt Exchange", href: "/dashboard/student/doubts" },
    { icon: <UserCheck size={20} />, label: "Smart Attendance", href: "/dashboard/student/attendance" },
    { icon: <Activity size={20} />, label: "My Wellness", href: "/dashboard/student/wellness" },
  ];

  const teacherItems = [
    { icon: <LayoutDashboard size={20} />, label: "Class Overview", href: "/dashboard/teacher" },
    { icon: <BarChart3 size={20} />, label: "Class Analytics", href: "/dashboard/teacher/analytics" },
    { icon: <MessageSquare size={20} />, label: "Doubts Monitoring", href: "/dashboard/teacher/doubts" },
    { icon: <Settings size={20} />, label: "Class Settings", href: "#" },
  ];

  const navItems = role === 'student' ? studentItems : teacherItems;

  return (
    <div className="min-h-screen bg-white flex overflow-hidden">
      {/* Sidebar */}
      <aside 
        className={`${
          isSidebarOpen ? 'w-64' : 'w-20'
        } fixed h-full z-40 bg-white/40 backdrop-blur-xl border-r border-white/40 transition-all duration-500 flex flex-col`}
      >
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-tr from-pink-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg shadow-pink-200 flex-shrink-0">
            <Dna className="text-white w-6 h-6" />
          </div>
          {isSidebarOpen && (
            <span className="font-bold text-lg text-gray-800 tracking-tight whitespace-nowrap">AcademicIntel</span>
          )}
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2">
          {navItems.map((item, idx) => (
            <SidebarItem 
              key={idx} 
              {...item} 
              active={pathname === item.href} 
            />
          ))}
        </nav>

        <div className="p-4 mt-auto">
          <SidebarItem 
            icon={<LogOut size={20} />} 
            label="Logout" 
            href="/login" 
          />
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-500 ${isSidebarOpen ? 'ml-64' : 'ml-20'} relative`}>
        {/* Background Decorative Blurs */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-pink-50 rounded-full blur-[100px] -z-10" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-50 rounded-full blur-[100px] -z-10" />

        {/* Topbar */}
        <header className="h-20 border-b border-white/40 flex items-center justify-between px-8 bg-white/30 backdrop-blur-md sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-white/50 rounded-lg transition-all"
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Search analytics..." 
                className="bg-white/50 border border-white/40 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200 w-64"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="p-2 bg-white/50 border border-white/40 rounded-xl relative cursor-pointer hover:bg-white transition-all">
              <Bell size={20} className="text-gray-600" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-pink-500 rounded-full border border-white"></span>
            </div>
            <div className="flex items-center gap-3 p-1.5 pr-4 bg-white/50 border border-white/40 rounded-2xl hover:bg-white transition-all cursor-pointer">
              <div className="w-8 h-8 rounded-lg bg-pink-100 flex items-center justify-center text-pink-600">
                <User size={20} />
              </div>
              <div className="hidden sm:block">
                <p className="text-xs font-bold text-gray-800">{role === 'student' ? 'STU-10492' : 'PROF-2940'}</p>
                <p className="text-[10px] text-gray-500 leading-none">Settings</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
