document.addEventListener('DOMContentLoaded', function () {
    const exerciseBtn = document.getElementById('getErgonomicTip');
    const exerciseTips = document.getElementById('ergonomicTips');

    const ergonomicTips = [
        'Maintain a neutral wrist position when typing.',
        'Adjust your chair height so your feet are flat on the floor.',
        'Keep your monitor at eye level to reduce neck strain.',
        'Take regular breaks to stretch and move around.',
        'Use an ergonomic chair that supports your lower back.',
        'Position your keyboard and mouse close to each other to avoid overreaching.',
        'Ensure your elbows are at a 90-degree angle when typing.',
        'Use proper lighting to reduce glare on your screen.',
        'Keep your back straight and shoulders relaxed while sitting.',
        'Adjust your chair’s lumbar support to fit the curve of your lower back.',
        'Keep your screen about an arm\'s length away from your face.',
        'Use a headset or speakerphone to avoid cradling the phone between your ear and shoulder.',
        'Adjust the brightness and contrast of your screen to reduce eye strain.',
        'Sit with your hips and knees at a 90-degree angle to promote better posture.',
        'Use a footrest if your feet don\'t reach the floor comfortably.',
        'Ensure your workspace has proper ventilation and temperature control for comfort.',
        'Position your monitor so it is directly in front of you, not to the side.',
        'Use document holders to position paperwork at eye level and reduce neck strain.',
        'Avoid sitting for long periods; stand or walk around for at least 5 minutes every hour.',
        'Use a keyboard tray if your desk is too high to allow comfortable typing.',
        'Ensure your wrists are not resting on sharp edges or hard surfaces when typing.',
        'Use a monitor with adjustable height to maintain proper alignment with your eyes.',
        'Blink frequently and take eye breaks to reduce dryness and fatigue.',
        'Use a mouse with a comfortable grip to avoid straining your fingers.',
        'Avoid twisting your torso when reaching for items on your desk.',
        'Organize your workspace to keep frequently used items within easy reach.',
        'Keep your knees slightly lower than your hips to reduce pressure on your lower back.',
        'Use an anti-glare screen protector to reduce reflections on your monitor.',
        'Alternate between sitting and standing if you have a height-adjustable desk.',
        'Keep your computer monitor at a distance where you can see the screen clearly without leaning forward.'
    ];

    exerciseBtn.addEventListener('click', function() {
        displayRandomTip();
    });

    function displayRandomTip() {
        const randomIndex = Math.floor(Math.random() * ergonomicTips.length);
        const randomTip = ergonomicTips[randomIndex];
        exerciseTips.innerHTML = `
            <p><strong>Ergonomic Tip:</strong> ${randomTip}</p>
        `;
    }

    displayRandomTip();
});
