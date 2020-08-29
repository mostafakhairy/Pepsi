import React, { Fragment } from 'react';
import Classes from './Slider.module.scss';
import Carousel from 'react-bootstrap/Carousel';
import slide1 from '../../../assets/imgs/banner/banner-1.jpg';
import slide2 from '../../../assets/imgs/banner/banner-2.jpg';
import slide3 from '../../../assets/imgs/banner/banner-3.jpg';
import slide4 from '../../../assets/imgs/banner/banner-4.jpg';
import slide5 from '../../../assets/imgs/banner/banner-5.jpg';
import slide6 from '../../../assets/imgs/banner/banner-6.jpg';
import slide7 from '../../../assets/imgs/banner/banner-7.jpg';

import slide1sm from '../../../assets/imgs/banner/sm/banner-1.jpg';
import slide2sm from '../../../assets/imgs/banner/sm/banner-2.jpg';
import slide3sm from '../../../assets/imgs/banner/sm/banner-3.jpg';
import slide4sm from '../../../assets/imgs/banner/sm/banner-4.jpg';
import slide5sm from '../../../assets/imgs/banner/sm/banner-5.jpg';
import slide6sm from '../../../assets/imgs/banner/sm/banner-6.jpg';
import slide7sm from '../../../assets/imgs/banner/sm/banner-7.jpg';

import slide1En from '../../../assets/imgs/banner/en/banner-1.jpg';
import slide2En from '../../../assets/imgs/banner/en/banner-2.jpg';
import slide3En from '../../../assets/imgs/banner/en/banner-3.jpg';
import slide4En from '../../../assets/imgs/banner/en/banner-4.jpg';
import slide5En from '../../../assets/imgs/banner/en/banner-5.jpg';
import slide6En from '../../../assets/imgs/banner/en/banner-6.jpg';
import slide7En from '../../../assets/imgs/banner/en/banner-7.jpg';

import slide1SmEn from '../../../assets/imgs/banner/en/sm/banner-1.jpg';
import slide2SmEn from '../../../assets/imgs/banner/en/sm/banner-2.jpg';
import slide3SmEn from '../../../assets/imgs/banner/en/sm/banner-3.jpg';
import slide4SmEn from '../../../assets/imgs/banner/en/sm/banner-4.jpg';
import slide5SmEn from '../../../assets/imgs/banner/en/sm/banner-5.jpg';
import slide6SmEn from '../../../assets/imgs/banner/en/sm/banner-6.jpg';
import slide7SmEn from '../../../assets/imgs/banner/en/sm/banner-7.jpg';


export default function Slider() {
  return (
    <div className={Classes.homeCarousel}>
      <Carousel>
        <Carousel.Item>
          <img className="show-rtl d-none d-sm-block w-100" src={slide1} alt="slide 1" />
          <img className="show-rtl-sm d-block d-sm-none w-100" src={slide1sm} alt="slide 1" />

          <img className="show-ltr d-none d-sm-block w-100" src={slide1En} alt="slide 1" />
          <img className="show-ltr-sm d-block d-sm-none w-100" src={slide1SmEn} alt="slide 1" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="show-rtl d-none d-sm-block w-100" src={slide2} alt="slide 2" />
          <img className="show-rtl-sm d-block d-sm-none w-100" src={slide2sm} alt="slide 2" />

          <img className="show-ltr d-none d-sm-block w-100" src={slide2En} alt="slide 2" />
          <img className="show-ltr-sm d-block d-sm-none w-100" src={slide2SmEn} alt="slide 2" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="show-rtl d-none d-sm-block w-100" src={slide3} alt="slide 3" />
          <img className="show-rtl-sm d-block d-sm-none w-100" src={slide3sm} alt="slide 3" />

          <img className="show-ltr d-none d-sm-block w-100" src={slide3En} alt="slide 3" />
          <img className="show-ltr-sm d-block d-sm-none w-100" src={slide3SmEn} alt="slide 3" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="show-rtl d-none d-sm-block w-100" src={slide4} alt="slide 4" />
          <img className="show-rtl-sm d-block d-sm-none w-100" src={slide4sm} alt="slide 4" />

          <img className="show-ltr d-none d-sm-block w-100" src={slide4En} alt="slide 4" />
          <img className="show-ltr-sm d-block d-sm-none w-100" src={slide4SmEn} alt="slide 4" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="show-rtl d-none d-sm-block w-100" src={slide5} alt="slide 5" />
          <img className="show-rtl-sm d-block d-sm-none w-100" src={slide5sm} alt="slide 5" />

          <img className="show-ltr d-none d-sm-block w-100" src={slide5En} alt="slide 5" />
          <img className="show-ltr-sm d-block d-sm-none w-100" src={slide5SmEn} alt="slide 5" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="show-rtl d-none d-sm-block w-100" src={slide6} alt="slide 6" />
          <img className="show-rtl-sm d-block d-sm-none w-100" src={slide6sm} alt="slide 6" />

          <img className="show-ltr d-none d-sm-block w-100" src={slide6En} alt="slide 6" />
          <img className="show-ltr-sm d-block d-sm-none w-100" src={slide6SmEn} alt="slide 6" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="show-rtl d-none d-sm-block w-100" src={slide7} alt="slide 7" />
          <img className="show-rtl-sm d-block d-sm-none w-100" src={slide7sm} alt="slide 7" />

          <img className="show-ltr d-none d-sm-block w-100" src={slide7En} alt="slide 7" />
          <img className="show-ltr-sm d-block d-sm-none w-100" src={slide7SmEn} alt="slide 7" />
        </Carousel.Item>
      </Carousel>
    </div>
  );
}
