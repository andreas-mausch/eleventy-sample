module.exports = originalHighlight => {
  return (text, lang) => {
    const previousHtml = originalHighlight(text, lang)
    const copyToClipboardHtml = "<button type=\"button\" class=\"copy-to-clipboard\">Copy</button>"

    return copyToClipboardHtml + previousHtml
  }
}
