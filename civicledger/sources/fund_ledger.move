address 0x8c2717687c3ffe936360258323b0966cf24a45cb15bf2c038029852bb4ec1d29 {
    module fund_ledger {
        use std::signer;
        use std::vector;
        use std::timestamp;

        struct FundEntry has copy, drop, store {
            category: vector<u8>,
            amount: u64,
            description: vector<u8>,
            timestamp: u64,
            is_inflow: bool,
        }

        struct FundLedger has key {
            entries: vector<FundEntry>,
        }

        public entry fun init_ledger(account: &signer) {
            move_to(account, FundLedger {
                entries: vector::empty<FundEntry>(),
            });
        }

        public entry fun log_entry(
            account: &signer,
            category: vector<u8>,
            amount: u64,
            description: vector<u8>,
            is_inflow: bool
        ) acquires FundLedger {
            let ledger = borrow_global_mut<FundLedger>(signer::address_of(account));
            let entry = FundEntry {
                category,
                amount,
                description,
                timestamp: timestamp::now_seconds(),
                is_inflow,
            };
            vector::push_back(&mut ledger.entries, entry);
        }

        public fun get_entries(account: address): vector<FundEntry> acquires FundLedger {
        let ledger = borrow_global<FundLedger>(account);
        let original = &ledger.entries;
        let result = vector::empty<FundEntry>(); // 👈 copy -> result
        let i = 0;
        let len = vector::length(original);
        while (i < len) {
          let item = vector::borrow(original, i);
          vector::push_back(&mut result, *item);
          i = i + 1;
        };
        result
    }

    }
}
