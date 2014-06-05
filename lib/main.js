_ = require("sdk/l10n").get;
winUtils = require("sdk/deprecated/window-utils");
let { isBrowser } = require("sdk/window/utils");

var openNewTab = function (state){
	console.log("running openNewTab");

	var activeTab = tabs.activeTab;

	tabs.open({
		url: "www.scarletfields.org",
		onOpen: function onOpen(tab) {
		tab.index = activeTab.index + 1;
		console.log("newtab index: " + tab.index.toString());
	}
	});

	console.log("activetab index: " + activeTab.index.toString());

}



var delegate = {
	onTrack: function (window) {
	if (isBrowser(window) ){
	let menu = window.document.getElementById("tabContextMenu");
	let newtab = window.document.createElementNS("http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul","menuitem");
	newtab.setAttribute("id", "contexttab-newtab");
	newtab.setAttribute("label", _("New Tab"));
	newtab.setAttribute("accesskey", _("newtabaccesskey_string"));
	newtab.setAttribute("oncommand", "if (!gBrowser) {window.openDialog(\"chrome://browser/content/\", \"_blank\",\"chrome,all,dialog=no\", \"about:blank\"); return;} \n var tab = gBrowser.loadOneTab(\"about:blank\", {inBackground: false}); gBrowser.moveTabTo(tab, gBrowser.selectedTab.tabIndex+1); focusAndSelectUrlBar();");
	menu.insertBefore(newtab, menu.firstChild);
	} // End isBrowser
	} // End ontrack
} // End delegate function

tracker = new winUtils.WindowTracker(delegate);



var buttons = require('sdk/ui/button/action');
var tabs = require('sdk/tabs');

console.log("starting addon")

var button = buttons.ActionButton({
  id: "mozilla-link",
  label: "Visit Mozilla",
  icon: {
    "16": "./icon-16.png",
    "32": "./icon-32.png",
    "64": "./icon-64.png"
  },
  onClick: openNewTab
});


// tabs.on('open', function onOpen(tab) {
//   tabOpened(tab);
// });

// function tabOpened(tab){
// 	var activeTab = tabs.activeTab;

// 	tab.index = activeTab.index + 1;
// 	console.log("newtab index: " + tab.index.toString());

// }

