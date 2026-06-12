import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import Header from "../../components/Header";
import Link from "next/link";
import { Search, Calendar, History, Clipboard, Clock, CheckCircle, Flame } from "lucide-react";

export default async function ConsumerDashboard() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id || "";

  // Fetch count stats for this user
  const activeCount = await prisma.booking.count({
    where: {
      userId,
      status: { in: ["ISSUED", "OVERDUE"] },
    },
  });

  const pendingCount = await prisma.booking.count({
    where: {
      userId,
      status: "PENDING",
    },
  });

  const returnedCount = await prisma.booking.count({
    where: {
      userId,
      status: "RETURNED",
    },
  });

  // Fetch active borrowings
  const activeBorrowings = await prisma.booking.findMany({
    where: {
      userId,
      status: { in: ["ISSUED", "OVERDUE"] },
    },
    include: {
      asset: {
        select: { name: true, category: true },
      },
    },
    orderBy: { endDate: "asc" },
  });

  // Fetch recent requests
  const recentRequests = await prisma.booking.findMany({
    where: { userId },
    include: {
      asset: { select: { name: true, category: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 4,
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-amber-500/10 border-amber-500/20 text-amber-400";
      case "APPROVED":
        return "bg-cyan-500/10 border-cyan-500/20 text-cyan-400";
      case "ISSUED":
        return "bg-teal-500/10 border-teal-500/20 text-teal-400";
      case "RETURNED":
        return "bg-slate-500/10 border-slate-550/20 text-slate-400";
      case "OVERDUE":
        return "bg-rose-500/10 border-rose-500/20 text-rose-400";
      default:
        return "bg-rose-500/10 border-rose-500/20 text-rose-400";
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#030407]">
      <Header title="Overview" />

      <main className="flex-1 p-6 lg:p-8 space-y-8 max-w-7xl mx-auto w-full">
        {/* Welcome Block */}
        <div className="p-6.5 rounded-2xl bg-gradient-to-r from-cyan-950/15 via-slate-900/40 to-slate-900/10 border border-cyan-500/10 backdrop-blur-md relative overflow-hidden">
          <div className="absolute right-0 top-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-[70px] pointer-events-none" />
          <h2 className="text-xl sm:text-2xl font-black text-white">Hello, {session?.user?.name || "Member"}!</h2>
          <p className="text-slate-400 text-sm mt-2 leading-relaxed font-medium">
            Welcome to the Smart Asset Management and Resource Allocation Platform. You belong to the <span className="text-cyan-400 font-extrabold">{session?.user?.section || "Council Member"}</span> section. Below is your resource allocation summary.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="p-6 rounded-2xl bg-[#08090d]/60 border border-slate-800/80 backdrop-blur-md flex items-center gap-5 shadow-lg">
            <div className="p-3.5 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400">
              <Clock className="w-5.5 h-5.5" />
            </div>
            <div>
              <p className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">Active Borrowings</p>
              <h3 className="text-2xl font-black text-white mt-1.5">{activeCount}</h3>
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-2xl bg-[#08090d]/60 border border-slate-800/80 backdrop-blur-md flex items-center gap-5 shadow-lg">
            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <Calendar className="w-5.5 h-5.5" />
            </div>
            <div>
              <p className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">Pending Approvals</p>
              <h3 className="text-2xl font-black text-white mt-1.5">{pendingCount}</h3>
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-2xl bg-[#08090d]/60 border border-slate-800/80 backdrop-blur-md flex items-center gap-5 shadow-lg">
            <div className="p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <CheckCircle className="w-5.5 h-5.5" />
            </div>
            <div>
              <p className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">Returned Assets</p>
              <h3 className="text-2xl font-black text-white mt-1.5">{returnedCount}</h3>
            </div>
          </div>
        </div>

        {/* Dynamic content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Area (Active & Recent Requests) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Active Borrowings */}
            <div className="p-6 rounded-2xl bg-[#08090d]/60 border border-slate-800/80 backdrop-blur-md shadow-lg">
              <h3 className="font-extrabold text-sm text-white uppercase tracking-wider mb-5">Active Checked Out Assets</h3>
              {activeBorrowings.length === 0 ? (
                <div className="py-12 text-center bg-slate-950/40 border border-dashed border-slate-900 rounded-2xl">
                  <Clipboard className="w-8 h-8 text-slate-800 mx-auto mb-2.5" />
                  <p className="text-sm text-slate-500 font-bold">No assets currently checked out</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {activeBorrowings.map((b) => (
                    <div
                      key={b.id}
                      className="p-4.5 rounded-xl bg-slate-950/50 border border-slate-900 flex flex-wrap justify-between items-center gap-4 hover:border-slate-800 transition-colors duration-200"
                    >
                      <div>
                        <h4 className="font-extrabold text-sm text-white">{b.asset.name}</h4>
                        <p className="text-xs text-slate-400 mt-1.5 font-medium">Quantity: <span className="font-extrabold text-slate-200">{b.quantity}</span> &bull; {b.asset.category}</p>
                      </div>
                      <div className="text-right">
                        <div className={`inline-block px-2.5 py-1 rounded-full border text-[9px] font-black tracking-widest uppercase mb-2 ${getStatusColor(b.status)}`}>
                          {b.status}
                        </div>
                        <p className="text-xs text-slate-500 font-semibold">
                          Due: <span className="font-bold text-slate-400">{new Date(b.endDate).toLocaleDateString()}</span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Recent Requests list */}
            <div className="p-6 rounded-2xl bg-[#08090d]/60 border border-slate-800/80 backdrop-blur-md shadow-lg">
              <h3 className="font-extrabold text-sm text-white uppercase tracking-wider mb-5">Recent Requests</h3>
              {recentRequests.length === 0 ? (
                <div className="py-12 text-center bg-slate-950/40 border border-dashed border-slate-900 rounded-2xl">
                  <p className="text-sm text-slate-500 font-bold">No requests made yet</p>
                </div>
              ) : (
                <div className="overflow-x-auto no-scrollbar">
                  <table className="w-full text-left text-sm border-collapse">
                    <thead>
                      <tr className="border-b border-slate-900 text-slate-500 text-[10px] uppercase font-bold tracking-widest">
                        <th className="py-3 px-4">Asset</th>
                        <th className="py-3 px-4">Duration</th>
                        <th className="py-3 px-4">Quantity</th>
                        <th className="py-3 px-4 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-900/40">
                      {recentRequests.map((b) => (
                        <tr key={b.id} className="hover:bg-slate-900/20 transition-colors">
                          <td className="py-4 px-4">
                            <span className="font-bold text-white block">{b.asset.name}</span>
                            <span className="text-xxs text-slate-500 mt-1 block font-semibold">{b.asset.category}</span>
                          </td>
                          <td className="py-4 px-4 text-slate-400 font-semibold">
                            {new Date(b.startDate).toLocaleDateString()} - {new Date(b.endDate).toLocaleDateString()}
                          </td>
                          <td className="py-4 px-4 font-bold text-slate-200">{b.quantity}</td>
                          <td className="py-4 px-4 text-right">
                            <span className={`inline-block px-2.5 py-1 rounded-full border text-[9px] font-black tracking-widest uppercase ${getStatusColor(b.status)}`}>
                              {b.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar Area (Quick Actions & Guidelines) */}
          <div className="space-y-8">
            {/* Quick Actions Panel */}
            <div className="p-6 rounded-2xl bg-[#08090d]/60 border border-slate-800/80 backdrop-blur-md shadow-lg">
              <h3 className="font-extrabold text-sm text-white uppercase tracking-wider mb-5">Quick Actions</h3>
              <div className="grid grid-cols-1 gap-3.5">
                <Link
                  href="/dashboard/browse"
                  className="flex items-center justify-center gap-2.5 p-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-black shadow-lg shadow-cyan-600/10 hover:shadow-cyan-600/20 transition-all text-xs uppercase tracking-widest cursor-pointer"
                >
                  <Search className="w-4.5 h-4.5" /> Browse Inventory
                </Link>
                <Link
                  href="/dashboard/history"
                  className="flex items-center justify-center gap-2.5 p-3 rounded-xl bg-slate-950 border border-slate-850 hover:bg-slate-900 text-slate-300 hover:text-white transition-all text-xs font-bold tracking-wide cursor-pointer"
                >
                  <History className="w-4.5 h-4.5 text-slate-500" /> Borrowing History
                </Link>
              </div>
            </div>

            {/* Council Guidelines */}
            <div className="p-6 rounded-2xl bg-[#08090d]/60 border border-slate-800/80 backdrop-blur-md shadow-lg">
              <h3 className="font-extrabold text-sm text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                <Flame className="w-4 h-4 text-cyan-400" /> Guidelines
              </h3>
              <ul className="space-y-3.5 text-xs text-slate-400 leading-relaxed font-semibold list-none">
                <li className="flex gap-2">
                  <span className="text-cyan-400">&bull;</span>
                  <span>Check asset availability before making a request. Double-bookings are blocked automatically.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-cyan-400">&bull;</span>
                  <span>Make requests at least 24 hours in advance to allow Admin approval.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-cyan-400">&bull;</span>
                  <span>Pick up approved assets from the respective section room at the scheduled start time.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-cyan-400">&bull;</span>
                  <span>Return assets promptly on or before the due date. Overdue notifications are sent automatically.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-cyan-400">&bull;</span>
                  <span>Report any damages or maintenance requirements immediately upon return.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
