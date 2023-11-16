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
  const data = useActionData();

  const navigate = useNavigation();

  return (
    <>
      <div className="py-32">
        <h1 className="font-sans text-3xl font-bold tracking-tight text-center">
          Local Coverage Determination (LCD) Scraper
        </h1>

        <Form
          method="POST"
          className="flex w-1/2 gap-2 mx-auto mt-10"
        >
          <input
            type="text"
            className="w-full input input-bordered"
            name="url"
            placeholder="Enter URL to scrape"
          />
          <button
            className="btn btn-primary"
            type="submit"
          >
            Scrape
          </button>
        </Form>
      </div>

      {navigate.state === 'submitting' && (
        <p className="text-xl text-center text-red-500">Scraping data....</p>
      )}

      {data && (
        <div className="max-w-4xl mx-auto shadow-xl card bg-base-300">
          <div className="card-body">
            <h1 className="text-xl font-bold">{data.lcd}</h1>
          </div>
        </div>
      )}
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
