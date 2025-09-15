import React, { useEffect, useMemo, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import Filters from '../components/Filters'
import ContractTable from '../components/ContractTable'
import Pagination from '../components/Pagination'
import { fetchContracts } from '../api/mockApi'


export default function Dashboard() {
const [contracts, setContracts] = useState([])
const [loading, setLoading] = useState(true)
const [error, setError] = useState(null)


// UI state
const [search, setSearch] = useState('')
const [statusFilter, setStatusFilter] = useState('All')
const [riskFilter, setRiskFilter] = useState('All')
const [page, setPage] = useState(1)
const perPage = 10


useEffect(() => {
setLoading(true)
setError(null)
fetchContracts()
.then((data) => {
setContracts(data)
})
.catch((err) => setError(err.message || 'Failed to load'))
.finally(() => setLoading(false))
}, [])


// Derived filtered list
const filtered = useMemo(() => {
let list = contracts.slice()
if (statusFilter !== 'All') {
list = list.filter((c) => c.status === statusFilter)
}
if (riskFilter !== 'All') {
list = list.filter((c) => c.risk === riskFilter)
}
if (search.trim()) {
const q = search.toLowerCase()
list = list.filter(
(c) => c.name.toLowerCase().includes(q) || c.parties.toLowerCase().includes(q)
)
}
// sort by expiry date ascending
list.sort((a, b) => new Date(a.expiryDate) - new Date(b.expiryDate))
}, [contracts, statusFilter, riskFilter, search])


// handle page reset when filters/search change
useEffect(() => setPage(1), [statusFilter, riskFilter, search])


const total = filtered.length
const totalPages = Math.max(1, Math.ceil(total / perPage))
const start = (page - 1) * perPage
const visible = filtered.slice(start, start + perPage)


return (
<div className="min-h-screen flex">
<Sidebar />
<div className="flex-1 p-6">
<Topbar />


<div className="mt-6 space-y-6">
<div className="flex items-center justify-between">
<h2 className="text-xl font-semibold">Contracts Dashboard</h2>
</div>


<div className="card">
<Filters
search={search}
setSearch={setSearch}
statusFilter={statusFilter}
setStatusFilter={setStatusFilter}
riskFilter={riskFilter}
setRiskFilter={setRiskFilter}
/>


<div className="mt-4">
<ContractTable
data={visible}
loading={loading}
error={error}
total={total}
/>


<div className="mt-4 flex items-center justify-between">
<div className="text-sm text-gray-400">Showing {visible.length} of {total} contracts</div>
<Pagination page={page} setPage={setPage} totalPages={totalPages} />
</div>
</div>
</div>
</div>


</div>
</div>
)
}