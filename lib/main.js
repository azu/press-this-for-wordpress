var URL = require("sdk/url").URL;
var openURL = require("./dialog").openURL;
var contextMenu = require("sdk/context-menu");
contextMenu.Item({
    label: "Press this Wordpress",
    context: contextMenu.SelectionContext(),
    contentScript: 'self.on("click", self.postMessage);',
    onMessage: function () {
        showPanelWithURL(getCurrentURL(), getSelectionText());
    }
});
function getCurrentTitle() {
    return require("sdk/tabs").activeTab.title;
}
function getCurrentURL() {
    return new URL(require("sdk/tabs").activeTab.url);
}
function getSelectionText() {
    return require("sdk/selection").text || "";
}

function handleChange() {
    var currentURL = getCurrentURL();
    showPanelWithURL(currentURL);
}
function showPanelWithURL(URL, selectionText) {
    console.log(selectionText);
    var userName = "efcl";
    var wordpress = "http://" + userName + ".wordpress.com/wp-admin/press-this.php?v=4"
        + "&u=" + encodeURIComponent(URL.toString())
        + "&t=" + encodeURIComponent(getCurrentTitle());
    if (selectionText.length > 0) {
        wordpress += "&s=" + encodeURIComponent(selectionText);
    }
    openURL(wordpress);
}

var widget = require("sdk/widget").Widget({
    id: "quick-wordpress-icon",
    label: "Quick Post to Wordpress.com",
    contentURL: "http://wordpress.com/favicon.ico",
    onClick: handleChange
});