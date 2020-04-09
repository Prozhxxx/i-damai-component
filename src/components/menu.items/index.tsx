import React from "react";
import './index.scss';

class MenuItems extends React.Component<any, any>{
    renderItems(){
        const items = [];
        const menu = ['演唱会', '话剧歌剧', '音乐会', '体育', '亲子', '展览休闲', '曲苑杂技', '更多'];
        for (let i = 0; i < menu.length; i++){
            items.push(
                <div className="item-contaner" key={i}>
                   <div className="content flex-center-y">
                       <img src={require('./music.png')} alt=""/>
                       <div>{menu[i]}</div>
                   </div>
                </div>
            )
        }
        return items;
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
