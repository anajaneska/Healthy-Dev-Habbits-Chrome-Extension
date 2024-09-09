document.addEventListener('DOMContentLoaded', function () {
    const meditationBtn = document.getElementById('setMeditationReminder');
    const meditationIntervalInput = document.getElementById('meditationIntervalInput');
    const meditationIntervalDisplay = document.getElementById('meditationInterval'); // Displays meditation interval text

    const breathingBtn = document.getElementById('setBreathingReminder');
    const breathingIntervalInput = document.getElementById('breathingIntervalInput');
    const breathingIntervalDisplay = document.getElementById('breathingInterval'); // Displays breathing interval text


    let meditationInterval = 60; // Default meditation value
    let breathingInterval = 60; // Default breathing value

    

    // Load the saved intervals from chrome storage
    chrome.storage.local.get(['meditationInterval', 'breathingInterval'], function(result) {
        if (result.meditationInterval) {
            meditationInterval = result.meditationInterval;
        }
        if (result.breathingInterval) {
            breathingInterval = result.breathingInterval;
        }
        updateUI(); // Update the UI with both intervals
    });

    // Set meditation reminder when the button is clicked
    meditationBtn.addEventListener('click', function() {
        const interval = parseInt(meditationIntervalInput.value, 10);
        if (interval > 0) {
            meditationInterval = interval;
            setMeditationReminder();
            updateUI();
        }
    });

    // Set breathing reminder when the button is clicked
    breathingBtn.addEventListener('click', function() {
        const interval = parseInt(breathingIntervalInput.value, 10);
        if (interval > 0) {
            breathingInterval = interval;
            setBreathingReminder();
            updateUI();
        }
    });

    // Update reminders if the intervals are changed elsewhere
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

    // Function to set or reset the meditation reminder
    function setMeditationReminder() {
        chrome.alarms.clear('meditationReminder'); // Clear the old alarm
        chrome.alarms.create('meditationReminder', { periodInMinutes: meditationInterval }); // Create new alarm
        chrome.storage.local.set({ 'meditationInterval': meditationInterval }, function() {
            console.log(`Meditation reminder set for every ${meditationInterval} minutes`);
        });
    }

    // Function to set or reset the deep-breathing reminder
    function setBreathingReminder() {
        chrome.alarms.clear('breathingReminder'); // Clear the old alarm
        chrome.alarms.create('breathingReminder', { periodInMinutes: breathingInterval }); // Create new alarm
        chrome.storage.local.set({ 'breathingInterval': breathingInterval }, function() {
            console.log(`Deep-breathing reminder set for every ${breathingInterval} minutes`);
        });
    }

    // Function to update the UI with the latest intervals
    function updateUI() {
        meditationIntervalDisplay.textContent = `Meditation Interval: ${meditationInterval} minutes`;
        breathingIntervalDisplay.textContent = `Breathing Exercise Interval: ${breathingInterval} minutes`;
    }
});