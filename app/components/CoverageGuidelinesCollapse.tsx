import React from 'react';

type Props = {
  coverageGuidelineArr: string[];
};

export default function CoverageGuidelinesCollapse({
  coverageGuidelineArr,
}: Props) {
  return (
    <>
      <div className="collapse bg-base-200">
        <input type="checkbox" />
        <div className="text-xl font-medium collapse-title">
          Coverage Guidelines
        </div>
        <div className="collapse-content">
          {/* Modifiers */}
          <div className="">
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
          </div>
        </div>
      </div>
    </>
  );
}
