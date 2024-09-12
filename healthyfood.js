document.addEventListener('DOMContentLoaded', function () {
    const foodBtn = document.getElementById('getFoodSuggestions');
    const foodSuggestions = document.getElementById('foodSuggestions');

    foodBtn.addEventListener('click', function() {
        fetchFoodSuggestions();
    });

    async function fetchFoodSuggestions() {
        try {
            const apiKey = "dee6d055071d4548a55a59689cf3a551"
            const url = `https://api.spoonacular.com/recipes/complexSearch?query=healthy&addRecipeInformation=true&apiKey=${apiKey}`;
            
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}, Message: ${response.statusText}`);
            }
            const result = await response.json();
            if (result.results.length > 0) {
                const randomIndex = Math.floor(Math.random() * result.results.length);
                const recipe = result.results[randomIndex];
                foodSuggestions.innerHTML = `
                    <div>
                        <a href="${recipe.sourceUrl}" target="_blank" style="text-decoration: 1px underline #C90A3A; text-underline-offset: 2px;">
                        <p style="font-size: 14px;"><strong>${recipe.title}</strong><p></a>
                        <img src="${recipe.image}" alt="${recipe.title}" style="max-width: 100%; height: auto;">
                        
                    </div>
                `;
            } else {
                foodSuggestions.innerHTML = '<p>No recipes found. Please try again later.</p>';
            }
        } catch (error) {
            console.error('Error fetching food suggestions:', error.message);
            foodSuggestions.innerHTML = `<p>Error fetching data: ${error.message}. Please try again later.</p>`;
        }
    }
});