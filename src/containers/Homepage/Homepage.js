import React, { Component, Fragment } from 'react';
import Button from '../../components/UI/Button/Button'
import styles from './Homepage.module.css'
import { connect } from 'react-redux'
import MobileSlider from '../../components/MobileSlider/MobileSlider'
import './Animations.css'
import * as actionCreators from '../../store/actions/index'

import { CSSTransition } from 'react-transition-group'
import { Link } from 'react-router-dom';

class Homepage extends Component {

    componentDidMount = () => {
        this.props.fetchProducts()
    }
    
    
    render() {
        const { displayed, show } = this.props

        return (
            <div className={styles.Homepage}>
                { displayed && (
                    <Fragment>
                <div className={styles.Details}>
                    <CSSTransition 
                        in={show}
                        timeout={500}
                        classNames="Appear"
                        unmountOnExit
                    >
                    
                        <h2 className={styles.Product_name}>
                            { displayed.brand } <br />
                            <span className={styles.Product_name_model}>{ displayed.model }</span>
                        </h2>
                    </CSSTransition>
                    <CSSTransition in={show}
                        timeout={500}
                        classNames="slide-down"
                        unmountOnExit
                    >
                        <div className={styles.MobileSlider}>
                            <ul className={styles.Product_details_list}>
                                <li className={styles.Product_details_item}>FHD { displayed.details.diagonal } screen</li>
                                <li className={styles.Product_details_item}>{ displayed.external_memory }MB space</li>
                                <li className={styles.Product_details_item}>{ displayed.details.camera} MPX camera</li>
                            </ul>
                            <svg onClick={() => this.props.slideUp(this.props.products[this.props.setActiveIndex - 1].id)} version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" width="30px"
                                    className={styles.LeftArrow}
                                    viewBox="0 0 256 256">
                                <g>
                                    <g>
                                        <polygon points="207.093,30.187 176.907,0 48.907,128 176.907,256 207.093,225.813 109.28,128 		"/>
                                    </g>
                                </g>

                                </svg>

                            <div className={styles.MoreLinkWrap}>
                                <Link to={`/products/${displayed.id}`} className={styles.MoreLink}>See more!</Link>
                            </div>
                            <svg onClick={() => this.props.slideDown(this.props.products[this.props.setActiveIndex + 1].id)} version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 492.004 492.004" width='30px' className={styles.RightArrow} >
                                <g>
                                    <g>
                                        <path d="M382.678,226.804L163.73,7.86C158.666,2.792,151.906,0,144.698,0s-13.968,2.792-19.032,7.86l-16.124,16.12
                                            c-10.492,10.504-10.492,27.576,0,38.064L293.398,245.9l-184.06,184.06c-5.064,5.068-7.86,11.824-7.86,19.028
                                            c0,7.212,2.796,13.968,7.86,19.04l16.124,16.116c5.068,5.068,11.824,7.86,19.032,7.86s13.968-2.792,19.032-7.86L382.678,265
                                            c5.076-5.084,7.864-11.872,7.848-19.088C390.542,238.668,387.754,231.884,382.678,226.804z"/>
                                    </g>
                                    </g>
                                </svg>

                        </div>
                    </CSSTransition>
                </div>
                
                <div className={styles.Display}>
                    <div className={styles.Display_img}>
                    <CSSTransition in={show}
                        timeout={500}
                        classNames="disappear"
                        unmountOnExit
                        >
                            <div>
                                <div className={styles.Displayed}>
                                    <img src={process.env.PUBLIC_URL + displayed.images.displayed} className={styles.Displayed_img}/>
                                </div>

                                <div className={styles.Underlay}>
                                    <div>
                                        <img className={styles.Underlay_pic} src={ process.env.PUBLIC_URL + displayed.images.displayed} />
                                    </div>
                                </div>
                            </div>
                        </CSSTransition>
                    </div>

                    <MobileSlider onChangeDisplayImg={this.handleChangeDisplayImg} 
                        toggleAnimation={this.handleAnimationTimout}
                    />
                </div>
                </Fragment>
                )}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        show: state.products.show,
        displayed: state.products.displayedMobile,
        products: state.slider.productsForSlider,
        setActiveIndex: state.slider.setActiveIndex
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchProducts: () => dispatch(actionCreators.fetchProducts()),
        slideUp: (id) => dispatch(actionCreators.onClickUp(id)),
        slideDown: (id) => dispatch(actionCreators.onClickDown(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
