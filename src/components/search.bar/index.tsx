import React from 'react';
import './index.scss';
import NetworkCity from "../../network/NetworkCity";

class SearchBar extends React.Component<any, any>{
    componentDidMount() {
        NetworkCity.cityList().then(data => {
            console.log(data);
        })
    }

    render(){
        return (
            <div className="search-bar flex-middle-x">
                <div className="addr-item flex-center-x">
                    <div className="title">上海</div>
                    <img src="" alt=""/>
                </div>
                <div className="search-item flex-center-x">
                    <input className="input" type="text" placeholder="搜索"/>
                </div>
            </div>
        )
    }
}

export default SearchBar;
