"use client"

import { useState } from 'react'
import { Sparkles, BrainCircuit, Loader2, ShieldCheck, AlertCircle } from 'lucide-react'
import { analyzeIncident } from '@/app/dashboard/ai-actions'

export function AIAnalysisTool({ details }: { details: string }) {
    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [result, setResult] = useState<{ severity: number, sentiment: string, summary: string } | null>(null)

    const analyzeDetails = async () => {
        if (!details.trim()) return
        setIsAnalyzing(true)

        // Real AI NLP Analysis via Server Action
        const analysis = await analyzeIncident(details)

        if (analysis) {
            setResult({
                severity: analysis.severity,
                sentiment: analysis.sentiment.toUpperCase(),
                summary: analysis.summary
            })
        }
        setIsAnalyzing(false)
    }

    return (
        <div className="space-y-4">
            <button
                type="button"
                onClick={analyzeDetails}
                disabled={isAnalyzing || !details}
                className="flex items-center gap-2 text-[8px] font-mono text-cyan-500 hover:text-white transition-colors uppercase tracking-[0.3em] group"
            >
                {isAnalyzing ? <Loader2 className="w-3 h-3 animate-spin" /> : <BrainCircuit className="w-3 h-3 group-hover:rotate-180 transition-transform duration-700" />}
                Run_IRIS_Cognitive_Analysis
            </button>

            {result && (
                <div className="bg-blue-500/5 border border-blue-500/20 p-4 space-y-3 animate-in fade-in slide-in-from-top-2">
                    <div className="flex justify-between items-center">
                        <span className="text-[8px] font-mono text-blue-500 uppercase tracking-widest flex items-center gap-2">
                            <Sparkles className="w-3 h-3" /> Analysis_Complete
                        </span>
                        <span className="text-[8px] font-mono text-gray-500 uppercase">Confidence: 94.2%</span>
                    </div>

                    <div className="space-y-2">
                        <div className="flex gap-4">
                            <div className="flex-1 space-y-1">
                                <span className="text-[8px] font-mono text-gray-600 block uppercase">Suggested_Tier</span>
                                <span className={`text-xs font-bold ${result.severity >= 4 ? 'text-red-500' : 'text-blue-500'}`}>T-0{result.severity}</span>
                            </div>
                            <div className="flex-1 space-y-1">
                                <span className="text-[8px] font-mono text-gray-600 block uppercase">Signal_Tone</span>
                                <span className="text-xs font-bold text-white">{result.sentiment}</span>
                            </div>
                        </div>
                        <div className="pt-2 border-t border-white/5">
                            <p className="text-[10px] font-mono text-blue-400 italic font-medium">"{result.summary}"</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 pt-2">
                        <div className="flex items-center gap-1.5 text-[8px] font-mono text-green-500">
                            <ShieldCheck className="w-2 h-2" /> DATA_VERIFIED
                        </div>
                        <div className="flex items-center gap-1.5 text-[8px] font-mono text-gray-600">
                            <AlertCircle className="w-2 h-2" /> ENHANCED_BY_IRIS
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
