import React from 'react'
import ProductFilters from '../ProductFilters/ProductFilters'
import styles from './CartItem.module.css'
import { connect } from 'react-redux'
import * as actionCreators from '../../store/actions/cartAction'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const CartItem = (props) => {

    const [value, setValue] = useState(1)

    useEffect(() =>{
        setValue(props.product.amount)
    }, [])

    const changeProductAmount = (e) => {
        setValue(e.target.value)
        let amount = e.target.value
        props.changeAmount(props.product.id, amount)
    }
    
    return (
        <div className={styles.ItemContainer}>
        <div style={{ display: 'flex', alignItems: 'center'}}>
                <Link to={`/react-shop/products/${props.product.product.id}`} style={{ textDecoration: 'none'}}>
                    <img className={styles.ProductImage} src={ process.env.PUBLIC_URL + props.product.product.images.displayed } />
                </Link>
                <div style={{ marginLeft: '1rem'}}>
                <Link to={`/react-shop/products/${props.product.product.id}`} style={{ textDecoration: 'none', color: 'black'}}>
                    <p className={styles.ProductName}>{ props.product.product.brand + ' ' + props.product.product.model }</p>
                </Link>    
                    <p>{ props.product.color }</p>
                    <p><strong>{ props.product.price } &euro;</strong></p>
                </div>
            </div>
            <div>
                { props.amountable ? <input id="amount" type="number" style={{ width: '40px'}} min="1" value={value} onChange={changeProductAmount} /> 
                    : 
                     <span>Amount: { value }</span>               
                }
                { props.removable && <svg className={styles.Trashcan} onClick={() => props.removeCartItem(props.product.id)} height="20px" fill='#ffc400' viewBox="-40 0 427 427.00131" width="20px" xmlns="http://www.w3.org/2000/svg"><path d="m232.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0"/><path d="m114.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0"/><path d="m28.398438 127.121094v246.378906c0 14.5625 5.339843 28.238281 14.667968 38.050781 9.285156 9.839844 22.207032 15.425781 35.730469 15.449219h189.203125c13.527344-.023438 26.449219-5.609375 35.730469-15.449219 9.328125-9.8125 14.667969-23.488281 14.667969-38.050781v-246.378906c18.542968-4.921875 30.558593-22.835938 28.078124-41.863282-2.484374-19.023437-18.691406-33.253906-37.878906-33.257812h-51.199218v-12.5c.058593-10.511719-4.097657-20.605469-11.539063-28.03125-7.441406-7.421875-17.550781-11.5546875-28.0625-11.46875h-88.796875c-10.511719-.0859375-20.621094 4.046875-28.0625 11.46875-7.441406 7.425781-11.597656 17.519531-11.539062 28.03125v12.5h-51.199219c-19.1875.003906-35.394531 14.234375-37.878907 33.257812-2.480468 19.027344 9.535157 36.941407 28.078126 41.863282zm239.601562 279.878906h-189.203125c-17.097656 0-30.398437-14.6875-30.398437-33.5v-245.5h250v245.5c0 18.8125-13.300782 33.5-30.398438 33.5zm-158.601562-367.5c-.066407-5.207031 1.980468-10.21875 5.675781-13.894531 3.691406-3.675781 8.714843-5.695313 13.925781-5.605469h88.796875c5.210937-.089844 10.234375 1.929688 13.925781 5.605469 3.695313 3.671875 5.742188 8.6875 5.675782 13.894531v12.5h-128zm-71.199219 32.5h270.398437c9.941406 0 18 8.058594 18 18s-8.058594 18-18 18h-270.398437c-9.941407 0-18-8.058594-18-18s8.058593-18 18-18zm0 0"/><path d="m173.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0"/></svg>
                }
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = dispatch => {
    return {
        changeAmount: (product, amount) => dispatch(actionCreators.updateAmount(product, amount))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartItem)
