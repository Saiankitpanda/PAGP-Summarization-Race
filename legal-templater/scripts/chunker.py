import pathlib
import sys


def chunk_text(input_path, output_dir, chunk_size=6000):
    src = pathlib.Path(input_path).read_text(encoding="utf-8")
    chunks = [src[i : i + chunk_size] for i in range(0, len(src), chunk_size)]

    outdir = pathlib.Path(output_dir)
    outdir.mkdir(parents=True, exist_ok=True)

    for i, ch in enumerate(chunks, 1):
        (outdir / f"chunk_{i:03d}.txt").write_text(ch, encoding="utf-8")

    print(f"Created {len(chunks)} chunks in {outdir}")


if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python chunker.py <input_file> <output_dir>")
        sys.exit(1)

    chunk_text(sys.argv[1], sys.argv[2])
