const eleventySass = require("eleventy-sass")
const dates = require("./eleventy/dates")
const imageShortcodes = require("./eleventy/images")
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight")
const typescriptPlugin = require("./eleventy/typescript-esbuild")

module.exports = function (eleventyConfig) {
  eleventyConfig.addLayoutAlias("page", "layouts/page.njk")
  eleventyConfig.addLayoutAlias("post", "layouts/post.njk")

  eleventyConfig.addFilter("date", dates.date)
  eleventyConfig.addFilter("isoDate", dates.isoDate)
  eleventyConfig.addFilter("isoDateTime", dates.isoDateTime)

  eleventyConfig.addLiquidShortcode("image", imageShortcodes.imageShortcode)
  eleventyConfig.addLiquidShortcode("thumbnail", imageShortcodes.thumbnail)

  eleventyConfig.addPlugin(eleventySass, {
    sass: {
      style: "compressed",
      sourceMap: false,
      loadPaths: ["node_modules"]
    }
  })
  eleventyConfig.addPlugin(syntaxHighlight, {
    alwaysWrapLineHighlights: true
  })
  eleventyConfig.addPlugin(typescriptPlugin)
}
