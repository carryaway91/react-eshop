import React, { Fragment } from 'react'
import { useState } from 'react'
import styles from './Tabs.module.css'

import DetailTab from './DetailTab'

import Tab from './Tab/Tab'

const Tabs = () => {
    const [tabs, setTabs] = useState(['Details'])
    const [activeIndex, setActiveIndex] = useState(0)
    const handleActivateTab = (i) => {
        setActiveIndex(i)
    }

    const renderTabs = () => {
        return tabs && (tabs.map((tab, i) => (
            <Tab tabName={tab} key={i} index={i} onActivate={handleActivateTab}
            active={i == activeIndex}/>
        )))
    }
    return (
        <Fragment>
            <div className={styles.Tabs}>
                { renderTabs()}
            </div>
            { activeIndex === 0 ? (
                <DetailTab />
            ) : null }

        </Fragment>
    )
}

export default Tabs
