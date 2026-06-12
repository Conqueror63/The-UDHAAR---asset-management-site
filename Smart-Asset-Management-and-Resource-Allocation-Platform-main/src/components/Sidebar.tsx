"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  Boxes,
  ClipboardCheck,
  QrCode,
  FileText,
  LogOut,
  Menu,
  X,
  User,
  Users,
  Search,
  History,
} from "lucide-react";

interface SidebarProps {
  user: {
    name?: string | null;
    email?: string | null;
    role: string;
    section?: string | null;
    image?: string | null;
  };
}

export default function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isAdmin = user.role === "ADMIN";

  const consumerLinks = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Browse Assets", href: "/dashboard/browse", icon: Search },
    { name: "Borrow History", href: "/dashboard/history", icon: History },
    { name: "My Profile", href: "/dashboard/profile", icon: User },
  ];

  const adminLinks = [
    { name: "Overview", href: "/admin", icon: LayoutDashboard },
    { name: "Manage Inventory", href: "/admin/inventory", icon: Boxes },
    { name: "Booking Requests", href: "/admin/requests", icon: ClipboardCheck },
    { name: "Issue & Return", href: "/admin/operations", icon: QrCode },
    { name: "Manage Users", href: "/admin/users", icon: Users },
    { name: "System Logs", href: "/admin/audit", icon: FileText },
    { name: "My Profile", href: "/admin/profile", icon: User },
  ];

  const links = isAdmin ? adminLinks : consumerLinks;

  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <>
      {/* Mobile Toggle Bar */}
      <div className="lg:hidden w-full bg-[#0b0c10]/90 border-b border-slate-800/60 px-6 py-4 flex items-center justify-between z-30 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="p-1.5 rounded-lg bg-gradient-to-tr from-cyan-500 to-teal-500 shadow-md">
            <img src="/logo.png" alt="UDHAAR Logo" className="h-6 w-6 object-contain" />
          </div>
          <span className="font-extrabold text-lg text-white">UDHAAR</span>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-slate-400 hover:text-white bg-slate-900 border border-slate-800 rounded-xl cursor-pointer transition-colors"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar Drawer */}
      <aside
        className={`fixed inset-y-0 left-0 w-66 bg-[#07080c] lg:bg-transparent border-r lg:border-r-0 border-slate-800/80 lg:border-none flex flex-col justify-between z-50 transition-transform duration-300 lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"
          } lg:relative lg:flex lg:p-4`}
      >
        {/* Floating panel container on desktop */}
        <div className="flex flex-col flex-1 h-full bg-[#08090d] border border-slate-800/80 lg:rounded-2xl shadow-xl overflow-hidden justify-between">
          <div className="flex flex-col flex-1 py-7 px-5 overflow-y-auto">

            {/* Logo Header */}
            <div className="flex items-center justify-between gap-2.5 mb-9 pb-5 border-b border-slate-900">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-gradient-to-tr from-cyan-500 to-teal-500 shadow-lg shadow-cyan-500/10">
                  <img src="/logo.png" alt="UDHAAR Logo" className="h-6 w-6 object-contain" />
                </div>
                <span className="font-black text-base text-white tracking-tight flex flex-col">
                  UDHAAR
                  <span className="text-[10px] text-cyan-400 font-semibold uppercase tracking-wider">
                    IIT ROORKEE
                  </span>
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="lg:hidden p-1.5 text-slate-400 hover:text-white bg-slate-900 border border-slate-800 rounded-xl cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="space-y-1 flex-1">
              <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4 px-2">
                {isAdmin ? "Admin Console" : "Member Console"}
              </span>
              <div className="space-y-1.5">
                {links.map((link) => {
                  const Icon = link.icon;
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`group flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-all relative ${isActive
                          ? "bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 shadow-sm"
                          : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/50 border border-transparent"
                        }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <Icon className={`w-5 h-5 shrink-0 transition-transform group-hover:scale-105 duration-200 ${isActive ? "text-cyan-400" : "text-slate-500 group-hover:text-slate-300"}`} />
                        <span>{link.name}</span>
                      </div>

                      {/* Interactive indicator bar */}
                      {isActive && (
                        <span className="w-1.5 h-5 rounded-full bg-cyan-400 absolute right-0" />
                      )}
                    </Link>
                  );
                })}
              </div>
            </nav>
          </div>

          {/* User profile & Logout */}
          <div className="p-5 border-t border-slate-900 bg-[#06070a]">
            <div className="flex items-center gap-3 mb-4.5">
              {user.image ? (
                <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center shadow-lg shrink-0">
                  <img src={user.image} alt="Profile" className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center text-cyan-400 font-bold text-base shadow-inner shrink-0">
                  {user.name ? user.name.charAt(0).toUpperCase() : <User className="w-5 h-5" />}
                </div>
              )}
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-slate-200 truncate leading-snug">{user.name || "User"}</p>
                <p className="text-[11px] text-slate-500 truncate font-semibold uppercase tracking-wider">{user.section || "Council Member"}</p>
              </div>
              <div className="p-1 px-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[8px] font-extrabold uppercase tracking-widest scale-90 select-none">
                {user.role}
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-slate-900 border border-slate-850 hover:bg-slate-800 hover:border-slate-700 text-slate-400 hover:text-white rounded-xl text-[10px] font-extrabold tracking-widest uppercase transition-all duration-300 cursor-pointer shadow-sm"
            >
              <LogOut className="w-4.5 h-4.5" /> Log Out
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile drawer */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/70 backdrop-blur-md lg:hidden z-40 transition-opacity"
        />
      )}
    </>
  );
}
