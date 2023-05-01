import { NextResponse } from 'next/server'
import { db } from '@/lib/kysely'

export async function POST(request: Request) {
  const body = await request.json()
  try {
    const data = await db.insertInto('users').values(body)
    return NextResponse.json(data)
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    return NextResponse.json({ error: 'Unknown error' }, { status: 500 })
  } finally {
    return NextResponse.redirect('/create')
  }
}
