document.addEventListener('DOMContentLoaded', function () {
    const logSleepBtn = document.getElementById('logSleep');
    const sleepStatus = document.getElementById('sleepStatus');
    const sleepProgress = document.getElementById('sleepProgress');
    const sleepTip = document.getElementById('sleepTip');

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

        // Show a helpful tip based on the sleep logged
        sleepTip.textContent = getSleepTip(sleepLogged);
    }

    function getSleepTip(hours) {
        if (hours < 6) {
            return "You're not getting enough sleep! Aim for at least 7-8 hours for better health.";
        } else if (hours >= 6 && hours < 8) {
            return "Good job! Try to get a little more rest to meet your sleep goal.";
        } else if (hours === 8) {
            return "Great! You've hit the optimal amount of sleep for good health.";
        } else {
            return "You might be oversleeping. Aim for 7-8 hours for a balanced rest.";
        }
    }
});