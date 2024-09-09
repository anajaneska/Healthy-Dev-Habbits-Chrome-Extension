document.addEventListener('DOMContentLoaded', function () {
    const mindfulnessBtn = document.getElementById('getMindfulnessTip');
    const mindfulnessTips = document.getElementById('mindfulnessTips');

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
})