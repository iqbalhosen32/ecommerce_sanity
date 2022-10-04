import React, { useState } from 'react';
import Link from 'next/link';
import { urlFor } from '../lib/client';

const HeroBanner = ({ heroBanner, heroBanner: { slug } }) => {
  const [index, setIndex] = useState(0);
  console.log(heroBanner.slug.current)
  return (
    <div className='hero-banner-container'>
      <div>
        <p className='beats-solo'>{heroBanner.smallText}</p>
        <h3>{heroBanner.midText}</h3>
        <h1>{heroBanner.largeText1}</h1>
        <picture>
          <img src={urlFor(heroBanner.image && heroBanner.image[index])} alt="headphones" className='hero-banner-image' />

        </picture>
        <div>
          <Link href={`/product/${slug.current}`}>
            <button type='button'>{heroBanner.buttonText}</button>
          </Link>
        </div>
        <div className='desc'>
          <h5>Descriptions</h5>
          <p>{heroBanner.desc}</p>
        </div>
      </div>
    </div>
  )
}

export default HeroBanner