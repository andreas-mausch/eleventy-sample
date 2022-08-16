const image = require("@11ty/eleventy-img")
const getPathPrefix = require("./path-prefix")
const path = require("path")

const thumbnailWidth = 300

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

async function findImage(src, page = this.page) {
  const metadata = await imageMetadata(path.join(path.parse(page.inputPath).dir, src))

  return metadata.jpeg
    ?.sort((img1, img2) => img2.width - img1.width)
    .find(() => true)
}

async function thumbnail(src, alt, page = this.page) {
  const thumbnail = await findThumbnail(src, page)

  if (!thumbnail) {
    return
  }
  return `<img src="${thumbnail.url}" alt="${alt}" width="${thumbnail.width}" height="${thumbnail.height}">`
}

async function imageUrl(src, page = this.page) {
  const image = await findImage(src, page)
  return image.url
}

async function clickableThumbnail(src, alt, page = this.page) {
  const img = await thumbnail(src, alt, page)
  const largestImageUrl = await imageUrl(src, page)
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

async function comparison(beforeName, afterName, page = this.page) {
  const before = await findImage(beforeName, page)
  const after = await findImage(afterName, page)

  if (!before || !after) {
    throw new Error(`comparison: before (${before}) or after (${after}) not found`)
  }

  let comparison = "<div class=\"image-comparison-slider\">"
  comparison += "<img-comparison-slider>"
  comparison += `<img slot="first" src="${before.url}" width="${before.width}" height="${before.height}" style="max-height: 80vh" />`
  comparison += `<img slot="second" src="${after.url}"  width="${after.width}" height="${after.height}" style="max-height: 80vh" />`
  comparison += "<svg slot=\"handle\" class=\"image-comparison-slider-handle\" xmlns=\"http://www.w3.org/2000/svg\" width=\"125\" viewBox=\"-8 -3 16 6\">"
  comparison += "<path stroke=\"#fff\" d=\"M -5 -2 L -7 0 L -5 2 M -5 -2 L -5 2 M 5 -2 L 7 0 L 5 2 M 5 -2 L 5 2\" stroke-width=\"1\" fill=\"#fff\" vector-effect=\"non-scaling-stroke\"></path>"
  comparison += "</svg>"
  comparison += "</img-comparison-slider>"
  comparison += "</div>"

  return comparison
}

module.exports = {
  thumbnail,
  clickableThumbnail,
  imageShortcode,
  imageUrl,
  carousel,
  comparison
}
