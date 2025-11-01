import { useState, useEffect } from "react";
import ProposalCard from "../components/ProposalCard";

const MODULE_ADDRESS =
  "0x8c2717687c3ffe936360258323b0966cf24a45cb15bf2c038029852bb4ec1d29";

export default function VoterDashboard() {
  const [owner, setOwner] = useState("");
  const [id, setId] = useState("");
  const [support, setSupport] = useState(true);
  const [proposals, setProposals] = useState([]);
  const [error, setError] = useState("");

  const vote = async () => {
    setError("");

    // Validation
    if (!owner) {
      setError("⚠️ Please enter the proposal owner's address");
      return;
    }
    if (!owner.startsWith("0x")) {
      setError("⚠️ Owner address must start with 0x");
      return;
    }
    if (id === "") {
      setError("⚠️ Please enter a proposal ID");
      return;
    }

    const proposalId = parseInt(id);
    if (isNaN(proposalId) || proposalId < 0) {
      setError("⚠️ Proposal ID must be a number (0 or greater)");
      return;
    }

    // Check if proposal exists
    if (proposals.length === 0) {
      setError("⚠️ No proposals found for this owner. Load proposals first!");
      return;
    }

    if (proposalId >= proposals.length) {
      setError(
        `⚠️ Proposal ID ${proposalId} doesn't exist. Valid IDs: 0 to ${proposals.length - 1}`,
      );
      return;
    }

    const proposal = proposals[proposalId];
    if (!proposal.active) {
      setError("⚠️ This proposal is no longer active");
      return;
    }

    const payload = {
      type: "entry_function_payload",
      function: `${MODULE_ADDRESS}::voting::vote`,
      arguments: [owner, proposalId, support],
      type_arguments: [],
    };

    try {
      const tx = await window.aptos.signAndSubmitTransaction({ payload });
      alert(`✅ Vote submitted! TX: ${tx.hash}`);
      setTimeout(() => loadProposals(), 2000);
    } catch (err) {
      console.error("Vote error:", err);
      if (err.message && err.message.includes("0x2")) {
        setError("❌ This proposal is no longer active");
      } else {
        setError(`❌ Vote failed: ${err.message || "Unknown error"}`);
      }
    }
  };

  const loadProposals = async () => {
    setError("");

    if (!owner) {
      setError("⚠️ Please enter an owner address first");
      return;
    }

    if (!owner.startsWith("0x")) {
      setError("⚠️ Owner address must start with 0x");
      return;
    }

    try {
      const lenRes = await fetch(
        "https://fullnode.testnet.aptoslabs.com/v1/view",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            function: `${MODULE_ADDRESS}::voting::proposals_len`,
            type_arguments: [],
            arguments: [owner],
          }),
        },
      );

      const lenJson = await lenRes.json();
      const count = Array.isArray(lenJson) ? lenJson[0] : 0;

      const loaded = [];
      for (let i = 0; i < count; i++) {
        const propRes = await fetch(
          "https://fullnode.testnet.aptoslabs.com/v1/view",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              function: `${MODULE_ADDRESS}::voting::borrow_proposal`,
              type_arguments: [],
              arguments: [owner, i.toString()],
            }),
          },
        );

        const result = await propRes.json();
        const titleBytes = result[0];
        const title = new TextDecoder().decode(Uint8Array.from(titleBytes));
        loaded.push({
          title,
          yes: result[1],
          no: result[2],
          active: result[3],
        });
      }

      setProposals(loaded);
      if (loaded.length === 0) {
        setError("ℹ️ This address has no proposals yet");
      }
    } catch (err) {
      console.error("❌ Failed to load proposals:", err);
      setError(
        "❌ Failed to load proposals. Make sure the address is correct.",
      );
      setProposals([]);
    }
  };

  useEffect(() => {
    if (owner) loadProposals();
  }, [owner]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">🗳️ Cast Your Vote</h2>

      {/* Error Display */}
      {error && (
        <div
          className={`p-4 rounded mb-4 ${
            error.includes("❌")
              ? "bg-red-100 border border-red-300 text-red-800"
              : error.includes("⚠️")
                ? "bg-yellow-100 border border-yellow-300 text-yellow-800"
                : "bg-blue-100 border border-blue-300 text-blue-800"
          }`}
        >
          {error}
        </div>
      )}

      <div className="bg-white rounded shadow p-6 mb-6">
        <h3 className="font-semibold mb-4">Step 1: Load Proposals</h3>

        <input
          className="border p-2 w-full mb-2 rounded"
          placeholder="Proposal owner address (0x...)"
          value={owner}
          onChange={(e) => {
            setOwner(e.target.value);
            setError("");
          }}
        />

        <button
          onClick={loadProposals}
          className="btn bg-blue-600 hover:bg-blue-700 w-full mb-4"
        >
          📋 Load Proposals
        </button>

        <p className="text-xs text-gray-600">
          💡 Tip: Get the owner address from the Proposer Dashboard
        </p>
      </div>

      {proposals.length > 0 && (
        <div className="bg-white rounded shadow p-6 mb-6">
          <h3 className="font-semibold mb-4">Step 2: Select Proposal & Vote</h3>

          <label className="block text-sm font-medium mb-2">
            Proposal ID (0 to {proposals.length - 1})
          </label>
          <input
            type="number"
            min="0"
            max={proposals.length - 1}
            className="border p-2 w-full mb-4 rounded"
            placeholder="Enter proposal ID"
            value={id}
            onChange={(e) => {
              setId(e.target.value);
              setError("");
            }}
          />

          <label className="block text-sm font-medium mb-2">Your Vote</label>
          <select
            className="border p-2 w-full mb-4 rounded"
            onChange={(e) => setSupport(e.target.value === "true")}
          >
            <option value="true">✅ Yes (Support)</option>
            <option value="false">❌ No (Oppose)</option>
          </select>

          <button
            onClick={vote}
            className="btn bg-green-600 hover:bg-green-700 w-full"
          >
            🗳️ Submit Vote
          </button>
        </div>
      )}

      <div className="bg-white rounded shadow p-6">
        <h2 className="text-xl font-bold mb-4">📋 Available Proposals</h2>
        {proposals.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            No proposals loaded. Enter an owner address and click "Load
            Proposals".
          </p>
        ) : (
          <div className="space-y-4">
            {proposals.map((p, idx) => (
              <div key={idx} className="border rounded p-4 bg-gray-50">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold">{p.title}</h3>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-bold">
                    ID: {idx}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="font-semibold">✅ Yes:</span> {p.yes}
                  </div>
                  <div>
                    <span className="font-semibold">❌ No:</span> {p.no}
                  </div>
                  <div>
                    <span className="font-semibold">Status:</span>{" "}
                    <span
                      className={p.active ? "text-green-600" : "text-red-600"}
                    >
                      {p.active ? "Active" : "Closed"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
