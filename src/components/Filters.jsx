import React from 'react'


export default function Filters({ search, setSearch, statusFilter, setStatusFilter, riskFilter, setRiskFilter }) {
return (
<div className="grid grid-cols-1 md:grid-cols-4 gap-3">
<input
value={search}
onChange={(e) => setSearch(e.target.value)}
placeholder="Search by contract name or parties"
className="col-span-1 md:col-span-2 rounded-md bg-gray-900 border border-gray-700 px-3 py-2"
/>


<select
value={statusFilter}
onChange={(e) => setStatusFilter(e.target.value)}
className="rounded-md bg-gray-900 border border-gray-700 px-3 py-2"
>
<option>All</option>
<option>Active</option>
<option>Expired</option>
<option>Renewal Due</option>
</select>


<select
value={riskFilter}
onChange={(e) => setRiskFilter(e.target.value)}
className="rounded-md bg-gray-900 border border-gray-700 px-3 py-2"
>
<option>All</option>
<option>Low</option>
<option>Medium</option>
<option>High</option>
</select>
</div>
)
}