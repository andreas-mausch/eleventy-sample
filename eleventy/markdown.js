const markdownIt = require("markdown-it")
const markdownItAnchor = require("markdown-it-anchor")

const markdown = markdownIt({
  html: true,
}).use(markdownItAnchor)

markdown.renderer.rules.code_inline = (tokens, idx, { langPrefix = "" }) => {
  const token = tokens[idx]
  return `<code class="${langPrefix}">${token.content}</code>`
}

module.exports = markdown
