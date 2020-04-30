import { PluginFunction } from '@graphql-codegen/plugin-helpers';
import { scalarsIn, TOP_TIP } from '../fragments';
import { generate } from './generator';
import { parseMethodDef } from './parser';

type ServiceCodegenConfig = { service: string };

export const plugin: PluginFunction<ServiceCodegenConfig> = (
  schema,
  documents,
  config,
) => {
  const { query, mutation } = parseMethodDef(schema);

  return {
    prepend: [
      TOP_TIP,
      scalarsIn(schema),
      `import { createBindingClass, query, mutation } from "@mutajs/service";`,
    ],
    content: generate({
      mutation,
      name: config.service,
      query,
    }),
  };
};
