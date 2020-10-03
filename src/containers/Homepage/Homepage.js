import React, { Component, Fragment } from 'react';
import Button from '../../components/UI/Button/Button'
import styles from './Homepage.module.css'
import { connect } from 'react-redux'
import MobileSlider from '../../components/MobileSlider/MobileSlider'
import * as actionTypes from '../../store/actions/actionTypes'
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
                        <div>
                            <ul className={styles.Product_details_list}>
                                <li className={styles.Product_details_item}>FHD { displayed.details.diagonal } screen</li>
                                <li className={styles.Product_details_item}>{ displayed.external_memory }MB space</li>
                                <li className={styles.Product_details_item}>{ displayed.details.camera} MPX camera</li>
                            </ul>
                            <div className={styles.MoreLinkWrap}>
                                <Link to={`/react-eshop/products/${displayed.id}`} className={styles.MoreLink}>See more!</Link>
                            </div>
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
                                    <img src={displayed.images.displayed} className={styles.Displayed_img}/>
                                </div>

                                <div className={styles.Underlay}>
                                    <div>
                                        <img className={styles.Underlay_pic} src={displayed.images.displayed} />
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
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchProducts: () => dispatch(actionCreators.fetchProducts()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
