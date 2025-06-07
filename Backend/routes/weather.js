const express = require('express');
//const fetch = require('node-fetch');
const router = express.Router();
require('dotenv').config();

const API_KEY = process.env.OPENWEATHER_API_KEY;
//const API_KEY = 266d1c223a749058b7bf5fdfee1a7583;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

// Clothing advice logic
function getClothingAdvice(temp) {
    if (temp < 0) return "Wear a heavy coat, gloves, and a scarf.";
    else if (temp < 10) return "Wear a coat and warm clothing.";
    else if (temp < 20) return "A light jacket or sweater should be enough.";
    else if (temp < 30) return "Wear light, breathable clothing.";
    else return "It's hot! Wear shorts, a t-shirt, and stay hydrated.";
}

router.get('/weather', async (req, res) => {
    const city = req.query.city;
    if (!city) return res.status(400).json({ message: 'City is required' });

    try {
        const response = await fetch(`${BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`);
        console.log(API_KEY);
        // console.log(${API_KEY});

        //const response = await fetch(`${BASE_URL}?q=${encodeURIComponent(city)}&appid=266d1c223a749058b7bf5fdfee1a7583&units=metric`);

        const data = await response.json();

        if (data.cod !== 200) {
            console.log(data.cod);
            return res.status(404).json({ message: 'City not found' });
        }

        const temp = data.main.temp;
        const description = data.weather[0].description;
        const advice = getClothingAdvice(temp);

        res.json({
            city: data.name,
            description,
            temp,
            advice
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
