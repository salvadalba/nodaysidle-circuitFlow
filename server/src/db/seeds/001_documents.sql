-- Seed data for Circuit Flow documents
INSERT INTO documents (id, title, type, description, content)
VALUES (
        'prd',
        'PRD.md',
        'cpu',
        'Product Requirements Document - Core product vision and requirements',
        '# Product Requirements Document

## 🎯 Product Vision
A visually stunning web application that transforms documentation into an interactive circuit board experience, where ideas flow as electrical pulses through golden traces on a dark PCB interface.

## ❓ Problem Statement
Traditional documentation viewers are static and uninspiring. Users need an engaging way to interact with technical documentation (PRD, TRD) that matches the energy and innovation of modern development workflows.

## 🎯 Goals
- Create an immersive circuit board visualization for document browsing
- Implement animated electrical pulse effects along circuit traces
- Enable interactive chip elements that reveal content on hover
- Deliver smooth SVG path animations using CSS
- Support document download interactions via click mechanics

## 🚫 Non-Goals
- 3D rendering or WebGL implementation
- Real-time collaboration features
- Document editing capabilities
- User authentication system
- Alternative visual themes

## 👥 Target Users
- Developers exploring project documentation
- Technical leads reviewing product specifications
- Stakeholders viewing architectural designs
- Users who appreciate unique visual interfaces

## 🧩 Core Features
- Virtual cable input interaction to trigger animations
- SVG circuit board with golden trace paths
- CSS stroke-dasharray pulse animations along circuit lines
- Five interactive microchip rectangles (PRD.md, TRD.md, etc.)
- Thermal vision hover effects (red/orange glow)
- Binary code particle emission on hover
- Click-to-cool-down download interaction
- Central CPU chip visualization for navigation
- Rhythmic pulsing animations for activated chips
'
    ),
    (
        'trd',
        'TRD.md',
        'memory',
        'Technical Requirements Document - Technical specifications and architecture',
        '# Technical Requirements Document

## 🧭 System Context
Circuit Flow is an interactive web application that visualizes ideas as electrical pulses flowing through a dark PCB (Printed Circuit Board) interface. The app features SVG-based circuit animations with five downloadable documents represented as microchips.

## 🔌 API Contracts

### Download Document
- **Method:** GET
- **Path:** /api/documents/{id}/download
- **Response:** Markdown file content

### Get All Documents
- **Method:** GET
- **Path:** /api/documents
- **Response:** Array of document metadata

### Get Single Document
- **Method:** GET
- **Path:** /api/documents/{id}
- **Response:** Document with full content

## 🧱 Modules

### Frontend - CircuitBoard Component
- Render SVG-based PCB layout with golden circuit traces
- Manage pulse animation state using CSS stroke-dasharray
- Coordinate timing of pulse propagation

### Frontend - Chip Components
- Render individual microchip rectangles
- Handle hover events for thermal vision effect
- Trigger download on click

### Backend - Document Service
- Serve documents from PostgreSQL database
- Return file metadata and content
- Stream file content for download
'
    ),
    (
        'architecture',
        'Architecture.md',
        'gpu',
        'System Architecture - High-level system design and components',
        '# Architecture Document

## 🧱 System Overview
Circuit Flow is a single-page interactive web application featuring a PCB-inspired visualization where users interact with animated electrical pulses through circuit traces to reveal five microchip documents.

## 🏗 Architecture Style
Client-centric SPA with static asset hosting and lightweight backend for file serving

## 🎨 Frontend Architecture
- **Framework:** React with functional components and hooks
- **State Management:** React useState for component-level state
- **Routing:** None required - single-page experience
- **Build Tooling:** Vite for fast development and optimized builds

## 🧠 Backend Architecture
- **Approach:** Minimal REST API serving documents
- **API Style:** REST with GET endpoints for file retrieval
- **Services:** Document service, Static asset server

## 🗄 Data Layer
- **Primary Store:** PostgreSQL for document content and metadata
- **Relationships:** Simple flat structure, one table for documents

## ☁️ Infrastructure
- **Frontend:** Vercel or Netlify
- **Backend:** Node.js on Railway/Render
- **Database:** PostgreSQL on Railway/Neon
'
    ),
    (
        'api-spec',
        'API-Spec.md',
        'io',
        'API Specification - Detailed API endpoint documentation',
        '# API Specification

## Base URL
`http://localhost:3001/api`

## Endpoints

### Health Check
```
GET /health
```
Returns server status and version.

**Response:**
```json
{
  "status": "ok",
  "version": "1.0.0",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### List Documents
```
GET /api/documents
```
Returns all available documents.

**Response:**
```json
{
  "documents": [
    {
      "id": "prd",
      "title": "PRD.md",
      "type": "cpu",
      "description": "Product Requirements Document"
    }
  ]
}
```

### Get Document
```
GET /api/documents/:id
```
Returns a single document with full content.

**Response:**
```json
{
  "id": "prd",
  "title": "PRD.md",
  "type": "cpu",
  "description": "Product Requirements Document",
  "content": "# PRD..."
}
```

### Download Document
```
GET /api/documents/:id/download
```
Downloads the document as a markdown file.

**Headers:**
- `Content-Type: text/markdown`
- `Content-Disposition: attachment; filename="PRD.md"`
'
    ),
    (
        'deployment',
        'Deployment.md',
        'storage',
        'Deployment Guide - Instructions for deploying the application',
        '# Deployment Guide

## 🚀 Prerequisites
- Node.js 18+
- PostgreSQL database
- Vercel/Netlify account (frontend)
- Railway/Render account (backend)

## 📦 Local Development

### Frontend
```bash
cd /path/to/project
npm install
npm run dev
```

### Backend
```bash
cd /path/to/project/server
npm install
npm run migrate
npm run seed
npm run dev
```

## 🌐 Production Deployment

### Database (Railway/Neon)
1. Create PostgreSQL database
2. Copy connection string to .env
3. Run migrations: `npm run migrate`
4. Seed data: `npm run seed`

### Backend (Railway)
1. Connect GitHub repository
2. Set environment variables
3. Deploy

### Frontend (Vercel)
1. Connect GitHub repository
2. Set API URL environment variable
3. Deploy

## 🔧 Environment Variables

### Backend
- `DATABASE_URL` - PostgreSQL connection string
- `PORT` - Server port (default: 3001)
- `CORS_ORIGIN` - Frontend URL

### Frontend
- `VITE_API_URL` - Backend API URL
'
    ) ON CONFLICT (id) DO
UPDATE
SET title = EXCLUDED.title,
    type = EXCLUDED.type,
    description = EXCLUDED.description,
    content = EXCLUDED.content,
    updated_at = CURRENT_TIMESTAMP;