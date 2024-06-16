document.addEventListener("DOMContentLoaded", function() {

    // Untuk mendapatkan element HTML dengan id
    const todoContainer = document.getElementById("todo");
    const weatherContainer = document.getElementById("weather");
    const pokemonContainer = document.getElementById("pokemon");

    // JSONPlaceholder
    fetch('https://jsonplaceholder.typicode.com/todos/1')
        .then(response => response.json())
        .then(todo => {
            const todoCard = document.createElement("div");
            todoCard.classList.add("md-6", "md-3", "ml-5","bg-primary");

            todoCard.innerHTML = `
            <div class="container card">
                    <div class="card-body">
                        <h5 class="card-title">TODO ID: ${todo.id}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">User ID: ${todo.userId}</h6>
                        <p class="card-text">
                            <strong>Title:</strong> ${todo.title}<br>
                            <strong>Completed:</strong> ${todo.completed ? 'Yes' : 'No'}
                        </p>
                    </div>
                </div>
            `;

            todoContainer.appendChild(todoCard);
        })
        .catch(error => console.error("Error fetching TODO item:", error));

    // OpenWeatherMap
    const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY'; 
    const cityId = '524901'; 
    fetch(`http://api.openweathermap.org/data/2.5/forecast?id=${cityId}&appid=${apiKey}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(weather => {
            const weatherCard = document.createElement("div");
            weatherCard.classList.add("d-inline-flex", "p-2", "bd-highlight");

            const forecast = weather.list[0];
            weatherCard.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Weather in ${weather.city.name}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">Temperature: ${(forecast.main.temp - 273.15).toFixed(2)}°C</h6>
                        <p class="card-text">
                            <strong>Weather:</strong> ${forecast.weather[0].description}<br>
                            <strong>Humidity:</strong> ${forecast.main.humidity}%
                        </p>
                    </div>
                </div>
            `;

            weatherContainer.appendChild(weatherCard);
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
            const errorCard = document.createElement("div");
            errorCard.classList.add("md-6", "md-3", "container", "mt-4");
            errorCard.innerHTML = `
                <div class="card text-danger">
                    <div class="card-body">
                        <h5 class="card-title">Error fetching weather data</h5>
                        <p class="card-text">${error.message}</p>
                    </div>
                </div>
            `;
            weatherContainer.appendChild(errorCard);
        });

    // PokeAPI
    fetch('https://pokeapi.co/api/v2/pokemon/1')
        .then(response => response.json())
        .then(pokemon => {
            const pokemonCard = document.createElement("div");
            pokemonCard.classList.add("md-6", "mr-7", "mt-4","bg-warning",);

            pokemonCard.innerHTML = `
                <div class="container card">
                    <div class="card-body">
                        <h5 class="card-title">Pokemon: ${pokemon.name}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">ID: ${pokemon.id}</h6>
                        <p class="card-text">
                            <strong>Height:</strong> ${pokemon.height}<br>
                            <strong>Weight:</strong> ${pokemon.weight}
                        </p>
                    </div>
                </div>
            `;

            pokemonContainer.appendChild(pokemonCard);
        })
        .catch(error => console.error("Error fetching Pokemon data:", error));
});
