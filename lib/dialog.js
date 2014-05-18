"use strict";
var data = require('sdk/self').data,
    tabs = require('sdk/tabs');

function openURL(URL) {
    var win = require('sdk/window/utils').openDialog({
        // No "url" supplied here in this case as we add it below (in order to have a ready listener in place before load which can give us access to the tab worker)
        // For more, see https://developer.mozilla.org/en-US/docs/Web/API/window.open#Position_and_size_features
        features: Object.keys({
            chrome: true, // Needed for centerscreen per docs
            centerscreen: true, // Doesn't seem to be working for some reason (even though it does work when calling via XPCOM)
            resizable: true,
            scrollbars: true
        }).join() + ',width=850,height=650',
        name: "My window name"
        // parent:
        // args:
    });
    win.addEventListener('load', function () {
        tabs.activeTab.url = URL;
    });
}

module.exports.openURL = openURL;