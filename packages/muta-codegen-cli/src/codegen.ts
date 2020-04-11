import { codegen as graphqlCodegen } from '@graphql-codegen/core';
import * as typescriptPlugin from '@graphql-codegen/typescript';
import { buildSchema, parse, printSchema } from 'graphql';
import * as mutaSdk from 'graphql-codegen-plugin-mutasdk';

export async function codegen(graphqlSchema: string): Promise<string> {
  const schema = buildSchema(graphqlSchema);

  const code = await graphqlCodegen({
    schema: parse(printSchema(schema)),
    plugins: [
      {
        mutaSdk: {},
      },
      {
        typescript: {},
      },
    ],
    pluginMap: {
      typescript: typescriptPlugin,
      mutaSdk: mutaSdk,
    },
    filename: 'generated.ts',
    documents: [],
    config: {
      scalars: {
        Address: 'Address',
        u64: 'u64',
        Hash: 'Hash',
        Uint64: 'Uint64',
        Null: "''",
        Hex: 'string',
        Uint32: 'string',
      },
      skipTypename: true,
    },
  });

  return code;
}
