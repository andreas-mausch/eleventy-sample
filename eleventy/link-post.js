// Unfortunately, this is needed because there is no other way to access the pathPrefix passed on the CLI
// See here: https://github.com/11ty/eleventy-img/issues/44
// And here: https://github.com/11ty/eleventy/issues/1641
const getPathPrefix = () => process.env.ELEVENTY_PATH_PREFIX || ""

module.exports = href => {
  return `${getPathPrefix()}/posts/${href}/`
}
