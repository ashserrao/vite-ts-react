"use client"

import { useState } from "react"
import { Maximize, Minimize } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

export default function FullscreenDialog() {
    const [isFullscreen, setIsFullscreen] = useState(false)
    const [open, setOpen] = useState(false)

    const toggleFullscreen = async () => {
        try {
            if (!document.fullscreenElement) {
                await document.documentElement.requestFullscreen()
                setIsFullscreen(true)
            } else {
                await document.exitFullscreen()
                setIsFullscreen(false)
            }
            setOpen(false)
        } catch (error) {
            console.error("Error toggling fullscreen:", error)
        }
    }

    // Listen for fullscreen changes
    const handleFullscreenChange = () => {
        setIsFullscreen(!!document.fullscreenElement)
    }

    // Add event listener when component mounts
    if (typeof window !== "undefined") {
        document.addEventListener("fullscreenchange", handleFullscreenChange)
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline" size="lg" className="gap-2 bg-transparent">
                        <Maximize className="h-4 w-4" />
                        Fullscreen Access
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <Maximize className="h-5 w-5" />
                            Fullscreen Mode
                        </DialogTitle>
                        <DialogDescription>
                            Enable fullscreen mode for an immersive experience. You can exit fullscreen at any time by pressing the
                            Escape key.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col gap-4">
                        <div className="rounded-lg bg-muted p-4">
                            <p className="text-sm text-muted-foreground">
                                Current status: {isFullscreen ? "Fullscreen active" : "Windowed mode"}
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <Button onClick={toggleFullscreen} className="flex-1 gap-2">
                                {isFullscreen ? (
                                    <>
                                        <Minimize className="h-4 w-4" />
                                        Exit Fullscreen
                                    </>
                                ) : (
                                    <>
                                        <Maximize className="h-4 w-4" />
                                        Enter Fullscreen
                                    </>
                                )}
                            </Button>
                            <Button variant="outline" onClick={() => setOpen(false)}>
                                Cancel
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {isFullscreen && (
                <div className="fixed top-4 right-4 z-50">
                    <Button
                        variant="secondary"
                        size="sm"
                        onClick={toggleFullscreen}
                        className="gap-2 bg-black/20 backdrop-blur-sm hover:bg-black/30"
                    >
                        <Minimize className="h-4 w-4" />
                        Exit Fullscreen
                    </Button>
                </div>
            )}
        </div>
    )
}
