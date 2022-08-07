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

const thumbnailWidth = 300;

const imageMetadata = async (src) => await image(src, {
  widths: [null, thumbnailWidth],
  formats: ["jpeg"],
  urlPath: "/images/",
  outputDir: "./_site/images/",
  filenameFormat: function (hash, src, width, format, options) {
    const { name } = path.parse(src)
    return `${name}-${hash}-${width}.${format}`;
  }
});

async function thumbnail(src, alt) {
  const metadata = await imageMetadata(path.join(path.parse(this.page.inputPath).dir, src));

  const imgSrc = metadata.jpeg
    ?.filter(img => img.width <= thumbnailWidth)
    ?.sort((img1, img2) => img2.width - img1.width)
    .find(() => true)
    ?.url;
  return `<img src="${imgSrc}" alt="${alt}">`;
};

async function imageShortcode(src, alt, sizes = "(min-width: 30em) 50vw, 100vw") {
  const metadata = await imageMetadata(path.join(path.parse(this.page.inputPath).dir, src));

  const imageAttributes = {
    alt,
    sizes,
    loading: "lazy",
    decoding: "async",
  };

  return image.generateHTML(metadata, imageAttributes);
};

module.exports = function (eleventyConfig) {
  eleventyConfig.addLayoutAlias("page", "layouts/page.njk");
  eleventyConfig.addLayoutAlias("post", "layouts/post.njk");

  eleventyConfig.addLiquidShortcode("image", imageShortcode);
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
