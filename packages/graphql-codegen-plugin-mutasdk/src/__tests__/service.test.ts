import { buildSchema } from 'graphql';
import { generate } from '../service/generator';
import { parseMethodDef } from '../service/parser';

const source = `
  schema {
  query: Query
  mutation: Mutation
}

type Query {
  getAsset(payload: GetAssetPayload!): Asset!
  getBalance(payload: GetBalancePayload!): u64!
}

input GetAssetPayload {
  id: Hash!
}

input GetBalancePayload {
  id: Hash!
  user: Address!
}

# The field in mutation strictly corresponds to a transaction, therefore,
# multiple mutations executed at the same time should not be allowed
type Mutation {
  transfer(payload: TransferPayload!): Null!
  createAsset(payload: CreateAssetPayload!): Asset!
}

scalar Null

input TransferPayload {
  id: Hash!
  user: Address!
}

input CreateAssetPayload {
  supply: u64!
  name: String!
  symbol: String!
}

type GeneralMutationResponse {
  txHash: Hash!

  """
  Since receipt is executed asynchronously,
  it is impossible to keep the connection for a long time,
  so only the \`TYPE\` will be returned during mutation.
  The \`receiptType\` would always be null in response
  """
  receiptType: String
}
type CreateAssetReceipt {
  supply: u64!
  name: String!
  symbol: String!
  id: Hash!
}
type CreateAssetMutationResponse {
  txHash: Hash!
  receiptType: CreateAssetReceipt
}
type Asset {
  id: Hash!
  name: String!
  symbol: String!
  supply: u64!
  issuer: Address!
}
scalar Address
scalar u64
scalar Hash
`;

it('parse asset service', () => {
  expect(parseMethodDef(buildSchema(source))).toEqual({
    query: [
      //getAsset(payload: GetAssetPayload): Asset!
      {
        name: 'getAsset',
        payloadType: 'GetAssetPayload',
        returnType: 'Asset',
      },
      // getBalance(payload: GetBalancePayload): u64!
      {
        name: 'getBalance',
        payloadType: 'GetBalancePayload',
        returnType: 'u64',
      },
    ],
    mutation: [
      //  transfer(payload: TransferPayload): Null
      {
        name: 'transfer',
        payloadType: 'TransferPayload',
        returnType: 'Null',
      },
      // createAsset(payload: CreateAssetPayload ): Asset!
      {
        name: 'createAsset',
        payloadType: 'CreateAssetPayload',
        returnType: 'Asset',
      },
    ],
  });
});

it('generate empty service', () => {
  expect(
    generate({
      name: 'asset',
      query: [],
      mutation: [],
    }),
  ).toMatchSnapshot();
});

it('generate AssetService binding', () => {
  expect(
    generate({
      name: 'asset',
      query: [
        {
          name: 'get_asset',
          payloadType: 'GetAssetPayload',
          returnType: 'Asset',
        },
        {
          name: 'get_balance',
          payloadType: 'GetBalancePayload',
          returnType: 'Balance',
        },
      ],
      mutation: [
        {
          name: 'transfer',
          payloadType: 'TransferPayload',
          returnType: 'Null',
        },
      ],
    }),
  ).toMatchSnapshot();
});
