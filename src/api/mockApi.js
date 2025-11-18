

function generateContracts(count = 45) {
const statuses = ['Active', 'Expired', 'Renewal Due']
const risks = ['Low', 'Medium', 'High']
const companies = [
'Acme Corp',
'Globex',
'Initech',
'Umbrella',
'Holi',
'Stark Inc',
'Wayne Enterprises',
'Pied Piper',
]


const items = []
for (let i = 1; i <= count; i++) {
// spread dates around now: some past, some future
const offset = (i - Math.floor(count / 2)) * 8 // days
const expiry = new Date(Date.now() + offset * 24 * 60 * 60 * 1000)


items.push({
id: i,
name: `Contract ${i}`,
parties: `${companies[i % companies.length]} & ${companies[(i + 1) % companies.length]}`,
expiryDate: expiry.toISOString(),
status: statuses[i % statuses.length],
risk: risks[i % risks.length],
})
}
return items
}


const DATA = generateContracts(45)


export function fetchContracts() {
// simulate delay & sometimes error
return new Promise((resolve, reject) => {
setTimeout(() => {
// randomly throw an error ~7% of the time to test error state
if (Math.random() < 0.07) return reject(new Error('Network error'))
resolve(DATA)
}, 600)
})
}
