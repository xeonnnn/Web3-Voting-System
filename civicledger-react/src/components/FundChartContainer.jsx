// src/components/FundChartContainer.jsx
import React, { useEffect, useState } from "react";
import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";
import FundChart from "./FundChart";

const config = new AptosConfig({ network: Network.TESTNET });
const aptos = new Aptos(config);

const FundChartContainer = ({ address }) => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const resource = await aptos.getAccountResource({
          accountAddress: address,
          resourceType:
            "0x8c2717687c3ffe936360258323b0966cf24a45cb15bf2c038029852bb4ec1d29::fund_ledger::FundLedger",
        });
        setEntries(resource.data.entries);
      } catch (err) {
        console.error("Error fetching fund entries:", err);
      }
    };

    fetchEntries();
  }, [address]);

  return <FundChart entries={entries} />;
};

export default FundChartContainer;
