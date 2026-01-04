# TASKS

# Tasks Plan — Circuit Flow - Interactive Documentation Experience

## 📌 Global Assumptions
- Solo developer working on all tasks
- Modern browser support (Chrome, Firefox, Safari, Edge last 2 versions)
- PostgreSQL runs locally or on accessible dev server
- No authentication required for this demo
- Documents are static markdown files stored in database

## ⚠️ Risks
- SVG animation performance may degrade on lower-end devices
- Particle effect implementation complexity may exceed initial estimate
- Responsive layout for 5 chips may require repositioning on smaller screens

## 🧩 Epics
## Project Setup & Infrastructure
**Goal:** Initialize the project with required tooling and database

### ✅ Initialize React frontend with Vite and Tailwind CSS (small)

Create a new Vite + React + TypeScript project, install and configure Tailwind CSS with dark PCB color palette (matte black #0a0a0a, electric gold #ffd700, neon glow variants)

**Acceptance Criteria**
- Project builds without errors
- Tailwind is configured with custom PCB color tokens
- App renders a blank matte black screen

**Dependencies**
_None_
### ✅ Initialize Node.js backend with REST API structure (small)

Create Express server with TypeScript, configure CORS, health check endpoint, and basic route structure

**Acceptance Criteria**
- GET /health returns 200 OK
- Server runs on port 3001
- TypeScript compiles without errors

**Dependencies**
_None_
### ✅ Set up PostgreSQL database and schema (small)

Create database, tables for documents (id, title, type, content, created_at), add seed data for PRD.md and TRD.md

**Acceptance Criteria**
- Database connects successfully
- Documents table exists with proper schema
- Seed data contains PRD.md and TRD.md records

**Dependencies**
_None_
### ✅ Create database API endpoints (small)

Implement GET /api/documents to fetch all documents and GET /api/documents/:id to fetch single document content

**Acceptance Criteria**
- GET /api/documents returns array of documents
- GET /api/documents/:id returns single document with content
- Error handling for missing documents

**Dependencies**
- Set up PostgreSQL database and schema

## PCB Circuit Visual Design
**Goal:** Create the dark PCB background with golden traces using SVG

### ✅ Create SVG circuit board background component (small)

Build a responsive SVG component with matte black background, golden trace paths that branch and split from center to 5 chip positions

**Acceptance Criteria**
- SVG covers full viewport
- 5 distinct trace paths lead to chip positions
- Traces are golden (#ffd700) with glossy appearance

**Dependencies**
- Initialize React frontend with Vite and Tailwind CSS
### ✅ Implement CSS stroke-dash animation for traces (small)

Add CSS animations using stroke-dasharray and stroke-dashoffset to create the drawing/pulse effect along circuit paths

**Acceptance Criteria**
- Traces animate from center outward
- Animation completes in ~2 seconds
- Animation is smooth with easing

**Dependencies**
- Create SVG circuit board background component
### ✅ Add neon glow effects to active traces (small)

Implement CSS box-shadow and filter effects for neon electric gold glow when traces are animated/active

**Acceptance Criteria**
- Traces emit neon glow when active
- Glow effect pulses rhythmically after animation
- Performance is acceptable (60fps)

**Dependencies**
- Implement CSS stroke-dash animation for traces

## Virtual Cable Input Experience
**Goal:** Create the interactive input where users plug in their idea

### ✅ Design virtual cable input component (small)

Create an input field styled as a cable port at the center of the PCB, with a cable connector visual

**Acceptance Criteria**
- Input is centered on the circuit board
- Styled to look like a PCB connector port
- Placeholder text: 'Plug in your idea...'

**Dependencies**
- Create SVG circuit board background component
### ✅ Implement cable connection animation trigger (small)

When user submits input, trigger the pulse animation that shoots through circuit traces to all 5 chips

**Acceptance Criteria**
- Submitting input triggers pulse animation
- Pulse travels through all traces simultaneously
- Chips light up when pulse reaches them

**Dependencies**
- Add neon glow effects to active traces
- Design virtual cable input component

## Microchip Components
**Goal:** Create the 5 microchip visual elements with hover interactions

### ✅ Create base microchip component (small)

Build a reusable microchip component with rectangle body, pin visuals, and positioning for 5 distinct chips (CPU, memory bank, 3 others)

**Acceptance Criteria**
- Microchip renders as rectangle with pins
- Component accepts position and type props
- 5 chips positioned at trace endpoints

**Dependencies**
- Create SVG circuit board background component
### ✅ Design CPU chip variant for PRD.md (small)

Create large central CPU chip design with distinctive appearance, labels, and PRD.md association

**Acceptance Criteria**
- CPU chip is visually distinct (larger, central)
- Labeled 'PRD.md'
- Connected to main circuit traces

**Dependencies**
- Create base microchip component
### ✅ Design memory bank chip variant for TRD.md (small)

Create dense memory bank array design for TRD.md with grid pattern and dense pin layout

**Acceptance Criteria**
- Memory chip has grid/array pattern
- Labeled 'TRD.md'
- Visually distinct from CPU chip

**Dependencies**
- Create base microchip component
### ✅ Design 3 additional chip variants (small)

Create 3 unique chip designs for remaining documents (GPU, I/O, Storage variants) with distinct visual styles

**Acceptance Criteria**
- 3 unique chip designs
- Each has distinct visual pattern
- All follow PCB aesthetic

**Dependencies**
- Create base microchip component
### ✅ Implement chip pulse animation (small)

Add rhythmic pulsing glow effect to chips when activated by circuit pulse

**Acceptance Criteria**
- Chips glow when pulse reaches them
- Glow pulses rhythmically (sine wave pattern)
- All 5 chips pulse in sync

**Dependencies**
- Implement cable connection animation trigger

## Thermal Vision Hover Interaction
**Goal:** Implement hover effects that reveal content with thermal visualization

### ✅ Implement thermal color shift on hover (small)

Create CSS transition from gold to red/orange thermal colors when hovering over chips

**Acceptance Criteria**
- Hover triggers color shift to hot colors (red #ff4500, orange #ff8c00)
- Transition is smooth (0.3s)
- Color returns to gold when hover ends

**Dependencies**
- Implement chip pulse animation
### ✅ Create binary code particle emission effect (medium)

Implement particle system that emits 0s and 1s from hovered chips using CSS animations or simple canvas

**Acceptance Criteria**
- Binary particles emit from hovered chips
- Particles fade out as they rise
- Emission rate feels natural

**Dependencies**
- Implement thermal color shift on hover
### ✅ Reveal hidden text content on hover (small)

Show document title and preview text inside the chip when hovering, previously hidden

**Acceptance Criteria**
- Text appears with thermal effect
- Title is readable
- Preview text is truncated if long

**Dependencies**
- Create thermal color shift on hover

## Cool Down Download Interaction
**Goal:** Implement click-to-download with cooling visual feedback

### ✅ Implement click handler for chip download (small)

Add click event to chips that triggers download of associated document content from API

**Acceptance Criteria**
- Clicking chip fetches document content
- Content is downloaded as .md file
- Loading state during fetch

**Dependencies**
- Create database API endpoints
- Reveal hidden text content on hover
### ✅ Create cool down visual feedback animation (small)

Animate chip from hot colors back to cool gold with frost/ice effect when clicked

**Acceptance Criteria**
- Click triggers cool down animation
- Color transitions from hot to cool
- Animation lasts ~1 second

**Dependencies**
- Implement click handler for chip download

## Integration & Polish
**Goal:** Connect frontend and backend, add final polish

### ✅ Wire API integration to chip components (small)

Connect chip components to backend API, fetch document data on mount, cache responses

**Acceptance Criteria**
- Chips fetch document data on app load
- Data is cached in state
- Error handling for API failures

**Dependencies**
- Create database API endpoints
- Design memory bank chip variant for TRD.md
### ✅ Add responsive design adjustments (medium)

Ensure PCB layout works on mobile, tablet, and desktop screens with appropriate scaling

**Acceptance Criteria**
- Layout works on mobile (320px+)
- Layout works on tablet (768px+)
- Layout works on desktop (1024px+)
- Chips remain clickable at all sizes

**Dependencies**
- Wire API integration to chip components
### ✅ Add accessibility features (medium)

Add ARIA labels, keyboard navigation, focus states for all interactive elements

**Acceptance Criteria**
- All interactive elements have ARIA labels
- Tab navigation works for all chips
- Focus states are visible
- Screen reader announces chip contents on hover/focus

**Dependencies**
- Add responsive design adjustments

## ❓ Open Questions
_None_