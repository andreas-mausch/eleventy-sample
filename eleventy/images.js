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

async function findThumbnail(src, page = this.page) {
  const metadata = await imageMetadata(path.join(path.parse(page.inputPath).dir, src))

  return metadata.jpeg
    ?.filter(img => img.width <= thumbnailWidth)
    ?.sort((img1, img2) => img2.width - img1.width)
    .find(() => true)
}

async function thumbnail(src, alt, page = this.page) {
  const thumbnail = await findThumbnail(src, page)

  if (!thumbnail) {
    return
  }
  return `<img src="${thumbnail?.url}" alt="${alt}" width="${thumbnail?.width}" height="${thumbnail.height}">`
}

async function imageUrl(src, page = this.page) {
  const metadata = await imageMetadata(path.join(path.parse(page.inputPath).dir, src))

  const largestImage = metadata.jpeg
    ?.sort((img1, img2) => img2.width - img1.width)
    .find(() => true)

  if (!largestImage) {
    return
  }

  return largestImage?.url
}

async function clickableThumbnail(src, alt, page = this.page) {
  const img = await thumbnail(src, alt, page)
  const largestImageUrl = imageUrl(src, page)
  return `<a href="${largestImageUrl}" target="_blank">${img}</a>`
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

async function carousel(srcs) {
  let slider = "<div class=\"swiffy-slider slider-indicators-sm slider-indicators-dark slider-indicators-outside slider-indicators-round slider-indicators-highlight slider-nav-dark slider-nav-chevron slider-item-ratio-contain\">"
  slider += "<ul class=\"slider-container\">"
  for await (const thumbnail of srcs.map(src => clickableThumbnail(src, "Slider image", this.context.environments.page))) {
    slider += `<li>${thumbnail}</li>`
  }
  slider += "</ul>"

  slider += "<button type=\"button\" class=\"slider-nav\"></button>"
  slider += "<button type=\"button\" class=\"slider-nav slider-nav-next\"></button>"

  slider += "<div class=\"slider-indicators\">"
  srcs.forEach((_src, index) => {
    slider += "<button"
    if (index === 0) {
      slider += " class=\"active\""
    }
    slider += "></button>"
  })
  slider += "</div>"
  slider += "</div>"

  return slider
}

module.exports = {
  thumbnail,
  clickableThumbnail,
  imageShortcode,
  imageUrl,
  carousel
}
