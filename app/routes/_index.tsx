import type { MetaFunction } from '@remix-run/node';
import { Form, useActionData, useNavigation } from '@remix-run/react';
import { scrape } from '~/data/scrape';

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

export default function Index() {
  const data = useActionData() as string;
  console.log('Index ~ data:', data);
  const navigate = useNavigation();
  console.log('Index ~ navigate:', navigate.state);

  return (
    <>
      <header className="text-center py-20">
        <h1 className="text-7xl">Local Coverage Determinations Scraper</h1>
      </header>
      <section>
        <Form method="POST">
          <button
            className="px-2 border border-gray-300 rounded-md shadow-sm  font-medium text-gray-700 bg-white hover:bg-gray-50 text-xl"
            type="submit"
          >
            Scrape
          </button>
        </Form>
        {navigate.state === 'submitting' && <p>Submitting...</p>}
        {data && <p>{data}</p>}
      </section>
    </>
  );
}

export async function action() {
  console.log('action');

  try {
    const result = await scrape();
    return result;
  } catch (error) {
    console.error(error);
    return new Response('Internal Server Error', {
      status: 500,
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }
}
