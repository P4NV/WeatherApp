export async function getWeatherForCity(cityName, signal) {

    const geocodeUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1`;
    const geocodeResponse = await fetch(geocodeUrl, { signal });

    if (!geocodeResponse.ok) {
        throw new Error(`Geocoding failed: ${geocodeResponse.status}`);
    }

    const geocodeData = await geocodeResponse.json();

    if (!geocodeData.results || geocodeData.results.length === 0) {
        throw new Error(`City "${cityName}" not found`);
    }

    const { latitude, longitude, name, country } = geocodeData.results[0];

    const weatherUrl = "https://api.open-meteo.com/v1/forecast";
    const params = new URLSearchParams({
        latitude: latitude.toString(),
        longitude: longitude.toString(),
        hourly: "temperature_2m,rain,cloud_cover,wind_speed_10m",
        timezone: "auto"
    });

    const weatherResponse = await fetch(
        `${weatherUrl}?${params}`,
        {signal}
        );
    if (!weatherResponse.ok) {
        throw new Error(`Weather API failed: ${weatherResponse.status}`);
    }
    const weatherData = await weatherResponse.json();

    return {
        location: {
            name,
            country,
            latitude,
            longitude
        },
        weather: weatherData
    };
}