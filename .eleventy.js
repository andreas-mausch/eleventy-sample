const autoprefixer = require("autoprefixer")
const dates = require("./eleventy/dates")
const directoryOutputPlugin = require("@11ty/eleventy-plugin-directory-output")
const eleventySass = require("eleventy-sass")
const emoji = require("eleventy-plugin-emoji")
const files = require("./eleventy/files")
const imageShortcodes = require("./eleventy/images")
const katex = require("katex")
const linkPost = require("./eleventy/link-post")
const markdownIt = require("./eleventy/markdown")
const postcss = require("postcss")
const postThumbnail = require("./eleventy/post-thumbnail")
const qrCode = require("./eleventy/qr-code")
const rss = require("@11ty/eleventy-plugin-rss")
const tableOfContents = require("eleventy-plugin-nesting-toc")
const typescriptPlugin = require("./eleventy/typescript-esbuild")
const fs = require("fs")

const showDrafts = process.env.ELEVENTY_ENV === "development"

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("favicon.svg")
  eleventyConfig.addPassthroughCopy("images")
  eleventyConfig.addPassthroughCopy({ "node_modules/katex/dist/fonts": "styles/fonts" })
  // Copy all non-processed files from the posts directories
  eleventyConfig.addPassthroughCopy("posts", {
    // Use this hack until https://github.com/11ty/eleventy/issues/1496 is fixed
    // Ideally, we would filter for all template formats which have been added via addTemplateFormats()
    // See also: https://github.com/11ty/eleventy/issues/1483
    filter: path => {
      return !path.endsWith(".md")
        && !path.endsWith(".json")
        && !path.endsWith(".ts")
        && !path.endsWith(".html")
    }
  })

  eleventyConfig.addLayoutAlias("page", "layouts/page.njk")
  eleventyConfig.addLayoutAlias("post", "layouts/post.njk")

  eleventyConfig.setLibrary("md", markdownIt)

  eleventyConfig.addCollection("posts", collections =>
    collections.getFilteredByTag("post")
      .filter(post => showDrafts || !post.data.draft))

  eleventyConfig.addFilter("relativeFile", imageShortcodes.relativeFileFilter)
  eleventyConfig.addFilter("date", dates.date)
  eleventyConfig.addFilter("isoDate", dates.isoDate)
  eleventyConfig.addFilter("isoDateTime", dates.isoDateTime)
  eleventyConfig.addFilter("carousel", imageShortcodes.carousel)
  eleventyConfig.addFilter("glob", files.glob)
  eleventyConfig.addFilter("katex", text => katex.renderToString(text, { throwOnError: false }))
  eleventyConfig.addFilter("fileBase64", function (filename) { return fs.readFileSync(imageShortcodes.relativeFile(filename, this.page), {encoding: "base64"}) })
  eleventyConfig.addAsyncShortcode("qr-code", qrCode)

  eleventyConfig.addLiquidShortcode("image", imageShortcodes.imageShortcode)
  eleventyConfig.addLiquidShortcode("image-url", imageShortcodes.imageUrl)
  eleventyConfig.addLiquidShortcode("image-comparison", imageShortcodes.comparison)
  eleventyConfig.addLiquidShortcode("thumbnail", imageShortcodes.thumbnail)
  eleventyConfig.addLiquidShortcode("thumbnail-clickable", imageShortcodes.clickableThumbnail)
  eleventyConfig.addLiquidShortcode("carousel", imageShortcodes.carousel)
  eleventyConfig.addLiquidShortcode("video", imageShortcodes.videoShortcode)
  eleventyConfig.addLiquidTag("link-post", linkPost)

  eleventyConfig.addNunjucksShortcode("postThumbnail", postThumbnail)

  eleventyConfig.setQuietMode(true)

  eleventyConfig.addPlugin(directoryOutputPlugin, {
    columns: {
      filesize: true,
      benchmark: true
    },
    warningFileSize: 50 * 1000
  })
  eleventyConfig.addPlugin(eleventySass, {
    sass: {
      style: "compressed",
      sourceMap: false,
      loadPaths: ["node_modules"]
    },
    postcss: postcss([autoprefixer])
  })
  eleventyConfig.addPlugin(emoji)
  eleventyConfig.addPlugin(tableOfContents, {
    tags: ["h1", "h2", "h3", "h4", "h5"]
  })
  eleventyConfig.addPlugin(rss)
  eleventyConfig.addPlugin(typescriptPlugin)
}
