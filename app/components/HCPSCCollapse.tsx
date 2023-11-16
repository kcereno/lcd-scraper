import React from 'react';

type Props = {
  hcpscModifiers: string[];
  hcpscCodes: {
    code: string;
    description: string;
  }[];
};

export default function HCPSCCollapse({ hcpscModifiers, hcpscCodes }: Props) {
  return (
    <div className="collapse bg-base-200">
      <input type="checkbox" />
      <div className="text-xl font-medium collapse-title">HCPS</div>
      <div className="collapse-content">
        {/* Modifiers */}
        <div className="">
          <h3 className="font-bold">Modifiers</h3>
          <hr className="my-2" />
          {hcpscModifiers.map((el) => (
            <p key={el}>{el}</p>
          ))}
        </div>

        <div className="mt-10">
          <h3 className="font-bold">Codes</h3>
          <hr className="my-2" />
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {hcpscCodes.map((el) => (
                  <tr key={el.code}>
                    <th>{el.code}</th>
                    <td>{el.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
