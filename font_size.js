document.addEventListener("DOMContentLoaded", function () {
    const rangeSlider = document.getElementById("range-slider");
    const fontSizeDisplay = document.getElementById("font-size-display");
    const resetButton = document.getElementById("reset-button");
  
    rangeSlider.addEventListener("input", function () {
      updateFontSize();
    });
  
    resetButton.addEventListener("click", function () {
      rangeSlider.value = 16;
      updateFontSize();
    });
  
    function updateFontSize() {
      const fontSize = rangeSlider.value + "px";
      fontSizeDisplay.textContent = fontSize;
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          function: setFontSize,
          args: [fontSize],
        });
      });
    }
  });
  
  function setFontSize(fontSize) {
    const elements = document.getElementsByTagName("*");
    for (let i = 0; i < elements.length; i++) {
      elements[i].style.fontSize = fontSize;
    }
  }
  