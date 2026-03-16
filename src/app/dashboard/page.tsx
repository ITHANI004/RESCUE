import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
    AlertTriangle,
    Users,
    Activity,
    MapPin,
    ShieldCheck,
    ChevronRight,
    Clock,
    Search,
    Wind,
    Droplets,
    Thermometer,
    ShieldAlert,
    PlusCircle,
    FileText,
    HelpCircle,
    TrendingUp,
    BrainCircuit,
    HeartHandshake,
    Radar,
    Network,
    Download
} from 'lucide-react'
import Link from 'next/link'
import { ExportReportButton } from '@/components/ExportReportButton'

export default async function DashboardPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    // Fetch data
    const { data: disasters } = await supabase
        .from('disasters')
        .select('*')
        .order('created_at', { ascending: false })

    const { data: reports } = await supabase
        .from('reports')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5)

    const activeDisasters = disasters?.filter(d => d.status === 'active') || []
    const totalRescued = disasters?.reduce((acc, d) => acc + (d.rescued_count || 0), 0) || 0
    const severeIncidents = activeDisasters.filter(d => d.severity >= 4).length
    const criticalEvent = activeDisasters.find(d => d.severity === 5)

    return (
        <div className="min-h-screen bg-[#050505] text-white p-6 md:p-12 font-sans selection:bg-blue-500/30">
            {/* Background elements */}
            <div className="fixed inset-0 pointer-events-none opacity-20">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-red-600 rounded-full blur-[120px]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto space-y-12">
                {/* Header Section */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 pb-12">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                            <span className="text-[10px] tracking-[0.5em] text-blue-500 font-mono uppercase">System_Active // Command_Terminal</span>
                        </div>
                        <h1 className="text-5xl font-black tracking-tight uppercase leading-none">
                            Operational<br />Intelligence
                        </h1>
                    </div>

                    <div className="flex flex-wrap gap-4">
                        <ExportReportButton data={disasters || []} userEmail={user?.email} />
                        <Link href="/rescue-hub" className="flex items-center gap-2 px-6 py-2 border border-blue-500/20 hover:border-blue-500 transition-all text-[10px] tracking-widest uppercase font-mono text-blue-400">
                            <HeartHandshake className="w-3 h-3" /> Relief_Hub
                        </Link>
                        <Link href="/report" className="flex items-center gap-2 px-6 py-2 bg-red-600 hover:bg-red-700 transition-all text-[10px] tracking-widest uppercase font-mono text-white">
                            <PlusCircle className="w-3 h-3" /> Report_Incident
                        </Link>
                        <Link href="/guidelines" className="flex items-center gap-2 px-6 py-2 border border-white/10 hover:border-white/20 transition-all text-[10px] tracking-widest uppercase font-mono text-gray-400">
                            <HelpCircle className="w-3 h-3" /> Safety_Protocols
                        </Link>
                    </div>
                </header>

                {/* Tactical Overview - NEW */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    <div className="lg:col-span-3 bg-white/[0.02] border border-white/5 p-8 relative overflow-hidden h-[400px] flex items-center justify-center">
                        <div className="absolute top-8 left-8 space-y-2 z-10">
                            <div className="flex items-center gap-2">
                                <Radar className="w-4 h-4 text-blue-500 animate-spin-slow" />
                                <span className="text-[10px] font-mono tracking-[0.4em] uppercase">Sector_Radar_Scan</span>
                            </div>
                        </div>

                        {/* Simulated Map Visualizer */}
                        <div className="relative w-full h-full opacity-30">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-[300px] h-[300px] border border-blue-500/20 rounded-full animate-ping-slow absolute" />
                                <div className="w-[500px] h-[500px] border border-blue-500/10 rounded-full absolute" />
                                <svg className="w-full h-full stroke-blue-500/10 fill-none" viewBox="0 0 800 400">
                                    <path d="M100,200 Q200,100 300,200 T500,200" strokeWidth="0.5" />
                                    <circle cx="400" cy="200" r="2" fill="currentColor" className="text-blue-500" />
                                    {activeDisasters.map((d, i) => (
                                        <circle key={d.id} cx={200 + (i * 100)} cy={150 + (i * 40)} r="4" fill="currentColor" className="text-red-500 animate-pulse" />
                                    ))}
                                </svg>
                            </div>
                        </div>

                        <div className="absolute bottom-8 right-8 text-right space-y-1">
                            <span className="text-[8px] font-mono text-blue-500 block">UPLINK_01_ACTIVE</span>
                            <span className="text-[8px] font-mono text-gray-500 block">SATELLITE_REF: E0-42_ALPHA</span>
                        </div>
                    </div>

                    <div className="bg-white/[0.02] border border-white/5 p-8 flex flex-col justify-between">
                        <div className="space-y-6">
                            <div className="flex items-center gap-2">
                                <Network className="w-4 h-4 text-cyan-500" />
                                <span className="text-[10px] font-mono tracking-[0.4em] uppercase">Network_Nodes</span>
                            </div>
                            <div className="space-y-4">
                                {[
                                    { name: 'SAT_1', ping: '12ms', status: 'solid' },
                                    { name: 'GND_4', ping: '45ms', status: 'solid' },
                                    { name: 'DRN_A', ping: '202ms', status: 'unstable' },
                                    { name: 'HUB_Z', ping: '5ms', status: 'solid' },
                                ].map((node) => (
                                    <div key={node.name} className="flex justify-between items-center text-[10px] font-mono">
                                        <span className="text-gray-500">{node.name}</span>
                                        <div className="flex items-center gap-4">
                                            <span className={node.status === 'solid' ? 'text-green-500' : 'text-yellow-500'}>{node.ping}</span>
                                            <div className={`w-1 h-1 rounded-full ${node.status === 'solid' ? 'bg-green-500' : 'bg-yellow-500'}`} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="pt-8 border-t border-white/5">
                            <p className="text-[9px] font-mono text-gray-600 leading-tight uppercase">Encryption_Phase: ROT_13+AES256 Synchronized with Global Cluster.</p>
                        </div>
                    </div>
                </div>

                {/* Global Alert Banner */}
                {criticalEvent ? (
                    <div className="bg-red-500/10 border border-red-500/50 p-4 flex items-center justify-between animate-pulse">
                        <div className="flex items-center gap-4">
                            <ShieldAlert className="w-5 h-5 text-red-500" />
                            <div className="space-y-0.5">
                                <span className="text-[10px] font-mono text-red-500 tracking-[0.3em] uppercase">Critical_Priority_Alert</span>
                                <p className="text-sm font-bold uppercase tracking-tight">{criticalEvent.title} - IMPACT_RADIUS_LARGE</p>
                            </div>
                        </div>
                        <Link href="/report" className="text-[10px] font-mono border-b border-red-500 text-red-500 pb-0.5 hover:opacity-70 transition-opacity uppercase">INITIATE_RESPONSE</Link>
                    </div>
                ) : (
                    <div className="bg-blue-500/5 border border-blue-500/20 p-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <ShieldCheck className="w-5 h-5 text-blue-500" />
                            <div className="space-y-0.5">
                                <span className="text-[10px] font-mono text-blue-500 tracking-[0.3em] uppercase">Security_Briefing</span>
                                <p className="text-sm font-bold uppercase tracking-tight text-gray-400">All systems nominal. No tier-5 threats detected.</p>
                            </div>
                        </div>
                        <span className="text-[8px] font-mono text-gray-600 uppercase">Cycle_01.04v</span>
                    </div>
                )}

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card className="bg-white/[0.02] border-white/5 backdrop-blur-xl group hover:border-red-500/30 transition-all duration-500">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-[10px] font-mono tracking-[0.3em] text-gray-500 uppercase">Incidents</CardTitle>
                            <AlertTriangle className="w-4 h-4 text-red-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-4xl font-black tracking-tighter text-white">{activeDisasters.length}</div>
                            <p className="text-[10px] text-red-500 font-mono mt-1 flex items-center gap-1">
                                <TrendingUp className="w-3 h-3" /> {severeIncidents} High Severity
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-white/[0.02] border-white/5 backdrop-blur-xl group hover:border-blue-500/30 transition-all duration-500">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-[10px] font-mono tracking-[0.3em] text-gray-500 uppercase">Lives_Secured</CardTitle>
                            <Users className="w-4 h-4 text-blue-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-4xl font-black tracking-tighter text-white">{totalRescued.toLocaleString()}</div>
                            <p className="text-[10px] text-blue-500 font-mono mt-1">Sustained Operations</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-white/[0.02] border-white/5 backdrop-blur-xl group hover:border-green-500/30 transition-all duration-500">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-[10px] font-mono tracking-[0.3em] text-gray-500 uppercase">Detection_Rate</CardTitle>
                            <BrainCircuit className="w-4 h-4 text-green-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-4xl font-black tracking-tighter text-white">94%</div>
                            <p className="text-[10px] text-green-500 font-mono mt-1">Proprietary AI Modeling</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-white/[0.02] border-white/5 backdrop-blur-xl group hover:border-cyan-500/30 transition-all duration-500">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-[10px] font-mono tracking-[0.3em] text-gray-500 uppercase">Weather_Sync</CardTitle>
                            <Wind className="w-4 h-4 text-cyan-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-4xl font-black tracking-tighter text-white">24°C</div>
                            <div className="flex gap-4 mt-1">
                                <span className="text-[8px] text-gray-500 font-mono flex items-center gap-1"><Droplets className="w-2 h-2" /> 64% HUM</span>
                                <span className="text-[8px] text-gray-500 font-mono flex items-center gap-1"><Activity className="w-2 h-2" /> 1013 HPA</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Understanding Severity - Helper Section */}
                <section className="bg-blue-500/5 border border-blue-500/10 p-6 md:p-10">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                        <div className="md:col-span-2 space-y-4">
                            <h2 className="text-[10px] font-mono tracking-[0.5em] text-blue-500 uppercase">Understanding Severity</h2>
                            <p className="text-2xl font-black uppercase tracking-tighter leading-none">How the system<br />grades incidents</p>
                            <p className="text-xs text-gray-500 font-mono leading-relaxed">The severity scale allows for automated prioritization of resources. Tier 5 indicates an immediate threat to city infrastructure.</p>
                        </div>
                        <div className="md:col-span-3 flex items-center gap-4 overflow-x-auto pb-4 custom-scrollbar">
                            {[1, 2, 3, 4, 5].map((level) => (
                                <div key={level} className={`min-w-[120px] p-4 border ${level >= 4 ? 'border-red-500/30' : 'border-white/5'} bg-white/[0.01]`}>
                                    <span className={`text-[12px] font-black ${level >= 4 ? 'text-red-500' : 'text-blue-500'}`}>T-{level}</span>
                                    <p className="text-[8px] font-mono uppercase text-gray-500 mt-2">
                                        {level === 1 && "Localized Concern"}
                                        {level === 2 && "Minor Disruption"}
                                        {level === 3 && "Significant Risk"}
                                        {level === 4 && "Critical Threat"}
                                        {level === 5 && "Catastrophic Event"}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Main Feed Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-6">
                        <h2 className="text-[10px] font-mono tracking-[0.5em] text-white uppercase border-l-2 border-blue-500 pl-4 italic">
                            Active_Sector_Observations
                        </h2>

                        <div className="space-y-4">
                            {activeDisasters.map((disaster) => (
                                <div
                                    key={disaster.id}
                                    className="group bg-white/[0.01] border border-white/5 p-6 hover:bg-white/[0.03] transition-all duration-500 flex items-center justify-between"
                                >
                                    <div className="flex items-start gap-6">
                                        <div className={`p-4 rounded-none border ${disaster.severity >= 4 ? 'border-red-500/50 bg-red-500/5' : 'border-blue-500/50 bg-blue-500/5'
                                            }`}>
                                            <AlertTriangle className={`w-5 h-5 ${disaster.severity >= 4 ? 'text-red-500' : 'text-blue-500'
                                                }`} />
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-3">
                                                <h3 className="text-lg font-bold tracking-tight uppercase">{disaster.title}</h3>
                                                <span className={`text-[8px] font-mono px-2 py-0.5 border ${disaster.severity >= 4 ? 'text-red-500 border-red-500/30' : 'text-blue-500 border-blue-500/30'
                                                    }`}>
                                                    SEVERITY_0{disaster.severity}
                                                </span>
                                            </div>
                                            <p className="text-xs text-gray-500 max-w-md line-clamp-1">{disaster.description}</p>
                                            <div className="flex items-center gap-4 pt-2">
                                                <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-mono">
                                                    <MapPin className="w-3 h-3" />
                                                    {disaster.latitude.toFixed(4)}, {disaster.longitude.toFixed(4)}
                                                </div>
                                                <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-mono">
                                                    <Clock className="w-3 h-3" />
                                                    {new Date(disaster.created_at).toLocaleTimeString()}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right space-y-2">
                                        <div className="text-2xl font-black tracking-tight text-white">{disaster.rescued_count || 0}</div>
                                        <div className="text-[8px] tracking-widest text-gray-500 uppercase font-mono">Secured</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-12">
                        {/* Reports Sidebar */}
                        <section className="space-y-6">
                            <h2 className="text-[10px] font-mono tracking-[0.5em] text-white uppercase opacity-40">
                                User_Submission_Feed
                            </h2>
                            <div className="space-y-4">
                                {reports?.map((report) => (
                                    <div key={report.id} className="p-4 bg-white/5 border-l border-blue-500/30 space-y-2 group hover:bg-white/[0.08] transition-all">
                                        <div className="flex justify-between items-start">
                                            <span className="text-[8px] font-mono text-blue-500 uppercase tracking-widest">
                                                {report.verified ? 'COGNITIVE_RECON_VERIFIED' : 'PENDING_TRIAGE'}
                                            </span>
                                            <span className="text-[8px] font-mono text-gray-600">
                                                {new Date(report.created_at).toLocaleTimeString()}
                                            </span>
                                        </div>
                                        <p className="text-[11px] text-gray-400 leading-relaxed uppercase italic">"{report.details}"</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* AI Predictions */}
                        <section className="bg-blue-600/10 border border-blue-500/20 p-6 space-y-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-[10px] font-mono tracking-[0.5em] text-blue-500 uppercase">Prediction_Matrix</h2>
                                <BrainCircuit className="w-4 h-4 text-blue-500" />
                            </div>
                            <div className="space-y-4">
                                {[
                                    { zone: 'Sector 7-B', risk: 12, trend: 'stable' },
                                    { zone: 'Sector 4-G', risk: 68, trend: 'rising' },
                                    { zone: 'Coastal-3', risk: 34, trend: 'declining' }
                                ].map((p) => (
                                    <div key={p.zone} className="flex items-center justify-between">
                                        <span className="text-[9px] font-mono uppercase text-gray-400">{p.zone}</span>
                                        <div className="flex items-center gap-3">
                                            <div className="w-24 h-[1px] bg-white/10">
                                                <div className={`h-full ${p.risk > 50 ? 'bg-red-500' : 'bg-blue-500'}`} style={{ width: `${p.risk}%` }} />
                                            </div>
                                            <span className="text-[9px] font-mono text-white">{p.risk}%</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            </div>

            <footer className="fixed bottom-0 left-0 w-full p-6 flex justify-between items-center pointer-events-none z-50 bg-black/50 backdrop-blur-sm">
                <div className="text-[8px] font-mono text-gray-600 tracking-[0.5em] uppercase">
                    Rescue_Command // Core_Sys_v4.0
                </div>
                <div className="flex gap-6 items-center">
                    <span className="text-[8px] font-mono text-blue-500/50 tracking-[0.3em]">SECURE_HSA_LAYER</span>
                    <div className="w-12 h-[1px] bg-white/10" />
                    <span className="text-[8px] font-mono text-gray-600 tracking-[0.3em]">ALL ENTITIES LOGGED</span>
                </div>
            </footer>
        </div>
    )
}
