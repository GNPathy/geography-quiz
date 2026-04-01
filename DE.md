# 🌍 GeoVerse Explorer (v0.9) - Design & Engineering (DE) Architecture

## 1. Overview
GeoVerse Explorer is a lightweight, frontend-only Single Page Application (SPA) designed to be a highly scalable, privacy-first educational tool for kids. It utilizes a hybrid data approach, seamlessly blending exhaustively generated local JSON files with live API integrations.

## 2. Technology Stack
*   **Core Languages:** Vanilla HTML5, CSS3, and JavaScript (ES6+).
*   **Build Environment:** Node.js (strictly used as an offline static-data builder, not as a runtime server).
*   **Styling & Responsiveness:** Pure Vanilla CSS relying on modern variables (`:root`), Flexbox/CSS Grid, and Glassmorphism aesthetics. The styling utilizes modern `@media` rules allowing it to elegantly re-flow into a mobile-first app on phone browsers. No external CSS frameworks were used, keeping the packet size small.
*   **Data Persistence:** Browser `localStorage` (Privacy-first; no backend database or cloud syncing).

## 3. System Architecture & Modules

### A. The Hybrid Data Model
The application relies on three distinct branches of data querying depending on the user's mode:
1.  **Static Exhaustive Database (`data/questions.json`):** 
    *   Used for the "Specific Categories" mode.
    *   **Generation:** A custom Node script (`data/builder.js`) programmatically stitches together manually defined datasets (50 US States, 28 Indian States, major rivers/mountains) alongside data fetched dynamically from the *RestCountries API*. It normalizes it all into one highly optimized JSON file.
2.  **Live Global Trivia:** 
    *   Dynamically hits the **Open Trivia Database (OpenTDB) API** (`opentdb.com`) at runtime.
3.  **Live Flag Challenge:**
    *   Dynamically hits the **RestCountries API** (`restcountries.com`) at runtime to pull current flag PNGs and populations for difficulty scaling.

### B. State & View Management
Given the lightweight nature of the SPA, state is managed entirely in the global runtime environment of `index.html`. 
*   **Session Tracking:** Variables like `totalScore`, `qIndex`, and `totalQuestionsSeen` handle the live session.
*   **Pseudo-Routing:** View states (`welcome-screen`, `lobby`, `game-screen`, `post-round-screen`) are toggled exclusively via injected CSS `display` manipulation.
*   **Algorithm Integrity:** To avoid JavaScript pseudo-random engine biases in V8's native `.sort()`, question arrays and multiple-choice distractors are aggressively randomized using mathematical **Fisher-Yates Shuffle** algorithms.

### C. Educational "Context" Engine
Instead of binary Right/Wrong answers, the application intercepts the answer result and constructs a contextual learning panel. It leverages **Kiddle.co** (a kid-safe visual search engine) by programmatically encoding the correct answer's subject into a safe URL parameter to encourage the user to research the answer.

### D. Privacy & Security
The app does not require a backend runtime (like Express, Django, or a cloud DB). 
*   **No PII Exfiltration:** Player initials, analytics, and scores never leave the local environment.
*   **Local Storage:** The high score table (`geoGridHighScores`) relies 100% on native HTML5 Web Storage.
*   **Parental Transparency:** A strict disclaimer string is injected globally at the footer to ensure guardians have context regarding the external public APIs used in the global trivia game modes.

## 4. Deployment Strategy
Because the app fetches an external local file (`data/questions.json`), it requires a basic HTTP environment to pass modern browser CORS origin checks.
*   **Local:** Executed via `python -m http.server 8000` or the VS Code Live Server extension.
*   **Production:** Designed to be hosted elegantly via static-hosting edge networks like **GitHub Pages**.
