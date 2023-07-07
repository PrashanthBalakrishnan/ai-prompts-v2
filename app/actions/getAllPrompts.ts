import prisma from '@libs/prismadb'

const getAllPrompts = async () => {
  try {
    const allUserandPrompt = await prisma.prompt.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        user: true,
      },
    })
    return allUserandPrompt
  } catch (error) {
    return []
  }
}
export default getAllPrompts
