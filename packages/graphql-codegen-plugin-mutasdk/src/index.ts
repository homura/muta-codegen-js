import { PluginFunction } from '@graphql-codegen/plugin-helpers';
import {
  GraphQLNonNull,
  GraphQLObjectType,
  isNonNullType,
  isObjectType,
} from 'graphql';
import { compile } from 'handlebars';
import { uniq, upperFirst } from 'lodash';

const importSegment = `
import { createBindingClass, read, Read, write, Write } from "@mutajs/service";
import { u64, Hash, Address, Uint64 , Bytes, u32, Vec} from "@mutajs/types";
`;

const template = compile<{ services: ServiceDef[] }>(/* mustache */ `
{{#services}}
export interface {{className}}Model {
{{#methods}}
  {{name}}: {{interfaceType}}<{{{payloadType}}}, {{{returnType}}}>;
{{/methods}}
}

export const {{className}}Service = createBindingClass<{{className}}Model>('{{name}}', {
  {{#methods}}
    {{name}}: {{type}}(),
  {{/methods}}
});
{{/services}}
`);

interface ServiceDef {
  name: string;
  className: string;
  methods: MethodDef[];
}

interface MethodDef {
  name: string;
  interfaceType: 'Write' | 'Read';
  type: 'write' | 'read';
  payloadType: string;
  returnType: string;
}

export const plugin: PluginFunction = schema => {
  const query = schema.getQueryType();
  const mutation = schema.getMutationType();

  const queryFieldMap = query.getFields();
  const mutationFieldMap = mutation.getFields();

  const servicesName = uniq<string>(
    Object.keys(queryFieldMap).concat(Object.keys(mutationFieldMap)),
  );

  const services = servicesName.map<ServiceDef>(service => {
    const queryFields = (queryFieldMap[service]?.type as GraphQLNonNull<
      GraphQLObjectType
    >)?.ofType;

    const readMethods = Object.values(queryFields?.getFields() ?? []).map<
      MethodDef
    >(field => {
      return {
        name: field.name,
        interfaceType: 'Read',
        type: 'read',
        payloadType:
          (field.args[0]?.type as GraphQLNonNull<GraphQLObjectType>)?.ofType
            ?.name ?? "''",
        returnType:
          isNonNullType(field.type) && isObjectType(field.type.ofType)
            ? field.type.ofType.name
            : "''",
      };
    });

    const mutationFields = (mutationFieldMap[service]?.type as GraphQLNonNull<
      GraphQLObjectType
    >)?.ofType;

    const mutationMethods = Object.values(
      mutationFields?.getFields() ?? [],
    ).map<MethodDef>(field => ({
      name: field.name,
      interfaceType: 'Write',
      type: 'write',
      payloadType:
        (field.args[0]?.type as GraphQLNonNull<GraphQLObjectType>)?.ofType
          ?.name ?? "''",
      returnType:
        isNonNullType(field.type) && isObjectType(field.type.ofType)
          ? field.type.ofType.name
          : "''",
    }));

    return {
      name: service,
      methods: readMethods.concat(mutationMethods),
      className: upperFirst(service),
    };
  });

  return {
    prepend: [importSegment],
    content: template({ services }),
  };
};
