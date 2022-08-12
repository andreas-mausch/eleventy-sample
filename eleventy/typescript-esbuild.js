
const esbuild = require("esbuild")
const path = require("path")

const isProduction = () => process.env.ELEVENTY_ENV === "production"

module.exports = (eleventyConfig, _options = {}) => {
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
          entryPoints: [path.join(__dirname, "..", inputPath)],
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
