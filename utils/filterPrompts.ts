import { FullPrompt } from '@types'

export const filterPrompts = (searchtext: string, posts: FullPrompt[]) => {
  const regex = new RegExp(searchtext, 'i') // 'i' flag for case-insensitive search
  return posts?.filter(
    (item) =>
      regex.test(item.user.name!) ||
      regex.test(item.tag) ||
      regex.test(item.prompt)
  )
}
