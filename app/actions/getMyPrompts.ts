import prisma from '@libs/prismadb'
import getCurrentUser from './getCurrentUser'

const getMyPrompts = async () => {
  const user = await getCurrentUser()
  try {
    const myPrompts = await prisma.prompt.findMany({
      where: {
        userId: user?.id,
      },
      include: {
        user: true,
      },
    })
    return myPrompts
  } catch (error) {}
}
export default getMyPrompts
