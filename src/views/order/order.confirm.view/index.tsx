import React, {Fragment} from "react";
import NetworkTrade from "@/network/NetworkTrade";
import NetworkMine from "@/network/NetworkMine";
import {getParams, push} from "@/util/RouterManager";
import {withRouter} from 'react-router';
import FontIcon from "@/components/font.icon";
import NetworkPerformance from "@/network/NetworkPerformance";
import cn from 'classnames';
import UnitTool from "@/tool/UnitTool";
import './index.scss';



const ACCESS_WAY_LIST = [{
    name: '无纸化',
    isNoAccess: true,
    deliveryType: 1
}, {
    name: '自助换票',
    isNoAccess: true,
    deliveryType: 3,
}, {
    name: '快递邮寄',
    isNoAccess: false,
    deliveryType: 2,
}, {
    name: '门店自取',
    isNoAccess: false,
    deliveryType: 4,
}];

class OrderConfirmView extends React.Component<any, {
    projectId: string,
    performId: string,
    priceId: string,
    count: number,
    buyer: BuyerModel,
    performanceDetail: PerformanceDetailModel,
    deliveryTypeVisibleList: number[],
    selectedDeliveryType: number | null,
}>{
    constructor(props) {
        super(props);
        this.state = {
            projectId: null,
            performId: null,
            priceId: null,
            count: null,
            buyer: null,
            performanceDetail: null,
            deliveryTypeVisibleList: [],
            selectedDeliveryType: NaN,
        };
    }

    componentDidMount(): void {
        const {
            projectId,
            performId,
            priceId,
            count,
        } = getParams(this);
        this.setState({
            projectId,
            performId,
            priceId,
            count,
        });
        this.fetchPerformanceDetail(projectId);
        this.fetchBuyerList();
    }

    async fetchPerformanceDetail(projectId){
        return NetworkPerformance.useParams('coordinate').detail(projectId).then(data => {
            console.log(data);
            this.setState({
                performanceDetail: data
            });
            const damaiProjectPerformRespList = data.damaiProjectPerformRespList;
            try{
                const deliveryTypeVisibleList = JSON.parse(data?.damaiProjectDetail?.deliveryTypes);
                this.setState({
                    deliveryTypeVisibleList,
                    selectedDeliveryType: deliveryTypeVisibleList?.[0] ?? NaN
                })
            } catch (e) {
                console.log('解析 deliveryTypes 失败');
            }
            return data;
        }, error => {
            console.log(error);
        })
    }

    async fetchBuyerList(){
        return NetworkMine.useParams('openId').buyerList().then(data => {
            if (data.length > 0){
                this.setState({
                    buyer: data[0]
                })
            }
        }, error => {
            console.log(error);
        })
    }

    onClickSelectBuyer(){
        push(this,'/performance-select-info', {
        });
    }

    getPerformSession(){
        const {
            performanceDetail, performId, priceId, buyer, count, selectedDeliveryType
        } = this.state;
        if (performanceDetail === null){
            return null;
        }
        const {damaiProject, damaiProjectPerformRespList} = performanceDetail;
        const sessionProject = damaiProjectPerformRespList
            .find(({damaiProjectPerform}) => performId === String(damaiProjectPerform.performId));
        const priceProject = sessionProject.damaiProjectPerformPricesList
            .find((sessionPrice) => String(sessionPrice.priceId) === priceId);
        return {
            performanceDetail,
            performId,
            priceId,
            buyer,
            count,
            selectedDeliveryType,
            sessionProject,
            priceProject,
            damaiProject,
            damaiProjectPerformRespList,
        }
    }

    onClickBuy(){
        const { sessionProject, priceProject, count, selectedDeliveryType, damaiProject, buyer } = this.getPerformSession();
        const params = {
            count,
            deliveryType: selectedDeliveryType,
            projectId: damaiProject.projectId,
            performId: sessionProject.damaiProjectPerform.performId,
            priceId: priceProject.priceId,
            seatInfo: null,
            userIds: buyer.id,
            addressId: null,
            memo: null,
        };
        NetworkTrade.buy(params).then(data => {
            console.log(data);
        }, error => {
            console.log(error);
        })
    }

    accessWayChangeHandler(selectedDeliveryType){
        this.setState({ selectedDeliveryType })
    }


    renderDetailInfo(buyer: BuyerModel){
        const {selectedDeliveryType, deliveryTypeVisibleList} = this.state;
        const accessWayList = ACCESS_WAY_LIST.filter(({deliveryType}) => deliveryTypeVisibleList.some((type) => type === deliveryType));

        let buyerEle = <div className="placeholder">请填写购票信息</div>;
        if (buyer){
            buyerEle = (
                <div className="person flex-middle-x">
                    <div className="name">{buyer.userName}</div>
                    <div className="phone">{buyer.phone}</div>
                </div>
            )
        }

        let accessWayEle = null;
        // 快递
        if (selectedDeliveryType === 1){
            // const address = '上海市闵行区宜山路1618号c座308上海金保证网络科adwawdAWdfadawd';
            const address = null
            accessWayEle = (
                <div className={cn('content flex-middle-x subinfo')}
                     onClick={e => {
                         if(address === null){
                         }
                         push(this, '/address')
                         // this.onClickSelectBuyer();
                     }}>
                    <div className={cn('flex-y')}>
                        <div className="type">快递</div>
                        <div className={cn('address ellipsis-text', {none: address === null})}>{address ?? '新增收货地址'}</div>
                    </div>
                    <div className="icon-wrapper">
                        <FontIcon icon={'iconcl-icon-right'} className={'icon'}/>
                    </div>
                </div>
            )
        }
        // 门店自取
        if (selectedDeliveryType === 4){
            accessWayEle = (
                <div>{['无纸化', '快递票', '自助换票', '门店自取'][selectedDeliveryType]}</div>
            )
        }

        return (
            <Fragment>
                <div className={cn('container')}>
                    <div className="title">购票信息<span className="subtitle">（购票前需先填写好个人信息）</span></div>
                    <div className="content flex-middle-x" onClick={e => {
                        this.onClickSelectBuyer();
                    }}>
                        <div className={cn('flex-y', 'info')}>
                            {
                                buyerEle
                            }
                        </div>
                        <div className="icon-wrapper">
                            <FontIcon icon={'iconcl-icon-right'} className={'icon'}/>
                        </div>
                    </div>
                </div>
                <div className={cn('container')}>
                    <div className="title">取票方式</div>
                    <div className="content flex-middle-x access-way">
                        {accessWayList.map(({name, deliveryType}) => {
                            return (
                                <div key={name}
                                     className={cn('flex-middle-x', 'item')}>
                                    <input type="radio"
                                           id={name}
                                           name="accessWay"
                                           value={name}
                                           checked={deliveryType === selectedDeliveryType}
                                           onChange={this.accessWayChangeHandler.bind(this, deliveryType)}/>
                                    <label className="ellipsis-text" htmlFor={name}>
                                        {name}
                                    </label>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className={cn('container')}>
                    { accessWayEle }
                </div>
            </Fragment>
        )
    }

    render(){
        const state = this.getPerformSession();
        if (state === null){
            return null;
        }
        const { priceProject, count, buyer } = state;

        const price = priceProject.price*count;
        let totalPrice = '';
        if (!isNaN(price)){
            totalPrice = UnitTool.formatPriceByFen(price);
        }
        return (
            <div className={cn('order-confirm-view')}>
                <div className={cn('banner-container')}>
                    <div className={cn('banner')}>
                        <div className="name">【上海】「限时赠礼！火热预售」莫奈和印象派大师展</div>
                        <div className="address">上海市  MAO Livehouse上海</div>
                        <div className="date">2020.01.11  周六19:30</div>
                        <div className="price">¥180.00票档x1张</div>
                        <div className="seat">19排24号</div>
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
                    </div>
                </div>
                {this.renderDetailInfo(buyer)}
                <div className="bottom-bar flex-middle-x">
                    <div className={'price'}>合计：{`${totalPrice === '' ? '-' : totalPrice}`}元</div>
                    <div className={cn('buy', {'active': totalPrice !== ''})}
                         onClick={e => this.onClickBuy()}>
                        下一步
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(OrderConfirmView);
