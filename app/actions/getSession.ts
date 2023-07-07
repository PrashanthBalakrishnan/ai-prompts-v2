import { getServerSession } from 'next-auth'
import { authOptions } from '@app/utils/authOptions'
import { NextResponse } from 'next/server'

export default async function getSession() {
  const session = await getServerSession(authOptions)
  if (!session) {
    return new NextResponse(JSON.stringify({ error: 'unauthorized' }), {
      status: 401,
    })
  }
  return NextResponse.json({ authenticated: !!session })
}