import React, { FC } from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import styles from './ProductSlideshow.module.css';

interface Props {
  images: string[]
}

export const ProductSlideshow: FC<Props> = ({ images }) => (
  <Slide
    duration={7000}
    easing="ease"
    indicators
    prevArrow={(
      <div style={{ width: '30px', marginRight: '-30px' }}>
        <IconButton><ArrowBackIosNew /></IconButton>
      </div>
    )}
    nextArrow={(
      <div style={{ width: '30px', marginLeft: '-40px' }}>
        <IconButton><ArrowForwardIos /></IconButton>
      </div>
    )}
  >
    {
      images.map((image) => {
        const url = `/products/${image}`;
        return (
          <div className={styles['each-slide']} key={image}>
            <div style={{
              backgroundImage: `url(${url})`,
              backgroundSize: 'cover',
            }}
            />
          </div>
        );
      })
    }
  </Slide>
);

export default ProductSlideshow;
