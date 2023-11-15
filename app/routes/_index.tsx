import type { MetaFunction } from '@remix-run/node';
import { Form, useActionData } from '@remix-run/react';
import { scrape } from '~/data/scrape';

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

export default function Index() {
  const data = useActionData() as string;

  return (
    <>
      <header className="text-center py-20">
        <h1 className="text-7xl">Local Coverage Determinations Scraper</h1>
      </header>
      <section>
        <Form method="POST">
          <button
            className="px-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 text-xl"
            type="submit"
          >
            Scrape
          </button>
        </Form>
        {data && <p>data</p>}
      </section>
    </>
  );
}

export async function action() {
  console.log('action');

  const result = await scrape();
  return result;
}
