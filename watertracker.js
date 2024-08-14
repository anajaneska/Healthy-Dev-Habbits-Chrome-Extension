document.addEventListener('DOMContentLoaded', function () {
    const logWaterBtn = document.getElementById('logWater');
    const waterStatus = document.getElementById('waterStatus');
    const waterProgress = document.getElementById('waterProgress');

    const dailyGoal = 8;  // 8 cups per day
    let waterConsumed = 0;

    // Load stored data
    chrome.storage.local.get(['waterConsumed'], function(result) {
        if (result.waterConsumed) {
            waterConsumed = result.waterConsumed;
            updateUI();
        }
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
        // Update the text and progress bar
        waterStatus.textContent = `Water Consumed: ${waterConsumed}/${dailyGoal} cups`;
        waterProgress.style.width = `${(waterConsumed / dailyGoal) * 100}%`;
    }

    // Reset water intake at the beginning of the next day
    chrome.runtime.sendMessage({ type: 'checkResetWater' });
});