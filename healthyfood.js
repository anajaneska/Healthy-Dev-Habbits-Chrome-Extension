document.addEventListener('DOMContentLoaded', function () {
    const foodBtn = document.getElementById('getFoodSuggestions');
    const foodSuggestions = document.getElementById('foodSuggestions');

    foodBtn.addEventListener('click', function() {
        fetchFoodSuggestions();
    });

    async function fetchFoodSuggestions() {
        try {
            // Retrieve the API key from Chrome storage (ensure it's stored correctly)
            const apiKey = "dee6d055071d4548a55a59689cf3a551"
            const url = `https://api.spoonacular.com/recipes/complexSearch?query=healthy&apiKey=${apiKey}`;
            
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}, Message: ${response.statusText}`);
            }
            const result = await response.json();
            if (result.results.length > 0) {
                // Select a random recipe from the results
                const randomIndex = Math.floor(Math.random() * result.results.length);
                const recipe = result.results[randomIndex];
                
                // Display the selected recipe
                foodSuggestions.innerHTML = `
                    <li>
                        <strong>${recipe.title}</strong>: 
                        <img src="${recipe.image}" alt="${recipe.title}" style="max-width: 100%; height: auto;">
                    </li>
                `;
            } else {
                foodSuggestions.innerHTML = '<li>No recipes found. Please try again later.</li>';
            }
        } catch (error) {
            console.error('Error fetching food suggestions:', error.message);
            foodSuggestions.innerHTML = `<li>Error fetching data: ${error.message}. Please try again later.</li>`;
        }
    }
});