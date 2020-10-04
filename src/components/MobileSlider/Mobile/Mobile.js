import React, { Component, createRef } from 'react'
import styles from './Mobile.module.css'
import './SliderAnimation.css'
import { useState } from 'react'
import { connect } from 'react-redux'
import { render } from '@testing-library/react'

class Mobile extends Component {
    constructor(props) {
        super(props)
        this.itemRef = createRef()
    }

    getSnapshotBeforeUpdate(prevProps) {
        if (prevProps.index !== this.props.index) {
        // list index is changing, prepare to animate
            if (this.itemRef && this.itemRef.current) {
                return this.itemRef.current.getBoundingClientRect().top;
            }
        }
        return null;
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.index !== this.props.index && prevProps.index < this.props.index && snapshot)  {
          if (this.itemRef && this.itemRef.current) {
            let el = this.itemRef.current;

            // ak predtym bol prvok posledny v poli, nastav opacitu 0 aby nebolo vidno ako sa animuje hore
            this.props.hideLast || prevProps.hideLast ? el.style.opacity = '0' : el.style.opacity = '1'
            let newOffset = el.getBoundingClientRect().top;
            let invert = parseInt(snapshot - newOffset);
            el.classList.remove('animate-on-transforms')
            el.style.transform = `translateY(${invert}px)`;
            // Wait for the next frame so we
            // know all the style changes have
            // taken hold.
            requestAnimationFrame(function () {
              // Switch on animations.
              // GO GO GOOOOOO!
              el.classList.add('animate-on-transforms')
              el.style.transform = '';

            });
          }
        } else if (prevProps.index !== this.props.index && prevProps.index > this.props.index && snapshot) {
            if (this.itemRef && this.itemRef.current) {
                let el = this.itemRef.current;


               this.props.hideFirst || prevProps.hideFirst ? el.style.opacity = '0' : el.style.opacity = '1'
                let newOffset = el.getBoundingClientRect().top;
                let invert = parseInt(snapshot - newOffset);
                el.classList.remove('animate-on-transforms')
                el.style.transform = `translateY(${invert}px)`;
                requestAnimationFrame(function () {
                  el.classList.add('animate-on-transforms')
                  el.style.transform = '';
    
                });
            }
        }
      }
    

    onClick = (id, index) => {
        if(this.props.currentlyActive !== index) {
            this.props.toggleActiveClass()
            this.props.clicked(id, index)
        }
    }

    render() {
        const { clicked, mobile, index, isActive, scrollingUp, scrollingDown } = this.props
        let classes = [styles.Product_list_item]
        if(isActive) {
            classes.push(styles.Active)
        }

        return (
            <div ref={this.itemRef}>
                <div className={classes.join(' ')}>
                    <img className={styles.Preview_side_imgs} src={process.env.PUBLIC_URL + mobile.images.displayed}
                    />
                </div>
            </div>
        )
}}

const mapStateToProps = state => {
    return {
        active: state.displayedMobile
    }
}
export default connect(mapStateToProps)(Mobile)
