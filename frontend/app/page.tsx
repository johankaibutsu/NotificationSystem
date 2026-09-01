"use client"
import React, { useState } from 'react';

export default function NotificationDashboard() {
  const [loading, setLoading] = useState<number | null>(null);

  // ONLY Login and Logout triggers
  const triggers = [
    { id: 1, name: 'Login Event', slug: 'login', color: 'border-green-500' },
    { id: 2, name: 'Logout Event', slug: 'logout', color: 'border-red-500' },
  ];

  const fireTrigger = async (id: number) => {
    setLoading(id);
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/triggers/${id}/fire/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) alert("Success: Notifications Sent!");
      else alert("Error: Trigger ID not found.");
    } catch (err) {
      alert("Backend Connection Failed.");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-10 font-sans">
      <div className="max-w-4xl mx-auto">

        <header className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900">Notification System Simulator</h1>
          <p className="text-gray-500 mt-2">Test multi-channel delivery for Login and Logout events.</p>
        </header>

        {/* This creates the side-by-side grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {triggers.map((trigger) => (
            <div key={trigger.id} className={`bg-white p-6 rounded-2xl shadow-sm border-t-4 ${trigger.color}`}>
              <h2 className="text-xl font-bold mb-4">{trigger.name}</h2>

              <div className="space-y-3 mb-6 text-sm text-gray-600">
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span>📱 WhatsApp</span>
                  <span className="text-gray-400">Cloud API</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span>✉️ Email</span>
                  <span className="text-gray-400">Resend API</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span>🌐 Web Push</span>
                  <span className="text-gray-400">OneSignal</span>
                </div>
              </div>

              <button
                onClick={() => fireTrigger(trigger.id)}
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors"
              >
                {loading === trigger.id ? "Firing..." : "Fire All Channels"}
              </button>

              <p className="mt-4 text-xs text-gray-400 text-center uppercase tracking-widest">
                Slug: {trigger.slug} | ID: {trigger.id}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
