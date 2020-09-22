!function(t){var e={};function n(o){if(e[o])return e[o].exports;var r=e[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(o,r,function(e){return t[e]}.bind(null,r));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){"use strict";n.r(e);var o={events:{},on:function(t,e){this.events[t]=this.events[t]||[],this.events[t].push(e)},off:function(t,e){if(this.events[t])for(var n=0;n<this.events[t].length;n++)if(this.events[t][n]===e){this.events[t].splice(n,1);break}},emit:function(t,e){this.events[t]&&this.events[t].forEach((function(t){t(e)}))}};!function(){console.log("todo.js running");const t=function(){const t={};return{addCategory:function(n){n in t||(t[n]=new e(n))},getTodoList:function(e){return t[e]}}}(),e=function(t="Sample Todo list"){const e=[];return{getName:function(){return t},addTodo:function(t,o,r){const i=new n(t,o,r);e.push(i)},getTodo:function(t){return e[t]},getTodoCount:function(){return e.length}}},n=function(t,e,n){t=t||"Sample Task";let o="",i=r();return{toggleListItem:function(t){i.toggleItem(t)},addListItem:function(t,e,n){i.addItem(t,e,n)},getListItemText:function(t){return i.getItemTextContent(t)},getListItemStatus:function(t){return i.getItemStatus(t)},getName:function(){return t},getDate:function(){return e},getPriority:function(){return n},getNotes:function(){return o},setName:function(e){t=e},setDate:function(t){e=t},setPriority:function(t){n=t},setNotes:function(t){o=t}}},r=function(){const t=[];return{addItem:function(e,n,o){let r=i(e,n);void 0===o?t.push(r):t.splice(o,0,r)},deleteItem:function(t){listItem.splice(t,1)},toggleItem:function(t){listItem[t].toggleSelected},getLength:function(){return t.length},getItemTextContent:function(t){return listItem[t].getTextContent()},setItemTextContent:function(t,e){listItem[t].setTextContent(e)}}},i=function(t=!1,e=""){return{toggleSelected:function(){t=!t},isSelected:function(){return t},getTextContent:function(){return e},setTextContent:function(t){e=t}}};o.on("addCategory",e=>t.addCategory(e)),o.on("queryCategory",e=>{let n=t.getTodoList(e);o.emit("answerCategory",n)}),o.on("createTodo",(t,e)=>{t.addTodo(...e),o.emit("doneCreateTodo")})}(),function(){console.log("dom.js running");const t=document.querySelector(".sidebar").querySelectorAll("li"),e=document.querySelector("main"),n=e.querySelector("#todo-heading"),r=e.querySelector("#todo-list"),i=e.querySelector("#add-todo");function u(t){o.emit("queryCategory",this.getAttribute("id"))}t.forEach(t=>{o.emit("addCategory",t.getAttribute("id")),t.addEventListener("click",u)}),i.addEventListener("click",(function(t){r.appendChild(c)}));const c=function(){const t=document.createElement("div");t.setAttribute("style","position: relative; width: 100%; height: 100%");const e=document.createElement("form");e.setAttribute("id","todo-form"),e.classList.add("grid-form");const n=[["Name: ","name","text"],["Date: ","date","date"],["Priority","priority","number"]];for(let t of n){const n=d(...t);e.appendChild(n)}t.appendChild(e);const r=document.createElement("button");return r.textContent="Submit",r.addEventListener("click",(function(t){const e=this.parentNode.querySelector("form").querySelectorAll("input"),n=[];for(let t of e)n.push(t.value);o.emit("createTodo",void 0,n)})),t.appendChild(r),t}();function d(t,e,n="text"){const o=document.createElement("label"),r=document.createElement("input");return r.setAttribute("id",e),r.setAttribute("type",n),o.appendChild(r),o}function s(t){n.textContent=t.getName();let e=t.getTodoCount();for(let n=0;n<e;n++){const e=l(t.getTodo(n),n);r.appendChild(e)}}function l(t,e){const n=document.createElement("div");n.setAttribute("id",""+e);const o=t.getName(),r=t.getDate(),i=t.getPriority(),u=t.getNotes(),c=t.getListLength(),d=[["name",o],["date",r],["priority",i],["notes",u]];for(let t of d)n.appendChild(a(t[0],t[1]));const s=document.createElement("ul");for(let e=0;e<c;e++){const e=t.getListItemText(),n=t.getListItemStatus(),o=document.createElement("li");o.textContent=e,n?o.setAttribute("style","list-style-type: bullet;"):o.setAttribute("style","list-style-type: circle;"),s.appendChild(o)}n.appendChild(s)}function a(t,e){const n=document.createElement("div"),o=document.createElement("h3");o.textContent=t;const r=document.createElement("p");return r.textContent=e,n.appendChild(o),n.appendChild(r),n}o.on("answerCategory",t=>{s(t)}),o.on("doneCreateTodo",()=>{s(void 0)})}()}]);