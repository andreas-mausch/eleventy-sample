const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');
const swc = require('@swc/core');

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("posts/*/*.{jpg,jpeg,png,svg}");

  eleventyConfig.addLayoutAlias("page", "layouts/page.njk");
  eleventyConfig.addLayoutAlias("post", "layouts/post.njk");

  eleventyConfig.addPlugin((eleventyConfig, options = {}) => {
    eleventyConfig.addWatchTarget("./scripts/**/*.ts");

    eleventyConfig.on('eleventy.before', async () => {
      if (!fs.existsSync(path.join(eleventyConfig.dir.output, "scripts"))) {
        await fsPromises.mkdir(path.join(eleventyConfig.dir.output, "scripts"), { recursive: true });
      }

      const outputFile = path.join(eleventyConfig.dir.output, "scripts", "index.js")
      console.log("Writing", outputFile, "from ./scripts/index.ts");
      const output = await swc.transformFile("./scripts/index.ts")
        .then(js => swc.minify(js));
      await fsPromises.writeFile(path.join(eleventyConfig.dir.output, "scripts", "index.js"), output.code);
    });
  });
};
