"use client"

import { Button } from "@/components/ui/button"
import { FileText, Download, ShieldCheck } from "lucide-react"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"

interface ExportReportButtonProps {
    data: any[]
    userEmail?: string | null
}

export function ExportReportButton({ data, userEmail }: ExportReportButtonProps) {
    const exportPDF = () => {
        const doc = new jsPDF()
        const timestamp = new Date().toLocaleString()

        // --- Header Section ---
        // Background for header
        doc.setFillColor(5, 5, 5) // Matches our dark theme bg
        doc.rect(0, 0, 210, 40, 'F')

        // Title
        doc.setTextColor(59, 130, 246) // Blue-500
        doc.setFont("helvetica", "bold")
        doc.setFontSize(24)
        doc.text("RESQ // OPERATIONAL REPORT", 14, 25)

        // Sub-header
        doc.setFontSize(8)
        doc.setFont("courier", "normal")
        doc.setTextColor(150, 150, 150)
        doc.text(`GENERATED_BY: ${userEmail || 'ANONYMOUS_UPLINK'}`, 14, 33)
        doc.text(`TIMESTAMP: ${timestamp}`, 140, 33)

        // --- Body Section ---
        doc.setTextColor(0, 0, 0)
        doc.setFont("helvetica", "bold")
        doc.setFontSize(14)
        doc.text("ACTIVE INCIDENT LOGS", 14, 55)

        const tableData = data.map((item, index) => [
            index + 1,
            item.title.toUpperCase(),
            `SEVERITY_0${item.severity}`,
            item.status.toUpperCase(),
            `${item.latitude.toFixed(4)}, ${item.longitude.toFixed(4)}`,
            new Date(item.created_at).toLocaleDateString()
        ])

        autoTable(doc, {
            startY: 65,
            head: [['ID', 'INCIDENT_TITLE', 'TIER', 'STATUS', 'COORDINATES', 'DETECTION_DATE']],
            body: tableData,
            theme: 'grid',
            headStyles: {
                fillColor: [59, 130, 246],
                textColor: [255, 255, 255],
                fontSize: 9,
                font: 'courier'
            },
            styles: {
                fontSize: 8,
                font: 'courier',
                cellPadding: 3
            },
            columnStyles: {
                2: { fontStyle: 'bold' }
            },
            didDrawPage: (dataArg: any) => {
                // Footer
                doc.setFontSize(7)
                doc.setTextColor(150, 150, 150)
                doc.text(
                    "PROPRIETARY DATA // ENCRYPTED VIA RESQ-NET PROTOCOL // PAGE " + dataArg.pageNumber,
                    14,
                    doc.internal.pageSize.height - 10
                )
            }
        })

        // --- Footer Seal ---
        const finalY = (doc as any).lastAutoTable.finalY + 20
        if (finalY < 270) {
            doc.setDrawColor(59, 130, 246)
            doc.setLineWidth(0.5)
            doc.line(14, finalY, 196, finalY)
            doc.setFontSize(8)
            doc.text("DOCUMENT VERIFIED BY ORBITAL MESH", 14, finalY + 10)
            doc.text("HSA COMPLIANT", 170, finalY + 10)
        }

        doc.save(`RESQ_OPERATIONAL_REPORT_${new Date().getTime()}.pdf`)
    }

    return (
        <Button
            onClick={exportPDF}
            variant="outline"
            className="flex items-center gap-2 px-6 py-2 border border-blue-500/20 hover:border-blue-500 transition-all text-[10px] tracking-widest uppercase font-mono text-blue-400 bg-transparent h-auto"
        >
            <FileText className="w-3 h-3" /> Export_PDF_Report
        </Button>
    )
}
