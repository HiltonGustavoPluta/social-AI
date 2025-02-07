import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(req: Request) {
  const { content } = await req.json()

  try {
    const { text: improvedText } = await generateText({
      model: openai("gpt-4o-mini"),
      prompt: `Please enhance this social media post: ${content}`,
      system:
        "You are a helpful assistant that improves social media posts. Make posts more engaging, clear, and impactful while maintaining the original message and tone. Add relevant hashtags when appropriate.",
    })
    

    return Response.json(improvedText)
  } catch (error) {
    console.error("Error:", error)
    return Response.json({ error: "Failed to improve text" }, { status: 500 })
  }
}