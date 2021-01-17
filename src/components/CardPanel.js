import React, { useState } from 'react'
import "./CardPanel.css";
import Loader from './Loader';
export default function CardPanel({ ipAddress, location, timezone, isp, loading }) {


    return (
        <div className="cardPanelWrapper">
            <div className="cardPanel">
                <div className="cardItem">
                    <div className="cardItemTitle">IP ADDRESS</div>
                    <div className="cardItemElement">{(!ipAddress || loading) ? <Loader /> : ipAddress}</div>
                </div>
                <div className="divider"> </div>
                <div className="cardItem">
                    <div className="cardItemTitle">LOCATION</div>
                    <div className="cardItemElement">{(!location || loading) ? <Loader /> : location}</div>
                </div>
                <div className="divider" />
                <div className="cardItem">
                    <div className="cardItemTitle">TIMEZONE</div>
                    <div className="cardItemElement">{(!timezone || loading) ? <Loader /> : timezone}</div>
                </div>
                <div className="divider" />
                <div className="cardItem">
                    <div className="cardItemTitle">ISP</div>
                    <div className="cardItemElement">{(!isp || loading) ? <Loader /> : isp}</div>
                </div>
            </div>
        </div>
    )


}