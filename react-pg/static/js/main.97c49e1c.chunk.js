(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{64:function(e,t,n){"use strict";(function(e){n.d(t,"b",function(){return s}),n.d(t,"a",function(){return p}),n.d(t,"c",function(){return b});var r=n(3),a=n(4),o=n(0),c=n.n(o),i=n(91),l=n(92),u=n(42),f=n(26);function h(e,t){var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(var a=0,o=n;a<o.length;a++){var c=o[a];if(e[c]!==t[c])return!1}return!0}function s(e){return Object.entries(e).filter(function(e){return void 0!==Object(a.a)(e,2)[1]}).map(function(e){var t=Object(a.a)(e,2),n=t[0],r=t[1];return"".concat(n,"=").concat(r)}).join("&")}function m(e){return Array.isArray(e)?e:Object.entries(e).map(function(e){var t=Object(a.a)(e,2);return{heading:t[0],data:t[1]}})}function p(t){var n=m(t.columns),r=parseInt(new URLSearchParams(e.location.search).get("page")||"1",10);return c.a.createElement(c.a.Fragment,null,c.a.createElement(i.a,{striped:!0,bordered:!0,hover:!0},c.a.createElement("thead",null,c.a.createElement("tr",null,n.map(function(e,t){return c.a.createElement("th",{key:"th-".concat(t)},void 0===(n=e.heading)||null===n||"boolean"===typeof n||"number"===typeof n||"string"===typeof n?n:"children"in n?n.children:n);var n}))),c.a.createElement("tbody",null,c.a.createElement(c.a.Suspense,{fallback:c.a.createElement("tr",null,c.a.createElement("td",{colSpan:n.length},c.a.createElement(l.a,{animated:!0,now:100})))},c.a.createElement(y,t)))),c.a.createElement("nav",{"aria-label":"Page navigation example"},c.a.createElement("ul",{className:"pagination"},g(1,10).map(function(e){return c.a.createElement("li",{className:"page-item ".concat(e===r?"active":""),key:"page-".concat(e)},c.a.createElement(u.a,{className:"page-link",to:"?page=".concat(e)},e))}))))}function d(e){return"function"===typeof e?e:"object"===typeof e&&null!==e&&"children"in e?d(e.children):function(){return e}}function v(e,t){var n=e.data;return void 0===n||null===n||"boolean"===typeof n||"number"===typeof n||"string"===typeof n?function(){}:"function"===typeof n?function(){}:"children"in n?"type"in n?function(){}:d(n[t]):function(){}}function y(e){var t=e.state,n=e.columns,r=Object(f.f)(t),a=m(n);return c.a.createElement(c.a.Fragment,null,r.map(function(e,t){return c.a.createElement("tr",{key:"tr-".concat(t)},a.map(function(t,n){return c.a.createElement("td",{key:"td-".concat(n),title:d(v(t,"title"))(e)},d(t.data)(e))}))}))}var g=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1;return Array.from({length:(t-e)/n+1},function(t,r){return e+r*n})};function b(t,n,c,i){var l=function(e){return function(t){var n={};for(var r in e){var a=e[r],o=a.searchParamName||r,c=(0,a.parseSearchParam)(t.get(o));n[r]=c}return n}}(n),s=Object(f.b)({key:t,default:l(new URLSearchParams(e.location.search))});return[function(){var e=Object(u.c)(),t=Object(a.a)(e,1)[0],n=Object(f.e)(s),r=Object(a.a)(n,2),c=r[0],i=r[1],m=l(t);Object(o.useEffect)(function(){h(c,m)||i(m)},[c,i,m])},Object(f.c)({key:c,get:function(e){return i(Object(r.a)({},e,{queryState:s}))}}),l,s]}}).call(this,n(49))},72:function(e,t,n){e.exports=n(90)},82:function(e,t,n){},84:function(e,t,n){},90:function(e,t,n){"use strict";n.r(t);n(73);var r=n(0),a=n.n(r),o=n(68),c=n.n(o),i=n(42),l=n(2),u=n(26);function f(){return a.a.createElement("div",{className:"text-center p-5"},a.a.createElement("h1",null,"React Playground"))}var h=function(){return a.a.createElement("div",null,"Components")},s=n(4),m=n(14),p=n(64);function d(){d=function(){return e};var e={},t=Object.prototype,n=t.hasOwnProperty,r=Object.defineProperty||function(e,t,n){e[t]=n.value},a="function"==typeof Symbol?Symbol:{},o=a.iterator||"@@iterator",c=a.asyncIterator||"@@asyncIterator",i=a.toStringTag||"@@toStringTag";function l(e,t,n){return Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}),e[t]}try{l({},"")}catch(P){l=function(e,t,n){return e[t]=n}}function u(e,t,n,a){var o=t&&t.prototype instanceof s?t:s,c=Object.create(o.prototype),i=new L(a||[]);return r(c,"_invoke",{value:j(e,n,i)}),c}function f(e,t,n){try{return{type:"normal",arg:e.call(t,n)}}catch(P){return{type:"throw",arg:P}}}e.wrap=u;var h={};function s(){}function m(){}function p(){}var v={};l(v,o,function(){return this});var y=Object.getPrototypeOf,g=y&&y(y(S([])));g&&g!==t&&n.call(g,o)&&(v=g);var b=p.prototype=s.prototype=Object.create(v);function E(e){["next","throw","return"].forEach(function(t){l(e,t,function(e){return this._invoke(t,e)})})}function w(e,t){var a;r(this,"_invoke",{value:function(r,o){function c(){return new t(function(a,c){!function r(a,o,c,i){var l=f(e[a],e,o);if("throw"!==l.type){var u=l.arg,h=u.value;return h&&"object"==typeof h&&n.call(h,"__await")?t.resolve(h.__await).then(function(e){r("next",e,c,i)},function(e){r("throw",e,c,i)}):t.resolve(h).then(function(e){u.value=e,c(u)},function(e){return r("throw",e,c,i)})}i(l.arg)}(r,o,a,c)})}return a=a?a.then(c,c):c()}})}function j(e,t,n){var r="suspendedStart";return function(a,o){if("executing"===r)throw new Error("Generator is already running");if("completed"===r){if("throw"===a)throw o;return N()}for(n.method=a,n.arg=o;;){var c=n.delegate;if(c){var i=x(c,n);if(i){if(i===h)continue;return i}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if("suspendedStart"===r)throw r="completed",n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r="executing";var l=f(e,t,n);if("normal"===l.type){if(r=n.done?"completed":"suspendedYield",l.arg===h)continue;return{value:l.arg,done:n.done}}"throw"===l.type&&(r="completed",n.method="throw",n.arg=l.arg)}}}function x(e,t){var n=t.method,r=e.iterator[n];if(void 0===r)return t.delegate=null,"throw"===n&&e.iterator.return&&(t.method="return",t.arg=void 0,x(e,t),"throw"===t.method)||"return"!==n&&(t.method="throw",t.arg=new TypeError("The iterator does not provide a '"+n+"' method")),h;var a=f(r,e.iterator,t.arg);if("throw"===a.type)return t.method="throw",t.arg=a.arg,t.delegate=null,h;var o=a.arg;return o?o.done?(t[e.resultName]=o.value,t.next=e.nextLoc,"return"!==t.method&&(t.method="next",t.arg=void 0),t.delegate=null,h):o:(t.method="throw",t.arg=new TypeError("iterator result is not an object"),t.delegate=null,h)}function O(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function k(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function L(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(O,this),this.reset(!0)}function S(e){if(e){var t=e[o];if(t)return t.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var r=-1,a=function t(){for(;++r<e.length;)if(n.call(e,r))return t.value=e[r],t.done=!1,t;return t.value=void 0,t.done=!0,t};return a.next=a}}return{next:N}}function N(){return{value:void 0,done:!0}}return m.prototype=p,r(b,"constructor",{value:p,configurable:!0}),r(p,"constructor",{value:m,configurable:!0}),m.displayName=l(p,i,"GeneratorFunction"),e.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===m||"GeneratorFunction"===(t.displayName||t.name))},e.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,p):(e.__proto__=p,l(e,i,"GeneratorFunction")),e.prototype=Object.create(b),e},e.awrap=function(e){return{__await:e}},E(w.prototype),l(w.prototype,c,function(){return this}),e.AsyncIterator=w,e.async=function(t,n,r,a,o){void 0===o&&(o=Promise);var c=new w(u(t,n,r,a),o);return e.isGeneratorFunction(n)?c:c.next().then(function(e){return e.done?e.value:c.next()})},E(b),l(b,i,"Generator"),l(b,o,function(){return this}),l(b,"toString",function(){return"[object Generator]"}),e.keys=function(e){var t=Object(e),n=[];for(var r in t)n.push(r);return n.reverse(),function e(){for(;n.length;){var r=n.pop();if(r in t)return e.value=r,e.done=!1,e}return e.done=!0,e}},e.values=S,L.prototype={constructor:L,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(k),!e)for(var t in this)"t"===t.charAt(0)&&n.call(this,t)&&!isNaN(+t.slice(1))&&(this[t]=void 0)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var t=this;function r(n,r){return c.type="throw",c.arg=e,t.next=n,r&&(t.method="next",t.arg=void 0),!!r}for(var a=this.tryEntries.length-1;a>=0;--a){var o=this.tryEntries[a],c=o.completion;if("root"===o.tryLoc)return r("end");if(o.tryLoc<=this.prev){var i=n.call(o,"catchLoc"),l=n.call(o,"finallyLoc");if(i&&l){if(this.prev<o.catchLoc)return r(o.catchLoc,!0);if(this.prev<o.finallyLoc)return r(o.finallyLoc)}else if(i){if(this.prev<o.catchLoc)return r(o.catchLoc,!0)}else{if(!l)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return r(o.finallyLoc)}}}},abrupt:function(e,t){for(var r=this.tryEntries.length-1;r>=0;--r){var a=this.tryEntries[r];if(a.tryLoc<=this.prev&&n.call(a,"finallyLoc")&&this.prev<a.finallyLoc){var o=a;break}}o&&("break"===e||"continue"===e)&&o.tryLoc<=t&&t<=o.finallyLoc&&(o=null);var c=o?o.completion:{};return c.type=e,c.arg=t,o?(this.method="next",this.next=o.finallyLoc,h):this.complete(c)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),h},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var n=this.tryEntries[t];if(n.finallyLoc===e)return this.complete(n.completion,n.afterLoc),k(n),h}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var n=this.tryEntries[t];if(n.tryLoc===e){var r=n.completion;if("throw"===r.type){var a=r.arg;k(n)}return a}}throw new Error("illegal catch attempt")},delegateYield:function(e,t,n){return this.delegate={iterator:S(e),resultName:t,nextLoc:n},"next"===this.method&&(this.arg=void 0),h}},e}var v=Object(u.d)({key:"ComponentItemTable:User",get:function(e){return Object(m.a)(d().mark(function t(){var n;return d().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return n=fetch("https://jsonplaceholder.typicode.com/users/".concat(e)).then(function(e){return e.json()}).then(function(e){return e}),t.abrupt("return",n);case 2:case"end":return t.stop()}},t)}))}}),y=Object(p.c)("ComponentItemTable:queryState",{_page:{searchParamName:"page",parseSearchParam:function(e){return null===e?1:parseInt(e,10)}}},"ComponentItemTable:dataState",function(){var e=Object(m.a)(d().mark(function e(t){var n,r,a,o,c;return d().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.get,r=t.queryState,a=n(r),o=Object(p.b)(a),c=fetch("https://jsonplaceholder.typicode.com/posts?".concat(o)).then(function(e){return e.json()}).then(function(e){return e}),e.abrupt("return",c);case 5:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}()),g=Object(s.a)(y,2),b=g[0],E=g[1];var w=function(){b();var e={"#":function(e){return"".concat(e.id)},Title:function(e){return"".concat(e.title)},User:{title:function(e){return Object(u.f)(v(e.userId)).username},children:function(e){return Object(u.f)(v(e.userId)).name}}};return a.a.createElement(a.a.Fragment,null,a.a.createElement("h2",null,"Item"),a.a.createElement(p.a,{state:E,columns:e}))},j=n(12),x=n(3);function O(e){return e}var k=function(){return a.a.createElement("div",null,"Recoil")};var L=function(){return a.a.createElement("div",null,"Recoil Atom")};var S=function(){return a.a.createElement("div",null,"Recoil Selector")};var N=function(){return a.a.createElement("div",null,"React Router")},P=function e(t,n){var r=t.title,a=t.path,o=t.children,c=t.element,i={title:r,path:a,fullpath:n?"".concat("/"===n.fullpath?"":n.fullpath,"/").concat(a):""===a?"/":a,element:c};return Object(x.a)({},i,{children:o?o.map(function(t){return e(t,i)}):void 0})}({title:"React Playground",path:"",element:a.a.createElement(f,null),children:[{title:"React Router",path:"router",element:a.a.createElement(N,null)},{title:"Redux",path:"reduc",element:null},{title:"Recoil",path:"recoil",element:a.a.createElement(k,null),children:[{title:"Atom",path:"atom",element:a.a.createElement(L,null)},{title:"Selector",path:"selector",element:a.a.createElement(S,null)}]},{title:"Components",path:"components",element:a.a.createElement(h,null),children:[{title:"ItemTable",path:"item-table",element:a.a.createElement(w,null)}]}]}),I=(n(82),n(84),n(61)),_=n(69),F=n(65),R=n(66),T=n(48),C=n(47);function A(e){var t=e.title,n=e.children;return document.title=t||document.title,a.a.createElement(a.a.Fragment,null,a.a.createElement("header",null,a.a.createElement(T.a,{bg:"dark",variant:"dark",expand:"md"},a.a.createElement(_.a,null,a.a.createElement(T.a.Brand,{href:P.fullpath},P.title),a.a.createElement(T.a.Toggle,{"aria-controls":"navbarScroll"}),a.a.createElement(T.a.Collapse,{id:"navbarScroll"},a.a.createElement(R.a,{className:"me-auto my-2 my-lg-0",style:{maxHeight:"100px"},navbarScroll:!0},void 0===P.children?a.a.createElement(a.a.Fragment,null):P.children.map(function(e,t){return a.a.createElement("div",{key:t},void 0===e.children?a.a.createElement(R.a.Link,{href:e.fullpath,disabled:null===e.element},e.title):a.a.createElement(C.a,{title:e.title,id:"navbarScrollingDropdown"},a.a.createElement(C.a.Item,{href:e.fullpath,disabled:null===e.element},e.title),a.a.createElement(C.a.Divider,null),e.children.map(function(e,t){return a.a.createElement(C.a.Item,{key:t,href:e.fullpath,disabled:null===e.element},e.title)})))})),a.a.createElement(F.a,{className:"d-flex"},a.a.createElement(F.a.Control,{type:"search",placeholder:"Search",className:"me-2","aria-label":"Search"}),a.a.createElement(I.a,{variant:"outline-success"},"Search")))))),a.a.createElement("main",{role:"main",className:"container"},n||a.a.createElement(a.a.Fragment,null,a.a.createElement("h1",{className:"mt-5"},"Sticky footer with fixed navbar"),a.a.createElement("p",{className:"lead"},"Pin a fixed-height footer to the bottom of the viewport in desktop browsers with this custom HTML and CSS. A fixed navbar has been added with ",a.a.createElement("code",null,"padding-top: 60px;")," on the ",a.a.createElement("code",null,"body > .container"),"."),a.a.createElement("p",null,"Back to ",a.a.createElement("a",{href:"../sticky-footer/"},"the default sticky footer")," minus the navbar."))),a.a.createElement("footer",{className:"footer"},a.a.createElement("div",{className:"container"},a.a.createElement("span",{className:"text-muted"},"Place sticky footer content here."))))}var G=function(e){e&&e instanceof Function&&n.e(1).then(n.bind(null,97)).then(function(t){var n=t.getCLS,r=t.getFID,a=t.getFCP,o=t.getLCP,c=t.getTTFB;n(e),r(e),a(e),o(e),c(e)})},B=Object(i.b)([function e(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:O,r=t.path,a=t.element,o=t.children,c=n(a);return void 0===o?{path:r,element:c}:{path:r,children:[{path:r,element:c,index:!0}].concat(Object(j.a)(o.map(function(t){return e(t,n)})))}}(P,function(e){return a.a.createElement(A,null,e)})]);c.a.createRoot(document.getElementById("root")).render(a.a.createElement(a.a.StrictMode,null,a.a.createElement(u.a,null,a.a.createElement(l.b,{router:B})))),G()}},[[72,3,2]]]);
//# sourceMappingURL=main.97c49e1c.chunk.js.map