(()=>{function c(){document.querySelectorAll(".copy-to-clipboard").forEach(t=>t.addEventListener("click",o=>{let e=o.target.closest("button"),n=e.nextElementSibling.querySelector("code");navigator.clipboard.writeText(n.innerText),e.disabled=!0,e.innerText="Copied!",setTimeout(()=>{e.innerText="Copy",e.disabled=!1},3e3)}))}})();