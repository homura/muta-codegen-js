#!/usr/bin/env node

import { Command } from 'commander';
import { writeFileSync } from 'fs';
import { codegen } from './codegen';
import { fetchSchema } from './fetch';

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
  )
  .option(
    '--source <source>',
    'a file path, or graphql schema of service, ' +
      'if this option is provided, the endpoint will not be used',
  );

interface Options {
  out?: string;
  source?: string;
  endpoint?: string;
}

async function main(): Promise<void> {
  program.parse(process.argv);

  const options: Options = program.opts();

  const code = await codegen(
    options.source ?? (await fetchSchema(options.endpoint)),
  );

  if (options.out) {
    writeFileSync(options.out, code);
    return;
  }
  console.log(code);
  process.exit(0);
}

main();
