import React from 'react';

// Utility to safely format dates
function formatDate(iso) {
  if (!iso) return 'N/A'; // Handle null or undefined
  const d = new Date(iso);
  return isNaN(d.getTime()) ? 'Invalid Date' : d.toLocaleDateString();
}

// Badge component for risk levels
function RiskBadge({ risk }) {
  const base = 'px-2 py-1 rounded-full text-sm font-medium';

  switch (risk) {
    case 'Low':
      return <span className={`${base} bg-green-800 text-green-200`}>Low</span>;
    case 'Medium':
      return <span className={`${base} bg-yellow-800 text-yellow-200`}>Medium</span>;
    default:
      return <span className={`${base} bg-red-800 text-red-200`}>High</span>;
  }
}

// Main table component
export default function ContractTable({
  data = [],
  loading = false,
  error = null,
  total = 0,
}) {
  // Loading state
  if (loading) {
    return <div className="p-6">Loading contracts...</div>;
  }

  // Error state
  if (error) {
    return <div className="p-6 text-red-400">Error: {error}</div>;
  }

  // Empty state
  if (!Array.isArray(data) || data.length === 0) {
    return <div className="p-6 text-gray-400">No contracts yet.</div>;
  }

  // Render table
  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto text-left">
        <thead>
          <tr className="text-sm text-gray-400 border-b border-gray-700">
            <th className="p-3">Contract Name</th>
            <th className="p-3">Parties</th>
            <th className="p-3">Expiry Date</th>
            <th className="p-3">Status</th>
            <th className="p-3">Risk</th>
          </tr>
        </thead>
        <tbody>
          {data.map((c, index) => (
            <tr key={c.id || index} className="border-b border-gray-800 hover:bg-gray-900">
              <td className="p-3 font-medium">{c.name || 'Unnamed Contract'}</td>
              <td className="p-3 text-sm text-gray-300">{c.parties || 'Unknown'}</td>
              <td className="p-3 text-sm text-gray-300">{formatDate(c.expiryDate)}</td>
              <td className="p-3 text-sm">
                <span className="px-2 py-1 rounded-md bg-gray-800 text-gray-200">
                  {c.status || 'Pending'}
                </span>
              </td>
              <td className="p-3">
                <RiskBadge risk={c.risk || 'High'} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Total Contracts Display */}
      <div className="flex justify-end p-4 text-sm text-gray-400 border-t border-gray-700">
        Total Contracts: <span className="ml-2 font-medium text-gray-200">{total}</span>
      </div>
    </div>
  );
}
