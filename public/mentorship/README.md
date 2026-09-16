# Mentorship showcase assets

The seven original presentation files are copied unchanged from the files supplied for this update. Project metadata and original external links live in `src/data/mentorshipProjects.ts`.

| Local folder     | Supplied presentation                                                                  | Preview                                                          |
| ---------------- | -------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| centsible        | Centsible Presentation.pdf                                                             | 10 slides                                                        |
| waste-classifier | Waste Classifier App.pdf                                                               | 11 slides                                                        |
| ecopulse         | Nelson's SoDA Project Presentation .pdf                                                | 13 slides                                                        |
| culture-bites    | CULTURE BITES.pdf                                                                      | 16 slides                                                        |
| clarityread      | ClarityRead Presentation - SoDA Project (Mentee* Xander Morris, Mentor* Mr. Patel).pdf | 8 slides                                                         |
| aegischeck       | AegisCheck - SoDA Mentorship Presentation.pdf                                          | 10 slides                                                        |
| led-controller   | LED-strip-controller - Millie Kim.pptx                                                 | Original cover and embedded demo video; full PowerPoint download |

Six Google Slides page titles were checked against the supplied PDFs. Nelson’s PDF identifies the project as EcoPulse. The LED Drive link returned 401 without authentication, so its original URL is retained alongside local assets. The existing career pathway Canva link returned 403 to automated verification and has no supplied source file. It remains an external presentation with an explicit fallback, rather than an unverified iframe.

PDF previews are WebP images rendered at 1600 pixels wide, with smaller covers. The accompanying slide text supports reading without the images. PDF links, animations, and media are not interactive in image previews; the original presentations and unchanged downloads remain available. The LED video is loaded only after the visitor chooses to play it.

To regenerate assets, install `pypdfium2`, `pypdf`, and `Pillow` in a Python environment and run from the repository root:

```sh
python scripts/prepare-mentorship-assets.py /path/to/source-decks
pnpm exec prettier --write src/data/mentorship-slides.json
```

This is an optional asset preparation step. Running or building the website requires no new dependencies or access to the source directory.
