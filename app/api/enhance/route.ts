import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(req: Request) {
  const { content } = await req.json()

  try {
    const { text: improvedText } = await generateText({
      model: openai("gpt-4o-mini"),
      prompt: `Por favor, melhore esta postagem na mídia social: ${content}`,
      system:
        "Você é um assistente útil que melhora as postagens nas redes sociais. Torne as postagens mais envolventes, claras e impactantes, mantendo a mensagem e o tom originais. Adicione hashtags relevantes quando apropriado. Devolva apenas o conteudo da publicação",
    })
    
    console.log(improvedText)

    return Response.json(improvedText)
  } catch (error) {
    console.error("Error:", error)
    return Response.json({ error: "Failed to improve text" }, { status: 500 })
  }
}