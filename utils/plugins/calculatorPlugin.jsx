// Safe evaluation of mathematical expressions
const safeEval = (expression) => {
  // Remove any characters that aren't numbers, operators, parentheses, or decimal points
  const sanitizedExpression = expression.replace(/[^0-9+\-*/().]/g, "")

  // Check for division by zero
  if (/\/\s*0/.test(sanitizedExpression)) {
    throw new Error("Division by zero is not allowed")
  }

  try {
    // Use Function instead of eval for slightly better safety
    // Still not completely safe for production without more validation
    return new Function(`return ${sanitizedExpression}`)()
  } catch (error) {
    throw new Error("Invalid mathematical expression")
  }
}

// Generate steps for simple expressions
const generateSteps = (expression) => {
  const steps = []

  // This is a simplified implementation that won't work for all expressions
  // A proper implementation would need to parse the expression and follow order of operations

  // Handle parentheses first
  const parenthesesRegex = /$$([^()]+)$$/g
  let match
  let stepExpression = expression

  while ((match = parenthesesRegex.exec(expression)) !== null) {
    const subExpression = match[1]
    const result = safeEval(subExpression)
    steps.push(`Calculate ${subExpression} = ${result}`)
    stepExpression = stepExpression.replace(match[0], result)
  }

  // If we processed parentheses, add the simplified expression
  if (steps.length > 0) {
    steps.push(`Simplified to: ${stepExpression}`)
  }

  // Add the final calculation
  const result = safeEval(expression)
  steps.push(`Final result: ${result}`)

  return steps
}

export const calculatorPlugin = {
  name: "Calculator",
  description: "Calculate mathematical expressions",
  execute: async (args) => {
    if (!args || args.length === 0) {
      return {
        message: "Please provide a mathematical expression to calculate.",
        data: { error: "No expression provided" },
      }
    }

    const expression = args.join(" ")

    try {
      const result = safeEval(expression)
      const steps = generateSteps(expression)

      return {
        message: `The result of ${expression} is:`,
        data: {
          expression,
          result,
          steps,
        },
      }
    } catch (error) {
      return {
        message: `Sorry, I couldn't calculate that expression.`,
        data: { error: error.message, expression },
      }
    }
  },
}
