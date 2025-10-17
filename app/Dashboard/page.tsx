import { createServerSupabase } from '@/lib/auth'
import type { Build } from '@/types'

export default async function Dashboard() {
  const supabase = await createServerSupabase()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return <div>Please log in (go to /(auth)/login)</div>

  const { data: builds } = await supabase.from('builds').select('*') as unknown as { data: Build[] | null }

  return (
    <main className="space-y-6">
      <h1 className="text-3xl font-semibold">Dashboard</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {builds?.map((b: Build) => (
          <a key={b.id} href={`/builds/${b.id}`} className="rounded-xl border border-neutral-800 p-4 hover:border-neutral-700">
            <p className="text-neutral-400">{b.make} {b.model} {b.year ?? ''}</p>
            <p className="text-xl font-semibold">{b.name ?? 'Untitled Build'}</p>
          </a>
        ))}
      </div>
    </main>
  )
}
