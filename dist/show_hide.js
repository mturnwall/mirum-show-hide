!function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=0)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:".extra",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:".read-more",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;r=document.querySelector(e),o=document.querySelector(t),o.addEventListener("click",function(e){e.preventDefault(),i(n)})};var r=null,o=null,u=function(){var e=r.cloneNode(!0);e.style.height="auto",r.parentNode.appendChild(e);var t=e.offsetHeight;return r.parentNode.removeChild(e),t},i=function(e){var t="defaultHeight"in r.dataset&&r.dataset.defaultHeight;t||(t=u(),r.dataset.defaultHeight=t),r.style.height=r.offsetHeight===e?t+"px":e+"px"}}]);