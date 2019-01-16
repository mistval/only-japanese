chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({ minJapanesePercentage: 50 });
});

chrome.runtime.onMessage.addListener(function(message, sender) {
  if(message.close) {
    chrome.tabs.remove(sender.tab.id);
  }
});
