import { PluginFunction } from '@graphql-codegen/plugin-helpers';
import { TOP_TIP } from '../fragments';
import { generate } from './generator';
import { parseMethodDef } from './parser';

const importSegment = `${TOP_TIP}
import { createBindingClass, query, mutation } from "@mutajs/service";
import { U64, Hash, Address, Uint64 , Bytes, u32, Vec, Null } from "@mutajs/types";
`;

type ServiceCodegenConfig = { service: string };

export const plugin: PluginFunction<ServiceCodegenConfig> = (
  schema,
  documents,
  config,
) => {
  const { query, mutation } = parseMethodDef(schema);

  return {
    prepend: [importSegment],
    content: generate({
      mutation,
      name: config.service,
      query,
    }),
  };
};
