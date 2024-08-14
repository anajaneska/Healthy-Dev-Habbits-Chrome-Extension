document.addEventListener('DOMContentLoaded', function () {
    const breakReminderBtn = document.getElementById('setBreakReminder');
    const breakStatus = document.getElementById('breakStatus');
    const breakOptions = document.getElementById('breakOptions');

    let breakInterval = 60;  // Default 60 minutes (1 hour)
    let breakIntervalId;

    // Load stored data
    chrome.storage.local.get(['breakInterval'], function(result) {
        if (result.breakInterval) {
            breakInterval = result.breakInterval;
        }
        updateUI();
    });

    // Set or reset break reminder
    breakReminderBtn.addEventListener('click', function() {
        clearInterval(breakIntervalId);
        setBreakReminder();
    });

    function setBreakReminder() {
        breakIntervalId = setInterval(function() {
            sendBreakNotification();
        }, breakInterval * 60 * 1000);  // Convert minutes to milliseconds

        chrome.storage.local.set({ 'breakInterval': breakInterval });
        updateUI();
    }

    function updateUI() {
        breakStatus.textContent = `Break Interval: ${breakInterval} minutes`;
        breakOptions.value = breakInterval;
    }

    // Handle changes in the interval from UI
    breakOptions.addEventListener('change', function() {
        breakInterval = parseInt(breakOptions.value, 10);
        setBreakReminder();
    });

    // Start the initial reminder
    setBreakReminder();
});
