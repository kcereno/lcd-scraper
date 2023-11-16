import React from 'react';

import { useActionData } from '@remix-run/react';
import type { dataTypes } from 'types';
import HCPSCCollapse from './HCPSCCollapse';
import CoverageGuidelinesCollapse from './CoverageGuidelinesCollapse';

export default function DataCard() {
  const data = useActionData<dataTypes>();

  console.log('DataCard ~ data:', data);
  return (
    <div className="max-w-4xl mx-auto shadow-xl card bg-base-300">
      <div className="card-body">
        {data ? (
          <>
            <h1 className="mb-2 text-3xl card-title">{data!.lcd}</h1>

            <HCPSCCollapse
              hcpscCodes={data.hcpscCodes}
              hcpscModifiers={data.hcpcsModifiers}
            />
            <CoverageGuidelinesCollapse
              coverageGuidelineArr={data.coverageGuidelines}
            />
          </>
        ) : (
          <p>No Data Found</p>
        )}
      </div>
    </div>
  );
}
