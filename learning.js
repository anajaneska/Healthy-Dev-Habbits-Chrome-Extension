document.addEventListener('DOMContentLoaded', function () {
    const interestsInput = document.getElementById('interestsInput');
    const suggestBtn = document.getElementById('suggestResources');
    const resourcesList = document.getElementById('resourcesList');

    const resources = {
        'programming': [
            { title: 'Learn JavaScript', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide' },
            { title: 'Master Python', url: 'https://www.learnpython.org/' },
            { title: 'Intro to C#', url: 'https://docs.microsoft.com/en-us/dotnet/csharp/' }
        ],
        'design': [
            { title: 'UX Design Principles', url: 'https://www.smashingmagazine.com/category/uxdesign/' },
            { title: 'Graphic Design Basics', url: 'https://www.interaction-design.org/literature/topics/graphic-design' }
        ],
        'data': [
            { title: 'Data Science Handbook', url: 'https://jakevdp.github.io/PythonDataScienceHandbook/' },
            { title: 'SQL Tutorial', url: 'https://www.w3schools.com/sql/' }
        ],
        'cloud computing': [
        { title: 'AWS Getting Started', url: 'https://aws.amazon.com/getting-started/' },
        { title: 'Azure Fundamentals', url: 'https://docs.microsoft.com/en-us/learn/paths/azure-fundamentals/' }
        ],
        'machine learning': [
            { title: 'Machine Learning Crash Course', url: 'https://developers.google.com/machine-learning/crash-course' },
            { title: 'Fast.ai - Practical Deep Learning for Coders', url: 'https://course.fast.ai/' }
        ],
        'web development': [
            { title: 'Frontend Development with React', url: 'https://reactjs.org/' },
            { title: 'Web Development Bootcamp', url: 'https://www.udemy.com/course/the-web-developer-bootcamp/' }
        ],
        'cybersecurity': [
            { title: 'Introduction to Cybersecurity', url: 'https://www.coursera.org/learn/introduction-to-cybersecurity-fundamentals' },
            { title: 'Kali Linux Tutorials', url: 'https://www.kali.org/docs/' }
        ],
        'mobile development': [
            { title: 'Android Developer Guide', url: 'https://developer.android.com/guide' },
            { title: 'iOS Development with Swift', url: 'https://developer.apple.com/swift/' }
        ],
        'blockchain': [
            { title: 'Blockchain Basics', url: 'https://www.ibm.com/blockchain/what-is-blockchain' },
            { title: 'Ethereum Development', url: 'https://ethereum.org/en/developers/' }
        ],
        'ai': [
            { title: 'AI for Everyone', url: 'https://www.coursera.org/learn/ai-for-everyone' },
            { title: 'What is artificial intelligence (AI)? ', url: 'https://www.ibm.com/topics/artificial-intelligence' }
        ],
        'robotics' : [ 
            { title: 'Robotics Academy', url: 'http://jderobot.github.io/RoboticsAcademy/' }
        ],
        'game development': [
            { title: 'Unity Learn', url: 'https://learn.unity.com/' },
            { title: 'Unreal Engine Documentation', url: 'https://docs.unrealengine.com/en-US/index.html' }
        ],
        'digital marketing': [
            { title: 'Google Digital Garage', url: 'https://learndigital.withgoogle.com/digitalgarage' },
            { title: 'HubSpot Marketing Blog', url: 'https://blog.hubspot.com/marketing' }
        ],
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
            ? filteredResources.map(resource => `<p><a href="${resource.url}" target="_blank">${resource.title}</a></p>`).join('')
            : '<p>No resources found for the selected interests.</p>';
    }
});
