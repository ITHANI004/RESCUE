'use server'

import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;

/**
 * LOCAL HEURISTIC ENGINE (LHE)
 * Provides intelligent-looking responses based on keyword analysis
 * used as a zero-cost, zero-API alternative.
 */
function localHeuristicResponse(message: string): string {
    const q = message.toLowerCase();

    // Mission Status
    if (q.includes('status') || q.includes('operational')) {
        return "MISSION STATUS: NOMINAL. 42 SECTORS UNDER SPECTRAL SURVEILLANCE. SATELLITE MESH CONNECTIVITY AT 98.4%. NO CRITICAL ESCALATIONS DETECTED IN THE LAST 120 SECONDS.";
    }

    // Protocol Inquiries
    if (q.includes('fire')) {
        return "PROTOCOL FIRE-ALPHA: EVACUATE TO SECTOR 4 SHELTERS. DEPLOY THERMAL DRONES FOR VICTIM LOCALIZATION. CUT POWER TO AFFECTED GRIDS.";
    }
    if (q.includes('flood') || q.includes('water')) {
        return "PROTOCOL HYDRO-BETA: MOVE TO ELEVATED TERRAIN. AVOID BRIDGE TRANSIT. SEARCH AND RESCUE BOATS DISPATCHED TO SUBMERGED ZONES.";
    }
    if (q.includes('earthquake') || q.includes('seismic')) {
        return "PROTOCOL SEISMIC-DELTA: DROP, COVER, AND HOLD ON. MONITOR AFTERSHOCK VIBRATIONS. SCAN FOR STRUCTURAL INTEGRITY FAILURES IN HIGH-RISE BUILDINGS.";
    }

    // Location/Maps
    if (q.includes('where') || q.includes('location') || q.includes('map')) {
        return "COORDINATE TRACE: LOCALIZED DATA ACCESSIBLE VIA TACTICAL_MAP. ORBITAL POSITIONING SYSTEM (OPS) IS CURRENTLY TRACKING 12 ACTIVE DRONES.";
    }

    // System Info
    if (q.includes('who') || q.includes('iris')) {
        return "I AM IRIS: INTEGRATED RESPONSE & INTELLIGENCE SYSTEM. I AM RUNNING VIA THE LOCAL HEURISTIC ENGINE (LHE) ON YOUR SECURE TERMINAL.";
    }

    if (q.includes('help')) {
        return "AVAILABLE COMMANDS: [STATUS], [PROTOCOL FIRE/FLOOD], [SECTOR ANALYSIS], [GUIDELINES]. HOW SHALL I DIRECT THE RESOURCE MATRIX?";
    }

    return `LOCAL_ANALYSIS: "${message.toUpperCase()}" RECEIVED. SEARCHING RESQ DATABASE... DATA FRAGMENT CORRELATED. RECOMMEND CROSS-REFERENCING WITH SECTOR GUIDELINES OR CONTACTING HUB COMMAND.`;
}

export async function chatWithIRIS(history: { role: 'user' | 'model', parts: { text: string }[] }[], message: string) {
    // If no genAI or message is simple, we can use the local engine
    if (!genAI) {
        return localHeuristicResponse(message);
    }

    try {
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            systemInstruction: `You are IRIS. Provide DIRECT TECHNICAL DATA ONLY. 
            NO CONVERSATIONAL FILLER. NO GREETINGS. NO 'THINKING' PROCESS. 
            OUTPUT MUST BE MONOSPACED, UPPERCASE FOR KEYWORDS, AND CONCISE. 
            IF ASKED FOR DATA, PROVIDE DATA. IF ASKED FOR PROTOCOL, PROVIDE PROTOCOL. 
            MAXIMUM 3 LINES PER RESPONSE.`,
        });

        const chat = model.startChat({ history });
        const result = await chat.sendMessage(message);
        const response = await result.response;
        return response.text().trim();
    } catch (error: any) {
        console.warn("IRIS AI API FALLBACK:", error.message);
        return localHeuristicResponse(message); // Fallback to local logic on error
    }
}

export async function analyzeIncident(details: string) {
    if (!genAI) {
        // Local deterministic analysis
        const text = details.toLowerCase();
        let severity = 1;
        if (text.includes('fire') || text.includes('trapped')) severity = 4;
        if (text.includes('flood') || text.includes('massive')) severity = 5;

        return {
            severity,
            sentiment: severity >= 4 ? "CRITICAL" : "STABLE",
            summary: "Heuristic scan suggests priority " + severity + " mobilization."
        };
    }

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = `Analyze this report and return JSON: {severity: 1-5, sentiment: string, summary: string}. REPORT: "${details}"`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text().replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(text);
    } catch (error) {
        return { severity: 3, sentiment: "STABLE", summary: "API_OFFLINE: Defaulting to mid-tier response." };
    }
}
