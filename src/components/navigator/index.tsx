import React, {ReactNode} from "react";
import style from './index.module.scss';
import classnames from "classnames";
import {connect, ConnectedProps} from "react-redux";
import {NavigatorContext} from '@/util/Context';
import FontIcon from "@/components/font.icon";
import {Router} from "react-router";
import cn from "classnames";
import {History} from "history";


class Navigator extends React.Component<ConnectedProps<typeof connector> & {
    history: History
    leftItem?: ReactNode,
    rightItem?: ReactNode,
    title?: string
}, any>{

    onClickGoBack(e){
        const {history} = this.props;
        history.goBack();
    }

    render(){
        const navigator = this.context;
        const goBackItem = (
            <div className={cn(style.left, 'flex-center-x')} onClick={e => this.onClickGoBack(e)}>
                <FontIcon icon="iconcl-icon-left" width={30} height={30}/>
            </div>
        );
        const {leftItem = goBackItem, rightItem, title = '1'} = navigator;
        if (leftItem || rightItem){
            return (
                <div className={classnames(style.navigator, 'flex-middle-x')}>
                    {leftItem}
                    <div className={style.middle}>{title}</div>
                    {rightItem}
                </div>
            )
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

