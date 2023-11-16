import React from 'react';

type Props = {
  coverageGuidelineArr: string[];
};

export default function CoverageGuidelines({ coverageGuidelineArr }: Props) {
  console.log(
    'CoverageGuidelines ~ coverageGuidelineArr:',
    coverageGuidelineArr
  );
  return (
    <>
      <h2 className="mt-5 text-2xl">Coverage Guidelines</h2>
      <hr />
      {coverageGuidelineArr.map((el, index) => {
        return (
          <div
            key={index}
            className="flex flex-col mt-4"
          >
            <h2 className="">{el}</h2>
          </div>
        );
      })}
    </>
  );
}
