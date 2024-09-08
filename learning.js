document.addEventListener('DOMContentLoaded', function () {
    const interestsInput = document.getElementById('interestsInput');
    const suggestBtn = document.getElementById('suggestResources');
    const resourcesList = document.getElementById('resourcesList');

    // Sample resources
    const resources = {
        'programming': [
            { title: 'Learn JavaScript', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide' },
            { title: 'Master Python', url: 'https://www.learnpython.org/' },
            { title: 'Intro to C#', url: 'https://docs.microsoft.com/en-us/dotnet/csharp/' }
        ],
        'design': [
            { title: 'UX Design Principles', url: 'https://www.smashingmagazine.com/category/uxdesign/' },
            { title: 'Graphic Design Basics', url: 'https://www.canva.com/learn/graphic-design-basics/' }
        ],
        'data': [
            { title: 'Data Science Handbook', url: 'https://jakevdp.github.io/PythonDataScienceHandbook/' },
            { title: 'SQL Tutorial', url: 'https://www.w3schools.com/sql/' }
        ]
    };

    suggestBtn.addEventListener('click', function() {
        const interests = interestsInput.value.split(',').map(interest => interest.trim().toLowerCase());
        displayResources(interests);
    });

    function displayResources(interests) {
        let filteredResources = [];

        interests.forEach(interest => {
            if (resources[interest]) {
                filteredResources = filteredResources.concat(resources[interest]);
            }
        });

        resourcesList.innerHTML = filteredResources.length > 0
            ? filteredResources.map(resource => `<li><a href="${resource.url}" target="_blank">${resource.title}</a></li>`).join('')
            : '<li>No resources found for the selected interests.</li>';
    }
});
