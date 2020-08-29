import React, { Fragment, useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';

import IRouter from '../../../models/interfaces/Route';
import translation from '../../../assets/localization/language';
import pepsi from '../../../assets/imgs/pepsi.png';
import notification from '../../../assets/imgs/notification.png';
import arIcon from '../../../assets/imgs/ar-icon.png';
import enIcon from '../../../assets/imgs/en-icon.png';
import Classes from './Navbar.module.scss';
import { ApplicationContext } from '../../../context/ApplicationContext';
import Dropdown from 'react-bootstrap/esm/Dropdown';
import Badge from 'react-bootstrap/Badge';
import authService from '../../../services/auth.service';
// import gift from "../../../assets/imgs/gifts.png";
import turnOff from '../../../assets/imgs/turn-off.png';
import { useLocation } from 'react-router-dom';

export default function NavbarLink({ routes }: any) {
  const [menuState, setMenuState] = useState(true);
  const [menuClass, setMenuClass] = useState(Classes.NavClose);
  const [appState, setAppState] = useContext(ApplicationContext);
  let location = useLocation();
  function toggleMenu() {
    setMenuState(!menuState);
    if (menuState) {
      setMenuClass(Classes.NavOpen);
    } else {
      setMenuClass(Classes.NavClose);
    }
  }
  function closeNav() {
    setMenuState(true);
    setMenuClass(Classes.NavClose);
  }

  function changeLang(language: string | null) {
    setAppState({ ...appState, lang: language });
    localStorage.lang = language;
  }
  const ar = (
    <Fragment>
      <img src={arIcon} alt="" />
      العربية
    </Fragment>
  );
  const en = (
    <Fragment>
      <img src={enIcon} alt="" />
      English
    </Fragment>
  );

  const renderRegisterButton = () => {
    if (location.pathname === '/register' || location.pathname === '/language') {
      return (
        <div className={'d-inline-block account ' + Classes.name}>
          <p className="d-lg-inline-block mx-2 account-link d-none">{translation.haveAccount}</p>
          <NavLink to="/login" className={'btn btn-light ' + Classes.LoginBtn} onClick={closeNav}>
            {translation['login']}
          </NavLink>
        </div>
      );
    } else {
      return (
        <div className={'d-inline-block account ' + Classes.name}>
          <p className="d-lg-inline-block mx-2 account-link d-none">
            {translation.donthaveAccount}
          </p>
          <NavLink
            to="/language"
            onClick={closeNav}
            exact
            className={'btn btn-light ' + Classes.LoginBtn}
          >
            {translation['register']}
          </NavLink>
        </div>
      );
    }
  };
  return (
    <div className={menuClass}>
      <nav className={Classes.navContainer}>
        <div className={Classes.navInner}>
          <button className={Classes.TogglerBtn} onClick={toggleMenu}>
            {/* <i className="fa fa-bars fa-lg"></i> */}
            <span className="navbar-toggler-icon"></span>
          </button>

          <NavLink to="/" exact className={Classes.Logo}>
            <img src={pepsi} width="35" height="35" alt="" />
          </NavLink>

          <div className={Classes.inner}>
            <ul className={Classes.NavList}>
              {routes.map((route: IRouter) =>
                !route.hidden && !(route.protected && !appState.user.unique_name) ? (
                  <li key={route.path} className="" onClick={closeNav}>
                    <NavLink to={route.path} exact className="">
                      {translation[route.name]}
                    </NavLink>
                  </li>
                ) : null
              )}
              {/* <li className="d-lg-none" onClick={closeNav}>
                <NavLink to="/History" exact>
                  {translation.giftsHistory}
                </NavLink>
              </li> */}
              <li className="d-lg-none" onClick={authService.logout}>
                <a>{translation.logout}</a>
              </li>
            </ul>

            <div className={Classes.navSide}>
              {appState.user.unique_name ? (
                <div className={Classes.name}>
                  <Badge variant="light">{appState.user.points}</Badge>{' '}
                  <img className="mx-2" width="35" height="35" src={notification} alt="" />
                  <Dropdown className={Classes.NavName}>
                    <Dropdown.Toggle className="name-top-menu" variant="default">
                      {appState.user.unique_name}
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="lang-menu d-none d-lg-block">
                      {/* <Dropdown.Item>
                        <img src={gift}></img>
                        <NavLink to="/History" className="mx-2" exact>
                          {translation.giftsHistory}
                        </NavLink>
                      </Dropdown.Item> */}

                      <Dropdown.Item onClick={authService.logout}>
                        <img src={turnOff}></img>
                        <p className="d-inline-block mx-2"> {translation.logout}</p>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              ) : (
                renderRegisterButton()
              )}

              <div className={'lang-container ' + Classes.LangRes}>
                <Dropdown className={Classes.NavLang}>
                  <Dropdown.Toggle variant="default">
                    {appState.lang === 'ar' ? ar : en}
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="lang-menu">
                    <Dropdown.Item eventKey="ar" onSelect={(e) => changeLang(e)} onClick={closeNav}>
                      {ar}
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="en" onSelect={(e) => changeLang(e)} onClick={closeNav}>
                      {en}
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
