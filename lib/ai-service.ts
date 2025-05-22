import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function detectFocalPoint(imageUrl: string) {
  try {
    // In a real implementation, you would use a computer vision API
    // For this example, we'll simulate it with GPT-4o
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: `
        Analyze this image: ${imageUrl}
        
        Determine the most important focal point in the image as X,Y coordinates where:
        - X is a percentage from left (0%) to right (100%)
        - Y is a percentage from top (0%) to bottom (100%)
        
        Return only the coordinates in this exact format: X,Y
        For example: 45,62
      `,
    })

    const [x, y] = text.split(",").map(Number)

    if (isNaN(x) || isNaN(y) || x < 0 || x > 100 || y < 0 || y > 100) {
      return { x: 50, y: 50 } // Default to center if parsing fails
    }

    return { x, y }
  } catch (error) {
    console.error("Error detecting focal point:", error)
    return { x: 50, y: 50 } // Default to center on error
  }
}

export async function generateImageDescription(imageUrl: string) {
  try {
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: `
        Describe this image in detail: ${imageUrl}
        
        Provide a concise but comprehensive description that could be used as alt text.
        Keep it under 100 words.
      `,
    })

    return text
  } catch (error) {
    console.error("Error generating image description:", error)
    return ""
  }
}

export async function suggestCropAdjustments(imageUrl: string, cropRatio: string) {
  try {
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: `
        Analyze this image: ${imageUrl}
        
        For a crop with aspect ratio ${cropRatio}, suggest adjustments to make the crop more visually appealing.
        Consider:
        - Rule of thirds
        - Important subjects/elements
        - Visual balance
        
        Return your suggestions in 2-3 concise bullet points.
      `,
    })

    return text
  } catch (error) {
    console.error("Error suggesting crop adjustments:", error)
    return ""
  }
}
