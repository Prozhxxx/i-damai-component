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
    displayBackItem? :boolean
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
            <div className={cn(style.back, 'flex-center-x')} onClick={e => this.onClickGoBack(e)}>
                <FontIcon icon="iconcl-icon-left" width={30} height={30}/>
            </div>
        );
        const {leftItem = goBackItem, rightItem, title = '', displayBackItem = true} = navigator;
        if (displayBackItem){
            return (
                <div className={classnames(style.navigator, 'flex-middle-x')}>
                    {leftItem}
                    {displayBackItem && goBackItem}
                    <div className={cn(style.title)}>{title}</div>
                    {rightItem ?? <div className={style.placeholder}/>}
                </div>
            )
        }
        return null
    }
}

Navigator.contextType = NavigatorContext;

const connector = connect();

export default connector(Navigator);

