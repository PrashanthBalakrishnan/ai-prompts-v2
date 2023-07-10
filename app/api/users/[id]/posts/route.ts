import prisma from '@libs/prismadb'
import { NextResponse } from 'next/server'

interface IParams {
  id?: string
}

export async function GET(request: Request, { params }: { params: IParams }) {
  try {
    const { id } = params
    if (!id) {
      return NextResponse.json(null)
    }

    const userPrompts = await prisma.prompt.findMany({
      where: {
        userId: id,
      },
      include: {
        user: true,
      },
    })

    return NextResponse.json(userPrompts)
  } catch (error) {
    return NextResponse.json('Unable to find Prompts', { status: 400 })
  }
}
