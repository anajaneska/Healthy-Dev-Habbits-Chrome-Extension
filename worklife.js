document.addEventListener('DOMContentLoaded', function () {
    const workLimitInput = document.getElementById('workLimitInput');
    const setWorkLimitBtn = document.getElementById('setWorkLimit');
    const workStatus = document.getElementById('workStatus');

    let workLimit = 8;  // Default work limit in hours
    let workStartTime;
    let workIntervalId;

    // Load stored data
    chrome.storage.local.get(['workLimit', 'workStartTime'], function(result) {
        if (result.workLimit) {
            workLimit = result.workLimit;
        }
        if (result.workStartTime) {
            workStartTime = new Date(result.workStartTime);
            updateWorkStatus();
        }
        updateUI();
    });

    // Set or reset work limit
    setWorkLimitBtn.addEventListener('click', function() {
        workLimit = parseInt(workLimitInput.value, 10);
        chrome.storage.local.set({ 'workLimit': workLimit });
        startWorkTimer();
        updateUI();
    });

    function startWorkTimer() {
        if (workIntervalId) {
            clearInterval(workIntervalId);
        }
        workStartTime = new Date();
        chrome.storage.local.set({ 'workStartTime': workStartTime.toISOString() });

        workIntervalId = setInterval(function() {
            const currentTime = new Date();
            const elapsedHours = (currentTime - workStartTime) / (1000 * 60 * 60);
            if (elapsedHours >= workLimit) {
                sendWorkReminder();
                clearInterval(workIntervalId);
            }
        }, 60000);  // Check every minute
    }

    function sendWorkReminder() {
        chrome.notifications.create({
            type: 'basic',
            title: 'Work-Life Balance Reminder',
            message: 'Time to log off and enjoy your personal time!',
            iconUrl: 'work.png'
        }, function(notificationId) {
            if (chrome.runtime.lastError) {
                console.error('Notification error:', chrome.runtime.lastError.message);
            } else {
                console.log('Notification created with ID:', notificationId);
            }
        });
    }

    function updateWorkStatus() {
        const currentTime = new Date();
        const elapsedHours = (currentTime - new Date(workStartTime)) / (1000 * 60 * 60);
        workStatus.textContent = `Work Duration: ${elapsedHours.toFixed(2)} hours / ${workLimit} hours`;
    }

    function updateUI() {
        workStatus.textContent = `Work Limit: ${workLimit} hours`;
        workLimitInput.value = workLimit;
    }

    // Start the timer if work start time is set
    if (workStartTime) {
        startWorkTimer();
    }
});
