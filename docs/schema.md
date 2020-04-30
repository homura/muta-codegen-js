# Muta Service Schema

> An interface description language or interface definition language (IDL), is a specification language used to describe a software component's application programming interface (API)

Muta uses a subset of [GraphQL](https://graphql.org/learn/schema/) as the IDL of the service. The syntax used by Muta is the basic GraphQL syntax, excluding advanced syntax such as `fragment`,` directive`, it is easy and readable.

## Why GraphQL

- strong readability
- rich community resources
- `query` and `mutation` that fit the blockchain system

## A Quick Glance

### Method

Used to describe the callable methods in service

```graphql
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

input ApprovePayload {
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

input CreateAssetPayload {
  name: String!
  symbol: String!
  supply: Uint64!
}

input GetAllowancePayload {
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

input GetAssetPayload {
  id: Hash!
}

input GetBalancePayload {
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

input TransferFromPayload {
  asset_id: Hash!
  sender: Address!
  recipient: Address!
  value: Uint64!
}

input TransferPayload {
  asset_id: Hash!
  to: Address!
  value: Uint64!
}

scalar Uint64

scalar Null

```


### Event

```graphql

```



## Primitive(Scalar)

Similar to most programming languages, Muta service also has its basic data types (primitive). Although Muta is written by Rust, the basic data types at the service level do not directly use Rust's primitives.

In the blockchain system, we frequently use primitives that are not provided by most programming languages, such as `hash`, `address`, etc. As a blockchain framework, Muta provides a series of primitives that are more convenient for blockchain development

```graphql
scalar u32
scalar u64
scalar Boolean
scalar String
scalar Address
scalar Hash
scalar Bytes
scalar Hex
scalar Null
```

### About Null Scalar

Null is a special type. Generally, it means that the method or function executed successfully, but there is no return value, such as 

```rust
fn transfer(payload: TransferPayload) -> ServiceResult <()> {}
```


### Difference From GraphQL

GraphQL comes with a set of default scalar types out of the box:  `Float`, `Int`, `ID`, but they do not belong to Muta's primitive.

## Query & Mutation

Each service is essentially an isolated state machine. Through the methods exposed by the service, we can query or mutate the state.

`query` generally queries some part of the current state, it will not cause the state to change. However, `mutation` will generally change the state, and the state change caused by mutation will only take place after the consensus of the validator set is reached. Therefore, the execution result of `query` is returned immediately. It should be noted that mutation is executed asynchronously. In general, mutation will only return results in Receipt after `consensus -> execute`

In Muta, each service corresponds to a GraphQL schema

```graphql
type Query {
  get_asset(payload: GetAssetPayload!): Asset!
}

input GetAssetPayload {
  id: Hash!
}

type Mutation {
  transfer(payload: TransferPayload): Null!
}

input TransferPayload {
  id: Hash!
  user: Address!
  value: u64!
}
```

