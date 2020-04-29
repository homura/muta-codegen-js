export const AssetServiceSchema = `
type Mutation {
  create_asset(payload: CreateAssetPayload!): Asset!
  transfer(payload: TransferPayload!): Null
  approve(payload: ApprovePayload!): Null
  transfer_from(payload: TransferFromPayload!): Null
}

type Query {
  get_asset(payload: GetAssetPayload!): Asset!
  get_balance(payload: GetBalancePayload!): GetBalanceResponse!
  get_allowance(payload: GetAllowancePayload!): GetAllowanceResponse!
}

# 20 bytes of account address
scalar Address

type ApprovePayload {
  asset_id: Hash!
  to: Address!
  value: Uint64!
}

type Asset {
  id: Hash!
  name: String!
  symbol: String!
  supply: Uint64!
  issuer: Address!
}

type CreateAssetPayload {
  name: String!
  symbol: String!
  supply: Uint64!
}

type GetAllowancePayload {
  asset_id: Hash!
  grantor: Address!
  grantee: Address!
}

type GetAllowanceResponse {
  asset_id: Hash!
  grantor: Address!
  grantee: Address!
  value: Uint64!
}

type GetAssetPayload {
  id: Hash!
}

type GetBalancePayload {
  asset_id: Hash!
  user: Address!
}

type GetBalanceResponse {
  asset_id: Hash!
  user: Address!
  balance: Uint64!
}

# The output digest of Keccak hash function
scalar Hash

type TransferFromPayload {
  asset_id: Hash!
  sender: Address!
  recipient: Address!
  value: Uint64!
}

type TransferPayload {
  asset_id: Hash!
  to: Address!
  value: Uint64!
}

scalar Uint64

scalar Null
`;
