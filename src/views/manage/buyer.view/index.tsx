import React from "react";
import NetworkMine from "@/network/NetworkMine";
import cn from 'classnames';
import {withRouter} from 'react-router';
import {push, getParams, pop} from "@/util/RouterManager";
import BuyerCell from '@/components/buyer.cell';
import './index.scss';
import {navigatorWrapper} from "@/components/navigatorWrapper";


class BuyerView extends React.Component<any, any>{

    private buyerToken: string;
    constructor(props) {
        super(props);
        this.state = {
            selectedMenuIndex: 0,
            buyerList: []
        }
        this.buyerToken = null;
    }

    componentDidMount(): void {
        const params = getParams(this.props.location);
        this.fetchAddressList();
        const {buyerToken} = this.props.location.state;
        this.buyerToken = buyerToken;
    }

    onClickBuyerCell(buyer){
        window.eventTarget.dispatchEvent(new CustomEvent(this.buyerToken, { 'detail': { buyer } }))
        pop(this)
    }

    async fetchAddressList(){
        return NetworkMine.useParams('openId').buyerList().then(data => {
            this.setState({
                buyerList: data
            });
            return data;
        }, error => {
            console.log(error);
        })
    }
    onClickAdd(){
        const {history} = this.props;
        push(history,'/add-buyer');
    }

    onClickMenu(index){
        this.setState({
            selectedMenuIndex: index
        })
    }

    render(){
        const {selectedMenuIndex, buyerList} = this.state;
        return (
            <div className={cn('buyer-view')}>
                {/*<div className={cn('head flex-middle-x')}>*/}
                {/*    {['实名购票管理', '收件地址管理'].map((title, index) => {*/}
                {/*        return (*/}
                {/*            <div className={cn('menu', {active: selectedMenuIndex === index})}*/}
                {/*                 key={title}*/}
                {/*                 onClick={e => {this.onClickMenu(index)}}>*/}
                {/*                {title}*/}
                {/*            </div>*/}
                {/*        )*/}
                {/*    })}*/}
                {/*</div>*/}
                <div>
                    {buyerList.map(buyer => {
                        return (
                            <BuyerCell key={buyer.id}
                                       buyer={buyer}
                                       className={cn('buyer-cell')}
                                       onClick={e => this.onClickBuyerCell(buyer)}/>
                        )
                    })}
                </div>
                <div className={cn('add-button')} onClick={e => {
                    this.onClickAdd();
                }}>+ 新增</div>
            </div>
        );
    }
}

export default withRouter(BuyerView);
