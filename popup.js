const enabledSwitch = document.getElementById('enabledSwitch');
const switchLabel = document.getElementById('enabledSwitchLabel');

chrome.storage.sync.get(['enabled'], ({ enabled }) => {
  enabledSwitch.checked = enabled;
});

enabledSwitch.addEventListener('click', () => {
  chrome.storage.sync.set({ enabled: enabledSwitch.checked });
});
