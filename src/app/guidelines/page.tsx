import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
    Flame,
    Droplets,
    Wind,
    Zap,
    ShieldCheck,
    BookOpen,
    PhoneCall,
    Activity,
    ArrowLeft
} from 'lucide-react'
import Link from 'next/link'

export default function GuidelinesPage() {
    const categories = [
        {
            title: "Fire Emergencies",
            icon: Flame,
            color: "text-red-500",
            bg: "bg-red-500/5",
            border: "border-red-500/20",
            tips: [
                "Stay low to the ground to avoid smoke inhalation.",
                "Check doors for heat before opening.",
                "Stop, Drop, and Roll if your clothing catches fire.",
                "Identify at least two exit routes from every room."
            ]
        },
        {
            title: "Flood Response",
            icon: Droplets,
            color: "text-blue-500",
            bg: "bg-blue-500/5",
            border: "border-blue-500/20",
            tips: [
                "Move to higher ground immediately.",
                "Do not walk or drive through flood waters.",
                "Avoid contact with floodwater—it may be contaminated.",
                "Turn off utilities at the main switches if safe."
            ]
        },
        {
            title: "Severe Wind / Cyclone",
            icon: Wind,
            color: "text-cyan-500",
            bg: "bg-cyan-500/5",
            border: "border-cyan-500/20",
            tips: [
                "Seek shelter in a sturdy building.",
                "Stay away from windows and glass doors.",
                "Listen to local radio for emergency updates.",
                "Secure loose outdoor items that could become projectiles."
            ]
        },
        {
            title: "Electrical Hazard",
            icon: Zap,
            color: "text-yellow-500",
            bg: "bg-yellow-500/5",
            border: "border-yellow-500/20",
            tips: [
                "Never touch downed power lines.",
                "Avoid water if there is a risk of electrical shock.",
                "Use a non-conductive object (like wood) to move victims.",
                "Shut off power at the breaker if there's a localized surge."
            ]
        }
    ]

    return (
        <div className="min-h-screen bg-[#050505] text-white p-6 md:p-12 font-sans">
            <div className="max-w-6xl mx-auto space-y-12">
                <header className="space-y-6">
                    <Link href="/" className="flex items-center gap-2 text-[10px] font-mono text-gray-500 hover:text-blue-500 transition-colors uppercase tracking-[0.3em]">
                        <ArrowLeft className="w-3 h-3" /> Back_to_Portal
                    </Link>
                    <div className="flex items-center gap-4">
                        <BookOpen className="w-8 h-8 text-blue-500" />
                        <h1 className="text-5xl font-black tracking-tighter uppercase">Safety Protocols</h1>
                    </div>
                    <p className="text-gray-500 max-w-2xl font-mono text-xs uppercase tracking-widest leading-relaxed">
                        Standard Operating Procedures for civilians and first responders during critical environmental events.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {categories.map((cat) => (
                        <Card key={cat.title} className={`${cat.bg} ${cat.border} border backdrop-blur-xl group hover:border-blue-500/40 transition-all duration-500`}>
                            <CardHeader className="flex flex-row items-center gap-4">
                                <cat.icon className={`w-6 h-6 ${cat.color}`} />
                                <CardTitle className="text-xl font-bold uppercase tracking-tight">{cat.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <ul className="space-y-3">
                                    {cat.tips.map((tip, i) => (
                                        <li key={i} className="flex gap-4 text-xs font-mono text-gray-400">
                                            <span className="text-blue-500/50">0{i + 1}</span>
                                            <span className="uppercase tracking-tighter">{tip}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <section className="bg-white/5 border border-white/10 p-12 space-y-8">
                    <div className="flex items-center gap-4">
                        <PhoneCall className="w-6 h-6 text-green-500" />
                        <h2 className="text-2xl font-black uppercase tracking-tighter text-green-500">Emergency Contacts</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-[10px] font-mono tracking-widest text-gray-400">
                        <div className="space-y-2">
                            <span className="text-blue-500">GLOBAL_RELIEF</span>
                            <p className="text-2xl text-white font-black">+1 800-RESQ-000</p>
                        </div>
                        <div className="space-y-2">
                            <span className="text-blue-500">LOCAL_DEPLOYMENT</span>
                            <p className="text-2xl text-white font-black">Dial 911 / 112</p>
                        </div>
                        <div className="space-y-2">
                            <span className="text-blue-500">SATELLITE_UPLINK</span>
                            <p className="text-2xl text-white font-black">Channel 14.KHZ</p>
                        </div>
                    </div>
                </section>

                <footer className="text-center pt-12">
                    <div className="flex justify-center gap-12 text-[8px] font-mono text-gray-600 tracking-[0.5em] uppercase">
                        <div className="flex items-center gap-2 italic"><ShieldCheck className="w-3 h-3 text-blue-500/50" /> Data Verified by RESQ-NET</div>
                        <div className="flex items-center gap-2 italic"><Activity className="w-3 h-3 text-blue-500/50" /> Updated 2m Ago</div>
                    </div>
                </footer>
            </div>
        </div>
    )
}
