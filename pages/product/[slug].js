import React, { useState } from 'react';
import { client, urlFor } from '../../lib/client';

import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';
import Product from './../../components/Product';

import { UseStateContext } from '../../context/StateContext';


const ProductDetais = ({ product, products, bannerProduct }) => {

    const [index, setIndex] = useState(0);

    const { incQty, decQty, qty, onAdd, setShowCart } = UseStateContext();

    const handleBuyNow = () => {
        if (product) {
            onAdd(product, qty)
        } else if (bannerProduct) {
            onAdd(bannerProduct[0], qty)
        }
        setShowCart(true)
    }

    return (
        <div>
            {bannerProduct &&

                <div className='product-detail-container'>
                    <div>
                        <div className="image-container">
                            <picture>
                                <img src={urlFor(bannerProduct.image && bannerProduct.image[index])} alt='' className='product-detail-image' />
                            </picture>
                        </div>
                        <div className='small-images-container'>
                            {
                                bannerProduct.image?.map((item, i) => (
                                    <picture key={i}>
                                        <img src={urlFor(item)} className={i === index ? 'small-image selected-image' : 'small-image'} onMouseEnter={() => setIndex(i)} alt='' />
                                    </picture>
                                ))
                            }
                        </div>
                    </div>
                    <div className="product-detail">
                        <div className="product-detail-desc">
                            <h1>{bannerProduct.name}</h1>
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
                            <p>{bannerProduct.details}</p>
                            <div className='product-price'>

                                <p className='product-price-new price'>${bannerProduct.newPrice}</p>
                                {
                                    bannerProduct.oldPrice && <p className='product-price-old price'>${bannerProduct.oldPrice}</p>
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
                                <button type='button' onClick={() => onAdd(bannerProduct, qty)} className='add-to-cart'>
                                    Add To Cart
                                </button>
                                <button type='button' onClick={handleBuyNow} className='buy-now'>
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {
                <div>

                    {product &&

                        <div className='product-detail-container'>
                            <div>
                                <div className="image-container">
                                    <picture>
                                        <img src={urlFor(product.image && product.image[index])} alt='' className='product-detail-image' />
                                    </picture>
                                </div>
                                <div className='small-images-container'>
                                    {
                                        product.image?.map((item, i) => (
                                            <picture key={i}>
                                                <img src={urlFor(item)} className={i === index ? 'small-image selected-image' : 'small-image'} onMouseEnter={() => setIndex(i)} alt='' />
                                            </picture>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className="product-detail">
                                <div className="product-detail-desc">
                                    <h1>{product.name}</h1>
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
                                    <p>{product.details}</p>
                                    <div className='product-price'>

                                        <p className='product-price-new price'>${product.newPrice}</p>
                                        {
                                            product.oldPrice && <p className='product-price-old price'>${product.oldPrice}</p>
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
                    }
                </div>

            }

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
    const queryBanner = `*[_type == "banner" && slug.current == '${slug}'][0]`;
    const productsQuery = '*[_type == "product"]'
    // const queryBanner = '*[_type == "banner"]'

    const product = await client.fetch(query);
    const products = await client.fetch(productsQuery);
    const bannerProduct = await client.fetch(queryBanner);



    return {
        props: { products, product, bannerProduct }
    }
}

export default ProductDetais; 