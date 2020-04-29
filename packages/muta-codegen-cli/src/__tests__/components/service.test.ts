import { AssetEventSchema, AssetServiceSchema } from 'muta-codegen-test';
import { generateServiceBindingCode } from '../../components';

test('asset service', async () => {
  const code = await generateServiceBindingCode('asset', AssetServiceSchema);
  expect(code).toMatchSnapshot();
});

test('metadata service with empty args get_metadata: Metadata', async () => {
  expect(
    await generateServiceBindingCode('metadata', AssetEventSchema),
  ).toMatchSnapshot();
});
