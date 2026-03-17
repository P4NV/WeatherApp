import { useState, useEffect } from 'react'

function WeatherCard({ city }) {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!city) return

        setLoading(true)
        setError(null)

        fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=MD4ZUZL48UTKCMHCR7PB7DLVC&unitGroup=metric&contentType=json`)
            .then(res => {
                if (!res.ok) throw new Error('City not found')
                return res.json()
            })
            .then(json => setData(json))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false))
    }, [city])

    if (!city) return null
    if (loading) return <p>Loading...</p>
    if (error) return <p>{error}</p>

    return (
        <div>
            <h2 className="text-5xl font-black">{data.resolvedAddress}</h2>
            <p className="text-3xl font-semibold">{data.currentConditions.temp}°C</p>
            <p className="text-3xl font-semibold">{data.days[0].conditions}</p>
        </div>
    )
}

export default WeatherCard