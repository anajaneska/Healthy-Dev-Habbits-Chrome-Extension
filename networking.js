document.addEventListener('DOMContentLoaded', function () {
    const eventBtn = document.getElementById('getEventInfo');
    const eventList = document.getElementById('eventList');

    eventBtn.addEventListener('click', function() {
        fetchEventInfo();
    });

    async function fetchEventInfo() {
        const apiKey = 'HLNYFZSGOSD6HNYVV4OG'; // Replace with your Eventbrite API key
        const url = `https://www.eventbriteapi.com/v3/events/search/?q=networking&location.address=Skopje`;

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}, Message: ${response.statusText}`);
            }

            const result = await response.json();

            if (result.events && result.events.length > 0) {
                // Display a list of events
                eventList.innerHTML = result.events.map(event => `
                    <li>
                        <strong>${event.name.text}</strong><br>
                        Date: ${new Date(event.start.local).toLocaleDateString()}<br>
                        <a href="${event.url}" target="_blank" rel="noopener noreferrer">Event Link</a>
                    </li>
                `).join('');
            } else {
                eventList.innerHTML = '<li>No events found. Please try again later.</li>';
            }
        } catch (error) {
            console.error('Error fetching event information:', error.message);
            eventList.innerHTML = `<li>Error fetching data: ${error.message}. Please try again later.</li>`;
        }
    }
});