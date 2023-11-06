// // unique query for compatibility mode
// var id = 100;

// // Listen for messages from the popup
// chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
//     if (message.action === 'startMagnifier') {
//         // Get the active tab
//         chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//             var activeTab = tabs[0];

//             // Execute the magnifying-glass script on the active tab
//             chrome.tabs.executeScript(activeTab.id, { file: "magnifying-glass.js" }, function () {
//                 // Send a message to the content script to start the magnifier
//                 chrome.tabs.sendMessage(activeTab.id, { action: 'startMagnifier' });
//             });
//         });
//     }
// });
