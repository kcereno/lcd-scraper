import type { ActionFunctionArgs, MetaFunction } from '@remix-run/node';
import {
  Form,
  useActionData,
  useLoaderData,
  useNavigation,
} from '@remix-run/react';
import type { dataTypes, lcdDataType } from 'types';
import CoverageGuidelines from '~/components/CoverageGuidelines';
import { getLCDs, scrape } from '~/data/scrape';

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

export default function Index() {
  const navigate = useNavigation();
  const data = useActionData<dataTypes>();

  const lcdArr = useLoaderData<lcdDataType[]>();
  console.log('Index ~ lcdArr:', lcdArr);

  return (
    <>
      <div className="py-20">
        <h1 className="font-sans text-3xl font-bold tracking-tight text-center">
          <span className="text-pink-500">
            Local Coverage Determination (LCD){' '}
          </span>{' '}
          Scraper
        </h1>

        <Form
          method="POST"
          className="flex w-1/2 gap-2 mx-auto my-10"
        >
          {/* <input
            type="text"
            className="w-full input input-bordered"
            name="url"
            placeholder="Enter URL to scrape"
          /> */}
          <select className="w-full select select-bordered">
            <option
              disabled
              selected
            >
              Select LCD
            </option>
            {lcdArr!.map((lcd) => (
              <option
                key={lcd.text}
                value={lcd.url}
              >
                {lcd.text}
              </option>
            ))}
          </select>
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

  // if (!url) return 'No URL provided';

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

export async function loader() {
  const lcds = await getLCDs();
  return lcds;
}
