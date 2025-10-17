import { createServerSupabase } from '@/lib/auth'
import ModForm from '@/components/mod-form'
import type { Build, Mod, Maintenance } from '@/types'

export default async function BuildPage({ params }: { params: { id: string } }) {
  const supabase = await createServerSupabase()

  const [{ data: build }, { data: mods }, { data: maint }] = await Promise.all([
    supabase.from('builds').select('*').eq('id', params.id).single() as unknown as Promise<{ data: Build | null }>,
    supabase.from('mods').select('*').eq('build_id', params.id).order('date', { ascending: false }) as unknown as Promise<{ data: Mod[] | null }>,
    supabase.from('maintenance').select('*').eq('build_id', params.id).order('date', { ascending: false }) as unknown as Promise<{ data: Maintenance[] | null }>,
  ])

  return (
    <main className="space-y-6">
      <h1 className="text-2xl font-semibold">{build?.make} {build?.model} {build?.year ?? ''}</h1>
      <ModForm buildId={params.id} />

      <section>
        <h2 className="mb-2 text-xl font-medium">Mods</h2>
        <div className="overflow-x-auto rounded-2xl border border-neutral-800">
          <table className="w-full text-sm">
            <thead className="bg-neutral-900">
              <tr>
                <th className="p-2 text-left">Date</th>
                <th className="p-2 text-left">Category</th>
                <th className="p-2 text-left">Part</th>
                <th className="p-2 text-right">Total</th>
                <th className="p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {mods?.map((m: Mod) => (
                <tr key={m.id} className="border-t border-neutral-800">
                  <td className="p-2">{m.date ?? ''}</td>
                  <td className="p-2">{m.category ?? ''}</td>
                  <td className="p-2">{m.part ?? ''}</td>
                  <td className="p-2 text-right">
                    {typeof m.total_cost === 'number' ? `$${m.total_cost.toFixed(2)}` : (m.total_cost ?? '')}
                  </td>
                  <td className="p-2 text-center">{m.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="mb-2 text-xl font-medium">Maintenance</h2>
        <ul className="space-y-2">
          {maint?.map((x: Maintenance) => (
            <li key={x.id} className="rounded-xl border border-neutral-800 p-3">
              <div className="flex items-center justify-between">
                <span>{x.type ?? ''} • {x.date ?? ''}</span>
                <span className="font-semibold">${x.cost ?? ''}</span>
              </div>
              <p className="text-sm text-neutral-400">{x.vendor ?? ''} • {x.mileage ?? ''} mi</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
