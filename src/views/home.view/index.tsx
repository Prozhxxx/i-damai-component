import React from 'react';
import SearchBar from "../../components/search.bar";
// import Swiper from "../../components/swiper";
import MenuItems from "../../components/menu.items"

class Index extends React.Component<any, any>{
    renderHotList(){
        return (
            <div className="hot-item">
                <img className="photo" src="" alt=""/>
            </div>
        )
    }
    render(){
        return (
            <div className="home-view">
                <SearchBar>
                </SearchBar>
                {/*<Swiper>*/}
                {/*</Swiper>*/}
                <MenuItems>
                </MenuItems>
            </div>
        )
    }
}

export default Index;
