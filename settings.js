document.addEventListener('DOMContentLoaded', function () {
    const breakIntervalInput = document.getElementById('breakInterval');
    const saveSettingsBtn = document.getElementById('saveSettings');

    const dailyGoalInput = document.getElementById('dailyGoal');
    const waterReminderIntervalInput = document.getElementById('waterReminderInterval');
    const saveWaterBtn = document.getElementById('saveWater');

    const meditationIntervalInput = document.getElementById('meditationInterval');
    const breathingIntervalInput = document.getElementById('breathingInterval');
    const meditationBtn = document.getElementById('setMeditationReminder');
    const breathingBtn = document.getElementById('setBreathingReminder');

    const workLimitInput = document.getElementById('workLimitInput');
    const setWorkLimitBtn = document.getElementById('setWorkLimit');

    let workLimit = 8;

    function showAlert(message) {
        alert(message);
    }

    chrome.storage.local.get(['breakInterval'], function(result) {
        if (result.breakInterval) {
            breakIntervalInput.value = result.breakInterval;
        }
    });

    saveSettingsBtn.addEventListener('click', function() {
        const newBreakInterval = parseInt(breakIntervalInput.value, 10);
        if (isNaN(newBreakInterval) || newBreakInterval <= 0) {
            showAlert('Please enter a valid break interval.');
        } else {
            chrome.storage.local.set({ 'breakInterval': newBreakInterval }, function() {
                showAlert('Break interval saved!');
            });
        }
    });

    chrome.storage.local.get(['dailyGoal', 'waterReminderInterval'], function(result) {
        if (result.dailyGoal) {
            dailyGoalInput.value = result.dailyGoal;
        }
        if (result.waterReminderInterval) {
            waterReminderIntervalInput.value = result.waterReminderInterval;
        }
    });

    saveWaterBtn.addEventListener('click', function() {
        const newDailyGoal = parseInt(dailyGoalInput.value, 10);
        const newWaterReminderInterval = parseInt(waterReminderIntervalInput.value, 10);

        if (isNaN(newDailyGoal) || newDailyGoal <= 0) {
            showAlert('Please enter a valid daily goal.');
        } else if (isNaN(newWaterReminderInterval) || newWaterReminderInterval <= 0) {
            showAlert('Please enter a valid water reminder interval.');
        } else {
            chrome.storage.local.set({
                'dailyGoal': newDailyGoal,
                'waterReminderInterval': newWaterReminderInterval
            }, function() {
                showAlert('Water Settings saved!');
            });
        }
    });

    chrome.storage.local.get(['meditationInterval', 'breathingInterval'], function(result) {
        if (result.meditationInterval) {
            meditationIntervalInput.value = result.meditationInterval;
        }
        if (result.breathingInterval) {
            breathingIntervalInput.value = result.breathingInterval;
        }
    });

    meditationBtn.addEventListener('click', function () {
        const interval = parseInt(meditationIntervalInput.value, 10);

        if (isNaN(interval) || interval <= 0) {
            showAlert('Please enter a valid meditation interval.');
        } else {
            chrome.storage.local.set({ 'meditationInterval': interval }, function() {
                showAlert(`Meditation interval saved: ${interval} minutes`);
            });
        }
    });

    breathingBtn.addEventListener('click', function () {
        const interval = parseInt(breathingIntervalInput.value, 10);
        
        if (isNaN(interval) || interval <= 0) {
            showAlert('Please enter a valid breathing interval.');
        } else {
            chrome.storage.local.set({ 'breathingInterval': interval }, function() {
                showAlert(`Breathing interval saved: ${interval} minutes`);
            });
        }
    });

    chrome.storage.local.get(['workLimit'], function(result) {
        if (result.workLimit) {
            workLimit = result.workLimit;
            workLimitInput.value = workLimit;
        }
    });

    setWorkLimitBtn.addEventListener('click', function() {
        const newWorkLimit = parseInt(workLimitInput.value, 10);
        if (isNaN(newWorkLimit) || newWorkLimit <= 0) {
            showAlert('Please enter a valid work limit.');
        } else {
            chrome.storage.local.set({ 'workLimit': newWorkLimit }, function() {
                showAlert('Work limit saved!');
            });
        }
    });
});