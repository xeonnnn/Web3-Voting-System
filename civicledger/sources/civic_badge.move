address 0x8c2717687c3ffe936360258323b0966cf24a45cb15bf2c038029852bb4ec1d29 {
    module civic_badge {
        use std::signer;
        use std::string;

        struct Badge has key {
            name: string::String,
        }

        public fun has_badge(addr: address): bool {
            exists<Badge>(addr)
        }

        public entry fun claim_badge(account: &signer) {
            let addr = signer::address_of(account);
            assert!(!has_badge(addr), 100);
            move_to(account, Badge {
                name: string::utf8(b"CivicLedger Certified"),
            });
        }

        public fun get_badge(addr: address): string::String acquires Badge {
            assert!(has_badge(addr), 101);
            borrow_global<Badge>(addr).name
        }
    }
}
