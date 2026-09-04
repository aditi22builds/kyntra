# KYNTRA

> **Tagline:** *Technology that understands.*  
> **Secondary Positioning:** *We don't just translate signs. We help people be understood.*

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-Open_KYNTRA-3B82F6?style=for-the-badge)](https://aditi22builds.github.io/kyntra/)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/aditi22builds/kyntra)
[![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-Active-emerald?style=for-the-badge&logo=github)](https://aditi22builds.github.io/kyntra/)

---

## 🌐 1-Click Live App Links

- **🚀 Live Web App (GitHub Pages):** **[https://aditi22builds.github.io/kyntra/](https://aditi22builds.github.io/kyntra/)**
- **▲ 1-Click Vercel Deployment:** Click the **Deploy with Vercel** button above or import repository `aditi22builds/kyntra` on [Vercel](https://vercel.com/new) to get a custom `https://kyntra.vercel.app` URL.

---

## 1. Overview & Problem

People who communicate through Indian Sign Language (ISL) face acute communication barriers when interacting with people who do not know ISL—especially in emergency and healthcare settings where time, precision, and privacy are critical.

In life-threatening situations (falls, cardiac events, trauma, acute distress), Deaf users often have to resort to writing on scraps of paper, relying on family members, or waiting anxiously for an interpreter. Simple direct translators often produce fragmented text (e.g. *"My wife fell"*), which lacks the critical medical context clinicians need to act safely.

---

## 2. The Solution: Translation → Understanding → Action

KYNTRA goes beyond word-by-word translation:

```
ISL / Speech / Text
        ↓
COMMUNICATION UNDERSTANDING
        ↓
CONTEXT EXTRACTION
        ↓
CONFIDENCE CHECK ("Know when you don't know")
        ↓
USER CONFIRMATION (1-Tap verification)
        ↓
STRUCTURED EMERGENCY COMMUNICATION CARD
        ↓
HUMAN INTERPRETER ESCALATION IF NEEDED
```

---

## 3. Core Product Principles

### 1. Confidence-Aware AI
KYNTRA **never** fabricates certainty or guesses in critical moments:
- **High Confidence (>85%):** Displays interpretation and requests 1-tap confirmation.
- **Medium Confidence (50–85%):** Identifies ambiguities and prompts the user with clear clarification chips (`YES` / `NO` / `EDIT`).
- **Low Confidence (<50%):** Enforces a safety halt: *"Not confident enough to interpret safely"* → routes directly to manual text input or live certified human interpreter relay.

### 2. No Medical Diagnosis
KYNTRA strictly structures and communicates user-reported symptoms, injuries, and historical allergies. It **never diagnoses medical conditions** or provides medical advice.

### 3. AI + Human Synergy
KYNTRA is not built to replace human interpreters. It automates supported routine emergency queries and instantly escalates complex, ambiguous, or low-confidence cases to a human interpreter with a pre-compiled context handover card.

---

## 4. MVP Features

- **High-Stress Emergency Mode:** Clean, large-button layout designed to be operated under physical or psychological stress with no login friction.
- **Live Camera Viewport & HUD:** Real-time webcam stream with signing space bounding frame and 42 3D landmark tracking overlay (`GestureVisualizer`).
- **Controlled Prototype Recognition Engine (`ISLRecognitionService`):** Controlled vocabulary and scenario runner for predictable, reliable pitch demonstrations.
- **Structured Emergency Communication Card:** Dynamic clinical summary (Person, Incident, Consciousness, Symptoms, Injuries, Allergies, Known Conditions, Immediate Request) with 1-click **Show to Doctor** (Fullscreen Clinical Flashcard) and **Play Aloud** (Text-to-Speech).
- **Two-Way Hearing Bridge:** Web Speech API integration allowing hearing doctors to speak into their microphone and display giant high-contrast captions for the ISL user.
- **Human Interpreter Video Relay Escalation:** Live simulated video connection with certified ISLRTC interpreters and instant context card handover.
- **Institutional Accessibility Dashboard (`/dashboard`):** Hospital ER triage management console with live session logs, filterable audit trails, and KPI metrics.
- **Accessibility & Custom Themes:** Dark Mode, High-Contrast Yellow-on-Black (WCAG AAA), and Clinical Light mode with 3 font scaling levels.
- **Privacy-First Zero-Storage:** Volatile in-memory processing only; no video is recorded; 1-click **Clear Session** data wipe.

---

## 5. Technology Stack

- **Framework:** React 18 + TypeScript + Vite
- **Styling:** Tailwind CSS + Custom High-Contrast Accessibility Tokens
- **Icons:** Lucide React
- **Audio & Speech:** Web Speech API (SpeechRecognition & SpeechSynthesis)
- **Video:** WebRTC MediaDevices API with simulated 3D landmark overlays
- **Architecture:** Modular Service Layer (`ISLRecognitionService`, `ContextExtractionService`, `ConfidenceService`, `SpeechService`, `InterpreterService`, `StorageService`)

---

## 6. Local Setup Instructions

```bash
# 1. Clone the repository
git clone https://github.com/aditi22builds/kyntra.git
cd kyntra

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev

# 4. Open in browser
# http://localhost:3000
```

---

## 7. 2-Minute Pitch Demo Script

1. **Launch:** Click **START EMERGENCY MODE** or **★ 2-MIN LIVE PITCH DEMO**.
2. **Step 1 (ISL Input):** User signs into the camera. System displays: *"Processing communication..."*
3. **Step 2 (AI Understanding):** Interprets: *"My wife fell and hit her head."*
4. **Step 3 (Confidence Evaluation):** Displays **High Confidence (94%)**.
5. **Step 4 (User Confirmation):** 1-tap confirmation verifies intent.
6. **Step 5 (Context Clarification):** AI asks *"Is she conscious?"* → User taps **NO**. AI asks *"Is she having difficulty breathing?"* → User taps **YES**.
7. **Step 6 (Emergency Card):** Generates structured Emergency Communication Card with verified consciousness, fall incident, and head impact.
8. **Step 7 (Two-Way Doctor Exchange):** Doctor taps **SPEAK** and asks: *"Does she have any known allergies?"* Spoken audio renders as large readable text. User responds: *"Penicillin."* Card updates: `ALLERGY: Penicillin (✓ Confirmed)`.
9. **Step 8 (Low-Confidence Safety & Human Escalation):** Evaluator tests low-confidence scenario. System halts and user clicks **GET HUMAN HELP** to connect with a certified live ISL interpreter with the pre-compiled card passed over.
10. **Conclusion:** *"We don't just translate signs. We help people be understood."*

---

## 8. Safety, Privacy & Limitations

> **DISCLAIMER:**  
> KYNTRA is an assistive accessibility communication prototype. It does not diagnose medical conditions, provide clinical advice, or guarantee automated emergency dispatch. The current MVP uses controlled prototype recognition and guided demo scenarios to validate the confidence-aware communication model.

---

## 9. Strategic Roadmap

- **Phase 1 (Current):** Controlled prototype, Emergency card generation, Confidence engine, Doctor speech-to-text, Interpreter escalation.
- **Phase 2:** Real-time on-device 3D landmark CV models & vocabulary expansion to 500+ clinical signs.
- **Phase 3:** Two-way ISL 3D sign avatar synthesis.
- **Phase 4:** Quantized WebAssembly / ONNX runtime for 100% offline emergency operation.
- **Phase 5:** Formal ISLRTC certified interpreter network integration.
- **Phase 6:** Tertiary hospital ER and emergency department clinical trials.
- **Phase 7:** Civic infrastructure rollout (Police, Railways, Airports, Public Desks).
- **Phase 8:** Pan-Asian & Global sign languages (ASL, BSL, Auslan).

---

## 10. Business Model

- **B2B2C Architecture:**
  - **Consumer Layer:** Free, basic mobile emergency access for Deaf and non-speaking individuals.
  - **Institutional Layer (B2B):** Subscription and deployment licenses for Hospitals, EMS fleets, Police departments, Railways, and Public Desks covering certified interpreter bandwidth, EHR integration, accessibility analytics, and SLA support.

---

© 2026 KYNTRA Assistive Technologies. Built for accessibility, dignity, and life-critical communication.