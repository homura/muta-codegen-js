import * as typescriptPlugin from '@graphql-codegen/typescript';
import { event as eventPlugin } from 'graphql-codegen-plugin-mutasdk';
import { codegen } from './basic';

export async function generateEventCode(eventSource: string): Promise<string> {
  return codegen({
    pluginsMap: {
      typescript: typescriptPlugin,
      event: eventPlugin,
    },
    plugins: [{ event: {} }, { typescript: {} }],
    schemaSource: eventSource,
  });
}
