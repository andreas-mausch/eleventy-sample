import Toastify from "toastify-js"
import { swiffyslider } from "swiffy-slider"
import "img-comparison-slider/dist/index"
import { copyToClipboard } from "./copy-to-clipboard"

window.showToast = () => {
  Toastify({
    text: "This is a toast",
    duration: 3000,
    gravity: "top",
    position: "left"
  }).showToast()
}

window.swiffyslider = swiffyslider

window.addEventListener("load", () => {
  window.swiffyslider.init()
  copyToClipboard()
})
