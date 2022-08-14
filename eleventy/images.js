const image = require("@11ty/eleventy-img")
const path = require("path")

const thumbnailWidth = 300
// Unfortunately, this is needed because there is no other way to access the pathPrefix passed on the CLI
// See here: https://github.com/11ty/eleventy-img/issues/44
// And here: https://github.com/11ty/eleventy/issues/1641
const getPathPrefix = () => process.env.ELEVENTY_PATH_PREFIX || ""

const imageMetadata = async src => await image(src, {
  widths: [null, thumbnailWidth],
  formats: ["jpeg"],
  urlPath: `${getPathPrefix()}/images/`,
  outputDir: "./_site/images/",
  filenameFormat: function (hash, src, width, format, _options) {
    const { name } = path.parse(src)
    return `${name}-${hash}-${width}.${format}`
  }
})

async function thumbnail(src, alt, page = this.page) {
  const metadata = await imageMetadata(path.join(path.parse(page.inputPath).dir, src))

  const thumbnail = metadata.jpeg
    ?.filter(img => img.width <= thumbnailWidth)
    ?.sort((img1, img2) => img2.width - img1.width)
    .find(() => true)

  if (!thumbnail) {
    return
  }
  return `<img src="${thumbnail?.url}" alt="${alt}" width="${thumbnail?.width}" height="${thumbnail.height}">`
}

async function clickableThumbnail(src, alt) {
  const img = await thumbnail(src, alt, this.page)

  const metadata = await imageMetadata(path.join(path.parse(this.page.inputPath).dir, src))
  const largestImage = metadata.jpeg
    ?.sort((img1, img2) => img2.width - img1.width)
    .find(() => true)

  if (!largestImage) {
    return
  }

  return `<a href="${largestImage?.url}" target="_blank">${img}</a>`
}

async function imageShortcode(src, alt, sizes = "(min-width: 30em) 50vw, 100vw") {
  const metadata = await imageMetadata(path.join(path.parse(this.page.inputPath).dir, src))

  const imageAttributes = {
    alt,
    sizes,
    loading: "lazy",
    decoding: "async"
  }

  return image.generateHTML(metadata, imageAttributes)
}

module.exports = {
  thumbnail,
  clickableThumbnail,
  imageShortcode
}