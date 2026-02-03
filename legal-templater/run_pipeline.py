import os
import sys
import subprocess
import json
import shutil
from pathlib import Path

# Setup paths
BASE_DIR = Path(__file__).parent.absolute()
SCRIPTS_DIR = BASE_DIR / "scripts"
INPUT_DIR = BASE_DIR / "input"
WORK_DIR = BASE_DIR / "work"
CHUNKS_DIR = BASE_DIR / "chunks"
OUTPUTS_DIR = BASE_DIR / "outputs"


def run_command(command):
    print(f"Running: {command}")
    try:
        subprocess.check_call(command, shell=True, cwd=BASE_DIR)
    except subprocess.CalledProcessError as e:
        print(f"Error running command: {e}")
        sys.exit(1)


def ensure_dirs():
    for d in [INPUT_DIR, WORK_DIR, CHUNKS_DIR, OUTPUTS_DIR]:
        d.mkdir(parents=True, exist_ok=True)


def step_1_gen_sample():
    print("--- Step 1: Generating Sample ---")
    # Using the python executable of the current environment (virtualenv)
    python_exe = sys.executable
    script_path = SCRIPTS_DIR / "gen_sample.py"
    run_command(f"{python_exe} {script_path}")


def step_2_ingest():
    print("--- Step 2: Ingesting Data ---")
    python_exe = sys.executable
    script_path = SCRIPTS_DIR / "ingest.py"
    input_file = INPUT_DIR / "sample.docx"
    output_file = WORK_DIR / "sample.txt"
    run_command(f"{python_exe} {script_path} {input_file} {output_file}")


def step_3_chunk():
    print("--- Step 3: Chunking Text ---")
    python_exe = sys.executable
    script_path = SCRIPTS_DIR / "chunker.py"
    input_file = WORK_DIR / "sample.txt"
    run_command(f"{python_exe} {script_path} {input_file} {CHUNKS_DIR}")


def step_4_mock_llm():
    print("--- Step 4: Mocking LLM Processing ---")
    # Simulate extraction -> merge -> verify

    variables = [
        {
            "key": "agreement_date",
            "label": "Agreement Date",
            "description": "The date the agreement is entered into.",
            "example": "2024-01-29",
            "required": True,
            "dtype": "date",
            "regex": "\\d{4}-\\d{2}-\\d{2}",
        },
        {
            "key": "company_name",
            "label": "Company Name",
            "description": "The full legal name of the company.",
            "example": "ACME CORP",
            "required": True,
            "dtype": "string",
        },
        {
            "key": "contractor_name",
            "label": "Contractor Name",
            "description": "The full legal name of the contractor.",
            "example": "JOHN DOE",
            "required": True,
            "dtype": "string",
        },
    ]

    template_content = """---
template_id: temp_001
title: Service Agreement
File_description: Standard service agreement template
jurisdiction: unknown
doc_type: agreement
variables:
- key: agreement_date
  label: Agreement Date
  description: The date the agreement is entered into.
  example: 2024-01-29
  required: true
  dtype: date
  regex: \\d{4}-\\d{2}-\\d{2}
- key: company_name
  label: Company Name
  description: The full legal name of the company.
  example: ACME CORP
  required: true
  dtype: string
- key: contractor_name
  label: Contractor Name
  description: The full legal name of the contractor.
  example: JOHN DOE
  required: true
  dtype: string
similarity_tags: ["service", "agreement", "contractor"]
---

SERVICE AGREEMENT
This AGREEMENT is made on {{agreement_date}}.
BETWEEN: {{company_name}} (hereinafter "Company") AND {{contractor_name}} (hereinafter "Contractor").
... [Template content truncated for brevity] ...
Article 1
Details regarding Article 1.
"""

    questions = [
        {
            "variable_key": "agreement_date",
            "question": "What is the date of the agreement?",
        },
        {
            "variable_key": "company_name",
            "question": "What is the name of the Company?",
        },
        {
            "variable_key": "contractor_name",
            "question": "What is the name of the Contractor?",
        },
    ]

    verdict = {
        "pass": True,
        "issues": [],
        "improved_questions": [],
        "suggested_similarity_tags": [],
    }

    # Write outputs
    (OUTPUTS_DIR / "variables.json").write_text(json.dumps(variables, indent=2))
    (OUTPUTS_DIR / "template.md").write_text(template_content)
    (OUTPUTS_DIR / "questions.json").write_text(json.dumps(questions, indent=2))
    (OUTPUTS_DIR / "verdict.json").write_text(json.dumps(verdict, indent=2))

    print(f"Generated mock outputs in {OUTPUTS_DIR}")


def main():
    print("Starting Project Run Pipeline...")
    ensure_dirs()
    step_1_gen_sample()
    step_2_ingest()
    step_3_chunk()
    step_4_mock_llm()
    print("Pipeline completed successfully.")


if __name__ == "__main__":
    main()
