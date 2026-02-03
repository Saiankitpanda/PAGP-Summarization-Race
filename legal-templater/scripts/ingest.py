import sys
import pathlib
import os

def install_deps():
    # Helper to suggest deps if missing, though we assume they are installed via pip
    pass

def pdf_to_text(inp, out):
    try:
        import fitz
    except ImportError:
        print("Error: pymupdf not installed. Run: python -m pip install pymupdf")
        sys.exit(1)
        
    doc = fitz.open(inp)
    text = []
    for page in doc:
        text.append(page.get_text("text"))
    
    pathlib.Path(out).write_text("\n\n".join(text), encoding="utf-8")
    print(f"Wrote: {out}")

def docx_to_text(inp, out):
    try:
        from docx import Document
    except ImportError:
        print("Error: python-docx not installed. Run: python -m pip install python-docx")
        sys.exit(1)
        
    d = Document(inp)
    txt = "\n".join(p.text for p in d.paragraphs)
    pathlib.Path(out).write_text(txt, encoding="utf-8")
    print(f"Wrote: {out}")

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python ingest.py <input_file> <output_file>")
        sys.exit(1)
    
    inp = sys.argv[1]
    out = sys.argv[2]
    
    if inp.lower().endswith(".pdf"):
        pdf_to_text(inp, out)
    elif inp.lower().endswith(".docx"):
        docx_to_text(inp, out)
    else:
        print("Unsupported file type. Use .pdf or .docx")
        sys.exit(1)
