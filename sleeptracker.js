document.addEventListener('DOMContentLoaded', function () {
    const logSleepBtn = document.getElementById('logSleep');
    const sleepStatus = document.getElementById('sleepStatus');
    const sleepProgress = document.getElementById('sleepProgress');

    const dailySleepGoal = 8;  // 8 hours of sleep per night
    let sleepLogged = 0;

    // Load stored sleep data
    chrome.storage.local.get(['sleepLogged'], function(result) {
        if (result.sleepLogged) {
            sleepLogged = result.sleepLogged;
            updateSleepUI();
        }
    });

    // Log sleep when button is clicked
    logSleepBtn.addEventListener('click', function() {
        let hours = prompt("Enter the number of hours you slept:");
        hours = parseFloat(hours);
        if (!isNaN(hours) && hours > 0) {
            sleepLogged = hours;
            chrome.storage.local.set({ 'sleepLogged': sleepLogged });
            updateSleepUI();
        } else {
            alert("Please enter a valid number of hours.");
        }
    });

    function updateSleepUI() {
        // Update the text and progress bar
        sleepStatus.textContent = `Sleep Logged: ${sleepLogged} hours / ${dailySleepGoal} hours`;
        sleepProgress.style.width = `${(sleepLogged / dailySleepGoal) * 100}%`;
    }
});