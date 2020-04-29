import { buildSchema } from 'graphql';
import { AssetEventSchema } from 'muta-codegen-test';
import { generateEventDefCode } from '../event';

it('empty event input should output empty result', () => {
  expect(generateEventDefCode(buildSchema('scalar Hash'))).toEqual('');
});

it('test one event', () => {
  expect(generateEventDefCode(buildSchema(AssetEventSchema))).toMatchSnapshot();
});
