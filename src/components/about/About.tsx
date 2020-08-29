import React from 'react';
import './About.scss';
// import aboutArtworkCan from '../../assets/imgs/cover-code.png';
// import aboutArtworkCode from '../../assets/imgs/pepsi-can-about.png';
import extraLogo from '../../assets/imgs/extra-logo.png';
import Breadcrumb from './../common/breadcrumb/Breadcrumb';
// import StepList from './../common/step-list/StepList';
import translation from './../../assets/localization/language';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import AboutTable from './../common/aboutTable/AboutTable';

export default function About() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <div>
      <Breadcrumb activePage="aboutProgram" previousPage="pepsiGifts" header="" text="" />

      {/* <div className={'container-fluid mb-4'}>
        <div className="row">
          <div className="col-md-8">
            <StepList
              title={'howParticipate'}
              steps={['lookCodeCover', 'insertCodeOn', 'whenYouInsertCodeWin']}
            />
          </div>
          <div className="col-md-4 flex-center flex-column">
            <div className="about-artwork mt-4">
              <span className="text-center">
                <img className="" width="100" src={aboutArtworkCode} alt="" />
                <span className="d-block"> {translation.artWorkCan}</span>
              </span>
              <span className="equal">=</span>
              <span className="text-center">
                <img className="" width="70" src={aboutArtworkCan} alt="" />
                <span className="d-block"> {translation.artWorkCode}</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <hr /> */}

      <div className={'container-fluid mb-4'}>
        <h2 className="text-primary mt-4 heading-1 mb-4"> {translation.gifts}</h2>
        <p className="mb-3">
          {translation.aboutItem0_1}{' '}
          <img className="ml-3 align-bottom" height="50" src={extraLogo} alt="" />{' '}
        </p>

        {/* <p>
          <div className="text-style-1">{translation.aboutItem1}</div>
        </p> */}

        {/* <ul className="list-style-disc">
          <li> {translation.aboutItem1_1}</li>
          <li>{translation.aboutItem1_2}</li>
        </ul> */}
        {/* <p className="mb-22">
          <div className="text-style-1">{translation.aboutItem2}</div>
        </p> */}
        {/* <p>
          <div className="text-style-1">{translation.aboutItem3}</div>
        </p> */}
        {/* <ul className="list-style-disc mb-4">
          <li> {translation.aboutItem3_1}</li>
          <li> {translation.aboutItem3_2}</li>
        </ul> */}
        {/* <p>
          <div className="text-style-1">{translation.aboutItem4}</div>
        </p>
        <ul className="list-style-disc mb-4">
          <li>{translation.aboutItem4_1}</li>
          <li>{translation.aboutItem4_2}</li>
          <li>{translation.aboutItem4_3}</li>
          <li>{translation.aboutItem4_4}</li>
          <li>{translation.aboutItem4_5}</li>
        </ul>
        <p className="mb-3">
          <div className="text-style-1">{translation.aboutItem5}</div>
        </p> */}

        <div className={'container-fluidd basicModal'}>
          <div className="row">
            <div className="col-md-8">
              <div className="table-responsive">
                <AboutTable />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <hr /> */}

      <div className={'container-fluid mb-5'}>
        <h2 className="text-primary mt-4 heading-1 mb-4">{translation.aboutItem6}</h2>
        <ul className="list-style-disc">
          <li>{translation.aboutItem6_1}</li>
          <li>{translation.aboutItem6_3}</li>
        </ul>
      </div>

      {/* <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal> */}

      <MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false)} />
    </div>
  );
}

function MyVerticallyCenteredModal(props: any) {
  return (
    <Modal
      className="basicModal"
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title className="text-primary mt-3" id="contained-modal-title-vcenter">
          {translation.aboutPepsiAwards}
        </Modal.Title>
        <p>{translation.aboutPepsiAwardsText}</p>
      </Modal.Header>
      <Modal.Body>
        {/* <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>{translation.cansNumber}</th>
                <th>{translation.gift}</th>
              </tr>
            </thead>
            <tbody>

              <tr>
                <td scope="row">
                  <div className="canGift">
                    <img height="50" className="mr-1" src={pepsiCan} />
                  </div>
                </td>
                <td>
                <img height="60"  src={kfc} />
                  <ul>
                    <li>{translation.giftDetail1}</li>
                    <li>{translation.giftDetail2}</li>
                  </ul>
                </td>
              </tr>        

              <tr>
                <td scope="row">
                  <div className="canGift three">
                      <img height="50" className="mr-1" src={pepsiCan} />
                      <img height="50" className="mr-1" src={pepsiCan} />
                      <img height="50" className="mr-1" src={pepsiCan} />
                  </div>
                </td>
                <td>
                <img height="60"  src={kfc} />
                  <ul>
                    <li>{translation.giftDetail4}</li>
                    <li>{translation.giftDetail5}</li>
                  </ul>
                </td>
              </tr>

              <tr>
                <td scope="row">
                  
                  <div className="canGift sex">
                    <span>
                      <img height="50" className="mr-1" src={pepsiCan} />
                      <img height="50" className="mr-1" src={pepsiCan} />
                      <img height="50" className="mr-1" src={pepsiCan} />
                      <img height="50" className="mr-1" src={pepsiCan} />
                      <img height="50" className="mr-1" src={pepsiCan} />
                      <img height="50" className="mr-1" src={pepsiCan} />
                    </span>
                  </div>
                  
                </td>
                <td>
                  <div>
                    <img height="25" className="mx-2" src={kfc} />
                    <img height="15" className="mx-2" src={osn} />
                    <img height="25" className="mx-2" src={anghami} />
                    <img height="12" className="mx-2" src={shahid} />
                  </div>
                  <ul>
                    <li>{translation.giftDetail6}</li>
                  </ul>
                </td>
              </tr>

              <tr>
                <td scope="row">
                  
                  <div className="canGift ten">
                    <span>
                      <img height="50" src={pepsiCan} />
                      <img height="50" src={pepsiCan} />
                      <img height="50" src={pepsiCan} />
                      <img height="50" src={pepsiCan} />
                      <img height="50" src={pepsiCan} />
                      <img height="50" src={pepsiCan} />
                      <img height="50" src={pepsiCan} />
                      <img height="50" src={pepsiCan} />
                      <img height="50" src={pepsiCan} />
                      <img height="50" src={pepsiCan} />
                    </span>
                  </div>
                </td>
                <td>
                <img height="60"  src={vox} />
                  <ul>
                    <li>{translation.giftDetail7}</li>
                  </ul>
                </td>
              </tr>

              
              
            </tbody>
          </table>
        </div>  */}
      </Modal.Body>
      <Modal.Footer>
        <Button className="mb-4" onClick={props.onHide}>
          {translation.close}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
