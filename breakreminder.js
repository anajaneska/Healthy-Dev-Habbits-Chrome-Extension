document.addEventListener('DOMContentLoaded', function () {
    const breakStatus = document.getElementById('breakStatus');
    const breakReminderBtn = document.getElementById('setBreakReminder');
    
    let breakInterval = 60;  

    chrome.storage.local.get(['breakInterval'], function(result) {
        if (result.breakInterval) {
            breakInterval = result.breakInterval;
            updateUI();
        }
    });

    function setBreakReminder() {
        chrome.storage.local.get(['breakInterval'],function(result){
            const reminderInterval = result.breakInterval || 60;
            chrome.alarms.clear('breakReminder');
            chrome.alarms.create('breakReminder',{periodInMinutes: reminderInterval});
        })
    }

    chrome.storage.onChanged.addListener(function(changes, namespace) {
        if (changes.breakInterval) {
            breakInterval = changes.breakInterval.newValue;
            updateUI();
            setBreakReminder();
        }
    });

    function updateUI() {
        breakStatus.textContent = `Break Interval: ${breakInterval} minutes`;
    }

    setBreakReminder();
});
