import Groq from 'groq-sdk'

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY! })

export { groq }
export default groq

type GroqModel = 'llama-3.3-70b-versatile' | 'llama-3.1-8b-instant' | 'gemma2-9b-it'

export function selectModel(task: 'identity' | 'chat' | 'website' | 'quick' | 'creative'): GroqModel {
  const routing: Record<string, GroqModel> = {
    identity: 'llama-3.3-70b-versatile',
    website:  'llama-3.3-70b-versatile',
    creative: 'llama-3.3-70b-versatile',
    chat:     'llama-3.1-8b-instant',
    quick:    'llama-3.1-8b-instant',
  }
  return routing[task] ?? 'llama-3.3-70b-versatile'
}

export async function AIComplete(prompt: string, system?: string, model?: GroqModel) {
  const completion = await groq.chat.completions.create({
    model: model ?? 'llama-3.3-70b-versatile',
    messages: [
      ...(system ? [{ role: 'system' as const, content: system }] : []),
      { role: 'user' as const, content: prompt },
    ],
    max_tokens: 2048,
  })
  return completion.choices[0]?.message?.content ?? ''
}

export async function AIStream(prompt: string, system?: string, model?: GroqModel) {
  return groq.chat.completions.create({
    model: model ?? 'llama-3.1-8b-instant',
    messages: [
      ...(system ? [{ role: 'system' as const, content: system }] : []),
      { role: 'user' as const, content: prompt },
    ],
    max_tokens: 1024,
    stream: true,
  })
}
