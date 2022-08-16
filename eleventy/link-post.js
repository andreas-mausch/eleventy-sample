// Unfortunately, this is needed because there is no other way to access the pathPrefix passed on the CLI
// See here: https://github.com/11ty/eleventy-img/issues/44
// And here: https://github.com/11ty/eleventy/issues/1641
const getPathPrefix = () => process.env.ELEVENTY_PATH_PREFIX || ""

module.exports = function (eleventyConfig, _options = {}) {
  eleventyConfig.addLiquidTag("link-post", _liquidEngine => ({
    parse: function (tagToken, _remainingTokens) {
      this.linkToPost = tagToken.args
    },
    render: async function (scope, _hash) {
      const linkToPost = await this.liquid.evalValue(this.linkToPost, scope)
      const post = scope.environments.collections.posts.find(post => post.url === `/posts/${linkToPost}/`)

      if (!post) {
        throw new Error(`link-post: Post not found ${linkToPost}`)
      }

      return `${getPathPrefix()}${post.url}`
    }
  }))
}
