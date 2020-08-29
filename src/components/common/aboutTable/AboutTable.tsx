import React from 'react';
import translation from '../../../assets/localization/language';
import pepsiCan from '../../../assets/imgs/pepsi-can-sm.png';
import kfc from '../../../assets/imgs/KFC-Table-Logo.jpg';
import shahid from '../../../assets/imgs/shahid-logo.png';
import vox from '../../../assets/imgs/VOX-Table-Logo.png';
import anghami from '../../../assets/imgs/Anghami-Table-Logo.png';
import starz from '../../../assets/imgs/STARZPLAYLOGOENGLISH.png';
export default function AboutTable() {
  return (
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
              <img height="70" className="mr-1" src={pepsiCan} />
            </div>
            <div className="d-flex justify-content-center">
              <span className="round-num">1</span>
            </div>
          </td>
          <td>
            <img className="my-2" height="60" src={kfc} />
            <ul>
              <li>{translation.giftDetail1}</li>
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
            <div className="d-flex justify-content-center">
              <span className="round-num">3</span>
            </div>
          </td>
          <td>
            <img className="my-2" height="60" src={kfc} />
            <ul>
              <li> {translation.aboutItem3_1}</li>
              <li> {translation.aboutItem3_2}</li>
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
            <div className="d-flex justify-content-center">
              <span className="round-num">6</span>
            </div>
          </td>
          <td>
            <div className="my-2">
              <img height="40" className="mx-2" src={kfc} />
              <img height="20" className="mx-2" src={starz} />
              <img height="30" className="mx-2" src={anghami} />
              <img height="20" className="mx-2" src={shahid} />
            </div>
            <ul>
              <li>{translation.aboutItem4_1}</li>
              <li>{translation.aboutItem4_2}</li>
              <li>{translation.aboutItem4_3}</li>
              <li>{translation.aboutItem4_4}</li>
              <li>{translation.aboutItem4_5}</li>
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
            <div className="d-flex justify-content-center">
              <span className="round-num">10</span>
            </div>
          </td>
          <td>
            <img className="my-2" height="60" src={vox} />
            <ul>
              <li>{translation.giftDetail7}</li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
