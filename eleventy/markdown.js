const markdownIt = require("markdown-it")
const markdownItAnchor = require("markdown-it-anchor")
const externalLinks = require("markdown-it-external-links")
const prism = require("markdown-it-prism")
const hierarchy = require("./markdown-it-hierarchy")

const markdown = markdownIt({
  html: true
}).use(hierarchy)
  .use(externalLinks)
  .use(markdownItAnchor)
  .use(prism, { defaultLanguage: "plain" })

// Unfortunately, inline code blocks are not processed by default, so we need this.
// Compare to https://github.com/11ty/eleventy-plugin-syntaxhighlight/issues/38#issuecomment-1022305948
markdown.renderer.rules.code_inline = (tokens, idx, { langPrefix = "" }) => {
  const token = tokens[idx]
  return `<code class="${langPrefix}">${token.content}</code>`
}

module.exports = markdown
