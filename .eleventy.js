module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("posts/*/*.jpg");
  eleventyConfig.addPassthroughCopy("posts/*/*.png");
  eleventyConfig.addPassthroughCopy("posts/*/*.svg");
  eleventyConfig.addLayoutAlias("page", "layouts/page.njk");
};
