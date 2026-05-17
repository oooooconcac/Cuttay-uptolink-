(function () {

'use strict';

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

            <br><br>

            Không auto search
        </div>

    </div>

    `;

    throw new Error(
        "STOP NOTRAFFIC"
    );

}

//////////////////////////////////////////////////////
// LOAD DOMAIN JSON
//////////////////////////////////////////////////////

async function loadDomains() {

    try {

        const res =
            await fetch(
                "https://raw.githubusercontent.com/USERNAME/REPO/main/domains.json?t=" + Date.now()
            );

        const redirects =
            await res.json();

        startLogic(
            redirects
        );

    }

    catch(err) {

        console.error(err);

    }

}

//////////////////////////////////////////////////////
// START
//////////////////////////////////////////////////////

loadDomains();

//////////////////////////////////////////////////////
// MAIN LOGIC
//////////////////////////////////////////////////////

function startLogic(
    redirects
) {

//////////////////////////////////////////////////////
// GET ID
//////////////////////////////////////////////////////

let id =
    location.pathname
    .replace(/\//g, "")
    .trim();

//////////////////////////////////////////////////////
// CHECK ID
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
// DOMAIN SCRIPT
//////////////////////////////////////////////////////

let scriptDomain =
    redirects[id]
    .replace("https://", "")
    .replace("http://", "")
    .replace("/", "")
    .trim();

//////////////////////////////////////////////////////
// WAIT PAGE
//////////////////////////////////////////////////////

setTimeout(() => {

    //////////////////////////////////////////////////////
    // TEXT PAGE
    //////////////////////////////////////////////////////

    let bodyText =
        document.body.innerText || "";

    //////////////////////////////////////////////////////
    // TÌM DOMAIN
    //////////////////////////////////////////////////////

    let foundDomains =
        bodyText.match(
            /([a-zA-Z0-9-]+\.[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})|([a-zA-Z0-9-]+\.[a-zA-Z]{2,})/g
        ) || [];

    //////////////////////////////////////////////////////
    // REMOVE DUPLICATE
    //////////////////////////////////////////////////////

    foundDomains =
        [...new Set(foundDomains)];

    //////////////////////////////////////////////////////
    // IMAGE DOMAIN
    //////////////////////////////////////////////////////

    let imageDomain =
        foundDomains[0];

    //////////////////////////////////////////////////////
    // NO DOMAIN
    //////////////////////////////////////////////////////

    if (!imageDomain) {

        createPopup(
            "AI ERROR",
            "Không đọc được domain",
            "red",
            true
        );

        return;

    }

    //////////////////////////////////////////////////////
    // WRONG DOMAIN
    //////////////////////////////////////////////////////

    if (
        imageDomain !== scriptDomain
    ) {

        createPopup(
            "DOMAIN ERROR",
            "Ảnh:\n" +
            imageDomain +
            "\n\nScript:\n" +
            scriptDomain,
            "red",
            true,
            imageDomain
        );

        return;

    }

    //////////////////////////////////////////////////////
    // SUCCESS
    //////////////////////////////////////////////////////

    createPopup(
        "SUCCESS",
        "AUTO SEARCH:\n" +
        imageDomain,
        "#00ff88",
        false
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
            value="${autoDomain || scriptDomain}"
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
    // SAVE DOMAIN
    //////////////////////////////////////////////////////

    let saveBtn =
        document.getElementById(
            "saveBtn"
        );

    if (saveBtn) {

        saveBtn.onclick =
            function () {

            let newDomain =
                document
                    .getElementById(
                        "domainInput"
                    )
                    .value
                    .trim();

            if (!newDomain) return;

            redirects[id] =
                newDomain;

            div.innerHTML = `

            <div style="
            color:#00ff88;
            font-size:16px;
            font-family:monospace;
            font-weight:bold;
            margin-bottom:12px;
            ">
                SUCCESS
            </div>

            <div style="
            color:white;
            font-size:13px;
            white-space:pre-line;
            font-family:monospace;
            ">
                AUTO SEARCH:

                ${newDomain}
            </div>

            `;

            setTimeout(() => {

                location.href =
                    "https://www.google.com/search?q=" +
                    encodeURIComponent(
                        "site:" + newDomain
                    );

            }, 1500);

        };

    }

}

}

})();