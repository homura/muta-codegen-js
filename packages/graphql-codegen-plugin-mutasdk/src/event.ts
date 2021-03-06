import { PluginFunction } from '@graphql-codegen/plugin-helpers';
import { GraphQLSchema, isUnionType } from 'graphql';
import { scalarsIn, TOP_TIP } from './fragments';

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

type _EventName = ${events.map(({ name }) => `'${name}'`).join(' |\n  ')};

interface _IsEventOf {
  ${events.map(({ name }) =>
    `(name: '${name}', event: any): event is ${name};`,
  ).join('\n  ')}
}

export const isEventOf: _IsEventOf =
  ((name: _EventName, event: any) => event?.topic === name) as _IsEventOf;
  `;
}

export function generateEventDefCode(schema: GraphQLSchema): string {
  const events = schema.getType('Event');

  if (isUnionType(events)) {
    const defs = events.getTypes().map<EventDef>(({ name }) => ({ name }));
    return template({ events: defs });
  }

  return '';
}

export const plugin: PluginFunction = schema => {
  return {
    prepend: [TOP_TIP, scalarsIn(schema)],
    content: generateEventDefCode(schema),
  };
};
