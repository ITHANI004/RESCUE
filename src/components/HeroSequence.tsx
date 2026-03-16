"use client"

import { useEffect, useRef, useState } from "react"

export function HeroSequence() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [images, setImages] = useState<HTMLImageElement[]>([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const frameCount = 80

    // Preload images
    useEffect(() => {
        const loadedImages: HTMLImageElement[] = []
        let loadedCount = 0

        const prefix = "Smooth_transition_from_1080p_202602211705_"

        for (let i = 0; i < frameCount; i++) {
            const img = new Image()
            const index = i.toString().padStart(3, '0')
            img.src = `/hero/${prefix}${index}.jpg`
            img.onload = () => {
                loadedCount++
                if (loadedCount === frameCount) {
                    setImages(loadedImages)
                }
            }
            loadedImages.push(img)
        }
    }, [])

    // Scroll listener
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight
            if (maxScroll <= 0) return

            const scrollFraction = scrollTop / maxScroll
            const frameIndex = Math.min(
                frameCount - 1,
                Math.floor(scrollFraction * frameCount)
            )

            setCurrentIndex(frameIndex)
        }

        window.addEventListener("scroll", handleScroll, { passive: true })
        // Initial call
        handleScroll()

        return () => window.removeEventListener("scroll", handleScroll)
    }, [images])

    // Draw to canvas
    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas || images.length === 0) return

        const context = canvas.getContext("2d")
        if (!context) return

        const img = images[currentIndex]
        if (!img) return

        // Cover logic
        const canvasWidth = canvas.width
        const canvasHeight = canvas.height
        const imgWidth = img.width
        const imgHeight = img.height

        const ratio = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight)
        const newWidth = imgWidth * ratio
        const newHeight = imgHeight * ratio
        const x = (canvasWidth - newWidth) / 2
        const y = (canvasHeight - newHeight) / 2

        context.clearRect(0, 0, canvasWidth, canvasHeight)
        context.drawImage(img, x, y, newWidth, newHeight)
    }, [currentIndex, images])

    // Resize canvas
    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth
                canvasRef.current.height = window.innerHeight
            }
        }

        window.addEventListener("resize", handleResize)
        handleResize()

        return () => window.removeEventListener("resize", handleResize)
    }, [])

    return (
        <div className="h-screen w-full fixed inset-0 -z-10 bg-black overflow-hidden">
            <canvas
                ref={canvasRef}
                className="block w-full h-full object-cover"
            />
            {/* Overlay Gradient to match the old design */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 pointer-events-none" />

            {/* Loading state */}
            {images.length < frameCount && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 text-blue-500 font-mono text-xs tracking-widest z-50">
                    INITIALIZING VISUAL FEED... {Math.round((images.length / frameCount) * 100)}%
                </div>
            )}
        </div>
    )
}
