# CyberSec Academy

An interactive cybersecurity education website built entirely in HTML, CSS, and JavaScript. No server, no dependencies, no real vulnerabilities — just open the files in a browser and learn.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![HTML](https://img.shields.io/badge/built%20with-HTML%20%2F%20CSS%20%2F%20JS-orange.svg)
![No Server](https://img.shields.io/badge/server-none-green.svg)

---

## Overview

CyberSec Academy is a fully client-side "Tell Me / Show Me" learning platform covering five core cybersecurity topics, plus a Capture The Flag (CTF) challenge room. It is designed for students, awareness training, or anyone wanting to understand common attack vectors in a safe, simulated environment.

All interactions are simulated. There are no real vulnerabilities, no server-side code, and no data is sent anywhere.

---

## Modules

| # | Topic | Key Concepts |
|---|-------|-------------|
| 01 | Phishing Attacks | Email red flags, URL analysis, social deception |
| 02 | Password Security | Brute force, dictionary attacks, password strength |
| 03 | SQL Injection | Auth bypass, query manipulation, parameterised queries |
| 04 | Cross-Site Scripting (XSS) | innerHTML vs textContent, stored XSS, sanitisation |
| 05 | Social Engineering | Pretexting, baiting, psychological triggers, decision scenarios |
| 🚩 | CTF Challenge Room | Five-puzzle Capture The Flag applying all modules |

Each module follows a **Tell Me → Show Me** structure:

- **Tell Me** — clear explanation of the attack, how it works, and why it matters
- **Show Me** — interactive simulation, live demos, and a knowledge check quiz

---

## Getting Started

No installation or build step required.

1. Download or clone the repository
2. Open `index.html` in any modern browser
3. Navigate between modules using the top navigation bar

```bash
git clone https://github.com/yourusername/cybersec-academy.git
cd cybersec-academy
open index.html
```

All files must remain in the same directory for navigation links to work.

---

## File Structure

```
cybersec-academy/
├── index.html                  # Home page / module selector
├── 01-phishing.html            # Module 01: Phishing Attacks
├── 02-passwords.html           # Module 02: Password Security
├── 03-sql-injection.html       # Module 03: SQL Injection
├── 04-xss.html                 # Module 04: Cross-Site Scripting
├── 05-social-engineering.html  # Module 05: Social Engineering
├── 06-challenge.html           # CTF Challenge Room
├── README.md
└── LICENSE
```

---

## Features

- Fully client-side — no server, no backend, no tracking
- Dark terminal aesthetic with responsive layout
- Interactive simulations for each attack type
- Live password strength analyser with crack-time estimation
- Simulated SQL injection login form with real-time query display
- XSS comment section demo with safe/unsafe output comparison
- Social engineering scenario walkthroughs with decision game
- Five-puzzle CTF challenge room with progress tracking
- Knowledge check quizzes on every module

---

## CTF Challenge Answers

The challenge room is self-contained and solvable without external tools. If you are using this for teaching and need the solutions, each puzzle answer can be derived directly from the information shown on screen. A hint button is available for each challenge.

---

## Intended Use

- Cybersecurity awareness training
- Classroom or workshop demonstrations
- Self-study and personal learning
- Proof of concept / portfolio project

---

## Tech Stack

- HTML5
- CSS3 (custom properties, grid, flexbox)
- Vanilla JavaScript (no frameworks, no dependencies)
- Google Fonts (Share Tech Mono, Syne) — loaded via CDN

---

## Contributing

Pull requests are welcome. If you want to add a new module, fix a bug, or improve the content, feel free to open an issue or submit a PR.

---

## License

MIT — see [LICENSE](LICENSE) for details.
