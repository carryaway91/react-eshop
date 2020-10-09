import React, { Component } from 'react'
import styles from './MobileSlider.module.css'
import Mobile from './Mobile/Mobile'
import { connect } from 'react-redux'
import * as actionCreators from '../../store/actions/index'

class MobileSlider extends Component {


    // index preview mobilu v slidery kt ma dostat active class
    handleActivateClass = (index) => {
        this.setState({
            activeMobileIndex: index
        })
    }
   
renderProductItems = () => {
        if(this.props.products !== null) {
        return this.props.products.map((p, i) => {
            return <Mobile
                    key={p.id}
                    mobile={p} 
                    index={i}
                    toggleActiveClass={() => this.handleActivateClass(i)}
                    isActive={this.props.activeMobileIndex === i} 
                    currentlyActive={this.props.activeMobileIndex}
                    hideFirst={ p.id === this.props.products[0].id }
                    hideLast={ p.id === this.props.products[this.props.products.length - 1].id}
                />
            
        })
    }
    }

    render() {
        return (
            <div className={styles.Slider}>
                <svg onClick={() => this.props.slideUp(this.props.products[this.props.setActiveIndex - 1].id)} className={styles.Arrow} viewBox="0 0 256 256" width="45" >
                <g>
                    <g>
                        <polygon points="128,48.907 0,176.907 30.187,207.093 128,109.28 225.813,207.093 256,176.907"/>
                    </g>
                    </g>
                </svg>
                
                <div className={styles.Product_list}>
                    <ul className={styles.Product_list_wrap}>
                        { this.renderProductItems() }
                    </ul>
                </div>
                <svg onClick={() => this.props.slideDown(this.props.products[this.props.setActiveIndex + 1].id)} viewBox="0 0 256 256" width="45" className={styles.Arrow}>
                <g>
                    <g>
                        <polygon points="225.813,48.907 128,146.72 30.187,48.907 0,79.093 128,207.093 256,79.093"/>
                    </g>
                </g>
                </svg>


            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        products: state.slider.productsForSlider,
        displayed: state.products.displayedMobile,
        activeMobileIndex: state.slider.activeMobileIndex,
        setActiveIndex: state.slider.setActiveIndex
    }
}

const mapDispatchToProps = dispatch => {
    return {
        slideUp: (id) => dispatch(actionCreators.onClickUp(id)),
        slideDown: (id) => dispatch(actionCreators.onClickDown(id))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(MobileSlider)
