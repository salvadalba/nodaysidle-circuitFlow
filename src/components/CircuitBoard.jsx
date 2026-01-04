import React, { useState, useEffect } from 'react'
import MotherboardBackground from './MotherboardBackground'
import VRMHeatsink from './VRMHeatsink'
import CPUSocket from './CPUSocket'
import RAMSlots from './RAMSlots'
import PCIeSlots from './PCIeSlots'
import DebugDisplay from './DebugDisplay'
import CircuitTrace from './CircuitTrace'
import { downloadDocument } from '../api/documents'

const CircuitBoard = ({ isAnimating, isBooting, bootComplete, generatedDocs = [], userPrompt = '' }) => {
    const [activeComponents, setActiveComponents] = useState(false)

    useEffect(() => {
        if (isAnimating) {
            // Delay component activation for boot sequence effect
            const timer = setTimeout(() => {
                setActiveComponents(true)
            }, 1500)
            return () => clearTimeout(timer)
        } else {
            setActiveComponents(false)
        }
    }, [isAnimating])

    // Circuit trace paths from power connector to components
    const circuitPaths = [
        // Main power trace
        "M 40 450 L 120 450 L 120 350 L 250 350",
        // To VRM left
        "M 250 350 L 250 200 L 150 200",
        // To VRM top
        "M 250 350 L 400 350 L 400 100",
        // To CPU
        "M 250 350 L 550 350 L 550 450",
        // To RAM
        "M 550 450 L 850 450 L 850 350",
        // To PCIe
        "M 550 450 L 550 700 L 350 700",
        // To Debug Display
        "M 850 350 L 1050 350 L 1050 100",
    ]

    const handleChipHover = (chipId) => {
        const doc = generatedDocs.find(d => d.id === chipId)
        if (doc) {
            console.log(`Preview: ${doc.title} - ${doc.description}`)
        }
    }

    const handleChipClick = async (chipId) => {
        console.log(`Downloading: ${chipId}`)
        try {
            await downloadDocument(chipId, generatedDocs)
        } catch (err) {
            console.error('Download failed:', err)
        }
    }

    // Get document by ID from generated docs
    const getDoc = (id) => generatedDocs.find(d => d.id === id)



    return (
        <svg
            viewBox="0 0 1200 900"
            className="w-full h-full"
            preserveAspectRatio="xMidYMid meet"
        >
            {/* Background with PCB details */}
            <MotherboardBackground />

            {/* Power connector area */}
            <g transform="translate(20, 400)">
                {/* 24-pin ATX connector */}
                <rect
                    x={0}
                    y={0}
                    width={30}
                    height={100}
                    fill="#1a1a1a"
                    stroke="#2a2a2a"
                    strokeWidth="2"
                    rx="3"
                />
                {/* Pin grid */}
                {Array.from({ length: 12 }, (_, i) => (
                    <g key={`pwr-pin-${i}`}>
                        <rect
                            x={5}
                            y={8 + i * 8}
                            width={8}
                            height={5}
                            fill={isAnimating ? '#ffd700' : '#3a3530'}
                            className={isAnimating ? 'power-on' : ''}
                        />
                        <rect
                            x={17}
                            y={8 + i * 8}
                            width={8}
                            height={5}
                            fill={isAnimating ? '#ffd700' : '#3a3530'}
                            className={isAnimating ? 'power-on' : ''}
                        />
                    </g>
                ))}
                <text
                    x={15}
                    y={115}
                    fill="#555"
                    fontSize="6"
                    fontFamily="monospace"
                    textAnchor="middle"
                >
                    PWR
                </text>
            </g>

            {/* Circuit traces */}
            {circuitPaths.map((path, index) => (
                <CircuitTrace
                    key={index}
                    path={path}
                    isActive={isAnimating}
                    delay={index * 150}
                />
            ))}

            {/* VRM Heatsink Left */}
            <VRMHeatsink
                x={60}
                y={120}
                width={80}
                height={200}
                orientation="vertical"
                isActive={activeComponents}
            />

            {/* VRM Heatsink Top */}
            <VRMHeatsink
                x={200}
                y={60}
                width={300}
                height={60}
                orientation="horizontal"
                isActive={activeComponents}
            />

            {/* CPU Socket - Central position */}
            <CPUSocket
                x={550}
                y={450}
                isActive={activeComponents}
                onHover={handleChipHover}
                onClick={handleChipClick}
            />

            {/* RAM Slots - Right side */}
            <RAMSlots
                x={900}
                y={250}
                isActive={activeComponents}
                onHover={handleChipHover}
                onClick={handleChipClick}
            />

            {/* PCIe Slots - Bottom */}
            <PCIeSlots
                x={150}
                y={680}
                isActive={activeComponents}
            />

            {/* Debug Display - Top right */}
            <DebugDisplay
                x={1100}
                y={60}
                isBooting={isBooting}
                bootComplete={bootComplete}
            />

            {/* I/O Shield area */}
            <g transform="translate(1100, 200)">
                <rect
                    x={0}
                    y={0}
                    width={80}
                    height={350}
                    fill="#151515"
                    stroke="#2a2a2a"
                    strokeWidth="2"
                    rx="4"
                />
                {/* USB ports */}
                {Array.from({ length: 4 }, (_, i) => (
                    <rect
                        key={`usb-${i}`}
                        x={10}
                        y={20 + i * 40}
                        width={25}
                        height={30}
                        fill="#0a0a0a"
                        stroke="#3a3a3a"
                        strokeWidth="1"
                        rx="2"
                    />
                ))}
                {/* Ethernet port */}
                <rect
                    x={10}
                    y={200}
                    width={40}
                    height={35}
                    fill="#0a0a0a"
                    stroke="#3a3a3a"
                    strokeWidth="1"
                    rx="2"
                />
                {/* HDMI port */}
                <rect
                    x={10}
                    y={250}
                    width={45}
                    height={20}
                    fill="#0a0a0a"
                    stroke="#3a3a3a"
                    strokeWidth="1"
                    rx="2"
                />
                <text
                    x={40}
                    y={380}
                    fill="#555"
                    fontSize="8"
                    fontFamily="monospace"
                    textAnchor="middle"
                >
                    I/O PANEL
                </text>
            </g>

            {/* SATA ports */}
            <g transform="translate(800, 700)">
                {Array.from({ length: 6 }, (_, i) => (
                    <g key={`sata-${i}`} transform={`translate(${i * 25}, 0)`}>
                        <rect
                            x={0}
                            y={0}
                            width={20}
                            height={12}
                            fill="#1a1a1a"
                            stroke={activeComponents ? '#ffd700' : '#3a3a3a'}
                            strokeWidth="1"
                            rx="1"
                        />
                        <rect
                            x={3}
                            y={3}
                            width={14}
                            height={6}
                            fill={activeComponents ? '#d4af37' : '#2a2a2a'}
                        />
                    </g>
                ))}
                <text
                    x={75}
                    y={25}
                    fill="#555"
                    fontSize="7"
                    fontFamily="monospace"
                    textAnchor="middle"
                >
                    SATA_0-5
                </text>
            </g>

            {/* Chipset heatsink */}
            <g transform="translate(700, 600)">
                <rect
                    x={0}
                    y={0}
                    width={80}
                    height={60}
                    fill="url(#heatsinkGradient)"
                    rx="4"
                />
                <text
                    x={40}
                    y={35}
                    fill="#d4af37"
                    fontSize="10"
                    fontFamily="monospace"
                    fontWeight="bold"
                    textAnchor="middle"
                >
                    Z690
                </text>
            </g>

            {/* KINGPIN branding at bottom */}
            <text
                x={450}
                y={850}
                fill="#d4af37"
                fontSize="28"
                fontFamily="monospace"
                fontWeight="bold"
                textAnchor="middle"
                filter="url(#glow)"
                className={activeComponents ? 'rhythmic-pulse' : ''}
            >
                KINGPIN
            </text>

            {/* Outer board glow when active */}
            {activeComponents && (
                <rect
                    x={5}
                    y={5}
                    width={1190}
                    height={890}
                    fill="none"
                    stroke="#d4af37"
                    strokeWidth="2"
                    rx="10"
                    filter="url(#glow)"
                    opacity="0.5"
                />
            )}
        </svg>
    )
}

export default CircuitBoard
