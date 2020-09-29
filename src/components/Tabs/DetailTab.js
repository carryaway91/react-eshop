import React from 'react'
import { connect } from 'react-redux'
import withTabClass from '../../HOC/withTabClass/withTabClass'
import styles from './DetailTab.module.css'

const DetailTab = ({ details }) => {
    return (
    <div>
        {details && (
            <table className={styles.ContentTable}>
                <tbody>
                <tr>
                    <td><strong>Operating system</strong></td>
                    <td>{ details.details.OS}</td>
                </tr>
                <tr>
                    <td><strong>Processor</strong></td>
                    <td>{ details.details.processor }</td>
                </tr>
                <tr>
                    <td><strong>Ram</strong></td>
                    <td>{ details.details.RAM}</td>
                </tr>
                <tr>
                    <td><strong>Battery</strong></td>
                    <td>{ details.details.battery}</td>
                </tr>
                <tr>
                    <td><strong>Size</strong></td>
                    <td>{ details.details.size.height } x { details.details.size.width } x { details.details.size.thick }</td>
                </tr>
                <tr>
                    <td><strong>Diagonal</strong></td>
                    <td>{ details.details.diagonal}</td>
                </tr>
                <tr>
                    <td><strong>Resolution</strong></td>
                    <td>{ details.details.resolution}</td>
                </tr>
                <tr>
                    <td><strong>Weight</strong></td>
                    <td>{ details.details.weight}</td>
                </tr>
                </tbody>
            </table>
        )}
        
    </div>
    )
}

const mapStateToProps = state => {
    return {
        details: state.products.productToShow
    }
}
export default withTabClass(connect(mapStateToProps)(DetailTab))
