import React from 'react'
import "./Container.css"

const Container = (props) => {
    return (
        <div className='container-fluid main-con'>
            {props.children}
        </div>
    )
}

export default Container