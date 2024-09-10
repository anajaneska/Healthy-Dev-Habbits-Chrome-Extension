document.addEventListener('DOMContentLoaded', function () {
    const breakStatus = document.getElementById('breakStatus');
    const breakReminderBtn = document.getElementById('setBreakReminder');
    
    let breakInterval = 60;  // Default interval

    // Load the stored break interval from local storage
    chrome.storage.local.get(['breakInterval'], function(result) {
        if (result.breakInterval) {
            breakInterval = result.breakInterval;
            updateUI();
        }
    });

    // Set or reset break reminder on button click
    /* breakReminderBtn.addEventListener('click', function() {
        setBreakReminder();
    }); */

    function setBreakReminder() {
        /* chrome.alarms.clear('breakReminder');  // Clear any existing alarm
        chrome.alarms.create('breakReminder', { delayInMinutes: breakInterval, periodInMinutes: breakInterval });

        // Update the interval in storage (in case it was changed in settings.html)
        chrome.storage.local.set({ 'breakInterval': breakInterval }); */
        chrome.storage.local.get(['breakInterval'],function(result){
            const reminderInterval = result.breakInterval || 60;
            chrome.alarms.clear('breakReminder');
            chrome.alarms.create('breakReminder',{periodInMinutes: reminderInterval});
        })
    }


    // Listen for changes to the breakInterval in storage and update UI
    chrome.storage.onChanged.addListener(function(changes, namespace) {
        if (changes.breakInterval) {
            breakInterval = changes.breakInterval.newValue;
            updateUI();
            setBreakReminder();  // Reset the reminder with the new interval
        }
    });

   
    function updateUI() {
        breakStatus.textContent = `Break Interval: ${breakInterval} minutes`;
    }

    setBreakReminder();
});
