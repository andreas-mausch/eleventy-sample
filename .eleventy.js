const eleventySass = require("eleventy-sass")
const dates = require("./eleventy/dates")
const emoji = require("eleventy-plugin-emoji")
const imageShortcodes = require("./eleventy/images")
const linkPost = require("./eleventy/link-post")
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
  eleventyConfig.addFilter("carousel", imageShortcodes.carousel)

  eleventyConfig.addLiquidShortcode("image", imageShortcodes.imageShortcode)
  eleventyConfig.addLiquidShortcode("image-url", imageShortcodes.imageUrl)
  eleventyConfig.addLiquidShortcode("image-comparison", imageShortcodes.comparison)
  eleventyConfig.addLiquidShortcode("thumbnail", imageShortcodes.thumbnail)
  eleventyConfig.addLiquidShortcode("thumbnail-clickable", imageShortcodes.clickableThumbnail)
  eleventyConfig.addLiquidShortcode("carousel", imageShortcodes.carousel)
  eleventyConfig.addLiquidTag("link-post", linkPost)

  eleventyConfig.addPlugin(eleventySass, {
    sass: {
      style: "compressed",
      sourceMap: false,
      loadPaths: ["node_modules"]
    }
  })
  eleventyConfig.addPlugin(emoji)
  eleventyConfig.addPlugin(tableOfContents, {
    tags: ["h1", "h2", "h3", "h4", "h5"]
  })
  eleventyConfig.addPlugin(typescriptPlugin)
}
