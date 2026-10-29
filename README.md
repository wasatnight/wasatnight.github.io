# Ivan Solano Diaz — Portfolio

Static bilingual portfolio published at https://wasatnight.github.io/.

## Run locally

Open `index.html`, or serve this folder with a local web server, for example `python -m http.server 8080`. No build step or external runtime dependencies are required.

## Design and content

The full-screen original landscape portrait is paired with an editorial serif title, charcoal surfaces and cream/sand accents. The portrait file is unchanged; colour treatment, entrance animations and the camera drift are applied through CSS. Desktop scrolling adds parallax. The motion control and the system reduced-motion preference stop automatic animation.

Selected projects, in order: VoxTexto, FotoLista, Ordena, PDF de Bolsillo, SupportFlow AI, CiberPráctico, Grupo SI, Radiestesia Molecular Integral and TrackBet. Each project links to its website or public repository and lists its implemented technologies. TrackBet remains marked as in development.

## Main files

- `index.html`: content, project cards, experience, tools, credentials and contact.
- `styles.css` and `script.js`: base responsive layout, English/Spanish switching, menu, print résumé and copy-email controls.
- `cinematic.css`, `bellanova.css` and `cinematic.js`: editorial styling and portrait motion.
- `project-demos.js`: visible-card playback, pause controls and reduced-motion support.
- `assets/demos/`: local GIFs and static fallback images.
- `assets/certificates/`: original certificate PDFs and preview images.
- `assets/ivan-solano-mountains-original.jpg`: original landscape portrait.

## Project previews

VoxTexto uses the author's supplied GIF. PDF de Bolsillo uses the real demo GIF from its repository. Ordena, SupportFlow AI and TrackBet use animated sequences of the real screenshots in their repositories; the website sequences use captured views of the public sites. FotoLista uses its real interface screenshot. The generated sequences are presentations of screenshots, rather than continuous recordings of interaction.

Animated cards load as they enter the viewport, return to their static cover outside it and offer individual pause controls. Reduced-motion mode uses the static covers.

## Publish

GitHub Pages serves `main` from the repository root. Keep `.nojekyll`, `index.html`, all styles/scripts and the `assets/` folder together. A commit to `main` triggers the existing Pages deployment.
