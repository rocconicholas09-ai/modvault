'use client'
import { supabase } from '@/lib/supabase-client'
import { useState } from 'react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mode, setMode] = useState<'signin'|'signup'>('signup')
  const [msg, setMsg] = useState('')

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setMsg('')
    const fn: any = mode === 'signup' ? supabase.auth.signUp : supabase.auth.signInWithPassword
    const { error } = await fn({ email, password })
    setMsg(error ? error.message : 'Check your email or continue')
  }

  return (
    <div className="mx-auto max-w-md">
      <h1 className="mb-4 text-2xl font-semibold">{mode==='signup'?'Create account':'Sign in'}</h1>
      <form onSubmit={submit} className="flex flex-col gap-3">
        <input className="rounded-lg bg-neutral-900 p-3" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="rounded-lg bg-neutral-900 p-3" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="rounded-lg bg-blue-600 p-3">{mode==='signup'?'Sign up':'Sign in'}</button>
      </form>
      <button className="mt-3 text-sm text-neutral-400" onClick={()=>setMode(mode==='signup'?'signin':'signup')}>
        {mode==='signup'?'Have an account? Sign in':'New here? Create an account'}
      </button>
      {msg && <p className="mt-3 text-sm text-emerald-400">{msg}</p>}
    </div>
  )
}
