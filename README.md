# ⚡ Circuit Flow

<div align="center">

![Circuit Flow Banner](https://img.shields.io/badge/Circuit%20Flow-Documentation%20Generator-gold?style=for-the-badge&logo=lightning&logoColor=white)

**Transform your ideas into complete technical documentation with an immersive motherboard experience**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Now-brightgreen?style=for-the-badge)](https://kingpin-six.vercel.app)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

</div>

---

## 🎯 What is Circuit Flow?

Circuit Flow is an **AI-powered documentation generator** with a stunning visual interface inspired by high-end motherboards like the **EVGA Z690 Dark Kingpin**. Enter your project idea, watch the motherboard "power on", and download professionally formatted documentation.

### ✨ Features

| Feature | Description |
|---------|-------------|
| 🔌 **Prompt-Based Generation** | Enter any project idea and generate 5 complete documents |
| 🖥️ **Immersive Motherboard UI** | VRM heatsinks, CPU socket, RAM slots, PCIe slots, debug display |
| ⚡ **Boot Sequence Animation** | Realistic POST code cycling and trace activation |
| 🔥 **Thermal Hover Effects** | Red/orange glow with binary particle emission |
| 📥 **One-Click Downloads** | Click any chip to download generated markdown |

---

## 🎬 Demo

<div align="center">

### Enter Your Idea
>
> *"Make me a SaaS dashboard for analytics"*

### Watch the Motherboard Power On

The circuit traces light up, POST codes cycle, and your documentation generates.

### Download Your Docs

Click any chip to download PRD, TRD, Architecture, API Spec, or Deployment guides.

</div>

---

## 📄 Generated Documents

| Chip | Document | What You Get |
|------|----------|--------------|
| 🔲 **CPU** | `PRD.md` | Product vision, goals, features, target users |
| 💾 **RAM 1** | `TRD.md` | Technical specs, API contracts, data models |
| 💾 **RAM 2** | `Architecture.md` | System design, tech stack, diagrams |
| 💾 **RAM 3** | `API-Spec.md` | Endpoint documentation, request/response |
| 💾 **RAM 4** | `Deployment.md` | Setup guide, Docker, cloud deployment |

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/salvadalba/nodaysidle-circuitFlow.git
cd nodaysidle-circuitFlow

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) and start generating docs!

---

## 🎨 Design Inspiration

The UI is inspired by the **EVGA Z690 Dark Kingpin** motherboard, featuring:

- 🖤 **Matte Black PCB** with golden traces
- 🔶 **Angular VRM Heatsinks** with "DARK" branding
- 💠 **KINGPIN CPU Socket** with LGA pin grid detail
- 📊 **7-Segment Debug Display** with POST codes
- ⚡ **Golden Circuit Traces** with pulse animations

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 18, Vite, Tailwind CSS |
| **Animations** | CSS Keyframes, SVG Stroke Animations |
| **Backend** | Node.js, Express, TypeScript |
| **Database** | PostgreSQL |
| **Deployment** | Vercel |

---

## 📁 Project Structure

```
circuit-flow/
├── src/
│   ├── api/              # API client
│   ├── components/       # React components
│   │   ├── CircuitBoard.jsx
│   │   ├── CPUSocket.jsx
│   │   ├── RAMSlots.jsx
│   │   ├── VRMHeatsink.jsx
│   │   ├── DebugDisplay.jsx
│   │   └── ...
│   ├── App.jsx           # Main app with prompt input
│   └── index.css         # Animations and styles
├── server/               # Backend API (optional)
└── package.json
```

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `R` | Restart / New Generation |
| `Enter` | Submit Prompt |

---

## 🌐 Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/salvadalba/nodaysidle-circuitFlow)

Or manually:

```bash
npm install -g vercel
vercel
```

---

## 📜 License

MIT License - feel free to use this project for your own purposes.

---

<div align="center">

**Built with ⚡ by Circuit Flow**

*Transform ideas into documentation*

</div>
