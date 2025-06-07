document.getElementById('getWeatherBtn').addEventListener('click', async () => {
    const city = document.getElementById('city').value.trim();
    if (city) {
        try {
            const response = await fetch(`http://localhost:3000/weather?city=${encodeURIComponent(city)}`);
            const data = await response.json();

            if (response.ok) {
                document.getElementById('weatherInfo').innerHTML = `
                    <h2>${data.city}</h2>
                    <p>${data.description}</p>
                    <p><strong>${data.temp}°C</strong></p>
                `;
                document.getElementById('clothingAdvice').innerHTML = `
                    <h3>Clothing Suggestion</h3>
                    <p>${data.advice}</p>
                `;
            } else {
                document.getElementById('weatherInfo').innerHTML = `<p>${data.message}</p>`;
                document.getElementById('clothingAdvice').innerHTML = '';
            }
        } catch (error) {
            document.getElementById('weatherInfo').innerHTML = `<p>Backend error. Try again later.</p>`;
            document.getElementById('clothingAdvice').innerHTML = '';
        }
    } else {
        document.getElementById('weatherInfo').innerHTML = `<p>Please enter a city name.</p>`;
        document.getElementById('clothingAdvice').innerHTML = '';
    }
});
