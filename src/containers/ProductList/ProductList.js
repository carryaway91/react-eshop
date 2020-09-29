import React, { Component } from 'react';
import { connect } from 'react-redux'
import styles from './ProductList.module.css'
import * as actionTypes from '../../store/actions/actionTypes'

import ProductItem from '../../components/ProductItem/ProductItem'
import ProductFilters from '../../components/ProductFilters/ProductFilters'

import * as actionCreators from '../../store/actions/index'
class ProductList extends Component {
    
    state = { 
        filtering: 'top-rated'
    }

    componentDidMount = () => {

        this.props.fetchProducts()
        //this.props.setFilteredProducts()
        //this.props.showTopRated()
    }

    componentDidUpdate = (prevProps, prevState) => {
       
    }
    renderProductList = () => {
        if(this.props.filteredProducts) {

        return this.props.filteredProducts.map(product => (
            <ProductItem key={product.id}
            product={product} />
        ))
        } else {
            return <p>Loading ...</p>
        }
    }

    // po zaskrtnuti prida mena mobilov na vyhladavanie do pola
    handleSearchByBrand = e => {
        const value = e.target.value
        if(e.target.checked) {
            this.props.addBrand(value)
            this.handleSelectFiltering()
        }
        if(!e.target.checked) {
            this.props.removeBrand(value)
        }
    }

    handleShowAllBrands = e => {
        if(e.target.checked) {  
            this.props.showAllBrands()
            this.handleSelectFiltering()
        }
    }

    // po vybrani znacky aby sa odfiltrovali moznosti podla selectu
    handleSelectFiltering = () => {
        switch(this.state.filtering) {
            case 'top-rated' : 
                this.props.showTopRated()
                break
            case 'cheapest' :
                this.props.showCheapest()
                break
            case 'most-expensive' :
                this.props.showMostExpensive()
                break
        }
    }
    
    handleSelector = (e) => {
        console.log(e)
        if( e.target.value === 'cheapest') {
            this.props.showCheapest()
            this.setState({
                filtering: e.target.value
            })
        }

        if( e.target.value === 'most-expensive') {
            this.props.showMostExpensive()
            this.setState({
                filtering: e.target.value
            })
        }

        if( e.target.value === 'top-rated') {
            this.props.showTopRated()
            this.setState({
                filtering: e.target.value
            })
        }
    }

    render() {
        return (
            <div className={styles.ProductList}>
                <ProductFilters setBrandSearch={this.handleSearchByBrand} 
                setAllBrands={this.handleShowAllBrands}
                onSelect={this.handleSelector}
                />
                { this.renderProductList() }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        products: state.products.products,
        filteredProducts: state.products.filteredProducts
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchProducts: () => dispatch(actionCreators.fetchProducts()),
        setFilteredProducts: () => dispatch(actionCreators.setFilteredProducts),
        addBrand: (brand) => dispatch(actionCreators.addFilteredBrand(brand)),
        removeBrand: (brand) => dispatch(actionCreators.removeFilteredBrand(brand)),
        showAllBrands: () => dispatch(actionCreators.showAllBrands()),
        showCheapest: () => dispatch(actionCreators.showCheapest()),
        showMostExpensive: () => dispatch(actionCreators.showMostExpensive()),
        showTopRated: () => dispatch(actionCreators.showTopRated())

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
