const fs = require("fs")
const imageShortcodes = require("./images")

module.exports = post => {
  if (post.inputPath && post.inputPath.endsWith("/index.md")) {
    const thumbnailPath = imageShortcodes.relativeFile("thumbnail.jpg", post)
    if (fs.existsSync(thumbnailPath)) {
      const img = imageShortcodes.thumbnail("thumbnail.jpg", "Post thumbnail", post)
      return `<div class="postlist-thumbnail">${img}</div>`
    }
  }
  return ""
}
