import { User, Prompt } from '@prisma/client'

export type FullPrompt = Prompt & {
  user: User
}
