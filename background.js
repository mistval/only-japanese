chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({ minJapanesePercentage: 50, enabled: true });
});

chrome.runtime.onMessage.addListener(function(message, sender) {
  if(message.close) {
    return chrome.tabs.remove(sender.tab.id);
  }
});
