// ==UserScript==
// @name         Moodle Open in new tab or Download File
// @namespace    https://main.elearning.uni-obuda.hu/course/view.php?id=*
// @version      1.0
// @description  Add "Open in New Tab" and "Download" buttons to resource file links
// @author       py-snake
// @match        https://main.elearning.uni-obuda.hu/course/view.php?id=*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Function to add buttons
    function addButtons(linkElement) {
        // Create a new container for the buttons (outside the link's parent)
        const buttonContainer = document.createElement('div');
        buttonContainer.style.display = 'flex';
        buttonContainer.style.gap = '10px';
        buttonContainer.style.marginTop = '10px'; // Add some spacing

        // Create "Open in New Tab" button
        const openButton = document.createElement('button');
        openButton.innerText = 'Open in New Tab';
        openButton.style.padding = '5px 10px';
        openButton.style.backgroundColor = '#007bff';
        openButton.style.color = '#fff';
        openButton.style.border = 'none';
        openButton.style.borderRadius = '4px';
        openButton.style.cursor = 'pointer';
        openButton.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior
            event.stopPropagation(); // Stop event bubbling
            window.open(linkElement.href, '_blank'); // Open in new tab
        });

        // Create "Download" button
        const downloadButton = document.createElement('button');
        downloadButton.innerText = 'Download';
        downloadButton.style.padding = '5px 10px';
        downloadButton.style.backgroundColor = '#28a745';
        downloadButton.style.color = '#fff';
        downloadButton.style.border = 'none';
        downloadButton.style.borderRadius = '4px';
        downloadButton.style.cursor = 'pointer';
        downloadButton.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior
            event.stopPropagation(); // Stop event bubbling
            const downloadLink = document.createElement('a');
            downloadLink.href = linkElement.href;
            downloadLink.download = linkElement.innerText.trim() || 'file'; // Set download filename
            document.body.appendChild(downloadLink);
            downloadLink.click(); // Trigger download
            document.body.removeChild(downloadLink);
        });

        // Append buttons to the container
        buttonContainer.appendChild(openButton);
        buttonContainer.appendChild(downloadButton);

        // Insert the button container after the link's grandparent element
        const linkParent = linkElement.closest('.activitytitle');
        if (linkParent) {
            linkParent.parentNode.insertBefore(buttonContainer, linkParent.nextSibling);
        }
    }

    // Find all resource links
    const resourceLinks = document.querySelectorAll('li.activity.modtype_resource a.aalink[href*="/mod/resource/view.php"]');

    if (resourceLinks.length > 0) {
        resourceLinks.forEach(link => {
            addButtons(link);
        });
    } else {
        console.warn('No resource links found!');
    }
})();
