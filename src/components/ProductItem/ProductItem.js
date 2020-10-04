import React from 'react'
import styles from './ProductItem.module.css'
import { Link } from 'react-router-dom'
import RatingPanel from '../RatingPanel/RatingPanel'

const ProductItem = (props) => {
    const { product } = props

    
    return (
        <div className={styles.ProductItem}>
            <img src={process.env.PUBLIC_URL + product.images.displayed} className={styles['Product-img']} />
            <div className={styles['Product-info']}>
                <h3 className={styles['Product-brand']}>{ product.brand }</h3>
                <p className={ styles["Product-brand"]}>{ product.model }</p>   
                <RatingPanel rating={product.stars} />
                <p className={styles.Pricing}>{ product.pricing } &euro;</p>

                <Link to={`/products/${product.id}`} className={styles["Info-link"]}>More Info</Link>                
            </div>
        </div>
    )
}

export default ProductItem
