"use client"

import { login, signup } from './actions'
import { HeroSequence } from '@/components/HeroSequence'
import { Terminal, Shield, Lock, ArrowRight, Activity, Cpu, Loader2, CheckCircle2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginClient({ message: propMessage }: { message?: string }) {
    const [isAuthenticating, setIsAuthenticating] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [isSignupSuccess, setIsSignupSuccess] = useState<string | null>(null)
    const [localError, setLocalError] = useState<string | null>(null)
    const router = useRouter()

    const displayMessage = localError || propMessage

    async function handleAuth(formData: FormData, action: 'login' | 'signup') {
        setIsAuthenticating(true)
        setLocalError(null)
        setIsSignupSuccess(null)

        try {
            const result = action === 'login' ? await login(formData) : await signup(formData)

            if (result?.error) {
                setIsAuthenticating(false)
                setLocalError(result.error)
            } else if (action === 'login') {
                setIsSuccess(true)
                setTimeout(() => {
                    router.push('/dashboard')
                }, 2500)
            } else if (action === 'signup') {
                setIsAuthenticating(false)
                // Safely check if message exists in the result object
                const successMessage = 'message' in result ? result.message : 'Registration successful!'
                setIsSignupSuccess(successMessage)
            }
        } catch (err) {
            setIsAuthenticating(false)
            setLocalError('An unexpected error occurred. Please try again.')
        }
    }

    return (
        <div className="relative min-h-screen flex items-center justify-center p-6 bg-black overflow-hidden selection:bg-blue-500/30">
            {/* 1. Background Content */}
            <HeroSequence />

            <div className="absolute inset-0 bg-black/60 pointer-events-none z-0" />

            {/* Sci-Fi Decorative Layer */}
            <div className="absolute inset-0 z-10 pointer-events-none opacity-20">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(59,130,246,0.06),rgba(0,0,0,0.02),rgba(59,130,246,0.06))] bg-[length:100%_2px,3px_100%] animate-pulse" />
                <div className="absolute top-8 left-8 w-12 h-12 border-t border-l border-blue-500/40" />
                <div className="absolute top-8 right-8 w-12 h-12 border-t border-r border-blue-500/40" />
                <div className="absolute bottom-8 left-8 w-12 h-12 border-b border-l border-blue-500/40" />
                <div className="absolute bottom-8 right-8 w-12 h-12 border-b border-r border-blue-500/40" />
            </div>

            {/* Overlays */}
            <AnimatePresence>
                {/* 1. Login Success Overlay */}
                {isSuccess && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black backdrop-blur-md"
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="flex flex-col items-center gap-6"
                        >
                            <div className="relative">
                                <motion.div animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} className="absolute -inset-4 border border-dashed border-blue-500/30 rounded-full" />
                                <Shield className="w-20 h-20 text-blue-500 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
                            </div>
                            <div className="text-center space-y-2">
                                <h2 className="text-4xl font-black tracking-tighter text-white uppercase">Access Granted</h2>
                                <p className="text-[10px] font-mono text-blue-400 tracking-[0.5em] uppercase">Welcome to RESQ-DMS Hub</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}

                {/* 2. Signup Success Overlay */}
                {isSignupSuccess && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/90 backdrop-blur-md"
                    >
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="max-w-md w-full p-8 border border-blue-500/20 bg-blue-500/5 text-center flex flex-col items-center gap-6"
                        >
                            <CheckCircle2 className="w-16 h-16 text-emerald-500" />
                            <div className="space-y-2">
                                <h2 className="text-2xl font-mono text-white uppercase tracking-widest">Verification Sent</h2>
                                <p className="text-xs font-mono text-gray-400 leading-relaxed uppercase">
                                    {isSignupSuccess}
                                </p>
                            </div>
                            <button
                                onClick={() => setIsSignupSuccess(null)}
                                className="px-8 py-2 border border-blue-500/40 text-blue-500 font-mono text-[10px] tracking-widest hover:bg-blue-500/10 transition-all"
                            >
                                [ Return_To_Portal ]
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="container relative z-20 max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between px-4 lg:px-20">

                {/* Left Column: Branding */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex flex-col items-center lg:items-start text-center lg:text-left shrink-0"
                >
                    <div className="mb-6 inline-flex items-center gap-2 px-3 py-1 border border-blue-500/20 bg-blue-500/5 rounded-full">
                        <Activity className="w-3 h-3 text-blue-500 animate-pulse" />
                        <span className="text-[10px] font-mono tracking-widest text-blue-400 uppercase">System_Entry_v4.2</span>
                    </div>
                    <div className="space-y-2">
                        <h1 className="text-7xl lg:text-8xl font-black tracking-tighter leading-none text-white uppercase">
                            RESQ<span className="block text-blue-500 tracking-[-0.08em]">DMS</span>
                        </h1>
                        <div className="h-[1px] w-full bg-gradient-to-r from-blue-500/50 to-transparent my-6" />
                        <p className="text-[10px] tracking-[0.6em] font-mono text-gray-500 uppercase leading-relaxed max-w-[280px]">
                            Orbital_Intelligence_Access_Grid
                        </p>
                    </div>
                </motion.div>

                {/* Right Column: Auth Interface */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="w-full max-w-[620px]"
                >
                    <div className="relative group">
                        <div className="absolute -inset-[1px] border border-blue-500/20 group-hover:border-blue-500/40 transition-colors duration-500" />
                        <div className="relative bg-black/80 backdrop-blur-3xl p-8 md:p-10 lg:p-12 shadow-2xl overflow-hidden">
                            <div className="absolute h-full w-[1px] bg-blue-500/10 top-0 left-0 animate-[loading_4s_infinite]" />

                            <div className="mb-8 flex flex-col items-start gap-4">
                                <div className="flex items-center gap-4 w-full">
                                    <div className="p-2 border border-blue-500/30 bg-blue-500/5">
                                        <Terminal className="w-5 h-5 text-blue-500" />
                                    </div>
                                    <div className="flex-1 h-[1px] bg-gradient-to-r from-blue-500/20 to-transparent" />
                                </div>
                                <h2 className="text-lg font-mono tracking-widest text-white uppercase">Portal_Access_Terminal</h2>
                            </div>

                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-mono text-blue-500 uppercase tracking-[0.3em]">User_Identifier</label>
                                        <input name="email" type="email" placeholder="OFFICER@RESQ.DMS" className="w-full bg-blue-500/5 border border-blue-500/10 px-4 py-3 text-white text-[10px] font-mono uppercase focus:outline-none focus:border-blue-500/50 transition-all" required />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-mono text-blue-500 uppercase tracking-[0.3em]">Access_Code</label>
                                        <input name="password" type="password" placeholder="********" className="w-full bg-blue-500/5 border border-blue-500/10 px-4 py-3 text-white font-mono focus:outline-none focus:border-blue-500/50 transition-all" required />
                                    </div>
                                </div>

                                {displayMessage && (
                                    <div className="px-4 py-2 border border-red-500/20 bg-red-500/5 text-red-500 text-[9px] font-mono uppercase tracking-widest text-center">
                                        [!] {localError ? `ERROR: ${localError}` : propMessage}
                                    </div>
                                )}

                                <div className="space-y-4 pt-4">
                                    <button
                                        formAction={(data) => handleAuth(data, 'login')}
                                        disabled={isAuthenticating}
                                        className="group relative w-full py-4 bg-blue-500/10 border border-blue-500/40 hover:border-blue-500 hover:bg-blue-500/20 text-blue-400 font-mono text-[10px] tracking-[0.4em] uppercase transition-all flex items-center justify-center gap-3 overflow-hidden active:scale-[0.98] disabled:opacity-50"
                                    >
                                        <span className="relative flex items-center gap-2">
                                            {isAuthenticating ? <><Loader2 className="w-3 h-3 animate-spin" /> Process_Running</> : <>Execute_Log_In <ArrowRight className="w-3 h-3" /></>}
                                        </span>
                                    </button>

                                    <div className="flex items-center gap-4 py-2">
                                        <div className="h-[1px] flex-1 bg-blue-500/10" />
                                        <span className="text-[8px] font-mono text-gray-700 uppercase tracking-widest">New_Personnel</span>
                                        <div className="h-[1px] flex-1 bg-blue-500/10" />
                                    </div>

                                    <button
                                        formAction={(data) => handleAuth(data, 'signup')}
                                        disabled={isAuthenticating}
                                        className="w-full py-3 bg-transparent border border-gray-800 hover:border-blue-500/40 hover:text-blue-400 text-gray-500 font-mono text-[9px] tracking-[0.3em] uppercase transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                                    >
                                        // Request_New_Identity
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
