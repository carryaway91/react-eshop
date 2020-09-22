import React, { Component } from 'react'
import styles from './MobileSlider.module.css'
import Mobile from './Mobile/Mobile'
import * as actionTypes from '../../store/actions/actionTypes'
import { connect } from 'react-redux'
import { throttle } from 'lodash'
import * as actionCreators from '../../store/actions/index'

class MobileSlider extends Component {
    
    state = {
        activeMobileIndex: 3,   // aktivny mobil v slidery
        setActiveIndex: 3,
        productArray: [],
    }

    componentWillMount = () => {
    }

    componentDidMount = () => {
        this.setState({
            productArray: this.props.products
        })
    }
   
    // po kliknutu na sipky v slidery
    onClickUp = throttle(() => {
        this.slideUp()
        if(this.state.setActiveIndex > 0 ) {
            this.setState(prevState => {
                return {
                    setActiveIndex: prevState.setActiveIndex - 1,
                }
            })
            this.props.onChangeDisplayImg(this.props.products[this.state.setActiveIndex - 1].id, this.state.setActiveIndex -1 )
            this.props.toggleAnimation()    // spusti animaciu display mobilu
        } else {
            this.setState(prevState => { return { setActiveIndex: this.props.products.length - 1 }})
            this.props.onChangeDisplayImg(this.props.products[this.props.products.length - 1].id, this.state.setActiveIndex )
            this.props.toggleAnimation()
        }

    }, 100)
    
    onClickDown = () => {
        this.slideDown()
        if(this.state.setActiveIndex + 1 < this.props.products.length) {
            this.setState(prevState => {
                return {
                    setActiveIndex: prevState.setActiveIndex + 1
                }
            })
            this.props.onChangeDisplayImg(this.props.products[this.state.setActiveIndex + 1].id, this.state.setActiveIndex + 1)
            this.props.toggleAnimation()

        } else {
            this.setState(prevState => {
                return {
                    setActiveIndex: prevState.setActiveIndex = 0
                }
            })
            this.props.onChangeDisplayImg(this.props.products[0].id, this.state.setActiveIndex)
            this.props.toggleAnimation()
        } 
    }

    // index preview mobilu v slidery kt ma dostat active class
    handleActivateClass = (index) => {
        this.setState({
            activeMobileIndex: index
        })
    }

    // sliding animacie

    slideUp = () => {
        const mobiles = this.state.productArray.slice()
        mobiles.unshift(mobiles.pop())
        this.setState({
            productArray: mobiles
        })
    }

    slideDown = () => {
        const mobiles = this.state.productArray.slice()
        mobiles.push(mobiles.shift())
        this.setState({
            productArray: mobiles
        })
    }

    renderProductItems = () => {
        if(this.state.productArray) {

        return this.state.productArray.map((p, i) => {
            return <Mobile
                    key={p.id}
                    mobile={p} 
                    index={i}
                    toggleActiveClass={() => this.handleActivateClass(i)}
                    isActive={this.state.activeMobileIndex === i} 
                    currentlyActive={this.state.activeMobileIndex}
                    hideFirst={ p.id === this.state.productArray[0].id }
                    hideLast={ p.id === this.state.productArray[this.state.productArray.length - 1].id}
                />
            
        })
    }
    }

    render() {
        return (
            <div className={styles.Slider}>
                <svg onClick={this.onClickUp} className={styles.Arrow} viewBox="0 0 256 256" width="45" >
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
                <svg onClick={this.onClickDown} viewBox="0 0 256 256" width="45" className={styles.Arrow}>
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
        products: state.products.productsForSlider,
        displayed: state.products.displayedMobile
    }
}

const mapDispatchToProps = dispatch => {
    return {
        afterSlidingUp: () => dispatch({ type: actionTypes.SLIDE_UP }),
        afterSlidingDown: () => dispatch({ type: actionTypes.SLIDE_DOWN }),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(MobileSlider)
