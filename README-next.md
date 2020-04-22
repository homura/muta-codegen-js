# muta-codegen

muta-codegen is a series of tools to help generate various tools around muta, such as SDK

## Genererate SDK

```bash
npm install muta-codegen-cli -g
muta-generate-sdk \
  --endpoint http://127.0.0.1:8000/graphql \
  --out muta-example
cd muta-example
npm i
```

It is recommended to use an IDE or editor that supports TypeScript type detection, then `Receipt` or `Event` will automatically comple for a better programming experience.

## Basic Example

```javascript
// muta-example/example.js

const { Client } = require('@mutajs/client');
const { Account /*, MultiSigAccount */ } = require('@mutajs/account');

// the generated sdk
const { AssetService, isEventOf } = require('./services/AssetService');

async function main() {
  // a client to interact with http://127.0.0.1:8000/graphql
  const client = new Client();
  // an account to sign the transaction
  const account = new Account('0x...');
  const service = new AssetService(client, account);
  const receipt = await service.mutation.create_asset({
    name: 'MyToken',
    symbol: 'MT',
    supply: 10000000,
  });
  
  console.log(receipt);
  
  const event = receipt.events[0];
  console.log(isEventOf('CreateAssetEvent', event));
}

main();
```

## Query And Mutation

`Query` and `Mutation` are two types of service methods. `Query` is used to query the state of the service, and will not cause the state to change, while mutation will change the state.

```javascript
// list all query methods under the server
console.log(service.query) 

// list all mutation methods under the server
console.log(service.mutation)
```

## Readonly Service

When we only need `Query`, the second parameter `Account` is not needed when constructing the Service

```javascript
const readonlyService = new AssetService(new Client());
```

## Promise + Event

In Muta, the change of state needs to go through the process of `consensus-> execute -> receipt`, which means that the receipt of mutation needs to wait for a certain period of time before it can be obtained.

Since Muta's consensus and execution are separate and parallel, in general, a transaction needs at least 2 blocks to have a receipt. The mutation binding provided by `Service` returns `Promise <Receipt> `by default. If we don't need `Receipt`,we can use `waitFor` to change the waiting object, such as `Promise <Transaction>`

```javascript
await service.transfer({...}).waitFor('transaction')
```




