import React from 'react'


export default function Pagination({ page, setPage, totalPages }) {
const canPrev = page > 1
const canNext = page < totalPages


const go = (p) => {
if (p < 1) p = 1
if (p > totalPages) p = totalPages
setPage(p)
}


// simple: prev, numbered buttons (up to 5), next
const pages = []
const start = Math.max(1, page - 2)
const end = Math.min(totalPages, start + 4)
for (let i = start; i <= end; i++) pages.push(i)


return (
<div className="flex items-center gap-2">
<button onClick={() => go(page - 1)} disabled={!canPrev} className={`px-3 py-1 rounded ${!canPrev ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800'}`}>
Prev
</button>


{pages.map((p) => (
<button key={p} onClick={() => go(p)} className={`px-3 py-1 rounded ${p === page ? 'bg-gray-700' : 'hover:bg-gray-800'}`}>
{p}
</button>
))}


<button onClick={() => go(page + 1)} disabled={!canNext} className={`px-3 py-1 rounded ${!canNext ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800'}`}>
Next
</button>
</div>
)
}