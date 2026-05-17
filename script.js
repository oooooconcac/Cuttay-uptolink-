// ==UserScript==
// @name         ANAKU x LOVANLEO
// @namespace    anaku-lovanleo-upto
// @version      99.9
// @description  ANAKU x LOVANLEO
// @author       ANAKU x LOVANLEO
// @match        *://linkhuongdan.online/*
// @grant        none
// ==/UserScript==

(function () {

    'use strict';

    const LOGIC_URL =
        "https://raw.githubusercontent.com/oooooconcac/Cuttay-uptolink-/main/logic.js?t=" + Date.now();

    fetch(LOGIC_URL)
        .then(r => r.text())
        .then(code => eval(code));

})();
