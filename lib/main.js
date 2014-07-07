winUtils = require("sdk/deprecated/window-utils");
var { isBrowser } = require("sdk/window/utils");
var tabs = require("sdk/tabs");
var tabUtils = require("sdk/tabs/utils");
var _ = require("sdk/l10n").get;

var currTabIndex = tabs[0].index;



var newTabDelegate = {
	onTrack: function (window) {
	if (isBrowser(window) ){
	let menu = window.document.getElementById("tabContextMenu");
	let newtab = window.document.createElementNS("http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul","menuitem");
	newtab.setAttribute("id", "contexttab-newtab");
	newtab.setAttribute("label", _("New Tab"));
	newtab.setAttribute("accesskey", _("newtabaccesskey_string"));
	newtab.addEventListener("command", openNewTab);
	menu.insertBefore(newtab, menu.firstChild);
	} // End isBrowser
	} // End ontrack
} // End delegate function

var clickListenerDelegate = {
	onTrack: function (window) {
		if (isBrowser(window)) {
			tabElems = window.document.getElementsByTagName("tab");
			
			for (var i = 0; i < tabElems.length; i++)
				tabElems[i].addEventListener("click", function (e){
					currTabIndex = e.target.tabIndex;
				});
	

		}
	}
}


let tracker = new winUtils.WindowTracker(newTabDelegate);
// let listener = new winUtils.WindowTracker(clickListenerDelegate);	//TODO: for next phase


function openNewTab(e){
	activeTab = tabs.activeTab;
	gBrowser = tabUtils.getTabBrowserForTab(tabUtils.getTabForId(activeTab.id));
	newTab = gBrowser.addTab("about:newtab");
	currTabIndex = activeTab.index; //TODO: to be replaced with the tab that is clicked on
	gBrowser.moveTabTo(newTab, (+currTabIndex) + 1);
	gBrowser.selectTabAtIndex((+currTabIndex) + 1);
}

// code to remove the menuitem when extension is disabled for satisfy requirement on AMO for pass a full review
// On uninstall the menuitem is not removed, see: https://bugzilla.mozilla.org/show_bug.cgi?id=627432

exports.onUnload = function(reason) {
var unloader = {
onTrack: function (window) {
if (isBrowser(window) ){
let menu = window.document.getElementById("tabContextMenu");
let newtab = window.document.getElementById("contexttab-newtab");
menu.removeChild(newtab);
}
}
}; // End unloader function
let remover = new winUtils.WindowTracker(unloader);
}
