"use client"

import { useEffect, useState, ReactNode } from "react"
import { HeroSequence } from "./HeroSequence"
import Link from 'next/link'

interface HomeClientProps {
    user: any
    signOutAction: () => Promise<void>
    children: ReactNode
}

export function HomeClient({ user, signOutAction, children }: HomeClientProps) {
    const [scrollProgress, setScrollProgress] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight
            if (maxScroll <= 0) return
            setScrollProgress(scrollY / maxScroll)
        }

        window.addEventListener("scroll", handleScroll, { passive: true })
        handleScroll()
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    // Title fade: Fades out quickly (completed by 20% scroll)
    const titleOpacity = Math.max(0, 1 - scrollProgress * 5)

    // Background fade: Starts fading to black after 30% scroll, fully black by 60%
    const bgOverlayOpacity = Math.min(1, Math.max(0, (scrollProgress - 0.3) * 3.33))

    return (
        <main className="relative min-h-[400vh] text-white selection:bg-blue-500/30 overflow-x-hidden">
            {/* Background Sequence */}
            <div className="fixed inset-0 z-0">
                <HeroSequence />
                {/* Transitional Black Overlay */}
                <div
                    className="absolute inset-0 bg-black pointer-events-none transition-opacity duration-75"
                    style={{ opacity: bgOverlayOpacity }}
                />
            </div>

            {/* Decorative Sci-Fi Overlays */}
            <div className="fixed inset-0 z-10 pointer-events-none opacity-20">
                {/* Scanline effect */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] animate-pulse" />

                {/* Corner Brackets */}
                <div className="absolute top-12 left-12 w-8 h-8 border-t-2 border-l-2 border-blue-500/50" />
                <div className="absolute top-12 right-12 w-8 h-8 border-t-2 border-r-2 border-blue-500/50" />
                <div className="absolute bottom-12 left-12 w-8 h-8 border-b-2 border-l-2 border-blue-500/50" />
                <div className="absolute bottom-12 right-12 w-8 h-8 border-b-2 border-r-2 border-blue-500/50" />
            </div>

            {/* Navigation Layer */}
            <nav className="fixed top-0 z-50 w-full p-8 flex justify-between items-center mix-blend-difference">
                <div className="flex flex-col">
                    <span className="text-xl font-black tracking-[0.4em] text-white uppercase leading-none">RESQ</span>
                    <span className="text-[8px] tracking-[0.5em] text-blue-500 font-mono mt-1 uppercase">Orbital Intelligence</span>
                </div>

                <div className="flex items-center gap-8 md:gap-12 pointer-events-auto">
                    <Link href="/guidelines" className="group flex items-center gap-2">
                        <span className="text-[10px] tracking-widest text-gray-500 group-hover:text-blue-500 transition-all duration-500 uppercase font-mono">
                            Safety_Protocols
                        </span>
                    </Link>
                    {user ? (
                        <>
                            <Link href="/dashboard" className="group flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                                <span className="text-[10px] tracking-widest text-blue-500 group-hover:text-white transition-all duration-500 uppercase font-mono">
                                    Active_Dashboard
                                </span>
                            </Link>
                            <form action={signOutAction} className="group">
                                <button
                                    type="submit"
                                    className="text-[10px] tracking-widest text-gray-500 group-hover:text-red-500 transition-colors duration-500 pb-1 cursor-pointer font-mono uppercase bg-transparent border-none"
                                >
                                    Log_Out
                                </button>
                            </form>
                        </>
                    ) : (
                        <a href="/login" className="group flex items-center gap-3 px-6 py-2 border border-blue-500/20 hover:border-blue-500 transition-all duration-700 bg-blue-500/5">
                            <span className="text-[10px] tracking-[0.3em] text-white uppercase font-mono">
                                Portal_Access
                            </span>
                        </a>
                    )}
                </div>
            </nav>

            {/* Hero Title Layer - Fades out on scroll */}
            <div
                className="h-screen flex flex-col items-center justify-center sticky top-0 pointer-events-none z-10"
                style={{ opacity: titleOpacity, visibility: titleOpacity <= 0 ? 'hidden' : 'visible' }}
            >
                <div className="text-center space-y-4">
                    <div className="opacity-0 animate-[fadeIn_2s_ease-out_forwards]">
                        <h1 className="text-[10vw] font-black tracking-[-0.05em] leading-[0.85] mb-2 uppercase">
                            RESQ
                        </h1>
                        <div className="h-[1px] w-32 bg-blue-500 mx-auto mt-6 mb-4" />
                    </div>
                    <p className="text-[10px] tracking-[0.8em] font-mono text-blue-400 opacity-0 animate-[fadeIn_2s_ease-out_1s_forwards] uppercase">
                        Global Surveillance System
                    </p>
                    <div className="pt-12 opacity-0 animate-[fadeIn_2s_ease-out_1.5s_forwards] pointer-events-auto">
                        <a href={user ? "/dashboard" : "/login"} className="px-10 py-3 border border-blue-500/30 bg-blue-500/5 hover:bg-blue-500/10 hover:border-blue-500 transition-all duration-500 text-[10px] tracking-[0.4em] uppercase text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.1)] hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]">
                            {user ? "Enter Dashboard" : "Access Terminal"}
                        </a>
                    </div>
                </div>
            </div>

            {/* Main Content Layer */}
            <div className="relative z-20">
                {children}
            </div>

            {/* Subtle Bottom Telemetry */}
            <div className="fixed bottom-0 left-0 w-full p-8 z-50 flex justify-between items-end mix-blend-difference pointer-events-none">
                <div className="flex gap-12 text-[8px] font-mono text-gray-500 tracking-widest">
                    <div className="flex flex-col">
                        <span>SYSTEM_UPTIME</span>
                        <span className="text-white mt-1 uppercase">99.999% // SECURE</span>
                    </div>
                    <div className="flex flex-col">
                        <span>SAT_ARRAY</span>
                        <span className="text-blue-500 mt-1 uppercase">Active_Mesh_V4</span>
                    </div>
                    <div className="flex flex-col hidden sm:flex">
                        <span>NODES_CONNECTED</span>
                        <span className="text-white mt-1 uppercase">12,408_Global</span>
                    </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                    <div className="flex gap-4 items-center mb-1">
                        <div className="w-24 h-[1px] bg-blue-500/20">
                            <div className="h-full bg-blue-500 animate-[loading_2s_infinite]" style={{ width: '40%' }} />
                        </div>
                        <span className="text-[8px] font-mono text-blue-500 uppercase tracking-widest animate-pulse">Real_Time_Sync</span>
                    </div>
                    <div className="text-[8px] font-mono text-gray-600 tracking-[0.3em]">
                        COORDINATES: 35.6762° N, 139.6503° E
                    </div>
                </div>
            </div>
        </main>
    )
}
