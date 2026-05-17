(function () {

'use strict';

//////////////////////////////////////////////////////
// TOKEN
//////////////////////////////////////////////////////

const TOKEN =
"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";

//////////////////////////////////////////////////////
// REPO
//////////////////////////////////////////////////////

const REPO =
"oooooconcac/Cuttay-uptolink-";

//////////////////////////////////////////////////////
// AVATAR
//////////////////////////////////////////////////////

const AVATAR =
"https://raw.githubusercontent.com/oooooconcac/Cuttay-uptolink-/main/avatar.png";

//////////////////////////////////////////////////////
// DATABASE
//////////////////////////////////////////////////////

let redirects = {};

//////////////////////////////////////////////////////
// LOAD DOMAINS
//////////////////////////////////////////////////////

async function loadDomains() {

    const res =
    await fetch(
        "https://raw.githubusercontent.com/" +
        REPO +
        "/main/domains.json?t=" +
        Date.now()
    );

    redirects =
    await res.json();

}

//////////////////////////////////////////////////////
// START
//////////////////////////////////////////////////////

async function start() {

    //////////////////////////////////////////////////////
    // LOAD
    //////////////////////////////////////////////////////

    await loadDomains();

    //////////////////////////////////////////////////////
    // PARAM
    //////////////////////////////////////////////////////

    const params =
    new URLSearchParams(
        location.search
    );

    const qq =
    params.get("qq");

    //////////////////////////////////////////////////////
    // ID
    //////////////////////////////////////////////////////

    const id =
    location.pathname
    .replace(/\//g, "")
    .trim();

    //////////////////////////////////////////////////////
    // NOTRAFFIC
    //////////////////////////////////////////////////////

    if (qq === "notraffic") {

        createPopup(
            "HẾT MÃ",
            "Link đã hết traffic",
            "red"
        );

        return;

    }

    //////////////////////////////////////////////////////
    // NO ID
    //////////////////////////////////////////////////////

    if (!redirects[id]) {

        createEditPopup(
            "unknown",
            "unknown",
            id
        );

        return;

    }

    //////////////////////////////////////////////////////
    // DOMAIN
    //////////////////////////////////////////////////////

    const scriptDomain =
    redirects[id];

    //////////////////////////////////////////////////////
    // START POPUP
    //////////////////////////////////////////////////////

    createPopup(
        "AI SYSTEM",
        "Đang check domain...\n\nID: " + id,
        "#00ff88"
    );

    //////////////////////////////////////////////////////
    // WAIT
    //////////////////////////////////////////////////////

    setTimeout(() => {

        //////////////////////////////////////////////////////
        // TEXT
        //////////////////////////////////////////////////////

        const text =
        document.body.innerText || "";

        //////////////////////////////////////////////////////
        // FIND
        //////////////////////////////////////////////////////

        const domains =
        text.match(
            /([a-zA-Z0-9-]+\.[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g
        ) || [];

        //////////////////////////////////////////////////////
        // IMAGE DOMAIN
        //////////////////////////////////////////////////////

        let imageDomain = null;

        //////////////////////////////////////////////////////
        // LOOP
        //////////////////////////////////////////////////////

        domains.forEach(d => {

            if (
                d.includes(".")
            ) {

                imageDomain = d;

            }

        });

        //////////////////////////////////////////////////////
        // NOT FOUND
        //////////////////////////////////////////////////////

        if (!imageDomain) {

            createPopup(
                "AI ERROR",
                "Không tìm thấy domain",
                "red"
            );

            return;

        }

        //////////////////////////////////////////////////////
        // WRONG DOMAIN
        //////////////////////////////////////////////////////

        if (
            imageDomain !== scriptDomain
        ) {

            createEditPopup(
                imageDomain,
                scriptDomain,
                id
            );

            return;

        }

        //////////////////////////////////////////////////////
        // SUCCESS
        //////////////////////////////////////////////////////

        createPopup(
            "SUCCESS",
            "Đúng domain:\n" +
            imageDomain +
            "\n\nAUTO SEARCH...",
            "#00ff88"
        );

        //////////////////////////////////////////////////////
        // SEARCH
        //////////////////////////////////////////////////////

        setTimeout(() => {

            location.href =
            "https://www.google.com/search?q=" +
            encodeURIComponent(
                "site:" + imageDomain
            );

        }, 1500);

    }, 3000);

}

//////////////////////////////////////////////////////
// POPUP
//////////////////////////////////////////////////////

function createPopup(
    title,
    text,
    color
) {

    removeOld();

    const div =
    document.createElement("div");

    div.id = "pythonPopup";

    div.innerHTML = `

    <div style="text-align:center;">

        <img src="${AVATAR}" class="avatar">

    </div>

    <div class="title">
        ${title}
    </div>

    <div class="text">
        ${text}
    </div>

    <button id="hideBtn">
        ẨN
    </button>

    `;

    document.body.appendChild(div);

    addStyle(color);

    document
    .getElementById("hideBtn")
    .onclick = () => div.remove();

}

//////////////////////////////////////////////////////
// EDIT POPUP
//////////////////////////////////////////////////////

function createEditPopup(
    imageDomain,
    scriptDomain,
    id
) {

    removeOld();

    const div =
    document.createElement("div");

    div.id = "pythonPopup";

    div.innerHTML = `

    <div style="text-align:center;">

        <img src="${AVATAR}" class="avatar">

    </div>

    <div class="title">
        DOMAIN ERROR
    </div>

    <div class="text">

ẢNH:
${imageDomain}

SCRIPT:
${scriptDomain}

ID:
${id}

    </div>

    <input
        id="domainInput"
        value="${imageDomain}"
    >

    <button id="saveBtn">
        SỬA DOMAIN
    </button>

    `;

    document.body.appendChild(div);

    addStyle("red");

    //////////////////////////////////////////////////////
    // SAVE
    //////////////////////////////////////////////////////

    document
    .getElementById("saveBtn")
    .onclick =
    async () => {

        const newDomain =
        document
        .getElementById(
            "domainInput"
        )
        .value
        .trim();

        if (!newDomain) return;

        //////////////////////////////////////////////////////
        // GET FILE
        //////////////////////////////////////////////////////

        const getFile =
        await fetch(
            "https://api.github.com/repos/" +
            REPO +
            "/contents/domains.json",
            {

                headers: {

                    Authorization:
                    "Bearer " + TOKEN,

                    Accept:
                    "application/vnd.github+json"

                }

            }
        );

        const fileData =
        await getFile.json();

        //////////////////////////////////////////////////////
        // JSON
        //////////////////////////////////////////////////////

        let json =
        JSON.parse(
            atob(
                fileData.content
            )
        );

        //////////////////////////////////////////////////////
        // UPDATE
        //////////////////////////////////////////////////////

        json[id] =
        newDomain;

        //////////////////////////////////////////////////////
        // PUSH
        //////////////////////////////////////////////////////

        await fetch(
            "https://api.github.com/repos/" +
            REPO +
            "/contents/domains.json",
            {

                method: "PUT",

                headers: {

                    Authorization:
                    "Bearer " + TOKEN,

                    Accept:
                    "application/vnd.github+json",

                    "Content-Type":
                    "application/json"

                },

                body: JSON.stringify({

                    message:
                    "update " + id,

                    content:
                    btoa(
                        JSON.stringify(
                            json,
                            null,
                            2
                        )
                    ),

                    sha:
                    fileData.sha

                })

            }
        );

        //////////////////////////////////////////////////////
        // SUCCESS
        //////////////////////////////////////////////////////

        createPopup(
            "GITHUB UPDATED",
            id +
            "\n\n→\n\n" +
            newDomain,
            "#00ff88"
        );

    };

}

//////////////////////////////////////////////////////
// REMOVE
//////////////////////////////////////////////////////

function removeOld() {

    const old =
    document.getElementById(
        "pythonPopup"
    );

    if (old) old.remove();

}

//////////////////////////////////////////////////////
// STYLE
//////////////////////////////////////////////////////

function addStyle(color) {

    const old =
    document.getElementById(
        "pythonStyle"
    );

    if (old) old.remove();

    const style =
    document.createElement("style");

    style.id = "pythonStyle";

    style.innerHTML = `

    #pythonPopup{
        position:fixed;
        top:15px;
        right:15px;
        width:270px;
        background:#0d1117;
        border:1px solid ${color};
        border-radius:14px;
        padding:15px;
        z-index:999999999;
        font-family:monospace;
        box-shadow:0 0 20px ${color};
    }

    .avatar{
        width:55px;
        height:55px;
        border-radius:50%;
        object-fit:cover;
        border:2px solid #00ff88;
        margin-bottom:10px;
        box-shadow:0 0 15px #00ff88;
    }

    .title{
        color:${color};
        font-size:16px;
        font-weight:bold;
        margin-bottom:12px;
        text-align:center;
    }

    .text{
        color:white;
        font-size:13px;
        white-space:pre-line;
        word-break:break-all;
        margin-bottom:12px;
    }

    #domainInput{
        width:100%;
        height:38px;
        background:#161b22;
        border:1px solid #30363d;
        border-radius:8px;
        color:#00ff88;
        font-family:monospace;
        font-size:13px;
        padding:8px;
        box-sizing:border-box;
        margin-bottom:10px;
    }

    #saveBtn,
    #hideBtn{
        width:100%;
        height:38px;
        background:#00ff88;
        border:none;
        border-radius:8px;
        font-family:monospace;
        font-size:14px;
        font-weight:bold;
        cursor:pointer;
    }

    `;

    document.head.appendChild(style);

}

//////////////////////////////////////////////////////
// RUN
//////////////////////////////////////////////////////

start();

})();
