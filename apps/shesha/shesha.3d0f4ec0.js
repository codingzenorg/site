(function () {function k(r,a){return s(r)||q(r,a)||p(r,a)||m()}function m(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function p(r,a){if(r){if("string"==typeof r)return f(r,a);var t=Object.prototype.toString.call(r).slice(8,-1);return"Object"===t&&r.constructor&&(t=r.constructor.name),"Map"===t||"Set"===t?Array.from(t):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?f(r,a):void 0}}function f(r,a){(null==a||a>r.length)&&(a=r.length);for(var t=0,e=new Array(a);t<a;t++)e[t]=r[t];return e}function q(r,a){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(r)){var t=[],e=!0,$=!1,o=void 0;try{for(var n,c=r[Symbol.iterator]();!(e=(n=c.next()).done)&&(t.push(n.value),!a||t.length!==a);e=!0);}catch(i){$=!0,o=i}finally{try{e||null==c.return||c.return()}finally{if($)throw o}}return t}}function s(r){if(Array.isArray(r))return r}var u=function(r){return{cellSize:r=r||20,limit:function(a,t){return{h:Math.floor(a/r),v:Math.floor(t/r)}},f:function(a){return a*r}}};var v=function(r){return{apple:g(r),snake:w(r),h:r.h,v:r.v}};var w=function(r){var a=r.h,t=r.v;return{x:Math.floor(Math.random()*a),y:Math.floor(Math.random()*t),trail:[],tail:5}},g=function(r){var a=r.h,t=r.v;return{x:Math.floor(Math.random()*a),y:Math.floor(Math.random()*t)}},x=function(r){var a=r.h;return function(r){return r<0?a-1:r>a-1?0:r}},y=function(r){var a=r.v;return function(r){return r<0?a-1:r>a-1?0:r}},z=function(r,a){var t=x(r),e=y(r);return function(){var $=r.snake;E($),$.x=t($.x),$.y=e($.y),a(r),B(r),A(r),C(r),D(r)}};var A=function(r){for(var a=r.snake;a.trail.length>a.tail;)a.trail.shift()},B=function(r){var a=r.snake;a.trail.push({x:a.x,y:a.y})},C=function(r){var a=r.snake;h(r)&&a.tail++},D=function(r){h(r)&&(r.apple=g(r))},h=function(r){var a=r.apple,t=r.snake;return a.x==t.x&&a.y==t.y},E=function(r){var a=k(j,2),t=a[0],e=a[1];r.x+=t,r.y+=e},j=[0,0],F=function(r){j={37:[-1,0],38:[0,-1],39:[1,0],40:[0,1]}[r.keyCode]||j};document.body.style.margin="0px",document.body.style.borderColor="gray",document.body.style.borderStyle="solid",document.body.style.borderWidth="5px";var b=document.createElement("canvas");b.width=window.innerWidth-10,b.height=window.innerHeight-10,document.body.appendChild(b),window.onload=function(){document.addEventListener("keydown",F);var e=u(),o=G(b,e,{boardBackColor:"black",snakeColor:"blue",appleColor:"red"}),a=v(e.limit(b.width,b.height)),t=z(a,o);setInterval(t,1e3/15)};var G=function(e,o,a){var t=o.f,l=o.cellSize,r=a.boardBackColor,n=a.appleColor,c=a.snakeColor,i=e.getContext("2d"),d=l-2;return function(o){var a=o.snake,$=o.apple;i.fillStyle=r,i.fillRect(0,0,e.width,e.height),i.fillStyle=c,a.trail.forEach(function(e){return i.fillRect(t(e.x),t(e.y),d,d)}),i.fillStyle=n,i.fillRect(t($.x),t($.y),d,d),i.fillStyle="blue",i.font="bold 16px Arial",i.fillText("\"cell size : ".concat(l),e.width-150,50),i.fillText("snake size: ".concat(a.trail.length),e.width-150,70),i.fillText("apple (".concat($.x,",").concat($.y,"):"),e.width-150,90),i.fillText("snake (".concat(a.x,",").concat(a.y,"):"),e.width-150,110)}};})();