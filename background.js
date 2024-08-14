chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.type === 'checkResetWater') {
        resetWaterIfNewDay();
    }
});

chrome.alarms.create('waterReminder', { delayInMinutes: 1, periodInMinutes: 1 });

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