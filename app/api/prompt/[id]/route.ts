import getCurrentUser from '@app/actions/getCurrentUser'
import prisma from '@libs/prismadb'
import { NextResponse } from 'next/server'

interface IParams {
  id?: string
}

// GET

export async function GET(request: Request, { params }: { params: IParams }) {
  try {
    const { id } = params
    if (!id) {
      return NextResponse.json(null)
    }

    const prompt = await prisma.prompt.findUnique({
      where: {
        id,
      },
    })
    return NextResponse.json(prompt)
  } catch (error) {
    console.log(error)
  }
}

// Delete
export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  try {
    const { id } = params
    if (!id) {
      return NextResponse.json(null)
    }

    const deletedPrompt = await prisma.prompt.delete({
      where: {
        id,
      },
    })

    return NextResponse.json(deletedPrompt)
  } catch (error) {
    console.log(error)
  }
}

// Update
export async function PATCH(request: Request, { params }: { params: IParams }) {
  const { prompt, tag } = await request.json()
  const user = await getCurrentUser()
  try {
    const { id } = params
    if (!id) {
      return NextResponse.json(null)
    }

    const updatedPrompt = await prisma.prompt.update({
      where: {
        userId_id: {
          userId: user?.id as string,
          id: id,
        },
      },
      data: {
        prompt: prompt,
        tag: tag,
      },
    })

    return NextResponse.json(updatedPrompt)
  } catch (error) {}
}
