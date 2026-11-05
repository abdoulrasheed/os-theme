# abdull.dev

Personal portfolio and writing. Plain HTML, CSS, and a small JavaScript file, with no build step.

- `index.html`: portfolio, experience, projects, and writing
- `portfolio.css` and `portfolio.js`: homepage styles and interactions
- `about.html` and `projects.html`: retained profile and project pages
- `posts/`: original articles, served at their existing URLs
- `style.css`: article and profile page styles
- `index.xml`: RSS feed
- `resume.pdf`: current résumé served at `/resume.pdf`

Run `python3 -m http.server 3100` to preview. The skills selectors and experience disclosures use `portfolio.js`. Core content, article links, contact details, and the résumé remain accessible without JavaScript.

To add a post, convert Markdown with `pandoc -f markdown -t html --wrap=none post.md`, wrap it in the shell from an existing post, and add links on the homepage and in `index.xml`.

Push to `main` to trigger the existing Vercel production deployment.

The previous Next.js desktop version is preserved on `archive/os-theme`. The first redesign prototype is preserved locally on `archive/redesign-next`.
