import { AssetEventSchema } from 'muta-codegen-test';
import { generateEventCode } from '../../components';

test('simple event should codegen correct', async () => {
  const source = `
type CreateAssetEvent {
    asset_id: String!
}
`;
  const schema = await generateEventCode(source);
  expect(schema).toMatchSnapshot();
});

test('empty when no event schema', async () => {
  const schema = await generateEventCode('');
  expect(schema).toEqual('');
});

test('asset event schema', async () => {
  expect(await generateEventCode(AssetEventSchema)).toMatchSnapshot();
});
