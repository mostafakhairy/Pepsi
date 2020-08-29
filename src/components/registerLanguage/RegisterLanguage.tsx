import React, { Fragment, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import Slider from '../../components/common/slider/Slider';
import FormHeader from './../common/form-header/FormHeader';
import translation from './../../assets/localization/language';
import SubmitBtn from '../common/SubmitBtn/SubmitBtn';
import './RegisterLanguage.scss';
import Dropdown from 'react-bootstrap/Dropdown';
import { ApplicationContext } from './../../context/ApplicationContext';
import { NavLink } from 'react-router-dom';

export default withRouter(function RegisterLanguage(props: any) {
  const [appState, setAppState] = useContext(ApplicationContext);
  let newPath = props.location.pathname;

  function formSubmited(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let pathArr = newPath.toLowerCase().split('/');

    if (!pathArr.find((c: string) => c == 'externalregister')) {
      props.history.push('/register');
    } else {
      props.history.push(`${newPath}/${appState.lang}`);
    }
  }
  function changeLang(language: any) {
    setAppState({ ...appState, lang: language });
    localStorage.lang = language;
  }
  return (
    <Fragment>
      <Slider />
      <div className="card card-body m-auto col-xs-12  col-sm-6 col-lg-3 col-md-4 border-0 py-5">
        <FormHeader main={translation.register} secondary={translation.languageSub}></FormHeader>
        <form noValidate className="my-4" onSubmit={formSubmited}>
          <div className="p-0 mb-3">
            <Dropdown className="home-dropdown">
              <Dropdown.Toggle variant="default" id="dropdown-basic">
                {appState.lang === 'ar' ? 'العربية' : 'English'}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item eventKey="ar" onSelect={(e) => changeLang(e)}>
                  العربية
                </Dropdown.Item>
                <Dropdown.Item eventKey="en" onSelect={(e) => changeLang(e)}>
                  English
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <SubmitBtn loading={false} disabled={false} text={'continue'} index={2} />
          <p className="text-center mt-3 underline">  {translation.accountWithUs} <NavLink to="/login" className="text-underline">{translation.clickToLogin}</NavLink></p>
        </form>
      </div>
    </Fragment>
  );
});



