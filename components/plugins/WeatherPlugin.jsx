import { Cloud, CloudRain, Sun, Thermometer } from "lucide-react"

const WeatherPlugin = ({ data }) => {
  if (!data || data.error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg mt-2">
        <p className="text-red-600 dark:text-red-400">{data?.error || "Unable to fetch weather data"}</p>
      </div>
    )
  }

  const getWeatherIcon = (condition) => {
    condition = condition.toLowerCase()
    if (condition.includes("rain") || condition.includes("shower")) {
      return <CloudRain className="h-8 w-8 text-blue-500" />
    } else if (condition.includes("cloud")) {
      return <Cloud className="h-8 w-8 text-gray-500" />
    } else {
      return <Sun className="h-8 w-8 text-yellow-500" />
    }
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-4 mt-2">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100">{data.location}</h3>
          <p className="text-gray-600 dark:text-gray-300">{data.date}</p>
        </div>
        <div className="flex items-center">
          {getWeatherIcon(data.condition)}
          <span className="text-2xl font-bold ml-2 text-gray-800 dark:text-gray-100">{data.temperature}°</span>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-gray-700 dark:text-gray-200">{data.condition}</p>
        <div className="flex items-center mt-2 text-gray-600 dark:text-gray-300">
          <Thermometer className="h-4 w-4 mr-1" />
          <span>Feels like {data.feelsLike}°</span>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-4 gap-2">
        {data.hourly &&
          data.hourly.map((hour, index) => (
            <div key={index} className="text-center">
              <div className="text-sm text-gray-600 dark:text-gray-300">{hour.time}</div>
              <div className="text-lg font-medium text-gray-800 dark:text-gray-100">{hour.temp}°</div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default WeatherPlugin
