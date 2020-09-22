import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as actionTypes from '../../store/actions/actionTypes'
import styles from './ProductShow.module.css'
import ColorVariant from '../../components/ColorVariant/ColorVariant';
import MemoryVariant from '../../components/MemoryVariant/MemoryVariant'
import RatingPanel from '../../components/RatingPanel/RatingPanel'
import * as actionCreators from '../../store/actions/index'

class ProductShow extends Component {

    state = {
        mobile: null,
        previewImg: null,
        totalPrice: null,
        colorVariant: null,
        memoryVariant: null,
    }
    componentDidMount = () => {
        if(this.props.products) {
            this.props.findMobile(Number(this.props.match.params.id))
        } else {
            this.props.fetchProduct(this.props.match.params.id)
        }
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({
            mobile: nextProps.mobile,
            previewImg: nextProps.mobile.images.preview_imgs[0],
            totalPrice: nextProps.mobile.pricing,
            colorVariant: Object.keys(nextProps.mobile.details.colors)[0],
            memoryVariant: Object.keys(nextProps.mobile.internal_memories)[0]
            })
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.mobile !== this.props.mobile) {
            this.setState({
                mobile: this.props.mobile,
                previewImg: this.props.mobile.images.preview_imgs[0],
                totalPrice: this.props.mobile.pricing,
                colorVariant: Object.keys(this.props.mobile.details.colors)[0],
                memoryVariant: Object.keys(this.props.mobile.internal_memories)[0]
            })
        }
    }

    setPreviewImage = (img) => {
        this.setState({
            previewImg: img
        })
    }

    renderPrice = (memory) => {
        let price = this.state.mobile.internal_memories[memory]
        this.setState({
            totalPrice: price,
            memoryVariant: memory
        })
    }

    renderColorVariants = () => {
        let colorSchemes = []
        for(let i in this.state.mobile.details.colors) {
            colorSchemes.push({
                desc: i,
                color: this.state.mobile.details.colors[i]
            })
        }

        return colorSchemes
    }

    onSelectVariant = (variant) => {
        this.setState({
            colorVariant: variant
        })
    }

    goToCart = () => {
        this.props.addToCart(this.props.product)
        this.props.history.push('/cart')
    }

    renderMobile = () => {
        if(this.state.mobile) {
            return (
                <div className={styles.Product_display}>
                    <div className={styles.Product_img_wrap}>
                        <div className={styles.Displayed_wrap}>
                            <img className={styles.Displayed} src={this.state.previewImg} />
                        </div>
                        <ul className={styles.Preview}>
                            { this.state.mobile.images.preview_imgs.map(img => (
                                <li className={styles.Preview_img_wrap}>
                                    <img className={styles.Preview_img} src={img} onMouseEnter={() => this.setPreviewImage(img)}/>
                                </li>
                            )) }
                        </ul>
                    </div>

                    <div className={styles.Product_details_wrap}>
                        <ul className={styles.Product_details}>
                            <li className={styles.Product_details_row}><h3 className={styles.Brand}>{ this.state.mobile.brand }</h3></li>
                            <li className={styles.Product_details_row}><h2 className={styles.Model}>{ this.state.mobile.model }</h2></li>
                            <li className={[styles.Product_details_row, styles.Review_item].join(' ')}>
                                <RatingPanel rating={this.state.mobile.stars} />
                            </li>

                            <li className={styles.Product_details_row}>
                                <p className={styles.Desc}>Memory:</p>
                                { Object.keys(this.state.mobile.internal_memories).map(memory => {
                                return <MemoryVariant memory={memory} selectPrice={() => this.renderPrice(memory)} isActive={this.state.memoryVariant === memory}/>
                            }) }
                            </li>
                            <li className={styles.Product_details_row}>
                                    <p className={styles.Desc}>Color: &nbsp; { this.state.colorVariant }</p>
                                    { this.renderColorVariants().map(variant => {
                                        return <ColorVariant variant={variant} selectVariant={() => this.onSelectVariant(variant.desc)} isActive={this.state.colorVariant === variant.desc} />
                                    })}
                                    {/************************************************** */}
                            </li>
                            <li className={[styles.Product_details_row, styles.Price_container].join(' ')}>
                                <span className={styles.Price}>{ this.state.totalPrice } &euro;</span>
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
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        products: state.products.products,
        mobile: state.products.productToShow
    }
}
const mapDispatchToProps = dispatch => {
    return {
        fetchProduct: (id) => dispatch(actionCreators.fetchProduct(id)),
        findMobile: (id) => dispatch({ type:actionTypes.SHOW_MOBILE, id: id }),
        addToCart: (product) => dispatch({ type: actionTypes.ADD_TO_CART, product: product })
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductShow);
