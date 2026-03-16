"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import {
    AlertTriangle,
    MapPin,
    Camera,
    Send,
    ShieldAlert,
    ArrowLeft,
    Loader2,
    Navigation,
    BrainCircuit,
    Sparkles
} from 'lucide-react'
import Link from 'next/link'
import { submitReport } from './actions'

export default function ReportPage() {
    const [isLocating, setIsLocating] = useState(false)
    const [coords, setCoords] = useState({ lat: '', lng: '' })

    const handleGetLocation = () => {
        setIsLocating(true)
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setCoords({
                        lat: position.coords.latitude.toFixed(6),
                        lng: position.coords.longitude.toFixed(6)
                    })
                    setIsLocating(false)
                },
                (error) => {
                    console.error("Error getting location:", error)
                    alert("Could not retrieve location. Please ensure GPS is enabled.")
                    setIsLocating(false)
                }
            )
        } else {
            alert("Geolocation is not supported by your browser.")
            setIsLocating(false)
        }
    }

    return (
        <div className="min-h-screen bg-[#050505] text-white p-6 md:p-12 font-sans relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-500/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto space-y-12">
                <header className="space-y-6">
                    <Link href="/dashboard" className="flex items-center gap-2 text-[10px] font-mono text-gray-500 hover:text-red-500 transition-colors uppercase tracking-[0.3em]">
                        <ArrowLeft className="w-3 h-3" /> Abort_Mission
                    </Link>
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-red-500/10 border border-red-500/50">
                            <ShieldAlert className="w-8 h-8 text-red-500" />
                        </div>
                        <h1 className="text-5xl font-black tracking-tighter uppercase">Field Report</h1>
                    </div>
                    <p className="text-gray-500 font-mono text-xs uppercase tracking-widest leading-relaxed">
                        Incident data submission portal. Use the auto-sync feature to verify your exact location.
                    </p>
                </header>

                <Card className="bg-white/[0.02] border-white/10 backdrop-blur-2xl shadow-2xl">
                    <CardHeader>
                        <CardTitle className="text-sm font-mono tracking-[0.4em] text-blue-500 uppercase">Input_Parameters</CardTitle>
                        <CardDescription className="text-[10px] font-mono uppercase tracking-widest text-gray-600">Secure connection established via satellite bridge</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form action={submitReport} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <Label className="text-[10px] uppercase tracking-widest text-gray-500 font-mono">Incident_Type</Label>
                                    <select
                                        name="type"
                                        className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm font-mono tracking-wider focus:border-red-500/50 focus:outline-none transition-all appearance-none uppercase text-white"
                                        required
                                    >
                                        <option value="earthquake" className="bg-gray-900">Earthquake</option>
                                        <option value="flood" className="bg-gray-900">Flood</option>
                                        <option value="fire" className="bg-gray-900">Fire / Wildfire</option>
                                        <option value="landslide" className="bg-gray-900">Landslide</option>
                                        <option value="hurricane" className="bg-gray-900">Hurricane / Storm</option>
                                        <option value="medical" className="bg-gray-900">Medical Emergency</option>
                                        <option value="other" className="bg-gray-900">Other Anomaly</option>
                                    </select>
                                </div>

                                <div className="space-y-4">
                                    <Label className="text-[10px] uppercase tracking-widest text-gray-500 font-mono">Precision_Severity_Tiers</Label>
                                    <div className="flex gap-2">
                                        {[1, 2, 3, 4, 5].map((level) => (
                                            <label key={level} className="flex-1 cursor-pointer group">
                                                <input type="radio" name="severity" value={level} className="sr-only peer" defaultChecked={level === 1} />
                                                <div className="h-10 flex items-center justify-center border border-white/10 bg-white/5 text-[10px] font-mono peer-checked:bg-red-500 peer-checked:text-white peer-checked:border-red-500 transition-all group-hover:bg-white/10">
                                                    T-{level}
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <Label className="text-[10px] uppercase tracking-widest text-gray-500 font-mono">Estimated_Impact (PERSONNEL)</Label>
                                    <Input
                                        name="affected_count"
                                        type="number"
                                        placeholder="000"
                                        className="bg-white/5 border-white/10 font-mono text-xs uppercase tracking-[0.2em] focus:border-blue-500/50"
                                        min="0"
                                    />
                                </div>
                                <div className="space-y-4">
                                    <Label className="text-[10px] uppercase tracking-widest text-gray-500 font-mono">Direct_Access_Line</Label>
                                    <Input
                                        name="contact_number"
                                        type="tel"
                                        placeholder="+XX-XXXX-XXXXXX"
                                        className="bg-white/5 border-white/10 font-mono text-xs uppercase tracking-[0.2em] focus:border-blue-500/50"
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <Label className="text-[10px] uppercase tracking-widest text-gray-500 font-mono">Description_of_Anomaly</Label>
                                <textarea
                                    name="details"
                                    rows={4}
                                    placeholder="PROVIDE DETAILED ACCOUNT OF THE INCIDENT..."
                                    className="w-full bg-white/5 border border-white/10 p-4 text-xs font-mono tracking-widest focus:border-red-500/50 focus:outline-none transition-all uppercase resize-none h-32 text-white"
                                    required
                                />
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between items-end">
                                    <Label className="text-[10px] uppercase tracking-widest text-gray-500 font-mono">Geospatial_Coordinates</Label>
                                    <button
                                        type="button"
                                        onClick={handleGetLocation}
                                        disabled={isLocating}
                                        className="flex items-center gap-2 text-[8px] font-mono text-blue-500 hover:text-white transition-colors uppercase tracking-widest"
                                    >
                                        {isLocating ? <Loader2 className="w-3 h-3 animate-spin" /> : <Navigation className="w-3 h-3" />}
                                        {isLocating ? "Syncing_GPS..." : "Auto_Fetch_Location"}
                                    </button>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-600" />
                                        <Input
                                            name="latitude"
                                            placeholder="LATITUDE"
                                            value={coords.lat}
                                            onChange={(e) => setCoords({ ...coords, lat: e.target.value })}
                                            className="bg-white/5 border-white/10 pl-9 font-mono text-[10px] uppercase tracking-[0.2em]"
                                            required
                                        />
                                    </div>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-600" />
                                        <Input
                                            name="longitude"
                                            placeholder="LONGITUDE"
                                            value={coords.lng}
                                            onChange={(e) => setCoords({ ...coords, lng: e.target.value })}
                                            className="bg-white/5 border-white/10 pl-9 font-mono text-[10px] uppercase tracking-[0.2em]"
                                            required
                                        />
                                    </div>
                                </div>
                                <p className="text-[8px] italic text-gray-600 font-mono tracking-widest uppercase">Verified coordinates ensure priority response.</p>
                            </div>

                            <div className="pt-6 space-y-4">
                                <Button type="submit" className="w-full h-14 bg-red-600 hover:bg-red-700 font-black tracking-[0.5em] uppercase text-xs rounded-none group transition-all text-white">
                                    <span className="flex items-center gap-3">
                                        Transmit_Data <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </Button>
                                <div className="text-[8px] text-center font-mono text-gray-700 tracking-[0.3em] uppercase">
                                    Authorized personnel are civilly protected under RESQ-ACT Section_8.
                                </div>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
