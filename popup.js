var id = 100;
// Add an event listener to the "Magnifier" button in the popup
document.getElementById("startMagnifier").addEventListener("click", function () {
    // Send a message to the content script to toggle the magnifier
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const activeTab = tabs[0];
        chrome.scripting.executeScript({
            target: { tabId: activeTab.id },
            function: toggleMagnifier,
        });
    });
});

// Define the toggleMagnifier function to toggle the magnifying glass
function toggleMagnifier() {
    const magnifier = document.getElementById("magnifying-glass");

    if (magnifier) {
        // If the magnifier element exists, remove it to disable the magnifier
        magnifier.remove();
    } else {
        // If the magnifier element doesn't exist, create and append it to enable the magnifier
        createMagnifier();
    }
}

// Create the magnifier element and add it to the page
function createMagnifier() {
    const SCALE = 1.3; // Magnification
    const SIZE = 150; // Diameter
    const LENS_OFFSET_X = SIZE / 10.2;
    const LENS_OFFSET_Y = SIZE / 10.2;

    // Create the magnifying glass (lens)
    const handle = document.createElement("div");
    handle.classList.add("handle");

    const magnifyingGlass = document.createElement("div");
    magnifyingGlass.id = "magnifying-glass";
    magnifyingGlass.classList.add("magnifying-glass");
    magnifyingGlass.style.top = LENS_OFFSET_Y + "px";
    magnifyingGlass.style.left = LENS_OFFSET_X + "px";

    handle.appendChild(magnifyingGlass);

    // Clone the content and modify it (e.g., increase font size)
    const bodyClone = document.body.cloneNode(true);
    bodyClone.classList.add("body-clone");

    // Modify the cloned content here (e.g., increase font size)
    const allElements = bodyClone.querySelectorAll('*');
    allElements.forEach(element => {
        const computedStyle = getComputedStyle(element);
        const fontSize = parseFloat(computedStyle.fontSize);
        element.style.fontSize = (fontSize * SCALE) + "px";
    });

    bodyClone.style.top = "0px";
    bodyClone.style.left = "0px";
    magnifyingGlass.appendChild(bodyClone);
    document.body.appendChild(handle);

    const moveMagnifyingGlass = (event) => {
        let pointerX = event.pageX;
        let pointerY = event.pageY;
        // Move magnifying glass with cursor
        handle.style.left = pointerX - SIZE / 1.7 + "px";
        handle.style.top = pointerY - SIZE / 1.7 + "px";
        if (magnifyingGlass.children[0]) {
            // Align magnified document
            // let offsetX = (SIZE * Math.pow(SCALE, 2)) / 2 - pointerX * SCALE;
            // let offsetY = (SIZE * Math.pow(SCALE, 2)) / 2 - pointerY * SCALE;
            // magnifyingGlass.children[0].style.left = offsetX + "px";
            // magnifyingGlass.children[0].style.top = offsetY + "px";
            let offsetX = SIZE - pointerX - (SIZE / SCALE);
            let offsetY = SIZE - pointerY - (SIZE / SCALE);
            magnifyingGlass.children[0].style.left = offsetX + "px";
            magnifyingGlass.children[0].style.top = offsetY + "px";
        }
    };

    document.addEventListener("pointermove", moveMagnifyingGlass);

    const removeMagnifyingGlass = () => {
        magnifyingGlass.remove();
    };

    magnifyingGlass.addEventListener("dblclick", removeMagnifyingGlass);
}

// Check if the magnifier is already added, and remove it if necessary
if (document.getElementById("magnifying-glass")) {
    document.getElementById("magnifying-glass").remove();
}
