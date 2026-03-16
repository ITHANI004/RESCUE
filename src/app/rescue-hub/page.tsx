import { createClient } from '@/utils/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
    Home,
    Search,
    Users,
    HeartHandshake,
    MapPin,
    Clock,
    ChevronRight,
    UserPlus,
    ShieldCheck,
    Building2,
    Phone,
    ArrowLeft,
    Radio,
    Wifi
} from 'lucide-react'
import Link from 'next/link'

export default async function RescueHubPage() {
    const supabase = await createClient()

    const { data: shelters } = await supabase.from('shelters').select('*')
    const { data: missing } = await supabase.from('missing_persons').select('*')

    return (
        <div className="min-h-screen bg-[#050505] text-white p-6 md:p-12 font-sans relative">
            <div className="max-w-7xl mx-auto space-y-16">

                {/* Navigation Header */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-b border-white/5 pb-12">
                    <div className="space-y-6">
                        <Link href="/dashboard" className="flex items-center gap-2 text-[10px] font-mono text-gray-500 hover:text-blue-500 transition-colors uppercase tracking-[0.3em]">
                            <ArrowLeft className="w-3 h-3" /> Back_to_Command
                        </Link>
                        <div className="flex items-center gap-6">
                            <div className="p-4 bg-blue-500/10 border border-blue-500/30">
                                <HeartHandshake className="w-10 h-10 text-blue-500" />
                            </div>
                            <div className="space-y-1">
                                <h1 className="text-6xl font-black tracking-tighter uppercase leading-none">Rescue Hub</h1>
                                <p className="text-[10px] font-mono text-blue-500 tracking-[0.6em] uppercase">Citizen support & relief registry</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <Link href="/volunteers" className="flex items-center gap-2 px-8 py-3 bg-white/5 border border-white/10 hover:border-blue-500 transition-all text-[10px] tracking-widest uppercase font-mono">
                            <UserPlus className="w-3 h-3 text-blue-500" /> Become_Volunteer
                        </Link>
                        <Link href="/report" className="flex items-center gap-2 px-8 py-3 bg-red-600 hover:bg-red-700 transition-all text-[10px] tracking-widest uppercase font-mono text-white">
                            Report_Missing
                        </Link>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* Main Relief Feed */}
                    <div className="lg:col-span-2 space-y-12">

                        {/* OFFICIAL BROADCASTS - NEW */}
                        <section className="space-y-8 bg-blue-500/5 border border-blue-500/10 p-8">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Radio className="w-4 h-4 text-blue-500 animate-pulse" />
                                    <h2 className="text-[10px] font-mono tracking-[0.5em] text-white uppercase">Official_Broadcasts</h2>
                                </div>
                                <span className="text-[8px] font-mono text-blue-500 uppercase flex items-center gap-2">
                                    <Wifi className="w-3 h-3" /> Signal_Strong
                                </span>
                            </div>

                            <div className="space-y-6">
                                {[
                                    { title: 'Evacuation Route Update', body: 'Bridge 4 is now secure for civilian passage. Estimated transit time: 12m.', time: '2m ago' },
                                    { title: 'Resource Drop Confirmed', body: 'Medical supplies dispatched to North-Sector Hub Alpha.', time: '14m ago' }
                                ].map((b, i) => (
                                    <div key={i} className="space-y-2 border-l border-blue-500/30 pl-6 group">
                                        <h3 className="text-sm font-bold uppercase tracking-tight group-hover:text-blue-500 transition-colors">{b.title}</h3>
                                        <p className="text-[10px] font-mono text-gray-500 leading-relaxed uppercase tracking-tighter italic">"{b.body}"</p>
                                        <span className="text-[8px] font-mono text-gray-700 uppercase">{b.time}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Shelter Section */}
                        <section className="space-y-8">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Building2 className="w-4 h-4 text-blue-500" />
                                    <h2 className="text-[10px] font-mono tracking-[0.5em] text-white uppercase">Relief_Shelters_Nearby</h2>
                                </div>
                                <span className="text-[8px] font-mono text-gray-600 uppercase">Live Capacity Updates</span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {shelters?.map((shelter) => (
                                    <div key={shelter.id} className="p-6 bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all group">
                                        <div className="flex justify-between items-start mb-4">
                                            <h3 className="text-lg font-bold uppercase tracking-tight">{shelter.name}</h3>
                                            <span className={`text-[8px] font-mono px-2 py-0.5 border ${shelter.status === 'open' ? 'text-green-500 border-green-500/30' : 'text-red-500 border-red-500/30'
                                                }`}>
                                                {shelter.status.toUpperCase()}
                                            </span>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-2 text-[10px] text-gray-500 font-mono">
                                                <MapPin className="w-3 h-3" /> {shelter.location}
                                            </div>

                                            <div className="space-y-2">
                                                <div className="flex justify-between text-[10px] font-mono text-gray-400">
                                                    <span>CAPACITY_USE</span>
                                                    <span>{Math.round((shelter.occupied / shelter.capacity) * 100)}%</span>
                                                </div>
                                                <div className="h-[1px] w-full bg-white/5">
                                                    <div
                                                        className={`h-full transition-all duration-1000 ${(shelter.occupied / shelter.capacity) > 0.8 ? 'bg-red-500' : 'bg-blue-500'
                                                            }`}
                                                        style={{ width: `${(shelter.occupied / shelter.capacity) * 100}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Missing Persons Tracker */}
                        <section className="space-y-8 pt-12 border-t border-white/5">
                            <div className="flex items-center gap-3">
                                <Users className="w-4 h-4 text-red-500" />
                                <h2 className="text-[10px] font-mono tracking-[0.5em] text-white uppercase">Missing_Persons_Registry</h2>
                            </div>

                            <div className="space-y-4">
                                {missing?.map((person) => (
                                    <div key={person.id} className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-red-500/[0.02] border border-red-500/10 hover:border-red-500/30 transition-all gap-6">
                                        <div className="flex gap-6">
                                            <div className="w-16 h-16 bg-white/5 border border-white/10 flex items-center justify-center">
                                                <Users className="w-6 h-6 text-gray-700" />
                                            </div>
                                            <div className="space-y-1">
                                                <h3 className="text-xl font-bold uppercase">{person.name} <span className="text-xs font-normal text-gray-500">[{person.age}_Y/O]</span></h3>
                                                <p className="text-xs text-gray-500 font-mono">LAST_SEEN: {person.last_seen_location}</p>
                                                <p className="text-[10px] text-red-500/70 font-mono uppercase tracking-tighter max-w-md mt-2">"{person.description}"</p>
                                            </div>
                                        </div>
                                        <div className="text-right space-y-3">
                                            <div className="text-[10px] font-mono text-blue-500 border border-blue-500/20 px-3 py-1 inline-block uppercase italic">
                                                {person.status}
                                            </div>
                                            <div className="flex items-center gap-2 justify-end text-[8px] font-mono text-gray-600">
                                                <Clock className="w-2 h-2" /> REPORTED_{new Date(person.created_at).toLocaleDateString()}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Sidebar / Tools */}
                    <div className="space-y-12">

                        {/* Emergency Hotline Sidebar */}
                        <section className="bg-red-600/5 border border-red-500/20 p-8 space-y-6">
                            <div className="flex items-center gap-3">
                                <Phone className="w-4 h-4 text-red-500" />
                                <h2 className="text-[10px] font-mono tracking-[0.3em] text-white uppercase">Critical_Lines</h2>
                            </div>
                            <div className="space-y-6">
                                <div className="space-y-1">
                                    <span className="text-[8px] font-mono text-gray-500 uppercase tracking-widest">Medical_Emergency</span>
                                    <p className="text-2xl font-black text-white">102 / 108</p>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-[8px] font-mono text-gray-500 uppercase tracking-widest">Fire_Bridge</span>
                                    <p className="text-2xl font-black text-white">101</p>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-[8px] font-mono text-gray-500 uppercase tracking-widest">Police_Response</span>
                                    <p className="text-2xl font-black text-white">100</p>
                                </div>
                            </div>
                        </section>

                        {/* Action Cards */}
                        <div className="space-y-4">
                            <Link href="/guidelines" className="block group">
                                <div className="p-6 bg-white/[0.02] border border-white/5 group-hover:border-blue-500/40 transition-all flex items-center justify-between">
                                    <div className="space-y-1">
                                        <h3 className="text-xs font-bold uppercase">Safety_Guide</h3>
                                        <p className="text-[8px] font-mono text-gray-500 uppercase">Emergency SOPs</p>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-gray-700 group-hover:text-blue-500 transition-colors" />
                                </div>
                            </Link>
                            <Link href="/report" className="block group">
                                <div className="p-6 bg-white/[0.02] border border-white/5 group-hover:border-red-500/40 transition-all flex items-center justify-between">
                                    <div className="space-y-1">
                                        <h3 className="text-xs font-bold uppercase">Field_Report</h3>
                                        <p className="text-[8px] font-mono text-gray-500 uppercase">Input incident data</p>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-gray-700 group-hover:text-red-500 transition-colors" />
                                </div>
                            </Link>
                            <Link href="/volunteers" className="block group">
                                <div className="p-6 bg-white/[0.02] border border-white/5 group-hover:border-green-500/40 transition-all flex items-center justify-between">
                                    <div className="space-y-1">
                                        <h3 className="text-xs font-bold uppercase">Volunteer_Hub</h3>
                                        <p className="text-[8px] font-mono text-gray-500 uppercase">Join the response</p>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-gray-700 group-hover:text-green-500 transition-colors" />
                                </div>
                            </Link>
                        </div>

                    </div>
                </div>
            </div>

            <footer className="fixed bottom-0 left-0 w-full p-6 flex justify-between items-center pointer-events-none z-50 bg-black/50 backdrop-blur-sm">
                <div className="text-[8px] font-mono text-gray-600 tracking-[0.5em] uppercase">
                    Rescue_Hub // Relief_Portal_v1.0
                </div>
                <div className="flex gap-6 items-center">
                    <span className="text-[8px] font-mono text-blue-500/50 tracking-[0.3em]">RELIEF_PROTOCOL_ACTIVE</span>
                    <div className="w-12 h-[1px] bg-white/10" />
                    <span className="text-[8px] font-mono text-gray-600 tracking-[0.3em]">SECURE ACCESS ONLY</span>
                </div>
            </footer>
        </div>
    )
}
