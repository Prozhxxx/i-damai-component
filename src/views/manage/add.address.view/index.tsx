import React from "react";
import cn from 'classnames';
import NetworkMine from "@/network/NetworkMine";
import FontIcon from "@/components/font.icon";
import './index.scss';

class AddAddressView extends React.Component<{
}, {
    addressRegion: string
}>{
    constructor(props) {
        super(props);
        this.state = {
            addressRegion: ''
        }
    }

    componentDidMount(): void {
         // NetworkMine.useParams('openId').addAddress().then(data => {
         //
         // })
    }

    render(){
        const {addressRegion} = this.state;
        return (
            <div className={cn('add-address-view')}>
                <div className={cn('address-contacts')}>
                    <div className={cn('item flex-middle-x')}>
                        <div className="title">姓名</div>
                        <input placeholder="请填写观演人姓名"/>
                    </div>
                    <div className={cn('item flex-middle-x')}>
                        <div className="title">手机号</div>
                        <input placeholder="请填写观演人手机号"/>
                    </div>
                </div>
                <div className={cn('address-location')}>
                    <div className={cn('item flex-middle-x')}>
                        <div className={cn('title')}>所在地区</div>
                        <div className={cn('picker-text')}>{addressRegion}</div>
                        <FontIcon icon="iconcl-icon-right" width={20} height={20}/>
                    </div>
                    {/*<div className={cn('item flex-middle-x')}>*/}
                    {/*    <div className={cn('title')}>街道</div>*/}
                    {/*    <div className={cn('picker-text')}></div>*/}
                    {/*    <FontIcon icon="iconcl-icon-right" width={20} height={20}/>*/}
                    {/*</div>*/}
                    <div className={cn('item flex-middle-x')}>
                        <div className={cn('title')}>详细地址</div>
                        <input placeholder="请填写详细地址不少于4个字"/>
                    </div>
                </div>
                <div className={cn('is-default')}>
                    <div className={cn('item flex-middle-x')}>
                        <div className={cn('title')}>设为默认地址</div>
                        <div></div>
                    </div>
                </div>
                <div className={cn('bottom-area')}>
                    <div className="content">确定</div>
                </div>
            </div>
        );
    }
}

export default AddAddressView;
