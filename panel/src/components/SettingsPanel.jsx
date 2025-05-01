import { useState } from "react";

export default function SettingsPanel() {
  const [tutorialUrl, setTutorialUrl] = useState("");

  const handleSave = async () => {
    const res = await fetch("/api/config/server-id", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ button2_url: tutorialUrl })
    });
    if (res.ok) alert("Saved!");
    else alert("Failed");
  };

  return (
    <div className="bg-gray-800 p-4 rounded-xl">
      <h2 className="text-xl font-bold mb-2">Settings</h2>
      <label className="block text-sm mb-1">Tutorial URL</label>
      <input
        className="w-full px-3 py-1 text-black rounded"
        placeholder="https://your-tutorial.com"
        value={tutorialUrl}
        onChange={e => setTutorialUrl(e.target.value)}
      />
      <button onClick={handleSave} className="mt-3 px-4 py-1 bg-blue-600 rounded hover:bg-blue-700">
        Save
      </button>
    </div>
  );
}
