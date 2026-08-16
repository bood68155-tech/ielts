# IELTS Master 🎧📖✍️🗣️

A free, interactive IELTS practice web application built with **HTML, Tailwind CSS and vanilla JavaScript** — no build step, no dependencies, runs entirely in the browser.

## Features

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

### General
- Dashboard with live score tracking (persisted in localStorage)
- Fully responsive (mobile menu included)
- Tailwind CSS via CDN + a small custom stylesheet

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
├── index.html        # Single-page app shell (all sections)
├── css/
│   └── styles.css    # Custom styles on top of Tailwind
└── js/
    ├── data.js       # All test content (listening, reading, writing, speaking)
    └── app.js        # Application logic (navigation, timers, scoring, audio)
```

## Notes

- Progress (scores, writing drafts) is stored in your browser's `localStorage`.
- This is an unofficial practice tool and is not affiliated with the official IELTS test partners.
