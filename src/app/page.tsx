import { createClient } from '@/utils/supabase/server'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { HomeClient } from '@/components/HomeClient'
import { Shield, Zap, Globe, Cpu, ChevronRight, Activity, Radar, Bot } from 'lucide-react'

export default async function Home() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  async function signOut() {
    'use server'
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect('/login')
  }

  return (
    <HomeClient user={user} signOutAction={signOut}>
      {/* Scrollable Content Sections */}
      <div className="max-w-4xl mx-auto px-12 space-y-[100vh] pb-[50vh] pointer-events-none">

        {/* Section 01: Detection */}
        <section className="space-y-6 pt-[120vh]">
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-mono text-blue-600 border-l border-blue-600 pl-4 tracking-[0.3em]">01 / DETECTION</span>
            <Radar className="w-4 h-4 text-blue-600 animate-pulse" />
          </div>
          <h2 className="text-6xl font-black tracking-tighter uppercase leading-none">Watching<br />the unseen.</h2>
          <p className="text-gray-500 text-xs font-mono tracking-widest leading-loose max-w-sm uppercase">
            400+ orbital nodes monitoring multi-spectrum heat signatures and seismic anomalies in absolute real-time.
          </p>
        </section>

        {/* Section 02: Response */}
        <section className="space-y-6 text-right ml-auto">
          <div className="flex items-center gap-4 justify-end">
            <Activity className="w-4 h-4 text-red-600" />
            <span className="text-[10px] font-mono text-red-600 border-r border-red-600 pr-4 tracking-[0.3em]">02 / RESPONSE</span>
          </div>
          <h2 className="text-6xl font-black tracking-tighter uppercase leading-none">Decisive<br />action.</h2>
          <p className="text-gray-500 text-xs font-mono tracking-widest leading-loose max-w-sm ml-auto uppercase">
            Automated logistics matrix. Drone delivery optimization. Human-centric coordination for maximum casualty reduction.
          </p>
        </section>

        {/* New Feature: Core Capabilities Grid */}
        <section className="space-y-24 py-24">
          <div className="space-y-4 text-center">
            <span className="text-[10px] font-mono text-cyan-600 uppercase tracking-[0.5em]">System_Capabilities</span>
            <h2 className="text-5xl font-black tracking-tighter uppercase">The Future of Safety</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pointer-events-auto">
            {[
              { icon: Shield, title: 'Satellite Mesh', desc: 'Secure decentralized network ensuring connectivity during total infrastructure collapse.' },
              { icon: Zap, title: 'Rapid Triage', desc: 'AI-driven prioritization of resources to areas with the highest life-saving potential.' },
              { icon: Globe, title: 'Global Relief', desc: 'Cross-border collaboration protocols for international disaster response.' },
              { icon: Bot, title: 'Autonomous SAR', desc: 'Search and rescue drones capable of navigating hazardous environments without pilots.' },
            ].map((feature, i) => (
              <div key={i} className="group p-8 border border-white/5 hover:border-blue-500/30 transition-all duration-500 bg-white/[0.02]">
                <feature.icon className="w-8 h-8 text-blue-500 mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold uppercase tracking-tight mb-4">{feature.title}</h3>
                <p className="text-xs text-gray-500 font-mono uppercase tracking-widest leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 03: The Process */}
        <section className="space-y-16 py-24 border-y border-white/5">
          <div className="space-y-4">
            <span className="text-[10px] font-mono text-cyan-600 tracking-[0.3em]">03 / THE PROCESS</span>
            <h2 className="text-4xl font-black tracking-tighter uppercase">Protocol Execution</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pointer-events-auto">
            <div className="space-y-6 group">
              <div className="w-12 h-12 rounded-none border border-blue-500/50 flex items-center justify-center text-xs font-mono text-blue-500 group-hover:bg-blue-500 group-hover:text-black transition-all">01</div>
              <h3 className="text-xl font-bold uppercase tracking-tight">Signal Detection</h3>
              <p className="text-[10px] text-gray-500 leading-relaxed font-mono uppercase tracking-widest">Sensors detect anomalies within seconds, bypassing traditional reporting delays.</p>
            </div>
            <div className="space-y-6 group">
              <div className="w-12 h-12 rounded-none border border-red-500/50 flex items-center justify-center text-xs font-mono text-red-500 group-hover:bg-red-500 group-hover:text-black transition-all">02</div>
              <h3 className="text-xl font-bold uppercase tracking-tight">Rapid Response</h3>
              <p className="text-[10px] text-gray-500 leading-relaxed font-mono uppercase tracking-widest">Automated deployment of resources and first responders based on AI modeling.</p>
            </div>
            <div className="space-y-6 group">
              <div className="w-12 h-12 rounded-none border border-green-500/50 flex items-center justify-center text-xs font-mono text-green-500 group-hover:bg-green-500 group-hover:text-black transition-all">03</div>
              <h3 className="text-xl font-bold uppercase tracking-tight">Extraction</h3>
              <p className="text-[10px] text-gray-500 leading-relaxed font-mono uppercase tracking-widest">Secure evacuation and medical triage using precision geospatial data.</p>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="flex flex-col items-center py-40 space-y-16">
          <div className="w-[1px] h-32 bg-gradient-to-b from-transparent via-blue-500/50 to-transparent" />

          <div className="text-center space-y-6">
            <h2 className="text-4xl font-black tracking-tighter uppercase">The Core is Ready</h2>
            <p className="text-[10px] font-mono text-gray-500 tracking-[0.5em] uppercase">Initialize connection to orbital network</p>
          </div>

          <Link href={user ? "/dashboard" : "/login"} className="pointer-events-auto relative group">
            <div className="absolute inset-0 bg-blue-500 blur-2xl opacity-0 group-hover:opacity-20 transition-opacity" />
            <button className="relative px-16 py-6 border border-white/10 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all duration-700 text-[10px] tracking-[0.6em] uppercase cursor-pointer font-black">
              {user ? "Initialize_Dashboard" : "Access_Command_Terminal"}
            </button>
            <div className="mt-8 flex justify-center gap-12 text-[8px] font-mono text-gray-600 tracking-[0.3em] uppercase opacity-40">
              <span>Direct_Uplink</span>
              <span>Encrypted_AES256</span>
              <span>Lat: 0.04ms</span>
            </div>
          </Link>
        </section>
      </div>
    </HomeClient>
  )
}
