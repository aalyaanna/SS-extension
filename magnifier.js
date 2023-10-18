document.getElementById('magnifyButton').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tabId = tabs[0].id;
    
    // Send a message to the content script to enable the magnifier
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      function: enableMagnifier,
    });
  });
});

function enableMagnifier() {
  // Send a message to the content script to enable the magnifier
  chrome.scripting.executeScript({
    target: { tabId: tabId },
    function: toggleMagnifier,
  });
}