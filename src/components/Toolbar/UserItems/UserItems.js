import React from 'react'
import { Link } from 'react-router-dom'
import styles from './UserItem.module.css'
import { connect } from 'react-redux'
import { useEffect } from 'react'
import * as actionCreators from '../../../store/actions/index'
const UserItems = (props) => {

    useEffect(() => {
        props.loadCartItems()
    }, [])

    const renderCartLength = () => {
        if(props.cartLength.length > 0) {
            return <p className={styles.CartNotification}>{ props.cartLength.length }</p>
        } else {
            return null
        }
    }
    return (
        <div style={{ width: '35px'}}>

        <Link to="/cart" className={styles.Cart}>
            <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px"
                viewBox="0 0 512 512" fill="#ffc400">
            <g>
                <g>
                    <path d="M509.867,89.6c-2.133-2.133-4.267-4.267-8.533-4.267H96L85.333,29.867c0-4.267-6.4-8.533-10.667-8.533h-64
                        C4.267,21.333,0,25.6,0,32c0,6.4,4.267,10.667,10.667,10.667h55.467l51.2,260.267c6.4,34.133,38.4,59.733,72.533,59.733H435.2
                        c6.4,0,10.667-4.267,10.667-10.667c0-6.4-4.267-10.667-10.667-10.667H192c-17.067,0-34.133-8.533-42.667-23.467L460.8,275.2
                        c4.267,0,8.533-4.267,8.533-8.533L512,96C512,96,512,91.733,509.867,89.6z M450.133,256l-311.467,40.533l-38.4-192H486.4
                        L450.133,256z"/>
                </g>
            </g>
            <g>
                <g>
                    <path d="M181.333,384C151.467,384,128,407.467,128,437.333c0,29.867,23.467,53.333,53.333,53.333
                        c29.867,0,53.333-23.467,53.333-53.333C234.667,407.467,211.2,384,181.333,384z M181.333,469.333c-17.067,0-32-14.934-32-32
                        s14.933-32,32-32c17.067,0,32,14.934,32,32S198.4,469.333,181.333,469.333z"/>
                </g>
            </g>
            <g>
                <g>
                    <path d="M394.667,384c-29.867,0-53.333,23.467-53.333,53.333c0,29.867,23.467,53.333,53.333,53.333
                        c29.867,0,53.333-23.467,53.333-53.333C448,407.467,424.533,384,394.667,384z M394.667,469.333c-17.067,0-32-14.934-32-32
                        s14.933-32,32-32c17.067,0,32,14.934,32,32S411.733,469.333,394.667,469.333z"/>
                </g>
                </g>
            </svg>
            { renderCartLength() }
        </Link>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        cartLength: state.cart.cart
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadCartItems: () => dispatch(actionCreators.loadCartItems())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserItems)
