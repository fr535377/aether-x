import React from "react";
import Header from "./components/Header";
import SettingsPanel from "./components/SettingsPanel";
import UserList from "./components/UserList";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <Header />
      <div className="grid md:grid-cols-2 gap-4 mt-6">
        <SettingsPanel />
        <UserList />
      </div>
    </div>
  );
}
