"use client"
import { useState, useEffect } from 'react'

// 1. Define what a Template looks like
interface NotificationTemplate {
  id: number;
  channel: string;
  body: string;
  subject?: string;
  is_active: boolean;
}

// 2. Define what a Trigger looks like
interface Trigger {
  id: number;
  name: string;
  slug: string;
  templates: NotificationTemplate[];
}

export default function AdminPanel() {
  // 3. Tell TypeScript this state is an array of Triggers (prevents the 'never' error)
  const [triggers, setTriggers] = useState<Trigger[]>([]);
  const channels = ['whatsapp', 'email', 'web_push'];

  useEffect(() => {
    // Use the same env variable you used in the other page
    const apiBase = process.env.NEXT_PUBLIC_API || "http://127.0.0.1:8000/api";
    
    fetch(`${apiBase}/triggers/`)
      .then(res => res.json())
      .then((data: Trigger[]) => setTriggers(data))
      .catch(err => console.error("Failed to load triggers", err));
  }, []);

  // 4. Added explicit types to parameters to fix the TS7006 errors
  const updateTemplate = async (triggerId: number, channel: string, data: any) => {
     console.log("Edit requested for:", triggerId, channel, data);
     alert("Template editing modal would open here.");
  };

  return (
    <div className="p-10 bg-white min-h-screen text-slate-900">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-slate-800 border-b pb-4">
          Admin Notification Control
        </h1>
        
        <div className="overflow-hidden rounded-xl border border-slate-200 shadow-sm">
          <table className="w-full border-collapse bg-white">
            <thead className="bg-slate-50 text-slate-500 uppercase text-xs font-semibold tracking-wider">
              <tr>
                <th className="border-b p-4 text-left">Trigger (Events)</th>
                {channels.map(c => (
                  <th key={c} className="border-b p-4 text-center">{c}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {triggers.map((trigger) => (
                <tr key={trigger.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4">
                    <div className="font-bold text-slate-700">{trigger.name}</div>
                    <div className="text-xs text-slate-400 font-mono">slug: {trigger.slug}</div>
                  </td>
                  
                  {channels.map(channel => {
                    // 5. Added explicit type 't' to fix the callback error
                    const template = trigger.templates.find((t: NotificationTemplate) => t.channel === channel);
                    
                    return (
                      <td key={channel} className="p-4 text-center">
                        <button 
                          onClick={() => updateTemplate(trigger.id, channel, {})}
                          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-sm ${
                            template?.is_active 
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100" 
                              : "bg-slate-50 text-slate-400 border border-slate-200 hover:bg-slate-100"
                          }`}
                        >
                          {template?.is_active ? "● Active" : "○ Inactive"}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex gap-4 text-sm text-slate-500">
           <div className="flex items-center gap-1">
             <span className="w-3 h-3 rounded-full bg-emerald-500"></span> 
             Fires automatically on event
           </div>
           <div className="flex items-center gap-1">
             <span className="w-3 h-3 rounded-full bg-slate-300"></span> 
             Silenced / No template
           </div>
        </div>
      </div>
    </div>
  );
}
