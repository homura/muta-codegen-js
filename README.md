# muta-codegen

A cli for generate SDK for muta blockchain instance 

## Pre-requirement

- Yarn
- muta(`getSchema` supported)

## Quick Start

```
git clone https://github.com/homura/muta-codegen-js.git
yarn
yarn build
cd muta-codegen-js

# output the help message 
node packages/muta-codegen-cli --help


# generate the service binding
node packages/muta-codegen-cli \
  --endpoint http://127.0.0.1:8000/graphql \
  --out path/to/my-exists-node-project/service.ts

cd path/to/my-exists-node-project

# add the dependencies
yarn add @mutajs/service @mutajs/types @mutajs/client
```
