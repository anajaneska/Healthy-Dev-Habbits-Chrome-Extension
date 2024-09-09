chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.type === 'checkResetWater') {
        resetWaterIfNewDay();
    }
});

chrome.alarms.create('waterReminder', { delayInMinutes: 1, periodInMinutes: 1 });
console.log('Alarm created');

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

chrome.alarms.create('breakReminder', { delayInMinutes: 100, periodInMinutes: 100 });

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
            console.log('Break notification created with ID:', notificationId);
        }
    });




    chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
        if (message.type === 'setMeditationReminder') {
            const interval = message.interval;
            chrome.alarms.create('meditationReminder', { delayInMinutes: interval, periodInMinutes: interval });
            console.log(`Meditation reminder set for every ${interval} minutes`);
        }
    
        if (message.type === 'setBreathingReminder') {
            const interval = message.interval;
            chrome.alarms.create('breathingReminder', { delayInMinutes: interval, periodInMinutes: interval });
            console.log(`Breathing reminder set for every ${interval} minutes`);
        }
    });
    
    chrome.alarms.onAlarm.addListener(function(alarm) {
        if (alarm.name === 'meditationReminder') {
            sendNotification('Meditation Reminder', 'Time for your daily meditation! Take a few minutes to relax and focus.');
        } else if (alarm.name === 'breathingReminder') {
            sendNotification('Deep-Breathing Reminder', 'Time for a deep-breathing exercise! Breathe in deeply, hold, and exhale.');
        }
    });
    
    function sendNotification(title, message) {
        chrome.notifications.create({
            type: 'basic',
            title: title,
            message: message,
            iconUrl: 'water.jpg' 
        });
    }
}