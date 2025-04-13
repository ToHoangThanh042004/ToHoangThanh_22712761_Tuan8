import React from "react";

// Main Dashboard Layout
export default function Dashboard() {
  const baseClass = "px-4 py-2 text-left rounded-xl";

  return (
    <div className="min-h-screen bg-gray-100 font-sans text-sm text-gray-700 grid grid-cols-[250px_1fr]">
      {/* Sidebar */}
      <aside className="bg-white p-4 flex flex-col gap-4 shadow">
        <div className="text-2xl font-bold mb-6 text-pink-600">Logo</div>
        <nav className="flex flex-col gap-3">
          <a href="/" className={`${baseClass} hover:text-pink-600`}>
            Dashboard
          </a>
          <a href="/projects" className={`${baseClass} hover:text-pink-600`}>
            Projects
          </a>
          <a href="/teams" className={`${baseClass} hover:text-pink-600`}>
            Teams
          </a>
          <a href="/analytics" className={`${baseClass} hover:text-pink-600`}>
            Analytics
          </a>
          <a href="/messages" className={`${baseClass} hover:text-pink-600`}>
            Messages
          </a>
          <a href="/integrations" className={`${baseClass} hover:text-pink-600`}>
            Integrations
          </a>
        </nav>
        <div className="mt-auto bg-indigo-100 p-3 rounded-xl text-center">
          <p className="font-semibold mb-2">V2.0 is available</p>
          <button className="bg-blue-600 text-white px-3 py-1 rounded-full">Try now</button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="p-6 grid grid-rows-[auto_auto_1fr] gap-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-pink-600">Dashboard</h1>
          <div className="flex gap-4 items-center">
            <input type="text" placeholder="Search..." className="border rounded-lg px-3 py-1" />
          </div>
        </div>

        {/* Placeholder for Main Content */}
        <div className="bg-white rounded-xl shadow p-4">
          <p className="text-gray-700">Main content goes here...</p>
        </div>
      </main>
    </div>
  );
}
// End of Dashboard Layout
