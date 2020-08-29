import React, { Fragment, useState, useEffect, useContext } from 'react';
import codeArtwork from '../../assets/imgs/code-artwork.png';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import pepsiArtwork from '../../assets/imgs/pepsi-can.png';
import Card from 'react-bootstrap/Card';
import StepList from './../common/step-list/StepList';
import giftArtwork from '../../assets/imgs/gift-artwork.png';
import upArrow from '../../assets/imgs/up-arrow.png';
import translation from './../../assets/localization/language';
import Classes from './Home.module.scss';
import Slider from '../common/slider/Slider';
import { FormCustom } from '../../models/interfaces/FormCustom';
import SubmitBtn from '../common/SubmitBtn/SubmitBtn';
import useForm from '../../custom-hooks/useForm';
import couponsService from '../../services/coupons.service';
import FormInput from '../common/form-input/FormInput';
import ErrorAlert from '../common/error-alert/ErrorAlert';
import ModalSm from '../common/modal-sm/modalSm';
import CouponDetails from './../../models/interfaces/CouponDetails';
import { ApplicationContext } from '../../context/ApplicationContext';
import authService from '../../services/auth.service';
import { IBurnDeals } from './../../models/interfaces/IBurnDeals';
import ModalLg from '../common/modal-lg/modalLg';
import { IDeal } from './../../models/interfaces/IBurnResponse';
import Loader from '../common/loader/Loader';
import { NavLink } from 'react-router-dom';

export default function Home() {
  let burnForm: FormCustom = {
    formControls: [
      {
        name: 'burn',
        tabIndex: 1,
        label: '',
        placeHolder: 'insertCodeHere',
        type: 'text',
        value: '',
        required: true,
        errorMessage: 'requiredBurnCode',
      },
    ],
    isValidForm: false,
    formReset: false,
  };
  const [formState, onInputChange, resetForm, formValue, setFormState] = useForm(burnForm);
  const [showLoading, setShowLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [couponDetails, setCouponDetails] = useState<CouponDetails | any>({});
  const [appContext, setAppContext] = useContext(ApplicationContext);
  const [tiersState, setTiersState] = useState<number[]>([]);
  const [DealsState, setDealsState] = useState<IDeal[]>([]);
  const [userTierState, setUserTierState] = useState({ tier: 0, points: 0 });
  const [nextTierState, setNextTierState] = useState(0);
  const [showLgModal, setShowLgModal] = useState(false);
  const [loadDeals, setLoadDeals] = useState(false);
  const [showLoadingBurn, setShowLoadingBurn] = useState(false);
  const [isFixedOffer, setIsFixedOffer] = useState(true);
  useEffect(() => {
    if (localStorage.externalCode) {
      let burnForm = formState;
      let burnInput = burnForm.formControls.find((c) => c.name === 'burn');
      if (burnInput) {
        burnInput.value = localStorage.externalCode;
      }
      burnForm.isValidForm = true;
      setFormState({ ...burnForm });
    }
  }, []);
  useEffect(getTiers, []);
  useEffect(getDeals, [appContext]);
  function getDeals() {
    setLoadDeals(true);
    couponsService
      .deals()
      .then((deals) => setDealsState([...deals]))
      .finally(() => setLoadDeals(false));
  }
  function submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setShowLoadingBurn(true);
    setServerError('');
    let value = formValue();
    setTimeout(() => {
      couponsService
        .burn(value.burn)
        .then(
          (res: IBurnDeals): Promise<number[]> => {
            resetForm();
            setCouponDetails(res.burnedCoupon);
            setDealsState(res.deals);
            setIsFixedOffer(true);
            if (res.deals.length === 0) {
              setShowSuccessModal(true);
            } else {
              setShowLgModal(true);
            }
            setShowLoadingBurn(false);
            if (localStorage.externalCode) {
              localStorage.removeItem('externalCode');
            }
            setAppContext({ ...appContext, user: authService.getLoggedUser() });
            return Promise.resolve(tiersState);
          }
        )
        .then(getUserTiers)
        .catch((err: any) => {
          setServerError(err);
          setShowLoadingBurn(false);
        });
    });
  }
  function getTiers() {
    couponsService
      .tiers()
      .then(
        (tiers): Promise<number[]> => {
          setTiersState(tiers);
          return Promise.resolve(tiers);
        }
      )
      .then(getUserTiers);
  }
  function getUserTiers(tiers: number[]) {
    let user = authService.getLoggedUser();
    let tier = tiers.filter((c) => c <= user.points);
    let nextTier = tiers.filter((c) => c > user.points);
    if (nextTier.length > 0) {
      setNextTierState(nextTier[0] - user.points);
    } else {
      setNextTierState(0);
    }
    if (tier.length > 0) {
      user.userTier = tiers.indexOf(tier[tier.length - 1]) || 0;
      setUserTierState({
        ...userTierState,
        tier: user.userTier + 1,
        points: tier[tier.length - 1],
      });
    } else {
      setUserTierState({
        ...userTierState,
        tier: 0,
        points: 0,
      });
    }
  }
  function subscribeToOffer(offerNumber: string, externalPoints: number, categoryId: string) {
    setShowLoading(true);
    setServerError('');
    couponsService
      .subscribe(offerNumber, externalPoints, categoryId)
      .then((res) => {
        if (res.couponNumber) {
          setCouponDetails(res);
          setShowSuccessModal(true);
          setIsFixedOffer(false);
        }
        setShowLgModal(false);
        setAppContext({ ...appContext, user: authService.getLoggedUser() });
        setShowLoading(false);
        setServerError('');
        return Promise.resolve(tiersState);
      })
      .then(getUserTiers)
      .catch((err: any) => {
        setServerError(err);
        setShowLoading(false);
      });
  }

  return (
    <Fragment>
      <Slider />
      <div className="container-fluid">
        <div className="row my-4">
          <div className="col-md-8">
            <h2 className="text-primary heading-1"> {translation.insertCode} </h2>
            <p className="mt-3"> {translation.insertCodeText} </p>

            <div className={Classes.homeForm}>
              <Form inline className="mt-4 form-inline-fix-1" noValidate onSubmit={submitForm}>
                {formState.formControls.map((input) => {
                  return (
                    <FormInput
                      key={input.name}
                      config={input}
                      inputChange={(e: any) => {
                        setServerError('');
                        localStorage.removeItem('externalCode');
                        onInputChange(e);
                      }}
                      rested={formState.formReset}
                    />
                  );
                })}
                <div className="ml-2">
                  <SubmitBtn
                    text="sendCode"
                    index={formState.formControls.length + 1}
                    disabled={!formState.isValidForm}
                    loading={showLoadingBurn}
                  />
                </div>
              </Form>
              <div className="col-md-5 col-12 text-center mt-3 p-0">
                <ErrorAlert show={!!serverError && !showLgModal} message={serverError} />
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="artwork-style-1">
              <h2 className="text-primary heading-4">
                <span className="w-1">{translation.codeArtwork}</span>
              </h2>
              <img className="mr-1" height="125" src={codeArtwork} alt="" />
            </div>
          </div>
        </div>
      </div>

      <hr />

      <div className="container-fluid">
        <div className="row mt-5">
          <div className="col-lg-8 col-md-6">
            {!loadDeals ? (
              DealsState.length > 0 ? (
                <>
                  <h2 className="text-primary heading-1">{translation.currentLevel}</h2>
                  <p className="w-2">
                    {translation.collect}
                    {appContext.user.points}
                    {translation.tierDescription}
                  </p>
                  {DealsState.map((deal, index) => {
                    return (
                      <Card className="card-style-1 fix-1 mt-22 border-top-0" key={index}>
                        <Card.Header
                          style={{
                            backgroundImage: `url(${deal.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            height: '5.5rem',
                          }}
                        >
                          <span className="text">
                            {deal.title}
                            {/* <span className="num">{'%' + deal.discount}</span>  */}
                          </span>
                          <img
                            src={deal.logo}
                            alt=""
                            style={{ maxWidth: '100px', maxHeight: '75px' }}
                          />
                        </Card.Header>
                        <Card.Body>
                          <Card.Text>
                            <i className="fas icon fa-unlock-alt"></i>
                            {translation.thisOfferAvailable}
                          </Card.Text>

                          <Button
                            variant="primary"
                            onClick={() =>
                              subscribeToOffer(
                                deal.offerNumber,
                                deal.externalpoints,
                                deal.categoryId
                              )
                            }
                            disabled={showLoading}
                          >
                            {translation.getOffer}
                            <Loader show={showLoading} />
                          </Button>
                        </Card.Body>
                      </Card>
                    );
                  })}
                </>
              ) : (
                <h2
                  className="d-flex col-6 justify-content-center align-items-center heading-2 text-warning"
                  style={{ height: '50%' }}
                >
                  {translation.noOffers}
                </h2>
              )
            ) : (
              <div>
                <Loader show={loadDeals} position="Absolute" center={true} />
              </div>
            )}
            <h4 className="heading-4 mt-3 mb-4">
              <NavLink to="/History" exact>
                {translation.giftsHistory}
              </NavLink>
            </h4>
          </div>

          <div className="col-lg-4 col-md-6 art-wrok-container">
            <div className="artwork-style-2">
              <img className="mr-3" src={pepsiArtwork} alt="" />
              <div className="top-class">
                <span className="icon">
                  <img src={upArrow} alt="" />
                </span>
                <div>
                  {translation.nextLevel}
                  <strong className="d-block">
                    {translation.toCollect} {nextTierState} {translation.cans}
                  </strong>
                </div>
              </div>
              <div
                className={`tiers tier-${
                  appContext.user.points < 11 ? appContext.user.points : 10
                }`}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => {
                  return (
                    <div key={index}>
                      <span></span>
                      <span>
                        {translation.collect} {index + 1} {translation.cans}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr className="mt-0" />

      <div className={'container-fluid mb-5'}>
        <div className="row">
          <div className="col-md-8">
            <StepList
              title={'howToUseGifts'}
              steps={['lookCodeCover', 'insertCodeOn', 'whenYouInsertCodeWin']}
            />
          </div>
          <div className="col-md-4 flex-v-center justify-content-md-start justify-content-center">
            <img className="mt-4" width="230" src={giftArtwork} alt="" />
          </div>
        </div>
      </div>
      <ModalSm
        show={showSuccessModal}
        onClose={() => {
          setShowSuccessModal(false);
          setShowLgModal(false);
        }}
        couponDetails={couponDetails}
        isFixedOffer={isFixedOffer}
      />

      <ModalLg
        show={showLgModal}
        onClose={() => {
          setShowSuccessModal(false);
          setShowLgModal(false);
          setServerError('');
          setShowLoading(false);
        }}
        couponDetails={couponDetails}
        deals={DealsState}
        nextTier={nextTierState}
        userPoints={appContext.user.points}
        userTier={userTierState.points}
        subscribe={subscribeToOffer}
        loading={showLoading}
        error={serverError}
      />

      {/* <ModalSimple />  */}
    </Fragment>
  );
}
