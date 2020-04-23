import { PluginFunction } from '@graphql-codegen/plugin-helpers';

const importSegment = `
import { u64, Hash, Address, Uint64 , Bytes, u32, Vec } from "@mutajs/types";
`;

interface EventDef {
  name: string;
}

function template(config: { events: EventDef[] }): string {
  const events = config.events;

  if (!events.length) return '';

  // prettier-ignore
  return `
${events.map(({ name }) => `
export function isEventOf${name}(event: any): event is ${name} {
  return event?.topic === '${name}';
}`).join('\n')}

type _EventName = ${events.map(({ name }) => `'${name}'`).join(' |\n')};

interface _IsEventOf {
  ${events.map(({ name }) =>
    `(name: '${name}', event: any): event is ${name};`
  ).join('\n')}
}

export const isEventOf =
  ((name: _EventName, event: any) => event?.topic === name) as _IsEventOf;
  `;
}

export const plugin: PluginFunction = schema => {
  const eventDefs = Object.keys(schema.getTypeMap())
    .filter(name => name.endsWith('Event'))
    .map<EventDef>(name => ({ name }));

  return {
    prepend: [importSegment],
    content: template({ events: eventDefs }),
  };
};
