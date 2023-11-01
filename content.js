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

// sa magnifier
const SCALE = 1.3;
const SIZE = 150;
const LENSE_OFFSET_X = SIZE / 10.2;
const LENSE_OFFSET_Y = SIZE / 10.2;

// Set the CSS variables to control the magnifying glass
document.documentElement.style.setProperty("--scale", SCALE);
document.documentElement.style.setProperty("--size", SIZE + "px");

// Create the magnifying glass (lens) elements
const handle = document.createElement("div");
handle.classList.add("handle");

const magnifyingGlass = document.createElement("div");
magnifyingGlass.classList.add("magnifying-glass");
magnifyingGlass.style.top = LENSE_OFFSET_Y + "px";
magnifyingGlass.style.left = LENSE_OFFSET_X + "px";

handle.append(magnifyingGlass);

// Add a clone of the current web page to the magnifying glass
const addMagnifyingGlass = () => {
  const bodyClone = document.body.cloneNode(true);
  bodyClone.classList.add("body-clone");
  bodyClone.style.top = "0px";
  bodyClone.style.left = "0px";
  magnifyingGlass.append(bodyClone);
  document.body.append(handle);
};

// Handle the "Magnify" button click event
const magnifyButton = document.getElementById("magnify");
magnifyButton.addEventListener("click", addMagnifyingGlass);

// Move the magnifying glass with the cursor
const moveMagnifyingGlass = (event) => {
  let pointerX = event.pageX;
  let pointerY = event.pageY;

  // Move the magnifying glass with the cursor
  handle.style.left = pointerX - SIZE / 1.7 + "px";
  handle.style.top = pointerY - SIZE / 1.7 + "px";

  if (magnifyingGlass.children[0]) {
    // Align the magnified document
    let offsetX = (SIZE * Math.pow(SCALE, 2)) / 2 - pointerX * SCALE;
    let offsetY = (SIZE * Math.pow(SCALE, 2)) / 2 - pointerY * SCALE;
    magnifyingGlass.children[0].style.left = offsetX + "px";
    magnifyingGlass.children[0].style.top = offsetY + "px";
  }
};

// Handle pointer move events
document.addEventListener("pointermove", moveMagnifyingGlass);

// Remove the magnifying glass on double-click
const removeMagnifiyingGlass = (event) => {
  magnifyingGlass.children[0].remove();
  handle.remove();
};

magnifyingGlass.addEventListener("dblclick", removeMagnifiyingGlass);
