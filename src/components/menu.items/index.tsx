import React from "react";
import './index.scss';

class MenuItems extends React.Component<{categoryList: CategoryModel[]}, any>{
    renderItems(){
        const categoryList = this.props.categoryList.slice(0, 8);
        return categoryList.map((category, i) => {
            return (
                <div className="item-contaner" key={i}>
                    <div className="content flex-center-y">
                        <img src={category.iconUrl || require('./music.png')} alt=""/>
                        <div>{category.codeName}</div>
                    </div>
                </div>
            )
        })
    }
    render(){
        return (
            <div className="menu-items">
                {this.renderItems()}
            </div>
        )
    }
}

export default MenuItems;
