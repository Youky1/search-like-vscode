// 添加绑定
document.addEventListener("DOMContentLoaded", function () {
  var button = document.getElementById("saveButton");
  button.addEventListener("click", saveInput);
});

function saveInput() {
  var userInput = document.getElementById("userInput").value;
  console.log("userInput", userInput);
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {
      action: "search",
      keyword: userInput,
    });
  });
}
