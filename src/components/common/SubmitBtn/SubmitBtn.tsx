import React from 'react';
import translation from '../../../assets/localization/language';
import Loader from '../loader/Loader';

type Title = { text: string; index: number; loading: boolean; disabled: boolean };
export default function SubmitBtn({ text, index, loading, disabled }: Title) {
  return (
    <button
      type="submit"
      className="btn btn-primary btn-block"
      tabIndex={index}
      style={{ padding: '.7rem' }}
      disabled={disabled || loading}
    >
      {translation[text]}
      <Loader show={loading} />
    </button>
  );
}
