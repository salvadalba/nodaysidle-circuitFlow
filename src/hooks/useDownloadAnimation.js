import { useState, useCallback } from 'react'

const useDownloadAnimation = () => {
    const [downloadState, setDownloadState] = useState({
        isDownloading: false,
        progress: 0,
        isComplete: false,
    })

    const documentContents = {
        prd: `# Product Requirements Document (PRD)

## 🎯 Product Vision
A visually stunning web application that transforms documentation into an interactive circuit board experience...

[Full PRD content would go here]
`,
        trd: `# Technical Requirements Document (TRD)

## 🧭 System Context
Circuit Flow is an interactive web application that visualizes ideas as electrical pulses...

[Full TRD content would go here]
`,
        architecture: `# Architecture Document

## 🏗 System Architecture
Detailed architecture overview and component structure...

[Full architecture content would go here]
`,
        'api-spec': `# API Specification Document

## 🔌 API Endpoints
Complete API documentation...

[Full API spec content would go here]
`,
        deployment: `# Deployment Guide

## 🚀 Deployment Steps
Step-by-step deployment instructions...

[Full deployment guide would go here]
`,
    }

    const startDownload = useCallback((chipId) => {
        setDownloadState({ isDownloading: true, progress: 0, isComplete: false })

        // Simulate download progress
        const progressInterval = setInterval(() => {
            setDownloadState(prev => {
                if (prev.progress >= 100) {
                    clearInterval(progressInterval)
                    return { ...prev, isDownloading: false, progress: 100, isComplete: true }
                }
                return { ...prev, progress: prev.progress + 10 }
            })
        }, 100)

        // Create and download the file
        setTimeout(() => {
            const content = documentContents[chipId] || 'Document content not found'
            const blob = new Blob([content], { type: 'text/markdown' })
            const url = URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = `${chipId}.md`
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
            URL.revokeObjectURL(url)

            // Reset state after download completes
            setTimeout(() => {
                setDownloadState({ isDownloading: false, progress: 0, isComplete: false })
            }, 2000)
        }, 1000)
    }, [documentContents])

    const reset = useCallback(() => {
        setDownloadState({ isDownloading: false, progress: 0, isComplete: false })
    }, [])

    return {
        ...downloadState,
        startDownload,
        reset,
    }
}

export default useDownloadAnimation
