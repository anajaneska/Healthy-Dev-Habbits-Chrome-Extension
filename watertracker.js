document.addEventListener('DOMContentLoaded', function () {
    const logWaterBtn = document.getElementById('logWater');
    const waterStatus = document.getElementById('waterStatus');
    const waterProgress = document.getElementById('waterProgress');

    let dailyGoal = 8;
    let waterConsumed = 0;

    chrome.storage.local.get(['waterConsumed', 'dailyGoal'], function(result) {
        if (result.waterConsumed !== undefined) {
            waterConsumed = result.waterConsumed;
        }
        if (result.dailyGoal !== undefined) {
            dailyGoal = result.dailyGoal;
        }
        updateUI();
    });

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

    function setWaterReminder() {
        chrome.storage.local.get(['waterReminderInterval'], function(result) {
            const reminderInterval = result.waterReminderInterval || 60;
            chrome.alarms.clear('waterReminder'); 
            chrome.alarms.create('waterReminder', { periodInMinutes: reminderInterval });
        });
    }

    chrome.storage.onChanged.addListener(function(changes, namespace) {
        if (changes.dailyGoal) {
            dailyGoal = changes.dailyGoal.newValue;
            updateUI();
        }
        if (changes.waterReminderInterval) {
            setWaterReminder();
        }
    });

    setWaterReminder();
    chrome.runtime.sendMessage({ type: 'checkResetWater' });
});