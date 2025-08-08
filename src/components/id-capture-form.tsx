"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Camera, Download, Trash2, RotateCcw } from "lucide-react"

interface CapturedImage {
    id: string
    dataUrl: string
    timestamp: Date
}

export default function CameraCapture() {
    const videoRef = useRef<HTMLVideoElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [stream, setStream] = useState<MediaStream | null>(null)
    const [isStreaming, setIsStreaming] = useState(false)
    const [capturedImages, setCapturedImages] = useState<CapturedImage[]>([])
    const [error, setError] = useState<string>("")

    useEffect(() => {
        startCamera()
        return () => {
            if (stream) {
                stream.getTracks().forEach((track) => track.stop())
            }
        }
    }, [])

    const startCamera = async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({
                video: {
                    width: { ideal: 1280 },
                    height: { ideal: 720 },
                    facingMode: "user",
                },
            })

            if (videoRef.current) {
                videoRef.current.srcObject = mediaStream
                setStream(mediaStream)
                setIsStreaming(true)
                setError("")
            }
        } catch (err) {
            setError("Unable to access camera. Please ensure camera permissions are granted.")
            console.error("Error accessing camera:", err)
        }
    }

    const captureImage = () => {
        if (!videoRef.current || !canvasRef.current) return

        const video = videoRef.current
        const canvas = canvasRef.current
        const context = canvas.getContext("2d")

        if (!context) return

        // Set canvas dimensions to match video
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight

        // Draw the current video frame to canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height)

        // Convert canvas to data URL
        const dataUrl = canvas.toDataURL("image/jpeg", 0.8)

        // Add to captured images
        const newImage: CapturedImage = {
            id: Date.now().toString(),
            dataUrl,
            timestamp: new Date(),
        }

        setCapturedImages((prev) => [...prev, newImage])
    }

    const deleteImage = (id: string) => {
        setCapturedImages((prev) => prev.filter((img) => img.id !== id))
    }

    const downloadImage = (dataUrl: string, id: string) => {
        const link = document.createElement("a")
        link.href = dataUrl
        link.download = `id-capture-${id}.jpg`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    const restartCamera = () => {
        if (stream) {
            stream.getTracks().forEach((track) => track.stop())
        }
        startCamera()
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">ID Document Capture</h1>
                    <p className="text-gray-600">Position your ID document in the camera view and capture clear images</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Camera Feed */}
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Camera className="w-5 h-5" />
                                    Live Camera Feed
                                    {isStreaming && (
                                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                                            Live
                                        </Badge>
                                    )}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="relative">
                                    {error ? (
                                        <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                                            <div className="text-center">
                                                <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                                <p className="text-red-600 mb-4">{error}</p>
                                                <Button onClick={restartCamera} variant="outline">
                                                    <RotateCcw className="w-4 h-4 mr-2" />
                                                    Retry Camera Access
                                                </Button>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <video
                                                ref={videoRef}
                                                autoPlay
                                                playsInline
                                                muted
                                                className="w-full aspect-video bg-black rounded-lg"
                                            />
                                            {/* Overlay guide */}
                                            <div className="absolute inset-4 border-2 border-white border-dashed rounded-lg pointer-events-none">
                                                <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                                                    Position ID document within this frame
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>

                                <div className="flex justify-center mt-4">
                                    <Button
                                        onClick={captureImage}
                                        disabled={!isStreaming}
                                        size="lg"
                                        className="bg-blue-600 hover:bg-blue-700"
                                    >
                                        <Camera className="w-5 h-5 mr-2" />
                                        Capture Image
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Captured Images */}
                    <div className="lg:col-span-1">
                        <Card>
                            <CardHeader>
                                <CardTitle>Captured Images ({capturedImages.length})</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {capturedImages.length === 0 ? (
                                    <div className="text-center py-8">
                                        <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                        <p className="text-gray-500">No images captured yet</p>
                                        <p className="text-sm text-gray-400 mt-2">Use the capture button to take photos</p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {capturedImages.map((image, index) => (
                                            <div key={image.id} className="border rounded-lg p-3">
                                                <div className="aspect-video mb-3">
                                                    <img
                                                        src={image.dataUrl || "/placeholder.svg"}
                                                        alt={`Captured ID ${index + 1}`}
                                                        className="w-full h-full object-cover rounded"
                                                    />
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <div>
                                                        <p className="text-sm font-medium">Image {index + 1}</p>
                                                        <p className="text-xs text-gray-500">{image.timestamp.toLocaleTimeString()}</p>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <Button size="sm" variant="outline" onClick={() => downloadImage(image.dataUrl, image.id)}>
                                                            <Download className="w-4 h-4" />
                                                        </Button>
                                                        <Button size="sm" variant="outline" onClick={() => deleteImage(image.id)}>
                                                            <Trash2 className="w-4 h-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Instructions */}
                <Card className="mt-6">
                    <CardHeader>
                        <CardTitle>Instructions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="text-center">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <span className="text-blue-600 font-bold">1</span>
                                </div>
                                <h3 className="font-semibold mb-2">Position Document</h3>
                                <p className="text-sm text-gray-600">Place your ID document flat within the camera frame guide</p>
                            </div>
                            <div className="text-center">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <span className="text-blue-600 font-bold">2</span>
                                </div>
                                <h3 className="font-semibold mb-2">Ensure Good Lighting</h3>
                                <p className="text-sm text-gray-600">
                                    Make sure the document is well-lit and all text is clearly visible
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <span className="text-blue-600 font-bold">3</span>
                                </div>
                                <h3 className="font-semibold mb-2">Capture Both Sides</h3>
                                <p className="text-sm text-gray-600">Take clear photos of both the front and back of your ID</p>
                            </div>
                            <div className="text-center">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <span className="text-blue-600 font-bold">4</span>
                                </div>
                                <h3 className="font-semibold mb-2">Review & Submit</h3>
                                <p className="text-sm text-gray-600">Check image quality and download or retake if needed</p>
                            </div>
                        </div>

                        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                            <h4 className="font-semibold text-yellow-800 mb-2">Important Tips:</h4>
                            <ul className="text-sm text-yellow-700 space-y-1">
                                <li>• Ensure all corners of the document are visible</li>
                                <li>• Avoid glare and shadows on the document</li>
                                <li>• Keep the camera steady when capturing</li>
                                <li>• Make sure all text is sharp and readable</li>
                            </ul>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Hidden canvas for image capture */}
            <canvas ref={canvasRef} className="hidden" />
        </div>
    )
}
