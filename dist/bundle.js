(()=>{"use strict";const t={textPosition:0,speed:100},e=document.querySelector("body"),o=document.querySelector(".question--textbox"),n=document.querySelector(".chatgpt-response"),r=document.querySelector(".send-btn--container"),s=document.querySelector(".material-symbols-outlined"),i=document.querySelector(".chatgpt-logo");function c(e,o){t.textPosition>=o||(n.textContent+=e[t.textPosition],t.textPosition++,setTimeout(c,t.speed,e,o))}s.style.color="#6b6c7b",o.addEventListener("input",(t=>{""===t.target.value.trim()?(r.style.backgroundColor="transparent",s.style.color="#6b6c7b"):(r.style.backgroundColor="#19c37d",s.style.color="white")})),e.insertAdjacentHTML("beforeend",'\n<footer>\n  <div class="footer-container">\n    <p id="footer-text" class="text-center">&copy; <span id="current-year"></span> Caleb Sakala</p>\n  </div>\n</footer>');const a=(new Date).getFullYear();document.getElementById("current-year").textContent=a;const l=document.getElementsByTagName("textarea");for(let t=0;t<l.length;t++)l[t].setAttribute("style","height:"+l[t].scrollHeight+"px;overflow-y:hidden;"),l[t].addEventListener("input",d,!1);function d(){this.style.height=0,this.style.height=this.scrollHeight+"px"}var u;u=async function(e,o){t.textPosition=0,e.textContent="";const n=o.value.trim(),r=JSON.stringify({question:n}),{response:s}=await async function(t){const e=await fetch("https://onewordgpt2.ue.r.appspot.com/answer",{method:"POST",headers:{"Content-Type":"application/json"},body:t});return await e.json()}(r);c(s,s.length)},o.addEventListener("keydown",(function(t){13===t.keyCode&&(i.style.opacity=100,t.preventDefault(),u(n,o))}))})();