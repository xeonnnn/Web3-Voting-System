import { useState, useEffect } from "react";

const MODULE_ADDRESS =
  "0x8c2717687c3ffe936360258323b0966cf24a45cb15bf2c038029852bb4ec1d29";

export default function BadgePage() {
  const [hasBadge, setHasBadge] = useState(false);
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState(null);

  useEffect(() => {
    checkBadgeStatus();
  }, []);

  const checkBadgeStatus = async () => {
    try {
      const wallet = localStorage.getItem("wallet");
      if (!wallet) {
        setLoading(false);
        return;
      }
      setAddress(wallet);

      // Check if badge exists using Aptos REST API
      const response = await fetch(
        `https://fullnode.testnet.aptoslabs.com/v1/accounts/${wallet}/resource/${MODULE_ADDRESS}::civic_badge::Badge`,
      );

      if (response.ok) {
        const data = await response.json();
        setHasBadge(true);
      } else {
        setHasBadge(false);
      }
    } catch (err) {
      setHasBadge(false);
    } finally {
      setLoading(false);
    }
  };

  const claimBadge = async () => {
    if (!address) {
      alert("⚠️ Please connect your wallet first!");
      return;
    }

    const payload = {
      type: "entry_function_payload",
      function: `${MODULE_ADDRESS}::civic_badge::claim_badge`,
      arguments: [],
      type_arguments: [],
    };

    try {
      const tx = await window.aptos.signAndSubmitTransaction({ payload });
      alert(`✅ Badge claimed successfully! TX: ${tx.hash}`);
      // Refresh badge status
      setTimeout(() => checkBadgeStatus(), 2000);
    } catch (err) {
      console.error("Badge claim error:", err);
      if (err.message && err.message.includes("0x64")) {
        alert("⚠️ You already have a CivicLedger Certified badge!");
      } else {
        alert(`❌ Badge claim failed: ${err.message || "Unknown error"}`);
      }
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">
        🏅 CivicLedger Badge
      </h2>

      {loading ? (
        <div className="text-center p-8">
          <p className="text-gray-600">Loading badge status...</p>
        </div>
      ) : !address ? (
        <div className="bg-yellow-100 border border-yellow-300 rounded p-6 text-center">
          <p className="text-yellow-800 font-semibold mb-2">
            ⚠️ Wallet Not Connected
          </p>
          <p className="text-yellow-700">
            Please connect your wallet to claim a badge.
          </p>
        </div>
      ) : hasBadge ? (
        <div className="bg-green-100 border border-green-300 rounded p-6 text-center">
          <div className="text-6xl mb-4">🎖️</div>
          <h3 className="text-2xl font-bold text-green-800 mb-2">
            Congratulations!
          </h3>
          <p className="text-green-700 font-semibold mb-4">
            You have earned the CivicLedger Certified badge!
          </p>
          <div className="bg-white rounded p-4 mt-4">
            <p className="text-sm text-gray-600">Badge Holder:</p>
            <p className="text-xs font-mono break-all">{address}</p>
          </div>
        </div>
      ) : (
        <div className="bg-blue-50 border border-blue-200 rounded p-6">
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">🏅</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Claim Your CivicLedger Badge
            </h3>
            <p className="text-gray-600 mb-4">
              Become a certified member of the CivicLedger community!
            </p>
          </div>

          <div className="bg-white rounded p-4 mb-6">
            <h4 className="font-semibold mb-2">📋 About This Badge:</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>✓ Stored permanently on the Aptos blockchain</li>
              <li>✓ Can only be claimed once per wallet</li>
              <li>✓ Proves your participation in CivicLedger</li>
              <li>✓ Free to claim (only gas fees apply)</li>
            </ul>
          </div>

          <div className="text-center">
            <button onClick={claimBadge} className="btn text-lg px-8 py-3">
              🎖️ Claim Badge Now
            </button>
          </div>

          <p className="text-xs text-gray-500 text-center mt-4">
            Note: You can only claim this badge once. Make sure you're connected
            with the correct wallet.
          </p>
        </div>
      )}
    </div>
  );
}
