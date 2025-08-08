"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, TrendingUp, TrendingDown, BarChart3, DollarSign, Activity } from "lucide-react"
import Link from "next/link"

// Mock stock data
const stockData = [
    {
        symbol: "AAPL",
        name: "Apple Inc.",
        price: 175.43,
        change: 2.34,
        changePercent: 1.35,
        volume: "45.2M",
        marketCap: "2.8T",
    },
    {
        symbol: "GOOGL",
        name: "Alphabet Inc.",
        price: 142.56,
        change: -1.23,
        changePercent: -0.85,
        volume: "28.1M",
        marketCap: "1.8T",
    },
    {
        symbol: "MSFT",
        name: "Microsoft Corporation",
        price: 378.85,
        change: 5.67,
        changePercent: 1.52,
        volume: "32.4M",
        marketCap: "2.9T",
    },
    {
        symbol: "AMZN",
        name: "Amazon.com Inc.",
        price: 145.32,
        change: -2.45,
        changePercent: -1.66,
        volume: "41.3M",
        marketCap: "1.5T",
    },
    {
        symbol: "TSLA",
        name: "Tesla Inc.",
        price: 248.5,
        change: 12.34,
        changePercent: 5.22,
        volume: "89.7M",
        marketCap: "789B",
    },
    {
        symbol: "META",
        name: "Meta Platforms Inc.",
        price: 334.87,
        change: -4.56,
        changePercent: -1.34,
        volume: "19.8M",
        marketCap: "847B",
    },
    {
        symbol: "NVDA",
        name: "NVIDIA Corporation",
        price: 875.28,
        change: 23.45,
        changePercent: 2.75,
        volume: "52.1M",
        marketCap: "2.2T",
    },
    {
        symbol: "NFLX",
        name: "Netflix Inc.",
        price: 487.83,
        change: 8.92,
        changePercent: 1.86,
        volume: "15.6M",
        marketCap: "217B",
    },
]

export default function StockListPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedStock, setSelectedStock] = useState(stockData[0])

    const filteredStocks = stockData.filter(
        (stock) =>
            stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
            stock.name.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    return (
        <div className="min-h-screen bg-background">
            {/* Navigation Bar */}
            <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Link href="/" className="flex items-center space-x-2">
                            <BarChart3 className="h-6 w-6" />
                            <span className="font-bold text-xl">StockTracker</span>
                        </Link>
                        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
                            <Link href="#" className="text-foreground/60 hover:text-foreground">
                                Markets
                            </Link>
                            <Link href="#" className="text-foreground/60 hover:text-foreground">
                                Watchlist
                            </Link>
                            <Link href="#" className="text-foreground/60 hover:text-foreground">
                                Portfolio
                            </Link>
                            <Link href="#" className="text-foreground/60 hover:text-foreground">
                                News
                            </Link>
                        </nav>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Button variant="ghost">Sign In</Button>
                        <Button>Get Started</Button>
                    </div>
                </div>
            </nav>

            <div className="container mx-auto px-4 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Stock List Section */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                            <h1 className="text-3xl font-bold">Stock Market</h1>
                            <div className="relative w-full sm:w-80">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                                <Input
                                    placeholder="Search stocks..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            {filteredStocks.map((stock) => (
                                <Card
                                    key={stock.symbol}
                                    className={`cursor-pointer transition-colors hover:bg-muted/50 ${selectedStock.symbol === stock.symbol ? "ring-2 ring-primary" : ""
                                        }`}
                                    onClick={() => setSelectedStock(stock)}
                                >
                                    <CardContent className="p-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                                    <span className="font-semibold text-sm">{stock.symbol.charAt(0)}</span>
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold">{stock.symbol}</h3>
                                                    <p className="text-sm text-muted-foreground">{stock.name}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-semibold text-lg">${stock.price.toFixed(2)}</p>
                                                <div className="flex items-center space-x-1">
                                                    {stock.change >= 0 ? (
                                                        <TrendingUp className="h-4 w-4 text-green-500" />
                                                    ) : (
                                                        <TrendingDown className="h-4 w-4 text-red-500" />
                                                    )}
                                                    <span
                                                        className={`text-sm font-medium ${stock.change >= 0 ? "text-green-500" : "text-red-500"}`}
                                                    >
                                                        {stock.change >= 0 ? "+" : ""}
                                                        {stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* Selected Stock Details */}
                    <div className="space-y-4">
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle className="text-2xl">{selectedStock.symbol}</CardTitle>
                                        <p className="text-muted-foreground">{selectedStock.name}</p>
                                    </div>
                                    <Badge variant={selectedStock.change >= 0 ? "default" : "destructive"}>
                                        {selectedStock.change >= 0 ? "UP" : "DOWN"}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="text-center">
                                    <p className="text-4xl font-bold">${selectedStock.price.toFixed(2)}</p>
                                    <div className="flex items-center justify-center space-x-2 mt-2">
                                        {selectedStock.change >= 0 ? (
                                            <TrendingUp className="h-5 w-5 text-green-500" />
                                        ) : (
                                            <TrendingDown className="h-5 w-5 text-red-500" />
                                        )}
                                        <span
                                            className={`text-lg font-medium ${selectedStock.change >= 0 ? "text-green-500" : "text-red-500"}`}
                                        >
                                            {selectedStock.change >= 0 ? "+" : ""}
                                            {selectedStock.change.toFixed(2)} ({selectedStock.changePercent.toFixed(2)}%)
                                        </span>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                                        <div className="flex items-center space-x-2">
                                            <Activity className="h-4 w-4 text-muted-foreground" />
                                            <span className="text-sm font-medium">Volume</span>
                                        </div>
                                        <span className="font-semibold">{selectedStock.volume}</span>
                                    </div>

                                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                                        <div className="flex items-center space-x-2">
                                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                                            <span className="text-sm font-medium">Market Cap</span>
                                        </div>
                                        <span className="font-semibold">{selectedStock.marketCap}</span>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Button className="w-full">Add to Watchlist</Button>
                                    <Button variant="outline" className="w-full bg-transparent">
                                        View Details
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Quick Stats */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Market Summary</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-sm text-muted-foreground">Total Stocks</span>
                                        <span className="font-medium">{stockData.length}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm text-muted-foreground">Gainers</span>
                                        <span className="font-medium text-green-500">{stockData.filter((s) => s.change > 0).length}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm text-muted-foreground">Losers</span>
                                        <span className="font-medium text-red-500">{stockData.filter((s) => s.change < 0).length}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
