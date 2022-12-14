(()=>{var S=Object.create;var w=Object.defineProperty;var E=Object.getOwnPropertyDescriptor;var C=Object.getOwnPropertyNames;var M=Object.getPrototypeOf,A=Object.prototype.hasOwnProperty;var D=(i,e)=>()=>(e||i((e={exports:{}}).exports,e),e.exports);var P=(i,e,o,s)=>{if(e&&typeof e=="object"||typeof e=="function")for(let n of C(e))!A.call(i,n)&&n!==o&&w(i,n,{get:()=>e[n],enumerable:!(s=E(e,n))||s.enumerable});return i};var O=(i,e,o)=>(o=i!=null?S(M(i)):{},P(e||!i||!i.__esModule?w(o,"default",{value:i,enumerable:!0}):o,i));var L=D((g,y)=>{(function(i,e){typeof y=="object"&&y.exports?y.exports=e():i.Toastify=e()})(g,function(i){var e=function(t){return new e.lib.init(t)},o="1.12.0";e.defaults={oldestFirst:!0,text:"Toastify is awesome!",node:void 0,duration:3e3,selector:void 0,callback:function(){},destination:void 0,newWindow:!1,close:!1,gravity:"toastify-top",positionLeft:!1,position:"",backgroundColor:"",avatar:"",className:"",stopOnFocus:!0,onClick:function(){},offset:{x:0,y:0},escapeMarkup:!0,ariaLive:"polite",style:{background:""}},e.lib=e.prototype={toastify:o,constructor:e,init:function(t){return t||(t={}),this.options={},this.toastElement=null,this.options.text=t.text||e.defaults.text,this.options.node=t.node||e.defaults.node,this.options.duration=t.duration===0?0:t.duration||e.defaults.duration,this.options.selector=t.selector||e.defaults.selector,this.options.callback=t.callback||e.defaults.callback,this.options.destination=t.destination||e.defaults.destination,this.options.newWindow=t.newWindow||e.defaults.newWindow,this.options.close=t.close||e.defaults.close,this.options.gravity=t.gravity==="bottom"?"toastify-bottom":e.defaults.gravity,this.options.positionLeft=t.positionLeft||e.defaults.positionLeft,this.options.position=t.position||e.defaults.position,this.options.backgroundColor=t.backgroundColor||e.defaults.backgroundColor,this.options.avatar=t.avatar||e.defaults.avatar,this.options.className=t.className||e.defaults.className,this.options.stopOnFocus=t.stopOnFocus===void 0?e.defaults.stopOnFocus:t.stopOnFocus,this.options.onClick=t.onClick||e.defaults.onClick,this.options.offset=t.offset||e.defaults.offset,this.options.escapeMarkup=t.escapeMarkup!==void 0?t.escapeMarkup:e.defaults.escapeMarkup,this.options.ariaLive=t.ariaLive||e.defaults.ariaLive,this.options.style=t.style||e.defaults.style,t.backgroundColor&&(this.options.style.background=t.backgroundColor),this},buildToast:function(){if(!this.options)throw"Toastify is not initialized";var t=document.createElement("div");t.className="toastify on "+this.options.className,this.options.position?t.className+=" toastify-"+this.options.position:this.options.positionLeft===!0?(t.className+=" toastify-left",console.warn("Property `positionLeft` will be depreciated in further versions. Please use `position` instead.")):t.className+=" toastify-right",t.className+=" "+this.options.gravity,this.options.backgroundColor&&console.warn('DEPRECATION NOTICE: "backgroundColor" is being deprecated. Please use the "style.background" property.');for(var a in this.options.style)t.style[a]=this.options.style[a];if(this.options.ariaLive&&t.setAttribute("aria-live",this.options.ariaLive),this.options.node&&this.options.node.nodeType===Node.ELEMENT_NODE)t.appendChild(this.options.node);else if(this.options.escapeMarkup?t.innerText=this.options.text:t.innerHTML=this.options.text,this.options.avatar!==""){var u=document.createElement("img");u.src=this.options.avatar,u.className="toastify-avatar",this.options.position=="left"||this.options.positionLeft===!0?t.appendChild(u):t.insertAdjacentElement("afterbegin",u)}if(this.options.close===!0){var c=document.createElement("button");c.type="button",c.setAttribute("aria-label","Close"),c.className="toast-close",c.innerHTML="&#10006;",c.addEventListener("click",function(h){h.stopPropagation(),this.removeElement(this.toastElement),window.clearTimeout(this.toastElement.timeOutValue)}.bind(this));var d=window.innerWidth>0?window.innerWidth:screen.width;(this.options.position=="left"||this.options.positionLeft===!0)&&d>360?t.insertAdjacentElement("afterbegin",c):t.appendChild(c)}if(this.options.stopOnFocus&&this.options.duration>0){var p=this;t.addEventListener("mouseover",function(h){window.clearTimeout(t.timeOutValue)}),t.addEventListener("mouseleave",function(){t.timeOutValue=window.setTimeout(function(){p.removeElement(t)},p.options.duration)})}if(typeof this.options.destination<"u"&&t.addEventListener("click",function(h){h.stopPropagation(),this.options.newWindow===!0?window.open(this.options.destination,"_blank"):window.location=this.options.destination}.bind(this)),typeof this.options.onClick=="function"&&typeof this.options.destination>"u"&&t.addEventListener("click",function(h){h.stopPropagation(),this.options.onClick()}.bind(this)),typeof this.options.offset=="object"){var v=s("x",this.options),r=s("y",this.options),l=this.options.position=="left"?v:"-"+v,f=this.options.gravity=="toastify-top"?r:"-"+r;t.style.transform="translate("+l+","+f+")"}return t},showToast:function(){this.toastElement=this.buildToast();var t;if(typeof this.options.selector=="string"?t=document.getElementById(this.options.selector):this.options.selector instanceof HTMLElement||typeof ShadowRoot<"u"&&this.options.selector instanceof ShadowRoot?t=this.options.selector:t=document.body,!t)throw"Root element is not defined";var a=e.defaults.oldestFirst?t.firstChild:t.lastChild;return t.insertBefore(this.toastElement,a),e.reposition(),this.options.duration>0&&(this.toastElement.timeOutValue=window.setTimeout(function(){this.removeElement(this.toastElement)}.bind(this),this.options.duration)),this},hideToast:function(){this.toastElement.timeOutValue&&clearTimeout(this.toastElement.timeOutValue),this.removeElement(this.toastElement)},removeElement:function(t){t.className=t.className.replace(" on",""),window.setTimeout(function(){this.options.node&&this.options.node.parentNode&&this.options.node.parentNode.removeChild(this.options.node),t.parentNode&&t.parentNode.removeChild(t),this.options.callback.call(t),e.reposition()}.bind(this),400)}},e.reposition=function(){for(var t={top:15,bottom:15},a={top:15,bottom:15},u={top:15,bottom:15},c=document.getElementsByClassName("toastify"),d,p=0;p<c.length;p++){n(c[p],"toastify-top")===!0?d="toastify-top":d="toastify-bottom";var v=c[p].offsetHeight;d=d.substr(9,d.length-1);var r=15,l=window.innerWidth>0?window.innerWidth:screen.width;l<=360?(c[p].style[d]=u[d]+"px",u[d]+=v+r):n(c[p],"toastify-left")===!0?(c[p].style[d]=t[d]+"px",t[d]+=v+r):(c[p].style[d]=a[d]+"px",a[d]+=v+r)}return this};function s(t,a){return a.offset[t]?isNaN(a.offset[t])?a.offset[t]:a.offset[t]+"px":"0px"}function n(t,a){return!t||typeof a!="string"?!1:!!(t.className&&t.className.trim().split(/\s+/gi).indexOf(a)>-1)}return e.lib.init.prototype=e.lib,e})});var k=O(L());var T=function(){return{version:"1.5.3",init(i=document.body){for(let e of i.querySelectorAll(".swiffy-slider"))this.initSlider(e)},initSlider(i){for(let e of i.querySelectorAll(".slider-nav")){let o=e.classList.contains("slider-nav-next");e.addEventListener("click",()=>this.slide(i,o),{passive:!0})}for(let e of i.querySelectorAll(".slider-indicators"))e.addEventListener("click",()=>this.slideToByIndicator()),this.onSlideEnd(i,()=>this.handleIndicators(i),60);if(i.classList.contains("slider-nav-autoplay")){let e=i.getAttribute("data-slider-nav-autoplay-interval")?i.getAttribute("data-slider-nav-autoplay-interval"):2500;this.autoPlay(i,e,i.classList.contains("slider-nav-autopause"))}if(["slider-nav-autohide","slider-nav-animation"].some(e=>i.classList.contains(e))){let e=i.getAttribute("data-slider-nav-animation-threshold")?i.getAttribute("data-slider-nav-animation-threshold"):.3;this.setVisibleSlides(i,e)}},setVisibleSlides(i,e=.3){let o=new IntersectionObserver(s=>{s.forEach(n=>{n.isIntersecting?n.target.classList.add("slide-visible"):n.target.classList.remove("slide-visible")}),i.querySelector(".slider-container>*:first-child").classList.contains("slide-visible")?i.classList.add("slider-item-first-visible"):i.classList.remove("slider-item-first-visible"),i.querySelector(".slider-container>*:last-child").classList.contains("slide-visible")?i.classList.add("slider-item-last-visible"):i.classList.remove("slider-item-last-visible")},{root:i.querySelector(".slider-container"),threshold:e});for(let s of i.querySelectorAll(".slider-container>*"))o.observe(s)},slide(i,e=!0){let o=i.querySelector(".slider-container"),s=i.classList.contains("slider-nav-page"),n=i.classList.contains("slider-nav-noloop"),t=i.classList.contains("slider-nav-nodelay"),a=o.children,u=parseInt(window.getComputedStyle(o).columnGap),c=a[0].offsetWidth+u,d=e?o.scrollLeft+c:o.scrollLeft-c;s&&(d=e?o.scrollLeft+o.offsetWidth:o.scrollLeft-o.offsetWidth),o.scrollLeft<1&&!e&&!n&&(d=o.scrollWidth-o.offsetWidth),o.scrollLeft>=o.scrollWidth-o.offsetWidth&&e&&!n&&(d=0),o.scroll({left:d,behavior:t?"auto":"smooth"})},slideToByIndicator(){let i=window.event.target,e=Array.from(i.parentElement.children).indexOf(i),o=i.parentElement.children.length,s=i.closest(".swiffy-slider"),t=s.querySelector(".slider-container").children.length/o*e;this.slideTo(s,t)},slideTo(i,e){let o=i.querySelector(".slider-container"),s=parseInt(window.getComputedStyle(o).columnGap),n=o.children[0].offsetWidth+s,t=i.classList.contains("slider-nav-nodelay");o.scroll({left:n*e,behavior:t?"auto":"smooth"})},onSlideEnd(i,e,o=125){let s;i.querySelector(".slider-container").addEventListener("scroll",function(){window.clearTimeout(s),s=setTimeout(e,o)},{capture:!1,passive:!0})},autoPlay(i,e,o){e=e<750?750:e;let s=setInterval(()=>this.slide(i),e),n=()=>this.autoPlay(i,e,o);return o&&(["mouseover","touchstart"].forEach(function(t){i.addEventListener(t,function(){window.clearTimeout(s)},{once:!0,passive:!0})}),["mouseout","touchend"].forEach(function(t){i.addEventListener(t,function(){n()},{once:!0,passive:!0})})),s},handleIndicators(i){let e=i.querySelector(".slider-container"),o=e.scrollWidth-e.offsetWidth,s=e.scrollLeft/o;for(let n of i.querySelectorAll(".slider-indicators")){let t=n.children,a=Math.abs(Math.round((t.length-1)*s));for(let u of t)u.classList.remove("active");t[a].classList.add("active")}}}}();(()=>{"use strict";var i={792:(s,n,t)=>{t.d(n,{Z:()=>c});var a=t(609),u=t.n(a)()(function(d){return d[1]});u.push([s.id,':host{--divider-width: 1px;--divider-color: #fff;--divider-shadow: none;--default-handle-width: 50px;--default-handle-color: #fff;--default-handle-opacity: 1;--default-handle-shadow: none;--handle-position-start: 50%;position:relative;display:inline-block;overflow:hidden;line-height:0;direction:ltr}@media screen and (-webkit-min-device-pixel-ratio: 0)and (min-resolution: 0.001dpcm){:host{outline-offset:1px}}::slotted(*){-webkit-user-drag:none;-khtml-user-drag:none;-moz-user-drag:none;-o-user-drag:none;user-drag:none;-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.first{position:absolute;left:0;top:0;right:0;line-height:normal;font-size:100%;max-height:100%;height:100%;width:100%;--exposure: 50%;--keyboard-transition-time: 0ms;--default-transition-time: 0ms;--transition-time: var(--default-transition-time)}.first .first-overlay-container{position:relative;clip-path:inset(0 var(--exposure) 0 0);transition:clip-path var(--transition-time);height:100%}.first .first-overlay{overflow:hidden;height:100%}.first.focused{will-change:clip-path}.first.focused .first-overlay-container{will-change:clip-path}@media not all and (min-resolution: 0.001dpcm){@supports(-webkit-appearance: none){.first{--keyboard-transition-time: 50ms;--default-transition-time: 10ms;transform:translateX(calc(var(--exposure) * -1));transition:transform var(--transition-time);right:auto}.first .first-overlay-container{transform:translateX(var(--exposure));transition:transform var(--transition-time);clip-path:none}.first.focused{will-change:auto}.first.focused .first-overlay-container{will-change:auto}}}.second{position:relative}.handle-container{transform:translateX(50%);position:absolute;top:0;right:var(--exposure);height:100%;transition:right var(--transition-time),bottom var(--transition-time)}.focused .handle-container{will-change:right}@media not all and (min-resolution: 0.001dpcm){@supports(-webkit-appearance: none){.handle-container{right:0}.focused .handle-container{will-change:auto}}}.divider{position:absolute;height:100%;width:100%;left:0;top:0;display:flex;align-items:center;justify-content:center;flex-direction:column}.divider:after{content:" ";display:block;height:100%;border-left-width:var(--divider-width);border-left-style:solid;border-left-color:var(--divider-color);box-shadow:var(--divider-shadow)}.handle{position:absolute;top:var(--handle-position-start);pointer-events:none;box-sizing:border-box;margin-left:1px;transform:translate(calc(-50% - 0.5px), -50%);line-height:0}.default-handle{width:var(--default-handle-width);opacity:var(--default-handle-opacity);transition:all 1s;filter:drop-shadow(var(--default-handle-shadow))}.default-handle path{stroke:var(--default-handle-color)}.vertical .first-overlay-container{clip-path:inset(0 0 var(--exposure) 0)}.vertical .handle-container{transform:translateY(50%);height:auto;top:unset;bottom:var(--exposure);width:100%;left:0;flex-direction:row}.vertical .divider:after{height:1px;width:100%;border-top-width:var(--divider-width);border-top-style:solid;border-top-color:var(--divider-color);border-left:0}.vertical .handle{top:auto;left:var(--handle-position-start);transform:translate(calc(-50% - 0.5px), -50%) rotate(90deg)}@media not all and (min-resolution: 0.001dpcm){@supports(-webkit-appearance: none){.vertical.first{transform:translateY(calc(var(--exposure) * -1))}.vertical .first-overlay-container{transform:translateY(var(--exposure));clip-path:none}.vertical .handle-container{bottom:0}}}',""]);let c=u},609:s=>{s.exports=function(n){var t=[];return t.toString=function(){return this.map(function(a){var u=n(a);return a[2]?"@media ".concat(a[2]," {").concat(u,"}"):u}).join("")},t.i=function(a,u,c){typeof a=="string"&&(a=[[null,a,""]]);var d={};if(c)for(var p=0;p<this.length;p++){var v=this[p][0];v!=null&&(d[v]=!0)}for(var r=0;r<a.length;r++){var l=[].concat(a[r]);c&&d[l[0]]||(u&&(l[2]?l[2]="".concat(u," and ").concat(l[2]):l[2]=u),t.push(l))}},t}}},e={};function o(s){var n=e[s];if(n!==void 0)return n.exports;var t=e[s]={id:s,exports:{}};return i[s](t,t.exports,o),t.exports}o.n=s=>{var n=s&&s.__esModule?()=>s.default:()=>s;return o.d(n,{a:n}),n},o.d=(s,n)=>{for(var t in n)o.o(n,t)&&!o.o(s,t)&&Object.defineProperty(s,t,{enumerable:!0,get:n[t]})},o.o=(s,n)=>Object.prototype.hasOwnProperty.call(s,n),(()=>{var s=o(792);let n="rendered",t=document.createElement("template");t.innerHTML='<div class="second" id="second"> <slot name="second"><slot name="before"></slot></slot> </div> <div class="first" id="first"> <div class="first-overlay"> <div class="first-overlay-container" id="firstImageContainer"> <slot name="first"><slot name="after"></slot></slot> </div> </div> <div class="handle-container"> <div class="divider"></div> <div class="handle"> <slot name="handle"> <svg xmlns="http://www.w3.org/2000/svg" class="default-handle" viewBox="-8 -3 16 6"> <path d="M -5 -2 L -7 0 L -5 2 M 5 -2 L 7 0 L 5 2" fill="none" vector-effect="non-scaling-stroke"/> </svg> </slot> </div> </div> </div> ';let a={ArrowLeft:-1,ArrowRight:1},u=["horizontal","vertical"],c=v=>({x:v.touches[0].pageX,y:v.touches[0].pageY}),d=v=>({x:v.pageX,y:v.pageY});class p extends HTMLElement{constructor(){super(),this.exposure=this.hasAttribute("value")?parseFloat(this.getAttribute("value")):50,this.slideOnHover=!1,this.slideDirection="horizontal",this.keyboard="enabled",this.isMouseDown=!1,this.animationDirection=0,this.isFocused=!1,this.onMouseMove=f=>{if(this.isMouseDown||this.slideOnHover){let h=d(f);this.slideToPage(h)}},this.bodyUserSelectStyle="",this.onMouseDown=f=>{if(this.slideOnHover)return;window.addEventListener("mousemove",this.onMouseMove),window.addEventListener("mouseup",this.onWindowMouseUp),this.isMouseDown=!0,this.enableTransition();let h=d(f);this.slideToPage(h),this.focus(),this.bodyUserSelectStyle=window.document.body.style.userSelect,window.document.body.style.userSelect="none"},this.onWindowMouseUp=()=>{this.isMouseDown=!1,window.document.body.style.userSelect=this.bodyUserSelectStyle,window.removeEventListener("mousemove",this.onMouseMove),window.removeEventListener("mouseup",this.onWindowMouseUp)},this.isTouchComparing=!1,this.hasTouchMoved=!1,this.onTouchStart=f=>{this.touchStartPoint=c(f),this.isFocused&&(this.enableTransition(),this.slideToPage(this.touchStartPoint))},this.onTouchMove=f=>{let h=c(f);if(this.isTouchComparing)return this.slideToPage(h),f.preventDefault(),!1;if(!this.hasTouchMoved){let m=Math.abs(h.y-this.touchStartPoint.y),b=Math.abs(h.x-this.touchStartPoint.x);if(this.slideDirection==="horizontal"&&m<b||this.slideDirection==="vertical"&&m>b)return this.isTouchComparing=!0,this.focus(),this.slideToPage(h),f.preventDefault(),!1;this.hasTouchMoved=!0}},this.onTouchEnd=()=>{this.isTouchComparing=!1,this.hasTouchMoved=!1},this.onBlur=()=>{this.stopSlideAnimation(),this.isFocused=!1,this.firstElement.classList.remove("focused")},this.onFocus=()=>{this.isFocused=!0,this.firstElement.classList.add("focused")},this.onKeyDown=f=>{if(this.keyboard==="disabled")return;let h=a[f.key];this.animationDirection!==h&&h!==void 0&&(this.animationDirection=h,this.startSlideAnimation())},this.onKeyUp=f=>{if(this.keyboard==="disabled")return;let h=a[f.key];h!==void 0&&this.animationDirection===h&&this.stopSlideAnimation()},this.resetDimensions=()=>{this.imageWidth=this.offsetWidth,this.imageHeight=this.offsetHeight};let r=this.attachShadow({mode:"open"}),l=document.createElement("style");l.innerHTML=s.Z,this.getAttribute("nonce")&&l.setAttribute("nonce",this.getAttribute("nonce")),r.appendChild(l),r.appendChild(t.content.cloneNode(!0)),this.firstElement=r.getElementById("first"),this.secondElement=r.getElementById("second")}get value(){return this.exposure}set value(r){let l=parseFloat(r);l!==this.exposure&&(this.exposure=l,this.enableTransition(),this.setExposure())}get hover(){return this.slideOnHover}set hover(r){this.slideOnHover=r.toString().toLowerCase()!=="false",this.removeEventListener("mousemove",this.onMouseMove),this.slideOnHover&&this.addEventListener("mousemove",this.onMouseMove)}get direction(){return this.slideDirection}set direction(r){this.slideDirection=r.toString().toLowerCase(),this.slide(0),this.firstElement.classList.remove(...u),u.includes(this.slideDirection)&&this.firstElement.classList.add(this.slideDirection)}static get observedAttributes(){return["hover","direction"]}connectedCallback(){this.hasAttribute("tabindex")||(this.tabIndex=0),this.addEventListener("dragstart",r=>(r.preventDefault(),!1)),new ResizeObserver(this.resetDimensions).observe(this),this.setExposure(0),this.keyboard=this.hasAttribute("keyboard")&&this.getAttribute("keyboard")==="disabled"?"disabled":"enabled",this.addEventListener("keydown",this.onKeyDown),this.addEventListener("keyup",this.onKeyUp),this.addEventListener("focus",this.onFocus),this.addEventListener("blur",this.onBlur),this.addEventListener("touchstart",this.onTouchStart,{passive:!0}),this.addEventListener("touchmove",this.onTouchMove,{passive:!1}),this.addEventListener("touchend",this.onTouchEnd),this.addEventListener("mousedown",this.onMouseDown),this.hover=!!this.hasAttribute("hover")&&this.getAttribute("hover"),this.direction=this.hasAttribute("direction")?this.getAttribute("direction"):"horizontal",this.resetDimensions(),this.classList.contains(n)||this.classList.add(n),this.querySelectorAll('[slot="before"], [slot="after"]').length>0&&console.warn(`<img-comparison-slider>: slot names "before" and "after" are deprecated and soon won't be supported. Please use slot="first" instead of slot="after", and slot="second" instead of slot="before".`)}disconnectedCallback(){this.transitionTimer&&window.clearTimeout(this.transitionTimer)}attributeChangedCallback(r,l,f){r==="hover"&&(this.hover=f),r==="direction"&&(this.direction=f),r==="keyboard"&&(this.keyboard=f==="disabled"?"disabled":"enabled")}setExposure(r=0){var l;this.exposure=(l=this.exposure+r)<0?0:l>100?100:l,this.firstElement.style.setProperty("--exposure",100-this.exposure+"%")}slide(r=0){this.setExposure(r);let l=new Event("slide");this.dispatchEvent(l)}slideToPage(r){this.slideDirection==="horizontal"&&this.slideToPageX(r.x),this.slideDirection==="vertical"&&this.slideToPageY(r.y)}slideToPageX(r){let l=r-this.getBoundingClientRect().left-window.scrollX;this.exposure=l/this.imageWidth*100,this.slide(0)}slideToPageY(r){let l=r-this.getBoundingClientRect().top-window.scrollY;this.exposure=l/this.imageHeight*100,this.slide(0)}enableTransition(){this.firstElement.style.setProperty("--transition-time","100ms"),this.transitionTimer=window.setTimeout(()=>{this.firstElement.style.setProperty("--transition-time","var(--default-transition-time)"),this.transitionTimer=null},100)}startSlideAnimation(){let r=null,l=this.animationDirection;this.firstElement.style.setProperty("--transition-time","var(--keyboard-transition-time)");let f=h=>{if(this.animationDirection===0||l!==this.animationDirection)return;r===null&&(r=h);let m=(h-r)/16.666666666666668*this.animationDirection;this.slide(m),setTimeout(()=>window.requestAnimationFrame(f),0),r=h};window.requestAnimationFrame(f)}stopSlideAnimation(){this.animationDirection=0,this.firstElement.style.setProperty("--transition-time","var(--default-transition-time)")}}typeof window<"u"&&window.customElements.define("img-comparison-slider",p)})()})();function x(){document.querySelectorAll(".copy-to-clipboard").forEach(e=>e.addEventListener("click",o=>{let s=o.target.closest("button"),n=s.nextElementSibling.querySelector("code");navigator.clipboard.writeText(n.innerText),s.disabled=!0,s.innerText="Copied!",setTimeout(()=>{s.innerText="Copy",s.disabled=!1},3e3)}))}window.showToast=()=>{(0,k.default)({text:"This is a toast",duration:3e3,gravity:"top",position:"left"}).showToast()};window.swiffyslider=T;window.addEventListener("load",()=>{window.swiffyslider.init(),x()});})();
