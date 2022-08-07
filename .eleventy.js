const eleventySass = require("eleventy-sass");
const fs = require('fs');
const fsPromises = require('fs/promises');
const image = require("@11ty/eleventy-img");
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

const thumbnail = async (src, alt) => {
  const metadata = await image(src, {
    widths: [300],
    formats: ["jpeg"],
    urlPath: "/images/",
    outputDir: "./_site/images/"
  });

  const imageAttributes = {
    alt,
    sizes: "100vw",
    loading: "lazy",
    decoding: "async"
  };

  // You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
  return image.generateHTML(metadata, imageAttributes);
};

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("posts/*/*.{jpg,jpeg,png,svg}");

  eleventyConfig.addLayoutAlias("page", "layouts/page.njk");
  eleventyConfig.addLayoutAlias("post", "layouts/post.njk");

  eleventyConfig.addLiquidShortcode("thumbnail", thumbnail);

  eleventyConfig.addPlugin(eleventySass, {
    sass: {
      style: "compressed",
      sourceMap: false,
      loadPaths: ["node_modules"]
    }
  });
  eleventyConfig.addPlugin(typescriptPlugin);
};
