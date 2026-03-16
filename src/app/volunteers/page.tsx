import { createClient } from '@/utils/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import {
    Heart,
    ShieldCheck,
    ArrowLeft,
    Sparkles,
    Stethoscope,
    Truck,
    CookingPot,
    Wrench,
    MessageSquare
} from 'lucide-react'
import Link from 'next/link'

export default async function VolunteerPage() {
    const supabase = await createClient()

    return (
        <div className="min-h-screen bg-[#050505] text-white p-6 md:p-12 font-sans relative">
            {/* Visual background */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[150px] pointer-events-none" />

            <div className="max-w-4xl mx-auto space-y-12 relative z-10">
                <header className="space-y-6">
                    <Link href="/rescue-hub" className="flex items-center gap-2 text-[10px] font-mono text-gray-500 hover:text-blue-500 transition-colors uppercase tracking-[0.3em]">
                        <ArrowLeft className="w-3 h-3" /> Back_to_Hub
                    </Link>
                    <div className="flex items-center gap-4">
                        <Heart className="w-10 h-10 text-red-500 fill-red-500/20" />
                        <h1 className="text-5xl font-black tracking-tighter uppercase">Volunteer Registry</h1>
                    </div>
                    <p className="text-gray-500 font-mono text-xs uppercase tracking-widest leading-relaxed max-w-2xl">
                        Join the decentralized response network. Your skills can save lives in affected sectors.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

                    {/* Form Section */}
                    <Card className="bg-white/[0.02] border-white/10 backdrop-blur-2xl p-6">
                        <CardHeader>
                            <CardTitle className="text-sm font-mono tracking-[0.4em] text-blue-500 uppercase">Enlistment_Form</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form className="space-y-6">
                                <div className="space-y-2">
                                    <Label className="text-[10px] uppercase tracking-widest text-gray-500 font-mono">Specialized_Skills</Label>
                                    <div className="grid grid-cols-2 gap-3">
                                        {[
                                            { name: 'Medical', icon: Stethoscope },
                                            { name: 'Logistics', icon: Truck },
                                            { name: 'Engineering', icon: Wrench },
                                            { name: 'Coordination', icon: MessageSquare }
                                        ].map((skill) => (
                                            <label key={skill.name} className="flex items-center justify-between p-3 border border-white/5 bg-white/5 hover:border-blue-500/50 cursor-pointer transition-all">
                                                <div className="flex items-center gap-2">
                                                    <skill.icon className="w-3 h-3 text-blue-500" />
                                                    <span className="text-[10px] font-mono uppercase text-gray-300">{skill.name}</span>
                                                </div>
                                                <input type="checkbox" className="w-3 h-3 accent-blue-500" />
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-[10px] uppercase tracking-widest text-gray-500 font-mono">Current_Sector</Label>
                                    <Input placeholder="E.G. SECTOR 4-B / NORTH" className="bg-white/5 border-white/10 font-mono text-[10px] uppercase" />
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-[10px] uppercase tracking-widest text-gray-500 font-mono">Availability_Status</Label>
                                    <select className="w-full bg-white/5 border border-white/10 p-3 text-[10px] font-mono uppercase text-white outline-none">
                                        <option className="bg-gray-900">Immediate_Response</option>
                                        <option className="bg-gray-900">After_Hours</option>
                                        <option className="bg-gray-900">Remote_Support</option>
                                    </select>
                                </div>

                                <Button className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-[10px] font-black uppercase tracking-[0.5em] rounded-none">
                                    Submit_Application
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Info Section */}
                    <div className="space-y-12">
                        <section className="space-y-6">
                            <h2 className="text-[10px] font-mono tracking-[0.4em] text-white uppercase opacity-40">The_Volunteer_Pledge</h2>
                            <div className="space-y-4">
                                {[
                                    "Priority to civilian safety in all missions.",
                                    "Strict adherence to RESQ-NET coordinate protocols.",
                                    "Immediate reporting of sensor anomalies.",
                                    "Continuous communication with local hub."
                                ].map((pledge, i) => (
                                    <div key={i} className="flex gap-4 items-start">
                                        <span className="text-blue-500 font-mono text-[10px]">0{i + 1}</span>
                                        <p className="text-xs text-gray-400 font-mono uppercase tracking-tighter italic">"{pledge}"</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="p-8 bg-blue-500/5 border border-blue-500/20 flex items-center gap-6">
                            <Sparkles className="w-8 h-8 text-blue-500 shrink-0" />
                            <div className="space-y-1">
                                <h3 className="text-xs font-black uppercase tracking-widest">Network Rewards</h3>
                                <p className="text-[9px] text-gray-500 font-mono leading-relaxed">
                                    Verified volunteers gain priority access to RESQ-Tiers and equipment subsidies.
                                </p>
                            </div>
                        </section>

                        <div className="flex items-center gap-3 text-[8px] font-mono text-gray-700 tracking-[0.3em] uppercase italic">
                            <ShieldCheck className="w-3 h-3" /> Compliance_Enforced_by_Protocol_v4
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
