/* eslint-env node */
/* eslint-disable @typescript-eslint/no-var-requires */

const esbuild = require("esbuild")
const eleventySass = require("eleventy-sass")
const image = require("@11ty/eleventy-img")
const path = require("path")

const isProduction = () => process.env.ELEVENTY_ENV === "production"
const thumbnailWidth = 300

const typescriptPlugin = (eleventyConfig, _options = {}) => {
  eleventyConfig.addTemplateFormats("ts")
  eleventyConfig.addExtension("ts", {
    outputFileExtension: "js",
    compile: async (_content, inputPath) => {
      const parsed = path.parse(inputPath)
      if (parsed.name.startsWith("_")) {
        return
      }
      if (inputPath.endsWith(".d.ts")) {
        return
      }

      return async _data => {
        const compiled = await esbuild.build({
          entryPoints: [path.join(__dirname, inputPath)],
          bundle: true,
          minify: isProduction(),
          sourcemap: !isProduction(),
          legalComments: "none",
          write: false
        })
        return compiled.outputFiles[0].text
      }
    }
  })
}

const imageMetadata = async src => await image(src, {
  widths: [null, thumbnailWidth],
  formats: ["jpeg"],
  urlPath: "/images/",
  outputDir: "./_site/images/",
  filenameFormat: function (hash, src, width, format, _options) {
    const { name } = path.parse(src)
    return `${name}-${hash}-${width}.${format}`
  }
})

async function thumbnail(src, alt) {
  const metadata = await imageMetadata(path.join(path.parse(this.page.inputPath).dir, src))

  const imgSrc = metadata.jpeg
    ?.filter(img => img.width <= thumbnailWidth)
    ?.sort((img1, img2) => img2.width - img1.width)
    .find(() => true)
    ?.url
  return `<img src="${imgSrc}" alt="${alt}">`
}

async function imageShortcode(src, alt, sizes = "(min-width: 30em) 50vw, 100vw") {
  const metadata = await imageMetadata(path.join(path.parse(this.page.inputPath).dir, src))

  const imageAttributes = {
    alt,
    sizes,
    loading: "lazy",
    decoding: "async",
  }

  return image.generateHTML(metadata, imageAttributes)
}

module.exports = function (eleventyConfig) {
  eleventyConfig.addLayoutAlias("page", "layouts/page.njk")
  eleventyConfig.addLayoutAlias("post", "layouts/post.njk")

  eleventyConfig.addLiquidShortcode("image", imageShortcode)
  eleventyConfig.addLiquidShortcode("thumbnail", thumbnail)

  eleventyConfig.addPlugin(eleventySass, {
    sass: {
      style: "compressed",
      sourceMap: false,
      loadPaths: ["node_modules"]
    }
  })
  eleventyConfig.addPlugin(typescriptPlugin)
}
