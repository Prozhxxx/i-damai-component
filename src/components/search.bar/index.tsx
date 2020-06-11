import React, {ReactNode} from 'react';
import './index.scss';
import FontIcon from "@/components/font.icon";
import {connect, ConnectedProps} from "react-redux";
import cn from "classnames";

class SearchBar extends React.Component<ConnectedProps<typeof connector> & {
    className: string,
    children?: ReactNode
}, any>{
    onClickCity(){
        this.props.showCityLayer();
    }

    render(){
        const {userLocationCity, className} = this.props;
        return (
            <div className={cn('search-bar flex-middle-x', className)}>
                <div className="addr-item flex-center-x" onClick={e => this.onClickCity()}>
                    <div className="title">{userLocationCity.name}</div>
                    <FontIcon className="icon" icon="iconxiala"/>
                </div>
                <div className="search-item flex-center-x">
                    <FontIcon className="icon" icon="iconGroup-"/>
                    <input className="input" type="text" placeholder="搜索"/>
                </div>
            </div>
        )
    }
}

const connector = connect(
    state => ({
        userLocationCity: state['site']['userLocationCity']
    }),
    dispatch => ({
        showCityLayer: () => dispatch({
            type: 'UPDATE_UI_LAYER_CITY_LAYER',
            data: true
        })
    })
);
export default connector(SearchBar);

