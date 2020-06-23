import React, {Fragment} from "react";
import NetworkTrade from "@/network/NetworkTrade";
import NetworkMine from "@/network/NetworkMine";
import {getParams, getRoute, push} from "@/util/RouterManager";
import {RouteComponentProps, withRouter} from 'react-router';
import {ChildrenPage} from '@/components/childrenPageWrapper';
import FontIcon from "@/components/font.icon";
import NetworkPerformance from "@/network/NetworkPerformance";
import cn from 'classnames';
import UnitTool from "@/tool/UnitTool";
import StringTool from "@/tool/StringTool";
import './index.scss';

enum DeliveryType {
    NOPAPER = 1,
    GAIN,
    EXPORESS,
    SHOP,
    UNKNOWN = NaN
}

const ACCESS_WAY_LIST = [{
    name: '无纸化',
    isNoAccess: true,
    deliveryType: DeliveryType.NOPAPER
}, {
    name: '自助换票',
    isNoAccess: true,
    deliveryType: DeliveryType.GAIN,
}, {
    name: '快递邮寄',
    isNoAccess: false,
    deliveryType: DeliveryType.EXPORESS,
}, {
    name: '门店自取',
    isNoAccess: false,
    deliveryType: DeliveryType.SHOP,
}];

class OrderConfirmView extends React.Component<RouteComponentProps, {
    projectId: string,
    performId: string,
    priceId: string,
    count: number,
    buyerList: BuyerModel[],
    performanceDetail: PerformanceDetailModel,
    deliveryTypeVisibleList: number[],
    selectedDeliveryType: DeliveryType,
    address: AddressModel,
    shopList: ShopModel[]
}>{
    private buyerToken: string;
    private addressToken: string;
    constructor(props) {
        super(props);
        this.state = {
            projectId: null,
            performId: null,
            priceId: null,
            count: null,
            address: null,
            buyerList: [],
            performanceDetail: null,
            deliveryTypeVisibleList: [],
            selectedDeliveryType: DeliveryType.UNKNOWN,
            shopList: [],
        };
        this.buyerToken = StringTool.uuid();
        this.addressToken = StringTool.uuid();
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
        this.fetchAddressList();
        this.fetchShopList(projectId);

        window.eventTarget.addEventListener(this.buyerToken, (e: Event) => {
            const detail = (e as CustomEvent).detail;
            const { buyerList } = detail;
            console.log(buyerList);
            this.setState({ buyerList })
        });

        window.eventTarget.addEventListener(this.addressToken, (e: Event) => {
            const detail = (e as CustomEvent).detail;
            const {address} = detail;
            this.setState({ address })
        });

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
                    selectedDeliveryType: deliveryTypeVisibleList?.[0] ?? DeliveryType.UNKNOWN
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
                    buyerList: [data[0]]
                })
            }
        }, error => {
            console.log(error);
        })
    }

    async fetchAddressList(){
        return NetworkMine.useParams('openId').addressList().then(data => {
            const address = data.find(_ => _.isDefault === 1);
            this.setState({ address: address ?? [] })
        }, error => {
            console.log(error);
        })
    }

    async fetchShopList(projectId){
        return NetworkTrade.shopList(projectId).then(shopList => {
            this.setState({ shopList: shopList ?? [] })

        }, error => {
            console.log(error);
        })
    }

    getPerformSession(){
        const {
            performanceDetail, performId, priceId
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
            sessionProject,
            priceProject,
            damaiProject,
            damaiProjectPerformRespList,
        }
    }

    onClickAddress(){
        const {addressToken} = this;
        push(this, '/order-confirm/address', {
            ...getParams(this),
        }, { addressToken })
    }

    onClickSelectBuyer(){
        const {buyerToken} = this;
        const {buyerList} = this.state;
        push(this,'/order-confirm/buyer', {
            ...getParams(this)
        }, { buyerToken, selectable: true, selectBuyerIdList: buyerList.map(({id}) => id)});
    }

    onClickBuy(){
        const { sessionProject, priceProject, damaiProject } = this.getPerformSession();
        const {address, count, selectedDeliveryType, buyerList } = this.state;
        if(buyerList.length <= 0){
            console.log('buyer 不存在');
            return;
        }
        if (selectedDeliveryType === DeliveryType.EXPORESS && address === null){
            console.log('地址 不存在');
            return;
        }
        const params = {
            count,
            deliveryType: selectedDeliveryType,
            projectId: damaiProject.projectId,
            performId: sessionProject.damaiProjectPerform.performId,
            priceId: priceProject.priceId,
            seatInfo: null,
            userIds: buyerList.map(({id}) => id).join(','),
            addressId: address?.id,
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


    renderDetailInfo(buyerList: BuyerModel[]){
        const {selectedDeliveryType, deliveryTypeVisibleList, address, shopList} = this.state;
        const accessWayList = ACCESS_WAY_LIST.filter(({deliveryType}) => deliveryTypeVisibleList.some((type) => type === deliveryType));

        let buyerEle = <div className="placeholder">请填写购票信息</div>;
        if (buyerList.length > 0){
            buyerEle = (
                <>
                    {buyerList.map(buyer => (
                        <div key={buyer.id} className="person flex-middle-x">
                            <div className="name">{buyer.userName}</div>
                            <div className="phone">{buyer.phone}</div>
                        </div>
                    ))}
                </>
            )
        }

        let accessWayEle = null;
        // 快递
        if (selectedDeliveryType === DeliveryType.EXPORESS){
            accessWayEle = (
                <div className={cn('exporess content flex-middle-x')}
                     onClick={e => {
                         if(address === null){
                         }
                         this.onClickAddress();
                     }}>
                    <div className={cn('flex-y')}>
                        <div className="type">快递</div>
                        <div className={cn('address ellipsis-text', {none: address === null})}>{address?.address ?? '新增收货地址'}</div>
                    </div>
                    <div className="icon-wrapper">
                        <FontIcon icon={'iconcl-icon-right'} className={'icon'}/>
                    </div>
                </div>
            )
        }
        // 门店自取
        if (selectedDeliveryType === DeliveryType.SHOP){
            accessWayEle = (
                <div className={"shop"}>
                    <div className={"subtitle"}>门店列表</div>
                    <div className={"wrapper"}>
                        <div className={"scroller"}>
                            {
                                shopList.map(shop => {
                                    return (
                                        <div key={shop.pointId} className={cn('item flex-middle-x')}>
                                            <div className="icon-wrapper">
                                                <FontIcon icon={'icondizhi'}
                                                          strokeColor={'#000'}
                                                          className={'icon'}
                                                          width={20}
                                                          height={20}/>
                                            </div>
                                            <div className={"address-wrapper"}>
                                                <div className={"name"}>{shop.pointName}</div>
                                                <div className={"address"}>{shop.pointAddr}</div>
                                            </div>
                                        </div>
                                    )}
                                )
                            }
                        </div>
                    </div>
                </div>
            )
        }

        return (
            <Fragment>
                <div className={cn('container')}>
                    <div className="title flex-middle-x">
                        <span>购票信息</span>
                        <span className="subtitle">（购票前需先填写好个人信息）</span>
                        <div className="empty"></div>
                        <div className="add-btn">新增</div>
                    </div>
                    <div className="content flex-middle-x" onClick={e => {
                        this.onClickSelectBuyer();
                    }}>
                        <div className={cn('flex-y', 'buyer-list')}>
                            {
                                buyerEle
                            }
                        </div>
                        {
                            // (
                            // <div className="icon-wrapper">
                            //     <FontIcon icon={'iconcl-icon-right'} className={'icon'}/>
                            // </div>
                            // )
                        }
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
        const { priceProject, damaiProject, sessionProject } = state;
        const { count, buyerList } = this.state;

        const price = priceProject.price*count;
        let totalPrice = '';
        if (!isNaN(price)){
            totalPrice = UnitTool.formatPriceByFen(price);
        }
        return (
            <ChildrenPage location={this.props.location}
                          pathname={'/order-confirm'}
                          routes={getRoute('SelectBuyer|SelectAddress')}>
                <div className={cn('order-confirm-view')}>
                    <div className={cn('banner-container')}>
                        <div className={cn('banner')}>
                            <div className="name">{damaiProject?.projectName}</div>
                            <div className="address">{damaiProject?.cityName} {damaiProject?.venueName}</div>
                            <div className="date">{sessionProject.damaiProjectPerform.performName}</div>
                            <div className="price">¥{priceProject.priceName}票档x{count}张</div>
                            {/*<div className="seat">19排24号</div>*/}
                            <div className={'message flex-middle-x'}>{
                                ['不支持退', '不支持选座', '不提供发票', '快递票'].map((title, index) => {
                                    return (
                                        <div className={cn('item flex-middle-x')} key={index}>
                                            <FontIcon icon="icontishi" width={15} height={15} fillColor={'#f19e4b'}/>
                                            <span>{title}</span>
                                        </div>
                                    )
                                })
                            }</div>
                        </div>
                    </div>
                    {this.renderDetailInfo(buyerList)}
                    <div className="bottom-bar flex-middle-x">
                        <div className={'price'}>合计：{`${totalPrice === '' ? '-' : totalPrice}`}元</div>
                        <div className={cn('buy', {'active': totalPrice !== ''})}
                             onClick={e => this.onClickBuy()}>
                            下一步
                        </div>
                    </div>
                </div>
            </ChildrenPage>
        )
    }
}

export default withRouter(OrderConfirmView);
