import { useState, useEffect } from "react";
import ProposalCard from "../components/ProposalCard";

const MODULE_ADDRESS =
  "0x8c2717687c3ffe936360258323b0966cf24a45cb15bf2c038029852bb4ec1d29";

export default function ProposerDashboard() {
  const [title, setTitle] = useState("");
  const [proposals, setProposals] = useState([]);

  const address = localStorage.getItem("wallet");

  const submitProposal = async () => {
    if (!address || !title) return alert("Connect wallet and enter title");

    const payload = {
      type: "entry_function_payload",
      function: `${MODULE_ADDRESS}::voting::create`,
      arguments: [title],
      type_arguments: [],
    };

    try {
      const tx = await window.aptos.signAndSubmitTransaction({ payload });
      alert(`✅ Proposal submitted! TX: ${tx.hash}`);
      setTitle("");
      loadProposals();
    } catch (err) {
      alert("❌ Proposal failed");
    }
  };

  const loadProposals = async () => {
    try {
      const lenRes = await fetch(
        "https://fullnode.testnet.aptoslabs.com/v1/view",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            function: `${MODULE_ADDRESS}::voting::proposals_len`,
            type_arguments: [],
            arguments: [address],
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
              arguments: [address, i.toString()],
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
    } catch (err) {
      console.error("❌ Failed to load proposals:", err);
    }
  };

  useEffect(() => {
    loadProposals();
  }, []);

  return (
    <div className="p-6">
      {/* Wallet Address Display */}
      {address && (
        <div className="bg-blue-100 border border-blue-300 rounded p-4 mb-6">
          <p className="text-sm font-semibold text-blue-800">
            📍 Your Wallet Address (Proposal Owner):
          </p>
          <p className="text-xs font-mono bg-white p-2 rounded mt-2 break-all">
            {address}
          </p>
          <p className="text-xs text-blue-600 mt-2">
            💡 Share this address with voters so they can vote on your
            proposals!
          </p>
        </div>
      )}

      <h2 className="text-2xl font-bold mb-4">📤 Submit Proposal</h2>
      <input
        className="border p-2 w-full mb-2"
        placeholder="Proposal title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={submitProposal} className="btn mb-6">
        Submit
      </button>

      <h2 className="text-xl font-bold mb-4">📋 Your Proposals</h2>
      {proposals.length === 0 ? (
        <p>No proposals found.</p>
      ) : (
        <div className="space-y-4">
          {proposals.map((p, idx) => (
            <div key={idx} className="border rounded p-4 shadow bg-white">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold">{p.title}</h3>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold">
                  ID: {idx}
                </span>
              </div>
              <p>✅ Yes: {p.yes}</p>
              <p>❌ No: {p.no}</p>
              <p>🔄 Active: {p.active ? "Yes" : "No"}</p>
              <div className="mt-3 pt-3 border-t">
                <p className="text-xs text-gray-600">
                  🗳️ To vote on this proposal, use:
                </p>
                <p className="text-xs font-mono bg-gray-100 p-2 rounded mt-1">
                  Owner: {address}
                  <br />
                  Proposal ID: {idx}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
