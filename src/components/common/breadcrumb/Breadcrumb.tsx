import React from 'react';
import './Breadcrumb.scss';
import translation from './../../../assets/localization/language';

interface Breadcrumb {
  previousPage: string;
  activePage: string;
  header: string;
  text: string;
}

export default function Breadcrumb({ previousPage, activePage, header, text }: Breadcrumb) {
  return (
    <div className={'breadcrumbContainer' + ' ' + 'container-fluid'}>
      <nav className="breadcrumb">
        <a className="breadcrumb-item" href="#">
          {' '}
          <i className="fas fa-home icon"></i> {translation[previousPage]}
        </a>
        <span className="breadcrumb-item active">{translation[activePage]}</span>
      </nav>
      <h1 className="text-primary heading-1">{translation[header]}</h1>
      <p className="heading-2 font-light">{translation[text]}</p>
    </div>
  );
}
