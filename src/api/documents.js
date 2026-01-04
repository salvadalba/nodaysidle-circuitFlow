const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

/**
 * Generate documentation from a user prompt
 * This calls the backend which uses AI to generate PRD, TRD, etc.
 */
export async function generateDocumentation(prompt) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/generate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.documents;
    } catch (error) {
        console.error('Failed to generate documentation:', error);
        // Return fallback generated docs if API fails
        return generateFallbackDocs(prompt);
    }
}

/**
 * Fetch all documents metadata
 */
export async function fetchDocuments() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/documents`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.documents;
    } catch (error) {
        console.error('Failed to fetch documents:', error);
        return [];
    }
}

/**
 * Fetch a single document with content
 */
export async function fetchDocument(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/documents/${id}`);

        if (!response.ok) {
            if (response.status === 404) {
                return null;
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`Failed to fetch document ${id}:`, error);
        return null;
    }
}

/**
 * Download a document as markdown file
 */
export async function downloadDocument(id, generatedDocs = null) {
    // If we have generated docs, download from memory
    if (generatedDocs) {
        const doc = generatedDocs.find(d => d.id === id);
        if (doc) {
            const blob = new Blob([doc.content], { type: 'text/markdown' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${doc.title}`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
            return;
        }
    }

    // Otherwise fetch from API
    try {
        const response = await fetch(`${API_BASE_URL}/api/documents/${id}/download`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${id}.md`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error(`Failed to download document ${id}:`, error);
    }
}

/**
 * Generate fallback docs when API is unavailable (demo mode)
 */
function generateFallbackDocs(prompt) {
    const projectName = extractProjectName(prompt);

    return [
        {
            id: 'prd',
            title: 'PRD.md',
            type: 'cpu',
            description: 'Product Requirements Document',
            content: generatePRD(projectName, prompt)
        },
        {
            id: 'trd',
            title: 'TRD.md',
            type: 'memory',
            description: 'Technical Requirements Document',
            content: generateTRD(projectName, prompt)
        },
        {
            id: 'architecture',
            title: 'Architecture.md',
            type: 'gpu',
            description: 'System Architecture',
            content: generateArchitecture(projectName, prompt)
        },
        {
            id: 'api-spec',
            title: 'API-Spec.md',
            type: 'io',
            description: 'API Specification',
            content: generateAPISpec(projectName, prompt)
        },
        {
            id: 'deployment',
            title: 'Deployment.md',
            type: 'storage',
            description: 'Deployment Guide',
            content: generateDeployment(projectName, prompt)
        }
    ];
}

function extractProjectName(prompt) {
    // Extract a project name from the prompt
    const words = prompt.split(' ');
    const keyWords = words.filter(w => w.length > 3 && !['make', 'build', 'create', 'want', 'need', 'like', 'with', 'that', 'this', 'have'].includes(w.toLowerCase()));
    return keyWords.slice(0, 3).join(' ') || 'My Project';
}

function generatePRD(name, prompt) {
    return `# Product Requirements Document
## ${name}

### 🎯 Product Vision
${prompt}

### ❓ Problem Statement
Users need a solution that addresses: ${prompt.toLowerCase()}

### 🎯 Goals
- Create an intuitive user experience
- Implement core functionality for ${name.toLowerCase()}
- Deliver a production-ready solution
- Ensure scalability and maintainability

### 🚫 Non-Goals
- Complex enterprise features (v2)
- Multi-tenant architecture (v2)
- Advanced analytics (v2)

### 👥 Target Users
- Primary users who need ${name.toLowerCase()}
- Teams looking for productivity improvements
- Organizations seeking modern solutions

### 🧩 Core Features
1. User Authentication & Authorization
2. Dashboard with key metrics
3. CRUD operations for main entities
4. Search and filtering capabilities
5. Responsive design for mobile/desktop

### ⚙️ Non-Functional Requirements
- Page load time under 2 seconds
- 99.9% uptime SLA
- WCAG 2.1 AA accessibility compliance
- Support for 10,000+ concurrent users

---
*Generated by Circuit Flow*
`;
}

function generateTRD(name, prompt) {
    return `# Technical Requirements Document
## ${name}

### 🧭 System Context
This document outlines the technical specifications for: ${prompt}

### 🔌 Technology Stack
- **Frontend:** React 18+ with TypeScript
- **Backend:** Node.js with Express
- **Database:** PostgreSQL
- **Caching:** Redis
- **Auth:** JWT with refresh tokens

### 🧱 API Contracts

#### Authentication
\`\`\`
POST /api/auth/login
POST /api/auth/register
POST /api/auth/logout
GET /api/auth/me
\`\`\`

#### Core Resources
\`\`\`
GET /api/resources
POST /api/resources
GET /api/resources/:id
PUT /api/resources/:id
DELETE /api/resources/:id
\`\`\`

### 🗃 Data Model
\`\`\`sql
CREATE TABLE users (
    id UUID PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE resources (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    title VARCHAR(255) NOT NULL,
    data JSONB,
    created_at TIMESTAMP DEFAULT NOW()
);
\`\`\`

### 🔐 Security Requirements
- Password hashing with bcrypt (12 rounds)
- HTTPS only in production
- Rate limiting: 100 req/min per IP
- SQL injection prevention via parameterized queries
- XSS prevention via content sanitization

---
*Generated by Circuit Flow*
`;
}

function generateArchitecture(name, prompt) {
    return `# Architecture Document
## ${name}

### 🧱 System Overview
${prompt}

### 🏗 Architecture Style
Modern microservices-ready monolith with clear module boundaries.

\`\`\`
┌─────────────────────────────────────────────┐
│                  Frontend                    │
│              (React + Vite)                  │
└─────────────────────┬───────────────────────┘
                      │ HTTPS
┌─────────────────────▼───────────────────────┐
│                API Gateway                   │
│             (Express + Node.js)              │
├─────────────────────────────────────────────┤
│  Auth    │  Resources  │  Analytics  │ ...  │
└──────────┴──────┬──────┴─────────────┴──────┘
                  │
┌─────────────────▼───────────────────────────┐
│              Data Layer                      │
│     PostgreSQL  │  Redis  │  S3             │
└─────────────────────────────────────────────┘
\`\`\`

### 🎨 Frontend Architecture
- **Framework:** React with functional components
- **State:** Zustand for global state
- **Routing:** React Router v6
- **Styling:** Tailwind CSS
- **Build:** Vite

### 🧠 Backend Architecture
- **Runtime:** Node.js 20 LTS
- **Framework:** Express.js
- **ORM:** Prisma
- **Validation:** Zod
- **Testing:** Vitest

---
*Generated by Circuit Flow*
`;
}

function generateAPISpec(name, prompt) {
    return `# API Specification
## ${name}

### Base URL
\`https://api.yourproject.com/v1\`

### Authentication
All endpoints require Bearer token authentication:
\`\`\`
Authorization: Bearer <token>
\`\`\`

### Endpoints

#### POST /auth/login
Authenticate user and receive tokens.

**Request:**
\`\`\`json
{
  "email": "user@example.com",
  "password": "securepassword"
}
\`\`\`

**Response:**
\`\`\`json
{
  "accessToken": "eyJhbG...",
  "refreshToken": "dGhpcy...",
  "user": {
    "id": "uuid",
    "email": "user@example.com"
  }
}
\`\`\`

#### GET /resources
List all resources for authenticated user.

**Query Parameters:**
- \`page\` (number): Page number (default: 1)
- \`limit\` (number): Items per page (default: 20)
- \`search\` (string): Search query

**Response:**
\`\`\`json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100
  }
}
\`\`\`

### Error Responses
\`\`\`json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input",
    "details": [...]
  }
}
\`\`\`

---
*Generated by Circuit Flow*
`;
}

function generateDeployment(name, prompt) {
    return `# Deployment Guide
## ${name}

### 🚀 Prerequisites
- Node.js 20+
- PostgreSQL 15+
- Redis 7+
- Docker (optional)

### 📦 Local Development

\`\`\`bash
# Clone repository
git clone https://github.com/yourorg/${name.toLowerCase().replace(/\s+/g, '-')}.git

# Install dependencies
npm install

# Set up environment
cp .env.example .env

# Run migrations
npm run db:migrate

# Start development server
npm run dev
\`\`\`

### 🐳 Docker Deployment

\`\`\`bash
# Build image
docker build -t ${name.toLowerCase().replace(/\s+/g, '-')} .

# Run container
docker run -p 3000:3000 --env-file .env ${name.toLowerCase().replace(/\s+/g, '-')}
\`\`\`

### ☁️ Cloud Deployment

#### Vercel (Frontend)
1. Connect GitHub repository
2. Configure build settings
3. Add environment variables
4. Deploy

#### Railway (Backend)
1. Create new project
2. Add PostgreSQL database
3. Set environment variables
4. Deploy from GitHub

### 🔧 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| DATABASE_URL | PostgreSQL connection string | Yes |
| JWT_SECRET | Secret for JWT signing | Yes |
| REDIS_URL | Redis connection string | Yes |
| NODE_ENV | Environment (development/production) | Yes |

---
*Generated by Circuit Flow*
`;
}
