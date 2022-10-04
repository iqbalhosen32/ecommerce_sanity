import Link from 'next/link'
import React, {useState} from 'react'
import { urlFor } from '../lib/client'

const FooterBanner = ({ footerBanner: { image, desc, discount, largeText1, largeText2, saleTime, smallText, midText, buttonText, product, } }) => {
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
          <Link href={`/product/${product}`}>
            <button type='button'>{buttonText}</button>
          </Link>
        </div>
        <picture>
          {/* <img src={urlFor(image)} alt={product} className='footer-banner-image' /> */}
          <img src={urlFor(image && image[index])} alt="headphones" className='hero-banner-image' />
        </picture>
      </div>
    </div>
  )
}

export default FooterBanner