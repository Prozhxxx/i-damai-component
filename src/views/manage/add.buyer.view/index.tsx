import React from "react";
import {RouteComponentProps, withRouter} from "react-router";
import cn from 'classnames';
import './index.scss';
import NetworkMine from "@/network/NetworkMine";
import {pop} from "@/util/RouterManager";

class AddBuyerView extends React.Component<RouteComponentProps, any>{
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            cardNo: '',
            phone: ''
        }
    }

    onClickAddBuyer(){
        const {history} = this.props;
        const {userName, cardNo, phone} = this.state;
        if(userName === ''){
            console.log('姓名不可为空');
            return;
        }
        if(cardNo === ''){
            console.log('证件号码不可为空');
            return;
        }
        if(phone === ''){
            console.log('联系方式不可为空');
            return;
        }
        NetworkMine.useParams('openId').addBuyer({
            cardType: '1',
            cardNo,
            userName,
            phone,
        }).then(data => {
            pop(history);
        }, error => {
            console.log(error);
        })
    }

    onInputChange(type, e){
        const value = e.target.value;
        e.stopPropagation();
        this.setState({
            [type]: value
        })
    }

    render(){
        return (
            <div className={cn('add-buyer-view')}>
                <div className={cn('item-list')}>
                    <div className={cn('flex-middle-x item')}>
                        <div className={cn('title')}>姓名</div>
                        <input className={cn('input')} type="text" onChange={e => {
                            this.onInputChange('userName', e)
                        }}/>
                    </div>
                    <div className={cn('flex-middle-x item')}>
                        <div className={cn('title')}>证件类型</div>
                        <div>身份证</div>
                    </div>
                    <div className={cn('flex-middle-x item')}>
                        <div className={cn('title')}>证件号码</div>
                        <input className={cn('input')} type="text" onChange={e => {
                            this.onInputChange('cardNo', e)
                        }}/>
                    </div>
                    <div className={cn('flex-middle-x item')}>
                        <div className={cn('title')}>联系号码</div>
                        <input className={cn('input')} type="text" onChange={e => {
                            this.onInputChange('phone', e)
                        }}/>
                    </div>
                </div>
                <div className={cn('bottom')}>
                    <div className={cn('content')} onClick={e => {
                        this.onClickAddBuyer()
                    }}>
                        确定
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(AddBuyerView);
