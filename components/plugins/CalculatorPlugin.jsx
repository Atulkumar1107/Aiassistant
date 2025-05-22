const CalculatorPlugin = ({ data }) => {
  if (!data || data.error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg mt-2">
        <p className="text-red-600 dark:text-red-400">{data?.error || "Unable to calculate expression"}</p>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-4 mt-2">
      <div className="flex flex-col">
        <div className="text-gray-600 dark:text-gray-300 font-mono">{data.expression}</div>
        <div className="text-2xl font-bold mt-2 text-gray-800 dark:text-gray-100">= {data.result}</div>
        {data.steps && data.steps.length > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
            <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">Steps:</div>
            <div className="space-y-1">
              {data.steps.map((step, index) => (
                <div key={index} className="text-sm font-mono text-gray-700 dark:text-gray-200">
                  {step}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CalculatorPlugin
