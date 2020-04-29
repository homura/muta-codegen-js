import * as typescriptPlugin from '@graphql-codegen/typescript';
import { service as servicePlugin } from 'graphql-codegen-plugin-mutasdk';
import { codegen } from './basic';

export async function generateServiceBindingCode(
  serviceName: string,
  schemaSource: string,
): Promise<string> {
  return codegen({
    pluginsMap: {
      typescript: typescriptPlugin,
      service: servicePlugin,
    },
    plugins: [{ service: { service: serviceName } }, { typescript: {} }],
    schemaSource,
  });
}
