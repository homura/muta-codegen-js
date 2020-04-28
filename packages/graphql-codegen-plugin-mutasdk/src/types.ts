import Maybe from 'graphql/tsutils/Maybe';

export interface ServiceDef {
  name: string;

  query: MethodDef[];

  mutation: MethodDef[];
}

export interface MethodDef {
  name: string;

  payloadType: Maybe<string>;

  returnType: Maybe<string>;
}
