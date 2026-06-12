import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Camera, Lightbulb, Music, Shirt, Drama, Speaker, Shield, ArrowRight, Activity, Cpu, CalendarDays } from "lucide-react";

export default async function LandingPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    if (session.user.role === "ADMIN") {
      redirect("/admin");
    } else {
      redirect("/dashboard");
    }
  }

  const categories = [
    { name: "DSLR Cameras", icon: Camera, desc: "High-end cinema and photo cameras for event coverage.", color: "from-cyan-500 to-blue-600", glow: "rgba(6, 182, 212, 0.15)" },
    { name: "Studio Lighting", icon: Lightbulb, desc: "Professional studio strobe lights, softboxes, and spotlights.", color: "from-amber-500 to-orange-500", glow: "rgba(245, 158, 11, 0.15)" },
    { name: "Audio Systems", icon: Music, desc: "Wireless microphones, multichannel field recorders, and monitors.", color: "from-emerald-500 to-teal-500", glow: "rgba(16, 185, 129, 0.15)" },
    { name: "Costumes", icon: Shirt, desc: "Choreography, drama costumes, and event-themed clothing sets.", color: "from-rose-500 to-pink-500", glow: "rgba(244, 63, 94, 0.15)" },
    { name: "Stage Props", icon: Drama, desc: "Props, blunted weaponry, and background stage materials.", color: "from-violet-500 to-purple-500", glow: "rgba(139, 92, 246, 0.15)" },
    { name: "Event Infrastructure", icon: Speaker, desc: "Professional PA speakers, stage monitors, and power routing systems.", color: "from-sky-500 to-indigo-500", glow: "rgba(14, 165, 233, 0.15)" },
  ];

  return (
    <div className="flex-1 flex flex-col justify-between min-h-screen bg-[#030407] overflow-hidden relative">
      {/* High-end decorative glowing radial spots */}
      <div className="absolute top-[-15%] left-[-10%] w-[600px] h-[600px] rounded-full bg-cyan-600/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-violet-600/10 blur-[130px] pointer-events-none" />
      <div className="absolute top-[35%] left-[50%] -translate-x-1/2 w-[800px] h-[350px] rounded-full bg-teal-500/5 blur-[150px] pointer-events-none" />

      {/* Grid Overlay background effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293708_1px,transparent_1px),linear-gradient(to_bottom,#1f293708_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      {/* Header */}
      <header className="w-full max-w-7xl mx-auto px-6 py-5 flex justify-between items-center z-20 relative">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-tr from-cyan-500 to-teal-500 shadow-lg shadow-cyan-500/10">
            <img src="/logo.png" alt="AssetFlow Logo" className="h-6 w-6 object-contain filter brightness-110" />
          </div>
          <span className="font-extrabold text-xl tracking-tight text-white flex items-center gap-1.5">
            AssetFlow <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-semibold tracking-normal">IITR</span>
          </span>
        </div>
        <div className="flex items-center gap-4.5">
          <Link
            href="/login"
            className="text-sm font-semibold text-slate-400 hover:text-white transition-colors duration-200"
          >
            Log In
          </Link>
          <Link
            href="/register"
            className="text-sm font-semibold px-4.5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white shadow-xl shadow-cyan-600/20 hover:shadow-cyan-600/35 transition-all duration-300 transform hover:-translate-y-0.5"
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center max-w-6xl mx-auto px-6 py-16 text-center z-10">
        {/* Pulsing Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-8 animate-neon-pulse">
          <Shield className="w-3.5 h-3.5" /> IIT Roorkee Cultural Council Resource Management
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white max-w-4xl leading-[1.12]">
          Smart allocation for <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-indigo-400 bg-clip-text text-transparent">shared resources</span>
        </h1>
        
        <p className="mt-8 text-base sm:text-lg text-slate-400 max-w-3xl leading-relaxed">
          The ultimate central bookings, inventory tracking, and operational analytics hub. Designed to streamline allocations, eliminate double-bookings, and bring robust accountability to IITR's Cultural Council.
        </p>
        
        {/* Call to Actions */}
        <div className="mt-12 flex flex-wrap gap-5 justify-center">
          <Link
            href="/register"
            className="px-7 py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-500 to-indigo-500 hover:from-cyan-400 hover:via-teal-400 hover:to-indigo-400 text-white font-bold shadow-2xl shadow-cyan-500/15 hover:shadow-cyan-500/30 transition-all duration-300 flex items-center gap-2.5 group hover:-translate-y-0.5"
          >
            Create Your Account <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </Link>
          <Link
            href="/login"
            className="px-7 py-4 rounded-xl bg-slate-900/50 border border-slate-800 text-slate-300 font-semibold hover:bg-slate-800 hover:text-white transition-all duration-300 hover:-translate-y-0.5 backdrop-blur-md"
          >
            Access Console
          </Link>
        </div>

        {/* Categories Section */}
        <div className="mt-28 w-full">
          <div className="flex flex-col items-center mb-12">
            <h2 className="text-xs font-extrabold tracking-widest text-cyan-500 uppercase mb-3">Managed Council Inventories</h2>
            <div className="h-0.5 w-12 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            {categories.map((cat, i) => {
              const Icon = cat.icon;
              return (
                <div
                  key={i}
                  className="p-6 rounded-2xl glass-panel glass-panel-hover"
                  style={{
                    boxShadow: `0 4px 30px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)`
                  }}
                >
                  <div 
                    className={`w-11 h-11 rounded-xl bg-gradient-to-tr ${cat.color} p-2.5 text-white flex items-center justify-center mb-5`}
                    style={{ boxShadow: `0 4px 15px ${cat.glow}` }}
                  >
                    <Icon className="w-5.5 h-5.5" />
                  </div>
                  <h3 className="font-bold text-lg text-white mb-2 tracking-tight">{cat.name}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed font-medium">{cat.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-7xl mx-auto px-6 py-6 text-center text-xs text-slate-500 border-t border-slate-900/60 z-10 bg-[#030407]/40 backdrop-blur-sm mt-12">
        &copy; {new Date().getFullYear()} Cultural Council, IIT Roorkee. Designed with smart resource tracking.
      </footer>
    </div>
  );
}
