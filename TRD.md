# TRD

# Technical Requirements Document

## 🧭 System Context
Circuit Flow is an interactive web application that visualizes ideas as electrical pulses flowing through a dark PCB (Printed Circuit Board) interface. The app features SVG-based circuit animations with five downloadable documents (PRD.md, TRD.md, and 3 additional files) represented as microchips. Users trigger a 'virtual cable' connection animation, watch electrical pulses propagate through golden circuit traces, and can hover over chips to reveal content via thermal vision effect before downloading.

## 🔌 API Contracts
### Download Chip File
- **Method:** GET
- **Path:** /api/chips/{chipId}/download
- **Auth:** none
- **Request:** chipId: string (path param) - one of: 'prd', 'trd', 'architecture', 'api-spec', 'deployment'
- **Response:** file: binary (markdown file with appropriate Content-Type and Content-Disposition headers)
- **Errors:**
- 404 - Chip ID not found
- 500 - Internal server error during file read

### Get Chip Metadata
- **Method:** GET
- **Path:** /api/chips
- **Auth:** none
- **Request:** none
- **Response:** { chips: [{ id: string, name: string, description: string, size: number, lastModified: string }] }
- **Errors:**
- 500 - Internal server error

### Trigger Circuit Animation
- **Method:** POST
- **Path:** /api/animation/trigger
- **Auth:** none
- **Request:** { chipId: string }
- **Response:** { status: 'triggered', animationDuration: number }
- **Errors:**
- 400 - Invalid chipId
- 429 - Rate limit exceeded (max 10 requests per minute)

### Health Check
- **Method:** GET
- **Path:** /api/health
- **Auth:** none
- **Request:** none
- **Response:** { status: 'ok', version: string, timestamp: string }
- **Errors:**
_None_

## 🧱 Modules
### Frontend - CircuitBoard Component
- **Responsibilities:**
- Render SVG-based PCB layout with golden circuit traces
- Manage pulse animation state using CSS stroke-dasharray/stroke-dashoffset
- Coordinate timing of pulse propagation from input to all 5 chips
- **Interfaces:**
- startAnimation(chipId: string): void
- resetAnimation(): void
- setHoverState(chipId: string, isHovering: boolean): void
- **Depends on:**
- Frontend - Chip Components
- Frontend - Animation Engine

### Frontend - Chip Components
- **Responsibilities:**
- Render individual microchip rectangles (CPU, memory bank, and 3 additional chips)
- Handle hover events for thermal vision effect (red/orange glow)
- Emit binary code particles on hover
- Trigger download on click
- **Interfaces:**
- ChipProps: { id, name, position, description }
- onHover(): void
- onClick(): Promise<Blob>
- **Depends on:**
- API Client Module
- Frontend - Particle System

### Frontend - Animation Engine
- **Responsibilities:**
- Calculate SVG path timing and sequencing
- Manage CSS animations for circuit pulse propagation
- Coordinate chip activation timing
- **Interfaces:**
- animatePath(pathElement: SVGPathElement, duration: number): Promise<void>
- getChipActivationSequence(chipId: string): number[]
- **Depends on:**
_None_

### Frontend - Particle System
- **Responsibilities:**
- Generate binary code particles (0s and 1s) on chip hover
- Animate particle emission and fading
- Clean up particles after animation completes
- **Interfaces:**
- emitParticles(originX: number, originY: number, count: number): void
- clearParticles(): void
- **Depends on:**
_None_

### Frontend - API Client
- **Responsibilities:**
- Make HTTP requests to backend endpoints
- Handle file download blob conversion
- Implement retry logic and error handling
- **Interfaces:**
- fetchChipMetadata(): Promise<Chip[]>
- downloadChip(chipId: string): Promise<Blob>
- triggerAnimation(chipId: string): Promise<AnimationResponse>
- **Depends on:**
_None_

### Backend - File Service
- **Responsibilities:**
- Serve static markdown files from filesystem
- Return file metadata (size, last modified)
- Stream file content for download
- **Interfaces:**
- getFile(chipId: string): Promise<Buffer>
- getMetadata(chipId: string): Promise<FileMetadata>
- **Depends on:**
- Backend - Storage Module

### Backend - Storage Module
- **Responsibilities:**
- Store and retrieve markdown files from disk
- Manage file path resolution
- Cache frequently accessed metadata
- **Interfaces:**
- readFile(path: string): Promise<Buffer>
- getStats(path: string): Promise<fs.Stats>
- **Depends on:**
_None_

### Backend - API Router
- **Responsibilities:**
- Define and register REST endpoints
- Implement request validation
- Apply rate limiting middleware
- **Interfaces:**
- registerRoutes(app: Express): void
- validateChipId(req: Request, res: Response, next: NextFunction): void
- **Depends on:**
- Backend - File Service
- Backend - Rate Limiter

### Backend - Rate Limiter
- **Responsibilities:**
- Enforce rate limits on animation trigger endpoint
- Track request counts per IP/client
- Return 429 status when limit exceeded
- **Interfaces:**
- checkLimit(identifier: string): Promise<boolean>
- resetLimit(identifier: string): void
- **Depends on:**
_None_

## 🗃 Data Model Notes
- Chip metadata stored in PostgreSQL table 'chips': id (PK, varchar), name (varchar), description (text), file_path (varchar), size (bigint), created_at (timestamp), updated_at (timestamp)
- Actual markdown files stored in filesystem at /files/chips/{chipId}.md
- Binary particle data is client-side generated, not persisted
- Animation state is ephemeral, stored only in React component state
- Rate limiting uses in-memory map with IP-based keys and sliding window counter

## 🔐 Validation & Security
- Validate chipId against allowed whitelist: ['prd', 'trd', 'architecture', 'api-spec', 'deployment'] to prevent path traversal
- Sanitize file paths to prevent directory traversal attacks (no '..' or absolute paths)
- Set Content-Security-Policy header to restrict external resource loading
- Implement rate limiting on animation endpoint (10 req/min per IP)
- File downloads include Content-Disposition: attachment header
- All user inputs validated via express-validator or zod schemas
- CORS configured to allow only specific origins if deployed separately

## 🧯 Error Handling Strategy
Client uses React Error Boundary for component-level errors. API errors return standardized JSON with { error: string, code: string, details?: any }. File not found returns 404 with helpful message. Network errors trigger retry with exponential backoff (max 3 attempts). Animation failures gracefully degrade - chips remain clickable without animation. Rate limit errors display toast notification asking user to wait.

## 🔭 Observability
- **Logging:** Winston/pino for structured logging: log file downloads, API errors, rate limit violations. Log format: JSON with timestamp, level, message, requestId, userId (if authenticated), ip.
- **Tracing:** OpenTelemetry for distributed tracing. Trace spans for: file download flow, animation trigger flow. Correlate frontend user interactions with backend requests via X-Request-ID header.
- **Metrics:**
- counter: file_downloads_total (by chipId)
- counter: animation_triggers_total
- gauge: active_animations_current
- histogram: file_download_duration_seconds
- counter: api_errors_total (by endpoint, status code)
- counter: rate_limit_hits_total

## ⚡ Performance Notes
- SVG paths pre-calculated and cached to avoid runtime path computation
- CSS animations use transform and opacity for GPU acceleration
- File downloads use streaming (fs.createReadStream) to avoid loading entire file into memory
- Chip metadata cached in-memory after first DB query (invalidated on file updates)
- Particle system limits max 50 concurrent particles to prevent DOM overload
- Use React.memo for Chip components to prevent unnecessary re-renders
- Debounce hover events to prevent particle spam

## 🧪 Testing Strategy
### Unit
- API client methods: fetchChipMetadata, downloadChip, triggerAnimation
- Chip component: hover state, click handler, particle emission
- Animation engine: path timing calculation, sequence generation
- File service: readFile, getMetadata with mock filesystem
- Rate limiter: increment, check, reset logic
### Integration
- API endpoint tests: GET /api/chips, GET /api/chips/:id/download
- File download end-to-end: request -> file service -> response stream
- Rate limiting: verify 429 response after limit exceeded
- Circuit animation: trigger API call followed by chip activation sequence
### E2E
- Complete user flow: connect cable -> animation -> hover chip -> download file
- Multiple rapid animations trigger rate limit
- All 5 chips accessible and downloadable
- Animation completes and chips activate in correct sequence
- Thermal vision effect displays on hover for all chip types

## 🚀 Rollout Plan
- Phase 1: Set up backend structure - Express server, PostgreSQL schema, file storage directory, basic API endpoints
- Phase 2: Implement frontend shell - React app setup, Tailwind config, static PCB layout with 5 chip positions
- Phase 3: Build SVG circuit paths - Design trace layout, implement path animations, connect input to all chips
- Phase 4: Implement chip components - Hover effects, particle system, download functionality
- Phase 5: Integrate backend - Connect frontend to real API, replace mock file content with actual files
- Phase 6: Polish and optimize - Refine animations, add error handling, implement rate limiting, performance tuning
- Phase 7: Deploy - Set up production infrastructure, configure CORS/CDN, monitoring setup

## ❓ Open Questions
- Should the circuit pulse animation be synchronous (same duration for all paths) or asynchronous (different paths complete at different times)?
- What are the actual file contents for the 3 additional chips (architecture, api-spec, deployment)?
- Should animation state persist across page refreshes (via URL state)?
- Accessibility: provide keyboard navigation and screen reader support for chip interaction?
- Should particle system be throttled on low-performance devices?