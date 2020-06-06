(function () {function j(e,n){for(var t=[],r=[],o=arguments.length;o-->2;)t.push(arguments[o]);for(;t.length;){var l=t.pop();if(l&&l.pop)for(o=l.length;o--;)t.push(l[o]);else null!=l&&!0!==l&&!1!==l&&r.push(l)}return"function"==typeof e?e(n||{},r):{nodeName:e,attributes:n||{},children:r,key:n&&n.key}}function B(e,n,t,r){var o,l=[].map,u=r&&r.children[0]||null,i=u&&function e(n){return{nodeName:n.nodeName.toLowerCase(),attributes:{},children:l.call(n.childNodes,function(n){return 3===n.nodeType?n.nodeValue:e(n)})}}(u),a=[],f=!0,s=h(e),c=function e(n,t,r){for(var o in r)"function"==typeof r[o]?function(e,o){r[e]=function(e){var l=o(e);return"function"==typeof l&&(l=l(g(n,s),r)),l&&l!==(t=g(n,s))&&!l.then&&p(s=y(n,h(t,l),s)),l}}(o,r[o]):e(n.concat(o),t[o]=h(t[o]),r[o]=h(r[o]));return r}([],s,h(n));return p(),c;function v(e){return"function"==typeof e?v(e(s,c)):null!=e?e:""}function d(){o=!o;var e=v(t);for(r&&!o&&(u=function e(n,t,r,o,l){if(o===r);else if(null==r||r.nodeName!==o.nodeName){var u=function e(n,t){var r="string"==typeof n||"number"==typeof n?document.createTextNode(n):(t=t||"svg"===n.nodeName)?document.createElementNS("http://www.w3.org/2000/svg",n.nodeName):document.createElement(n.nodeName);var o=n.attributes;if(o){o.oncreate&&a.push(function(){o.oncreate(r)});for(var l=0;l<n.children.length;l++)r.appendChild(e(n.children[l]=v(n.children[l]),t));for(var u in o)N(r,u,o[u],null,t)}return r}(o,l);n.insertBefore(u,t),null!=r&&b(n,t,r),t=u}else if(null==r.nodeName)t.nodeValue=o;else{!function(e,n,t,r){for(var o in h(n,t))t[o]!==("value"===o||"checked"===o?e[o]:n[o])&&N(e,o,t[o],n[o],r);var l=f?t.oncreate:t.onupdate;l&&a.push(function(){l(e,n)})}(t,r.attributes,o.attributes,l=l||"svg"===o.nodeName);for(var i={},s={},c=[],d=r.children,p=o.children,y=0;y<d.length;y++){c[y]=t.childNodes[y];var g=m(d[y]);null!=g&&(i[g]=[c[y],d[y]])}for(var y=0,$=0;$<p.length;){var g=m(d[y]),x=m(p[$]=v(p[$]));if(s[g])y++;else if(null==x||x!==m(d[y+1])){if(null==x||f)null==g&&(e(t,c[y],d[y],p[$],l),$++),y++;else{var S=i[x]||[];g===x?(e(t,S[0],S[1],p[$],l),y++):S[0]?e(t,t.insertBefore(S[0],c[y]),S[1],p[$],l):e(t,c[y],null,p[$],l),s[x]=p[$],$++}}else null==g&&b(t,c[y],d[y]),y++}for(;y<d.length;)null==m(d[y])&&b(t,c[y],d[y]),y++;for(var y in i)s[y]||b(t,i[y][0],i[y][1])}return t}(r,u,i,i=e)),f=!1;a.length;)a.pop()()}function p(){o||(o=!0,setTimeout(d))}function h(e,n){var t={};for(var r in e)t[r]=e[r];for(var r in n)t[r]=n[r];return t}function y(e,n,t){var r={};return e.length?(r[e[0]]=e.length>1?y(e.slice(1),n,t[e[0]]):n,h(t,r)):n}function g(e,n){for(var t=0;t<e.length;)n=n[e[t++]];return n}function m(e){return e?e.key:null}function $(e){return e.currentTarget.events[e.type](e)}function N(e,n,t,r,o){if("key"===n);else if("style"===n){if("string"==typeof t)e.style.cssText=t;else for(var l in"string"==typeof r&&(r=e.style.cssText=""),h(r,t)){var u=null==t||null==t[l]?"":t[l];"-"===l[0]?e.style.setProperty(l,u):e.style[l]=u}}else"o"===n[0]&&"n"===n[1]?(n=n.slice(2),e.events?r||(r=e.events[n]):e.events={},e.events[n]=t,t?r||e.addEventListener(n,$):e.removeEventListener(n,$)):n in e&&"list"!==n&&"type"!==n&&"draggable"!==n&&"spellcheck"!==n&&"translate"!==n&&!o?e[n]=null==t?"":t:null!=t&&!1!==t&&e.setAttribute(n,t),null!=t&&!1!==t||e.removeAttribute(n)}function b(e,n,t){function r(){e.removeChild(function e(n,t){var r=t.attributes;if(r){for(var o=0;o<t.children.length;o++)e(n.childNodes[o],t.children[o]);r.ondestroy&&r.ondestroy(n)}return n}(n,t))}var o=t.attributes&&t.attributes.onremove;o?o(n,r):r()}}var k=new Date(2016,0,16,4,25,0),C=k.getTime(),D=new Date().getTime(),q=D-C,w=q/1e3,z=w/60,A=z/60,E=A/24,F={bdate:k,diff_microseconds:q,diff_seconds:w,diff_minutes:z,diff_hours:A,diff_days:E},G={},H=function($,o){return j("div",{class:{}.todos},j("h1",null,"Date and time differences since ",$.bdate.toLocaleString("en-US")),j("ul",null,j("li",null,"days   : ",Math.floor($.diff_days)),j("li",null,"hours  : ",Math.floor($.diff_hours)),j("li",null,"minutes: ",Math.floor($.diff_minutes)),j("li",null,"seconds: ",Math.floor($.diff_seconds)),j("li",null,"microseconds: ",Math.floor($.diff_microseconds))))};B(F,G,H,document.body);})();