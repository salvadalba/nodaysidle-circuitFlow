# Circuit Flow - Implementation Plan

## 📋 Project Overview

**Circuit Flow** is an interactive single-page web application that visualizes documentation as a PCB (Printed Circuit Board) interface. Users interact with a virtual cable input that triggers animated electrical pulses through golden circuit traces to reveal microchip documents.

### Key Design Decisions

- **Pure Frontend Approach**: Following AGENT.md guidelines, no backend database or REST API
- **Static Documents**: Documents will be embedded as static content or downloadable markdown files
- **React + Vite + Tailwind CSS**: Modern frontend stack for fast development and optimized builds
- **SVG Animations**: CSS-based stroke-dasharray animations for circuit pulse effects
- **No 3D Libraries**: Pure SVG and CSS for performance and simplicity

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        App.jsx                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                   CableInput                          │  │
│  │  - Virtual cable connector on left side              │  │
│  │  - Triggers circuit animation on connect             │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                  CircuitBoard                        │  │
│  │  - SVG viewBox: 0 0 1200 800                         │  │
│  │  - Matte black background (#000000)                  │  │
│  │  - Contains 5 CircuitTrace components               │  │
│  │  - Contains 5 Microchip components                   │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Component Hierarchy

```
App
├── CableInput
└── CircuitBoard
    ├── CircuitTrace (×5)
    └── Microchip (×5)
        ├── ChipLabel
        └── BinaryParticles
```

---

## 🎨 Visual Design System

### Color Palette

| Purpose | Color | Hex | Usage |
|---------|-------|-----|-------|
| Background | Matte Black | `#000000` | PCB background |
| Traces | Electric Gold | `#D4AF37` | Circuit paths |
| Thermal Hot | Red/Orange | `#ff4500`, `#ff8c00` | Chip hover state |
| Thermal Cool | Blue/Cyan | `#00bfff`, `#00ffff` | Download state |
| Neon Glow | Gold | `#ffd700` | Active traces |
| Particles | Green/Gold | `#00ff00`, `#ffd700` | Binary code |

### Animation Timing

| Animation | Duration | Easing |
|-----------|----------|--------|
| Circuit pulse | 2.0s | ease-in-out |
| Chip activation | 0.5s | ease-out |
| Hover transition | 0.3s | ease-in-out |
| Particle emission | 1.5s | ease-out |
| Download cool down | 1.0s | ease-out |
| Rhythmic pulse | 2.0s | infinite sine |

---

## 📦 Task Breakdown

### Phase 1: Project Setup (Tasks 1-8)

**Goal**: Initialize React + Vite + Tailwind CSS with PCB theme configuration

**Files to Create**:

- `package.json` - Project dependencies and scripts
- `vite.config.js` - Vite configuration for React
- `tailwind.config.js` - Tailwind with custom PCB colors
- `postcss.config.js` - PostCSS configuration
- `index.html` - HTML shell with root div
- `src/main.jsx` - React entry point
- `src/App.jsx` - Root component
- `src/index.css` - Tailwind directives and base styles

**Key Configuration**:

```javascript
// tailwind.config.js
theme: {
  extend: {
    colors: {
      pcb: {
        black: '#000000',
        gold: '#D4AF37',
        neon: '#ffd700',
        hot: '#ff4500',
        warm: '#ff8c00',
        cool: '#00bfff',
        cold: '#00ffff',
      }
    }
  }
}
```

**Validation**: `npm run build` succeeds

---

### Phase 2: Circuit Board Visualization (Tasks 9-16)

**Goal**: Create SVG circuit board with animated golden traces

**Files to Create**:

- `src/components/CircuitBoard.jsx` - Main board component
- `src/components/CircuitTrace.jsx` - Individual trace component

**Circuit Layout**:

```
Input (Left) → Junction → Branches → 5 Chips (Right)
                    ├→ Chip 1 (PRD.md)
                    ├→ Chip 2 (TRD.md)
                    ├→ Chip 3 (Architecture)
                    ├→ Chip 4 (API Spec)
                    └→ Chip 5 (Deployment)
```

**SVG Structure**:

```jsx
<svg viewBox="0 0 1200 800">
  <rect width="1200" height="800" fill="#000000" />
  <path d="M 50 400 L 200 400 L 400 200 L 900 200" stroke="#D4AF37" />
  <path d="M 50 400 L 200 400 L 400 400 L 900 400" stroke="#D4AF37" />
  <!-- ... 3 more paths -->
</svg>
```

**CSS Animation Classes**:

```css
.trace-animate {
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: pulse 2s ease-in-out forwards;
}

@keyframes pulse {
  to { stroke-dashoffset: 0; }
}

.neon-glow {
  filter: drop-shadow(0 0 10px #ffd700);
}
```

**Validation**: `npm run build` succeeds

---

### Phase 3: Microchip Components (Tasks 17-23)

**Goal**: Create 5 interactive microchip components with thermal hover effects

**Files to Create**:

- `src/components/Microchip.jsx` - Chip component
- `src/components/ChipLabel.jsx` - Hidden label component

**Chip Designs**:

1. **PRD.md** - Central CPU style (larger, distinctive)
2. **TRD.md** - Memory bank array (grid pattern)
3. **Architecture** - GPU style (parallel lines)
4. **API Spec** - I/O controller style (pin-heavy)
5. **Deployment** - Storage style (block pattern)

**Microchip Component Structure**:

```jsx
const Microchip = ({ id, name, position, type }) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <g transform={`translate(${position.x}, ${position.y})`}>
      {/* Chip body */}
      <rect
        width={type === 'cpu' ? 120 : 100}
        height={type === 'cpu' ? 120 : 100}
        fill="#1a1a1a"
        stroke="#D4AF37"
        className={isHovering ? 'thermal-glow' : ''}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      />
      {/* Pins */}
      {/* ... */}
      <ChipLabel name={name} visible={isHovering} />
    </g>
  );
};
```

**Thermal Effect CSS**:

```css
.thermal-glow {
  fill: #ff4500;
  filter: drop-shadow(0 0 20px #ff8c00);
  transition: all 0.3s ease-in-out;
}
```

**Validation**: `npm run build` succeeds

---

### Phase 4: Cable Input Animation (Tasks 24-31)

**Goal**: Create virtual cable input that triggers circuit pulse

**Files to Create**:

- `src/components/CableInput.jsx` - Cable connector component

**Files to Modify**:

- `src/App.jsx` - Mount CableInput
- `src/components/CircuitBoard.jsx` - Add animation state

**CableInput Component**:

```jsx
const CableInput = ({ onConnect }) => {
  const [isConnected, setIsConnected] = useState(false);

  const handleClick = () => {
    setIsConnected(true);
    onConnect();
  };

  return (
    <div className="cable-connector">
      <div className={`cable-port ${isConnected ? 'connected' : ''}`}>
        <div className="cable-connector-visual" />
        <input placeholder="Plug in your idea..." />
        <button onClick={handleClick}>Connect</button>
      </div>
    </div>
  );
};
```

**Animation Sequence**:

1. User clicks "Connect"
2. Cable visual animates (plugs in)
3. CircuitBoard receives `onConnect` callback
4. Traces animate left-to-right via stroke-dashoffset
5. Pulse splits at junction point
6. Each chip activates sequentially when pulse reaches it
7. Chips begin rhythmic pulsing

**Validation**: `npm run build` succeeds

---

### Phase 5: Particle Effects System (Tasks 32-40)

**Goal**: Implement binary code particle emission on chip hover

**Files to Create**:

- `src/components/BinaryParticles.jsx` - Particle renderer
- `src/hooks/useParticles.js` - Particle state management

**useParticles Hook**:

```javascript
const useParticles = (originX, originY, isActive) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      const newParticle = {
        id: Date.now() + Math.random(),
        x: originX,
        y: originY,
        value: Math.random() > 0.5 ? '1' : '0',
        opacity: 1,
      };
      setParticles(prev => [...prev.slice(-29), newParticle]);
    }, 100);

    return () => clearInterval(interval);
  }, [isActive, originX, originY]);

  return particles;
};
```

**BinaryParticles Component**:

```jsx
const BinaryParticles = ({ particles }) => {
  return (
    <g className="particles">
      {particles.map(p => (
        <text
          key={p.id}
          x={p.x}
          y={p.y}
          fill={Math.random() > 0.5 ? '#00ff00' : '#ffd700'}
          opacity={p.opacity}
          className="particle-animate"
        >
          {p.value}
        </text>
      ))}
    </g>
  );
};
```

**Particle Animation CSS**:

```css
.particle-animate {
  animation: float-up 1.5s ease-out forwards;
}

@keyframes float-up {
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(-50px);
    opacity: 0;
  }
}
```

**Validation**: `npm run build` succeeds

---

### Phase 6: Download/Cool Down Interaction (Tasks 41-48)

**Goal**: Add click-to-download with cooling visual feedback

**Files to Create**:

- `src/hooks/useDownloadAnimation.js` - Download state management

**Files to Modify**:

- `src/components/Microchip.jsx` - Add click handler
- `src/components/CircuitBoard.jsx` - Integrate download state

**useDownloadAnimation Hook**:

```javascript
const useDownloadAnimation = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [progress, setProgress] = useState(0);

  const startDownload = async (chipId) => {
    setIsDownloading(true);
    setProgress(0);

    // Simulate download progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 100);

    // Create and download file
    const content = getDocumentContent(chipId);
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${chipId}.md`;
    a.click();

    // Reset after animation
    setTimeout(() => {
      setIsDownloading(false);
      setProgress(0);
    }, 1500);
  };

  return { isDownloading, progress, startDownload };
};
```

**Cool Down Effect**:

```css
.cool-down {
  fill: #00bfff;
  filter: drop-shadow(0 0 20px #00ffff);
  transition: all 1s ease-out;
}

.progress-bar {
  fill: #00ffff;
  transition: width 0.1s linear;
}
```

**Validation**: `npm run build` succeeds

---

### Phase 7: Polish & Optimization (Tasks 49-58)

**Goal**: Refine animations, ensure responsiveness, add accessibility

**Files to Modify**:

- `src/index.css` - Global styles and transitions
- `src/components/CircuitBoard.jsx` - Responsive scaling
- `src/components/Microchip.jsx` - Accessibility features
- `src/components/CircuitTrace.jsx` - Animation refinement

**Responsive Design**:

```jsx
// CircuitBoard.jsx
const CircuitBoard = () => {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setScale(width < 768 ? 0.6 : width < 1024 ? 0.8 : 1);
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <svg
      viewBox="0 0 1200 800"
      style={{ transform: `scale(${scale})` }}
    >
      {/* ... */}
    </svg>
  );
};
```

**Accessibility Features**:

```jsx
<Microchip
  id="prd"
  name="PRD.md"
  role="button"
  tabIndex={0}
  aria-label="Download PRD.md document"
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleDownload();
    }
  }}
/>
```

**Performance Optimizations**:

- Use `React.memo` for chip components
- Debounce hover events
- Limit particle count to 30 max
- Use CSS transforms for GPU acceleration
- Optimize SVG paths with fewer control points

**Final Validation**: `npm run build` succeeds

---

## 🎯 Success Criteria

- ✅ All components render without errors
- ✅ Circuit pulse animation completes in ~2 seconds
- ✅ All 5 chips are interactive (hover, click)
- ✅ Thermal hover effect displays correctly
- ✅ Binary particles emit on chip hover
- ✅ Download triggers cool-down animation
- ✅ Layout is responsive (mobile, tablet, desktop)
- ✅ Keyboard navigation works for all chips
- ✅ Build succeeds without warnings
- ✅ Animations maintain 60fps performance

---

## 📂 Final Project Structure

```
circuit-flow/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css
│   ├── components/
│   │   ├── CircuitBoard.jsx
│   │   ├── CircuitTrace.jsx
│   │   ├── Microchip.jsx
│   │   ├── ChipLabel.jsx
│   │   ├── CableInput.jsx
│   │   └── BinaryParticles.jsx
│   └── hooks/
│       ├── useParticles.js
│       └── useDownloadAnimation.js
├── node_modules/
└── dist/
```

---

## 🚀 Next Steps

Once you approve this plan, I'll switch to **Code mode** to begin implementation starting with **Task 1: Initialize React + Vite + Tailwind CSS Project**.

Would you like me to proceed with this plan, or would you like to make any changes?
