import { upperFirst } from 'lodash';
import { ServiceDef } from '../types';

function formatTypeName(type: string, defaults = 'null') {
  return type ?? defaults;
}

export function generate(serviceDef: ServiceDef): string {
  const { name, query, mutation } = serviceDef;
  const serviceClassName = upperFirst(name);
  const template = `
export const ${serviceClassName} = createBindingClass(
  '${name}',
  {
    ${query
    .map(
      ({ name, payloadType, returnType }) =>
        // prettier-ignore
        `${name}: query<${formatTypeName(payloadType)}, ${formatTypeName(returnType)}>(),`,
    )
    .join('\n    ')}
  },
  {
    ${mutation
    .map(
      ({ name, payloadType, returnType }) =>
        // prettier-ignore
        `${name}: mutation<${formatTypeName(payloadType)}, ${formatTypeName(returnType)}>(),`,
    )
    .join('\n    ')}
  }
);
`;
  return template;
}
