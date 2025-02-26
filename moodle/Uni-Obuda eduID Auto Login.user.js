// ==UserScript==
// @name         Uni-Obuda eduID Auto Login
// @namespace    https://idp.uni-obuda.hu
// @version      1.0
// @description  Automatically fills in the username and password, clicks the login button, clicks the "Yes, continue" button, and redirects to the courses page.
// @author       py-snake
// @match        https://idp.uni-obuda.hu/saml2/module.php/core/loginuserpass.php*
// @match        https://idp.uni-obuda.hu/saml2/module.php/consent/getconsent.php*
// @match        https://main.elearning.uni-obuda.hu/
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_registerMenuCommand
// ==/UserScript==

(function () {
    'use strict';

    // Function to show a popup and save credentials
    function saveCredentials() {
        const username = prompt("Enter your username:");
        if (username === null) return;

        const password = prompt("Enter your password:");
        if (password === null) return;

        const confirmSave = confirm("Warning: Your credentials will be stored securely. Save them?");
        if (confirmSave) {
            GM_setValue("username", username);
            GM_setValue("password", password);
            alert("Credentials saved!");
        } else {
            alert("Credentials not saved.");
        }
    }

    // Function to auto-fill the form and login
    function autoLogin() {
        const username = GM_getValue("username");
        const password = GM_getValue("password");

        if (!username || !password) {
            console.log("No saved credentials found.");
            return;
        }

        const checkForm = setInterval(() => {
            const usernameField = document.getElementById("username");
            const passwordField = document.getElementById("password");
            const loginButton = document.getElementById("submit_button");

            if (usernameField && passwordField && loginButton) {
                clearInterval(checkForm);
                usernameField.value = username;
                passwordField.value = password;
                loginButton.click();
                console.log("Login form submitted.");
            }
        }, 500);
    }

    // Function to auto-click the "Yes, continue" button on the consent page
    function autoClickConsent() {
        const checkButton = setInterval(() => {
            const yesButton = document.getElementById("yesbutton");
            if (yesButton) {
                clearInterval(checkButton);
                yesButton.click();
                console.log("Consent button clicked.");
            }
        }, 500);
    }

    // Function to redirect from homepage to courses page
    function redirectFromHomepage() {
        if (window.location.href === "https://main.elearning.uni-obuda.hu/") {
            window.location.href = "https://main.elearning.uni-obuda.hu/my/courses.php";
        }
    }

    // Function to offer saving credentials
    function offerSaveCredentials() {
        const loginButton = document.getElementById("submit_button");
        if (loginButton) {
            loginButton.addEventListener("click", () => {
                const username = document.getElementById("username").value;
                const password = document.getElementById("password").value;

                if (username && password && !GM_getValue("username")) {
                    const confirmSave = confirm("Save credentials for future logins?");
                    if (confirmSave) {
                        GM_setValue("username", username);
                        GM_setValue("password", password);
                        alert("Credentials saved!");
                    }
                }
            });
        }
    }

    // Add menu command
    GM_registerMenuCommand("Save Username and Password", saveCredentials);

    // Run appropriate function based on page
    if (window.location.href.includes("/core/loginuserpass.php")) {
        const username = GM_getValue("username");
        const password = GM_getValue("password");
        if (username && password) {
            autoLogin();
        } else {
            offerSaveCredentials();
        }
    } else if (window.location.href.includes("/consent/getconsent.php")) {
        autoClickConsent();
    } else if (window.location.href === "https://main.elearning.uni-obuda.hu/") {
        redirectFromHomepage();
    }
})();
