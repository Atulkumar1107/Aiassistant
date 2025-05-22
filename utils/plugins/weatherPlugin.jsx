// Mock weather data for different cities
const weatherData = {
  paris: {
    location: "Paris, France",
    temperature: 18,
    feelsLike: 17,
    condition: "Partly Cloudy",
    date: new Date().toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" }),
    hourly: [
      { time: "9am", temp: 15 },
      { time: "12pm", temp: 18 },
      { time: "3pm", temp: 20 },
      { time: "6pm", temp: 17 },
    ],
  },
  london: {
    location: "London, UK",
    temperature: 14,
    feelsLike: 12,
    condition: "Rainy",
    date: new Date().toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" }),
    hourly: [
      { time: "9am", temp: 12 },
      { time: "12pm", temp: 14 },
      { time: "3pm", temp: 15 },
      { time: "6pm", temp: 13 },
    ],
  },
  newyork: {
    location: "New York, USA",
    temperature: 22,
    feelsLike: 23,
    condition: "Sunny",
    date: new Date().toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" }),
    hourly: [
      { time: "9am", temp: 19 },
      { time: "12pm", temp: 22 },
      { time: "3pm", temp: 24 },
      { time: "6pm", temp: 21 },
    ],
  },
  tokyo: {
    location: "Tokyo, Japan",
    temperature: 25,
    feelsLike: 26,
    condition: "Clear",
    date: new Date().toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" }),
    hourly: [
      { time: "9am", temp: 23 },
      { time: "12pm", temp: 25 },
      { time: "3pm", temp: 26 },
      { time: "6pm", temp: 24 },
    ],
  },
  sydney: {
    location: "Sydney, Australia",
    temperature: 20,
    feelsLike: 21,
    condition: "Cloudy",
    date: new Date().toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" }),
    hourly: [
      { time: "9am", temp: 18 },
      { time: "12pm", temp: 20 },
      { time: "3pm", temp: 21 },
      { time: "6pm", temp: 19 },
    ],
  },
}

// Default data for cities not in our mock database
const defaultWeatherData = {
  location: "Unknown Location",
  temperature: Math.floor(Math.random() * 15) + 15, // Random temp between 15-30
  feelsLike: Math.floor(Math.random() * 15) + 15,
  condition: ["Sunny", "Partly Cloudy", "Cloudy", "Rainy"][Math.floor(Math.random() * 4)],
  date: new Date().toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" }),
  hourly: [
    { time: "9am", temp: Math.floor(Math.random() * 10) + 15 },
    { time: "12pm", temp: Math.floor(Math.random() * 10) + 18 },
    { time: "3pm", temp: Math.floor(Math.random() * 10) + 20 },
    { time: "6pm", temp: Math.floor(Math.random() * 10) + 17 },
  ],
}

export const weatherPlugin = {
  name: "Weather",
  description: "Get weather information for a location",
  execute: async (args) => {
    if (!args || args.length === 0) {
      return {
        message: "Please specify a location to get weather information.",
        data: { error: "No location specified" },
      }
    }

    const location = args[0].toLowerCase().replace(/[^a-z]/g, "")

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Get weather data from our mock database or use default
    const data = weatherData[location] || {
      ...defaultWeatherData,
      location: args[0],
    }

    return {
      message: `Here's the current weather for ${data.location}:`,
      data,
    }
  },
}
