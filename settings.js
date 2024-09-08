document.addEventListener('DOMContentLoaded', function () {
    const breakIntervalInput = document.getElementById('breakInterval');
    const saveSettingsBtn = document.getElementById('saveSettings');

    // Load the stored break interval
    chrome.storage.local.get(['breakInterval'], function(result) {
        if (result.breakInterval) {
            breakIntervalInput.value = result.breakInterval;
        }
    });

    // Save the new break interval
    saveSettingsBtn.addEventListener('click', function() {
        const newBreakInterval = parseInt(breakIntervalInput.value, 10);
        chrome.storage.local.set({ 'breakInterval': newBreakInterval }, function() {
            alert('Break interval saved!');
        });
    });
});