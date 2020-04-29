import React from 'react';
import './index.scss';
import FontIcon from "@/components/font.icon";
import {connect} from "react-redux";

class SearchBar extends React.Component<any, any>{
    onClickCity(){
        this.props.showCityLayer();
    }

    render(){
        const {userLocationCity} = this.props;
        return (
            <div className="search-bar flex-middle-x">
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

export default connect(
    state => ({
        userLocationCity: state['site']['userLocationCity']
    }),
    dispatch => ({
        showCityLayer: () => dispatch({
            type: 'UPDATE_UI_LAYER_CITY_LAYER',
            data: true
        })
    })
)(SearchBar);

