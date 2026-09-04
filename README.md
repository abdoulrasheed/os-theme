# abdull.dev

Personal site. Plain HTML and CSS, no build step, no framework.

- `index.html` — feed (article list)
- `about.html`
- `projects.html`
- `posts/` — articles
- `index.xml` — RSS feed
- `resume.pdf` — served at `/resume.pdf`

## Adding a post

1. Write the markdown, then: `pandoc -f markdown -t html --wrap=none post.md`
2. Wrap the output in the site shell (copy an existing file in `posts/` as the template)
3. Add the post to `index.html` and `index.xml`
4. Push

The previous version of this site (the Next.js "OS theme") is preserved on the
`archive/os-theme` branch.
