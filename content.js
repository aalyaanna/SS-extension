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
// Initialize magnifier state as disabled
let magnifierEnabled = false;

function toggleMagnifier() {
  if (magnifierEnabled) {
    // Disable the magnifier
    document.querySelector(".handle").remove();
    magnifierEnabled = false;
  } else {
    // Enable the magnifier
    addMagnifyingGlass();
    magnifierEnabled = true;
  }
}

function addMagnifyingGlass() {
  const SCALE = 1.3; // Magnification
  const SIZE = 150; // Diameter
  const LENSE_OFFSET_X = SIZE / 10.2;
  const LENSE_OFFSET_Y = SIZE / 10.2;

  document.documentElement.style.setProperty("--scale", SCALE);
  document.documentElement.style.setProperty("--size", SIZE + "px");

  // Create the magnifying glass (lens)
  const handle = document.createElement("div");
  handle.classList.add("handle");

  const magnifyingGlass = document.createElement("div");
  magnifyingGlass.classList.add("magnifying-glass");
  magnifyingGlass.style.top = LENSE_OFFSET_Y + "px";
  magnifyingGlass.style.left = LENSE_OFFSET_X + "px";

  handle.append(magnifyingGlass);

  const bodyClone = document.body.cloneNode(true);
  bodyClone.classList.add("body-clone");
  bodyClone.style.top = "0px";
  bodyClone.style.left = "0px";
  magnifyingGlass.append(bodyClone);
  document.body.append(handle);

  // Add event listeners
  document.addEventListener("pointermove", moveMagnifyingGlass);
  magnifyingGlass.addEventListener("dblclick", removeMagnifyingGlass);
}

function moveMagnifyingGlass(event) {
  let pointerX = event.pageX;
  let pointerY = event.pageY;
  const handle = document.querySelector(".handle");
  if (handle) {
    handle.style.left = pointerX - SIZE / 1.7 + "px";
    handle.style.top = pointerY - SIZE / 1.7 + "px";
  }

  if (magnifyingGlass.children[0]) {
    let offsetX = (SIZE * Math.pow(SCALE, 2)) / 2 - pointerX * SCALE;
    let offsetY = (SIZE * Math.pow(SCALE, 2)) / 2 - pointerY * SCALE;
    magnifyingGlass.children[0].style.left = offsetX + "px";
    magnifyingGlass.children[0].style.top = offsetY + "px";
  }
}

function removeMagnifyingGlass() {
  document.querySelector(".handle").remove();
  magnifierEnabled = false;
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "toggleMagnifier") {
    toggleMagnifier();
  }
});
