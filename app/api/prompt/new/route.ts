import { NextResponse } from 'next/server'
import getCurrentUser from '@app/actions/getCurrentUser'
import prisma from '@libs/prismadb'

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser()
    const body = await request.json()
    const { prompt, tag } = body

    if (!currentUser?.id || !currentUser.email) {
      return new NextResponse('Unathorized', { status: 401 })
    }

    const newPrompt = await prisma.prompt.create({
      data: {
        userId: currentUser.id,
        prompt: prompt,
        tag: tag,
      },
    })

    return NextResponse.json(newPrompt)
  } catch (error) {}
}
