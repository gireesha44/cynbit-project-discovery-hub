# Cynbit Project Discovery Hub

A full-stack prototype built for **Cynbit Technologies' Full Stack Developer Intern Technical Assessment**.

The project improves Cynbit's initial client-discovery experience by turning a conventional inquiry into a **guided, structured project discovery flow**.

**DEMO LINK** : https://cynbit-project-discovery-hub.onrender.com

---

## 🚀 The Idea

Potential clients often understand the problem they want to solve but may not know:

- Which technical service they need
- What information to provide
- What the next step should be

The **Cynbit Project Discovery Hub** guides visitors through these decisions and converts their requirements into a structured project brief.

Instead of simply submitting a contact form, visitors receive an **instant recommendation based on their project requirements**.

---

## ✨ Features

- Guided 4-step project discovery flow
- Project category selection
- Business requirement collection
- Budget and timeline selection
- Personalized service recommendations
- Server-side input validation
- Structured inquiry submission
- Unique inquiry reference generation
- Responsive interface for desktop and mobile
- REST-style backend APIs

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML5, CSS3, JavaScript |
| Backend | Node.js |
| API | REST-style JSON endpoints |
| Storage | In-memory prototype store |
| Deployment | Render |
| Dependencies | Zero runtime dependencies |

The prototype intentionally uses a lightweight architecture to keep it **fast, easy to review, and simple to deploy**, while still demonstrating a complete frontend-to-backend workflow.

---

## ⚙️ How It Works

```text
User
  ↓
Guided Discovery Interface
  ↓
Project Requirements
  ↓
Recommendation API
  ↓
Cynbit Capability Mapping
  ↓
Personalized Project Blueprint
  ↓
Inquiry Submission
  ↓
Unique Reference ID
```

---

## 🔌 API Endpoints

### Health Check

```http
GET /api/health
```

Checks whether the backend service is running.

### Generate Recommendation

```http
POST /api/recommend
```

Validates the project requirements and returns relevant Cynbit capabilities along with a suggested project direction.

### Submit Inquiry

```http
POST /api/inquiries
```

Validates the inquiry information and generates a unique reference ID.

Example:

```text
CYN-A4F29B
```

---

## 💻 Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/gireesha44/cynbit-project-discovery-hub.git
```

### 2. Navigate to the project

```bash
cd cynbit-project-discovery-hub
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the application

```bash
npm start
```

Open:

```text
http://localhost:3000
```

Requires **Node.js 18+**.

---

## 📁 Project Structure

```text
cynbit-project-discovery-hub/
│
├── public/
│   ├── index.html
│   ├── styles.css
│   └── app.js
│
├── server.js
├── package.json
├── render.yaml
├── TECHNICAL_REPORT.md
├── README.md
└── .gitignore
```

---

## 🎯 Why This Improvement?

The goal was not to redesign Cynbit's existing website.

Instead, the prototype focuses on improving one specific part of the user journey: **project discovery and lead qualification**.

The proposed improvement can help:

- Reduce blank-form friction
- Collect better project context
- Qualify inquiries before the first call
- Help visitors understand relevant Cynbit capabilities
- Provide immediate value after entering requirements
- Create structured data for future CRM integration

---

## 🔮 Production Improvements

For a production implementation, the next steps would include:

- PostgreSQL or Supabase persistence
- CRM integration
- Email confirmation
- Rate limiting
- CAPTCHA / bot protection
- Analytics for funnel completion and drop-off
- Authentication for internal lead management
- Automated testing
- Monitoring and structured logging

---

## 📄 Technical Report

A detailed explanation of the problem, architecture, implementation decisions, security considerations, and future improvements is available in:

`TECHNICAL_REPORT.md`

---

## 👩‍💻 Author

**Gireesha Pentakota**

B.Tech Computer Science & Engineering  
VNR Vignana Jyothi Institute of Engineering & Technology

Built as part of the **Cynbit Technologies - Full Stack Developer Intern Technical Assessment (October 2026)**.
