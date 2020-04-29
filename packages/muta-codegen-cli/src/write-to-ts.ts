import { outputFileSync, appendFileSync, removeSync } from 'fs-extra';
import { upperFirst } from 'lodash';
import { join } from 'path';
import {
  generateEventCode,
  generatePackageJSONCode,
  generateServiceBindingCode,
} from './components';
import { SchemaSource } from './fetch';

export interface SDKWriterOptions {
  /**
   * root dir path
   */
  path: string;

  name: string;

  mutaSDKVersion: string;

  services: SchemaSource[];
}

export async function writeToTs(options: SDKWriterOptions): Promise<void> {
  const { path, mutaSDKVersion } = options;
  const suffix = 'ts';

  const resolveSrc = (x: string): string => join(path, 'src', x);

  removeSync(resolveSrc('/'));

  for (const {
    service: serviceName,
    method: serviceSource,
    event: eventSource,
  } of options.services) {
    const serviceCode = await generateServiceBindingCode(
      serviceName,
      serviceSource,
    );
    const eventCode = await generateEventCode(eventSource);

    const serviceClassName = `${upperFirst(serviceName)}Service`;

    if (serviceCode) {
      outputFileSync(
        resolveSrc(`${serviceName}/${serviceClassName}.${suffix}`),
        serviceCode,
      );
      appendFileSync(
        resolveSrc('index.ts'),
        `export { ${serviceClassName} } from './${serviceName}/${serviceClassName}';\n`,
      );
    }

    if (eventCode) {
      outputFileSync(resolveSrc(`${serviceName}/events.${suffix}`), eventCode);
      appendFileSync(
        resolveSrc('index.ts'),
        `export { isEventOf as isEventOf${serviceClassName} } from './${serviceName}/events';\n`,
      );
    }
  }

  outputFileSync(
    join(path, 'package.json'),
    await generatePackageJSONCode({
      mutaSDKVersion,
      name: options.name,
    }),
  );
}
