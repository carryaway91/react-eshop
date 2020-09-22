import React, { Component } from 'react';
import RatingStar from './RatingStar/RatingStar'
import styles from './RatingPanel.module.css'

class RatingPanel extends Component {
    
    render() {
        let stars = []
        
        for(let i = 0; i < this.props.rating ; i++) {
            stars.push(<RatingStar fullness={true} />)
        }
        
        if(stars.length < 5) {
            for(let i = 0; i < 5 - this.props.rating; i++ ) {
                stars.push(<RatingStar fullness={false} /> )
         }
        }
        return (
            <div className={styles.RatingPanel}>
                { stars.map(star => star) }
            </div>
        );
    }
}

export default RatingPanel;
