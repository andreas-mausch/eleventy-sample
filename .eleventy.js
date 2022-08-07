module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("posts/*/*.{jpg,jpeg,png,svg}");

  eleventyConfig.addLayoutAlias("page", "layouts/page.njk");
  eleventyConfig.addLayoutAlias("post", "layouts/post.njk");
};
