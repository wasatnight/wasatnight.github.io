# Ivan Solano Diaz — Portfolio

Editorial-tech portfolio built with plain HTML, CSS and JavaScript. It works without a build step or external dependencies.

## Open locally

Double-click `index.html`, or serve the folder with any local web server. For example, from this directory:

```powershell
python -m http.server 8080
```

Then open `http://localhost:8080`.

## Publish on GitHub Pages

This package is ready for the user-site repository `wasatnight.github.io`.

1. Create a public repository named exactly `wasatnight.github.io` (or open it if it already exists).
2. Upload **the contents of this folder** to the repository root. `index.html` must be beside `styles.css`, `script.js` and the `assets/` folder, not inside another folder.
3. Commit the files to the `main` branch.
4. Open **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**, then select `main` and `/(root)`, and save.
5. Open `https://wasatnight.github.io`. GitHub may take a few minutes to publish the first version.

The included `.nojekyll` file tells GitHub Pages to serve this plain HTML/CSS/JavaScript site directly; no build command or dependency installation is required.

## Main files

- `index.html` — content and structure
- `styles.css` — responsive layout, visuals and motion
- `script.js` — EN/ES selector, mobile menu, scroll behavior and reveal animations
- `assets/ivan-solano.jpg` — original temporary portrait used in About
- `assets/ivan-solano-cutout.png` — transparent portrait for the hero collage
- `assets/paper.svg` — subtle paper texture
- `assets/certificates/` — original certificate PDFs and preview images; the PDFs can be viewed or downloaded from the Education & credentials section

The visual direction follows the supplied reference: cream paper, serif headlines, violet accents, a portrait collage and three compact featured-project cards. The same treatment continues through the full portfolio.

Grupo SI, Radiestesia and TrackBet list their implemented technologies. TrackBet does not list Tauri, which is planned rather than implemented. Navigation arrow glyphs are hidden on phone-sized screens and touch-only devices, while the descriptive text links remain available.

The “Résumé” button opens the browser print dialog with a dedicated clean layout. Choose “Save as PDF” to export it in the currently selected language.

Experience includes a visual timeline, capability labels and links to selected client projects. The stack is presented as a responsive mosaic with more emphasis on Backend and AI. The contact card includes a copy-email button with bilingual feedback and a manual-selection fallback when clipboard access is unavailable.

## Portrait asset

The transparent hero asset was prepared using the built-in image tool with the prompt: “Remove only the background around the person; keep the original face, pose, cap, reflective jacket, tattoos, watch and violet lighting; preserve photographic grain; export a transparent upper-body cutout.” The original photo remains included.

## Contact links

Contact includes `ivvsdd12@gmail.com`, the GitHub profile and Instagram `@ivaansdd`. CiberPráctico links to `https://ciberpractico.com`. TrackBet links to `https://github.com/wasatnight/trackbet-desktop` and remains marked as in development. The freelance experience highlights both software and web development in English and Spanish.
