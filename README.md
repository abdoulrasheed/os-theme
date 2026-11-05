# abdull.dev

Personal portfolio and writing. Plain HTML, CSS, and JavaScript, with no build step.

- `index.html`: introduction, selected work, writing, and contact
- `portfolio.css`: homepage typography, responsive layouts, and project animations
- `portfolio.js`: interactive portrait sampled from `portrait.jpg`, with ink and character textures
- `fonts/`: locally served Bodoni Moda and Chivo Mono, with their OFL licenses
- `about.html` and `projects.html`: profile and full project list
- `posts/`: original articles at their existing URLs
- `style.css`: article and profile page styles
- `index.xml`: RSS feed
- `resume.pdf`: résumé served at `/resume.pdf`

Preview with `python3 -m http.server 3100`. The portrait responds to pointer or touch movement and supports a texture toggle. It pauses offscreen and after settling, and respects reduced motion preferences. Without JavaScript the original photo is displayed and all content and links remain available.

To add a post, convert Markdown with `pandoc -f markdown -t html --wrap=none post.md`, wrap it in an existing post's shell, and link it from the homepage and `index.xml`.

Push to `main` to trigger the Vercel production deployment.

The old desktop version is preserved on `archive/os-theme`.
