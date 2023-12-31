//Javascript sa lahat ng functionalities

//Colorblind options
chrome.action.onClicked.addListener(execScript);

async function execScript() {
  const tabId = await getTabId();
  chrome.scripting.executeScript({
    target: { tabId: chrome.window.getCurrent, allFrames: true },
    files: ["colorblind_opt.js"],
  });
}

async function getTabId() {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  return tabs.length > 0 ? tabs[0].id : null;
}

// sa font size
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.type === "changeFontSize") {
    document.body.style.fontSize = message.fontSize;
  }
});

// content.js sa magnifier
let isMagnifierActive = false;

function toggleMagnifier() {
    const magnifier = document.getElementById("magnifying-glass");

    if (magnifier) {
        // If the magnifier element exists, remove it to disable the magnifier
        magnifier.remove();
        isMagnifierActive = false;
    } else {
        // If the magnifier element doesn't exist, create and append it to enable the magnifier
        createMagnifier();
        isMagnifierActive = true;
    }
}
