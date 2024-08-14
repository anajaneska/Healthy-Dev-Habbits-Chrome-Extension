document.addEventListener('DOMContentLoaded', function () {
    const mindfulnessBtn = document.getElementById('getMindfulnessTip');
    const mindfulnessTips = document.getElementById('mindfulnessTips');
    const meditationBtn = document.getElementById('setMeditationReminder');
    const breathingBtn = document.getElementById('setBreathingReminder');
    const meditationIntervalInput = document.getElementById('meditationInterval');
    const breathingIntervalInput = document.getElementById('breathingInterval');

    // Sample mindfulness tips
    const mindfulnessSuggestions = [
        'Practice deep breathing: Inhale deeply through your nose for 4 seconds, hold for 4 seconds, and exhale through your mouth for 4 seconds.',
        'Try a quick body scan: Focus on each part of your body, starting from your toes and working your way up to your head.',
        'Take a few moments to focus on your surroundings: Observe what you see, hear, and feel in the present moment.'
    ];

    // Display a random mindfulness tip
    mindfulnessBtn.addEventListener('click', function() {
        const randomTip = mindfulnessSuggestions[Math.floor(Math.random() * mindfulnessSuggestions.length)];
        mindfulnessTips.innerHTML = `<li>${randomTip}</li>`;
    });

    // Set or reset meditation reminder
    meditationBtn.addEventListener('click', function() {
        const interval = parseInt(meditationIntervalInput.value, 10);
        if (interval > 0) {
            chrome.alarms.create('meditationReminder', { delayInMinutes: interval, periodInMinutes: interval });
            console.log(`Meditation reminder set for every ${interval} minutes`);
        }
    });

    // Set or reset deep-breathing exercise reminder
    breathingBtn.addEventListener('click', function() {
        const interval = parseInt(breathingIntervalInput.value, 10);
        if (interval > 0) {
            chrome.alarms.create('breathingReminder', { delayInMinutes: interval, periodInMinutes: interval });
            console.log(`Deep-breathing reminder set for every ${interval} minutes`);
        }
    });

    // Handle alarms
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
            iconUrl: 'water.jpg' // Ensure this path is correct
        });
    }
});
