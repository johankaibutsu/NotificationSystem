"use client"
import { useState, useEffect } from 'react'

export default function AdminPanel() {
  const [triggers, setTriggers] = useState([])
  const channels = ['whatsapp', 'email', 'web_push']

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API}/triggers/`).then(res => res.json()).then(setTriggers)
  }, [])

  const updateTemplate = async (triggerId, channel, data) => {
     // Logic to PUT/POST to backend /templates/ endpoint
     alert("Saved!")
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Notification Admin</h1>
      <table className="w-full border-collapse border border-slate-400">
        <thead className="bg-blue-900 text-white">
          <tr>
            <th className="border p-4">Trigger</th>
            {channels.map(c => <th key={c} className="border p-4 capitalize">{c}</th>)}
          </tr>
        </thead>
        <tbody>
          {triggers.map(trigger => (
            <tr key={trigger.id}>
              <td className="border p-4 font-bold">{trigger.name}</td>
              {channels.map(channel => (
                <td key={channel} className="border p-4 text-center">
                  <button className="bg-gray-200 p-2 rounded" onClick={() => {/* Open Modal to Edit */}}>
                    {trigger.templates.find(t => t.channel === channel)?.is_active ? "✅ Active" : "➕ Setup"}
                  </button>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
