// ==UserScript==
// @name         CDU-CopyQ
// @namespace    CopyQ.CDU
// @version      0.0.0.2
// @description  CopyQ
// @author       Ge-CDU
// @match        *://*/*
// @downloadURL  https://github.com/CDU-Ge/CopyQ/raw/main/CopyQ.user.js
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {    
    if (window.top != window.self)  //don't run on frames or iframes
        return;
    
    // add button on page side
    const button = document.createElement('button');
    button.innerHTML = 'CopyQ';
    button.style.position = 'fixed';
    button.style.top = '50%';
    button.style.right = '0';
    button.style.zIndex = '9999';
    document.body.appendChild(button);

    /**
     * Extract the main content of the current page
     */
    function extractContent(selector) {
        // Obtain the main text content under an HTML node and delete CSS, JavaScript, etc
        function extractText(node) {
            var text = '';
            if (node.nodeType === Node.TEXT_NODE) {
                return node.textContent;
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                var children = node.childNodes;
                for (var i = 0; i < children.length; i++) {
                    text += extractText(children[i]);
                }
            }
            return text;
        }
        // Remove the CSS, JavaScript, etc
        function removeScripts(node) {
            if (node.nodeType === Node.ELEMENT_NODE) {
                if (node.tagName === 'SCRIPT' || node.tagName === 'STYLE' || node.tagName === 'LINK') {
                    node.remove();
                } else {
                    var children = node.childNodes;
                    for (var i = 0; i < children.length; i++) {
                        removeScripts(children[i]);
                    }
                }
            }
        }
        // Remove the HTML tags
        function removeTags(node) {
            if (node.nodeType === Node.ELEMENT_NODE) {
                if (node.tagName !== 'BODY') {
                    var children = node.childNodes;
                    for (var i = 0; i < children.length; i++) {
                        removeTags(children[i]);
                    }
                }
            } else if (node.nodeType === Node.TEXT_NODE) {
                node.textContent = node.textContent.replace(/\n/g, ' ');
            }
        }
        var node = document.querySelector(selector);
        removeScripts(node);
        removeTags(node);
        return extractText(node);
    }

    button.addEventListener('click', function() {
        var text = extractContent('body');
        console.log('Selected text:', text);
        if (text.length > 0) {
            navigator.clipboard.writeText(text).then(function() {
                console.log('Text copied to clipboard');
            }, function() {
                console.error('Failed to copy text to clipboard');
            });
        }
        // log clipboard content
        navigator.clipboard.readText().then(function(clipboardText) {
            console.log('Clipboard content:', clipboardText);
        }, function() {
            console.error('Failed to read clipboard content');
        });
    });
   
})();
