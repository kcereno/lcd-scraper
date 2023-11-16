export type lcdDataType = {
  text: string;
  url: string;
};

type hcpsData = {
  code: string;
  description: string;
};

export type dataTypes = {
  lcd: string;
  coverageGuidelines: string[];
  hcpcsModifiers: string[];
  hcpscCodes: hcpsData[];
};
