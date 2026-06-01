# LogicLens — Code Analyzer

A full-featured static code analysis platform built with React and Vite. LogicLens analyzes source code metrics, provides AI-powered code assistance, manages analysis rules, organizes projects, and generates PDF reports with interactive charts.

---

## Features

- **Code Metrics Analysis** — Measures LOC, LLOC, SLOC, Cyclomatic Complexity, Maintainability Index, and comment ratios for uploaded JavaScript files
- **AI Code Assistant** — Chat with an Azure OpenAI-powered assistant about your code; supports JavaScript, Java, and C++
- **Speech Interface** — Voice input (speech-to-text) and spoken responses (text-to-speech) via Microsoft Azure Cognitive Services
- **Rule Management** — Create, edit, delete, and toggle custom analysis rules with search and filtering
- **Project Organization** — Organize code files into projects and nested folders
- **Data Visualization** — Bar and pie charts for all code metrics via Chart.js
- **PDF Reports** — Export analysis results, rule lists, and project summaries as branded PDFs
- **Analysis History** — View, update, and delete past code analysis records
- **Authentication** — JWT-based login/registration with protected routes
- **Dark Mode** — Persistent light/dark theme toggle

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + Vite 5 |
| UI | Bootstrap 5, React Bootstrap |
| Routing | React Router DOM v6 |
| Forms | Formik + Yup |
| Charts | Chart.js + react-chartjs-2 |
| PDF Export | jsPDF + jspdf-autotable |
| AI | Azure OpenAI |
| Speech | Microsoft Cognitive Services Speech SDK |
| Notifications | react-toastify |
| State | React Context API |

---

## Prerequisites

- Node.js 18+
- npm 9+
- A running backend API at `http://localhost:4000` (handles auth, analysis, rules, and projects)
- Azure OpenAI resource
- Azure Cognitive Services resource (Speech)

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/IT22056320/code-analyzer.git
cd code-analyzer
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
VITE_GITHUB_ACCESS_TOKEN=your_github_token_here
```

> **Important:** Azure OpenAI and Azure Speech keys must **not** be hardcoded in frontend source. Proxy all AI/speech calls through your backend to keep secrets server-side.

### 4. Start the development server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server with hot module replacement |
| `npm run build` | Create optimized production build in `dist/` |
| `npm run preview` | Locally preview the production build |
| `npm run lint` | Run ESLint on all source files |

---

## Project Structure

```
code-analyzer/
├── public/                 # Static assets
├── src/
│   ├── assets/             # Images (logo, login background)
│   ├── components/         # Shared UI (Navbar, Layout, Footer)
│   ├── context/            # React Context providers
│   │   ├── AuthContext.jsx     # Auth state + JWT management
│   │   ├── ThemeContext.jsx    # Light/dark mode
│   │   └── ToastContext.jsx    # Toast notifications
│   ├── pages/              # Route-level page components
│   │   ├── Home.jsx            # Code upload + metrics analysis
│   │   ├── CodeAnalyzer.jsx    # AI + speech assistant
│   │   ├── ManageRules.jsx     # Rule list, search, toggle
│   │   ├── AddRuleForm.jsx     # Create rule
│   │   ├── EditRuleForm.jsx    # Edit rule
│   │   ├── OutputAnalysis.jsx  # Rules report + pie chart
│   │   ├── ProjectManagement.jsx # Projects and folders
│   │   ├── AnalysisGraph.jsx   # Metric charts + PDF export
│   │   ├── HistoryPage.jsx     # Analysis history
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Main.jsx            # Landing / info page
│   │   ├── AboutUs.jsx
│   │   └── Resources.jsx
│   ├── App.jsx             # Root component + route definitions
│   └── main.jsx            # Vite entry point
├── index.html
├── vite.config.js
└── package.json
```

---

## Backend API

The frontend expects a REST API at `http://localhost:4000` with the following endpoints:

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/register` | Register a new user |
| POST | `/api/login` | Login and receive JWT |
| GET | `/api/me` | Get current user |
| GET | `/api/home` | Fetch analysis history |
| POST | `/api/home` | Submit code for analysis |
| PATCH | `/api/home/:id` | Update an analysis entry |
| DELETE | `/api/home/:id` | Delete an analysis entry |
| GET | `/api` | List rules (supports `?searchTerm=`) |
| POST | `/api` | Create a rule |
| PUT | `/api/:id` | Update a rule |
| DELETE | `/api/:id` | Delete a rule |
| PUT | `/api/toggleStatus/:id` | Toggle rule active/inactive |
| GET | `/api/projects` | List user projects |
| POST | `/api/projects` | Create a project |
| PUT | `/api/projects/:id` | Update a project |
| DELETE | `/api/projects/:id` | Delete a project |
| POST | `/api/folders` | Create a folder |
| PUT | `/api/folders/:id` | Update a folder |
| DELETE | `/api/folders/:id` | Delete a folder |

All authenticated endpoints require an `Authorization: Bearer <token>` header.

---

## Code Metrics Explained

| Metric | Description |
|---|---|
| LOC | Total lines of code including blanks and comments |
| LLOC | Logical lines — executable statements only |
| SLOC | Source lines — non-blank, non-comment lines |
| Cyclomatic Complexity | Number of independent paths through the code |
| Maintainability Index | 0–100 score; higher means easier to maintain |
| Comment % | Ratio of comment lines to total lines |

---

## Security Notes

- Never commit API keys or secrets to source control.
- All Azure and third-party credentials should be stored as environment variables on the **backend** and accessed via proxied API calls.
- JWT tokens are stored in `localStorage`; consider `httpOnly` cookies for higher-security deployments.

---

## License

This project is private and not licensed for public distribution.
