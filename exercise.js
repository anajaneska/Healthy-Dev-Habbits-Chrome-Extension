document.addEventListener('DOMContentLoaded', function () {
    const exerciseBtn = document.getElementById('getExerciseTips');
    const exerciseTips = document.getElementById('exerciseTips');

    exerciseBtn.addEventListener('click', function() {
        fetchExerciseData();
    });

    async function fetchExerciseData() {
        const url = 'https://exercisedb.p.rapidapi.com/exercises?limit=10&offset=0';
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': 'ce815a28eamsh1b3866543217508p18d81bjsn258a50090884',
                'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const result = await response.json();
            exerciseTips.innerHTML = result.map(exercise => `
                <li>
                    <strong>${exercise.name}</strong>: ${exercise.target}
                </li>
            `).join('');
        } catch (error) {
            console.error('Error fetching exercise data:', error);
        }
    }
});