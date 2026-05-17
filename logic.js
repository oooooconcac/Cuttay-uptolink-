(function () {

'use strict';

//////////////////////////////////////////////////////
// TOKEN
//////////////////////////////////////////////////////

const TOKEN =
    "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";

//////////////////////////////////////////////////////
// QQ CHECK
//////////////////////////////////////////////////////

let params =
    new URLSearchParams(
        location.search
    );

let qq =
    params.get("qq");

//////////////////////////////////////////////////////
// NOTRAFFIC
//////////////////////////////////////////////////////

if (qq === "notraffic") {

    document.body.innerHTML = `

    <div style="
    position:fixed;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
    width:280px;
    background:#0d1117;
    border:1px solid red;
    border-radius:14px;
    padding:20px;
    z-index:999999999;
    font-family:monospace;
    box-shadow:0 0 25px red;
    text-align:center;
    ">

        <div style="
        color:red;
        font-size:22px;
        font-weight:bold;
        margin-bottom:15px;
        ">
            HẾT MÃ
        </div>

        <div style="
        color:white;
        font-size:14px;
        line-height:1.6;
        ">
            Link đã hết traffic
        </div>

    </div>

    `;

    throw new Error(
        "STOP NOTRAFFIC"
    );

}

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
            "https://raw.githubusercontent.com/oooooconcac/Cuttay-uptolink-/main/domains.json?t=" +
            Date.now()
        );

    redirects =
        await res.json();

}

//////////////////////////////////////////////////////
// START
//////////////////////////////////////////////////////

async function start() {

    await loadDomains();

    //////////////////////////////////////////////////////
    // GET ID
    //////////////////////////////////////////////////////

    let id =
        location.pathname
        .replace(/\//g, "")
        .trim();

    //////////////////////////////////////////////////////
    // CHECK
    //////////////////////////////////////////////////////

    if (!redirects[id]) {

        createPopup(
            "ERROR",
            "Không có domain cho ID",
            "red",
            true
        );

        return;

    }

    //////////////////////////////////////////////////////
    // DOMAIN
    //////////////////////////////////////////////////////

    let scriptDomain =
        redirects[id]
        .replace("https://", "")
        .replace("http://", "")
        .replace("/", "")
        .trim();

    //////////////////////////////////////////////////////
    // SUCCESS
    //////////////////////////////////////////////////////

    createPopup(
        "SUCCESS",
        "Đúng domain:\n" +
        scriptDomain,
        "#00ff88",
        false
    );

}

//////////////////////////////////////////////////////
// POPUP
//////////////////////////////////////////////////////

function createPopup(
    title,
    text,
    color,
    forceEdit,
    autoDomain = ""
) {

    let old =
        document.getElementById(
            "pythonPopup"
        );

    if (old) old.remove();

    let div =
        document.createElement(
            "div"
        );

    div.id = "pythonPopup";

    let editHtml = "";

    if (forceEdit) {

        editHtml = `

        <input
            id="domainInput"
            value="${autoDomain}"
        >

        <button id="saveBtn">
            SỬA DOMAIN
        </button>

        `;

    }

    div.innerHTML = `

    <div class="title">
        ${title}
    </div>

    <div class="text">
        ${text}
    </div>

    ${editHtml}

    `;

    document.body.appendChild(div);

    let style =
        document.createElement(
            "style"
        );

    style.innerHTML = `

    #pythonPopup{
        position:fixed;
        top:15px;
        right:15px;
        width:270px;
        background:#0d1117;
        border:1px solid ${color};
        border-radius:12px;
        padding:15px;
        z-index:999999999;
        font-family:monospace;
        box-shadow:0 0 20px ${color};
    }

    #pythonPopup .title{
        color:${color};
        font-size:16px;
        font-weight:bold;
        margin-bottom:12px;
    }

    #pythonPopup .text{
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

    #saveBtn{
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

    //////////////////////////////////////////////////////
    // SAVE
    //////////////////////////////////////////////////////

    let saveBtn =
        document.getElementById(
            "saveBtn"
        );

    if (saveBtn) {

        saveBtn.onclick =
        async function () {

            let id =
                location.pathname
                .replace(/\//g, "")
                .trim();

            let newDomain =
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
                    "https://api.github.com/repos/oooooconcac/Cuttay-uptolink-/contents/domains.json",
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
                "https://api.github.com/repos/oooooconcac/Cuttay-uptolink-/contents/domains.json",
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
                            "update domain " + id,

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

            div.innerHTML = `

            <div style="
            color:#00ff88;
            font-size:18px;
            font-family:monospace;
            font-weight:bold;
            margin-bottom:12px;
            ">
                GITHUB UPDATED
            </div>

            <div style="
            color:white;
            font-size:13px;
            white-space:pre-line;
            font-family:monospace;
            ">
                ${id}

                →

                ${newDomain}
            </div>

            `;

        };

    }

}

//////////////////////////////////////////////////////
// RUN
//////////////////////////////////////////////////////

start();

})();
