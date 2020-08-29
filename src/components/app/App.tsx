import React, { Fragment, useState } from 'react';
import translation from '../../assets/localization/language';
import { BrowserRouter } from 'react-router-dom';
import Layout from '../layout/Layout';
import * as Sentry from '@sentry/react';
import { ApplicationContext, IAppState } from './../../context/ApplicationContext';
import authService from '../../services/auth.service';

const sharedStatus: IAppState = {
  lang: localStorage.lang + '' || 'ar',
  user: authService.getLoggedUser(),
};
//LOGGING ERROR YOU
Sentry.init({ dsn: 'https://2244027e41b64062886b6f0931cd5e02@o396981.ingest.sentry.io/5320630' });

function App() {
  const [appState, setAppState] = useState(sharedStatus);
  translation.setLanguage(appState.lang);
  const root = document.querySelector('html');
  if (root) root.dir = appState.lang === 'ar' ? 'rtl' : 'ltr';

  return (
    <Fragment>
      <BrowserRouter>
        <ApplicationContext.Provider value={[appState, setAppState]}>
          <Layout />
        </ApplicationContext.Provider>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
