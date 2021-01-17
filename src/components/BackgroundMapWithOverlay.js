import React from 'react'
import bgImage from './../images/pattern-bg.png'
import LocationMap from './LocationMap'
import './BackgroundMapWithOverlay.css'

export default function BackgroundMapWithOverlay({ ...props }) {
    return (
        <div {...props} className="backgroundContainer">
            <div className="imgContainer">
                <img alt={'https://c.pxhere.com/images/ff/d4/0ddf9c419caf04f6a35906db9b2e-1600625.jpg!d'} src={bgImage}></img>
            </div>
            <div className="locationMapWrapper">
                <LocationMap position={props.location && props.location} />
            </div>

        </div>
    )
}