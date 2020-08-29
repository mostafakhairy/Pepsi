import React, { useContext, useEffect } from 'react';
// import offerSample from '../../../assets/imgs/offer-sample.png';
import Modal from 'react-bootstrap/Modal';
import './modalSm.scss';
import translation from './../../../assets/localization/language';
import { ApplicationContext } from '../../../context/ApplicationContext';
import gift from '../../../assets/imgs/gift.png';
import staticOffer from '../../../assets/imgs/staticOffer.png';
import staticOfferEn from '../../../assets/imgs/staticOfferEn.png';

export default function ModalSm({
  show = false,
  onClose,
  couponDetails,
  isFixedOffer = true,
}: any) {
  const renderHTML = (rawHTML: string) =>
    React.createElement('div', { dangerouslySetInnerHTML: { __html: rawHTML } });

  let staticImage = localStorage.lang === 'en' ? staticOfferEn : staticOffer;
  const [appState] = useContext(ApplicationContext);
  useEffect(() => {
    staticImage = appState.lang;
  }, [appState.lang]);
  return (
    <div>
      <Modal show={show} onHide={onClose} className="modal-small">
        <Modal.Header closeButton className="pb-4">
          <div className="modal-title-style-2">
            <span>
              <img src={gift}></img>
            </span>
            <Modal.Title className="text-light"> {translation.congratulationsPepsi} </Modal.Title>
          </div>
        </Modal.Header>

        <Modal.Body className="pt-0">
          <p className="mb-22"> {!isFixedOffer && couponDetails.offerTitle}</p>
          <img
            className="img-modal-1"
            src={(isFixedOffer && staticImage) || couponDetails.merchantLogo}
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
      </Modal>
    </div>
  );
}
