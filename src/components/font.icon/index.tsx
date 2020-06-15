import React from 'react';
import style from './index.module.css';
import classNames from 'classnames';

export default function FontIcon(props: {icon, fillColor?, className?, width?, height?}) {
    const {icon, fillColor, className = '', width, height} = props;
    const propStyle = fillColor ? {fill: fillColor}: {};
    const svgStyle = {} as any;
    if (width !== undefined){
        svgStyle.width = width;
    }
    if (height !== undefined){
        svgStyle.height = height;
    }
    return (
        <svg color="#ff0000" style={svgStyle} className={classNames(style.svg, className)} aria-hidden="true">
            <use xlinkHref={`#${icon}`} style={propStyle}/>
        </svg>
    )
};
