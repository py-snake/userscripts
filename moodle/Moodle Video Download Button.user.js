// ==UserScript==
// @name         Moodle Video Download Button
// @namespace    https://main.elearning.uni-obuda.hu/
// @version      1.0
// @description  Adds a download button below videos to directly download the MP4 file.
// @author       py-snake
// @match        https://main.elearning.uni-obuda.hu/mod/page/view.php?id=*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Find the video element
    const video = document.querySelector('video');
    if (video) {
        const source = video.querySelector('source');
        if (source && source.src) {
            // Create the download button
            const downloadButton = document.createElement('button');
            downloadButton.textContent = 'Download Video';
            downloadButton.style.position = 'absolute';
            downloadButton.style.bottom = '10px';
            downloadButton.style.left = '10px';
            downloadButton.style.padding = '10px 15px';
            downloadButton.style.backgroundColor = '#007bff';
            downloadButton.style.color = 'white';
            downloadButton.style.border = 'none';
            downloadButton.style.borderRadius = '5px';
            downloadButton.style.cursor = 'pointer';
            downloadButton.style.zIndex = '1000';

            // Add click event to start download
            downloadButton.addEventListener('click', () => {
                const a = document.createElement('a');
                a.href = source.src;
                a.download = source.src.split('/').pop();
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            });

            // Add the button below the video
            video.parentElement.appendChild(downloadButton);
        }
    }
})();
