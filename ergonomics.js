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
        'Adjust your chair’s lumbar support to fit the curve of your lower back.'
    ];

    // Add event listener for button click
    exerciseBtn.addEventListener('click', function() {
        displayRandomTip();
    });

    // Function to display a random ergonomic tip
    function displayRandomTip() {
        const randomIndex = Math.floor(Math.random() * ergonomicTips.length);
        const randomTip = ergonomicTips[randomIndex];
        exerciseTips.innerHTML = `
            <p><strong>Ergonomic Tip:</strong> ${randomTip}</p>
        `;
    }

    // Optional: Display a tip on page load
    displayRandomTip();
});
