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

// content.js
let isMagnifierActive = false;

function toggleMagnifier() {
  if (isMagnifierActive) {
    document.getElementById('magnifying-glass').remove();
    isMagnifierActive = false;
  } else {
    const magnifyingGlass = document.createElement('div');
    magnifyingGlass.id = 'magnifying-glass';
    magnifyingGlass.classList.add('magnifying-glass');
    document.body.appendChild(magnifyingGlass);
    isMagnifierActive = true;
  }
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.toggleMagnifier) {
    toggleMagnifier();
  }
});
