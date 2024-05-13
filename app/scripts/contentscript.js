var matchedElements = [];

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log("onMessage");
  if (request.action == "search") {
    console.log("search");
    var start = new Date().getTime();
    highlightKeyword(request.keyword);
    var endTime = new Date().getTime();
    console.log(`执行时间：${endTime - start}ms`);
  }
});

function highlightKeyword(keyword) {
  var textNodes = document.evaluate(
    "//text()",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null
  );
  for (var i = 0; i < textNodes.snapshotLength; i++) {
    var node = textNodes.snapshotItem(i);
    var text = node.nodeValue;
    var replacedText = text.replace(
      new RegExp(keyword, "gi"),
      function (match) {
        return "<span style='background-color: yellow;'>" + match + "</span>";
      }
    );
    if (replacedText !== text) {
      console.log("top", node);
      var wrapper = document.createElement("span");
      wrapper.innerHTML = replacedText;
      node.parentNode.replaceChild(wrapper, node);
    }
  }
}
