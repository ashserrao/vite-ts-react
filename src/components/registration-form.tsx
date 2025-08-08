"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Upload, User, MapPin, Phone, CreditCard } from "lucide-react"

export default function RegistrationForm() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        idType: "",
        idNumber: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
    })

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Form submitted:", formData)
        // Handle form submission here
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-2xl mx-auto">
                <Card>
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl font-bold">Identity Verification</CardTitle>
                        <CardDescription>Please provide your personal information for identity verification</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Personal Information */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <User className="w-5 h-5 text-muted-foreground" />
                                    <h3 className="text-lg font-semibold">Personal Information</h3>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="firstName">First Name *</Label>
                                        <Input
                                            id="firstName"
                                            value={formData.firstName}
                                            onChange={(e) => handleInputChange("firstName", e.target.value)}
                                            placeholder="Enter your first name"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="lastName">Last Name *</Label>
                                        <Input
                                            id="lastName"
                                            value={formData.lastName}
                                            onChange={(e) => handleInputChange("lastName", e.target.value)}
                                            placeholder="Enter your last name"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                                    <Input
                                        id="dateOfBirth"
                                        type="date"
                                        value={formData.dateOfBirth}
                                        onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <Separator />

                            {/* ID Information */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <CreditCard className="w-5 h-5 text-muted-foreground" />
                                    <h3 className="text-lg font-semibold">Identification</h3>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="idType">ID Type *</Label>
                                        <Select value={formData.idType} onValueChange={(value) => handleInputChange("idType", value)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select ID type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="passport">Passport</SelectItem>
                                                <SelectItem value="drivers-license">Driver's License</SelectItem>
                                                <SelectItem value="national-id">National ID Card</SelectItem>
                                                <SelectItem value="state-id">State ID Card</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="idNumber">ID Number *</Label>
                                        <Input
                                            id="idNumber"
                                            value={formData.idNumber}
                                            onChange={(e) => handleInputChange("idNumber", e.target.value)}
                                            placeholder="Enter your ID number"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="idUpload">Upload ID Document</Label>
                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                                        <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                                        <p className="text-sm text-gray-600 mb-2">Click to upload or drag and drop</p>
                                        <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
                                        <Input id="idUpload" type="file" accept=".png,.jpg,.jpeg,.pdf" className="hidden" />
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            {/* Contact Information */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <Phone className="w-5 h-5 text-muted-foreground" />
                                    <h3 className="text-lg font-semibold">Contact Information</h3>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email Address *</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => handleInputChange("email", e.target.value)}
                                            placeholder="Enter your email"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Phone Number *</Label>
                                        <Input
                                            id="phone"
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => handleInputChange("phone", e.target.value)}
                                            placeholder="Enter your phone number"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            {/* Address Information */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-5 h-5 text-muted-foreground" />
                                    <h3 className="text-lg font-semibold">Address Information</h3>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="address">Street Address *</Label>
                                    <Textarea
                                        id="address"
                                        value={formData.address}
                                        onChange={(e) => handleInputChange("address", e.target.value)}
                                        placeholder="Enter your full address"
                                        rows={2}
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="city">City *</Label>
                                        <Input
                                            id="city"
                                            value={formData.city}
                                            onChange={(e) => handleInputChange("city", e.target.value)}
                                            placeholder="City"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="state">State/Province *</Label>
                                        <Input
                                            id="state"
                                            value={formData.state}
                                            onChange={(e) => handleInputChange("state", e.target.value)}
                                            placeholder="State"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="zipCode">ZIP/Postal Code *</Label>
                                        <Input
                                            id="zipCode"
                                            value={formData.zipCode}
                                            onChange={(e) => handleInputChange("zipCode", e.target.value)}
                                            placeholder="ZIP Code"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="country">Country *</Label>
                                    <Select value={formData.country} onValueChange={(value) => handleInputChange("country", value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select your country" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="us">United States</SelectItem>
                                            <SelectItem value="ca">Canada</SelectItem>
                                            <SelectItem value="uk">United Kingdom</SelectItem>
                                            <SelectItem value="au">Australia</SelectItem>
                                            <SelectItem value="de">Germany</SelectItem>
                                            <SelectItem value="fr">France</SelectItem>
                                            <SelectItem value="other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <Separator />

                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <Button type="button" variant="outline" className="flex-1 bg-transparent">
                                    Save as Draft
                                </Button>
                                <Button type="submit" className="flex-1">
                                    Submit for Verification
                                </Button>
                            </div>

                            <p className="text-xs text-gray-500 text-center">
                                By submitting this form, you agree to our terms of service and privacy policy. All information will be
                                kept secure and confidential.
                            </p>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
