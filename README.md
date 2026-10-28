# Naman Chandak | Trainer Portfolio

A personal portfolio website in a pixel Pokédex style, with a project search and filter, a Day/Night mode and an AI chatbot that answers questions about me and my work.

**Live website:** ADD_PORTFOLIO_LIVE_LINK
**GitHub:** https://github.com/Naman-Chandak

## About the project

I am Naman Chandak, a second-year BTech CSE student at JECRC University. This site is my portfolio: a title screen, a Trainer Card, my skills as "moves", my five projects as Pokédex entries, contact details and a chatbot. It is a Pokémon-inspired fan design with original pixel art and no official artwork.

## Sections

Home, About Me, Skills, Projects, Contact and AI Chatbot.

## Features

- **Project search and filter:** search by project name or technology (try `Python`, `Quiz` or `Book`) and narrow results with technology chips. Both work together. An empty state appears when nothing matches.
- **Day/Night mode:** a Game Boy green Day theme and a dark neon Night theme. The choice is remembered, and the first visit follows the device setting.
- **AI chatbot (Dex Assistant):** visitors type a question and get an answer based on the information in my portfolio. Example questions are one tap away. If a request fails, a clear error message and a "Try again" button appear.
- **Five project cards:** each with a title, description, technology chips, a GitHub link and, where deployed, a live link.
- **Responsive layout:** works on phones, tablets and desktops, with a hamburger menu on small screens.
- **Accessibility:** keyboard navigation, visible focus, skip link, screen-reader labels and reduced-motion support.
- **Typewriter intro, animated skill bars and a copy-email button.**

## Projects shown

| No. | Project | Technologies |
|---|---|---|
| 001 | [Python Programs Collection](https://github.com/Naman-Chandak/python-programs-collection) | Python |
| 002 | [Messy Python Code Improvement](https://github.com/Naman-Chandak/messy-python-code-improvement) | Python, AI-assisted |
| 003 | [Bug Fixing Using Cursor AI](https://github.com/Naman-Chandak/bug-fixing-cursor-ai) | Python, Cursor AI |
| 004 | [Interactive Quiz Application](https://github.com/Naman-Chandak/interactive-quiz-app) ([live](https://interactive-quiz-app-amber.vercel.app)) | HTML, CSS, JavaScript |
| 005 | [Book Reading List Application](https://github.com/Naman-Chandak/book-reading-list-app) ([live](https://book-reading-list-app-three.vercel.app)) | HTML, CSS, JavaScript |

## Technologies

- HTML, CSS and JavaScript (no frameworks)
- Vercel serverless function (Node.js) for the chatbot backend
- Groq API with the `llama-3.1-8b-instant` model (free tier)
- Git and GitHub, deployed on Vercel
- Fonts: Press Start 2P and VT323, both under the SIL Open Font License, stored in `assets/fonts`

## Project structure

```
index.html        page structure
style.css         theme, layout and responsive rules
script.js         sprites, search/filter, theme toggle, chatbot UI
api/chat.js       serverless function that calls the Groq API
assets/fonts/     pixel fonts and their licences
.env.example      names of the environment variables (no real keys)
```

## How the chatbot works

1. The chat box in `script.js` sends the recent conversation to `/api/chat`.
2. `api/chat.js` runs on Vercel. It adds my portfolio information as the system prompt, so answers stay grounded in real facts, and calls the Groq API.
3. The API key is stored as the Vercel environment variable `GROQ_API_KEY`. It is **not** in this repository and never reaches the browser.
4. The function validates and trims the input, applies a simple per-visitor limit, and returns clean errors if Groq is busy or unreachable.
5. The page shows the reply as plain text, so nothing a visitor or the model returns can run as code.

## Run it locally

The site itself needs no install. Download the folder and open `index.html` to see everything except the chatbot, which needs the serverless function.

To test the chatbot locally:

```bash
npm install -g vercel
vercel dev
```

Then add `GROQ_API_KEY` when prompted or in a local `.env` file (this file is ignored by Git).

## Deploy on Vercel

1. Push this folder to a GitHub repository.
2. On vercel.com choose **Add New, Project**, import the repository and click **Deploy** (Framework Preset: Other).
3. Open **Settings, Environment Variables**, add `GROQ_API_KEY` with a free key from console.groq.com, and save.
4. Go to **Deployments**, open the latest one, choose **Redeploy** so the key is picked up.
5. Open the live site and test the project links, the search, both themes, the mobile layout and the chatbot.

## Customising

- Projects and their live links: the `PROJECTS` list in `script.js`.
- What the chatbot knows: `SYSTEM_PROMPT` in `api/chat.js`. Update it whenever the portfolio changes.
- Model: set `GROQ_MODEL` in Vercel to switch models without editing code.

## Credits and disclaimer

Pixel art is original. Fonts are by their respective authors under the SIL Open Font License (see `assets/fonts`). This is a fan-made design. Pokémon is a trademark of Nintendo, Game Freak and The Pokémon Company, and this site is not affiliated with or endorsed by them.
