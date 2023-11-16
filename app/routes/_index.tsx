import type { ActionFunctionArgs, MetaFunction } from '@remix-run/node';
import { useActionData, useNavigation } from '@remix-run/react';
import type { dataTypes } from 'types';
import CoverageGuidelines from '~/components/CoverageGuidelinesCollapse';
import { getLCDs, scrape } from '~/data/scrape';
import LCDDropdown from '../components/LCDDropdown';
import LoadingSpinner from '~/components/ui/LoadingSpinner';
import DataCard from '~/components/DataCard';

export const meta: MetaFunction = () => {
  return [
    { title: 'LCD Scraper' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

export default function Index() {
  const navigate = useNavigation();
  const data = useActionData<dataTypes>();

  return (
    <>
      <div className="pt-20">
        <h1 className="font-sans text-3xl font-bold tracking-tight text-center">
          <span className="text-pink-500">
            Local Coverage Determination (LCD){' '}
          </span>{' '}
          Scraper
        </h1>

        <LCDDropdown />
      </div>

      {navigate.state === 'submitting' && <LoadingSpinner className="my-10" />}
      {data && <DataCard />}
    </>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const url = formData.get('url');

  try {
    return await scrape(url as string);
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
  return await getLCDs();
}
