const eleventySass = require("eleventy-sass")
const dates = require("./eleventy/dates")
const imageShortcodes = require("./eleventy/images")
const markdownIt = require("./eleventy/markdown")
const tableOfContents = require("eleventy-plugin-toc")
const typescriptPlugin = require("./eleventy/typescript-esbuild")

module.exports = function (eleventyConfig) {
  eleventyConfig.addLayoutAlias("page", "layouts/page.njk")
  eleventyConfig.addLayoutAlias("post", "layouts/post.njk")

  eleventyConfig.setLibrary("md", markdownIt)

  eleventyConfig.addFilter("date", dates.date)
  eleventyConfig.addFilter("isoDate", dates.isoDate)
  eleventyConfig.addFilter("isoDateTime", dates.isoDateTime)

  eleventyConfig.addLiquidShortcode("image", imageShortcodes.imageShortcode)
  eleventyConfig.addLiquidShortcode("imageUrl", imageShortcodes.imageUrl)
  eleventyConfig.addLiquidShortcode("thumbnail", imageShortcodes.thumbnail)
  eleventyConfig.addLiquidShortcode("clickableThumbnail", imageShortcodes.clickableThumbnail)
  eleventyConfig.addLiquidShortcode("carousel", imageShortcodes.carousel)

  eleventyConfig.addPlugin(eleventySass, {
    sass: {
      style: "compressed",
      sourceMap: false,
      loadPaths: ["node_modules"]
    }
  })
  eleventyConfig.addPlugin(tableOfContents, {
    tags: ["h1", "h2", "h3", "h4", "h5"]
  })
  eleventyConfig.addPlugin(typescriptPlugin)
}
