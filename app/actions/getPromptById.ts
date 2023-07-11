import prisma from '@libs/prismadb'

const getPromptById = async (id: string) => {
  try {
    if (!id) {
      return null
    }

    const prompt = await prisma.prompt.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
      },
    })
    return prompt
  } catch (error) {
    console.log(error)
  }
}

export default getPromptById
