import React from 'react';
import { Form, useLoaderData, useSubmit } from '@remix-run/react';
import type { lcdDataType } from 'types';

export default function LCDDropdown() {
  const [selectedLCD, setSelectedLCD] = React.useState('');

  const submit = useSubmit();
  const lcdData = useLoaderData<lcdDataType[]>();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submit({ url: selectedLCD }, { method: 'post' });
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLCD(e.target.value);
  };

  return (
    <Form
      method="POST"
      className="flex w-1/2 gap-2 mx-auto my-10"
      onSubmit={handleSubmit}
    >
      <select
        className="w-full select select-bordered"
        name="url"
        onChange={handleSelect}
      >
        <option
          disabled
          selected
        >
          Select LCD
        </option>
        {lcdData!.map((lcd) => (
          <option
            key={lcd.text}
            value={lcd.url}
          >
            {lcd.text}
          </option>
        ))}
      </select>
      <button
        className="btn btn-secondary"
        type="submit"
      >
        Scrape
      </button>
    </Form>
  );
}
