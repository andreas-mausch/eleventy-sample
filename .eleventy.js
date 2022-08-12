const eleventySass = require("eleventy-sass")
const imageShortcodes = require("./eleventy/images")
const typescriptPlugin = require("./eleventy/typescript-esbuild")

module.exports = function (eleventyConfig) {
  eleventyConfig.addLayoutAlias("page", "layouts/page.njk")
  eleventyConfig.addLayoutAlias("post", "layouts/post.njk")

  eleventyConfig.addLiquidShortcode("image", imageShortcodes.imageShortcode)
  eleventyConfig.addLiquidShortcode("thumbnail", imageShortcodes.thumbnail)

  eleventyConfig.addPlugin(eleventySass, {
    sass: {
      style: "compressed",
      sourceMap: false,
      loadPaths: ["node_modules"]
    }
  })
  eleventyConfig.addPlugin(typescriptPlugin)
}
