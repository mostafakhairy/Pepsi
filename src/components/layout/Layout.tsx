import React, { Fragment, Suspense } from 'react';
import IRouter from '../../models/interfaces/Route';
import ErrorBoundary from './../errorBoundary/ErrorBoundary';
import NavbarLink from '../common/navbar/Navbar';
import Loader from '../common/loader/Loader';
import Footer from '../common/footer/Footer';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Classes from './Layout.module.scss';
import ProtectedRoute from './../protectedRoute/ProtectedRoute';
// import { Route, Redirect } from 'react-router-dom';

const Home = React.lazy(() => import('../home/Home'));
const Login = React.lazy(() => import('../login/Login'));
const About = React.lazy(() => import('../about/About'));
const Privacy = React.lazy(() => import('../privacy/Privacy'));
const Terms = React.lazy(() => import('../terms/Terms'));
const Register = React.lazy(() => import('./../register/Register'));
const History = React.lazy(() => import('./../history/History'));
const RegisterLanguage = React.lazy(() => import('../registerLanguage/RegisterLanguage'));

const routes: IRouter[] = [
  {
    path: '/',
    name: 'home',
    component: Home,
    protected: true,
  },
  {
    path: '/language',
    name: 'registerLanguage',
    component: RegisterLanguage,
    hidden: true,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    hidden: true,
  },
  {
    path: '/Register',
    name: 'register',
    component: Register,
    hidden: true,
  },
  {
    path: '/About',
    name: 'about',
    component: About,
  },
  {
    path: '/History',
    name: 'giftsHistory',
    component: History,
    // hidden: true,
    protected: true,
  },
  {
    path: '/Privacy',
    name: 'privacy',
    component: Privacy,
  },
  {
    path: '/Terms',
    name: 'terms',
    component: Terms,
  },

  {
    path: '/externalRegister/:firstName/:lastName/:mobileNumber/:email/:offerNumber/:language',
    name: 'register',
    component: Register,
    hidden: true,
    protected: false,
  },
  {
    path: '/externalRegister/:firstName/:lastName/:mobileNumber/:email/:offerNumber',
    name: 'registerLanguage',
    component: RegisterLanguage,
    hidden: true,
    protected: false,
  },
  {
    path: '/externalLogin/:mobileNumber',
    name: 'login',
    component: Login,
    hidden: true,
    protected: false,
  },
];
const Layout = () => {
  return (
    <Fragment>
      <NavbarLink routes={routes} />
      <Suspense
        fallback={
          <div style={{ height: '600px' }}>
            <Loader center={true} show={true} position="Fixed" />
          </div>
        }
      >
        <ErrorBoundary>
          <TransitionGroup>
            {routes.map((route: IRouter) => (
              <CSSTransition key={route.path} classNames={Classes.Page} timeout={300}>
                <ProtectedRoute
                  key={route.path}
                  exact
                  path={route.path}
                  component={route.component}
                  protect={route.protected}
                ></ProtectedRoute>
              </CSSTransition>
            ))}
            {/* <Route render={() => <Redirect to={{ pathname: '/' }} />}></Route> */}
          </TransitionGroup>
        </ErrorBoundary>
      </Suspense>
      <Footer></Footer>
    </Fragment>
  );
};

export default Layout;
