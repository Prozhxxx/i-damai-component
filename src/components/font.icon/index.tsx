import React from 'react';
import style from './index.module.css';
import classNames from 'classnames';

export default function FontIcon(props: {icon, fillColor?, className?}) {
    const {icon, fillColor, className = ''} = props;
    const propStyle = fillColor ? {fill: fillColor}: {};
    return (
        <svg color="#ff0000"  className={classNames(style.svg, className)} aria-hidden="true">
            <use xlinkHref={`#${icon}`} style={propStyle}/>
        </svg>
    )
};
