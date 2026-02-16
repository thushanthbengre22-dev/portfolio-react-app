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

A sophisticated conversational agent built to demonstrate the integration of LLMs with structured external APIs.

### Key Features
* **Hybrid Knowledge Engine:** 
  * **API Mode:** Strictly uses the **football-data.org** API (Free Tier) to fetch real-time standings, matches, and scorers for top European leagues (Premier League, La Liga, Serie A, Bundesliga, Ligue 1, Champions League).
  * **Web Search Mode:** A toggleable feature that allows the agent to fallback to its internal knowledge base (simulating web search) when the API lacks data or for broader football questions (e.g., historical facts, player bios).

* **Intelligent Prompt Engineering:**
  * **Intent Recognition:** The system first uses Gemini to analyze the user's natural language query and translate it into a specific API endpoint (e.g., "How is Arsenal doing?" -> `/competitions/PL/standings`).
  * **Context-Aware Responses:** The agent maintains conversation history to understand follow-up questions.
  * **Adaptive Fallbacks:** If the API fails or returns no data, the agent intelligently suggests enabling "Web Search" or explains the limitations of the free API tier.

* **Multi-Model Resilience:**
  * The system is configured to try a hierarchy of Gemini models for maximum availability and performance:
    1. `gemini-2.5-flash` / `gemini-3-flash-preview` (Experimental/Preview)
    2. `gemini-2.0-flash` (Next-Gen)
    3. `gemini-1.5-flash` (Stable, Fast)
    4. `gemini-1.5-pro` (High Reasoning)

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
