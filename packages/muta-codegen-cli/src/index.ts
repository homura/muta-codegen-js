#!/usr/bin/env node

import { Command } from 'commander';
import { fetchSchemaSource } from './fetch';
import { writeToTs } from './write-to-ts';

const program = new Command();

program
  .option(
    '--endpoint <endpoint>',
    'the GraphQL endpoint for muta',
    'http://127.0.0.1:8000/graphql',
  )
  .option(
    '--out <out>',
    'a file path for output, if not provided, ' +
      'it will be printed directly on the console',
    'generated',
  )
  .option('--source', 'include GraphQL source')
  .option('--sdk-version <mutaSDKVersion>', 'version of muta-sdk', '0.11.0')
  .option('--name [name]', 'project name', 'my-sdk');

interface Options {
  out: string;
  endpoint: string;
  name: string;
  sdkVersion: string;
  source: boolean;
}

export async function start(options: Options): Promise<void> {
  const { endpoint, name, out, sdkVersion: mutaSDKVersion, source } = options;
  const schemaSource = await fetchSchemaSource(endpoint);

  await writeToTs({
    mutaSDKVersion,
    name,
    path: out,
    services: schemaSource,
    outputGraphQLSource: source,
  });
}

export async function main(): Promise<void> {
  program.parse(process.argv);
  const options = program.opts() as Options;
  await start(options);
  process.exit(0);
}

main();
