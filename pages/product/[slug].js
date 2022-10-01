import React, { useState } from 'react';
import { client, urlFor } from '../../lib/client';

import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';
import Product from './../../components/Product';

import { UseStateContext } from '../../context/StateContext';


const ProductDetais = ({ product, products }) => {
    const { image, name, details, newPrice, oldPrice } = product;

    const [index, setIndex] = useState(0);

    const { incQty, decQty, qty, onAdd, setShowCart } = UseStateContext();

    const handleBuyNow = () => {
        onAdd(product, qty)

        setShowCart(true)
    }

    return (
        <div>
            <div className='product-detail-container'>
                <div>
                    <div className="image-container">
                        <picture>
                            <img src={urlFor(image && image[index])} alt='' className='product-detail-image' />

                        </picture>
                    </div>
                    <div className='small-images-container'>
                        {
                            image?.map((item, i) => (
                                <picture key={i}>
                                    <img src={urlFor(item)} className={i === index ? 'small-image selected-image' : 'small-image'} onMouseEnter={() => setIndex(i)} alt='' />
                                </picture>
                            ))
                        }
                    </div>
                </div>
                <div className="product-detail">
                    <div className="product-detail-desc">
                        <h1>{name}</h1>
                        <div className="reviews">
                            <div>
                                <AiFillStar />
                                <AiFillStar />
                                <AiFillStar />
                                <AiFillStar />
                                <AiOutlineStar />
                            </div>
                            <p>
                                (20)
                            </p>
                        </div>
                        <h4>Details: </h4>
                        <p>{details}</p>
                        <div className='product-price'>

                            <p className='product-price-new price'>${newPrice}</p>
                            {
                                oldPrice && <p className='product-price-old price'>${oldPrice}</p>
                            }
                        </div>
                        <div className='quantity'>
                            <h3>Quantity:</h3>
                            <p className='quantity-desc'>
                                <span className='minus' onClick={decQty}><AiOutlineMinus /></span>
                                <span className='num'>{qty}</span>
                                <span className='plus' onClick={incQty}><AiOutlinePlus /></span>
                            </p>
                        </div>
                        <div className='buttons'>
                            <button type='button' onClick={() => onAdd(product, qty)} className='add-to-cart'>
                                Add To Cart
                            </button>
                            <button type='button' onClick={handleBuyNow} className='buy-now'>
                                Buy Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='maylike-products-wrapper'>
                <h2>You may also like</h2>
                <div className='marquee'>
                    <div className='maylike-products-container track'>
                        {
                            products.map((item) => (
                                <Product key={item._id} product={item} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export const getStaticPaths = async () => {
    const query = `*[_type == "product"] {
      slug {
        current
      }
    }
    `;

    const products = await client.fetch(query);

    const paths = products.map((product) => ({
        params: {
            slug: product.slug.current
        }
    }));

    return {
        paths,
        fallback: 'blocking'
    }
}

export const getStaticProps = async ({ params: { slug } }) => {
    const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
    const productsQuery = '*[_type == "product"]'

    const product = await client.fetch(query);
    const products = await client.fetch(productsQuery);


    return {
        props: { products, product }
    }
}

export default ProductDetais; 