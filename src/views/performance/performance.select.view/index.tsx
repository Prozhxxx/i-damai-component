import React from "react";
import NetworkPerformance from "@/network/NetworkPerformance";
import NetworkTrade from "@/network/NetworkTrade";
import FontIcon from "@/components/font.icon";
import {withRouter} from "react-router";
import {getParams} from "@/util/RouterManager";
import classnames from 'classnames';
import UnitTool from "@/tool/UnitTool";
import './index.scss';

class PerformanceSelectView extends React.Component<any, {
    performanceDetail: PerformanceDetailModel,
    selectedSessionIndex: number,
    selectedPriceIndex: number,
    count: number
}>{
    constructor(props) {
        super(props);
        this.state = {
            performanceDetail: null,
            selectedSessionIndex: 0,
            selectedPriceIndex: 0,
            count: 1
        }
    }


    componentDidMount(): void {
        const {projectId} = getParams(this.props.location);
        this.fetchPerformanceDetail(projectId)
    }

    async fetchPerformanceDetail(projectId){
        return NetworkPerformance.useParams('coordinate').detail(projectId).then(data => {
            console.log(data);
            this.setState({
                performanceDetail: data
            })
            const damaiProjectPerformRespList = data.damaiProjectPerformRespList;
            return data;
        }, error => {
            console.log(error);
        })
    }

    onClickSessionItem(index){
        this.setState({ selectedSessionIndex: index })
    }

    onClickPriceItem(index){
        this.setState({ selectedPriceIndex: index })
    }

    onClickBuy(totalPrice){
        if (totalPrice === '-'){
            return;
        }
        const {performanceDetail, selectedSessionIndex, selectedPriceIndex, count} = this.state;
        const {damaiProject, damaiProjectPerformRespList} = performanceDetail;
        const sessionProject = damaiProjectPerformRespList[selectedSessionIndex];
        const priceProject = sessionProject.damaiProjectPerformPricesList[selectedPriceIndex];
        const params = {
            userId: '',
            projectId: damaiProject.projectId,
            projectName: damaiProject.projectName,
            performId: sessionProject.damaiProjectPerform.performId,
            performName: sessionProject.damaiProjectPerform.performName,
            priceId: priceProject.priceId,
            priceName: priceProject.priceName,
            posterUrl: damaiProject.posterUrl,
            combineId: false,
            seatInfo: false,
            totalPrice: false,
            ticketMode: false,
            buyType: true,
            deliveryType: true,
            count: count,
            buyerId:true,
            addressId:true,
            userIds:true,
            // farePrice: false,
            // memo: false,
        };
        console.log(params)
        // NetworkTrade.useParams('openId', 'cityId').buy(params).then(data => {
        //     console.log(data);
        // }, error => {
        //     console.log(error);
        // })
    }

    render(){
        const {performanceDetail, selectedSessionIndex, selectedPriceIndex, count} = this.state;
        if (!performanceDetail){
            return null
        }
        const {damaiProjectPerformRespList} = performanceDetail;
        console.log(performanceDetail)
        let totalPrice = '';
        try {
            totalPrice = UnitTool.formatPriceByFen(
                damaiProjectPerformRespList[selectedSessionIndex].damaiProjectPerformPricesList[selectedPriceIndex].price*count
            );
        } catch (e) {
            totalPrice = '-'
        }
        return (
            <div className="performance-select-view">
                <div className={classnames(['session-container'])}>
                    <div className="title">选择场次</div>
                    <div className="content">
                        {damaiProjectPerformRespList.map(({damaiProjectPerform}, index) => {
                            return (
                                <div className={classnames(['item-wrapper', { 'active': selectedSessionIndex === index }])}
                                     key={damaiProjectPerform.performName}
                                     onClick={() => this.onClickSessionItem(index)}>
                                    <div className="item">
                                        {damaiProjectPerform.performName}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="price-container">
                    <div className="title">选择票档</div>
                    <div className="content">
                        {
                            damaiProjectPerformRespList.length > 0
                            && damaiProjectPerformRespList[selectedSessionIndex].damaiProjectPerformPricesList.map((priceModel, index) => {
                                return (
                                    <div className={classnames(['item-wrapper price-item-wrapper', { 'active': selectedPriceIndex === index }])}
                                         key={priceModel.priceId}
                                         onClick={() => this.onClickPriceItem(index)}>
                                        <div className="item">{UnitTool.formatPriceByFen(priceModel.price)}元</div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="count-container">
                    <div className="title">选择数量</div>
                    <div className="content flex-middle-x">
                        <div className="button" onClick={e => {
                            this.setState((state) => {
                                return state.count <= 1 ? null : {count: state.count-1};
                            })
                        }}>
                            -
                        </div>
                        <div>
                            {count}张
                        </div>
                        <div className="button" onClick={e => {
                            this.setState((state) => {
                                return {count: state.count+1};
                            })
                        }}>
                            +
                        </div>
                    </div>
                </div>
                <div className="person-container">
                    <div className="title">购票信息<span className="subtitle">（购票前需先填写好个人信息）</span></div>
                    <div className="content flex-middle-x">
                        <div className="person">请填写购票信息</div>
                        <div className="icon-wrapper">
                            <FontIcon icon={'iconcl-icon-right'} className={'icon'}/>
                        </div>
                    </div>
                </div>
                <div className="bottom-bar flex-middle-x">
                    <div className={'price'}>合计：{totalPrice}元</div>
                    <div className={classnames('buy', {'active': totalPrice !== '-'})}
                         onClick={e => this.onClickBuy(totalPrice)}>
                        下一步
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(PerformanceSelectView);
