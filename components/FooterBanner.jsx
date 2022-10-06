import Link from 'next/link'
import React, { useState } from 'react'
import { urlFor } from '../lib/client'

const FooterBanner = ({ footerBanner: { slug, image, desc, discount, largeText1, largeText2, saleTime, smallText, midText, buttonText, product, } }) => {
  console.log(slug)
  const [index, setIndex] = useState(0);
  return (
    <div className='footer-banner-container'>
      <div className='banner-desc'>
        <div className='left'>
          <p>{discount}</p>
          <h3>{largeText1}</h3>
          <h3>{largeText2}</h3>
          <p>{saleTime}</p>
        </div>
        <div className='right'>
          <p>{smallText}</p>
          <h3>{midText}</h3>
          <p>{desc}</p>
          <div>
            <Link href={`/product/${slug.current}`}>
              <button type='button'>{buttonText}</button>
            </Link>
          </div>
        </div>
        <picture>
          <img src={urlFor(image && image[index])} alt="headphones" className='footer-banner-image' />
        </picture>
      </div>
    </div>
  )
}

export default FooterBanner