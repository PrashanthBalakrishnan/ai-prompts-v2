import getCurrentUser from '@app/actions/getCurrentUser'
import prisma from '@libs/prismadb'
import { NextResponse } from 'next/server'
import { OpenAI } from 'langchain/llms/openai'

const analyze = async (prompt: string) => {
  const model = new OpenAI({
    temperature: 0,
    modelName: 'gpt-3.5-turbo',
  })
  const result = await model.call(prompt)
  console.log(result)
}

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
      include: {
        user: true,
      },
    })
    const analyze = async (prompt: string) => {
      const model = new OpenAI({
        temperature: 0,
        modelName: 'gpt-3.5-turbo',
      })
      return await model.call(prompt)
    }

    const aiResponse = await analyze(prompt?.prompt!)

    const promptWithResponse = { ...prompt, aiResponse }

    return NextResponse.json(promptWithResponse)
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
