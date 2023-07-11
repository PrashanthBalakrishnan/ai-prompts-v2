import { User, Prompt } from '@prisma/client'

export type FullPrompt = Prompt & {
  user: User
}

export type FullPromptwithAIresponse = FullPrompt & {
  aiResponse?: string
}
