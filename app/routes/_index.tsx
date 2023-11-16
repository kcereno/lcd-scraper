import type { ActionFunctionArgs, MetaFunction } from '@remix-run/node';
import { Form, useActionData, useNavigation } from '@remix-run/react';
import CoverageGuidelines from '~/components/CoverageGuidelines';
import { scrape } from '~/data/scrape';

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

export default function Index() {
  const data = useActionData();
  console.log('Index ~ data:', data);

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
            <h1 className="text-3xl card-title">{data.lcd}</h1>
            <CoverageGuidelines
              coverageGuidelineArr={data.coverageGuidanceArr as string[]}
            />
          </div>
        </div>
      )}
    </>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const url = formData.get('url');

  if (!url) return 'No URL provided';

  try {
    const result = await scrape(url as string);
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
