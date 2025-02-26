// ==UserScript==
// @name         OE Moodle Header Modifier
// @namespace    https://main.elearning.uni-obuda.hu/*
// @version      1.0
// @description  Replace the Moodle link with a direct link to the main page and remove the address header
// @author       py-snake
// @match        https://main.elearning.uni-obuda.hu/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Function to replace the Moodle link
    function replaceMoodleLink() {
        const linkElement = document.querySelector('a.navbar-brand.has-logo[href="https://main.elearning.uni-obuda.hu/?redirect=0"]');
        if (linkElement) {
            linkElement.href = "https://main.elearning.uni-obuda.hu/my/courses.php";
        }
    }

    function removeAddressHeader() {
    const addressHeader = document.querySelector('nav.nav.navbar-nav.hidden-md-down.address-head');
    if (addressHeader) {
        // Create the new element to replace the address header
        const newElement = document.createElement('a');
        newElement.href = "https://main.elearning.uni-obuda.hu/my/courses.php";
        newElement.className = "navbar-brand has-logo";

        const logoSpan = document.createElement('span');
        logoSpan.className = "logo";

        const logoImg = document.createElement('img');
        logoImg.src = "//main.elearning.uni-obuda.hu/pluginfile.php/1/theme_academi/logo/1739349976/O%CC%81budai_Egyetem_LOGO_KEK.png";
        logoImg.alt = "Main Moodle";

        // Create a container for the logo with a white background
        const logoContainer = document.createElement('div');
        logoContainer.style.backgroundColor = "white"; // Set background color to white
        logoContainer.style.display = "inline-block"; // Ensure it doesn't break layout
        logoContainer.style.padding = "5px"; // Add some padding for better appearance
        logoContainer.appendChild(logoImg); // Add the logo image inside the container

        // Build the new element structure
        logoSpan.appendChild(logoContainer); // Add the container to the logo span
        newElement.appendChild(logoSpan); // Add the logo span to the new element

        // Replace the address header with the new element
        addressHeader.replaceWith(newElement);
    }
}

    // Run both functions
    replaceMoodleLink();
    removeAddressHeader();
})();
