"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, AlertTriangle, Phone, Mail, MessageSquare, Clock, User, Building } from "lucide-react"

export default function ExamRestrictionPage() {
    const [scanningLine, setScanningLine] = useState(0)
    const [glitchText, setGlitchText] = useState("ACCESS RESTRICTED")

    // Scanning animation
    useEffect(() => {
        const interval = setInterval(() => {
            setScanningLine((prev) => (prev + 1) % 100)
        }, 50)
        return () => clearInterval(interval)
    }, [])

    // Glitch effect for the title
    useEffect(() => {
        const glitchChars = "█▓▒░"
        const originalText = "ACCESS RESTRICTED"

        const interval = setInterval(() => {
            if (Math.random() > 0.92) {
                const glitched = originalText
                    .split("")
                    .map((char) => (Math.random() > 0.7 ? glitchChars[Math.floor(Math.random() * glitchChars.length)] : char))
                    .join("")
                setGlitchText(glitched)

                setTimeout(() => setGlitchText(originalText), 150)
            }
        }, 300)

        return () => clearInterval(interval)
    }, [])

    const contactMethods = [
        {
            icon: Building,
            title: "Exam Sponsor",
            subtitle: "Primary Contact",
            details: ["Email: sponsor@examcenter.edu", "Phone: +1 (555) 123-4567", "Hours: Mon-Fri 8:00 AM - 6:00 PM EST"],
        },
        {
            icon: MessageSquare,
            title: "Technical Support",
            subtitle: "Secondary Contact",
            details: ["Email: support@examplatform.com", "Phone: +1 (555) 987-6543", "24/7 Emergency Line Available"],
        },
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900/20 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Animated background grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.1)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

            {/* Scanning line effect */}
            <div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/20 to-transparent h-1 transition-all duration-75 ease-linear"
                style={{ top: `${scanningLine}%` }}
            ></div>

            {/* Warning particles */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-red-400 rounded-full animate-ping"></div>
                <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-orange-400 rounded-full animate-ping delay-700"></div>
                <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-ping delay-1000"></div>
                <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-red-400 rounded-full animate-ping delay-300"></div>
            </div>

            <div className="w-full max-w-4xl space-y-6">
                {/* Main Alert Card */}
                <Card className="bg-slate-800/40 backdrop-blur-xl border-red-500/50 shadow-2xl shadow-red-500/20 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-orange-500/5 to-red-500/10 animate-pulse"></div>

                    <CardHeader className="text-center relative z-10 pb-8">
                        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-orange-500 shadow-lg shadow-red-500/50 relative">
                            <Shield className="h-10 w-10 text-white" />
                            <div className="absolute inset-0 rounded-full border-2 border-red-400 animate-ping"></div>
                        </div>

                        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent font-mono tracking-wider mb-4">
                            {glitchText}
                        </CardTitle>

                        <div className="bg-slate-700/50 rounded-lg p-6 border border-red-500/30">
                            <div className="flex items-center justify-center mb-4">
                                <AlertTriangle className="h-6 w-6 text-yellow-400 mr-2 animate-pulse" />
                                <span className="text-yellow-400 font-semibold text-lg">EXAMINATION PROTOCOL VIOLATION</span>
                            </div>

                            <CardDescription className="text-slate-200 text-lg leading-relaxed">
                                Our monitoring systems have detected a{" "}
                                <span className="text-red-400 font-semibold">restricted activity</span> during your examination session.
                                This action has been logged and your session has been temporarily suspended for security review.
                            </CardDescription>
                        </div>
                    </CardHeader>

                    <CardContent className="relative z-10 space-y-8">
                        {/* Incident Details */}
                        <div className="bg-slate-700/30 rounded-lg p-6 border border-slate-600/50">
                            <h3 className="text-xl font-semibold text-cyan-300 mb-4 flex items-center">
                                <Clock className="h-5 w-5 mr-2" />
                                INCIDENT DETAILS
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-300">
                                <div>
                                    <span className="text-slate-400">Timestamp:</span>
                                    <span className="ml-2 font-mono">{new Date().toLocaleString()}</span>
                                </div>
                                <div>
                                    <span className="text-slate-400">Session ID:</span>
                                    <span className="ml-2 font-mono">EX-{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
                                </div>
                                <div>
                                    <span className="text-slate-400">Violation Type:</span>
                                    <span className="ml-2 text-red-400">Unauthorized Activity</span>
                                </div>
                                <div>
                                    <span className="text-slate-400">Status:</span>
                                    <span className="ml-2 text-yellow-400">Under Review</span>
                                </div>
                            </div>
                        </div>

                        {/* Next Steps */}
                        <div className="bg-slate-700/30 rounded-lg p-6 border border-slate-600/50">
                            <h3 className="text-xl font-semibold text-cyan-300 mb-4">REQUIRED ACTIONS</h3>
                            <div className="space-y-3 text-slate-300">
                                <div className="flex items-start">
                                    <div className="w-6 h-6 rounded-full bg-cyan-500 flex items-center justify-center text-xs font-bold text-slate-900 mr-3 mt-0.5">
                                        1
                                    </div>
                                    <span>Contact your exam sponsor immediately using the details provided below</span>
                                </div>
                                <div className="flex items-start">
                                    <div className="w-6 h-6 rounded-full bg-cyan-500 flex items-center justify-center text-xs font-bold text-slate-900 mr-3 mt-0.5">
                                        2
                                    </div>
                                    <span>Provide your Session ID and timestamp for reference</span>
                                </div>
                                <div className="flex items-start">
                                    <div className="w-6 h-6 rounded-full bg-cyan-500 flex items-center justify-center text-xs font-bold text-slate-900 mr-3 mt-0.5">
                                        3
                                    </div>
                                    <span>Await further instructions before attempting to resume your examination</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Contact Information Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {contactMethods.map((contact, index) => {
                        const IconComponent = contact.icon
                        return (
                            <Card
                                key={index}
                                className="bg-slate-800/40 backdrop-blur-xl border-cyan-500/30 shadow-xl shadow-cyan-500/10 hover:shadow-cyan-500/20 transition-all duration-300 transform hover:scale-[1.02]"
                            >
                                <CardHeader className="pb-4">
                                    <div className="flex items-center space-x-3 mb-2">
                                        <div className="p-2 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500">
                                            <IconComponent className="h-6 w-6 text-white" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-xl text-cyan-300">{contact.title}</CardTitle>
                                            <CardDescription className="text-slate-400">{contact.subtitle}</CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        {contact.details.map((detail, detailIndex) => (
                                            <div key={detailIndex} className="flex items-center text-slate-300">
                                                {detail.includes("Email:") && <Mail className="h-4 w-4 mr-2 text-cyan-400" />}
                                                {detail.includes("Phone:") && <Phone className="h-4 w-4 mr-2 text-cyan-400" />}
                                                {detail.includes("Hours:") && <Clock className="h-4 w-4 mr-2 text-cyan-400" />}
                                                {!detail.includes("Email:") && !detail.includes("Phone:") && !detail.includes("Hours:") && (
                                                    <User className="h-4 w-4 mr-2 text-cyan-400" />
                                                )}
                                                <span className="text-sm">{detail}</span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                        onClick={() => window.open("mailto:sponsor@examcenter.edu", "_blank")}
                        className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white font-semibold py-3 px-8 rounded-lg shadow-lg shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105"
                    >
                        <Mail className="h-5 w-5 mr-2" />
                        EMAIL EXAM SPONSOR
                    </Button>
                    <Button
                        onClick={() => window.open("tel:+15551234567", "_blank")}
                        variant="outline"
                        className="bg-slate-700/50 text-slate-300 border-slate-600 hover:bg-slate-600/50 hover:text-white hover:border-cyan-500 transition-all duration-300 py-3 px-8 backdrop-blur-sm"
                    >
                        <Phone className="h-5 w-5 mr-2" />
                        CALL SUPPORT
                    </Button>
                </div>
            </div>
        </div>
    )
}
