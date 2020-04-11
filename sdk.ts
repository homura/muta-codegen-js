
import { createBindingClass, read, Read, write, Write } from "@mutajs/service";
import { u64, Hash, Address, Uint64 , Bytes, u32, Vec} from "@mutajs/types";

export type Maybe<T> = T | null;

export interface AssetModel {
  get_asset: Read<GetAssetPayload, Asset>;
  get_balance: Read<GetBalancePayload, GetBalanceResponse>;
  get_allowance: Read<GetAllowancePayload, GetAllowanceResponse>;
  create_asset: Write<CreateAssetPayload, Asset>;
  transfer: Write<TransferPayload, ''>;
  approve: Write<ApprovePayload, ''>;
  transfer_from: Write<TransferFromPayload, ''>;
}

export const AssetService = createBindingClass<AssetModel>('asset', {
    get_asset: read(),
    get_balance: read(),
    get_allowance: read(),
    create_asset: write(),
    transfer: write(),
    approve: write(),
    transfer_from: write(),
});
export interface MetadataModel {
  get_metadata: Read<'', Metadata>;
}

export const MetadataService = createBindingClass<MetadataModel>('metadata', {
    get_metadata: read(),
});

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Hash: Hash;
  Uint64: Uint64;
  Null: '';
  Address: Address;
  Hex: string;
  Uint32: string;
};

export type Query = {
  asset: AssetServiceQuery;
  metadata: MetadataServiceQuery;
};

export type Mutation = {
  asset: AssetServiceMutation;
};

export type AssetServiceMutation = {
  create_asset: Asset;
  transfer?: Maybe<Scalars['Null']>;
  approve?: Maybe<Scalars['Null']>;
  transfer_from?: Maybe<Scalars['Null']>;
};


export type AssetServiceMutationCreate_AssetArgs = {
  payload: CreateAssetPayload;
};


export type AssetServiceMutationTransferArgs = {
  payload: TransferPayload;
};


export type AssetServiceMutationApproveArgs = {
  payload: ApprovePayload;
};


export type AssetServiceMutationTransfer_FromArgs = {
  payload: TransferFromPayload;
};

export type AssetServiceQuery = {
  get_asset: Asset;
  get_balance: GetBalanceResponse;
  get_allowance: GetAllowanceResponse;
};


export type AssetServiceQueryGet_AssetArgs = {
  payload: GetAssetPayload;
};


export type AssetServiceQueryGet_BalanceArgs = {
  payload: GetBalancePayload;
};


export type AssetServiceQueryGet_AllowanceArgs = {
  payload: GetAllowancePayload;
};

export type TransferPayload = {
  asset_id: Scalars['Hash'];
  to: Scalars['Address'];
  value: Scalars['Uint64'];
};

export type CreateAssetPayload = {
  name: Scalars['String'];
  symbol: Scalars['String'];
  supply: Scalars['Uint64'];
};

export type GetAssetPayload = {
  id: Scalars['Hash'];
};

export type GetBalanceResponse = {
  asset_id: Scalars['Hash'];
  user: Scalars['Address'];
  balance: Scalars['Uint64'];
};



export type ApprovePayload = {
  asset_id: Scalars['Hash'];
  to: Scalars['Address'];
  value: Scalars['Uint64'];
};

export type TransferFromPayload = {
  asset_id: Scalars['Hash'];
  sender: Scalars['Address'];
  recipient: Scalars['Address'];
  value: Scalars['Uint64'];
};

export type GetAllowanceResponse = {
  asset_id: Scalars['Hash'];
  grantor: Scalars['Address'];
  grantee: Scalars['Address'];
  value: Scalars['Uint64'];
};

export type GetAllowancePayload = {
  asset_id: Scalars['Hash'];
  grantor: Scalars['Address'];
  grantee: Scalars['Address'];
};

export type GetBalancePayload = {
  asset_id: Scalars['Hash'];
  user: Scalars['Address'];
};

export type Asset = {
  id: Scalars['Hash'];
  name: Scalars['String'];
  symbol: Scalars['String'];
  supply: Scalars['Uint64'];
  issuer: Scalars['Address'];
};



export type MetadataServiceQuery = {
  get_metadata: Metadata;
};

export type Metadata = {
  chain_id: Scalars['Hash'];
  common_ref: Scalars['Hex'];
  timeout_gap: Scalars['Uint64'];
  cycles_limit: Scalars['Uint64'];
  cycles_price: Scalars['Uint64'];
  interval: Scalars['Uint64'];
  verifier_list: Array<ValidatorExtend>;
  prevote_ratio: Scalars['Uint64'];
  precommit_ratio: Scalars['Uint64'];
  propose_ratio: Scalars['Uint64'];
  brake_ratio: Scalars['Uint64'];
  tx_num_limit: Scalars['Uint64'];
  max_tx_size: Scalars['Uint64'];
};

export type ValidatorExtend = {
  bls_pub_key: Scalars['Hex'];
  address: Scalars['Address'];
  propose_weight: Scalars['Uint32'];
  vote_weight: Scalars['Uint32'];
};


