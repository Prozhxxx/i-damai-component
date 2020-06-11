import React, {ReactNode} from "react";
import style from './index.module.scss';
import classnames from "classnames";
import {connect, ConnectedProps} from "react-redux";
import {NavigatorContext} from '@/util/Context';
class Navigator extends React.Component<ConnectedProps<typeof connector> & {
    leftItem?: ReactNode,
    rightItem?: ReactNode,
    title?: string
}, any>{
    render(){
        const navigator = this.context;
        const {leftItem, rightItem, title = '1'} = navigator;
        if (leftItem || rightItem){
            <div className={classnames(style.navigator, 'flex-middle-x')}>
                <div className={style.left}>{leftItem}</div>
                <div className={style.middle}>{title}</div>
                <div className={style.right}>{rightItem}</div>
            </div>
        }
        return (
            <div className={classnames(style.navigator, 'flex-center-x')}>
                <div className={style.middle}>{title}</div>
            </div>
        )
    }
}

Navigator.contextType = NavigatorContext;

const connector = connect();

export default connector(Navigator);

