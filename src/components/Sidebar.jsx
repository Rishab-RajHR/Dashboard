import React from 'react'
import { NavLink } from 'react-router-dom'


export default function Sidebar() {
return (
<aside className="w-64 p-6 border-r border-gray-800 h-screen sticky top-0">
<div className="mb-8">
<div className="text-2xl font-bold">My SaaS</div>
<div className="text-sm text-gray-400 mt-1">Contracts & Insights</div>
</div>


<nav className="space-y-2">
<NavLink to="/" className={({isActive}) => `block px-3 py-2 rounded-md ${isActive ? 'bg-gray-800' : 'hover:bg-gray-800'}`} end>
Contracts
</NavLink>
<a className="block px-3 py-2 rounded-md hover:bg-gray-800">Insights</a>
<a className="block px-3 py-2 rounded-md hover:bg-gray-800">Reports</a>
<a className="block px-3 py-2 rounded-md hover:bg-gray-800">Settings</a>
</nav>
</aside>
)
}