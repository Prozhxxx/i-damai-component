import React from 'react';
import './index.scss';
import FontIcon from "@/components/font.icon";
import {connect} from "react-redux";

class SearchBar extends React.Component<any, any>{
    render(){
        const {userLocationCity} = this.props;
        return (
            <div className="search-bar flex-middle-x">
                <div className="addr-item flex-center-x">
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
        userLocationCity: state['userLocationCity']
    })
)(SearchBar);
