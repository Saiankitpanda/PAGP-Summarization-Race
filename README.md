# 🚀 PAGP Summarization Race & Document Engine

> **A High-Performance Parallel Processing & Legal Templating Demonstration**

![Project Status](https://img.shields.io/badge/status-active-success.svg)
![Tech Stack](https://img.shields.io/badge/stack-React%20%7C%20Vite%20%7C%20Python-blue)
![License](https://img.shields.io/badge/license-MIT-green)

Welcome to the **PAGP (Parallel Accelerated GPU Processing) Summarization Race**, a cutting-edge demonstration of how parallel computing architectures can vastly outperform traditional sequential CPU processing for complex text analysis tasks. This project integrates a sleek, futuristic React frontend with a robust document processing pipeline.

## 🌟 Key Features

### 1. The Summarization Race (CPU vs. GPU)
Witness a real-time visualization of processing power:
-   **CPU Mode**: Simulates sequential processing (single-threaded). Watch as it painstakingly processes tokens one by one.
-   **GPU Mode**: Simulates massive parallelism (512+ CUDA cores). Chunks are vectorized and processed simultaneously.
-   **Visual Metrics**: Live progress bars, speedup comparisons (typically **6x - 10x faster**), and detailed execution logs.

### 2. Intelligent Entity Extraction
The system doesn't just summarize; it *understands*. It automatically scans documents to identify and extract critical variables:
-   🏢 **Company Name**: Identifies corporate entities (e.g., *ACME CORP*).
-   👤 **Contractor Name**: Identifies individuals/consultants (e.g., *JOHN DOE*).
-   **UI Integration**: Extracted entities are dynamically highlighted in the dashboard and injected into templates.

### 3. Legal Templater Engine
A robust backend structure for document lifecycle management:
-   **Ingestion**: Takes raw text input.
-   **Chunking**: Splits documents into manageable vectors for processing.
-   **Templating**: Reconstructs documents into structured artifacts (contracts, agreements) using extracted variables.

---

## 🏗️ Architecture

The project is structured into two main powerhouses:

### 📁 `doc-templater-frontend`
The User Interface. Built with **React 18** and **Vite**, featuring:
-   **Dashboard.jsx**: The command center. Handles state, visualizations, and the race simulation logic.
-   **Futuristic UI**: Glassmorphism effects, neon accents, and terminal-style logs for an immersive "Iron Kernel" experience.

### 📁 `legal-templater`
The Logic Core. Contains the Python-based data processing scripts:
-   **`run_pipeline.py`**: The master script orchestrating the flow.
-   **`chunks/`**: Storage for processed document vectors.
-   **`prompts/`**: LLM system prompts for specific legal tasks.
-   **`outputs/`**: Final generated artifacts (`variables.json`, `template.md`).

---

## ⚡ Getting Started

### Prerequisites
-   **Node.js**: v18.0.0 or higher
-   **NPM**: v9.0.0 or higher
-   **Python**: v3.8+ (for backend scripts)

### 🛠️ Installation

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/Saiankitpanda/PAGP-Summarization-Race.git
    cd PAGP-Summarization-Race
    ```

2.  **Setup Frontend**
    ```bash
    cd doc-templater-frontend
    npm install
    ```

3.  **Run the Application**
    ```bash
    npm run dev
    ```
    The application will launch at `http://localhost:5173/` (or similar).

---

## 🎮 Usage Guide

### Phase 1: Deployment & Ingestion
Navigate to the **1. DEPLOY DOC** tab.
-   Click **INITIALIZE UPLOAD** to load the sample legal document into memory.
-   *System*: Simulates reading textual data from `legal-templater/input`.

### Phase 2: The Benchmark Lab
Switch to **4. GPU/PAGP LAB**.
-   **Simulation**: Click **START COMPARE**.
-   **Observe**: Watch the CPU and GPU progress bars race.
-   **Analyze**: Review the technical breakdown of "Sequential vs Parallel" execution.
-   **Result**: See the generated summary and the calculated speedup factor.

### Phase 3: Variable Verification
Check **5. VARIABLES**.
-   The system attempts to auto-extract entities.
-   *Manual Override*: You can input/correct specific values like "ACME CORP" or "JOHN DOE" if needed.

### Phase 4: Final Artifact
Go to **6. ARTIFACT**.
-   View the final **Service Agreement**.
-   Verify that your variables (*ACME CORP*, *JOHN DOE*) have been correctly injected into the standardized template.

---

## 🔧 Technical Details

-   **Frontend Framework**: React + Vite
-   **Styling**: CSS Modules with a custom dark/neon theme.
-   **State Management**: React `useState` / `useEffect` for real-time race simulation.
-   **Simulation Logic**: Uses `setTimeout` with varied delays to mathematically model the time difference between `O(n)` (Linear/CPU) and `O(n/k)` (Parallel/GPU) complexity.

---

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements, bug fixes, or new features (like *Quantum Processing Mode* 😉).

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

*Built with 💻 and ☕ by the PAGP Team.*
