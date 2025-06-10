# Project Reach

This site provides a simple landing page and chat widget for the Reach
Collective. It is static HTML and CSS. To lint the markup, run the
scripts/setup.sh installer and then use `tidy` and `xmllint`.

## Development

1. Run `scripts/setup.sh` to install HTML linting tools.
2. Open `index.html` in your browser to preview or use `npx http-server`.


## Development & Linting
1. Install a local server (e.g., npm install -g serve).
2. Run serve . from the project root to preview at http://localhost:5000.
3. Lint HTML with tidy -q -e *.html.
4. Contribute via pull requests—run tidy and xmllint before submitting.
