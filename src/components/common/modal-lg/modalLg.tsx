import React from 'react';
import Modal from 'react-bootstrap/Modal';
import './modalLg.scss';
import translation from './../../../assets/localization/language';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Fragment } from 'react';
import Loader from '../../common/loader/Loader';
import ErrorAlert from '../error-alert/ErrorAlert';
// import crown from '../../../assets/imgs/crown.png';
import staticOffer from '../../../assets/imgs/staticOffer.png';
import staticOfferEn from '../../../assets/imgs/staticOfferEn.png';

export default function ModalLg({
  show = false,
  onClose,
  couponDetails,
  deals,
  userTier,
  nextTier,
  userPoints,
  subscribe,
  loading,
  error,
}: any) {
  const renderHTML = (rawHTML: string) =>
    React.createElement('div', { dangerouslySetInnerHTML: { __html: rawHTML } });
  return (
    <div>
      <Modal show={show} onHide={onClose} className="modal-small modal-bg-lg-2">
        <Modal.Header closeButton className="pb-0"></Modal.Header>
        <div className="row">
          <div className="col-lg-12">
            <Modal.Header className="pb-0 mt-1">
              <div className="modal-title-style-3">
                {/* <span>
                    <img src={crown}></img>
                    <span className="text"> {translation.greatGift}</span>
                  </span> */}
                <Modal.Title className="text-primary">
                  {translation.youCollect} {userPoints} {translation.cans}
                </Modal.Title>
              </div>
            </Modal.Header>

            <Modal.Body className="pt-0">
              {loading ? (
                <div className="loader-container">
                  <Loader show={true} position="Absolute" center={true} />
                </div>
              ) : // </div>
              null}
              <p className="mb-3"> {translation.deserveGift}</p>

              <div className="row w-100 justify-content-center">
                {deals.map((deal: any, index: number) => {
                  return (
                    <div className="col-sm-12 col-12" key={index}>
                      <Card className="card-style-1 fix-1 card-sm mb-3">
                        <Card.Header
                          style={{
                            backgroundImage: `url(${deal.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                          }}
                        >
                          <span className="text">
                            {/* <span className="num">{'%' + deal.discount}</span> */}
                            {deal.title}
                          </span>
                          <img
                            src={deal.logo}
                            alt=""
                            style={{ maxWidth: '100px', maxHeight: '40px' }}
                          />
                        </Card.Header>
                        <Card.Body>
                          <Button
                            variant="primary"
                            onClick={() =>
                              subscribe(deal.offerNumber, deal.externalpoints, deal.categoryId)
                            }
                          >
                            {translation.getOffer}
                          </Button>
                        </Card.Body>
                      </Card>
                    </div>
                  );
                })}
                <ErrorAlert show={!!error} message={error} />
              </div>
              <hr className="w-100 mt-4" />
              {nextTier > 0 ? (
                <Fragment>
                  {/* <h2 className="text-primary heading-4">
                    {' '}
                    {translation.canSubstitute} {userTier} {translation.codesNow}{' '}
                  </h2> */}
                  {/* <p className="mt-2 heading-6 px-3">
                    {' '}
                    {translation.orCollect} {nextTier} {translation.otherCans}
                  </p> */}
                  <button
                    onClick={onClose}
                    className="btn btn-danger mt-4"
                    style={{ borderRadius: '7px', backgroundColor: '#C20023' }}
                  >
                    {translation.waitCollect}
                  </button>
                </Fragment>
              ) : null}
              <p className="mt-4 heading-7 mb-22 crossline">
                <span>{translation.termsConditionsApply}</span>
              </p>
            </Modal.Body>
          </div>

          <div className="col-lg-12 first-modall">
            {/* <Modal.Header className="pb-0">
              <div className="modal-title-style-2">
                <span>
                  <img src={gift}></img>
                </span>
                <Modal.Title className="text-light">{translation.congratulationsPepsi}</Modal.Title>
              </div>
            </Modal.Header> */}
            <Modal.Body className="pt-0">
              {/* <p className="mb-22"> {couponDetails.offerTitle}</p> */}
              <p className="mb-22"> {translation.congratulationsYouWin} </p>
              <img
                className="img-modal-1"
                src={localStorage.lang === 'en' ? staticOfferEn : staticOffer}
                alt=""
              />
              <h2 className="heading-3 mt-4"> {translation.giftCode} </h2>
              <div className="num">{couponDetails.couponNumber}</div>
              <hr className="w-100 mt-4" />
              <h2 className="text-primary heading-4"> {translation.howCode} </h2>
              <p className="mt-4 heading-6 px-3"> {renderHTML(couponDetails.offerDescription)} </p>
              {/* <p className="mt-4 heading-6 px-3"> {translation.codeCashier} </p> */}
              <p className="mt-4 heading-7 mb-22 crossline">
                <span>{translation.termsConditionsApply}</span>
              </p>
            </Modal.Body>
          </div>
        </div>
      </Modal>
    </div>
  );
}
