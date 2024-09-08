document.addEventListener('DOMContentLoaded', function () {
    const breakIntervalInput = document.getElementById('breakInterval');
    const saveSettingsBtn = document.getElementById('saveSettings');

    const dailyGoalInput = document.getElementById('dailyGoal');
    const waterReminderIntervalInput = document.getElementById('waterReminderInterval');
    const saveWaterBtn = document.getElementById('saveWater');

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

    // Load stored settings
    chrome.storage.local.get(['dailyGoal', 'waterReminderInterval'], function(result) {
        if (result.dailyGoal) {
            dailyGoalInput.value = result.dailyGoal;
        }
        if (result.waterReminderInterval) {
            waterReminderIntervalInput.value = result.waterReminderInterval;
        }
    });

    // Save the new settings
    saveWaterBtn.addEventListener('click', function() {
        const newDailyGoal = parseInt(dailyGoalInput.value, 10);
        const newWaterReminderInterval = parseInt(waterReminderIntervalInput.value, 10);

        chrome.storage.local.set({
            'dailyGoal': newDailyGoal,
            'waterReminderInterval': newWaterReminderInterval
        }, function() {
            alert('Water Settings saved!');
        });
    });
});