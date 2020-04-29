import { PluginFunction } from '@graphql-codegen/plugin-helpers';
import { generate } from './generator';
import { parseMethodDef } from './parser';

const importSegment = `/* eslint-disable */
import { createBindingClass, query, mutation } from "@mutajs/service";
import { u64, Hash, Address, Uint64 , Bytes, u32, Vec, Null } from "@mutajs/types";
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
