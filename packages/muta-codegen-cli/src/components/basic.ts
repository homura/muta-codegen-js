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
        /* null */
        Null: "''",

        /* number */
        U32: 'U32',
        U64: 'U64',

        /* bytes like */
        Uint32: 'Uint32',
        Uint64: 'Uint64',
        Hex: 'Hex',
        Bytes: 'Bytes',
        Hash: 'Hash',
        Address: 'Address',
      },
      skipTypename: true,
    },
  });
}
