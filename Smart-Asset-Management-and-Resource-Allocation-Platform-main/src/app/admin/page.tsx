"use client";

import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import { getDashboardAnalytics } from "../actions/analytics";
import {
  Boxes,
  ClipboardCheck,
  AlertTriangle,
  Clock,
  ArrowRight,
  TrendingUp,
  Activity,
  Layers,
  Loader2,
  CheckCircle,
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  Cell,
  CartesianGrid,
} from "recharts";
import Link from "next/link";

interface AnalyticsData {
  cards: {
    totalAssets: number;
    totalItems: number;
    availableItems: number;
    totalBookings: number;
    activeBookings: number;
    overdueReturns: number;
    pendingApprovals: number;
  };
  topAssets: { name: string; bookingCount: number; totalQuantityBooked: number }[];
  categoryStats: {
    category: string;
    totalQuantity: number;
    availableQuantity: number;
    utilizedQuantity: number;
    utilizationRate: number;
  }[];
  trends: { date: string; bookings: number }[];
  activeAllocations: any[];
  overdueList: any[];
}

export default function AdminDashboard() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  const loadAnalytics = async () => {
    setLoading(true);
    try {
      const res = await getDashboardAnalytics();
      if (res.success && res.data) {
        setData(res.data as any);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAnalytics();
  }, []);

  const COLORS = ["#06b6d4", "#14b8a6", "#3b82f6", "#10b981", "#f59e0b", "#ec4899"];

  if (loading) {
    return (
      <div className="flex-1 flex flex-col min-h-screen bg-[#030407]">
        <Header title="Admin Overview" />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin text-cyan-500 mx-auto mb-4" />
            <p className="text-slate-500 text-sm font-semibold">Gathering utilization analytics...</p>
          </div>
        </div>
      </div>
    );
  }

  const cards = data?.cards || {
    totalAssets: 0,
    totalItems: 0,
    availableItems: 0,
    totalBookings: 0,
    activeBookings: 0,
    overdueReturns: 0,
    pendingApprovals: 0,
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#030407]">
      <Header title="Overview" />

      <main className="flex-1 p-6 lg:p-8 space-y-8 max-w-7xl mx-auto w-full">
        {/* Analytics Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Assets */}
          <div className="p-6 rounded-2xl bg-[#08090d]/60 border border-slate-800/80 backdrop-blur-md flex items-center gap-5 shadow-lg">
            <div className="p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <Boxes className="w-5.5 h-5.5" />
            </div>
            <div>
              <p className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">Total Assets</p>
              <h3 className="text-2xl font-black text-white mt-1">
                {cards.totalAssets} <span className="text-xs text-slate-500 font-bold">({cards.totalItems} items)</span>
              </h3>
            </div>
          </div>

          {/* Pending Approvals */}
          <div className="p-6 rounded-2xl bg-[#08090d]/60 border border-slate-800/80 backdrop-blur-md flex items-center gap-5 shadow-lg">
            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <ClipboardCheck className="w-5.5 h-5.5" />
            </div>
            <div>
              <p className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">Pending Approvals</p>
              <h3 className="text-2xl font-black text-white mt-1">{cards.pendingApprovals}</h3>
            </div>
          </div>

          {/* Active Allocations */}
          <div className="p-6 rounded-2xl bg-[#08090d]/60 border border-slate-800/80 backdrop-blur-md flex items-center gap-5 shadow-lg">
            <div className="p-3.5 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400">
              <Activity className="w-5.5 h-5.5" />
            </div>
            <div>
              <p className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">Active Bookings</p>
              <h3 className="text-2xl font-black text-white mt-1">{cards.activeBookings}</h3>
            </div>
          </div>

          {/* Overdue Returns */}
          <div className="p-6 rounded-2xl bg-[#08090d]/60 border border-slate-800/80 backdrop-blur-md flex items-center gap-5 shadow-lg">
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-450">
              <AlertTriangle className="w-5.5 h-5.5" />
            </div>
            <div>
              <p className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">Overdue Returns</p>
              <h3 className="text-2xl font-black text-white mt-1">{cards.overdueReturns}</h3>
            </div>
          </div>
        </div>

        {/* Charts & Trends Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Booking Trends Line Chart */}
          <div className="p-6 rounded-2xl bg-[#08090d]/60 border border-slate-800/80 backdrop-blur-md space-y-5 shadow-lg">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4.5 h-4.5 text-cyan-400" />
              <h3 className="font-extrabold text-sm text-white uppercase tracking-wider">Booking Requests Trend (Last 7 Days)</h3>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data?.trends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#12141c" />
                  <XAxis dataKey="date" stroke="#465375" fontSize={10} fontStyle="semibold" />
                  <YAxis stroke="#465375" fontSize={10} fontStyle="semibold" allowDecimals={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#08090d", borderColor: "#181b24", borderRadius: "12px", fontSize: "12px", color: "#fff" }}
                    itemStyle={{ color: "#06b6d4" }}
                  />
                  <Line type="monotone" dataKey="bookings" stroke="#06b6d4" strokeWidth={3} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Frequently Utilized Assets Bar Chart */}
          <div className="p-6 rounded-2xl bg-[#08090d]/60 border border-slate-800/80 backdrop-blur-md space-y-5 shadow-lg">
            <div className="flex items-center gap-2">
              <Layers className="w-4.5 h-4.5 text-teal-400" />
              <h3 className="font-extrabold text-sm text-white uppercase tracking-wider">Most Frequently Utilized Assets</h3>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data?.topAssets} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#12141c" />
                  <XAxis dataKey="name" stroke="#465375" fontSize={9} fontStyle="semibold" interval={0} tickFormatter={(val) => val.split(" ")[0]} />
                  <YAxis stroke="#465375" fontSize={10} fontStyle="semibold" allowDecimals={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#08090d", borderColor: "#181b24", borderRadius: "12px", fontSize: "12px", color: "#fff" }}
                  />
                  <Bar dataKey="bookingCount" name="Bookings Count" fill="#06b6d4" radius={[6, 6, 0, 0]}>
                    {data?.topAssets.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Categories & Allocations */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Category Utilization Rates (Progress indicators) */}
          <div className="p-6 rounded-2xl bg-[#08090d]/60 border border-slate-800/80 backdrop-blur-md space-y-6 shadow-lg">
            <h3 className="font-extrabold text-sm text-white uppercase tracking-wider">Asset Utilization by Category</h3>
            <div className="space-y-5">
              {data?.categoryStats.map((stat, i) => (
                <div key={stat.category} className="space-y-2.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-350">{stat.category}</span>
                    <span className="text-slate-450">
                      {stat.utilizedQuantity} / {stat.totalQuantity} items ({stat.utilizationRate}%)
                    </span>
                  </div>
                  {/* Slider Progress Indicator */}
                  <div className="w-full h-2 bg-slate-950 border border-slate-900 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-teal-500"
                      style={{ width: `${stat.utilizationRate}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Overdue Returns List */}
          <div className="lg:col-span-2 p-6 rounded-2xl bg-[#08090d]/60 border border-slate-800/80 backdrop-blur-md space-y-5 shadow-lg">
            <div className="flex justify-between items-center">
              <h3 className="font-extrabold text-sm text-white uppercase tracking-wider">Critical Overdue Returns</h3>
              <Link
                href="/admin/operations"
                className="text-xs text-cyan-400 hover:text-cyan-300 font-extrabold hover:underline flex items-center gap-1 group cursor-pointer transition-colors"
              >
                Scan Returns <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            {data?.overdueList.length === 0 ? (
              <div className="py-14 text-center bg-slate-950/40 border border-dashed border-slate-900 rounded-2xl">
                <CheckCircle className="w-8 h-8 text-emerald-500/25 mx-auto mb-2.5" />
                <p className="text-sm text-slate-500 font-bold">All resources are accounted for. No overdue items!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {data?.overdueList.map((b) => (
                  <div
                    key={b.id}
                    className="p-4 rounded-xl bg-slate-950/50 border border-rose-500/10 flex flex-wrap justify-between items-center gap-4 hover:border-rose-500/20 transition-all"
                  >
                    <div>
                      <h4 className="font-bold text-sm text-white">{b.asset.name}</h4>
                      <p className="text-xs text-slate-400 mt-1.5 font-medium">
                        Borrower: <span className="text-slate-200 font-semibold">{b.user.name} ({b.user.section})</span> &bull; Qty: {b.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="px-2.5 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/25 text-rose-450 text-[9px] font-black uppercase tracking-widest block mb-1.5 text-center">
                        Overdue
                      </span>
                      <p className="text-[10px] text-slate-500 font-bold">
                        Due: <span className="font-extrabold text-rose-450">{new Date(b.endDate).toLocaleDateString()}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
