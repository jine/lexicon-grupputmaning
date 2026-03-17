# AGENTS.md – AI Agent Rules (Next.js + Gitflow)

**Project:** Blank-slate Next.js (App Router, TypeScript, Tailwind – to be decided in planning)  
**Workflow:** Strict Gitflow  
**Goal:** Zero collisions between humans & agents. Every agent must stay on its own isolated branch.

---

## 1. Branch Discipline – NON-NEGOTIABLE (Collision Prevention)

Agents **MUST** enforce these rules at the start of **every single task/session**:

### 1.1 Always check current branch first

```bash
git branch --show-current
```

If the output is not one of:
- `feature/*`
- `fix/*`
- `hotfix/*`
- `release/*`

→ **STOP.** Do not read/write any code.

### 1.2 If you are on dev, main, or any protected branch

Immediately create/switch to a proper branch:

```bash
git checkout -b feature/AGENT-{ticket-or-task-id}-{kebab-description}
# Example: feature/AGENT-42-add-auth-page
```

Use `AGENT-` prefix so humans instantly know an AI is working on it.

**Never** commit, push, or create PRs from dev/main.

---

## 2. Rebase-from-dev Protocol (Always up-to-date)

Before any code changes, agents MUST run the full rebase sequence:

```bash
git fetch origin
git rebase origin/dev          # or git pull --rebase origin dev
```

If conflicts appear:
- Agent must describe the conflicting files and the exact conflict.
- Ask human (or another agent) for resolution instructions.
- Never auto-commit conflicting rebase.

After successful rebase → run `npm run build` and `npm test` (once tests exist) before starting work.

---

## 3. Agent Git Skill Set (Required Capabilities)

Every agent must be able to use these commands cleanly:

| Command | Purpose |
|---------|---------|
| `git status`, `git diff`, `git branch -a` | Inspect state |
| `git checkout -b`, `git switch` | Branch management |
| `git fetch origin`, `git pull --rebase` | Sync with remote |
| `git rebase origin/dev` + conflict handling | Keep history clean |
| `git stash` / `git stash pop` | Temporary saves |
| `git commit` | Conventional Commits (see below) |
| `git push -u origin HEAD` | Push new branch |
| `git log --oneline -10` | Recent history |

---

## 4. Commit & PR Rules

### 4.1 Commit messages must follow Conventional Commits:

```
feat: add login page
fix: resolve hydration error on mobile
chore: update dependencies
```

### 4.2 After task is complete:

1. Push the feature/fix branch.
2. Output a ready-to-copy PR description (title + body + screenshots if applicable).
3. Suggest merging into `dev` via GitHub PR (never auto-merge).

---

## 5. Next.js Project-Specific Rules (Blank Slate)

- Use **App Router** (`app/` directory) – decided in planning.
- All code in **TypeScript** (`strict: true`).
- **Styling:** Tailwind + shadcn/ui (to be confirmed).
- **Folder structure** must follow:
  ```
  app/
  components/
  lib/
  hooks/
  ```
- Every new file must be created only after confirming we are on the correct feature branch.

---

## 6. Safety & Collaboration Rules

- Never delete or rename files outside your branch.
- If you see changes from another agent/human on the same feature, immediately rebase and ask for clarification.

### End of Session Summary

At the end of every session, agent must print:

```
=== AGENT SESSION SUMMARY ===
Branch: feature/AGENT-42-...
Rebased from dev: YES
Commits made: X
PR ready: [link]
```
