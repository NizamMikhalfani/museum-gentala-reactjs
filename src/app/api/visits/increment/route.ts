import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth'
import { promises as fs } from 'fs'
import path from 'path'

const visitsFilePath = path.join(process.cwd(), 'src', 'data', 'visits.json')

export async function POST() {
  const admin = await requireAdmin()
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const raw = await fs.readFile(visitsFilePath, 'utf-8')
    const data = JSON.parse(raw) as { count: number; history: Array<{ ts: string }> }
    data.count = (data.count || 0) + 1
    data.history = data.history || []
    data.history.unshift({ ts: new Date().toISOString() })
    if (data.history.length > 200) data.history.length = 200
    await fs.writeFile(visitsFilePath, JSON.stringify(data, null, 2), 'utf-8')
    return NextResponse.json(data)
  } catch (err) {
    console.error('increment visits error', err)
    return NextResponse.json({ error: 'Error' }, { status: 500 })
  }
}
