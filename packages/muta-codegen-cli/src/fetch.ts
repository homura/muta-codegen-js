import request from 'request-promise';

export async function fetchSchema(endpoint: string): Promise<string> {
  const res = await request(endpoint, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      query: '{getSchema}',
    }),
  });

  return JSON.parse(res)?.data?.getSchema;
}
