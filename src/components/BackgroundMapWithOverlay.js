import React from 'react'
import bgImage from './../images/pattern-bg.png'
import LocationMap from './LocationMap'
import './BackgroundMapWithOverlay.css'

export default function BackgroundMapWithOverlay({ ...props }) {
    return (
        <div {...props} className="backgroundContainer">
            <div className="imgContainer">
                <img src={bgImage}></img>
            </div>
            <div className="locationMapWrapper">
                <LocationMap position={props.location && props.location} />
            </div>

        </div>
    )
}