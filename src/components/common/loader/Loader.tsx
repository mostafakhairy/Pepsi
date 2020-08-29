import React from 'react';
import Classes from './Loader.module.scss';
interface LoaderProps {
  center?: Boolean;
  light?: Boolean;
  position?: PositionType;
  color?: string;
  show: boolean;
}

type PositionType = 'Fixed' | 'Absolute' | 'Relative';

export default function Loader({ center, light, position, color, show }: LoaderProps) {
  let loaderClass = ' spinner-border ' + color;
  if (center) {
    loaderClass += ' ' + Classes.CenterLoader + ' ';
  }
  if (light) {
    loaderClass += ' text-light ';
  }
  if (position) {
    loaderClass += ' ' + Classes[position] + ' ';
  }
  if (show) {
    loaderClass += ' d-inline-block mx-2';
  } else {
    loaderClass += ' d-none ';
  }
  return (
    <div className={loaderClass} style={{ width: '1.5rem', height: '1.5rem' }} role="status">
      <span className="sr-only">Loading...</span>
    </div>
  );
}
