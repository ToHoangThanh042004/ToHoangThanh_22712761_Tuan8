import React from "react";
import { NavLink } from "react-router-dom";

export default function Projects() {
  const baseClass = "px-4 py-2 text-left rounded-xl";

  return (
    <div className="min-h-screen bg-gray-100 font-sans text-sm text-gray-700 grid grid-cols-[250px_1fr]">
      {/* Sidebar */}
      <aside className="bg-white p-4 flex flex-col gap-4 shadow">
        <div className="text-2xl font-bold mb-6 text-pink-600">Logo</div>
        <nav className="flex flex-col gap-3">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${baseClass} ${isActive ? "bg-pink-500 text-white" : "hover:text-pink-600"}`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/projects"
            className={({ isActive }) =>
              `${baseClass} ${isActive ? "bg-pink-500 text-white" : "hover:text-pink-600"}`
            }
          >
            Projects
          </NavLink>
          <NavLink
            to="/teams"
            className={({ isActive }) =>
              `${baseClass} ${isActive ? "bg-pink-500 text-white" : "hover:text-pink-600"}`
            }
          >
            Teams
          </NavLink>
          <NavLink
            to="/analytics"
            className={({ isActive }) =>
              `${baseClass} ${isActive ? "bg-pink-500 text-white" : "hover:text-pink-600"}`
            }
          >
            Analytics
          </NavLink>
          <NavLink
            to="/messages"
            className={({ isActive }) =>
              `${baseClass} ${isActive ? "bg-pink-500 text-white" : "hover:text-pink-600"}`
            }
          >
            Messages
          </NavLink>
          <NavLink
            to="/integrations"
            className={({ isActive }) =>
              `${baseClass} ${isActive ? "bg-pink-500 text-white" : "hover:text-pink-600"}`
            }
          >
            Integrations
          </NavLink>
        </nav>

        <div className="mt-auto bg-indigo-100 p-3 rounded-xl text-center">
          <p className="font-semibold mb-2">V2.0 is available</p>
          <button className="bg-blue-600 text-white px-3 py-1 rounded-full">Try now</button>
        </div>
      </aside>

      {/* Main content */}
      <div className="p-6">
        <h1 className="text-2xl font-bold text-pink-600">Projects</h1>
        <p className="mt-4 text-gray-700">This is the Projects page.</p>
      </div>
    </div>
  );
}
