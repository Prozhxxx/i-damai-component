import React from "react";
import './index.scss';

type ClickCallback = (CategoryModel) => void;
class MenuItems extends React.Component<{categoryList: CategoryModel[], onClickItem: ClickCallback}, any>{
    renderItems(){
        const categoryList = this.props.categoryList.slice(0, 8);
        const {onClickItem} = this.props;
        return categoryList.map((category, i) => {
            return (
                <div className="item-contaner" key={i} onClick={onClickItem.bind(this, category)}>
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
