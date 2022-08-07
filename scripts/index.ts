import Toastify from 'toastify-js'

const elemDiv: HTMLElement = document.createElement('div');
elemDiv.innerHTML = '<div>Appended Element by TypeScript</div>';
document.body.appendChild(elemDiv);

Toastify({
  text: "This is a toast",
  duration: 3000,
  gravity: "top", // `top` or `bottom`
  position: "left", // `left`, `center` or `right`
}).showToast();
