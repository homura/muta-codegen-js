export const AssetEventSchema = `# 20 bytes of account address
scalar Address

type ApproveEvent {
  asset_id: Hash!
  grantor: Address!
  grantee: Address!
  value: Uint64!
}

type Asset {
  id: Hash!
  name: String!
  symbol: String!
  supply: Uint64!
  issuer: Address!
}

# The output digest of Keccak hash function
scalar Hash

type TransferEvent {
  asset_id: Hash!
  from: Address!
  to: Address!
  value: Uint64!
}

type TransferFromEvent {
  asset_id: Hash!
  caller: Address!
  sender: Address!
  recipient: Address!
  value: Uint64!
}

scalar Uint64

union Event = Asset | TransferEvent | ApproveEvent | TransferFromEvent`;
