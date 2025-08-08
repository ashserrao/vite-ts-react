"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MdAdd, MdClose, MdVisibility, MdEdit, MdList } from "react-icons/md"

const actionButtons = [
    { icon: MdVisibility, label: "View", x: 0, y: -60 }, // Top
    { icon: MdEdit, label: "Edit", x: -60, y: 0 }, // Direct left
    { icon: MdList, label: "List", x: 0, y: 60 }, // Bottom
]

export default function FloatActionButton() {
    const [isOpen, setIsOpen] = useState(false)

    const toggleFAB = () => {
        setIsOpen(!isOpen)
    }

    const handleActionClick = (action: string) => {
        console.log(`${action} clicked`)
        setIsOpen(false)
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            {/* Floating Action Button Container */}
            <div className="relative">
                {/* Action Buttons */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            className="absolute"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            {actionButtons.map((button, index) => {
                                const IconComponent = button.icon
                                return (
                                    <motion.button
                                        key={button.label}
                                        className="absolute w-12 h-12 bg-white border-2 border-gray-200 rounded-full shadow-lg hover:shadow-xl hover:scale-110 flex items-center justify-center text-gray-600 hover:text-blue-600 transition-all duration-200"
                                        style={{
                                            top: 0,
                                            left: 0,
                                            transform: `translate(${button.x}px, ${button.y}px)`,
                                        }}
                                        initial={{
                                            opacity: 0,
                                        }}
                                        animate={{
                                            opacity: 1,
                                        }}
                                        exit={{
                                            opacity: 0,
                                        }}
                                        transition={{
                                            duration: 0.3,
                                            delay: index * 0.1,
                                            ease: "easeInOut",
                                        }}
                                        onClick={() => handleActionClick(button.label)}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <IconComponent className="w-5 h-5" />
                                    </motion.button>
                                )
                            })}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Main FAB */}
                <motion.button
                    className="relative w-14 h-14 bg-blue-600 hover:bg-blue-700 rounded-full shadow-lg hover:shadow-xl flex items-center justify-center text-white transition-colors duration-200 z-10"
                    onClick={toggleFAB}
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.05 }}
                >
                    <motion.div
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{
                            duration: 0.3,
                            ease: "easeInOut",
                        }}
                    >
                        <AnimatePresence mode="wait">
                            {isOpen ? (
                                <motion.div
                                    key="close"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{
                                        duration: 0.2,
                                        ease: "easeInOut",
                                    }}
                                >
                                    <MdClose className="w-6 h-6" />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="plus"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{
                                        duration: 0.2,
                                        ease: "easeInOut",
                                    }}
                                >
                                    <MdAdd className="w-6 h-6" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </motion.button>
            </div>
        </div>
    )
}
