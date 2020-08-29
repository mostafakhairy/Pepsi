import React from 'react';

interface HeaderData {
  main: string;
  secondary?: string;
}
export default function FormHeader({ main, secondary }: HeaderData) {
  return (
    <div className="text-center">
      <h2 className=" text-primary">{main}</h2>
      <h4 className="heading-4">{secondary}</h4>
    </div>
  );
}
