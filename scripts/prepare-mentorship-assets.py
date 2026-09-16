"""Build local mentorship previews from the supplied decks.

Usage: python scripts/prepare-mentorship-assets.py <source-directory>
Requires pypdfium2, pypdf and Pillow (available in the Codex document runtime).
Original decks are copied unchanged; all previews derive from those files.
"""

import json
from pathlib import Path
import shutil
import sys
import zipfile

from PIL import Image
from pypdf import PdfReader
import pypdfium2 as pdfium

ROOT = Path(__file__).resolve().parents[1]
SOURCES = {
    "centsible": "Centsible Presentation.pdf",
    "waste-classifier": "Waste Classifier App.pdf",
    "ecopulse": "Nelson's SoDA Project Presentation .pdf",
    "culture-bites": "CULTURE BITES.pdf",
    "clarityread": "ClarityRead Presentation - SoDA Project (Mentee_ Xander Morris, Mentor_ Mr. Patel).pdf",
    "aegischeck": "AegisCheck - SoDA Mentorship Presentation.pdf",
    "led-controller": "LED-strip-controller - Millie Kim.pptx",
}


def main(source_directory):
    manifest = {}
    for slug, filename in SOURCES.items():
        source = source_directory / filename
        output = ROOT / "public" / "mentorship" / slug
        output.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(source, output / f"presentation{source.suffix}")
        if source.suffix == ".pdf":
            reader = PdfReader(source)
            document = pdfium.PdfDocument(source)
            slides = []
            for index, page in enumerate(document):
                bitmap = page.render(scale=1600 / page.get_width())
                image = bitmap.to_pil().convert("RGB")
                image.save(output / f"slide-{index + 1}.webp", quality=82)
                if index == 0:
                    image.thumbnail((800, 600))
                    image.save(output / "cover.webp", quality=85)
                text = reader.pages[index].extract_text().replace("\x00", " ")
                slides.append({"image": f"/mentorship/{slug}/slide-{index + 1}.webp", "text": text.strip()})
                bitmap.close()
                page.close()
            document.close()
            manifest[slug] = slides
        else:
            with zipfile.ZipFile(source) as archive:
                with archive.open("docProps/thumbnail.jpeg") as thumbnail:
                    image = Image.open(thumbnail).convert("RGB")
                    image.save(output / "cover.webp", quality=85)
                (output / "demo.mp4").write_bytes(archive.read("ppt/media/media1.mp4"))
        print(f"Prepared {slug}")
    data = ROOT / "src" / "data"
    data.mkdir(exist_ok=True)
    (data / "mentorship-slides.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")


if __name__ == "__main__":
    main(Path(sys.argv[1]))
