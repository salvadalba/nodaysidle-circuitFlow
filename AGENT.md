# AGENT

# Agent Prompts — Circuit Flow

## 🧭 Global Rules

### ✅ Do
- Use React with Tailwind CSS for all styling
- Use SVG with CSS stroke-dasharray/stroke-dashoffset for circuit animations
- Implement hover effects that show thermal glow (red/orange) on chips
- Add binary code particle effects on chip hover
- Make chips clickable to 'download' (cool down effect)
- Use matte black (#000000) background with golden traces
- Create pulsing neon gold glow effect on active circuit paths

### ❌ Don’t
- Do not use 3D libraries or Three.js
- Do not introduce alternative CSS frameworks
- Do not add backend database features
- Do not use non-standard ports
- Do not invent additional dependencies beyond React/Tailwind
- Do not add authentication or user management

## 🧩 Task Prompts
## Initialize React + Tailwind Project

**Context**
Create the base project structure with React, Vite, and Tailwind CSS configured for the Circuit Flow interactive experience.

### Universal Agent Prompt
```
ROLE: Expert Frontend Engineer

GOAL: Bootstrap React + Vite + Tailwind project with proper configuration

CONTEXT: Create the base project structure with React, Vite, and Tailwind CSS configured for the Circuit Flow interactive experience.

FILES TO CREATE:
- package.json
- vite.config.js
- tailwind.config.js
- postcss.config.js
- index.html
- src/main.jsx
- src/App.jsx
- src/index.css

FILES TO MODIFY:
_None_

DETAILED STEPS:
1. Initialize npm project with Vite + React template
2. Install dependencies: react, react-dom, @vitejs/plugin-react, tailwindcss, postcss, autoprefixer
3. Configure Vite for React with proper plugins
4. Configure Tailwind with custom colors for PCB theme (matte black, neon gold, thermal red/orange)
5. Create base HTML shell with root div
6. Create main.jsx entry point with React strict mode
7. Create App.jsx component shell
8. Add Tailwind directives to index.css and set base dark theme

VALIDATION:
npm run build
```

---

## Create Circuit Board SVG Component

**Context**
Build the main circuit board visual with matte black background and golden trace lines that will animate.

### Universal Agent Prompt
```
ROLE: React Frontend Specialist

GOAL: Create SVG circuit board with animated golden traces

CONTEXT: Build the main circuit board visual with matte black background and golden trace lines that will animate.

FILES TO CREATE:
- src/components/CircuitBoard.jsx
- src/components/CircuitTrace.jsx

FILES TO MODIFY:
- src/App.jsx

DETAILED STEPS:
1. Create CircuitBoard component with viewBox='0 0 1200 800'
2. Add matte black rectangle background (#000000)
3. Create CircuitTrace component for individual circuit lines
4. Design 5 distinct circuit paths that branch from left (input) to right (chips)
5. Use SVG path elements with golden stroke color (#D4AF37 or similar)
6. Add CSS classes for stroke-dasharray and stroke-dashoffset animation
7. Implement pulse animation using CSS keyframes
8. Mount CircuitBoard in App.jsx

VALIDATION:
npm run build
```

---

## Create Microchip Components

**Context**
Build 5 microchip components representing the documents (PRD.md, TRD.md, etc.) with thermal vision hover effects.

### Universal Agent Prompt
```
ROLE: React Frontend Specialist

GOAL: Create interactive microchip components with thermal hover effects

CONTEXT: Build 5 microchip components representing the documents (PRD.md, TRD.md, etc.) with thermal vision hover effects.

FILES TO CREATE:
- src/components/Microchip.jsx
- src/components/ChipLabel.jsx

FILES TO MODIFY:
- src/components/CircuitBoard.jsx

DETAILED STEPS:
1. Create Microchip component with rectangular chip shape (SVG rect)
2. Style chips as PCB components with dark body and golden pins
3. Position 5 chips at the end of each circuit trace path
4. Add ChipLabel component for hidden text inside chips
5. Implement hover state: chip glows red/orange (thermal effect)
6. Add binary code particle emission on hover (small text elements floating up)
7. Make chips clickable with 'cool down' download animation
8. Label chips: PRD.md (central CPU style), TRD.md (memory bank array), plus 3 others
9. Integrate chips into CircuitBoard component at trace endpoints

VALIDATION:
npm run build
```

---

## Implement Cable Input Animation

**Context**
Create the 'virtual cable' input interaction that triggers the circuit pulse animation.

### Universal Agent Prompt
```
ROLE: React Frontend Specialist

GOAL: Add cable input interaction that triggers circuit pulse

CONTEXT: Create the 'virtual cable' input interaction that triggers the circuit pulse animation.

FILES TO CREATE:
- src/components/CableInput.jsx

FILES TO MODIFY:
- src/App.jsx
- src/components/CircuitBoard.jsx

DETAILED STEPS:
1. Create CableInput component with visual cable connector on left side
2. Add click handler to simulate 'plugging in' the cable
3. On connect: trigger animation state in CircuitBoard
4. Circuit traces animate left-to-right using stroke-dashoffset
5. Pulse splits and branches at junction points
6. When pulse reaches each chip, trigger chip activation sequentially
7. Add rhythmic pulsing to chips after activation
8. Style cable with metallic/golden appearance to match PCB theme

VALIDATION:
npm run build
```

---

## Add Particle Effects System

**Context**
Implement binary code particle effects that emit from chips during thermal hover state.

### Universal Agent Prompt
```
ROLE: React Frontend Specialist

GOAL: Create binary particle effects for chip hover states

CONTEXT: Implement binary code particle effects that emit from chips during thermal hover state.

FILES TO CREATE:
- src/components/BinaryParticles.jsx
- src/hooks/useParticles.js

FILES TO MODIFY:
- src/components/Microchip.jsx

DETAILED STEPS:
1. Create useParticles hook for managing particle state and animation
2. Create BinaryParticles component that renders floating text elements
3. Particles should display random binary (0s and 1s)
4. On chip hover: emit particles upward from chip position
5. Particles fade out and remove after animation completes
6. Use requestAnimationFrame or CSS animations for smooth performance
7. Limit particle count for performance (~20-30 particles max)
8. Style particles in green/gold terminal colors
9. Integrate particles into Microchip hover state

VALIDATION:
npm run build
```

---

## Implement Download/Cool Down Interaction

**Context**
Add click handler to chips that triggers a 'cool down' animation simulating file download.

### Universal Agent Prompt
```
ROLE: React Frontend Specialist

GOAL: Add chip click interaction with cool down/download effect

CONTEXT: Add click handler to chips that triggers a 'cool down' animation simulating file download.

FILES TO CREATE:
- src/hooks/useDownloadAnimation.js

FILES TO MODIFY:
- src/components/Microchip.jsx
- src/components/CircuitBoard.jsx

DETAILED STEPS:
1. Create useDownloadAnimation hook for managing download state
2. On chip click: trigger cool down animation
3. Thermal red/orange glow transitions to cool blue/cyan
4. Add visual indicator of 'processing download'
5. Show completion state when download finishes
6. Add progress bar or filling effect on chip body
7. Reset chip to idle state after animation
8. Make animation reversible (can re-trigger)
9. Add sound effect hint (commented out, optional implementation)

VALIDATION:
npm run build
```

---

## Polish Animations and Responsive Design

**Context**
Refine all animations, add easing, ensure responsive behavior across screen sizes.

### Universal Agent Prompt
```
ROLE: React Frontend Specialist

GOAL: Polish animations and ensure responsive layout

CONTEXT: Refine all animations, add easing, ensure responsive behavior across screen sizes.

FILES TO CREATE:
_None_

FILES TO MODIFY:
- src/index.css
- src/components/CircuitBoard.jsx
- src/components/Microchip.jsx
- src/components/CircuitTrace.jsx

DETAILED STEPS:
1. Add smooth CSS transitions to all hover states (200-300ms)
2. Refine circuit pulse animation with proper easing functions
3. Add responsive viewBox scaling for CircuitBoard on smaller screens
4. Ensure touch interactions work on mobile devices
5. Add loading state while circuit animation initializes
6. Optimize particle animations for 60fps performance
7. Add subtle glow filters using CSS drop-shadow for neon effect
8. Test and adjust timing for entire pulse sequence (cable → traces → chips)
9. Add accessibility features (keyboard navigation, ARIA labels)

VALIDATION:
npm run build
```