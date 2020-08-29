import React from 'react';
import './StepList.scss';
import { IStepList } from './../../../models/interfaces/StepList';
import translation from './../../../assets/localization/language';

export default function StepList({ title, steps }: IStepList) {
  return (
    <div className="">
      <h2 className="text-primary mt-5 heading-1 mb-4 text-center-lg">{translation[title]}</h2>
      <ul className="list-style-1">
        {steps.map((step, index) => {
          return (
            <li key={index}>
              {' '}
              <span className="num">{index + 1}</span> {translation[step]}{' '}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
