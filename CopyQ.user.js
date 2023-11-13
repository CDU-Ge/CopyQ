// ==User JavaScript==
// @name         CopyQ
// @namespace    CopyQ
// @description  CopyQ
// @include      *
// @version      0.0.1.0
// @downloadURL  https://github.com/CDU-Ge/CopyQ/raw/main/CopyQ.user.js
// @run-at       document-idle
// ==User JavaScript==

(function() {    
    if (window.top != window.self)  //don't run on frames or iframes
        return;
    
    // add button on page side
    var button = document.createElement('button');
    button.innerHTML = 'CopyQ';
    button.style.position = 'fixed';
    button.style.top = '50%';
    button.style.right = '0';
    button.style.zIndex = '9999';
    document.body.appendChild(button);

    button.addEventListener('click', function() {
        var text = window.getSelection().toString();
        if (text.length > 0) {
            var clipboard = Components.classes["@mozilla.org/widget/clipboardhelper;1"].getService(Components.interfaces.nsIClipboardHelper);
            clipboard.copyString(text);
        }
    });
   
})();
