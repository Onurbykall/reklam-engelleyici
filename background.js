chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ isEnabled: true }, () => {
    updateIcon(true);
  });
});

chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === 'local' && changes.isEnabled) {
    const isEnabled = changes.isEnabled.newValue;
    updateIcon(isEnabled);
    chrome.declarativeNetRequest.updateEnabledRulesets({
      enableRulesetIds: isEnabled ? ["ruleset_1"] : [],
      disableRulesetIds: isEnabled ? [] : ["ruleset_1"]
    });
  }
});

function updateIcon(isEnabled) {
  const path = isEnabled ? "icon_on.png" : "icon_off.png";
  chrome.action.setIcon({ path });
}
