const eleventySass = require("eleventy-sass");
const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');
const swc = require('@swc/core');

const typescriptPlugin = (eleventyConfig, options = {}) => {
  eleventyConfig.addTemplateFormats("ts");
  eleventyConfig.addExtension("ts", {
    outputFileExtension: "js",
    compile: async (content, inputPath) => {
      const parsed = path.parse(inputPath);
      if (parsed.name.startsWith("_")) {
        return;
      }

      return async (data) => {
        const compiled = await swc.bundle({
          entry: {
            build: path.join(__dirname, inputPath)
          },
          output: {
            path: path.join(__dirname, "scripts"),
            name: parsed.base,
          },
          options: {
            jsc: {
              target: "es5",
              parser: {
                syntax: "typescript",
              },
            },
            env: {
              // path to package.json which includes browserslist field
              path: ".",
            },
          },
        })
          .then(output => swc.minify(output.build.code))
        return compiled.code
      }
    }
  });
};

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("posts/*/*.{jpg,jpeg,png,svg}");

  eleventyConfig.addLayoutAlias("page", "layouts/page.njk");
  eleventyConfig.addLayoutAlias("post", "layouts/post.njk");

  eleventyConfig.addPlugin(eleventySass);
  eleventyConfig.addPlugin(typescriptPlugin);
};
