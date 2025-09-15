import React from 'react'
import { useNavigate } from 'react-router-dom'


export default function Topbar() {
const navigate = useNavigate()
const username = localStorage.getItem('username') || 'User'


function logout() {
localStorage.removeItem('token')
localStorage.removeItem('username')
navigate('/login')
}


return (
<div className="flex items-center justify-end gap-4">
<div className="text-sm text-gray-400">Signed in as <span className="text-gray-100 font-medium">{username || 'User'}</span></div>
<button onClick={logout} className="px-3 py-1 rounded-md bg-red-600 hover:bg-red-700 text-sm">Logout</button>
</div>
)
}