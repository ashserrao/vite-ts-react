"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import {
    AlertTriangle,
    CheckCircle,
    Zap,
    Wifi,
    RotateCcw,
    Clock,
    MousePointer,
    FileText,
    HelpCircle,
} from "lucide-react"

export default function TechnicalErrorPage() {
    const [selectedOption, setSelectedOption] = useState("")
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [glitchText, setGlitchText] = useState("TECHNICAL ERROR")

    // Glitch effect for the title
    useEffect(() => {
        const glitchChars = "!@#$%^&*()_+-=[]{}|;:,.<>?"
        const originalText = "TECHNICAL ERROR"

        const interval = setInterval(() => {
            if (Math.random() > 0.95) {
                const glitched = originalText
                    .split("")
                    .map((char) => (Math.random() > 0.8 ? glitchChars[Math.floor(Math.random() * glitchChars.length)] : char))
                    .join("")
                setGlitchText(glitched)

                setTimeout(() => setGlitchText(originalText), 100)
            }
        }, 200)

        return () => clearInterval(interval)
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (selectedOption) {
            setIsLoading(true)
            // Simulate processing time
            await new Promise((resolve) => setTimeout(resolve, 2000))
            setIsLoading(false)
            setIsSubmitted(true)
            console.log("User selected:", selectedOption)
        }
    }

    const options = [
        { value: "disconnected", label: "Network connection lost", icon: Wifi },
        { value: "closed-browser", label: "Browser/tab terminated", icon: MousePointer },
        { value: "page-refresh", label: "Page refresh initiated", icon: RotateCcw },
        { value: "session-timeout", label: "Session timeout detected", icon: Clock },
        { value: "clicked-button", label: "Interface interaction error", icon: Zap },
        { value: "form-submission", label: "Data transmission failure", icon: FileText },
        { value: "other", label: "Unknown anomaly detected", icon: HelpCircle },
    ]

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
                {/* Animated background elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                </div>

                <Card className="w-full max-w-md bg-slate-800/50 backdrop-blur-xl border-cyan-500/30 shadow-2xl shadow-cyan-500/20 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-lg"></div>
                    <CardHeader className="text-center relative z-10">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-green-400 to-cyan-400 shadow-lg shadow-green-400/50 animate-pulse">
                            <CheckCircle className="h-8 w-8 text-slate-900" />
                        </div>
                        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
                            TRANSMISSION COMPLETE
                        </CardTitle>
                        <CardDescription className="text-slate-300 text-base">
                            Your diagnostic data has been successfully uploaded to our quantum servers. Our AI systems will analyze
                            this information to enhance system stability.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="relative z-10">
                        <Button
                            onClick={() => (window.location.href = "/")}
                            className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white font-semibold py-3 rounded-lg shadow-lg shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105"
                        >
                            RETURN TO MAINFRAME
                        </Button>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Animated background grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.1)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse"></div>

            {/* Floating particles */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
                <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-purple-400 rounded-full animate-ping delay-500"></div>
                <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-green-400 rounded-full animate-ping delay-1000"></div>
            </div>

            <Card className="w-full max-w-lg bg-slate-800/30 backdrop-blur-xl border-red-500/50 shadow-2xl shadow-red-500/20 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-lg animate-pulse"></div>

                <CardHeader className="text-center relative z-10">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-orange-500 shadow-lg shadow-red-500/50 animate-pulse">
                        <AlertTriangle className="h-8 w-8 text-white animate-bounce" />
                    </div>
                    <CardTitle className="text-2xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent font-mono tracking-wider">
                        {glitchText}
                    </CardTitle>
                    <CardDescription className="text-slate-300 text-base">
                        System anomaly detected. Please assist our diagnostic protocols by selecting the event that preceded this
                        malfunction.
                    </CardDescription>
                </CardHeader>

                <CardContent className="relative z-10">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <Label className="text-lg font-semibold mb-6 block text-cyan-300 font-mono tracking-wide">
                                DIAGNOSTIC QUERY: What triggered this system failure?
                            </Label>
                            <RadioGroup value={selectedOption} onValueChange={setSelectedOption} className="space-y-3">
                                {options.map((option) => {
                                    const IconComponent = option.icon
                                    return (
                                        <div
                                            key={option.value}
                                            className="flex items-center space-x-4 p-4 rounded-lg border border-slate-600/50 bg-slate-700/30 hover:bg-slate-600/40 hover:border-cyan-500/50 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-cyan-500/20 backdrop-blur-sm"
                                        >
                                            <RadioGroupItem
                                                value={option.value}
                                                id={option.value}
                                                className="border-cyan-400 text-cyan-400 focus:ring-cyan-400"
                                            />
                                            <IconComponent className="h-5 w-5 text-cyan-400" />
                                            <Label
                                                htmlFor={option.value}
                                                className="flex-1 cursor-pointer text-slate-200 font-medium hover:text-cyan-300 transition-colors"
                                            >
                                                {option.label}
                                            </Label>
                                        </div>
                                    )
                                })}
                            </RadioGroup>
                        </div>

                        <div className="flex gap-4">
                            <Button
                                type="button"
                                variant="outline"
                                className="flex-1 bg-slate-700/50 text-slate-300 border-slate-600 hover:bg-slate-600/50 hover:text-white hover:border-slate-500 transition-all duration-300 backdrop-blur-sm"
                                onClick={() => (window.location.href = "/")}
                            >
                                ABORT DIAGNOSTIC
                            </Button>
                            <Button
                                type="submit"
                                className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white font-semibold shadow-lg shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                disabled={!selectedOption || isLoading}
                            >
                                {isLoading ? (
                                    <div className="flex items-center space-x-2">
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        <span>TRANSMITTING...</span>
                                    </div>
                                ) : (
                                    "UPLOAD DIAGNOSTIC"
                                )}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
