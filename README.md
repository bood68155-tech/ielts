# IELTS Master 🎧📖✍️🗣️

A free, interactive IELTS practice web application built with **HTML, Tailwind CSS and vanilla JavaScript** — no build step, no dependencies, runs entirely in the browser.

## Features

### 🔐 Accounts & progression
- **User authentication** — create an account or sign in (demo auth, stored in `localStorage`; do not reuse a real password)
- **Structured learning levels** — Beginner → Intermediate → Advanced
  - Earn XP by completing listening sections, reading passages, writing tasks, speaking parts and weekly exams
  - Higher levels unlock more content (e.g. Beginner unlocks Listening sections 1–2, Advanced unlocks all 4)
- **Learning path dashboard** — see your current level, XP progress, and exactly which content is unlocked

### 📅 Weekly Exam
- A fresh **15-question timed quiz every week** (questions are selected deterministically from a pool of 30, so they change week to week)
- 15-minute countdown timer with auto-submit
- Score history with a bar chart, best-score tracking, and XP rewards per correct answer

### 🎧 Listening
- Full mock test: 4 sections · 40 questions
- Audio is read aloud using the browser's built-in text-to-speech (Web Speech API), with a play/pause control and progress bar
- Transcript viewer for every section
- Mixed question types: multiple choice and gap-fill
- Instant scoring with per-question explanations

### 📖 Reading
- 3 academic passages · 40 questions
- Question types: Multiple Choice, True/False/Not Given, and gap-fill
- Per-passage scoring with explanations
- 60-minute exam timer (start/pause)

### ✍️ Writing
- Academic Task 1 (chart description, with a visual bar chart) and Task 2 (essay)
- Live word counter, draft autosave to localStorage, and a 60-minute timer
- Model answers and feedback on length

### 🗣️ Speaking
- Full test structure: Part 1 (interview), Part 2 (long turn with cue card), Part 3 (discussion)
- 1-minute preparation timer and 2-minute speaking timer for Part 2
- Model answers for every question

## Getting started

No installation required. Open `index.html` in any modern browser (Chrome or Edge recommended for the listening text-to-speech feature).

```bash
# or serve it locally, e.g.
python -m http.server 8000
# then open http://localhost:8000
```

## Project structure

```
ielts/
├── index.html        # Single-page app shell (all sections + auth screen)
├── css/
│   └── styles.css    # Custom styles on top of Tailwind
└── js/
    ├── data.js       # All test content + levels + weekly exam pool
    ├── auth.js       # Authentication, user profiles, XP & level gating
    ├── levels.js     # Learning path (levels) UI
    ├── exam.js       # Weekly exam module (timed quiz + history)
    └── app.js        # Application logic (navigation, timers, scoring, audio)
```

## Notes

- Progress, accounts and exam history are stored in your browser's `localStorage`.
- Authentication is demo-only and runs entirely client-side — it is not secure and should not be used with real passwords.
- This is an unofficial practice tool and is not affiliated with the official IELTS test partners.
