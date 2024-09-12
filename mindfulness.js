document.addEventListener('DOMContentLoaded', function () {
    const meditationBtn = document.getElementById('setMeditationReminder');
    const meditationIntervalInput = document.getElementById('meditationIntervalInput');
    const meditationIntervalDisplay = document.getElementById('meditationInterval');

    const breathingBtn = document.getElementById('setBreathingReminder');
    const breathingIntervalInput = document.getElementById('breathingIntervalInput');
    const breathingIntervalDisplay = document.getElementById('breathingInterval'); 

    let meditationInterval = 60;
    let breathingInterval = 60; 

    chrome.storage.local.get(['meditationInterval', 'breathingInterval'], function(result) {
        if (result.meditationInterval) {
            meditationInterval = result.meditationInterval;
        }
        if (result.breathingInterval) {
            breathingInterval = result.breathingInterval;
        }
        updateUI(); 
        setMeditationReminder();
        setBreathingReminder();
    });

    chrome.storage.onChanged.addListener(function(changes, namespace) {
        if (changes.meditationInterval) {
            meditationInterval = changes.meditationInterval.newValue;
            setMeditationReminder();
            updateUI();
        }
        if (changes.breathingInterval) {
            breathingInterval = changes.breathingInterval.newValue;
            setBreathingReminder();
            updateUI();
        }
    });

    function setMeditationReminder() {
        chrome.alarms.clear('meditationReminder');
        chrome.alarms.create('meditationReminder', { periodInMinutes: meditationInterval }); 
        chrome.storage.local.set({ 'meditationInterval': meditationInterval });
    }

    function setBreathingReminder() {
        chrome.alarms.clear('breathingReminder');
        chrome.alarms.create('breathingReminder', { periodInMinutes: breathingInterval }); 
        chrome.storage.local.set({ 'breathingInterval': breathingInterval });
    }

    function updateUI() {
        meditationIntervalDisplay.textContent = `Meditation Interval: ${meditationInterval} minutes`;
        breathingIntervalDisplay.textContent = `Breathing Exercise Interval: ${breathingInterval} minutes`;
    }
});