# PAGP Summarization Race

This repository contains the code for the **PAGP Summarization Race** project, which demonstrates parallel document processing and entity extraction using a React frontend and a GPU-accelerated simulation.

## Project Structure

The project is organized into two main components:

- **`doc-templater-frontend/`**: The React-based frontend application.
  - Contains the Dashboard, Summarization Race visualization, and Benchmark tools.
  - Built with Vite and React.
  
- **`legal-templater/`**: Backend and data processing scripts.
  - Handles document analysis, template generation, and variable extraction logic.

## Key Features

1.  **Summarization Race**: A visual comparison of CPU (sequential) vs. GPU (parallel) document processing.
2.  **Detailed Metrics**: Real-time display of token count, words, and processing analysis.
3.  **Entity Extraction**: Automatically identifies and extracts entities like **Company Name** (e.g., ACME CORP) and **Contractor Name** (e.g., JOHN DOE) from documents.
4.  **GPU Benchmark**: Tools to benchmark system performance for AI tasks.

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- NPM

### Running the Frontend

1.  Navigate to the frontend directory:
    ```bash
    cd doc-templater-frontend
    ```
2.  Install dependencies (if not already installed):
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
4.  Open your browser at `http://localhost:5173/` (or the port shown in the terminal).

## Usage

- Go to the **GPU/PAGP LAB** tab to run the summarization race.
- Click **START COMPARE** to visualize the difference between CPU and GPU processing.
- View the **Variables** and **Artifact** tabs to see the extracted entities and generated documents.
