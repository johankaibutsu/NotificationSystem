"use client"
import { useState, useEffect } from 'react'

// 1. Define the shapes of our data for TypeScript
interface Template {
  id: number;
  channel: string;
  is_active: boolean;
  subject?: string;
  body: string;
}

interface Trigger {
  id: number;
  name: string;
  slug: string;
  templates: Template[];
}

export default function AdminPanel() {
  // 2. Tell useState that it will hold an array of Triggers
  const [triggers, setTriggers] = useState<Trigger[]>([]);
  const channels = ['whatsapp', 'email', 'web_push'];

  useEffect(() => {
    const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";
    fetch(`${apiBase}/triggers/`)
      .then(res => res.json())
      .then((data: Trigger[]) => setTriggers(data))
      .catch(err => console.error("Failed to load triggers", err));
  }, []);

  // 3. Add types to function parameters
  const updateTemplate = async (triggerId: number, channel: string, data: any) => {
     console.log("Updating", triggerId, channel, data);
     alert("Feature: Modal editing would happen here.");
  };

  return (
    <div className="p-10 bg-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Notification Admin</h1>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-slate-900 text-white">
            <tr>
              <th className="border p-4 text-left">Trigger</th>
              {channels.map(c => <th key={c} className="border p-4 capitalize">{c}</th>)}
            </tr>
          </thead>
          <tbody>
            {triggers.map((trigger) => (
              <tr key={trigger.id} className="hover:bg-gray-50 text-gray-800">
                <td className="border p-4 font-bold">{trigger.name}</td>
                {channels.map(channel => {
                  // Find if a template exists for this channel
                  const template = trigger.templates.find((t: Template) => t.channel === channel);
                  return (
                    <td key={channel} className="border p-4 text-center">
                      <button 
                        className={`p-2 rounded text-sm font-medium ${
                          template?.is_active 
                            ? "bg-emerald-100 text-emerald-700 border border-emerald-200" 
                            : "bg-gray-100 text-gray-500 border border-gray-200"
                        }`}
                        onClick={() => updateTemplate(trigger.id, channel, {})}
                      >
                        {template?.is_active ? "✅ Active" : "➕ Setup"}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-8 p-4 bg-blue-50 border border-blue-100 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Tip:</strong> Rows are Triggers. Columns are Channels. 
          Green buttons indicate an active template that will fire.
        </p>
      </div>
    </div>
  );
}
