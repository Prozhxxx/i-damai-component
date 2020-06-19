import React from 'react';
import style from './index.module.css';
import classNames from 'classnames';

export default function FontIcon(props: {icon, fillColor?, strokeColor?, className?, width?, height?}) {
    const {icon, fillColor, strokeColor, className = '', width, height} = props;
    let propStyle = {};
    fillColor && (propStyle['fill'] = fillColor);
    strokeColor && (propStyle['stroke'] = strokeColor);
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

