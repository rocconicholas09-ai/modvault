'use client'
import { supabase } from '@/lib/supabase-client'
import { useState } from 'react'
import type { ModStatus } from '@/types'

type FormState = {
  date: string;
  category: string;
  part: string;
  brand: string;
  cost: string;
  shipping: string;
  tax: string;
  install_cost: string;
  status: ModStatus;
}

export default function ModForm({ buildId }: { buildId: string }) {
  const [form, setForm] = useState<FormState>({
    date:'', category:'', part:'', brand:'', cost:'', shipping:'', tax:'', install_cost:'', status:'Planned'
  })
  const [saving, setSaving] = useState(false)

  async function save(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSaving(true)
    const { error } = await supabase.from('mods').insert([{
      build_id: buildId,
      date: form.date || null,
      category: form.category || null,
      part: form.part || null,
      brand: form.brand || null,
      cost: form.cost ? Number(form.cost) : null,
      shipping: form.shipping ? Number(form.shipping) : null,
      tax: form.tax ? Number(form.tax) : null,
      install_cost: form.install_cost ? Number(form.install_cost) : null,
      status: form.status
    }])
    setSaving(false)
    if (!error) window.location.reload()
  }

  function set<K extends keyof FormState>(k: K, v: string){
    setForm(prev => ({ ...prev, [k]: v as unknown as FormState[K] }))
  }

  return (
    <form onSubmit={save} className="grid grid-cols-2 gap-3 rounded-2xl border border-neutral-800 p-4 md:grid-cols-6">
      <input className="rounded-lg bg-neutral-900 p-2" placeholder="Date" value={form.date} onChange={e=>set('date',e.target.value)} />
      <input className="rounded-lg bg-neutral-900 p-2" placeholder="Category" value={form.category} onChange={e=>set('category',e.target.value)} />
      <input className="col-span-2 rounded-lg bg-neutral-900 p-2" placeholder="Part / Mod" value={form.part} onChange={e=>set('part',e.target.value)} />
      <input className="rounded-lg bg-neutral-900 p-2" placeholder="Brand" value={form.brand} onChange={e=>set('brand',e.target.value)} />
      <select className="rounded-lg bg-neutral-900 p-2" value={form.status} onChange={e=>set('status',e.target.value)}>
        {(['Planned','Ordered','Installed','Returned','Canceled'] as ModStatus[]).map(s=> <option key={s}>{s}</option>)}
      </select>
      <input className="rounded-lg bg-neutral-900 p-2" placeholder="Cost" value={form.cost} onChange={e=>set('cost',e.target.value)} />
      <input className="rounded-lg bg-neutral-900 p-2" placeholder="Shipping" value={form.shipping} onChange={e=>set('shipping',e.target.value)} />
      <input className="rounded-lg bg-neutral-900 p-2" placeholder="Tax" value={form.tax} onChange={e=>set('tax',e.target.value)} />
      <input className="rounded-lg bg-neutral-900 p-2" placeholder="Install Cost" value={form.install_cost} onChange={e=>set('install_cost',e.target.value)} />
      <button disabled={saving} className="col-span-2 rounded-lg bg-blue-600 p-2 md:col-span-1">{saving?'Saving...':'Add Mod'}</button>
    </form>
  )
}
