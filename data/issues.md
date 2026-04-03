# 🐛 Geography Quiz Issue Tracker

## Open Issues

### 1. "Category Zeroed Out" Error in World Neighbors
- **Reported:** 2026-04-01
- **Path:** Specific Categories -> World -> Neighbors
- **Symptom:** Clicking the button triggers an alert saying "Category zeroed out!".
- **Root Cause Identified:** In `data/questions.json`, the property `"Neighbors"` under the `"World"` object is currently an empty array (`[]`). The app correctly identifies that it has no questions and shows the alert.
- **Proposed Solution:** Populate `World.Neighbors` in `questions.json` with actual trivia questions, or temporarily hide/disable the button if the data isn't ready.

### 2. Add "Hint" System
- **Reported:** 2026-04-02
- **Description:** Implement a contextual, non-direct hint system. Max 2 hints per question.
- **Scoring:** Applying hints decreases the max score. *Clarification needed on exact scoring penalty per hint.*
- **Action Items:** Add a UI hint button, support fractional points in the engine, and figure out how to source the hints (pre-baked in `questions.json` vs API).

### 3. Fun Dynamic Backgrounds
- **Reported:** 2026-04-02
- **Description:** Use fun pictures related to the geography question as the background to make it more engaging for kids.
- **Action Items:** Ensure images are kid-safe. Decide whether images are pre-downloaded or dynamically fetched (e.g., Wikimedia API) based on the question topic.

## Fixed Issues
*(None yet)*
