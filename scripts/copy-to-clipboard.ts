export function copyToClipboard() {
  const divs = document.querySelectorAll(".copy-to-clipboard")

  divs.forEach(element => element.addEventListener("click", event => {
    const button = (event.target as Element).closest("button")
    const code = (event.target as Element).closest("code")
    navigator.clipboard.writeText(code.innerText)

    button.disabled = true
    button.innerText = "Copied!"

    setTimeout(() => {
      button.innerText = "Copy"
      button.disabled = false
    }, 3000)
  }))
}
