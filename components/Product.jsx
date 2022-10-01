import Link from 'next/link'
import React from 'react'
import { urlFor } from '../lib/client'

const Product = ({ product: { name, oldPrice, newPrice, slug, image } }) => {
  console.log(oldPrice)
  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className='product-card'>
          <div className='marks'>
            {
              oldPrice && <span className='mark'>Save: {oldPrice - newPrice}$</span>
            }
          </div>
          <div>
            <picture>
              <img
                src={urlFor(image && image[0])}
                alt={name}
                width={250}
                height={250}
                className='product-image'
              />
            </picture>
            <p className='product-name'>{name}</p>
            <div className='product-price'>

              <p className='product-price-new'>${newPrice}</p>
              {
                oldPrice && <p className='product-price-old'>${oldPrice}</p>
              }
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default Product