# GeoVerse Explorer (v0.9) 🌍

GeoVerse Explorer (v0.9) is a dynamic, frontend-only geography quiz application designed for kids with varying ages. Players can input their initials, track running scores, and conquer geography topics across thousands of dynamic and static questions.

## Features
- **Initials & High Scores**: Players enter a 3-letter initial on start. Top scores are continuously saved to the browser's `localStorage`.
- **Hybrid Data Model**: 
  - **Specific Categories**: Dive into fine-grained topics like "Rivers in the USA" or "Languages of India" pulling directly from `data/questions.json`.
  - **Global Trivia**: Step out of the specific topics and get 5 random Geography questions fetched directly from the live Open Trivia Database API!
- **Difficulty Scaling**: Choose between *Novice*, *Intermediate*, and *Expert* from the lobby to seamlessly scale the difficulty of either Game Mode.
- **Running Score Persistence**: Rounds are 5 questions long, but players can choose to "Continue Playing" safely retaining their score until they click "Save Score & End".

## How to Play / Host
Because Version 2.0 dynamically loads specific category questions from `data/questions.json`, it **must be run on a web server** (the browser will block `fetch()` on a basic `file://` double-click for security reasons).

**Hosting Locally:**
If you have Python installed, simply open this folder in your terminal and run:
`python -m http.server 8000`
Then open `http://localhost:8000` in your web browser!

**Hosting on GitHub Pages (Recommended):**
1. Push this code to the `main` branch of your GitHub repository.
2. In your repo, go to **Settings > Pages**.
3. Set the source branch to `main`.
4. Your kids can play it instantly from the generated `https://[username].github.io/[repo-name]` link!

## Updating the Specific Categories
To add more local questions (like more State Nicknames or Rivers), simply open `data/questions.json` and add an object following this schema:
```json
{
  "q": "What is the longest river in the USA?",
  "a": "Missouri",
  "c": ["Missouri", "Mississippi", "Yukon", "Rio Grande"],
  "difficulty": "novice"
}
```
*Note: Ensure `c` contains both the correct answer and 3 incorrect options!*
