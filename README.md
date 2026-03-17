# 🎯 Interview Flashcard Master

An interactive, gamified flashcard application designed to help developers master technical interview questions through active recall and repetitive learning.

## 🚀 Overview

Interview Flashcard Master transforms the tedious process of interview preparation into an engaging game. Challenge yourself across various categories, track your progress, and level up your technical skills.

## ✨ Features

-   **🎮 Gamified Learning:** Earn points, unlock streaks, and level up as you master new concepts.
-   **📁 Categorized Decks:** Focused study sessions for Frontend, Backend, System Design, Behavioral, and more.
-   **🧠 Active Recall:** Flip-card mechanic to test your knowledge before seeing the answer.
-   **📊 Progress Tracking:** Visualized stats showing your mastery over time.
-   **🌙 Dark Mode Support:** Comfortable late-night study sessions.
-   **📱 Responsive Design:** Study on the go with a mobile-optimized interface.

## 🛠️ Tech Stack

-   **Framework:** [Next.js 15+](https://nextjs.org/) (App Router)
-   **Language:** [TypeScript](https://www.typescriptlang.org/)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
-   **Components:** [shadcn/ui](https://ui.shadcn.com/)
-   **State Management:** React useState (stock)
-   **Animations:** [Framer Motion](https://www.framer.com/motion/)

## 🏁 Getting Started

### Prerequisites

-   Node.js 18.x or later
-   npm, pnpm, or yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/interview-flashcard-app.git
    cd interview-flashcard-app
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

```text
src/
├── app/            # Next.js App Router (pages and layouts)
├── components/     # Reusable UI components
├── hooks/          # Custom React hooks
├── lib/            # Utility functions and shared logic
├── types/          # TypeScript definitions
└── data/           # Flashcard content and static assets
```

## 🤝 Contributing

We follow a strict **Gitflow** workflow. Please ensure you read our [AGENTS.md](./AGENTS.md) for detailed rules on branching and commits.

### Branching Strategy
-   `master`: Production-ready code.
-   `dev`: Integration branch for features.
-   `feature/*`: New features or enhancements.
-   `fix/*`: Bug fixes.

### Conventional Commits
We use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/):
-   `feat:` A new feature
-   `fix:` A bug fix
-   `docs:` Documentation changes
-   `style:` Changes that do not affect the meaning of the code
-   `refactor:` A code change that neither fixes a bug nor adds a feature
-   `chore:` Updating build tasks, package manager configs, etc.

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

Built with ❤️ for the developer community.
