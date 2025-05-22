import { weatherPlugin } from "./plugins/weatherPlugin"
import { calculatorPlugin } from "./plugins/calculatorPlugin"
import { dictionaryPlugin } from "./plugins/dictionaryPlugin"

// Register available plugins
const plugins = {
  weather: weatherPlugin,
  calc: calculatorPlugin,
  define: dictionaryPlugin,
}

export const executePlugin = async (pluginName, args) => {
  const plugin = plugins[pluginName]

  if (!plugin) {
    return {
      plugin: pluginName,
      message: `Sorry, the plugin "${pluginName}" is not available.`,
      data: { error: "Plugin not found" },
    }
  }

  try {
    const result = await plugin.execute(args)
    return {
      plugin: pluginName,
      message: result.message,
      data: result.data,
    }
  } catch (error) {
    console.error(`Error executing plugin ${pluginName}:`, error)
    return {
      plugin: pluginName,
      message: `Sorry, there was an error with the "${pluginName}" plugin.`,
      data: { error: error.message },
    }
  }
}
