import { buildSchema } from 'graphql';
import { generateEventDefCode } from '../event';

it('empty event input should output empty result', () => {
  expect(generateEventDefCode(buildSchema('scalar Hash'))).toEqual('');
});

it('test one event', () => {
  expect(
    generateEventDefCode(
      buildSchema(`
  scalar Hash
  scalar Address
  scalar u64

  type CreateAssetEvent {
    asset_id: Hash!
    from: Address!
    to: Address!
    value: u64
  }
  `),
    ),
  ).toMatchSnapshot();
});
