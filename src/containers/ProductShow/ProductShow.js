import React, { Component } from 'react';
import { connect } from 'react-redux'
import styles from './ProductShow.module.css'
import ColorVariant from '../../components/ColorVariant/ColorVariant';
import MemoryVariant from '../../components/MemoryVariant/MemoryVariant'
import RatingPanel from '../../components/RatingPanel/RatingPanel'
import * as actionCreators from '../../store/actions/index'
import Tabs from '../../components/Tabs/Tabs';

class ProductShow extends Component {

  
    componentDidMount = () => {
        
        if(this.props.mobile) {
            // najdi z reduxu
            this.props.findMobile(Number(this.props.match.params.id))
        } else {
            // fetchni zo servera
            this.props.fetchProduct(this.props.match.params.id - 1)
        }
    }
 

    renderColorVariants = () => {
        let colorSchemes = []
        for(let i in this.props.mobile.details.colors) {
            colorSchemes.push({
                desc: i,
                color: this.props.mobile.details.colors[i]
            })
        }

        return colorSchemes
    }

    goToCart = () => {
        this.props.addToCart(this.props.mobile, this.props.colorVariant, this.props.memoryVariant, this.props.price)
        this.props.history.push('/cart')
    }

    renderMobile = () => {
        if(this.props.mobile) {
            return (
                <div className={styles.Product_display}>
                    <div className={styles.Product_img_wrap}>
                        <div className={styles.Displayed_wrap}>
                            <img className={styles.Displayed} src={this.props.displayed} />
                        </div>
                        <ul className={styles.Preview}>
                            { this.props.mobile.images.preview_imgs.map((img, i) => (
                                <li className={styles.Preview_img_wrap} key={i}>
                                    <img className={styles.Preview_img} src={img} onMouseEnter={() => this.props.changePreviewImg(img)}/>
                                </li>
                            )) }
                        </ul>
                    </div>

                    <div className={styles.Product_details_wrap}>
                        <ul className={styles.Product_details}>
                            <li className={styles.Product_details_row}><h3 className={styles.Brand}>{ this.props.mobile.brand }</h3></li>
                            <li className={styles.Product_details_row}><h2 className={styles.Model}>{ this.props.mobile.model }</h2></li>
                            <li className={[styles.Product_details_row, styles.Review_item].join(' ')}>
                                <RatingPanel rating={this.props.mobile.stars} />
                            </li>

                            <li className={styles.Product_details_row}>
                                <p className={styles.Desc}>Memory:</p>
                                { Object.keys(this.props.mobile.internal_memories).map((memory, i) => {
                                return <MemoryVariant key={i} memory={memory} selectPrice={() => this.props.changeMemory(memory)} isActive={this.props.memoryVariant === memory}/>
                            }) }
                            </li>
                            <li className={styles.Product_details_row}>
                                    <p className={styles.Desc}>Color: &nbsp; { this.props.colorVariant }</p>
                                    { this.renderColorVariants().map(variant => {
                                        return <ColorVariant variant={variant} selectVariant={() => this.props.changeColor(variant.desc)} isActive={this.props.colorVariant === variant.desc} />
                                    })}
                                    {/************************************************** */}
                            </li>
                            <li className={[styles.Product_details_row, styles.Price_container].join(' ')}>
                                <span className={styles.Price}>{ this.props.price } &euro;</span>
                                <button onClick={this.goToCart} className={styles.Cart_link}>Add to cart</button>
                            </li>
                        </ul>
                    </div>
                </div>
            )
        } else {
            return <p>Loading ...</p>
        }
    }
    render() {
        return (
            <div>
                {this.renderMobile()}
                <Tabs />
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        products: state.products.products,
        mobile: state.products.productToShow,
        displayed: state.products.previewImg,
        colorVariant: state.products.colorVariant,
        memoryVariant: state.products.memoryVariant,
        price: state.products.price
    }
}
const mapDispatchToProps = dispatch => {
    return {
        fetchProduct: (id) => dispatch(actionCreators.fetchProduct(id)),
        findMobile: (id) => dispatch(actionCreators.findMobile(id)),
        addToCart: (product, color, memory, price) => dispatch(actionCreators.addToCart(product, color, memory, price)),
        changePreviewImg: (img) => dispatch(actionCreators.changePreviewImg(img)),
        changeMemory: (memory) => dispatch(actionCreators.changeMemory(memory)),
        changeColor: (color) => dispatch(actionCreators.changeColor(color))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductShow);
