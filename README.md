This is a sample 11ty project to see if it fits my needs.

# Features

- TypeScript (via [esbuild](https://github.com/evanw/esbuild))  
  I have started with [this](https://github.com/cbergen/11ty-nostrils),
  but wrote my own eleventy ["plugin"](eleventy/typescript-esbuild.js) instead of having multiple processes running in parallel
  like in the linked project.
- SCSS: mobile first, with separate large/print specifications (via [eleventy-sass](https://github.com/kentaroi/eleventy-sass))
- Thumbnails (via [eleventy-img](https://github.com/11ty/eleventy-img))
- Code Blocks syntax highlighting (via [markdown-it-prism](https://github.com/jGleitz/markdown-it-prism))
- Image Carousel (via [swiffy-slider](https://github.com/dynamicweb/swiffy-slider))
- Image Comparison Slider (via [img-comparison-slider](https://github.com/sneas/img-comparison-slider))
- Table of Contents (TOC, via [eleventy-plugin-toc](https://github.com/jdsteinbach/eleventy-plugin-toc))
- Numbering for headings, Hierarchy (based on [markdown-it-hierarchy](https://github.com/shytikov/markdown-it-hierarchy))
- Emoji
- Links:
  - Mark external links
  - Link to another blog posts
- Formula (via [katex](https://github.com/KaTeX/KaTeX))
- Checklist
- Footnotes
- Keyboard shortcuts, hotkeys, keystrokes
- Quotes with author (via [markdown-it-attribution](https://github.com/dweidner/markdown-it-attribution))

Most of these are pretty basic features which would be on my wishlist for a perfect static site generator.

I was shocked (once again) how fiddly it is to setup a project with just the normal, modern technologies.

There is one blog post for each feature to demonstrate it.

# Development

## Install dependencies

```
npm install
```

## Run local development server

```
npm run dev
```

## Production build

```
npm run build
```

## Linting

```
npm run lint
```

## Type checking (via tsc)

```
npm run check
```

## Pre-commit hook

Linting and type checking is also done by the npm package `pre-commit`.
It does this checks when a git commit is triggered.

You can bypass the checks by passing `--no-verify` to git commit.
See [here](https://github.com/observing/pre-commit).
