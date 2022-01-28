import React from 'react'
import { Link } from "react-router-dom";

const PagesList = props => {
    return (
        <ul>
            <button><Link onClick={props.click} to="/Dashboard">Dashboard</Link></button>
            <button><Link onClick={props.click} to="/Input">Input</Link></button>
        </ul>
    )
}

export default PagesList
