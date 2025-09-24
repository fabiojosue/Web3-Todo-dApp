import { useEffect, useState } from 'react'
import { getProvider, getContract } from './lib/eth'

type Task = { id: bigint; content: string; completed: boolean }

export default function App() {
  const [account, setAccount] = useState<string>('')
  const [tasks, setTasks] = useState<Task[]>([])
  const [input, setInput] = useState('')

  useEffect(() => {
    (async () => {
      if (!('ethereum' in window)) return
      await load()
      ;(window as any).ethereum.on?.('accountsChanged', async () => {
        await load()
      })
      ;(window as any).ethereum.on?.('chainChanged', () => window.location.reload())
    })()
  }, [])

  async function connect() {
    const provider = await getProvider()
    await (provider as any).send('eth_requestAccounts', [])
    await load()
  }

  async function load() {
    try {
      const provider = await getProvider()
      const accounts = await provider.send('eth_accounts', [])
      setAccount(accounts?.[0] ?? '')
      await refreshTasks()
    } catch (e) {
      console.warn(e)
    }
  }

  async function refreshTasks() {
    const c = await getContract()
    const count: bigint = await c.taskCount()
    const items: Task[] = []
    for (let i = 1n; i <= count; i++) {
      const t = await c.tasks(i)
      items.push({ id: t.id, content: t.content, completed: t.completed })
    }
    setTasks(items)
  }

  async function addTask() {
    if (!input.trim()) return
    const provider = await getProvider()
    await provider.send('eth_requestAccounts', [])
    const signer = await provider.getSigner()
    const c = await getContract(signer)
    const tx = await c.createTask(input.trim())
    await tx.wait()
    setInput('')
    await refreshTasks()
  }

  async function toggle(id: bigint) {
    const provider = await getProvider()
    await provider.send('eth_requestAccounts', [])
    const signer = await provider.getSigner()
    const c = await getContract(signer)
    const tx = await c.toggleCompleted(id)
    await tx.wait()
    await refreshTasks()
  }

  return (
    <div style={{ maxWidth: 640, margin: '40px auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <h1>Blockchain To‑Do</h1>
      <p>
        {account ? <>Connected: <code>{account}</code></> : <button onClick={connect}>Connect Wallet</button>}
      </p>
      <div style={{ display: 'flex', gap: 8 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a task..."
          style={{ flex: 1, padding: 8 }}
        />
        <button onClick={addTask}>Add</button>
      </div>

      <ul style={{ marginTop: 16, paddingLeft: 16 }}>
        {tasks.map((t) => (
          <li key={String(t.id)} style={{ marginBottom: 8 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
              <input type="checkbox" checked={t.completed} onChange={() => toggle(t.id)} />
              <span>{t.content}</span>
              <small style={{ opacity: 0.6 }}>#{String(t.id)}</small>
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}
