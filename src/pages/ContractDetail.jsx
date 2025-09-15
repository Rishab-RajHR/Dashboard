import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";


export default function ContractDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showEvidence, setShowEvidence] = useState(false);

  useEffect(() => {
    const fetchContract = async () => {
      try {
        const res = await fetch("/contracts.json");
        const data = await res.json();
        const found = data.find((c) => c.id === Number(id));
        setContract(found);
      } catch (err) {
        console.error("Error loading contract:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchContract();
  }, [id]);

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  if (!contract) {
    return (
      <div className="p-6">
        <p className="text-red-500">Contract not found.</p>
        <Button className="mt-4" onClick={() => navigate("/dashboard")}>
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8">
      {/* Back button */}
      <Button variant="outline" onClick={() => navigate("/dashboard")}>
        ← Back
      </Button>

      {/* Metadata */}
      <div className="bg-white shadow rounded-2xl p-6">
        <h1 className="text-2xl font-bold mb-4">{contract.title}</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-gray-500 text-sm">Parties</p>
            <p>{contract.parties.join(" vs ")}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Start Date</p>
            <p>{contract.startDate}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Expiry Date</p>
            <p>{contract.expiryDate}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Status</p>
            <span
              className={`px-2 py-1 rounded-full text-sm ${
                contract.status === "Active"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {contract.status}
            </span>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-gray-500 text-sm">Risk Score</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
            <div
              className="bg-red-500 h-2.5 rounded-full"
              style={{ width: `${contract.riskScore}%` }}
            ></div>
          </div>
          <p className="text-sm mt-1">{contract.riskScore}%</p>
        </div>
      </div>

      {/* Clauses Section */}
      <div>
        <h2 className="text-xl font-semibold mb-3">Clauses</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {contract.clauses.map((clause) => (
            <div
              key={clause.id}
              className="bg-white shadow rounded-2xl p-4 border"
            >
              <h3 className="font-semibold text-lg">{clause.title}</h3>
              <p className="text-gray-600 mt-2">{clause.summary}</p>
              <div className="mt-3">
                <p className="text-sm text-gray-500">Confidence Score</p>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-500 h-2.5 rounded-full"
                    style={{ width: `${clause.confidenceScore}%` }}
                  ></div>
                </div>
                <p className="text-sm mt-1">{clause.confidenceScore}%</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Insights Section */}
      <div>
        <h2 className="text-xl font-semibold mb-3">AI Insights</h2>
        <div className="space-y-3">
          {contract.aiInsights.map((insight) => (
            <div
              key={insight.id}
              className="bg-white p-4 rounded-2xl shadow border"
            >
              <p className="font-medium">{insight.risk}</p>
              <span
                className={`inline-block px-2 py-1 text-xs rounded-full mt-1 ${
                  insight.severity === "High"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {insight.severity}
              </span>
              <p className="text-gray-600 mt-2">{insight.recommendation}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Evidence Panel Trigger */}
      <div className="mt-6">
        <Button onClick={() => setShowEvidence(true)}>
          View Evidence
        </Button>
      </div>

      {/* Evidence Drawer */}
      <Drawer open={showEvidence} onOpenChange={setShowEvidence}>
        <div className="p-6 space-y-4">
          <h2 className="text-xl font-semibold">Evidence</h2>
          {contract.evidence.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow rounded-xl p-4 border"
            >
              <p>{item.snippet}</p>
              <div className="mt-2">
                <p className="text-sm text-gray-500">Relevance Score</p>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-green-500 h-2.5 rounded-full"
                    style={{ width: `${item.relevanceScore}%` }}
                  ></div>
                </div>
                <p className="text-sm mt-1">{item.relevanceScore}%</p>
              </div>
            </div>
          ))}
        </div>
      </Drawer>
    </div>
  );
}
