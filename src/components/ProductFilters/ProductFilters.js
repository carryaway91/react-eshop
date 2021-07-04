import React, { Component } from 'react';
import styles from './ProductFilters.module.css'

class ProductFilters extends Component {

render() {
        return (
            <div className={styles.ProductFilters}>
                <div style={{ flexFlow: 'column', marginLeft: '1rem'}}>
                <h3 style={{ textAlign: 'left'}}>Brand</h3>
                <div style={{ display: 'flex'}}>
                    <div className={styles.BrandFilter}>
                        <input type="radio" id="all-brands" name="brand" value="all" onChange={this.props.setAllBrands} />
                        <label for="all-brands">All</label>
                    </div>
                    <div className={styles.BrandFilter}>
                        <input type="radio" id="samsung" name="brand" value="Samsung" onChange={this.props.setBrandSearch} />
                        <label for="samsung">Samsung</label>  
                    </div>
                    <div className={styles.BrandFilter}>
                        <input type="radio" id="huawei" name="brand" value="Huawei" onChange={this.props.setBrandSearch}/>
                        <label for="huawei">Huawei</label>
                   </div>
                </div>
                </div>
                <div className={styles.FilterContainer}>
                    <h3 style={{ textAlign:'left'}}>Filter</h3>
                    <select style={{ padding: '0 .2rem' }}name="selector" id="selector" onChange={this.props.onSelect}>
                        <option value="cheapest">Cheapest</option>
                        <option value="most-expensive">Most expensive</option>
                        <option value="top-rated" selected>Top Rated</option>
                    </select>
                </div>
            </div>
        );
    }
}

export default ProductFilters;
