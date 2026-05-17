// ==UserScript==
// @name         ANAKU x LOVANLEO
// @namespace    anaku-lovanleo
// @version      1000.0
// @description  AI DOMAIN VERIFY
// @author       ANAKU x LOVANLEO
// @match        *://linkhuongdan.online/*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        unsafeWindow
// @run-at       document-end
// ==/UserScript==

(function () {

'use strict';

//////////////////////////////////////////////////////
// AVATAR
//////////////////////////////////////////////////////

const AVATAR =
"https://raw.githubusercontent.com/oooooconcac/Cuttay-uptolink-/main/avatar.png";

//////////////////////////////////////////////////////
// QQ CHECK
//////////////////////////////////////////////////////

let params =
new URLSearchParams(location.search);

let qq =
params.get("qq");

if (qq === "notraffic") {

showPopup(
"HẾT MÃ",
"Link đã hết traffic",
"red"
);

throw new Error("STOP");

}

//////////////////////////////////////////////////////
// ID
//////////////////////////////////////////////////////

let id =
location.pathname
.replace(/\//g,"")
.trim();

//////////////////////////////////////////////////////
// DATABASE
//////////////////////////////////////////////////////

let redirects = {

"247-2": "28bet-club.com",
"248": "355.cn.com"

};

//////////////////////////////////////////////////////
// LOAD SAVED
//////////////////////////////////////////////////////

let saved =
GM_getValue(id) ||
localStorage.getItem(
"anaku_" + id
);

if(saved){

redirects[id] = saved;

}

//////////////////////////////////////////////////////
// CHECK
//////////////////////////////////////////////////////

if(!redirects[id]){

redirects[id] = "";

}

//////////////////////////////////////////////////////
// SCRIPT DOMAIN
//////////////////////////////////////////////////////

let scriptDomain =
(redirects[id] || "")
.replace("https://","")
.replace("http://","")
.replace(/\//g,"")
.trim()
.toLowerCase();

//////////////////////////////////////////////////////
// WAIT
//////////////////////////////////////////////////////

setTimeout(() => {

//////////////////////////////////////////////////////
// TEXT
//////////////////////////////////////////////////////

let text =
document.body.innerText || "";

//////////////////////////////////////////////////////
// FIND DOMAIN
//////////////////////////////////////////////////////

let domains =
text.match(
/([a-zA-Z0-9-]+\.[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g
) || [];

domains =
[...new Set(domains)];

//////////////////////////////////////////////////////
// IMAGE DOMAIN
//////////////////////////////////////////////////////

let imageDomain = null;

domains.forEach(d => {

d = d
.replace("https://","")
.replace("http://","")
.replace(/\//g,"")
.trim()
.toLowerCase();

if(d.includes(".")){

imageDomain = d;

}

});

//////////////////////////////////////////////////////
// NO DOMAIN
//////////////////////////////////////////////////////

if(!imageDomain){

showEditPopup(
"Không đọc được domain"
);

return;

}

//////////////////////////////////////////////////////
// DOMAIN KHÁC
//////////////////////////////////////////////////////

if(imageDomain !== scriptDomain){

showEditPopup(
"DOMAIN MỚI PHÁT HIỆN\n\n" +
imageDomain,
imageDomain
);

return;

}

//////////////////////////////////////////////////////
// SUCCESS
//////////////////////////////////////////////////////

showPopup(
"SUCCESS",
"Đúng domain\n\n" + imageDomain,
"#00ff88"
);

//////////////////////////////////////////////////////
// AUTO SEARCH
//////////////////////////////////////////////////////

setTimeout(() => {

location.href =
"https://www.google.com/search?q=" +
encodeURIComponent(
"site:" + imageDomain
);

},1500);

},3000);

//////////////////////////////////////////////////////
// POPUP
//////////////////////////////////////////////////////

function showPopup(
title,
text,
color
){

let old =
document.getElementById(
"anakuPopup"
);

if(old) old.remove();

let div =
document.createElement("div");

div.id = "anakuPopup";

div.innerHTML = `

<div class="box">

<img src="${AVATAR}">

<div class="title">
${title}
</div>

<div class="text">
${text}
</div>

</div>

`;

document.body.appendChild(div);

let style =
document.createElement("style");

style.innerHTML = `

#anakuPopup{
position:fixed;
top:15px;
right:15px;
z-index:999999999;
font-family:monospace;
}

#anakuPopup .box{
width:260px;
background:#0d1117;
border:1px solid ${color};
border-radius:14px;
padding:15px;
box-shadow:0 0 25px ${color};
}

#anakuPopup img{
width:70px;
height:70px;
border-radius:50%;
display:block;
margin:auto;
margin-bottom:12px;
object-fit:cover;
border:2px solid ${color};
}

#anakuPopup .title{
color:${color};
font-size:18px;
font-weight:bold;
text-align:center;
margin-bottom:10px;
}

#anakuPopup .text{
color:white;
font-size:13px;
white-space:pre-line;
word-break:break-word;
text-align:center;
}

`;

document.head.appendChild(style);

}

//////////////////////////////////////////////////////
// EDIT POPUP
//////////////////////////////////////////////////////

function showEditPopup(
text,
autoDomain = ""
){

let old =
document.getElementById(
"anakuPopup"
);

if(old) old.remove();

let div =
document.createElement("div");

div.id = "anakuPopup";

div.innerHTML = `

<div class="box">

<img src="${AVATAR}">

<div class="title">
LƯU DOMAIN
</div>

<div class="text">
${text}
</div>

<input
id="domainInput"
value="${autoDomain}"
>

<button id="saveBtn">
LƯU DOMAIN
</button>

</div>

`;

document.body.appendChild(div);

let style =
document.createElement("style");

style.innerHTML = `

#anakuPopup{
position:fixed;
top:15px;
right:15px;
z-index:999999999;
font-family:monospace;
}

#anakuPopup .box{
width:260px;
background:#0d1117;
border:1px solid red;
border-radius:14px;
padding:15px;
box-shadow:0 0 25px red;
}

#anakuPopup img{
width:70px;
height:70px;
border-radius:50%;
display:block;
margin:auto;
margin-bottom:12px;
object-fit:cover;
border:2px solid red;
}

#anakuPopup .title{
color:red;
font-size:18px;
font-weight:bold;
text-align:center;
margin-bottom:10px;
}

#anakuPopup .text{
color:white;
font-size:13px;
white-space:pre-line;
word-break:break-word;
margin-bottom:12px;
}

#domainInput{
width:100%;
height:40px;
background:#161b22;
border:1px solid #30363d;
border-radius:8px;
color:#00ff88;
font-size:13px;
font-family:monospace;
padding:10px;
box-sizing:border-box;
margin-bottom:10px;
}

#saveBtn{
width:100%;
height:40px;
border:none;
border-radius:8px;
background:#00ff88;
font-weight:bold;
font-family:monospace;
cursor:pointer;
}

`;

document.head.appendChild(style);

//////////////////////////////////////////////////////
// SAVE
//////////////////////////////////////////////////////

document
.getElementById("saveBtn")
.onclick = function(){

let newDomain =
document
.getElementById("domainInput")
.value
.trim()
.toLowerCase()
.replace("https://","")
.replace("http://","")
.replace(/\//g,"");

if(!newDomain) return;

//////////////////////////////////////////////////////
// SAVE
//////////////////////////////////////////////////////

try{

GM_setValue(id,newDomain);

localStorage.setItem(
"anaku_" + id,
newDomain
);

}catch(e){

localStorage.setItem(
"anaku_" + id,
newDomain
);

}

//////////////////////////////////////////////////////
// UPDATE
//////////////////////////////////////////////////////

redirects[id] = newDomain;

//////////////////////////////////////////////////////
// SUCCESS
//////////////////////////////////////////////////////

showPopup(
"SUCCESS",
"ĐÃ LƯU DOMAIN\n\n" + newDomain,
"#00ff88"
);

//////////////////////////////////////////////////////
// AUTO SEARCH
//////////////////////////////////////////////////////

setTimeout(() => {

location.href =
"https://www.google.com/search?q=" +
encodeURIComponent(
"site:" + newDomain
);

},1000);

};

}

})();
