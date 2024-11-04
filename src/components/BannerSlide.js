import React from 'react';
import { Carousel } from 'react-bootstrap';

const BannerSlider = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/Banner1.jpg"
          alt="First slide"
          style={{ maxHeight: '350px', objectFit: 'cover' }} // adjust maxHeight as needed
        />
        <Carousel.Caption>
          <h3>First Promotion</h3>
          <p>Get the best deals on electronics!</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/Banner2.jpg"
          alt="Second slide"
          style={{ maxHeight: '350px', objectFit: 'cover' }} // adjust maxHeight as needed
        />
        <Carousel.Caption>
          <h3>Second Promotion</h3>
          <p>Exclusive discounts on fashion!</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default BannerSlider;
