chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.type === 'checkResetWater') {
        resetWaterIfNewDay();
    }
});

chrome.alarms.create('waterReminder', { delayInMinutes: 1, periodInMinutes: 1 });

chrome.alarms.onAlarm.addListener(function (alarm) {
    if (alarm.name === 'waterReminder') {
        chrome.notifications.create('', {
            title: 'Hydration Reminder',
            message: 'Time to drink some water!',
            iconUrl: 'water.png',
            type: 'basic'
        }, function(notificationId) {
            if (chrome.runtime.lastError) {
                console.error('Notification error:', chrome.runtime.lastError.message);
            } else {
                console.log('Water notification created with ID:', notificationId);
            }
        });
    }
});

function resetWaterIfNewDay() {
    chrome.storage.local.get(['lastDate'], function (result) {
        let today = new Date().toLocaleDateString();
        if (result.lastDate !== today) {
            chrome.storage.local.set({ 'lastDate': today, 'waterConsumed': 0 });
        }
    });
}

chrome.alarms.create('breakReminder', { delayInMinutes: 100, periodInMinutes: 100 });

chrome.alarms.onAlarm.addListener(function (alarm) {
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

    console.log('Random break suggestion:', randomSuggestion);

    chrome.notifications.create({
        type: 'basic',
        title: 'Break Reminder',
        message: randomSuggestion,
        iconUrl: 'alarm.png'
    }, function(notificationId) {
        if (chrome.runtime.lastError) {
            console.error('Notification error:', chrome.runtime.lastError.message);
        } else {
            console.log('Break notification created with ID:', notificationId);
        }
    });
}

chrome.alarms.create('meditationReminder', { delayInMinutes: 1, periodInMinutes: 1 });
chrome.alarms.create('breathingReminder', { delayInMinutes: 1, periodInMinutes: 1 });

chrome.alarms.onAlarm.addListener(function (alarm) {
    console.log('Alarm triggered:', alarm.name);
    if (alarm.name === 'meditationReminder') {
        console.log('Meditation reminder triggered');
        sendNotification('Meditation Reminder', 'Time for your daily meditation! Take a few minutes to relax and focus.', 'meditation.png');
    } else if (alarm.name === 'breathingReminder') {
        console.log('Breathing reminder triggered');
        sendNotification('Deep-Breathing Reminder', 'Time for a deep-breathing exercise! Breathe in deeply, hold, and exhale.', 'breathing.png');
    }
});


function sendNotification(title, message, icon) {
    chrome.notifications.create({
        type: 'basic',
        title: title,
        message: message,
        iconUrl: icon 
    }, function(notificationId) {
        if (chrome.runtime.lastError) {
            console.error('Notification error:', chrome.runtime.lastError.message);
        } else {
            console.log(`${title} notification created with ID:`, notificationId);
        }
    });
}
