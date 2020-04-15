import React from 'react';
import style from './index.module.css';
import classNames from 'classnames';

export default function FontIcon(props: {icon, className?}) {
    const {icon, className = ''} = props;
    return (
        <svg className={classNames(style.svg, className)} aria-hidden="true">
            <use xlinkHref={`#${icon}`}/>
        </svg>
    )
};
