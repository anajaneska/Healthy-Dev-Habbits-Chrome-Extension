document.addEventListener('DOMContentLoaded', function () {
    const mindfulnessBtn = document.getElementById('getMindfulnessTip');
    const mindfulnessTips = document.getElementById('mindfulnessTips');
    
    const mindfulnessSuggestions = [
        'Practice deep breathing: Inhale deeply through your nose for 4 seconds, hold for 4 seconds, and exhale through your mouth for 4 seconds.',
        'Try a quick body scan: Focus on each part of your body, starting from your toes and working your way up to your head.',
        'Take a few moments to focus on your surroundings: Observe what you see, hear, and feel in the present moment.',
        'Focus on your breath: Pay attention to each inhale and exhale, allowing thoughts to pass without judgment.',
        'Take a mindful walk: Notice how your feet feel on the ground and observe the sights and sounds around you.',
        'Practice gratitude: Take a moment to reflect on three things you are grateful for right now.',
        'Do a 5-minute meditation: Sit quietly, close your eyes, and focus on your breath or a calming phrase.',
        'Engage in mindful eating: Slowly savor each bite, paying attention to the texture, taste, and smell of your food.',
        'Listen to calming sounds: Spend a few minutes focusing on the natural sounds around you, such as birds, wind, or water.',
        'Use visualization: Imagine a peaceful place, and visualize yourself there, feeling calm and relaxed.',
        'Try mindful stretching: Gently stretch your body, focusing on the sensations in your muscles and joints.',
        'Take a moment to smile: Practice mindful smiling and notice how it changes your mood.',
        'Practice letting go: Focus on a stressful thought, acknowledge it, and then gently release it.',
        'Try box breathing: Inhale for 4 seconds, hold for 4, exhale for 4, and hold again for 4.',
        'Set a mindful intention for the day: Reflect on how you want to approach your tasks with awareness and presence.',
        'Practice mindful listening: When speaking with someone, give them your full attention without interrupting or planning your response.',
        'Focus on your hands: Close your eyes and concentrate on the sensations in your hands. What do they feel like?',
        'Do a mindful check-in: Pause to ask yourself, "How am I feeling right now?" without judgment.',
        'Spend a few minutes observing the sky: Notice the colors, the shapes of the clouds, or the stars if it\'s nighttime.',
        'Practice mindful posture: Sit or stand tall, paying attention to how your body feels in alignment.',
        'Use a guided meditation app: Set aside time to follow a guided mindfulness or meditation session.',
        'Engage in mindful creativity: Draw, paint, or color while focusing on the process rather than the result.'
    ];

    mindfulnessBtn.addEventListener('click', function() {
        const randomTip = mindfulnessSuggestions[Math.floor(Math.random() * mindfulnessSuggestions.length)];
        mindfulnessTips.innerHTML = `<p><strong style="text-transform: capitalize;">${randomTip.substring(0, randomTip.indexOf(":"))}</strong>${randomTip.substring(randomTip.indexOf(":"))}</p>`;
    }); 
})