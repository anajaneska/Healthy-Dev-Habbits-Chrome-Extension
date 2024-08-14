chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.type === 'checkResetWater') {
        resetWaterIfNewDay();
    }
});

chrome.alarms.create('waterReminder', { delayInMinutes: 60, periodInMinutes: 60 });

chrome.alarms.onAlarm.addListener(function(alarm) {
    if (alarm.name === 'waterReminder') {
        chrome.notifications.create('', {
            title: 'Hydration Reminder',
            message: 'Time to drink some water!',
            iconUrl: 'water.jpg',
            type: 'basic'
        });
    }
});

function resetWaterIfNewDay() {
    chrome.storage.local.get(['lastDate'], function(result) {
        let today = new Date().toLocaleDateString();
        if (result.lastDate !== today) {
            chrome.storage.local.set({ 'lastDate': today, 'waterConsumed': 0 });
        }
    });
}

chrome.alarms.create('breakReminder', { delayInMinutes:60, periodInMinutes: 60 });

chrome.alarms.onAlarm.addListener(function(alarm) {
    if (alarm.name === 'breakReminder') {
        sendBreakNotification();
    }
});

function sendBreakNotification() {
    const suggestions = [
        'Time to stretch!',
        'Follow the 20-20-20 rule: Look 20 feet away for 20 seconds every 20 minutes.',
        'Take a short walk!'
    ];
    const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];

    chrome.notifications.create({
        type: 'basic',
        title: 'Break Reminder',
        message: randomSuggestion,
        iconUrl: 'crazy-labs-logo.png'
    }, function(notificationId) {
        if (chrome.runtime.lastError) {
            console.error('Notification error:', chrome.runtime.lastError.message);
        } else {
            console.log('Notification created with ID:', notificationId);
        }
    });
}