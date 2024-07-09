document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.getElementById('toggle');

  chrome.storage.local.get('isEnabled', (data) => {
    updateButton(data.isEnabled);
  });

  toggleButton.addEventListener('click', () => {
    chrome.storage.local.get('isEnabled', (data) => {
      const newState = !data.isEnabled;
      chrome.storage.local.set({ isEnabled: newState }, () => {
        updateButton(newState);
      });
    });
  });

  function updateButton(isEnabled) {
    toggleButton.textContent = isEnabled ? 'Kapat' : 'Aç';
    document.body.style.backgroundColor = isEnabled ? '#e0ffe0' : '#ffe0e0';
  }
});
