const fs = require('fs');
const fsPromises = require('fs/promises');
const swc = require('@swc/core');

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("posts/*/*.{jpg,jpeg,png,svg}");

  eleventyConfig.addLayoutAlias("page", "layouts/page.njk");
  eleventyConfig.addLayoutAlias("post", "layouts/post.njk");

  eleventyConfig.addPlugin((eleventyConfig, options = {}) => {
    eleventyConfig.addWatchTarget("scripts/**/*.ts");

    eleventyConfig.on('eleventy.before', async () => {
      if (!fs.existsSync("_site/scripts")) {
        await fsPromises.mkdir("_site/scripts", { recursive: true });
      }

      // TODO: Don't hardcord "_site" directory. Get it from eleventy instead.
      console.log("Writing ", "_site/scripts/index.js");
      const output = await swc.transformFile("scripts/index.ts")
        .then(js => swc.minify(js));
      await fsPromises.writeFile("_site/scripts/index.js", output.code);
    });
  });
};
