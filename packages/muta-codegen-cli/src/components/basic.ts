import { codegen as graphqlCodegen } from '@graphql-codegen/core';
import { CodegenPlugin, Types } from '@graphql-codegen/plugin-helpers/types';
import { buildSchema, parse, printSchema } from 'graphql';

interface Options {
  schemaSource: string;
  pluginsMap: {
    [name: string]: CodegenPlugin;
  };
  plugins: Types.ConfiguredPlugin[];
}

export function codegen(options: Options): Promise<string> {
  if (!options.schemaSource) return Promise.resolve('');

  return graphqlCodegen({
    schema: parse(printSchema(buildSchema(options.schemaSource))),
    plugins: options.plugins,
    pluginMap: options.pluginsMap,
    filename: '',
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
}
