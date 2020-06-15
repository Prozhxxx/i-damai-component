import React from "react";
import cn from 'classnames';
import FontIcon from "@/components/font.icon";
import style from './index.module.scss';

class BuyerCell extends React.Component<{
    buyer: BuyerModel,
    className?: string
}, any>{

    coverString(targetString, edgeCount, options={}){
        const {isMiddle, isHemi, cover} = {
            cover: '*',
            isHemi: false,
            isMiddle: true,
            ...options
        };
        let covers = '';
        if (isMiddle){
            covers = cover.repeat(targetString.length - (isHemi ? 1 : 2) * edgeCount)
            return `${targetString.slice(0, edgeCount)}${covers}${targetString.slice(targetString.length - edgeCount)}`
        } else {
            covers = cover.repeat(edgeCount)
            return `${covers}${targetString.slice(edgeCount, targetString.length - (isHemi ? 0 : 1) * edgeCount)}${isHemi?'':covers}`
        }
    }
    
    render(){
        const {buyer, className} = this.props;

        return (
            <div className={cn(style.buyerCell, 'flex-middle-x', className)}>
                <div className={cn(style.left)}>
                    <div className={cn(style.name)}>
                        {this.coverString(buyer.userName, 1, {isMiddle: false, isHemi: true})}
                    </div>
                    <div className={cn(style.cardNo)}>
                        {this.coverString(buyer.cardNo, 3)}
                    </div>
                </div>
                <div className={cn('right', 'flex-middle-x')}>
                    <FontIcon icon="iconbianji" width={20} height={20}/>
                </div>
            </div>
        )
    }
}

export default BuyerCell;
