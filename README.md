# 🤖 AI-Native Portfolio
### Built with [v0 by Vercel](https://v0.dev) & Next.js

This portfolio represents a shift in modern web development: 
**Generative UI**. Instead of writing boilerplate code from scratch, I collaborated with **v0** to architect a high-fidelity interface, then refined the logic using the Next.js App Router.

---

## ⚡ The Workflow
This project was developed using a rapid "Prompt-to-Production" cycle:
1. **Design:** Natural language prompting in **v0.dev** to generate the core UI.
2. **Refinement:** Iterative component styling using Tailwind CSS and **shadcn/ui**.
3. **Engineering:** Integration of local assets and logic refinement in **IntelliJ IDEA**.
4. **Deployment:** Hosted on **Vercel** with a custom domain and automated CI/CD.

---

## 🛠️ Tech Stack

* **UI Generation:** [v0.dev](https://v0.dev)
* **Framework:** [Next.js](https://nextjs.org/) (App Router)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Components:** [shadcn/ui](https://ui.shadcn.com/)
* **AI Integration:** Google Gemini API
* **Data Source:** football-data.org API
* **Package Manager:** `pnpm`
* **Deployment:** [Vercel](https://vercel.com)

---

## ⚽ Football AI Assistant

An autonomous, multi-agent sports intelligence platform. This system transcends traditional RAG (Retrieval-Augmented Generation) 
by implementing an autonomous decision-making layer that navigates between structured statistical schemas and unstructured live-web intelligence.

### 🔄 System Architecture
The assistant uses a decoupled agent strategy to ensure the UI remains snappy while the logic remains deep. This flow-state demonstrates how the **Coordinator** and **Suggestion** agents interact:

```mermaid
graph TD
    A[User Input] --> B{Coordinator Agent}
    B -->|Structured Stats| C[football-data.org API]
    B -->|News/Injuries/Rumors| D[Tavily Web Search]
    C --> E[Detailed Tactical Response]
    D --> E
    E --> F[Client-Side Hydration]
    F --> G[Background Suggestion Agent]
    G -->|Analyze Response| H[Generate Follow-up Question]
    H --> I[Update Ghost Text Placeholder]
    I --> J[Wait for TAB Key / One-Tap Pill]

    style B fill:#064e3b,stroke:#059669,stroke-width:2px,color:#fff
    style H fill:#064e3b,stroke:#059669,stroke-width:2px,color:#fff
    style C fill:#1e293b,stroke:#475569,color:#fff
    style D fill:#1e293b,stroke:#475569,color:#fff
```

### 🧠 Core Performance Heuristics

* **Autonomous Tool Orchestration:** Implements dynamic tool selection logic. The agent evaluates the query's **temporal sensitivity**—routing historical or competition-specific queries to a structured API, while diverting rumor, injury, or tactical shift inquiries to a real-time web-crawling layer.

* **Predictive UX & Contextual Memory:** * **Vectorized Follow-ups:** Instead of basic "Who is next?" prompts, the Suggestion Agent utilizes the previous response's context to generate advanced inquiries (e.g., analyzing xG overperformance or defensive transition vulnerabilities).
   * **Heuristic Autocomplete:** A **"Ghost Text"** implementation utilizing the `append` pattern from the Vercel AI SDK, allowing for zero-friction navigation through complex tactical data.
  
* **Deterministic Persona Engineering:** Utilizes a highly disciplined system prompt architecture to enforce clinical, analytical output directly from the model inference. This eliminates conversational noise and ensures the agent consistently maintains a high-density, 
professional tactical tone without requiring post-inference filtering.

* **Multi-Model Resilience & Fallback:** Configured with a model hierarchy (**Gemini 2.0 Flash → 1.5 Pro**) to ensure high availability and sophisticated reasoning even during peak API latency.

---

### 📊 Technical Implementation Highlights

* **Logic Routing:** Built using the Vercel AI SDK's `streamText` with `maxSteps: 5` to allow for multi-stage tool calls and iterative reasoning loops.
* **State Management:** Intelligent syncing of local UI state (Ghost Text) with the AI SDK’s message history for seamless **"Tab-to-Send"** functionality and predictive placeholder updates.

---

## 🔍 Job Scout — AI Job Search Agent (Micro-Frontend)

A full-stack AI-powered job search agent deployed as a micro-frontend at `bengredev.com/ai-lab/job-search-agent`. It aggregates job listings, scores them with AI, and delivers personalized digests via email — both on-demand and on a daily automated schedule.

### 🏗️ Architecture

Standalone Next.js app integrated into the parent domain via Next.js rewrites, with Vercel environment-based `basePath` configuration.

```mermaid
graph TD
    A[User Input: roles, locations, skills] --> B[Next.js API Route]
    B --> C[JSearch API - parallel fetch via Promise.all]
    C --> D[Deduplicate & Sanitize]
    D --> E{Claude Haiku - AI Scoring}
    E --> F[Score & Analyze Jobs]
    F --> G[Streaming NDJSON Response]
    G --> H[Real-time UI Updates]
    F --> I[Resend Email Delivery]
    J[Vercel Cron Job] --> B

    style E fill:#064e3b,stroke:#059669,stroke-width:2px,color:#fff
    style B fill:#1e293b,stroke:#475569,color:#fff
    style J fill:#1e293b,stroke:#475569,color:#fff
```

### ⚙️ Key Technical Highlights

* **Agentic Pipeline:** Multi-step loop using the Anthropic Claude API (claude-haiku) — fetch → deduplicate → analyze → score → deliver. Streaming responses via the Anthropic SDK's streaming interface.
* **Backend:** Next.js 15 App Router API routes with streaming NDJSON responses. JSearch API integration with `Promise.all` for parallel fetching. Automated email delivery via Resend with custom HTML templates.
* **Scheduled Automation:** Vercel Cron Jobs for daily digest delivery.
* **Security:** CORS enforcement via Next.js middleware, IP and email-based rate limiting with Upstash Redis (`@upstash/ratelimit`), input validation and request sanitization.
* **Frontend:** Dark-mode UI with React, TypeScript, and Tailwind CSS. Real-time status updates via streaming fetch with a `ReadableStream` reader. Tag-based input components for dynamic configuration.
* **Infrastructure:** Upstash Redis for serverless-compatible persistent state.

---

## ✨ Features

* **Responsive Design:** Fully optimized for mobile, tablet, and desktop.
* **Clean URLs:** Modern routing with and without the `#` hash, optimized for SEO.
* **Performance:** High Core Web Vitals scores via Next.js Image and font optimization.
* **Accessible UI:** Built with Radix UI primitives via shadcn for full keyboard/screen-reader support.

---

## 🚀 Local Development

Since this project uses **pnpm**, you can get it running locally on your Mac in seconds:

1. **Clone the repo:**
   ```bash
   git clone [https://github.com/thushanthbengre22-dev/portfolio-react-app.git](https://github.com/thushanthbengre22-dev/portfolio-react-app.git)
   
2. **Install dependencies:**
    ```bash
    pnpm install

3. **Set up Environment Variables:**
    Create a `.env.local` file in the root directory and add your API keys:
    ```env
    GOOGLE_API_KEY=your_gemini_api_key
    FOOTBALL_DATA_API_KEY=your_football_data_org_api_key
    ```

4. **Start the development server:**
    ```bash
    pnpm dev

5. **View the site:**

    Open [http://localhost:3000](http://localhost:3000) in your browser.
---

### 📬 Connect with Me

* **Portfolio:** [bengredev.com](https://bengredev.com)
* **LinkedIn:** [Thushanth Bengre](https://www.linkedin.com/in/thushanth-devananda-bengre/)
* **GitHub:** [@thushanthbengre22-dev](https://github.com/thushanthbengre22-dev)
