import UnitTool from "@/tool/UnitTool";
import React from "react";
import DateTool from "@/tool/DateTool";
import style from './index.module.scss';
import cn from 'classnames';

export default function (props: {performance, className?, onClick?}) {
    const {performance, onClick = () => {}, className = ''} = props;
    const showStartTime = DateTool.dateStringFromTimeInterval(performance.showStartTime*0.001, 'yyyy.MM.dd');
    const showEndTime = DateTool.dateStringFromTimeInterval(performance.showEndTime*0.001, 'yyyy.MM.dd');
    return (
        <div className={cn(style.performanceListCell, 'flex-x')} key={performance.projectId} onClick={e => onClick(performance)}>
            <div className={cn(style.photoWrapper, 'ellipsis-text')}>
                <img className={style.photo} src={performance.showPic} alt=""/>
            </div>
            <div className={cn(style.contentWrapper, 'flex-y')}>
                <div className={cn(style.name, 'performance-name')}>
                    {performance.projectName}
                </div>
                <div className={style.showDate}><span>{showStartTime}-{showEndTime}</span></div>
                <div className={style.showVenue}>
                    {performance.venueName}
                </div>
                <div className={cn(style.priceLabel, style.price, 'ellipsis-text')}><span
                    className={style.number}>￥{UnitTool.formatPriceByFen(performance.minPrice)}</span>起
                </div>
            </div>
        </div>
    )
}