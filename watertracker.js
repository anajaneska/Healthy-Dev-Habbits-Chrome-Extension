document.addEventListener('DOMContentLoaded', function () {
    const logWaterBtn = document.getElementById('logWater');
    const waterStatus = document.getElementById('waterStatus');
    const waterProgress = document.getElementById('waterProgress');

    let dailyGoal = 8;  // Default daily goal
    let waterConsumed = 0;

    // Load stored data
    chrome.storage.local.get(['waterConsumed', 'dailyGoal'], function(result) {
        if (result.waterConsumed !== undefined) {
            waterConsumed = result.waterConsumed;
        }
        if (result.dailyGoal !== undefined) {
            dailyGoal = result.dailyGoal;
        }
        updateUI();
    });

    // Log water intake when button is clicked
    logWaterBtn.addEventListener('click', function() {
        if (waterConsumed < dailyGoal) {
            waterConsumed++;
            chrome.storage.local.set({ 'waterConsumed': waterConsumed });
            updateUI();
        }
    });

    function updateUI() {
        waterStatus.textContent = `Water Consumed: ${waterConsumed}/${dailyGoal} cups`;
        waterProgress.style.width = `${(waterConsumed / dailyGoal) * 100}%`;
    }

    // Set up or update the reminder alarm
    function setWaterReminder() {
        chrome.storage.local.get(['waterReminderInterval'], function(result) {
            const reminderInterval = result.waterReminderInterval || 60;  // Default to 60 minutes
            chrome.alarms.clear('waterReminder');  // Clear any existing alarm
            chrome.alarms.create('waterReminder', { periodInMinutes: reminderInterval });
        });
    }

    // Handle changes to settings
    chrome.storage.onChanged.addListener(function(changes, namespace) {
        if (changes.dailyGoal) {
            dailyGoal = changes.dailyGoal.newValue;
            updateUI();
        }
        if (changes.waterReminderInterval) {
            setWaterReminder();  // Update the reminder with the new interval
        }
    });

    // Initial setup
    setWaterReminder();
    chrome.runtime.sendMessage({ type: 'checkResetWater' });
});