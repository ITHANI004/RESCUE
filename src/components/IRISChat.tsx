"use client"

import { useState, useEffect, useRef } from 'react'
import {
    Bot,
    Send,
    X,
    Minimize2,
    Maximize2,
    Sparkles,
    Zap,
    ShieldAlert,
    Terminal,
    Cpu
} from 'lucide-react'
import { Button } from '@/components/ui/button'

import { chatWithIRIS } from '@/app/dashboard/ai-actions'

export function IRISChat() {
    const [isOpen, setIsOpen] = useState(false)
    const [isMinimized, setIsMinimized] = useState(false)
    const [messages, setMessages] = useState<{ role: 'ai' | 'user', content: string }[]>([
        { role: 'ai', content: 'IRIS // ONLINE. INTEGRATED RESPONSE & INTELLIGENCE SYSTEM ACTIVE. HOW CAN I ASSIST IN GLOBAL MONITORING TODAY?' }
    ])
    const [input, setInput] = useState('')
    const [isTyping, setIsTyping] = useState(false)
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [messages])

    const handleSend = async () => {
        if (!input.trim()) return

        const userMessage = input.trim()
        setMessages(prev => [...prev, { role: 'user', content: userMessage.toUpperCase() }])
        setInput('')
        setIsTyping(true)

        // Real AI Processing via Server Action
        // Filter out the initial AI greeting as history must start with 'user'
        const aiHistory = messages
            .filter((_, index) => index !== 0)
            .map(m => ({
                role: m.role === 'ai' ? 'model' as const : 'user' as const,
                parts: [{ text: m.content }]
            }))

        const response = await chatWithIRIS(aiHistory, userMessage)

        setMessages(prev => [...prev, { role: 'ai', content: response.toUpperCase() }])
        setIsTyping(false)
    }

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-24 right-8 z-[100] p-4 bg-blue-600 rounded-full shadow-[0_0_30px_rgba(37,99,235,0.4)] hover:scale-110 transition-all group animate-bounce"
            >
                <Bot className="w-6 h-6 text-white" />
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                </span>
            </button>
        )
    }

    return (
        <div className={`fixed z-[100] h-[500px] w-80 transition-all duration-500 bg-black/80 backdrop-blur-2xl border border-blue-500/30 flex flex-col shadow-2xl ${isMinimized ? 'bottom-8 right-8 h-14' : 'bottom-8 right-8'
            }`}>
            {/* Header */}
            <div className="p-4 border-b border-blue-500/20 flex items-center justify-between bg-blue-500/5">
                <div className="flex items-center gap-2">
                    <Terminal className="w-3 h-3 text-blue-500" />
                    <span className="text-[10px] font-mono font-black text-blue-500 tracking-[0.2em] uppercase">IRIS_Terminal v9.4</span>
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={() => setIsMinimized(!isMinimized)}>
                        {isMinimized ? <Maximize2 className="w-3 h-3 text-gray-500 hover:text-white" /> : <Minimize2 className="w-3 h-3 text-gray-500 hover:text-white" />}
                    </button>
                    <button onClick={() => setIsOpen(false)}>
                        <X className="w-3 h-3 text-gray-500 hover:text-red-500" />
                    </button>
                </div>
            </div>

            {!isMinimized && (
                <>
                    {/* Messages */}
                    <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                        {messages.map((m, i) => (
                            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] p-3 rounded-none text-[10px] font-mono leading-relaxed tracking-wider ${m.role === 'user'
                                    ? 'bg-blue-600/20 border border-blue-500/30 text-white italic'
                                    : 'bg-white/5 border border-white/5 text-gray-300'
                                    }`}>
                                    <div className="flex items-center gap-2 mb-1 opacity-50">
                                        {m.role === 'ai' ? <Cpu className="w-2 h-2" /> : <Zap className="w-2 h-2" />}
                                        <span>{m.role === 'ai' ? 'SYSTEM' : 'OPERATOR'}</span>
                                    </div>
                                    {m.content}
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="bg-white/5 border border-white/5 p-3 text-[10px] font-mono text-blue-500 flex gap-2">
                                    <span className="animate-pulse">_</span>
                                    <span className="animate-pulse delay-75">_</span>
                                    <span className="animate-pulse delay-150">_</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Input */}
                    <div className="p-4 border-t border-blue-500/20 bg-blue-500/5">
                        <div className="relative">
                            <input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="INPUT COMMAND..."
                                className="w-full bg-black/50 border border-blue-500/20 p-3 pr-10 text-[xs text-white font-mono placeholder:text-gray-700 focus:outline-none focus:border-blue-500 transition-all uppercase"
                            />
                            <button
                                onClick={handleSend}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500 hover:text-white transition-colors"
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
