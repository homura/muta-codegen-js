import {
  GraphQLField,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLScalarType,
  GraphQLSchema,
  isNonNullType,
} from 'graphql';
import { MethodDef } from '../types';

function fieldToMethodDef(field: GraphQLField<any, any>): MethodDef {
  const payloadType = field.args[0].type;
  const payload = isNonNullType(payloadType)
    ? payloadType.ofType
    : (payloadType as GraphQLScalarType | GraphQLInputObjectType);

  return {
    name: field.name,
    payloadType: payload?.name,
    returnType: (field.type as GraphQLNonNull<any>)?.ofType?.name,
  };
}

export function parseMethodDef(
  schema: GraphQLSchema,
): { query: MethodDef[]; mutation: MethodDef[] } {
  const queryFields = schema.getQueryType()?.getFields() ?? [];
  const query = Object.values(queryFields).map(fieldToMethodDef);

  const mutationType = schema.getMutationType()?.getFields() ?? [];
  const mutation = Object.values(mutationType).map(fieldToMethodDef);

  return {
    query,
    mutation,
  };
}
