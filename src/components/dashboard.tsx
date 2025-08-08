"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    TrendingUp,
    TrendingDown,
    DollarSign,
    Activity,
    PieChart,
    Bell,
    Plus,
    Minus,
    BarChart3,
    Globe,
    Clock,
    ArrowUpRight,
    ArrowDownRight,
} from "lucide-react"
import Link from "next/link"

// Mock data
const portfolioData = {
    totalValue: 125430.5,
    dayChange: 2340.25,
    dayChangePercent: 1.9,
    totalGainLoss: 15430.5,
    totalGainLossPercent: 14.0,
}

const holdings = [
    { symbol: "AAPL", name: "Apple Inc.", shares: 50, avgCost: 150.0, currentPrice: 175.43, value: 8771.5 },
    { symbol: "GOOGL", name: "Alphabet Inc.", shares: 25, avgCost: 140.0, currentPrice: 142.56, value: 3564.0 },
    { symbol: "MSFT", name: "Microsoft Corp.", shares: 30, avgCost: 350.0, currentPrice: 378.85, value: 11365.5 },
    { symbol: "TSLA", name: "Tesla Inc.", shares: 40, avgCost: 220.0, currentPrice: 248.5, value: 9940.0 },
    { symbol: "NVDA", name: "NVIDIA Corp.", shares: 15, avgCost: 800.0, currentPrice: 875.28, value: 13129.2 },
]

const watchlist = [
    { symbol: "AMZN", name: "Amazon.com Inc.", price: 145.32, change: -2.45, changePercent: -1.66 },
    { symbol: "META", name: "Meta Platforms", price: 334.87, change: -4.56, changePercent: -1.34 },
    { symbol: "NFLX", name: "Netflix Inc.", price: 487.83, change: 8.92, changePercent: 1.86 },
    { symbol: "AMD", name: "Advanced Micro Devices", price: 112.45, change: 3.21, changePercent: 2.94 },
]

const marketIndices = [
    { name: "S&P 500", value: 4567.89, change: 23.45, changePercent: 0.52 },
    { name: "NASDAQ", value: 14234.56, change: -45.67, changePercent: -0.32 },
    { name: "DOW", value: 34567.12, change: 156.78, changePercent: 0.46 },
]

const recentNews = [
    { title: "Apple Reports Strong Q4 Earnings", time: "2 hours ago", source: "Reuters" },
    { title: "Tesla Announces New Gigafactory", time: "4 hours ago", source: "Bloomberg" },
    { title: "Fed Signals Interest Rate Changes", time: "6 hours ago", source: "CNBC" },
    { title: "Tech Stocks Rally on AI Optimism", time: "8 hours ago", source: "WSJ" },
]

const recentTransactions = [
    { type: "BUY", symbol: "AAPL", shares: 10, price: 175.43, date: "2024-01-15", total: 1754.3 },
    { type: "SELL", symbol: "GOOGL", shares: 5, price: 142.56, date: "2024-01-14", total: 712.8 },
    { type: "BUY", symbol: "MSFT", shares: 15, price: 378.85, date: "2024-01-12", total: 5682.75 },
]

export default function Dashboard() {
    const [selectedTimeframe, setSelectedTimeframe] = useState("1D")

    const totalGainLossColor = portfolioData.totalGainLoss >= 0 ? "text-green-500" : "text-red-500"
    const dayChangeColor = portfolioData.dayChange >= 0 ? "text-green-500" : "text-red-500"

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Link href="/" className="flex items-center space-x-2">
                            <BarChart3 className="h-6 w-6" />
                            <span className="font-bold text-xl">StockTracker</span>
                        </Link>
                        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
                            <Link href="/dashboard" className="text-foreground">
                                Dashboard
                            </Link>
                            <Link href="/portfolio" className="text-foreground/60 hover:text-foreground">
                                Portfolio
                            </Link>
                            <Link href="/watchlist" className="text-foreground/60 hover:text-foreground">
                                Watchlist
                            </Link>
                            <Link href="/markets" className="text-foreground/60 hover:text-foreground">
                                Markets
                            </Link>
                        </nav>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Button variant="ghost" size="icon">
                            <Bell className="h-4 w-4" />
                        </Button>
                        <Button>Trade</Button>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-6">
                {/* Portfolio Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Portfolio Value</CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">${portfolioData.totalValue.toLocaleString()}</div>
                            <div className={`text-xs ${dayChangeColor} flex items-center`}>
                                {portfolioData.dayChange >= 0 ? (
                                    <ArrowUpRight className="h-3 w-3 mr-1" />
                                ) : (
                                    <ArrowDownRight className="h-3 w-3 mr-1" />
                                )}
                                ${Math.abs(portfolioData.dayChange).toFixed(2)} ({portfolioData.dayChangePercent.toFixed(2)}%) today
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Gain/Loss</CardTitle>
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className={`text-2xl font-bold ${totalGainLossColor}`}>
                                ${portfolioData.totalGainLoss.toLocaleString()}
                            </div>
                            <div className={`text-xs ${totalGainLossColor}`}>
                                {portfolioData.totalGainLossPercent.toFixed(2)}% all time
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Holdings</CardTitle>
                            <PieChart className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{holdings.length}</div>
                            <div className="text-xs text-muted-foreground">Active positions</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Day's Range</CardTitle>
                            <Activity className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">$123,090 - $125,890</div>
                            <div className="text-xs text-muted-foreground">Today's high/low</div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Portfolio Holdings */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Portfolio Holdings</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {holdings.map((holding) => {
                                        const gainLoss = (holding.currentPrice - holding.avgCost) * holding.shares
                                        const gainLossPercent = ((holding.currentPrice - holding.avgCost) / holding.avgCost) * 100
                                        const isPositive = gainLoss >= 0

                                        return (
                                            <div key={holding.symbol} className="flex items-center justify-between p-4 border rounded-lg">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                                        <span className="font-semibold text-sm">{holding.symbol.charAt(0)}</span>
                                                    </div>
                                                    <div>
                                                        <h3 className="font-semibold">{holding.symbol}</h3>
                                                        <p className="text-sm text-muted-foreground">{holding.shares} shares</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-semibold">${holding.value.toLocaleString()}</p>
                                                    <p className={`text-sm ${isPositive ? "text-green-500" : "text-red-500"}`}>
                                                        {isPositive ? "+" : ""}${gainLoss.toFixed(2)} ({gainLossPercent.toFixed(2)}%)
                                                    </p>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Market Indices */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <Globe className="h-5 w-5" />
                                    <span>Market Indices</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {marketIndices.map((index) => (
                                        <div key={index.name} className="text-center p-4 border rounded-lg">
                                            <h3 className="font-semibold">{index.name}</h3>
                                            <p className="text-2xl font-bold">{index.value.toLocaleString()}</p>
                                            <div
                                                className={`flex items-center justify-center space-x-1 ${index.change >= 0 ? "text-green-500" : "text-red-500"}`}
                                            >
                                                {index.change >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                                                <span className="text-sm">
                                                    {index.change >= 0 ? "+" : ""}
                                                    {index.change.toFixed(2)} ({index.changePercent.toFixed(2)}%)
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Recent Transactions */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Recent Transactions</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {recentTransactions.map((transaction, index) => (
                                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                                            <div className="flex items-center space-x-3">
                                                <Badge variant={transaction.type === "BUY" ? "default" : "secondary"}>{transaction.type}</Badge>
                                                <div>
                                                    <p className="font-semibold">{transaction.symbol}</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {transaction.shares} shares @ ${transaction.price}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-semibold">${transaction.total.toLocaleString()}</p>
                                                <p className="text-sm text-muted-foreground">{transaction.date}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Watchlist */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle>Watchlist</CardTitle>
                                    <Button size="sm" variant="outline">
                                        <Plus className="h-4 w-4 mr-1" />
                                        Add
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {watchlist.map((stock) => (
                                        <div
                                            key={stock.symbol}
                                            className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 cursor-pointer"
                                        >
                                            <div>
                                                <h3 className="font-semibold">{stock.symbol}</h3>
                                                <p className="text-xs text-muted-foreground">{stock.name}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-semibold">${stock.price.toFixed(2)}</p>
                                                <div
                                                    className={`text-xs flex items-center ${stock.change >= 0 ? "text-green-500" : "text-red-500"}`}
                                                >
                                                    {stock.change >= 0 ? (
                                                        <TrendingUp className="h-3 w-3 mr-1" />
                                                    ) : (
                                                        <TrendingDown className="h-3 w-3 mr-1" />
                                                    )}
                                                    {stock.change >= 0 ? "+" : ""}
                                                    {stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Market News */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <Clock className="h-5 w-5" />
                                    <span>Market News</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {recentNews.map((news, index) => (
                                        <div key={index} className="border-b pb-3 last:border-b-0">
                                            <h4 className="font-medium text-sm leading-tight mb-1">{news.title}</h4>
                                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                                                <span>{news.source}</span>
                                                <span>{news.time}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Quick Actions */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Quick Actions</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Button className="w-full">
                                    <Plus className="h-4 w-4 mr-2" />
                                    Buy Stock
                                </Button>
                                <Button variant="outline" className="w-full bg-transparent">
                                    <Minus className="h-4 w-4 mr-2" />
                                    Sell Stock
                                </Button>
                                <Button variant="outline" className="w-full bg-transparent">
                                    <BarChart3 className="h-4 w-4 mr-2" />
                                    View Analytics
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
