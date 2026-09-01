"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

// Define what a Trigger looks like for TypeScript
interface Trigger {
  id: number;
  name: string;
  slug: string;
}

export default function NotificationDashboard() {
  const [loading, setLoading] = useState<number | null>(null);
  const [availableTriggers, setAvailableTriggers] = useState<Trigger[]>([]);
  
  // Get API URL from Environment Variables (set this in Vercel!)
  const API_BASE = process.env.NEXT_PUBLIC_API || "http://127.0.0.1:8000/api";

  // Fetch triggers from backend on load to get the correct IDs
  useEffect(() => {
    fetch(`${API_BASE}/triggers/`)
      .then(res => res.json())
      .then((data: Trigger[]) => {
        // Filter to only show Login and Logout
        const filtered = data.filter(t => t.slug === 'login' || t.slug === 'logout');
        setAvailableTriggers(filtered);
      })
      .catch(err => console.error("Backend not reachable:", err));
  }, [API_BASE]);

  const fireTrigger = async (id: number) => {
    setLoading(id);
    try {
      const response = await fetch(`${API_BASE}/triggers/${id}/fire/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        alert("🚀 Success: Notifications Sent!");
      } else {
        alert("❌ Error: Trigger ID no longer exists. Refresh the page.");
      }
    } catch (err) {
      alert("⚠️ Connection Failed. Check if Render backend is awake.");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12 font-sans text-slate-900">
      <div className="max-w-4xl mx-auto">

        <header className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
              Event <span className="text-blue-600">Simulator</span>
            </h1>
            <p className="text-slate-500 mt-2 text-lg">Click a trigger to fire multi-channel notifications.</p>
          </div>
          <Link href="/admin" className="text-blue-600 font-semibold hover:underline text-sm border border-blue-200 px-4 py-2 rounded-lg bg-white shadow-sm">
            Admin Panel →
          </Link>
        </header>

        {availableTriggers.length === 0 ? (
          <div className="bg-white p-10 rounded-2xl border border-dashed border-slate-300 text-center">
            <p className="text-slate-400">No triggers found. Please add 'login' and 'logout' triggers in Django Admin.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {availableTriggers.map((trigger) => (
              <div 
                key={trigger.id} 
                className={`bg-white p-8 rounded-3xl shadow-sm border-t-8 transition-all hover:shadow-md ${
                  trigger.slug === 'login' ? 'border-emerald-500' : 'border-rose-500'
                }`}
              >
                <div className="flex justify-between items-start mb-6">
                   <h2 className="text-2xl font-bold text-slate-800">{trigger.name}</h2>
                   <span className="text-xs font-mono bg-slate-100 px-2 py-1 rounded text-slate-400">ID: {trigger.id}</span>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-between text-sm text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <span className="flex items-center gap-2">📱 WhatsApp</span>
                    <span className="text-slate-400 text-xs font-medium uppercase">Active</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <span className="flex items-center gap-2">✉️ Email</span>
                    <span className="text-slate-400 text-xs font-medium uppercase">Active</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <span className="flex items-center gap-2">🌐 Web Push</span>
                    <span className="text-slate-400 text-xs font-medium uppercase">Active</span>
                  </div>
                </div>

                <button
                  onClick={() => fireTrigger(trigger.id)}
                  disabled={loading !== null}
                  className={`w-full py-4 rounded-2xl font-bold text-white shadow-lg transition-all active:scale-95 disabled:opacity-50 ${
                    trigger.slug === 'login' ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-100' : 'bg-rose-600 hover:bg-rose-700 shadow-rose-100'
                  }`}
                >
                  {loading === trigger.id ? "Firing APIs..." : `Simulate ${trigger.name}`}
                </button>
              </div>
            ))}
          </div>
        )}

        <footer className="mt-20 text-center text-slate-400 text-xs border-t pt-8">
           <p>Connected to: <code className="bg-slate-100 px-2 py-0.5 rounded">{API_BASE}</code></p>
        </footer>
      </div>
    </div>
  );
}
