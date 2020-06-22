import React from "react";
import cn from "classnames";
import FontIcon from "@/components/font.icon";
import NetworkMine from "@/network/NetworkMine";
import {getParams} from "@/util/RouterManager";
import {withRouter} from 'react-router';
import {navigatorWrapper} from "@/components/navigatorWrapper";
import './index.scss';

class OrderDetailView extends React.Component<any, any>{


    componentDidMount(): void {
        console.log('aaaa')
        // const data = {};
        // this.fetchOrderDetail()
    }

    async fetchOrderDetail(orderId){
        return NetworkMine.useParams('openId').orderDetail(orderId).then(data => {
            console.log(data);
            return data;
        }, error => {
            console.log(error)
        })
    }

    renderStatusInfoBlock(){
        return (
            <div className={cn('status-info')}>
                <div className={cn('status')}>待支付￥360.0</div>
                <div className={cn('message')}>请尽快完成支付，还剩13分47秒</div>
                <div className={cn('flex-middle-x')}>
                    <div className={cn('cancel-btn btn')}>取消订单</div>
                    <div className={cn('pay-btn btn')}>立即付款</div>
                </div>
            </div>
        )
    }

    renderPerformanceInfoBlock(){
        return (
            <div className={cn('performance-info')}>
                <div className={cn('performance flex-x')}>
                    <div className={cn('left-content')}>
                        <div className="name">【上海】「限时赠礼！火热预售」莫奈和印象派大师展</div>
                        <div className="date">2020.01.11 周六19:30</div>
                        <div className="address">上海| Mao liasdawd上海</div>
                        <div className="seat">19排24号</div>
                    </div>
                    <div className={cn('right-content')}>
                        <img className={cn('photo')} src="" alt=""/>
                    </div>
                </div>
                <div className={cn('money flex-middle-x')}>
                    <div className={cn('price')}>180</div>
                    <div>2张</div>
                </div>
                <div className={'message flex-middle-x'}>{
                    ['不支持退', '不支持选座', '不提供发票', '快递票'].map((title, index) => {
                        return (
                            <div className={cn('item flex-middle-x')} key={index}>
                                <FontIcon icon="icontishi" width={12} height={12}/>
                                <span>{title}</span>
                            </div>
                        )
                    })
                }</div>
                <div className={cn('flex-middle-x ticket-amount')}>
                    <div className="title">商品总额</div>
                    <div>￥360.0</div>
                </div>
                <div className={cn('flex-middle-x total-price')}>
                    <div className="title">合计</div>
                    <div>￥360.0</div>
                </div>
                <div className={cn('flex-middle-x pay-price')}>
                    <div className="title">实际金额</div>
                    <div>￥360.0</div>
                </div>

            </div>
        );
    }

    renderDeliveryInfoBlock(){
        return (
            <div className={cn('delivery-info')}>
                <div className={cn('item flex-middle-x')}>
                    <div className={cn('label')}>配送方式</div>
                    <div className={cn('content')}>电子票</div>
                </div>
                <div className={cn('item flex-middle-x')}>
                    <div className={cn('label')}>联系人</div>
                    <div className={cn('content')}>泛滥猪 +86-1551515151</div>
                </div>
            </div>
        );
    }

    renderInvoiceInfoBlock(){
        return (
            <div className={cn('invoice-info')}>
                <div className={cn('title')}>开具发票</div>
                <div className={cn('content')}>请填写发票信息</div>
            </div>
        );
    }

    renderOrderInfoBlock(){
        return (
            <div className={cn('order-info')}>
                <div className={cn('title')}>订单信息</div>
                <div className={cn('flex-middle-x item')}>
                    <div className={cn('label')}>订单编号</div>
                    <div>866845885899</div>
                </div>
                <div className={cn('flex-middle-x item')}>
                    <div className={cn('label')}>订单时间</div>
                    <div>2020-04-26 15:26</div>
                </div>
            </div>
        );
    }

    render(){
        return (
            <div className={cn('order-detail-view')}>
                <div>{this.renderStatusInfoBlock()}</div>
                <div>{this.renderPerformanceInfoBlock()}</div>
                <div>{this.renderDeliveryInfoBlock()}</div>
                <div>{this.renderInvoiceInfoBlock()}</div>
                <div>{this.renderOrderInfoBlock()}</div>
            </div>
        );
    }
}

export default withRouter(OrderDetailView);
