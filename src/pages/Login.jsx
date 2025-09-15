import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


export default function Login() {
const [username, setUsername] = useState('')
const [password, setPassword] = useState('')
const [error, setError] = useState('')
const navigate = useNavigate()


const handleSubmit = (e) => {
e.preventDefault()
setError('')
if (password !== 'test123') {
setError('Invalid password. Try: test123')
return
}


// mock token
localStorage.setItem('token', 'mock-jwt-token')
localStorage.setItem('username', username || 'User')
navigate('/')
}


return (
<div className="min-h-screen flex items-center justify-center px-4">
<div className="w-full max-w-md card">
<h1 className="text-2xl font-semibold mb-4">Sign in</h1>
<form onSubmit={handleSubmit} className="space-y-4">
<div>
<label className="block text-sm mb-1">Username</label>
<input
value={username}
onChange={(e) => setUsername(e.target.value)}
className="w-full rounded-md bg-gray-900 border border-gray-700 px-3 py-2"
placeholder="any username"
/>
</div>
<div>
<label className="block text-sm mb-1">Password</label>
<input
value={password}
onChange={(e) => setPassword(e.target.value)}
type="password"
className="w-full rounded-md bg-gray-900 border border-gray-700 px-3 py-2"
placeholder="test123"
/>
</div>


{error && <div className="text-red-400 text-sm">{error}</div>}


<div className="flex items-center justify-between">
<button
type="submit"
className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700"
>
Sign in
</button>
<div className="text-xs text-gray-400">Password: <span className="text-gray-200">test123</span></div>
</div>
</form>
</div>
</div>
)
}