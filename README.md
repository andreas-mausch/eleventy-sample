This is a sample 11ty project to see if it fits my needs.

# Technology decisions

- SCSS Support
  There is a very good Eleventy plugin: [https://github.com/kentaroi/eleventy-sass](https://github.com/kentaroi/eleventy-sass)
- TypeScript Support
  Way more difficult. I found [this](https://github.com/cbergen/11ty-nostrils) helpful, but I have adjusted it to call swc programmically.
  See the "plugin" in [.eleventy.js](.eleventy.js).
  Update: I replaced swc by esbuild. tsc is still used for type checking.
  It automatically works with file changes (watch), no need to run two or three processes in parallel like in the linked project.

I was shocked (once again) how fiddly it is to setup a project with just the normal, modern technologies.

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
npm run build:production
```

## Linting

```
npm run lint
```

## Type checking (via tsc)

```
npm run check
```
